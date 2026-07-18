# DocumentOS AI — Backend Requirement Plan

## Overview

This document defines the backend requirements to power the DocumentOS AI frontend. The stack is **Supabase** (Postgres + Auth + Storage + Edge Functions) with **Next.js 15 API Routes / Server Actions** as the application layer. The frontend currently runs on mock data; this plan describes how to replace each mock source with a real backend.

---

## 1. Architecture

```
Next.js (App Router)
  ├── Server Actions / Route Handlers  (business logic, Zod validation)
  ├── Supabase Auth                    (email/password sessions)
  ├── Supabase Postgres                (relational data + RLS)
  ├── Supabase Storage                  (uploads, thumbnails, exports)
  ├── Supabase Edge Functions          (AI orchestration, webhooks)
  └── External AI Provider              (OpenAI / Anthropic for generation)
```

### Principles
- **RLS on every table** — no server-side bypass except in Edge Functions with the service role key.
- **4 policies per table** (SELECT / INSERT / UPDATE / DELETE), scoped to `auth.uid()`.
- **Zod validation** at every API boundary before any DB write.
- **No transactions** (`BEGIN`/`COMMIT`/`ROLLBACK`) — use atomic single statements or `DO $$ … END $$` blocks where needed.
- **Soft deletes** via a `deleted_at` column; never hard-delete user data.

---

## 2. Database Schema

### 2.1 `profiles`
Mirrors the authenticated user. Created on signup via a trigger.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | `references auth.users(id) on delete cascade` |
| full_name | text | |
| email | text | unique |
| avatar_url | text | |
| plan | enum(`free`,`pro`,`team`) | default `free` |
| credits_remaining | int | default 5 (free), 2000 (pro) |
| max_credits | int | default 5 |
| storage_used_mb | numeric | default 0 |
| max_storage_mb | numeric | default 1024 (free) |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

**RLS:** owner-only (`auth.uid() = id`).

### 2.2 `documents`
The core entity — every presentation, resume, report, etc.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| owner_id | uuid FK | `profiles.id` |
| title | text | |
| type | enum(`presentation`,`resume`,`report`,`proposal`,`business-plan`,`invoice`,`certificate`,`research-paper`) | |
| status | enum(`draft`,`published`,`archived`) | default `draft` |
| thumbnail | text | gradient id or storage path |
| pages | int | default 1 |
| content | jsonb | full document model (pages, elements, styles) |
| starred | bool | default false |
| shared | bool | default false |
| word_count | int | default 0 |
| created_at | timestamptz | |
| updated_at | timestamptz | |
| deleted_at | timestamptz | nullable — soft delete |

**Indexes:** `(owner_id, updated_at desc)`, `(owner_id, type)`, `(owner_id, starred)`.

**RLS:** owner-only CRUD via `auth.uid() = owner_id`.

### 2.3 `document_collaborators`
For the Team plan real-time collaboration.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| document_id | uuid FK | `documents.id` on delete cascade |
| user_id | uuid FK | `profiles.id` |
| role | enum(`viewer`,`editor`,`owner`) | |
| created_at | timestamptz | |

**RLS:** user can read rows where `user_id = auth.uid()` OR document is owned by `auth.uid()`.

### 2.4 `pages`
Individual pages/slides within a document.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| document_id | uuid FK | on delete cascade |
| page_number | int | |
| content | jsonb | elements, layout, styles |
| created_at | timestamptz | |
| updated_at | timestamptz | |

**RLS:** inherited from document ownership — policy joins `documents` to check `owner_id = auth.uid()`.

### 2.5 `templates`
Marketplace templates available to all users.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| name | text | |
| category | text | |
| type | enum | same as document type |
| thumbnail | text | |
| author | text | |
| downloads | int | default 0 |
| rating | numeric(2,1) | default 0 |
| is_pro | bool | default false |
| colors | text[] | |
| content | jsonb | template document model |
| created_at | timestamptz | |

**RLS:** `SELECT` public to `authenticated`; no INSERT/UPDATE/DELETE from client (admin-managed via service role).

### 2.6 `user_templates`
Templates a user has saved to their library from the marketplace.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK | `profiles.id` |
| template_id | uuid FK | `templates.id` |
| created_at | timestamptz | |

**RLS:** owner-only.

