'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);

  // Focus username field when modal opens
  useEffect(() => {
    if (isOpen) {
      setUsername('');
      setPassword('');
      setError('');
      setShowPassword(false);
      setTimeout(() => usernameRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setIsSubmitting(true);

      // Simulate a tiny delay for feel
      await new Promise((r) => setTimeout(r, 600));

      if (username === 'prince' && password === 'admin') {
        onLoginSuccess();
        onClose();
      } else {
        setError('Invalid credentials. Please try again.');
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }

      setIsSubmitting(false);
    },
    [username, password, onLoginSuccess, onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'rgba(224, 224, 224, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div
              className="neu-convex p-8"
              style={{ borderRadius: '24px' }}
            >
              {/* Close button */}
              <button
                className="neu-btn-icon absolute top-4 right-4"
                onClick={onClose}
                aria-label="Close login modal"
                style={{ width: '36px', height: '36px' }}
              >
                <X size={16} />
              </button>

              {/* Avatar circle */}
              <div className="flex justify-center mb-6">
                <div
                  className="neu-concave flex items-center justify-center"
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                  }}
                >
                  <User size={28} style={{ color: 'var(--accent-cyan-solid)' }} />
                </div>
              </div>

              {/* Title */}
              <h2
                className="text-center text-lg font-bold tracking-wide mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                Admin Login
              </h2>
              <p
                className="text-center text-xs mb-6"
                style={{ color: 'var(--text-secondary)' }}
              >
                Sign in to unlock sync features
              </p>

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit}
                animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                {/* Username */}
                <div className="mb-4">
                  <label
                    htmlFor="login-username"
                    className="block text-xs font-semibold mb-2 tracking-wider uppercase"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Username
                  </label>
                  <div
                    className="neu-concave flex items-center gap-3 px-4 py-3"
                    style={{ borderRadius: '12px' }}
                  >
                    <User size={16} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
                    <input
                      ref={usernameRef}
                      id="login-username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      autoComplete="username"
                      className="w-full bg-transparent outline-none text-sm font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-5">
                  <label
                    htmlFor="login-password"
                    className="block text-xs font-semibold mb-2 tracking-wider uppercase"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Password
                  </label>
                  <div
                    className="neu-concave flex items-center gap-3 px-4 py-3"
                    style={{ borderRadius: '12px' }}
                  >
                    <Lock size={16} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      autoComplete="current-password"
                      className="w-full bg-transparent outline-none text-sm font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="flex-shrink-0 p-1 transition-colors duration-200"
                      style={{ color: 'var(--text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer' }}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      className="flex items-center gap-2 mb-4 px-3 py-2"
                      style={{
                        borderRadius: '10px',
                        background: 'rgba(239, 68, 68, 0.08)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                      }}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AlertCircle size={14} style={{ color: '#ef4444', flexShrink: 0 }} />
                      <span className="text-xs font-medium" style={{ color: '#ef4444' }}>
                        {error}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || !username || !password}
                  className="w-full neu-btn justify-center text-sm"
                  style={{
                    padding: '14px 20px',
                    borderRadius: '14px',
                    opacity: isSubmitting || !username || !password ? 0.6 : 1,
                    transition: 'all 0.3s ease',
                    boxShadow:
                      username && password && !isSubmitting
                        ? 'var(--glow-cyan-shadow)'
                        : undefined,
                  }}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <LogIn size={16} />
                    </motion.div>
                  ) : (
                    <LogIn size={16} />
                  )}
                  {isSubmitting ? 'Signing in…' : 'Sign In'}
                </button>
              </motion.form>

              {/* Hint */}
              <p
                className="text-center text-xs mt-4"
                style={{ color: 'var(--text-secondary)', opacity: 0.5, display: 'none' }}
              >
                🍌 nano banana secured
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
