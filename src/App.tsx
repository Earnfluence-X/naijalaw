import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Layout } from '@/components/layout/Layout';
import { ConstitutionReader } from '@/components/reader/ConstitutionReader';
import { SearchView } from '@/components/search/SearchView';
import { KnowYourRights } from '@/components/rights/KnowYourRights';
import { BookmarkList } from '@/components/bookmarks/BookmarkList';
import { SettingsPanel } from '@/components/settings/SettingsPanel';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const { currentView, theme } = useStore();

  // Apply theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const renderView = () => {
    switch (currentView) {
      case 'reader':
        return <ConstitutionReader />;
      case 'search':
        return <SearchView />;
      case 'rights':
        return <KnowYourRights />;
      case 'bookmarks':
        return <BookmarkList />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <ConstitutionReader />;
    }
  };

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
