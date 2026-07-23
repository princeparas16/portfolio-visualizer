'use client';

import { motion } from 'framer-motion';
import { usePortfolioStore } from '@/store/portfolio-store';
import { assetPath } from '@/lib/base-path';

export default function ProjectsGallery() {
  const { projects } = usePortfolioStore();

  return (
    <section id="projects" className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          PROJECTS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="neu-convex overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Image with inner shadow overlay — pre-allocated height for CLS prevention */}
              <div
                className="relative w-full overflow-hidden"
                style={{ height: '200px' }}
              >
                {project.imageUrl ? (
                  <img
                    src={assetPath(project.imageUrl)}
                    alt={project.title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: 'var(--bg-base)' }}
                  >
                    <ProjectPlaceholder title={project.title} tags={project.tags} />
                  </div>
                )}
                {/* Inner shadow overlay to blend into #e0e0e0 */}
                <div
                  className="absolute inset-0"
                  style={{
                    boxShadow:
                      'inset 0 -40px 30px -10px var(--bg-base), inset 0 0 20px rgba(0,0,0,0.05)',
                  }}
                />
              </div>

              {/* Card Content */}
              <div className="p-5">
                <h3
                  className="text-base font-bold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-xs leading-relaxed mb-4"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="neu-concave px-3 py-1 text-xs font-medium"
                      style={{
                        color: 'var(--text-secondary)',
                        borderRadius: '8px',
                        boxShadow:
                          'inset 3px 3px 6px var(--shadow-dark), inset -3px -3px 6px var(--shadow-light)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Inline placeholder with an illustrative icon for projects without images.
 */
function ProjectPlaceholder({ title, tags }: { title: string; tags: string[] }) {
  const isAI = tags.some((t) =>
    ['AI', 'LLM', 'Mistral', 'VectorDB'].includes(t)
  );

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6">
      {/* SVG Illustration */}
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isAI ? (
          <>
            {/* Brain/AI Icon */}
            <circle cx="40" cy="40" r="30" stroke="#bebebe" strokeWidth="2" fill="none" />
            <circle cx="40" cy="40" r="20" stroke="#06b6d4" strokeWidth="1.5" fill="none" opacity="0.5" />
            <circle cx="40" cy="40" r="10" stroke="#a855f7" strokeWidth="1.5" fill="none" opacity="0.5" />
            {/* Connection lines */}
            <line x1="40" y1="10" x2="40" y2="20" stroke="#bebebe" strokeWidth="1.5" />
            <line x1="40" y1="60" x2="40" y2="70" stroke="#bebebe" strokeWidth="1.5" />
            <line x1="10" y1="40" x2="20" y2="40" stroke="#bebebe" strokeWidth="1.5" />
            <line x1="60" y1="40" x2="70" y2="40" stroke="#bebebe" strokeWidth="1.5" />
            {/* Nodes */}
            <circle cx="40" cy="10" r="3" fill="#06b6d4" />
            <circle cx="40" cy="70" r="3" fill="#06b6d4" />
            <circle cx="10" cy="40" r="3" fill="#a855f7" />
            <circle cx="70" cy="40" r="3" fill="#a855f7" />
            <circle cx="40" cy="40" r="5" fill="#1a1a1a" />
            {/* Diagonal lines */}
            <line x1="20" y1="20" x2="26" y2="26" stroke="#bebebe" strokeWidth="1" />
            <line x1="60" y1="20" x2="54" y2="26" stroke="#bebebe" strokeWidth="1" />
            <line x1="20" y1="60" x2="26" y2="54" stroke="#bebebe" strokeWidth="1" />
            <line x1="60" y1="60" x2="54" y2="54" stroke="#bebebe" strokeWidth="1" />
            <circle cx="18" cy="18" r="2.5" fill="#06b6d4" opacity="0.7" />
            <circle cx="62" cy="18" r="2.5" fill="#a855f7" opacity="0.7" />
            <circle cx="18" cy="62" r="2.5" fill="#a855f7" opacity="0.7" />
            <circle cx="62" cy="62" r="2.5" fill="#06b6d4" opacity="0.7" />
          </>
        ) : (
          <>
            {/* Generic project icon */}
            <rect x="15" y="20" width="50" height="40" rx="4" stroke="#bebebe" strokeWidth="2" fill="none" />
            <rect x="20" y="25" width="20" height="12" rx="2" fill="#06b6d4" opacity="0.3" />
            <rect x="20" y="42" width="30" height="3" rx="1.5" fill="#bebebe" />
            <rect x="20" y="48" width="24" height="3" rx="1.5" fill="#bebebe" opacity="0.6" />
            <circle cx="55" cy="30" r="5" stroke="#a855f7" strokeWidth="1.5" fill="none" opacity="0.5" />
          </>
        )}
      </svg>
      <span
        className="text-xs font-medium text-center"
        style={{ color: 'var(--text-secondary)' }}
      >
        {title}
      </span>
    </div>
  );
}
