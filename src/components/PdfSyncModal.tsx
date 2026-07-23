'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Check, AlertCircle, FileText, RefreshCw } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { usePortfolioStore } from '@/store/portfolio-store';
import { extractTextFromPdf, parseResumeText, validatePdfFile } from '@/lib/pdf-parser';
import type { ParsedResumeData, ParsingStep } from '@/types/portfolio';

interface PdfSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PARSING_STEPS: { key: ParsingStep; label: string }[] = [
  { key: 'extracting-text', label: 'Extracting Text' },
  { key: 'contact-info', label: 'Contact Info' },
  { key: 'skills', label: 'Skills' },
  { key: 'experience', label: 'Experience (Partial)' },
  { key: 'projects', label: 'Projects' },
];

export default function PdfSyncModal({ isOpen, onClose }: PdfSyncModalProps) {
  const updateFromParsedPdf = usePortfolioStore((s) => s.updateFromParsedPdf);

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null);
  const [rawText, setRawText] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [completedSteps, setCompletedSteps] = useState<Set<ParsingStep>>(new Set());
  const [isParsing, setIsParsing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setFile(null);
    setError(null);
    setParsedData(null);
    setRawText('');
    setCurrentStep(-1);
    setCompletedSteps(new Set());
    setIsParsing(false);
    setIsComplete(false);
    onClose();
  };

  const simulateStepProgress = useCallback(async () => {
    for (let i = 0; i < PARSING_STEPS.length; i++) {
      setCurrentStep(i);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCompletedSteps((prev) => new Set([...prev, PARSING_STEPS[i].key]));
    }
  }, []);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null);
      setParsedData(null);
      setRawText('');
      setCurrentStep(-1);
      setCompletedSteps(new Set());
      setIsComplete(false);

      const droppedFile = acceptedFiles[0];
      if (!droppedFile) return;

      // Validate file type
      const validation = validatePdfFile(droppedFile);
      if (!validation.valid) {
        setError(validation.error || 'Invalid file');
        return;
      }

      setFile(droppedFile);
      setIsParsing(true);

      try {
        // Start step animation concurrently with parsing
        const progressPromise = simulateStepProgress();

        // Extract text
        const text = await extractTextFromPdf(droppedFile);

        if (!text || text.trim().length === 0) {
          setError(
            'Could not read text layer. Please use a text-based PDF.'
          );
          setIsParsing(false);
          return;
        }

        setRawText(text);

        // Parse structured data
        const data = parseResumeText(text);
        setParsedData(data);

        // Wait for animation to complete
        await progressPromise;

        setIsComplete(true);
        setIsParsing(false);
      } catch (err) {
        console.error('PDF parsing error:', err);
        setError('Failed to parse PDF. Please try a different file.');
        setIsParsing(false);
      }
    },
    [simulateStepProgress]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    disabled: isParsing,
  });

  const handleVerifyAndUpdate = () => {
    if (parsedData) {
      updateFromParsedPdf(parsedData);
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        role="dialog"
        aria-modal="true"
        aria-label="Sync your Resume PDF"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(224, 224, 224, 0.7)',
            backdropFilter: 'blur(12px)',
          }}
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          ref={modalRef}
          className="neu-convex relative w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8"
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 neu-btn-icon"
            onClick={handleClose}
            aria-label="Close modal"
            style={{ width: '36px', height: '36px' }}
          >
            <X size={16} />
          </button>

          <h2
            className="text-xl sm:text-2xl font-bold text-center mb-8"
            style={{ color: 'var(--text-primary)' }}
          >
            Sync your Resume PDF
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Drop zone */}
            <div>
              <div
                {...getRootProps()}
                className={`neu-concave p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 min-h-[280px] ${
                  isDragActive ? 'ring-2 ring-accent-cyan' : ''
                } ${isParsing ? 'opacity-50 pointer-events-none' : ''}`}
                style={{
                  border: '2px dashed var(--shadow-dark)',
                  borderRadius: '16px',
                }}
              >
                <input {...getInputProps()} />
                <Upload
                  size={48}
                  style={{ color: 'var(--text-secondary)' }}
                  className="mb-4"
                />
                <p
                  className="text-sm font-medium text-center mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Drag &amp; Drop
                </p>
                <p
                  className="text-sm text-center mb-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  or Click to Upload
                </p>
                <p
                  className="text-xs text-center"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  your resume.pdf
                </p>
                {file && (
                  <div className="mt-4 flex items-center gap-2 text-xs" style={{ color: 'var(--text-primary)' }}>
                    <FileText size={14} />
                    {file.name}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Parsing results */}
            <div className="flex flex-col">
              {/* Error */}
              {error && (
                <motion.div
                  className="neu-concave p-4 mb-4 flex items-start gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ borderLeft: '3px solid #ef4444' }}
                >
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#ef4444' }} />
                  <p className="text-xs" style={{ color: 'var(--text-primary)' }}>
                    {error}
                  </p>
                </motion.div>
              )}

              {/* Parsed data preview */}
              {(isParsing || parsedData) && (
                <div className="flex-1 overflow-y-auto">
                  {/* Contact Info */}
                  {parsedData?.contact && Object.keys(parsedData.contact).length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                        Contact Info
                      </h3>
                      <div className="space-y-1 text-xs" style={{ color: 'var(--text-primary)' }}>
                        {parsedData.contact.name && (
                          <p>👤 {parsedData.contact.name}</p>
                        )}
                        {parsedData.contact.email && (
                          <p>✉ Email {parsedData.contact.email}</p>
                        )}
                        {parsedData.contact.phone && (
                          <p>📞 {parsedData.contact.phone}</p>
                        )}
                        {parsedData.contact.location && (
                          <div className="flex items-center gap-2">
                            <span>📍 Location: {parsedData.contact.location}</span>
                            <span className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: '#06b6d4', color: '#fff' }}>
                              Updated: {parsedData.contact.location}
                            </span>
                          </div>
                        )}
                        {parsedData.contact.title && (
                          <p>💼 {parsedData.contact.title}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {parsedData?.skills && parsedData.skills.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                        Skills
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {parsedData.skills.map((skill, i) => (
                          <div key={i}>
                            <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                              {skill.title}
                            </p>
                            <ul className="space-y-0.5">
                              {skill.items?.map((item, j) => (
                                <li key={j} className="text-[10px] flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                                  • {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Experience */}
                  {parsedData?.experience && parsedData.experience.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                        Experience
                      </h3>
                      <ul className="space-y-1">
                        {parsedData.experience.map((exp, i) => (
                          <li key={i} className="text-xs" style={{ color: 'var(--text-primary)' }}>
                            • {exp.company} ({exp.role})
                            {exp.highlights && exp.highlights.length > 0 && (
                              <ul className="ml-3 mt-0.5 space-y-0.5">
                                {exp.highlights.slice(0, 3).map((h, j) => (
                                  <li key={j} className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                                    • {h}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Projects */}
                  {parsedData?.projects && parsedData.projects.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                        Projects
                      </h3>
                      <ul className="space-y-0.5">
                        {parsedData.projects.map((proj, i) => (
                          <li key={i} className="text-xs" style={{ color: 'var(--text-primary)' }}>
                            • {proj.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Extraction checklist */}
              {(isParsing || isComplete) && (
                <div className="mt-4">
                  <h3 className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Extracted Sections
                  </h3>
                  <ul className="space-y-1.5">
                    {PARSING_STEPS.slice(1).map((step, i) => (
                      <motion.li
                        key={step.key}
                        className="text-xs flex items-center gap-2"
                        style={{ color: 'var(--text-primary)' }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {completedSteps.has(step.key) ? (
                          <Check size={12} style={{ color: '#06b6d4' }} />
                        ) : currentStep >= i + 1 ? (
                          <RefreshCw
                            size={12}
                            className="animate-spin"
                            style={{ color: 'var(--text-secondary)' }}
                          />
                        ) : (
                          <div
                            className="w-3 h-3 rounded-full border"
                            style={{ borderColor: 'var(--shadow-dark)' }}
                          />
                        )}
                        {step.label}{' '}
                        {completedSteps.has(step.key) && (
                          <span style={{ color: '#06b6d4' }}>✓</span>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* No data state */}
              {!isParsing && !parsedData && !error && (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
                    Upload a PDF to see parsed data here
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Scrollbar indicator */}
          {isParsing && (
            <div className="mt-6 w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--shadow-dark)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'var(--accent-cyan-solid)' }}
                initial={{ width: '0%' }}
                animate={{ width: isComplete ? '100%' : `${((currentStep + 1) / PARSING_STEPS.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6 pt-4 border-t" style={{ borderColor: 'var(--shadow-dark)' }}>
            <button
              className="neu-btn text-sm"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className={`neu-btn text-sm font-semibold ${
                !isComplete ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleVerifyAndUpdate}
              disabled={!isComplete}
              style={
                isComplete
                  ? {
                      boxShadow:
                        '8px 8px 16px var(--shadow-dark), -8px -8px 16px var(--shadow-light), 0 0 15px var(--accent-cyan)',
                    }
                  : undefined
              }
            >
              [ Verify &amp; Update ]
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
