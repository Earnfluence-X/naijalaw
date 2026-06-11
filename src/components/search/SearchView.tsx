import { useState, useRef, useEffect } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { useStore } from '@/lib/store';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';

export function SearchView() {
  const { query, results, performSearch, recentSearches, clearRecentSearches } = useSearch();
  const { setView, selectChapter, selectSection } = useStore();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(inputValue);
  };

  const handleQuickSearch = (term: string) => {
    setInputValue(term);
    performSearch(term);
  };

  const navigateToSection = (sectionId: string, chapterId: string) => {
    selectChapter(chapterId);
    selectSection(sectionId);
    setView('reader');
  };

  const quickSearchTerms = [
    'fundamental rights',
    'president',
    'arrest',
    'freedom of expression',
    'discrimination',
    'impeachment',
    'citizenship',
    'education',
  ];

  return (
    <div>
      {/* Search Input */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              performSearch(e.target.value);
            }}
            placeholder="Search the Constitution..."
            className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:text-white placeholder:text-gray-400"
          />
          {inputValue && (
            <button
              type="button"
              onClick={() => {
                setInputValue('');
                performSearch('');
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </form>

      {/* Quick Search Tags */}
      {!query && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Quick search</p>
          <div className="flex flex-wrap gap-2">
            {quickSearchTerms.map((term) => (
              <button
                key={term}
                onClick={() => handleQuickSearch(term)}
                className="px-3 py-1.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors border border-green-200 dark:border-green-800"
              >
                {term}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recent Searches */}
      {!query && recentSearches.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Recent searches</p>
            <button
              onClick={clearRecentSearches}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Clear all
            </button>
          </div>
          <div className="space-y-1">
            {recentSearches.map((search) => (
              <button
                key={search}
                onClick={() => handleQuickSearch(search)}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-left"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 shrink-0">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
                <span className="text-sm text-gray-700 dark:text-gray-300">{search}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Results */}
      {query && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
            </p>
          </div>

          <AnimatePresence mode="wait">
            {results.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {results.map((result) => (
                  <Card
                    key={result.section.id}
                    hoverable
                    className="p-4"
                    onClick={() => navigateToSection(result.section.id, result.chapter.id)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="green">Section {result.section.number}</Badge>
                      <Badge variant={result.matchType === 'title' ? 'blue' : 'default'}>
                        {result.matchType} match
                      </Badge>
                      <span className="text-xs text-gray-400">
                        Ch. {result.chapter.number}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                      {result.section.title}
                    </h3>
                    <p
                      className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: result.matchExcerpt.replace(
                          new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'),
                          '<mark class="bg-yellow-200 dark:bg-yellow-700 rounded px-0.5">$1</mark>'
                        ),
                      }}
                    />
                  </Card>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-gray-300 dark:text-gray-600 mb-4">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                <p className="text-gray-500 dark:text-gray-400 font-medium">No results found</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Try searching with different keywords
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
