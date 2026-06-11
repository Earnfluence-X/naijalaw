export interface ChapterSummary {
  id: string;
  number: number;
  title: string;
  description: string;
  sectionRange: string;
  keyTopics: string[];
}

export const chapterSummaries: ChapterSummary[] = [
  {
    id: 'ch1',
    number: 1,
    title: 'General Provisions',
    description: 'Establishes Nigeria as a sovereign state, defines its structure as a federation of 36 states and FCT, and affirms the supremacy of the Constitution.',
    sectionRange: 'Sections 1-12',
    keyTopics: ['Constitutional Supremacy', 'Federation Structure', '36 States', 'Local Government Areas', 'Federal Capital Territory'],
  },
  {
    id: 'ch2',
    number: 2,
    title: 'Fundamental Objectives and Directive Principles of State Policy',
    description: 'Sets out the goals and principles the government must pursue, covering political, economic, social, educational, foreign policy, and environmental objectives.',
    sectionRange: 'Sections 13-24',
    keyTopics: ['Democracy', 'Social Justice', 'Federal Character', 'Free Education', 'Environmental Protection', 'National Ethics'],
  },
  {
    id: 'ch3',
    number: 3,
    title: 'Citizenship',
    description: 'Defines who is a Nigerian citizen (by birth, registration, or naturalization), dual citizenship rules, and how citizenship can be renounced or revoked.',
    sectionRange: 'Sections 25-32',
    keyTopics: ['Citizenship by Birth', 'Naturalization', 'Dual Citizenship', 'Renunciation'],
  },
  {
    id: 'ch4',
    number: 4,
    title: 'Fundamental Rights',
    description: 'Guarantees fundamental human rights including the right to life, dignity, liberty, fair hearing, privacy, religion, expression, assembly, movement, and non-discrimination.',
    sectionRange: 'Sections 33-46',
    keyTopics: ['Right to Life', 'Dignity', 'Personal Liberty', 'Fair Hearing', 'Freedom of Expression', 'Non-Discrimination'],
  },
  {
    id: 'ch5',
    number: 5,
    title: 'The Legislature',
    description: 'Establishes the National Assembly (Senate and House of Representatives), defines legislative powers, lawmaking procedures, and the structure of state legislatures.',
    sectionRange: 'Sections 47-129',
    keyTopics: ['National Assembly', 'Senate', 'House of Representatives', 'Lawmaking', 'State House of Assembly'],
  },
  {
    id: 'ch6',
    number: 6,
    title: 'The Executive',
    description: 'Establishes the office of President, defines executive powers, qualifications, election procedures, tenure, impeachment, and the federal executive structure.',
    sectionRange: 'Sections 130-229',
    keyTopics: ['President', 'Vice President', 'Ministers', 'Executive Powers', 'Governors', 'Impeachment'],
  },
  {
    id: 'ch7',
    number: 7,
    title: 'The Judicature',
    description: 'Establishes the court system including the Supreme Court, Court of Appeal, Federal High Court, State High Courts, and specialized courts.',
    sectionRange: 'Sections 230-296',
    keyTopics: ['Supreme Court', 'Court of Appeal', 'Federal High Court', 'State Courts', 'Judicial Independence'],
  },
  {
    id: 'ch8',
    number: 8,
    title: 'Federal Capital Territory and Supplementary Provisions',
    description: 'Provides for the governance of the Federal Capital Territory (Abuja) and general supplementary provisions for the Constitution.',
    sectionRange: 'Sections 297-304',
    keyTopics: ['FCT Abuja', 'Governance', 'Administration'],
  },
  {
    id: 'ch9',
    number: 9,
    title: 'Amendment of the Constitution',
    description: 'Defines the process for amending the Constitution, requiring supermajority votes from the National Assembly and state legislatures.',
    sectionRange: 'Section 9',
    keyTopics: ['Constitutional Amendment', 'Two-Thirds Majority', 'Four-Fifths Majority'],
  },
  {
    id: 'ch10',
    number: 10,
    title: 'Miscellaneous Provisions',
    description: 'Covers emergency powers, executive immunity, interpretation of the Constitution, and other supplementary matters.',
    sectionRange: 'Sections 305-320',
    keyTopics: ['State of Emergency', 'Presidential Immunity', 'Interpretation', 'Definitions'],
  },
];
