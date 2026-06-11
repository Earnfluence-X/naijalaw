import { useState, useCallback, useMemo } from 'react';
import { SearchResult } from '@/types';
import { searchConstitution } from '@/lib/searchEngine';
import { useStore } from '@/lib/store';

export function useSearch() {
  const { searchQuery, setSearchQuery, addRecentSearch, recentSearches, clearRecentSearches } = useStore();
  const [isSearching, setIsSearching] = useState(false);

  const results: SearchResult[] = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchConstitution(searchQuery);
  }, [searchQuery]);

  const performSearch = useCallback(
    (query: string) => {
      setIsSearching(true);
      setSearchQuery(query);
      if (query.trim()) {
        addRecentSearch(query.trim());
      }
      // Simulate minimal delay for UX
      setTimeout(() => setIsSearching(false), 50);
    },
    [setSearchQuery, addRecentSearch]
  );

  return {
    query: searchQuery,
    results,
    isSearching,
    performSearch,
    recentSearches,
    clearRecentSearches,
  };
}