### 2.7 `assets`
User-uploaded images, icons, files.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK | |
| name | text | |
| type | enum(`image`,`vector`,`data`) | |
| size_bytes | int | |
| storage_path | text | Supabase Storage object key |
| url | text | public/signed URL |
| created_at | timestamptz | |

**RLS:** owner-only.

### 2.8 `brand_kits`
One per user (or per workspace on Team plan).

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK | unique |
| company_name | text | |
| logo_url | text | nullable |
| primary_color | text | hex |
| secondary_color | text | hex |
| accent_color | text | hex |
| heading_font | text | |
| body_font | text | |
| updated_at | timestamptz | |

**RLS:** owner-only.

### 2.9 `ai_generations`
Audit log of AI usage for credit tracking.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK | |
| document_id | uuid FK | nullable — created doc if successful |
| prompt | text | |
| doc_type | enum | |
| status | enum(`pending`,`completed`,`failed`) | |
| credits_used | int | |
| error | text | nullable |
| created_at | timestamptz | |

**RLS:** owner-only SELECT; INSERT via Edge Function (service role).

### 2.10 `invoices`
Billing records (synced from Stripe webhooks).

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK | |
| stripe_invoice_id | text | unique |
| amount | numeric(10,2) | in BDT |
| currency | text | default `BDT` |
| status | enum(`paid`,`pending`,`failed`) | |
| description | text | |
| period_start | timestamptz | |
| period_end | timestamptz | |
| created_at | timestamptz | |

**RLS:** owner-only SELECT; INSERT/UPDATE via Stripe webhook Edge Function.

### 2.11 `api_keys`
User-generated API keys for programmatic access.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK | |
| name | text | |
| key_hash | text | hashed (never store plaintext) |
| last_used_at | timestamptz | nullable |
| created_at | timestamptz | |
| revoked_at | timestamptz | nullable |

**RLS:** owner-only.

### 2.12 `activity_log`
History feed.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK | |
| action | text | `generated`, `edited`, `exported`, `shared`, `created`, `deleted` |
| detail | text | |
| document_id | uuid FK | nullable |
| metadata | jsonb | |
| created_at | timestamptz | |

**RLS:** owner-only SELECT; INSERT via server action / Edge Function.

---

## 3. Authentication

- **Provider:** Supabase Auth, email + password only (no magic links / social unless requested).
- **Email confirmation:** OFF (per default project config).
- **Session:** Supabase session cookie, accessed via `createServerClient` in Server Components and `createBrowserClient` in Client Components.
- **`onAuthStateChange` deadlock guard:** unsubscribe inside the callback to prevent the known React 18 Strict Mode deadlock.
- **Profile creation:** a Postgres trigger `handle_new_user()` inserts a row into `profiles` on `auth.users.insert`.

### Auth flows
| Flow | Route | Notes |
|------|-------|-------|
| Register | `/register` | `supabase.auth.signUp()` → trigger creates profile |
| Login | `/login` | `supabase.auth.signInWithPassword()` |
| Forgot password | `/forgot-password` | `supabase.auth.resetPasswordForEmail()` |
| Verify email | `/verify` | OTP input (if email confirmation later enabled) |
| Sign out | topbar dropdown | `supabase.auth.signOut()` → redirect `/` |

---

## 4. API Surface (Server Actions / Route Handlers)

All server actions validate input with Zod, check the Supabase session, and enforce ownership before writing.

### 4.1 Documents
| Action | Method | Input | Output |
|--------|--------|-------|--------|
| `listDocuments` | GET | `?type=&sort=&search=` | `DocumentItem[]` |
| `getDocument` | GET | `id` | `Document` with pages |
| `createDocument` | POST | `{ title, type, templateId? }` | new doc |
| `updateDocument` | PATCH | `id, patch` | updated doc |
| `deleteDocument` | DELETE | `id` | soft-delete |
| `duplicateDocument` | POST | `id` | new copy |
| `shareDocument` | POST | `id, emails[], role` | collaborator rows |
| `starDocument` | PATCH | `id, starred` | toggle |

### 4.2 AI Generation
| Action | Method | Input | Output |
|--------|--------|-------|--------|
| `generateDocument` | POST | `{ prompt, docType, settings }` | `{ documentId }` |
| `aiAssistant` | POST (stream) | `{ documentId, message, action }` | streamed text |
| `rewriteSection` | POST | `{ documentId, sectionId, instruction }` | updated content |
| `generateChart` | POST | `{ documentId, dataSpec }` | chart element JSON |
| `generateImage` | POST | `{ documentId, prompt }` | image URL |

