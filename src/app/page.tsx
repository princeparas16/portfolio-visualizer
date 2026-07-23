'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, FileCheck } from 'lucide-react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SkillsGrid from '@/components/SkillsGrid';
import Timeline from '@/components/Timeline';
import ProjectsGallery from '@/components/ProjectsGallery';
import LoginModal from '@/components/LoginModal';

const PdfSyncModal = dynamic(() => import('@/components/PdfSyncModal'), {
  ssr: false,
});

export default function Home() {
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [customCvUrl, setCustomCvUrl] = useState<string | null>(null);
  const [customCvFileName, setCustomCvFileName] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load saved state from localStorage on mount
  useEffect(() => {
    try {
      // Restore login state
      const savedLogin = localStorage.getItem('portfolio_is_logged_in');
      if (savedLogin === 'true') {
        setIsLoggedIn(true);
      }

      // Restore custom CV
      const savedData = localStorage.getItem('portfolio_custom_cv_url');
      const savedName = localStorage.getItem('portfolio_custom_cv_name');
      if (savedData) {
        setCustomCvUrl(savedData);
        setCustomCvFileName(savedName || 'Prince_Varti_Resume.pdf');
      }
    } catch (e) {
      console.error('Failed to load state from storage', e);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    try {
      localStorage.setItem('portfolio_is_logged_in', 'true');
    } catch (e) { /* ignore */ }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    try {
      localStorage.removeItem('portfolio_is_logged_in');
    } catch (e) { /* ignore */ }
  };

  const handleUpdateCv = (file: File) => {
    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      alert('Please upload a PDF file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setCustomCvUrl(result);
        setCustomCvFileName(file.name);
        try {
          localStorage.setItem('portfolio_custom_cv_url', result);
          localStorage.setItem('portfolio_custom_cv_name', file.name);
        } catch (err) {
          console.warn('Storage limit exceeded or unavailable:', err);
        }
        setToastMessage(`CV Updated! "Download CV" now serves "${file.name}"`);
        setTimeout(() => setToastMessage(null), 5000);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Header
        onSyncClick={() => setIsSyncModalOpen(true)}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        customCvUrl={customCvUrl}
        customCvFileName={customCvFileName}
        onUpdateCv={handleUpdateCv}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            className="fixed bottom-6 right-6 z-[70] max-w-md p-4 neu-convex flex items-center gap-3"
            style={{
              background: 'var(--bg-base)',
              borderRadius: '16px',
              borderLeft: '4px solid var(--accent-cyan-solid)',
              boxShadow: 'var(--glow-cyan-shadow)',
            }}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="w-8 h-8 rounded-full neu-concave flex items-center justify-center flex-shrink-0"
              style={{ color: 'var(--accent-cyan-solid)' }}
            >
              <FileCheck size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                Resume Updated
              </span>
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {toastMessage}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Hero />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SkillsGrid />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Timeline />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ProjectsGallery />
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 mt-12">
          <div className="max-w-7xl mx-auto text-center">
            <div className="neu-concave inline-block px-8 py-4">
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                © {new Date().getFullYear()} Prince Varti. Built with Next.js, Tailwind CSS, and
                Framer Motion.
              </p>
            </div>
          </div>
        </footer>
      </main>

      <PdfSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
