'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, RefreshCw, LogIn, LogOut, ShieldCheck, FileUp, Check } from 'lucide-react';

interface HeaderProps {
  onSyncClick: () => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
  customCvUrl: string | null;
  customCvFileName: string | null;
  onUpdateCv: (file: File) => void;
}

const navItems = [
  { label: 'Overview', href: '#overview' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
];

export default function Header({
  onSyncClick,
  isLoggedIn,
  onLoginClick,
  onLogout,
  customCvUrl,
  customCvFileName,
  onUpdateCv,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDownloadPressed, setIsDownloadPressed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    },
    []
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpdateCv(file);
      // Reset input value so re-uploading the same file works
      e.target.value = '';
    }
  };

  return (
    <>
      {/* Hidden file input for updating CV */}
      <input
        type="file"
        ref={fileInputRef}
        accept="application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'neu-concave' : ''
        }`}
        style={{
          background: 'var(--bg-base)',
          borderRadius: isScrolled ? '0 0 16px 16px' : '0',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <motion.div
              className="neu-concave px-4 py-2"
              style={{ borderRadius: '10px' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm font-bold tracking-widest" style={{ color: 'var(--text-primary)' }}>
                PRINCE VARTI
              </span>
            </motion.div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-3 py-1.5 text-sm font-medium transition-colors duration-200 rounded-lg hover:text-accent-cyan"
                  style={{ color: 'var(--text-secondary)' }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            {/* Top Right Actions */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Download CV (always visible, downloads custom CV if uploaded) */}
              <a
                href={customCvUrl || '/resume.pdf'}
                download={customCvFileName || 'Prince_Varti_Resume.pdf'}
                className={`neu-btn text-xs ${isDownloadPressed ? 'pressed' : ''}`}
                onMouseDown={() => setIsDownloadPressed(true)}
                onMouseUp={() => setIsDownloadPressed(false)}
                onMouseLeave={() => setIsDownloadPressed(false)}
                title={customCvFileName ? `Download ${customCvFileName}` : 'Download CV'}
              >
                <Download size={14} />
                <span className="hidden sm:inline">Download CV</span>
                <span className="sm:hidden">CV</span>
              </a>

              {/* Sync via PDF & Update CV — ONLY shown when logged in */}
              <AnimatePresence>
                {isLoggedIn && (
                  <>
                    <motion.button
                      className="neu-btn text-xs"
                      onClick={onSyncClick}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <RefreshCw size={14} />
                      <span className="hidden lg:inline">Sync via PDF</span>
                      <span className="lg:hidden">Sync</span>
                    </motion.button>

                    <motion.button
                      className="neu-btn text-xs"
                      onClick={() => fileInputRef.current?.click()}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, delay: 0.05 }}
                      style={{
                        boxShadow: 'var(--glow-cyan-shadow)',
                      }}
                    >
                      <FileUp size={14} style={{ color: 'var(--accent-cyan-solid)' }} />
                      <span className="hidden lg:inline">Update CV</span>
                      <span className="lg:hidden">Update</span>
                    </motion.button>
                  </>
                )}
              </AnimatePresence>

              {/* Hamburger Button — visible on ALL screen sizes */}
              <button
                className="neu-btn-icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Dropdown Menu / Popover */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* Transparent backdrop to click away */}
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(0, 0, 0, 0.15)', backdropFilter: 'blur(3px)' }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Popover */}
            <motion.div
              className="absolute top-20 right-4 sm:right-8 w-72 p-5 neu-convex z-50"
              style={{
                background: 'var(--bg-base)',
                borderRadius: '20px',
                boxShadow: '12px 12px 28px var(--shadow-dark), -12px -12px 28px var(--shadow-light)',
              }}
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.2, type: 'spring', damping: 25, stiffness: 350 }}
            >
              {/* Mobile Navigation Links */}
              <nav className="md:hidden flex flex-col gap-2 mb-4 pb-3 border-b" style={{ borderColor: 'var(--shadow-dark)' }}>
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="neu-concave px-4 py-2.5 text-sm font-medium block"
                    style={{ color: 'var(--text-primary)', borderRadius: '10px' }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Auth Section */}
              <div className="flex flex-col gap-3">
                {isLoggedIn ? (
                  <>
                    <div
                      className="neu-concave p-3 flex items-center gap-3"
                      style={{ borderRadius: '12px' }}
                    >
                      <div
                        className="w-9 h-9 rounded-full neu-convex flex items-center justify-center flex-shrink-0"
                        style={{ color: 'var(--accent-cyan-solid)' }}
                      >
                        <ShieldCheck size={18} />
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-xs font-bold truncate" style={{ color: 'var(--text-primary)' }}>
                          Prince (Admin)
                        </span>
                        <span className="text-[10px] font-medium" style={{ color: 'var(--accent-cyan-solid)' }}>
                          ● Authenticated
                        </span>
                      </div>
                    </div>

                    <button
                      className="neu-btn w-full justify-center text-xs py-2.5"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onSyncClick();
                      }}
                    >
                      <RefreshCw size={14} />
                      Sync via PDF
                    </button>

                    <button
                      className="neu-btn w-full justify-center text-xs py-2.5"
                      onClick={() => {
                        setIsMenuOpen(false);
                        fileInputRef.current?.click();
                      }}
                      style={{ boxShadow: 'var(--glow-cyan-shadow)' }}
                    >
                      <FileUp size={14} style={{ color: 'var(--accent-cyan-solid)' }} />
                      Update CV
                    </button>

                    <button
                      className="neu-btn w-full justify-center text-xs py-2.5"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onLogout();
                      }}
                      style={{ color: '#ef4444' }}
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <div className="text-xs font-semibold uppercase tracking-wider px-1 text-center" style={{ color: 'var(--text-secondary)' }}>
                      Account Access
                    </div>
                    <button
                      className="neu-btn w-full justify-center text-sm py-3"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onLoginClick();
                      }}
                      style={{
                        boxShadow: 'var(--glow-cyan-shadow)',
                      }}
                    >
                      <LogIn size={16} />
                      Login
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
