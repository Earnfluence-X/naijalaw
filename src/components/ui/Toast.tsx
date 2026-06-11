import { useStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

export function Toast() {
  const { toastMessage } = useStore();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-3 rounded-lg shadow-lg text-sm font-medium"
        >
          {toastMessage}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
