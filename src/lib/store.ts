import { create } from 'zustand';
import { Bookmark, ViewMode, Theme } from '@/types';

interface AppState {
  // Navigation
  currentView: ViewMode;
  setView: (view: ViewMode) => void;

  // Reader
  selectedChapterId: string | null;
  selectedSectionId: string | null;
  selectChapter: (id: string | null) => void;
  selectSection: (id: string | null) => void;

  // Plain English mode
  plainEnglishMode: boolean;
  togglePlainEnglish: () => void;

  // Bookmarks
  bookmarks: Bookmark[];
  addBookmark: (sectionId: string, folder?: string, note?: string) => void;
  removeBookmark: (sectionId: string) => void;
  isBookmarked: (sectionId: string) => boolean;
  updateBookmarkNote: (sectionId: string, note: string) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  recentSearches: string[];
  addRecentSearch: (q: string) => void;
  clearRecentSearches: () => void;

  // Audio
  isPlaying: boolean;
  currentAudioSection: string | null;
  playSection: (sectionId: string) => void;
  stopAudio: () => void;
  setPlaying: (playing: boolean) => void;

  // Theme
  theme: Theme;
  toggleTheme: () => void;

  // Font size
  fontSize: number;
  setFontSize: (size: number) => void;

  // Compare
  compareCountry: string | null;
  setCompareCountry: (country: string | null) => void;

  // Toast
  toastMessage: string | null;
  showToast: (message: string) => void;
  clearToast: () => void;
}

const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or not available
  }
};

export const useStore = create<AppState>((set, get) => ({
  // Navigation
  currentView: 'reader',
  setView: (view) => set({ currentView: view }),

  // Reader
  selectedChapterId: null,
  selectedSectionId: null,
  selectChapter: (id) => set({ selectedChapterId: id, selectedSectionId: null }),
  selectSection: (id) => set({ selectedSectionId: id }),

  // Plain English
  plainEnglishMode: loadFromStorage('naijalaw_plain_english', false),
  togglePlainEnglish: () => {
    const newVal = !get().plainEnglishMode;
    saveToStorage('naijalaw_plain_english', newVal);
    set({ plainEnglishMode: newVal });
  },

  // Bookmarks
  bookmarks: loadFromStorage<Bookmark[]>('naijalaw_bookmarks', []),
  addBookmark: (sectionId, folder = 'General', note = '') => {
    const bookmarks = [...get().bookmarks];
    if (!bookmarks.find((b) => b.sectionId === sectionId)) {
      bookmarks.push({
        sectionId,
        folder,
        note,
        createdAt: new Date().toISOString(),
      });
      saveToStorage('naijalaw_bookmarks', bookmarks);
      set({ bookmarks, toastMessage: 'Bookmark added' });
      setTimeout(() => set({ toastMessage: null }), 2000);
    }
  },
  removeBookmark: (sectionId) => {
    const bookmarks = get().bookmarks.filter((b) => b.sectionId !== sectionId);
    saveToStorage('naijalaw_bookmarks', bookmarks);
    set({ bookmarks, toastMessage: 'Bookmark removed' });
    setTimeout(() => set({ toastMessage: null }), 2000);
  },
  isBookmarked: (sectionId) => get().bookmarks.some((b) => b.sectionId === sectionId),
  updateBookmarkNote: (sectionId, note) => {
    const bookmarks = get().bookmarks.map((b) =>
      b.sectionId === sectionId ? { ...b, note } : b
    );
    saveToStorage('naijalaw_bookmarks', bookmarks);
    set({ bookmarks });
  },

  // Search
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),
  recentSearches: loadFromStorage<string[]>('naijalaw_recent_searches', []),
  addRecentSearch: (q) => {
    if (!q.trim()) return;
    const searches = [q, ...get().recentSearches.filter((s) => s !== q)].slice(0, 10);
    saveToStorage('naijalaw_recent_searches', searches);
    set({ recentSearches: searches });
  },
  clearRecentSearches: () => {
    saveToStorage('naijalaw_recent_searches', []);
    set({ recentSearches: [] });
  },

  // Audio
  isPlaying: false,
  currentAudioSection: null,
  playSection: (sectionId) => set({ currentAudioSection: sectionId, isPlaying: true }),
  stopAudio: () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    set({ isPlaying: false, currentAudioSection: null });
  },
  setPlaying: (playing) => set({ isPlaying: playing }),

  // Theme
  theme: loadFromStorage<Theme>('naijalaw_theme', 'light'),
  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    saveToStorage('naijalaw_theme', newTheme);
    set({ theme: newTheme });
  },

  // Font size
  fontSize: loadFromStorage<number>('naijalaw_font_size', 16),
  setFontSize: (size) => {
    saveToStorage('naijalaw_font_size', size);
    set({ fontSize: size });
  },

  // Compare
  compareCountry: null,
  setCompareCountry: (country) => set({ compareCountry: country }),

  // Toast
  toastMessage: null,
  showToast: (message) => {
    set({ toastMessage: message });
    setTimeout(() => set({ toastMessage: null }), 2500);
  },
  clearToast: () => set({ toastMessage: null }),
}));
