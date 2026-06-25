import { create } from 'zustand';

interface AppStore {
  lang: 'fr' | 'en';
  setLang: (lang: 'fr' | 'en') => void;
}

export const useAppStore = create<AppStore>((set) => ({
  lang: 'fr',
  setLang: (lang) => set({ lang }),
}));
