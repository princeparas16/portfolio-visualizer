'use client';

import { motion } from 'framer-motion';
import {
  Code2,
  Globe,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  BadgeCheck,
  Award,
  GraduationCap,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useState } from 'react';
import { usePortfolioStore } from '@/store/portfolio-store';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function Hero() {
  const { contact, certifications, education } = usePortfolioStore();
  const [expandedCert, setExpandedCert] = useState<string | null>(null);
  const [expandedEdu, setExpandedEdu] = useState<string | null>(null);

  const socialLinks = [
    {
      icon: Code2,
      href: contact.github || '#',
      label: 'GitHub',
    },
    {
      icon: Globe,
      href: contact.hashnode || '#',
      label: 'Hashnode',
    },
    {
      icon: ExternalLink,
      href: contact.linkedin || '#',
      label: 'LinkedIn',
    },
    {
      icon: Mail,
      href: `mailto:${contact.email}`,
      label: 'Email',
    },
  ];

  return (
    <section id="overview" className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Main Content (2/3 width on desktop) */}
          <div className="lg:col-span-2">
            <motion.h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4"
              style={{ color: 'var(--text-primary)' }}
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeInUp}
            >
              {contact.name}: {contact.title}
              <span className="font-normal" style={{ color: 'var(--text-secondary)' }}>
                {' '}| Building Intelligent,
              </span>{' '}
              <span style={{ color: 'var(--text-secondary)' }}>
                Enterprise Systems. (7.5+ Years Experience)
              </span>
            </motion.h1>

            <motion.p
              className="text-sm sm:text-base leading-relaxed mb-6 max-w-2xl"
              style={{ color: 'var(--text-secondary)' }}
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeInUp}
            >
              {contact.summary}
            </motion.p>

            {/* Social Icons + Contact */}
            <motion.div
              className="flex flex-wrap items-center gap-3 mb-8"
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeInUp}
            >
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neu-btn-icon"
                  aria-label={link.label}
                  title={link.label}
                >
                  <link.icon size={18} />
                </a>
              ))}
              <div className="flex items-center gap-2 ml-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <MapPin size={14} />
                <span>{contact.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <Phone size={14} />
                <span>{contact.phone}</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Certifications & Education sidebar (1/3 on desktop) */}
          <motion.div
            className="lg:col-span-1"
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeInUp}
          >
            <h2 className="section-title">Certifications &amp; Education</h2>

            {/* Certifications */}
            <div className="flex flex-col gap-3 mb-4">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="neu-convex p-4 cursor-pointer"
                  onClick={() => setExpandedCert(expandedCert === cert.id ? null : cert.id)}
                  role="button"
                  aria-expanded={expandedCert === cert.id}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setExpandedCert(expandedCert === cert.id ? null : cert.id);
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: cert.badge === 'Verifiable' ? 'linear-gradient(135deg, #1a1a1a, #333)' : 'linear-gradient(135deg, #f59e0b, #d97706)',
                        color: '#fff',
                      }}
                    >
                      {cert.badge === 'Verifiable' ? (
                        <span className="text-lg font-bold">A</span>
                      ) : (
                        <Award size={18} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                          {cert.name}
                        </h3>
                        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                          {cert.badge === 'Verifiable' && (
                            <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full" style={{ background: '#06b6d4', color: '#fff' }}>
                              <BadgeCheck size={10} /> Verifiable
                            </span>
                          )}
                          {cert.badge === 'Badge' && (
                            <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full" style={{ background: '#f59e0b', color: '#fff' }}>
                              <Award size={10} /> Badge
                            </span>
                          )}
                        </div>
                      </div>
                      {expandedCert === cert.id && (
                        <motion.p
                          className="text-xs mt-2"
                          style={{ color: 'var(--text-secondary)' }}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          {cert.description}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="flex flex-col gap-3">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="neu-convex p-4 cursor-pointer"
                  onClick={() => setExpandedEdu(expandedEdu === edu.id ? null : edu.id)}
                  role="button"
                  aria-expanded={expandedEdu === edu.id}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setExpandedEdu(expandedEdu === edu.id ? null : edu.id);
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                        color: '#fff',
                      }}
                    >
                      <GraduationCap size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {edu.institution}
                          </h3>
                          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                            {edu.institution}
                          </p>
                        </div>
                        {expandedEdu === edu.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                      {expandedEdu === edu.id && (
                        <motion.div
                          className="mt-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {edu.degree} in {edu.field}
                          </p>
                          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                            {edu.startYear} - {edu.endYear}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
