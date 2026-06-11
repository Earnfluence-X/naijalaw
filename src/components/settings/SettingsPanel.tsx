import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { comparisonData, amendments, landmarkCases } from '@/data/cases';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type SubView = 'main' | 'compare' | 'amendments' | 'cases' | 'about';

export function SettingsPanel() {
  const { theme, toggleTheme, fontSize, setFontSize, plainEnglishMode, togglePlainEnglish } = useStore();
  const [subView, setSubView] = useState<SubView>('main');
  const [compareCountry, setCompareCountry] = useState<string | null>(null);
  const [expandedAmendment, setExpandedAmendment] = useState<string | null>(null);
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  if (subView === 'compare') {
    return <CompareView onBack={() => setSubView('main')} compareCountry={compareCountry} setCompareCountry={setCompareCountry} />;
  }
  if (subView === 'amendments') {
    return <AmendmentsView onBack={() => setSubView('main')} expandedId={expandedAmendment} setExpandedId={setExpandedAmendment} />;
  }
  if (subView === 'cases') {
    return <CasesView onBack={() => setSubView('main')} expandedId={expandedCase} setExpandedId={setExpandedCase} />;
  }
  if (subView === 'about') {
    return <AboutView onBack={() => setSubView('main')} />;
  }

  return (
    <div className="space-y-4">
      {/* Reading Settings */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Reading Settings</h3>

          {/* Theme */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
                {theme === 'light' ? (
                  <><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></>
                ) : (
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                )}
              </svg>
              <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
            </div>
            <button
              onClick={toggleTheme}
              className={cn(
                'w-11 h-6 rounded-full transition-colors relative',
                theme === 'dark' ? 'bg-green-600' : 'bg-gray-300'
              )}
            >
              <div className={cn(
                'w-5 h-5 bg-white rounded-full shadow-sm absolute top-0.5 transition-transform',
                theme === 'dark' ? 'translate-x-5.5 left-0' : 'left-0.5'
              )} style={{ transform: theme === 'dark' ? 'translateX(22px)' : 'translateX(0)' }} />
            </button>
          </div>

          {/* Plain English */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
              </svg>
              <span className="text-sm text-gray-700 dark:text-gray-300">Plain English Mode</span>
            </div>
            <button
              onClick={togglePlainEnglish}
              className={cn(
                'w-11 h-6 rounded-full transition-colors relative',
                plainEnglishMode ? 'bg-green-600' : 'bg-gray-300'
              )}
            >
              <div className="w-5 h-5 bg-white rounded-full shadow-sm absolute top-0.5 transition-transform" style={{ transform: plainEnglishMode ? 'translateX(22px)' : 'translateX(0)', left: '2px' }} />
            </button>
          </div>

          {/* Font Size */}
          <div className="py-3">
            <div className="flex items-center gap-3 mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
                <polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" />
              </svg>
              <span className="text-sm text-gray-700 dark:text-gray-300">Font Size: {fontSize}px</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFontSize(Math.max(12, fontSize - 1))}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                A-
              </button>
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="flex-1 accent-green-600"
              />
              <button
                onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg text-base font-bold hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                A+
              </button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Feature Links */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="divide-y divide-gray-100 dark:divide-gray-700">
          <SettingsLink
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="9" height="9" /><rect x="13" y="2" width="9" height="9" /><rect x="2" y="13" width="9" height="9" /><rect x="13" y="13" width="9" height="9" /></svg>}
            title="Compare Constitutions"
            subtitle="See how Nigeria compares with other countries"
            onClick={() => setSubView('compare')}
          />
          <SettingsLink
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>}
            title="Amendment History"
            subtitle="Track changes to the Constitution"
            onClick={() => setSubView('amendments')}
          />
          <SettingsLink
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>}
            title="Landmark Cases"
            subtitle="Key court decisions interpreting the Constitution"
            onClick={() => setSubView('cases')}
          />
          <SettingsLink
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>}
            title="About NaijaLaw"
            subtitle="Information about this application"
            onClick={() => setSubView('about')}
          />
        </Card>
      </motion.div>
    </div>
  );
}

function SettingsLink({ icon, title, subtitle, onClick }: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors text-left">
      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center shrink-0 text-gray-500 dark:text-gray-400">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 shrink-0">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  );
}

