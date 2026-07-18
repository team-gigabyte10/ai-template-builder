import { create } from 'zustand';
import { currentUser, defaultBrandKit } from '@/lib/mock-data';
import { BrandKit, User } from '@/types';
import { Locale, translations } from '@/lib/i18n';

interface AppState {
  user: User;
  brandKit: BrandKit;
  commandOpen: boolean;
  locale: Locale;
  setCommandOpen: (open: boolean) => void;
  updateUser: (patch: Partial<User>) => void;
  updateBrandKit: (patch: Partial<BrandKit>) => void;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: currentUser,
  brandKit: defaultBrandKit,
  commandOpen: false,
  locale: 'en',
  setCommandOpen: (commandOpen) => set({ commandOpen }),
  updateUser: (patch) => set((s) => ({ user: { ...s.user, ...patch } })),
  updateBrandKit: (patch) =>
    set((s) => ({ brandKit: { ...s.brandKit, ...patch } })),
  setLocale: (locale) => set({ locale }),
  t: (key: string) => {
    const { locale } = get();
    return translations[locale][key] ?? translations.en[key] ?? key;
  },
}));

export function formatCurrency(amount: number, locale: Locale): string {
  const rate = 120; // USD to BDT approx
  const taka = Math.round(amount * rate);
  const formatted = taka.toLocaleString(locale === 'bn' ? 'bn-BD' : 'en-US');
  return `৳${formatted}`;
}
