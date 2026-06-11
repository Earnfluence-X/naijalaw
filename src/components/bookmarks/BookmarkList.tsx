import { useBookmarks } from '@/hooks/useBookmarks';
import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export function BookmarkList() {
  const { bookmarkedSections, removeBookmark } = useBookmarks();
  const { setView, selectChapter, selectSection } = useStore();

  const navigateToSection = (sectionId: string, chapterId: string) => {
    selectChapter(chapterId);
    selectSection(sectionId);
    setView('reader');
  };

  if (bookmarkedSections.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-gray-300 dark:text-gray-600 mb-4">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No bookmarks yet
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto mb-6">
          Bookmark constitutional sections you want to reference later. Tap the bookmark icon on any section.
        </p>
        <Button variant="primary" onClick={() => setView('reader')}>
          Browse Constitution
        </Button>
      </motion.div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-4"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {bookmarkedSections.length} bookmark{bookmarkedSections.length !== 1 ? 's' : ''}
        </p>
      </motion.div>

      <AnimatePresence>
        <div className="space-y-3">
          {bookmarkedSections.map((item, index) => {
            if (!item) return null;
            const { section, chapter, bookmark } = item;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => navigateToSection(section.id, chapter.id)}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="green">Section {section.number}</Badge>
                        <span className="text-xs text-gray-400">Chapter {chapter.number}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {section.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {section.plainEnglish || section.content}
                      </p>
                      {bookmark.note && (
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 italic">
                          Note: {bookmark.note}
                        </p>
                      )}
                      <p className="text-[10px] text-gray-400 mt-1">
                        Saved {new Date(bookmark.createdAt).toLocaleDateString('en-NG')}
                      </p>
                    </div>
                    <button
                      onClick={() => removeBookmark(section.id)}
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors shrink-0"
                      aria-label="Remove bookmark"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>
    </div>
  );
}
