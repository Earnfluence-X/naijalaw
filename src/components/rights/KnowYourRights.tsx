import { useState } from 'react';
import { rightsGuides } from '@/data/rights';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

function RightsIcon({ icon, className }: { icon: string; className?: string }) {
  const props = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className };

  switch (icon) {
    case 'shield':
      return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
    case 'megaphone':
      return <svg {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
    case 'scales':
      return <svg {...props}><line x1="12" y1="3" x2="12" y2="21" /><polyline points="8 7 4 19" /><polyline points="16 7 20 19" /><line x1="2" y1="19" x2="6" y2="19" /><line x1="18" y1="19" x2="22" y2="19" /><line x1="7" y1="3" x2="17" y2="3" /></svg>;
    case 'home':
      return <svg {...props}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
    case 'book':
      return <svg {...props}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>;
    case 'users':
      return <svg {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case 'briefcase':
      return <svg {...props}><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>;
    case 'wifi':
      return <svg {...props}><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>;
    default:
      return <svg {...props}><circle cx="12" cy="12" r="10" /></svg>;
  }
}

export function KnowYourRights() {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [expandedScenario, setExpandedScenario] = useState<number | null>(null);

  const categories = [...new Set(rightsGuides.map((g) => g.category))];
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredGuides = activeCategory
    ? rightsGuides.filter((g) => g.category === activeCategory)
    : rightsGuides;

  const activeGuide = selectedGuide
    ? rightsGuides.find((g) => g.id === selectedGuide)
    : null;

  if (activeGuide) {
    return (
      <div>
        <Button variant="ghost" size="sm" onClick={() => { setSelectedGuide(null); setExpandedScenario(null); }} className="mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Guides
        </Button>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-green-700 dark:bg-green-800 text-white rounded-xl p-5 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <RightsIcon icon={activeGuide.icon} className="text-green-200" />
              <Badge variant="green" className="bg-green-600 text-green-100">{activeGuide.category}</Badge>
            </div>
            <h2 className="text-xl font-bold">{activeGuide.title}</h2>
            <p className="text-green-100 text-sm mt-2">{activeGuide.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {activeGuide.relevantSections.map((s) => (
                <Badge key={s} variant="green" className="bg-green-600/60 text-green-100">
                  Section {s.replace('s', '')}
                </Badge>
              ))}
            </div>
          </div>

          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Real-World Scenarios</h3>

          <div className="space-y-3">
            {activeGuide.scenarios.map((scenario, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  onClick={() => setExpandedScenario(expandedScenario === index ? null : index)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Badge variant="blue" className="mb-2">Scenario {index + 1}</Badge>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {scenario.situation}
                      </p>
                    </div>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`text-gray-400 transition-transform shrink-0 ${expandedScenario === index ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedScenario === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-3">
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                          <p className="text-xs font-semibold text-green-800 dark:text-green-300 mb-1">YOUR RIGHTS</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{scenario.yourRights}</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                          <p className="text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1">WHAT TO DO</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{scenario.whatToDo}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-400 mb-1">RELEVANT LAW</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 italic">{scenario.relevantLaw}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <Card className="p-5 bg-gradient-to-br from-green-700 to-green-800 dark:from-green-800 dark:to-green-900 border-green-600 text-white">
          <h2 className="text-lg font-bold">Know Your Constitutional Rights</h2>
          <p className="text-green-100 text-sm mt-1">
            Practical guides to understanding and exercising your fundamental rights under the 1999 Constitution.
          </p>
        </Card>
      </motion.div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
            !activeCategory
              ? 'bg-green-700 text-white border-green-700'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-green-300'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
              activeCategory === cat
                ? 'bg-green-700 text-white border-green-700'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-green-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Guides list */}
      <div className="grid gap-3">
        {filteredGuides.map((guide, index) => (
          <motion.div
            key={guide.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card hoverable className="p-4" onClick={() => setSelectedGuide(guide.id)}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center shrink-0">
                  <RightsIcon icon={guide.icon} className="w-5 h-5 text-green-700 dark:text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{guide.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{guide.category}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{guide.description}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Badge variant="green">{guide.scenarios.length} scenarios</Badge>
                    <Badge variant="default">{guide.relevantSections.length} sections</Badge>
                  </div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 shrink-0 mt-2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