### 4.3 Templates
| Action | Method | Input | Output |
|--------|--------|-------|--------|
| `listTemplates` | GET | `?category=&type=&search=` | `Template[]` |
| `getTemplate` | GET | `id` | `Template` with content |
| `useTemplate` | POST | `id` | creates a new document from template |

### 4.4 Brand Kit
| Action | Method | Input | Output |
|--------|--------|-------|--------|
| `getBrandKit` | GET | — | `BrandKit` |
| `updateBrandKit` | PATCH | `patch` | updated kit |
| `uploadLogo` | POST | `file` | storage URL |

### 4.5 Assets
| Action | Method | Input | Output |
|--------|--------|-------|--------|
| `listAssets` | GET | — | `Asset[]` |
| `uploadAsset` | POST | `file` | `Asset` |
| `deleteAsset` | DELETE | `id` | — |

### 4.6 Billing
| Action | Method | Input | Output |
|--------|--------|-------|--------|
| `createCheckoutSession` | POST | `priceId` | Stripe checkout URL |
| `createPortalSession` | POST | — | Stripe portal URL |
| `listInvoices` | GET | — | `InvoiceItem[]` |
| `getUsage` | GET | — | credits + storage usage |

### 4.7 Settings
| Action | Method | Input | Output |
|--------|--------|-------|--------|
| `updateProfile` | PATCH | `patch` | updated profile |
| `changePassword` | POST | `current, new` | — |
| `generateApiKey` | POST | `name` | plaintext key (shown once) |
| `revokeApiKey` | DELETE | `id` | — |
| `updateNotifications` | PATCH | `prefs` | — |
| `deleteAccount` | DELETE | `password` | cascade delete |

### 4.8 History
| Action | Method | Input | Output |
|--------|--------|-------|--------|
| `listActivity` | GET | `?limit=&cursor=` | `ActivityLog[]` |

---

## 5. Edge Functions

### 5.1 `ai-generate`
**Trigger:** POST from client after credit check.

1. Validate prompt + docType with Zod.
2. Check `profiles.credits_remaining >= cost` (cost by docType).
3. Deduct credits atomically (`update … set credits_remaining = credits_remaining - cost where id = uid and credits_remaining >= cost`).
4. Insert `ai_generations` row (status `pending`).
5. Call external AI provider (OpenAI/Anthropic) with structured output schema.
6. Build document model (pages, elements, styles) from AI response.
7. Insert `documents` + `pages` rows.
8. Update `ai_generations` status to `completed`.
9. Return `{ documentId }`.
10. On failure: refund credits, set status `failed`, return error.

### 5.2 `ai-assistant`
**Trigger:** POST with streaming response.

1. Load document context (current page content).
2. Stream AI response (rewrite/expand/summarize/translate).
3. Return chunks via `ReadableStream` for client-side streaming.

### 5.3 `stripe-webhook`
**Trigger:** Stripe webhook (invoice.payment_succeeded, checkout.session.completed, customer.subscription_updated).

1. Verify Stripe signature.
2. Upsert `invoices` row.
3. Update `profiles.plan` and `profiles.max_credits` / `max_storage_mb`.

### 5.4 `ai-generate-image`
Calls an image generation API (DALL-E / Stable Diffusion), uploads result to Supabase Storage, returns URL.

### Edge Function requirements
- **CORS headers** on every response (preflight, success, error):
  ```typescript
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
  };
  ```
- Import via `jsr:` or `npm:` specifiers.
- Use service role key for DB writes that bypass RLS (credit deduction, AI log).

---

## 6. Supabase Storage

| Bucket | Visibility | Contents |
|--------|-----------|----------|
| `avatars` | public | user profile images |
| `assets` | private (signed URLs) | user-uploaded images, icons, files |
| `logos` | public | brand kit logos |
| `thumbnails` | public | document/template thumbnails |
| `exports` | private (signed URLs, 24h TTL) | generated PDF/PPTX/DOCX files |

**Storage policies:** RLS-style policies on each bucket scoped to `auth.uid()` for read/write of own files.

---

## 7. AI Integration

### Provider
- **Primary:** OpenAI (GPT-4o for text generation, DALL-E 3 for images).
- **Fallback:** Anthropic Claude 3.5 Sonnet.

