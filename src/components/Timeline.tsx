'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Briefcase } from 'lucide-react';
import { usePortfolioStore } from '@/store/portfolio-store';

export default function Timeline() {
  const { experience } = usePortfolioStore();
  const [expandedId, setExpandedId] = useState<string | null>(experience[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getCompanyColor = (company: string): string => {
    const colors: Record<string, string> = {
      '7-Eleven': '#00865a',
      'Publicis Sapient': '#e4002b',
      'Infosys': '#007CC3',
    };
    return colors[company] || '#06b6d4';
  };

  return (
    <section id="experience" className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          PROJECT TIMELINE
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 lg:left-6 top-0 bottom-0 w-0.5"
            style={{ background: 'var(--shadow-dark)' }}
          />

          <div className="flex flex-col gap-4">
            {experience.map((entry, index) => (
              <motion.div
                key={entry.id}
                className="relative pl-10 lg:pl-14"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-2.5 lg:left-4.5 top-5 w-3 h-3 rounded-full border-2"
                  style={{
                    background: getCompanyColor(entry.company),
                    borderColor: 'var(--bg-base)',
                    boxShadow: `0 0 0 3px ${getCompanyColor(entry.company)}40`,
                  }}
                />

                {/* Card */}
                <div
                  className="neu-convex p-5 cursor-pointer"
                  onClick={() => toggleExpand(entry.id)}
                  role="button"
                  aria-expanded={expandedId === entry.id}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpand(entry.id);
                    }
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {/* Company logo placeholder */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
                        style={{ background: getCompanyColor(entry.company) }}
                      >
                        {entry.company === '7-Eleven' ? '7' : <Briefcase size={18} />}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                          {entry.company}
                        </h3>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                          {entry.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {entry.startDate} - {entry.endDate}
                      </span>
                      {expandedId === entry.id ? (
                        <ChevronUp size={16} style={{ color: 'var(--text-secondary)' }} />
                      ) : (
                        <ChevronDown size={16} style={{ color: 'var(--text-secondary)' }} />
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedId === entry.id && (
                      <motion.div
                        className="neu-concave mt-4 p-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ul className="space-y-2">
                          {entry.highlights.map((highlight, i) => (
                            <motion.li
                              key={i}
                              className="text-xs flex items-start gap-2"
                              style={{ color: 'var(--text-primary)' }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.08 }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1"
                                style={{ background: getCompanyColor(entry.company) }}
                              />
                              {highlight}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
