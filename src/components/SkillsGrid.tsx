'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { usePortfolioStore } from '@/store/portfolio-store';

export default function SkillsGrid() {
  const { skills } = usePortfolioStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getCardClass = (glow?: 'cyan' | 'purple') => {
    if (glow === 'cyan') return 'glow-cyan';
    if (glow === 'purple') return 'glow-purple';
    return 'neu-convex';
  };

  return (
    <section id="skills" className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          SKILLS STACK
        </motion.h2>

        {/* Primary Skills (top row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {skills.slice(0, 3).map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div
                className={`${getCardClass(skill.glow)} p-5 cursor-pointer`}
                onClick={() => toggleExpand(skill.id)}
                role="button"
                aria-expanded={expandedId === skill.id}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleExpand(skill.id);
                  }
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    {skill.title}
                    {skill.level && (
                      <span className="ml-1 font-normal text-xs" style={{ color: 'var(--text-secondary)' }}>
                        ({skill.level})
                      </span>
                    )}
                  </h3>
                  {expandedId === skill.id ? (
                    <ChevronUp size={16} style={{ color: 'var(--text-secondary)' }} />
                  ) : (
                    <ChevronDown size={16} style={{ color: 'var(--text-secondary)' }} />
                  )}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {skill.summary}
                </p>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedId === skill.id && (
                    <motion.div
                      className="neu-concave mt-4 p-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ul className="space-y-1.5">
                        {skill.items.map((item, i) => (
                          <motion.li
                            key={i}
                            className="text-xs flex items-center gap-2"
                            style={{ color: 'var(--text-primary)' }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{
                                background:
                                  skill.glow === 'cyan'
                                    ? 'var(--accent-cyan-solid)'
                                    : skill.glow === 'purple'
                                    ? 'var(--accent-purple-solid)'
                                    : 'var(--text-secondary)',
                              }}
                            />
                            {item}
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

        {/* Secondary Skills (bottom row) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.slice(3).map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <div
                className={`${getCardClass(skill.glow)} p-4 cursor-pointer`}
                onClick={() => toggleExpand(skill.id)}
                role="button"
                aria-expanded={expandedId === skill.id}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleExpand(skill.id);
                  }
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    {skill.title}
                  </h3>
                  {expandedId === skill.id ? (
                    <ChevronUp size={14} style={{ color: 'var(--text-secondary)' }} />
                  ) : (
                    <ChevronDown size={14} style={{ color: 'var(--text-secondary)' }} />
                  )}
                </div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {skill.summary}
                </p>

                <AnimatePresence>
                  {expandedId === skill.id && (
                    <motion.div
                      className="neu-concave mt-3 p-3"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ul className="space-y-1">
                        {skill.items.map((item, i) => (
                          <motion.li
                            key={i}
                            className="text-xs flex items-center gap-2"
                            style={{ color: 'var(--text-primary)' }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: 'var(--text-secondary)' }}
                            />
                            {item}
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
    </section>
  );
}
