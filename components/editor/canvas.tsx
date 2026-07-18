'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const slideElements = [
  {
    id: 'el1',
    type: 'heading',
    x: 64,
    y: 56,
    w: 520,
    h: 64,
    content: 'Build the future of work',
  },
  {
    id: 'el2',
    type: 'subheading',
    x: 64,
    y: 128,
    w: 440,
    h: 28,
    content: 'AI-powered documents that move at the speed of thought.',
  },
  {
    id: 'el3',
    type: 'button',
    x: 64,
    y: 360,
    w: 140,
    h: 44,
    content: 'Get started',
  },
  {
    id: 'el4',
    type: 'graphic',
    x: 560,
    y: 180,
    w: 200,
    h: 200,
  },
];

export function EditorCanvas({ zoom }: { zoom: number }) {
  const [selected, setSelected] = useState<string | null>('el1');

  return (
    <div className="relative h-full w-full overflow-auto scrollbar-thin">
      <div
        className="flex min-h-full items-center justify-center p-10"
        style={{ zoom: zoom / 100 }}
      >
        <div
          className="relative aspect-[16/9] w-[800px] shrink-0 rounded-xl bg-white shadow-xl ring-1 ring-black/5"
          onClick={() => setSelected(null)}
        >
          <div className="absolute inset-0 grid-pattern opacity-20" />
          {slideElements.map((el) => (
            <motion.div
              key={el.id}
              drag
              dragMomentum={false}
              onDragStart={() => setSelected(el.id)}
              onClick={(e) => {
                e.stopPropagation();
                setSelected(el.id);
              }}
              style={{ left: el.x, top: el.y, width: el.w, height: el.h }}
              className={cn(
                'absolute cursor-move select-none',
                selected === el.id && 'ring-2 ring-primary'
              )}
            >
              {el.type === 'heading' && (
                <h1 className="font-display text-3xl font-bold text-slate-900">
                  {el.content}
                </h1>
              )}
              {el.type === 'subheading' && (
                <p className="text-base text-slate-500">{el.content}</p>
              )}
              {el.type === 'button' && (
                <button className="h-full w-full rounded-lg bg-blue-600 text-sm font-medium text-white">
                  {el.content}
                </button>
              )}
              {el.type === 'graphic' && (
                <div className="h-full w-full rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 shadow-lg" />
              )}
              {selected === el.id && (
                <>
                  <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full border-2 border-primary bg-white" />
                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full border-2 border-primary bg-white" />
                  <span className="absolute -left-1 -bottom-1 h-2 w-2 rounded-full border-2 border-primary bg-white" />
                  <span className="absolute -right-1 -bottom-1 h-2 w-2 rounded-full border-2 border-primary bg-white" />
                </>
              )}
            </motion.div>
          ))}

          <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-primary/20" />
          <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-primary/20" />
        </div>
      </div>
    </div>
  );
}
