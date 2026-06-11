import { Section, Chapter, SearchResult } from '@/types';
import { constitution } from '@/data/constitution';

interface IndexEntry {
  section: Section;
  chapter: Chapter;
  searchText: string;
}

let searchIndex: IndexEntry[] = [];

const buildIndex = () => {
  if (searchIndex.length > 0) return;
  constitution.chapters.forEach((chapter) => {
    chapter.sections.forEach((section) => {
      searchIndex.push({
        section,
        chapter,
        searchText: `${section.number} ${section.title} ${section.content} ${section.plainEnglish} ${section.tags.join(' ')}`.toLowerCase(),
      });
    });
  });
};

export const searchConstitution = (query: string): SearchResult[] => {
  buildIndex();
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const terms = q.split(/\s+/).filter(Boolean);
  const results: SearchResult[] = [];

  searchIndex.forEach(({ section, chapter, searchText }) => {
    // Check if all terms are found
    const allMatch = terms.every((term) => searchText.includes(term));
    if (!allMatch) return;

    // Find the first matching term position for excerpt
    let firstIndex = searchText.length;
    terms.forEach((term) => {
      const idx = searchText.indexOf(term);
      if (idx !== -1 && idx < firstIndex) firstIndex = idx;
    });

    // Determine match type
    let matchType: SearchResult['matchType'] = 'content';
    const titleLower = section.title.toLowerCase();
    if (terms.some((t) => titleLower.includes(t))) matchType = 'title';
    else if (section.tags.some((tag) => terms.some((t) => tag.toLowerCase().includes(t)))) matchType = 'tags';

    // Build excerpt
    const start = Math.max(0, firstIndex - 40);
    const end = Math.min(searchText.length, firstIndex + 150);
    let excerpt = searchText.substring(start, end);
    if (start > 0) excerpt = '...' + excerpt;
    if (end < searchText.length) excerpt = excerpt + '...';

    // Calculate relevance
    let score = 1;
    if (matchType === 'title') score = 3;
    if (section.number.toLowerCase() === q) score = 5;
    if (titleLower === q) score = 5;
    // Bonus for multiple term matches
    const matchCount = terms.filter((t) => searchText.includes(t)).length;
    score += matchCount * 0.5;

    results.push({
      section,
      chapter,
      matchType,
      matchExcerpt: excerpt,
      relevanceScore: score,
    });
  });

  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
};

export const getSectionById = (id: string): { section: Section; chapter: Chapter } | null => {
  for (const chapter of constitution.chapters) {
    const section = chapter.sections.find((s) => s.id === id);
    if (section) return { section, chapter };
  }
  return null;
};

export const getAllSections = (): { section: Section; chapter: Chapter }[] => {
  const result: { section: Section; chapter: Chapter }[] = [];
  constitution.chapters.forEach((chapter) => {
    chapter.sections.forEach((section) => {
      result.push({ section, chapter });
    });
  });
  return result;
};

export const getSectionsByTag = (tag: string): { section: Section; chapter: Chapter }[] => {
  const results: { section: Section; chapter: Chapter }[] = [];
  constitution.chapters.forEach((chapter) => {
    chapter.sections.forEach((section) => {
      if (section.tags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
        results.push({ section, chapter });
      }
    });
  });
  return results;
};
