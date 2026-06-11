# NaijaLaw - Nigerian Constitution App

A comprehensive, production-ready application for searching, reading, and understanding the Constitution of the Federal Republic of Nigeria, 1999 (As Amended).

## Features

### Core Reading Experience
- **Full Constitution Text**: The 1999 Constitution as amended through 2023, organized by chapters and sections
- **Plain English Toggle**: Every section has a plain English explanation that translates legal language into everyday language
- **Adjustable Font Size**: Customize reading comfort with adjustable text size (12px-24px)
- **Dark Mode**: Full dark mode support for comfortable reading in any lighting

### Powerful Search
- **Instant Search**: Search the entire Constitution in milliseconds
- **Multi-term Matching**: Search with multiple keywords for precise results
- **Search Result Highlighting**: Matching terms are highlighted in results
- **Quick Search Tags**: Pre-defined common search terms for quick access
- **Recent Searches**: History of recent searches for easy reference

### Know Your Rights
- **8 Curated Guides**: Practical guides covering police encounters, free expression, fair trial, property rights, religious freedom, women's rights, workers' rights, and digital rights
- **Real-World Scenarios**: Each guide includes multiple real-world scenarios with detailed advice
- **Constitutional References**: Every scenario links to relevant constitutional sections
- **Actionable Advice**: Clear guidance on what to do in each situation

### Audio Reading
- **Text-to-Speech**: Listen to any section read aloud using the Web Speech API
- **Plain English Audio**: Toggle between legal text and plain English for audio reading
- **Playback Controls**: Play, pause, and stop audio playback

### Bookmark System
- **Save Sections**: Bookmark any section for quick reference
- **Persistent Storage**: Bookmarks are saved to localStorage and persist across sessions
- **Quick Navigation**: Jump directly to bookmarked sections from the bookmarks view

### Constitutional Comparison
- **4 Countries**: Compare Nigeria's Constitution with the United States, South Africa, Ghana, and Kenya
- **Topic-Based**: Comparisons organized by topic (Head of State, Legislature, Bill of Rights, etc.)
- **Key Differences**: Clear highlighting of major differences between constitutional systems

### Amendment History
- **Timeline View**: Visual timeline of constitutional amendments from 2010 to present
- **Status Tracking**: Track enacted, pending, and proposed amendments
- **Affected Sections**: See which sections are affected by each amendment

### Landmark Cases
- **12 Key Cases**: Curated collection of landmark Supreme Court and appellate decisions
- **Case Summaries**: Clear summaries of each case and its significance
- **Constitutional Links**: Each case is linked to relevant constitutional sections

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Animations and transitions
- **Zustand** - State management
- **Web Speech API** - Text-to-speech audio
- **localStorage** - Persistent bookmarks and settings

## Project Structure

```
src/
  App.tsx                          # Main application component
  main.tsx                         # Entry point
  index.css                        # Global styles
  types/
    index.ts                       # TypeScript type definitions
  data/
    constitution.ts                # Full constitution data
    chapters.ts                    # Chapter summaries
    rights.ts                      # Know Your Rights guides
    cases.ts                       # Landmark cases, amendments, comparisons
  lib/
    store.ts                       # Zustand state management
    searchEngine.ts                # Search indexing and querying
    utils.ts                       # Utility functions
  hooks/
    useSearch.ts                   # Search hook
    useBookmarks.ts                # Bookmarks hook
    useAudio.ts                    # Audio/TTS hook
  components/
    layout/
      Layout.tsx                   # Main layout wrapper
      Header.tsx                   # Top header with theme toggle
      BottomNav.tsx                # Bottom navigation bar
    reader/
      ConstitutionReader.tsx       # Main reader with chapter list
      ChapterView.tsx              # Individual chapter view
      SectionView.tsx              # Section display with all features
    search/
      SearchView.tsx               # Search interface
    rights/
      KnowYourRights.tsx           # Rights guides and scenarios
    bookmarks/
      BookmarkList.tsx             # Bookmarks view
    settings/
      SettingsPanel.tsx            # Settings, compare, amendments, cases
    ui/
      Button.tsx                   # Reusable button component
      Card.tsx                     # Card component
      Badge.tsx                    # Badge component
      Toast.tsx                    # Toast notification
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The development server runs on `http://localhost:5173` by default.

### Production Build

```bash
npm run build
```

The production build is output to the `dist/` directory as a single HTML file (using vite-plugin-singlefile).

## Deployment

The built application is a single `index.html` file that can be deployed to any static hosting service:

- **Vercel**: Connect your repository and deploy automatically
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Push the `dist` folder to your `gh-pages` branch
- **Firebase Hosting**: Use `firebase deploy` with the `dist` directory

## Offline Access

The application bundles the entire Constitution as part of the JavaScript bundle. Once loaded, all constitution data, search, and reading features work without an internet connection. Bookmarks and settings are stored in localStorage.

## Browser Support

- Chrome 80+
- Firefox 80+
- Safari 14+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome for Android)

## License

This project is open source. The Constitution of the Federal Republic of Nigeria is a public document.

## Disclaimer

This application is for educational and informational purposes only. It does not constitute legal advice. Always consult a qualified legal practitioner for specific legal issues. The constitutional text is based on publicly available versions and may not reflect the most recent amendments.
