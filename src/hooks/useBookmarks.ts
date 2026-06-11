import { useMemo } from 'react';
import { useStore } from '@/lib/store';
import { getSectionById } from '@/lib/searchEngine';

export function useBookmarks() {
  const { bookmarks, addBookmark, removeBookmark, isBookmarked, updateBookmarkNote } = useStore();

  const bookmarkedSections = useMemo(() => {
    return bookmarks
      .map((b) => {
        const result = getSectionById(b.sectionId);
        if (!result) return null;
        return {
          ...result,
          bookmark: b,
        };
      })
      .filter(Boolean);
  }, [bookmarks]);

  const folders = useMemo(() => {
    const folderMap = new Map<string, typeof bookmarks>();
    bookmarks.forEach((b) => {
      const folder = b.folder || 'General';
      if (!folderMap.has(folder)) folderMap.set(folder, []);
      folderMap.get(folder)!.push(b);
    });
    return folderMap;
  }, [bookmarks]);

  return {
    bookmarks,
    bookmarkedSections,
    folders,
    addBookmark,
    removeBookmark,
    isBookmarked,
    updateBookmarkNote,
  };
}
