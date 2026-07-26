import { create } from 'zustand';

interface AppStore {
  lang: 'fr' | 'en';
  setLang: (lang: 'fr' | 'en') => void;
}

export const useAppStore = create<AppStore>((set) => ({
  // 'en' par défaut pour que le rendu serveur et la première passe d'hydratation
  // coïncident. ClientRoot bascule sur la langue du navigateur après le montage.
  lang: 'en',
  setLang: (lang) => set({ lang }),
}));
