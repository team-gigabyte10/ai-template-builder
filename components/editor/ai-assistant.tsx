'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Send,
  X,
  RefreshCw,
  Maximize2,
  Minimize2,
  Languages,
  Image as ImageIcon,
  ChartBar,
  Wand2,
  Scissors,
  Palette,
  type LucideIcon,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface Msg {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const initialMessages: Msg[] = [
  {
    id: 'm1',
    role: 'assistant',
    content:
      "Hi! I'm your AI assistant. I can rewrite, expand, summarize, translate, generate charts, and improve your design. What would you like to do?",
  },
];

const actions: { label: string; icon: LucideIcon; color: string }[] = [
  { label: 'Rewrite', icon: RefreshCw, color: 'text-blue-500' },
  { label: 'Expand', icon: Maximize2, color: 'text-violet-500' },
  { label: 'Summarize', icon: Minimize2, color: 'text-emerald-500' },
  { label: 'Translate', icon: Languages, color: 'text-amber-500' },
  { label: 'Generate image', icon: ImageIcon, color: 'text-rose-500' },
  { label: 'Generate chart', icon: ChartBar, color: 'text-cyan-500' },
  { label: 'Improve design', icon: Palette, color: 'text-indigo-500' },
  { label: 'Suggest edits', icon: Wand2, color: 'text-purple-500' },
];

export function AiAssistantPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;
    const userMsg: Msg = { id: `u${Date.now()}`, role: 'user', content };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessages((m) => [
        ...m,
        {
          id: `a${Date.now()}`,
          role: 'assistant',
          content:
            "Here's a refined version with stronger copy and better visual hierarchy. I've adjusted the headline to be more action-oriented and tightened the spacing. Want me to apply these changes to the slide?",
        },
      ]);
    }, 1100);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-white shadow-glow">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">AI Assistant</p>
            <p className="text-[10px] text-muted-foreground">DocumentOS AI</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-3">
        <div className="space-y-3">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'flex',
                m.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm',
                  m.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                )}
              >
                {m.content}
              </div>
            </motion.div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex gap-1 rounded-2xl bg-muted px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-3">
        <div className="mb-3 grid grid-cols-4 gap-1.5">
          {actions.map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.label}
                onClick={() => send(a.label)}
                className="flex flex-col items-center gap-1 rounded-lg border bg-card p-2 text-[10px] font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:bg-accent/30 hover:text-foreground"
              >
                <Icon className={cn('h-4 w-4', a.color)} />
                {a.label}
              </button>
            );
          })}
        </div>
        <div className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Ask AI to edit, generate, or improve…"
            className="min-h-[60px] resize-none pr-10 text-sm"
          />
          <Button
            size="icon"
            className="absolute bottom-2 right-2 h-7 w-7"
            onClick={() => send()}
            disabled={loading}
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
