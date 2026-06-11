import { constitution } from '@/data/constitution';
import { chapterSummaries } from '@/data/chapters';
import { useStore } from '@/lib/store';
import { ChapterView } from './ChapterView';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'framer-motion';

export function ConstitutionReader() {
  const { selectedChapterId, selectChapter } = useStore();

  // Show chapter view if a chapter is selected
  if (selectedChapterId) {
    const chapter = constitution.chapters.find((c) => c.id === selectedChapterId);
    if (chapter) return <ChapterView chapter={chapter} />;
  }

  return (
    <div>
      {/* Preamble */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Card className="p-5">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Preamble</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
            "{constitution.preamble}"
          </p>
        </Card>
      </motion.div>

      {/* Chapter List */}
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Chapters</h2>
      <div className="space-y-3">
        {chapterSummaries.map((summary, index) => {
          const chapter = constitution.chapters.find((c) => c.id === summary.id);
          const sectionCount = chapter?.sections.length || 0;

          return (
            <motion.div
              key={summary.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                hoverable
                onClick={() => {
                  if (chapter) selectChapter(chapter.id);
                }}
                className="p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center justify-center w-7 h-7 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 rounded-lg text-xs font-bold">
                        {summary.number}
                      </span>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {summary.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {summary.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="default">{summary.sectionRange}</Badge>
                      {sectionCount > 0 && (
                        <span className="text-xs text-gray-400">
                          {sectionCount} section{sectionCount !== 1 ? 's' : ''} loaded
                        </span>
                      )}
                    </div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 shrink-0 mt-1">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <Card className="p-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                {constitution.chapters.length}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Chapters</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                {constitution.chapters.reduce((acc, ch) => acc + ch.sections.length, 0)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Sections</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                {constitution.year}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Constitution</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
