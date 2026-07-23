/**
 * Returns the base path for all public asset URLs.
 * In production on GitHub Pages, assets are served under /portfolio-visualizer/.
 * Locally (dev), assets are served from the root /.
 */
export function getBasePath(): string {
  if (typeof window !== 'undefined') {
    // Client-side: read from the <base> tag or infer from document location
    const base = document.querySelector('base')?.getAttribute('href');
    if (base) return base.replace(/\/$/, '');
  }
  // Fallback: use env-based detection
  return process.env.NODE_ENV === 'production' ? '/portfolio-visualizer' : '';
}

/**
 * Prepend the base path to a public asset path.
 * e.g., assetPath('/resume.pdf') => '/portfolio-visualizer/resume.pdf' in production
 */
export function assetPath(path: string): string {
  const base = getBasePath();
  // Avoid double-prefixing
  if (path.startsWith(base)) return path;
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
}
