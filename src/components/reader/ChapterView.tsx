import { Chapter } from '@/types';
import { SectionView } from './SectionView';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

interface ChapterViewProps {
  chapter: Chapter;
}

export function ChapterView({ chapter }: ChapterViewProps) {
  const { selectChapter } = useStore();

  return (
    <div>
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-4"
      >
        <Button variant="ghost" size="sm" onClick={() => selectChapter(null)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          All Chapters
        </Button>
      </motion.div>

      {/* Chapter Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="bg-green-700 dark:bg-green-800 text-white rounded-xl p-5">
          <p className="text-green-200 text-sm font-medium">Chapter {chapter.number}</p>
          <h2 className="text-xl font-bold mt-1">{chapter.title}</h2>
          {chapter.part && (
            <p className="text-green-200 text-sm mt-1">{chapter.part}</p>
          )}
          <p className="text-green-100 text-sm mt-2">
            {chapter.sections.length} section{chapter.sections.length !== 1 ? 's' : ''}
          </p>
        </div>
      </motion.div>

      {/* Sections */}
      <div className="space-y-3">
        {chapter.sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <SectionView section={section} chapter={chapter} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