function CompareView({ onBack, compareCountry, setCompareCountry }: {
  onBack: () => void;
  compareCountry: string | null;
  setCompareCountry: (c: string | null) => void;
}) {
  const countries = Object.keys(comparisonData);
  const comparisons = compareCountry ? comparisonData[compareCountry] || [] : [];

  return (
    <div>
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        Back
      </Button>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-5 bg-gradient-to-br from-blue-700 to-blue-800 text-white mb-6">
          <h2 className="text-lg font-bold">Compare Constitutions</h2>
          <p className="text-blue-200 text-sm mt-1">
            See how Nigeria's Constitution compares with other African and world constitutions.
          </p>
        </Card>
      </motion.div>

      {/* Country selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {countries.map((country) => (
          <button
            key={country}
            onClick={() => setCompareCountry(compareCountry === country ? null : country)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors border',
              compareCountry === country
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-300'
            )}
          >
            {country}
          </button>
        ))}
      </div>

      {/* Comparison results */}
      {compareCountry && (
        <AnimatePresence mode="wait">
          <motion.div
            key={compareCountry}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {comparisons.map((comp, index) => (
              <motion.div
                key={comp.topic}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4">
                  <Badge variant="blue" className="mb-3">{comp.topic}</Badge>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                      <p className="text-xs font-bold text-green-800 dark:text-green-300 mb-1">NIGERIA</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{comp.nigeria}</p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                      <p className="text-xs font-bold text-blue-800 dark:text-blue-300 mb-1">{comp.countryName.toUpperCase()}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{comp.otherCountry}</p>
                    </div>
                  </div>
                  <div className="mt-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                    <p className="text-xs font-bold text-yellow-800 dark:text-yellow-300 mb-1">KEY DIFFERENCES</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{comp.difference}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {!compareCountry && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">Select a country above to compare</p>
        </div>
      )}
    </div>
  );
}

function AmendmentsView({ onBack, expandedId, setExpandedId }: {
  onBack: () => void;
  expandedId: string | null;
  setExpandedId: (id: string | null) => void;
}) {
  return (
    <div>
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        Back
      </Button>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-5 bg-gradient-to-br from-purple-700 to-purple-800 text-white mb-6">
          <h2 className="text-lg font-bold">Amendment History</h2>
          <p className="text-purple-200 text-sm mt-1">
            Track how the 1999 Constitution has been amended over time.
          </p>
        </Card>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
        <div className="space-y-4">
          {amendments.map((amendment, index) => (
            <motion.div
              key={amendment.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative pl-10"
            >
              <div className={cn(
                'absolute left-2.5 w-3 h-3 rounded-full border-2 bg-white dark:bg-gray-900',
                amendment.status === 'enacted' ? 'border-green-500' :
                amendment.status === 'pending' ? 'border-yellow-500' :
                'border-gray-400'
              )} style={{ top: '20px' }} />

              <Card className="overflow-hidden">
                <button
                  className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  onClick={() => setExpandedId(expandedId === amendment.id ? null : amendment.id)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={amendment.status === 'enacted' ? 'green' : amendment.status === 'pending' ? 'yellow' : 'gray'}>
                      {amendment.status}
                    </Badge>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{amendment.year}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{amendment.title}</h3>
                </button>

                <AnimatePresence>
                  {expandedId === amendment.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4">
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{amendment.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {amendment.affectedSections.map((s) => (
                            <Badge key={s} variant="default">Section {s.replace('s', '')}</Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CasesView({ onBack, expandedId, setExpandedId }: {
  onBack: () => void;
  expandedId: string | null;
  setExpandedId: (id: string | null) => void;
}) {
  return (
    <div>
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        Back
      </Button>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-5 bg-gradient-to-br from-amber-700 to-amber-800 text-white mb-6">
          <h2 className="text-lg font-bold">Landmark Cases</h2>
          <p className="text-amber-200 text-sm mt-1">
            Key Supreme Court and appellate decisions interpreting the Constitution.
          </p>
        </Card>
      </motion.div>

      <div className="space-y-3">
        {landmarkCases.map((lcase, index) => (
          <motion.div
            key={lcase.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <Card className="overflow-hidden">
              <button
                className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                onClick={() => setExpandedId(expandedId === lcase.id ? null : lcase.id)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="yellow">{lcase.year}</Badge>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{lcase.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-mono">{lcase.citation}</p>
              </button>

              <AnimatePresence>
                {expandedId === lcase.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-3">
                      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                        <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-1">SUMMARY</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{lcase.summary}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                        <p className="text-xs font-bold text-gray-700 dark:text-gray-400 mb-1">CONSTITUTIONAL RELEVANCE</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{lcase.relevance}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AboutView({ onBack }: { onBack: () => void }) {
  return (
    <div>
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        Back
      </Button>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <line x1="8" y1="7" x2="16" y2="7" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">NaijaLaw</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Version 1.0.0</p>
          </div>

          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <p>
              NaijaLaw makes the Constitution of the Federal Republic of Nigeria, 1999 (As Amended) accessible to every Nigerian.
            </p>
            <p>
              <strong>Features:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Full text of the 1999 Constitution as amended</li>
              <li>Plain English explanations for every section</li>
              <li>Powerful instant search</li>
              <li>Know Your Rights practical guides</li>
              <li>Audio reading with text-to-speech</li>
              <li>Bookmark and annotate sections</li>
              <li>Compare with other countries' constitutions</li>
              <li>Amendment history tracker</li>
              <li>Landmark case law connections</li>
              <li>Dark mode and adjustable font size</li>
              <li>Works offline after first load</li>
            </ul>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 border-t border-gray-100 dark:border-gray-700 pt-4">
              Disclaimer: This application is for educational and informational purposes only. It does not constitute legal advice. Always consult a qualified legal practitioner for specific legal issues. The constitutional text is based on publicly available versions and may not reflect the most recent amendments.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
