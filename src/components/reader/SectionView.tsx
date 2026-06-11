import { Section, Chapter } from '@/types';
import { useStore } from '@/lib/store';
import { useAudio } from '@/hooks/useAudio';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionViewProps {
  section: Section;
  chapter: Chapter;
  highlight?: string;
}

export function SectionView({ section, chapter, highlight }: SectionViewProps) {
  const { plainEnglishMode, togglePlainEnglish, fontSize, isBookmarked, addBookmark, removeBookmark, selectSection, selectedSectionId } = useStore();
  const { togglePlayback, isPlaying, currentAudioSection } = useAudio();
  const bookmarked = isBookmarked(section.id);
  const isExpanded = selectedSectionId === section.id;
  const isCurrentlyPlaying = isPlaying && currentAudioSection === section.id;

  const renderContent = (text: string) => {
    if (!highlight) return text;
    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 dark:bg-yellow-700 rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden">
        {/* Section Header */}
        <div
          className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
          onClick={() => selectSection(isExpanded ? null : section.id)}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="green">Section {section.number}</Badge>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Chapter {chapter.number}
                </span>
                {section.lastAmended && (
                  <Badge variant="yellow">Amended</Badge>
                )}
              </div>
              <h3 className="mt-2 font-semibold text-gray-900 dark:text-white text-base">
                {renderContent(section.title)}
              </h3>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {/* Bookmark button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  bookmarked ? removeBookmark(section.id) : addBookmark(section.id);
                }}
                className={cn(
                  'p-1.5 rounded-md transition-colors',
                  bookmarked ? 'text-green-700 dark:text-green-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                )}
                aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
              {/* Expand arrow */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={cn('text-gray-400 transition-transform', isExpanded && 'rotate-180')}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {/* Toggle and Audio Controls */}
            <div className="px-4 pb-2 flex items-center gap-2 flex-wrap">
              <Button
                variant={plainEnglishMode ? 'primary' : 'outline'}
                size="sm"
                onClick={togglePlainEnglish}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
                {plainEnglishMode ? 'Plain English: ON' : 'Plain English: OFF'}
              </Button>
              <Button
                variant={isCurrentlyPlaying ? 'primary' : 'outline'}
                size="sm"
                onClick={() => togglePlayback(section.id)}
              >
                {isCurrentlyPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
                {isCurrentlyPlaying ? 'Playing...' : 'Listen'}
              </Button>
            </div>

            {/* Section Content */}
            <div className="px-4 pb-4">
              <div
                className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed"
                style={{ fontSize: `${fontSize}px` }}
              >
                {plainEnglishMode && section.plainEnglish ? (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <p className="text-sm font-medium text-green-800 dark:text-green-300 mb-2">
                      Plain English Explanation
                    </p>
                    <p className="text-gray-800 dark:text-gray-200">
                      {renderContent(section.plainEnglish)}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-700 dark:text-gray-300">
                    {renderContent(section.content)}
                  </p>
                )}
              </div>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {section.tags.map((tag) => (
                  <Badge key={tag} variant="gray">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Related Cases */}
              {section.relatedCases.length > 0 && (
                <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    Related Case Law
                  </h4>
                  {section.relatedCases.map((c) => (
                    <div
                      key={c.id}
                      className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-2 last:mb-0"
                    >
                      <p className="font-medium text-sm text-blue-900 dark:text-blue-300">
                        {c.name} ({c.year})
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-400 mt-0.5">
                        {c.citation}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                        {c.summary}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">
                        Relevance: {c.relevance}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}
