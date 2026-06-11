export interface Constitution {
  title: string;
  year: number;
  lastAmended: string;
  chapters: Chapter[];
  preamble: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  part?: string;
  sections: Section[];
}

export interface Section {
  id: string;
  number: string;
  title: string;
  content: string;
  plainEnglish: string;
  relatedCases: CaseReference[];
  tags: string[];
  lastAmended: string | null;
}

export interface CaseReference {
  id: string;
  name: string;
  year: number;
  citation: string;
  summary: string;
  relevance: string;
}

export interface SearchResult {
  section: Section;
  chapter: Chapter;
  matchType: 'title' | 'content' | 'tags';
  matchExcerpt: string;
  relevanceScore: number;
}

export interface RightGuide {
  id: string;
  title: string;
  category: string;
  description: string;
  relevantSections: string[];
  scenarios: ScenarioExample[];
  icon: string;
}

export interface ScenarioExample {
  situation: string;
  yourRights: string;
  whatToDo: string;
  relevantLaw: string;
}

export interface Bookmark {
  sectionId: string;
  folder: string;
  note: string;
  createdAt: string;
}

export interface Amendment {
  id: string;
  year: number;
  title: string;
  description: string;
  affectedSections: string[];
  status: 'enacted' | 'pending' | 'proposed';
}

export interface ComparisonResult {
  topic: string;
  nigeria: string;
  otherCountry: string;
  countryName: string;
  difference: string;
}

export type ViewMode = 'reader' | 'search' | 'rights' | 'bookmarks' | 'settings';
export type Theme = 'light' | 'dark';
