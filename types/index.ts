export type DocType =
  | 'presentation'
  | 'resume'
  | 'report'
  | 'proposal'
  | 'business-plan'
  | 'invoice'
  | 'certificate'
  | 'research-paper';

export interface DocTypeMeta {
  id: DocType;
  label: string;
  icon: string;
  description: string;
  gradient: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  type: DocType;
  thumbnail: string;
  updatedAt: string;
  createdAt: string;
  pages: number;
  starred: boolean;
  shared: boolean;
  owner: string;
  status: 'draft' | 'published' | 'archived';
}

export interface Template {
  id: string;
  name: string;
  category: string;
  type: DocType;
  thumbnail: string;
  author: string;
  downloads: number;
  rating: number;
  pro: boolean;
  colors: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
  action?: string;
}

export interface BrandKit {
  companyName: string;
  logoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fonts: { heading: string; body: string };
}

export interface InvoiceItem {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  description: string;
}

export interface PlanTier {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  current?: boolean;
  popular?: boolean;
  cta: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: string;
  credits: number;
  maxCredits: number;
  storage: number;
  maxStorage: number;
}

export interface ActivityPoint {
  label: string;
  documents: number;
  ai: number;
}

export interface StorageBreakdown {
  label: string;
  value: number;
  color: string;
}