### Credit costs
| Operation | Credits |
|-----------|---------|
| Full document generation | 50 |
| AI assistant rewrite | 5 |
| Summarize / expand | 3 |
| Translate | 3 |
| Generate image | 15 |
| Generate chart | 5 |

### Structured output
AI responses must conform to a JSON schema defining the document model:
```json
{
  "pages": [
    {
      "page_number": 1,
      "elements": [
        { "type": "heading", "content": "...", "x": 64, "y": 56, "w": 520, "h": 64, "style": {} }
      ]
    }
  ]
}
```

### Rate limiting
- 10 generations per minute per user.
- 50 AI assistant messages per hour per user.
- Enforced via a `rate_limits` table or in-memory counter in Edge Functions.

---

## 8. Real-time Collaboration (Team plan)

- **Supabase Realtime** channels per document: `document:{id}`.
- Broadcast cursor position, element selection, and content changes.
- Presence API for active collaborators (avatars in the topbar).
- Conflict resolution: last-write-wins at the element level (each element has an `updated_at`).

---

## 9. Security

- **RLS** on every table — no exceptions.
- **Service role key** only in Edge Functions and Stripe webhook — never exposed to the client.
- **API keys** hashed with bcrypt before storage; plaintext shown once on creation.
- **Input validation** with Zod at every server action boundary.
- **File upload validation:** type allowlist (PNG, JPG, SVG, CSV), max 10 MB.
- **Stripe signature verification** on webhook.
- **Rate limiting** on AI endpoints to prevent abuse.
- **Audit logging** via `activity_log` for all destructive actions.

---

## 10. Environment Variables

| Variable | Used by | Notes |
|----------|---------|-------|
| `SUPABASE_URL` | client + server | project URL |
| `SUPABASE_ANON_KEY` | client | public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | server / edge only | never exposed to client |
| `SUPABASE_DB_URL` | migrations | direct Postgres connection |
| `OPENAI_API_KEY` | edge function | AI generation |
| `STRIPE_SECRET_KEY` | edge function | billing |
| `STRIPE_WEBHOOK_SECRET` | edge function | webhook verification |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | client | Stripe.js |

---

## 11. Migration Order

1. `profiles` table + trigger + RLS
2. `documents` + `pages` + RLS
3. `templates` + `user_templates` + RLS
4. `brand_kits` + RLS
5. `assets` + Storage buckets + RLS
6. `ai_generations` + RLS
7. `activity_log` + RLS
8. `invoices` + RLS (Stripe sync)
9. `api_keys` + RLS
10. `document_collaborators` + RLS

---

## 12. Frontend Integration Checklist

For each frontend page, the mock data source to replace:

| Page | Mock source | Replace with |
|------|------------|--------------|
| Landing `/` | `planTiers`, `testimonials`, `faqs` | Static / CMS-managed |
| Dashboard `/dashboard` | `recentDocuments`, `monthlyActivity`, `storageBreakdown` | `listDocuments`, `getUsage`, activity aggregation query |
| Generator `/dashboard/generator` | `examplePrompts`, `aiSuggestions` | `generateDocument` server action |
| Marketplace `/dashboard/marketplace` | `templates` | `listTemplates` query |
| Documents `/dashboard/documents` | `recentDocuments` | `listDocuments` with filters |
| Editor `/dashboard/editor/[docId]` | `slideElements` (hardcoded) | `getDocument` + real-time subscription |
| Brand Kit `/dashboard/brand-kit` | `defaultBrandKit` | `getBrandKit` / `updateBrandKit` |
| Billing `/dashboard/billing` | `planTiers`, `invoices` | `listInvoices` + Stripe checkout |
| Settings `/dashboard/settings` | `currentUser` | `updateProfile`, `changePassword`, API key actions |
| Assets `/dashboard/assets` | `assets` array | `listAssets` / `uploadAsset` |
| History `/dashboard/history` | `history` array | `listActivity` query |

---

## 13. Currency & Localization

- **Currency:** Bangladeshi Taka (৳) — `formatCurrency(amount, locale)` converts USD pricing at ~120 BDT/USD and formats with Bengali numerals when locale is `bn`.
- **Locales:** English (`en`) and Bangla (`bn`) — translation dictionary in `lib/i18n.ts`, toggle via Zustand store. Backend stores amounts in BDT directly in the `invoices` table.
- **Future:** persist `locale` preference in `profiles.locale` column.
