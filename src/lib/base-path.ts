/**
 * Returns the base path for all public asset URLs.
 * In production on GitHub Pages, assets are served under /portfolio-visualizer/.
 * Locally (dev), assets are served from the root /.
 */
export function getBasePath(): string {
  if (typeof window !== 'undefined') {
    if (window.location.pathname.startsWith('/portfolio-visualizer')) {
      return '/portfolio-visualizer';
    }
  }
  return process.env.NODE_ENV === 'production' ? '/portfolio-visualizer' : '';
}

/**
 * Prepend the base path to a public asset path.
 * e.g., assetPath('/resume.pdf') => '/portfolio-visualizer/resume.pdf' in production
 */
export function assetPath(path: string): string {
  if (!path) return '';
  if (path.startsWith('data:') || path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const base = getBasePath();
  if (base && path.startsWith(base)) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return base ? `${base}${cleanPath}` : cleanPath;
}

/**
 * Triggers a file download in the browser with guaranteed filename preservation.
 * Converting fetched PDF blob to a Base64 Data URL prevents Chrome, Safari & Firefox
 * from saving files with vague UUID names (e.g. 936210c7-60c9-4963-b40c-2eaa715867de).
 */
export function downloadPdfFile(dataUrlOrPath: string, preferredFilename: string) {
  const filename = preferredFilename.toLowerCase().endsWith('.pdf')
    ? preferredFilename
    : `${preferredFilename}.pdf`;

  // If already a base64 Data URL (e.g. from user-uploaded custom CV)
  if (dataUrlOrPath.startsWith('data:')) {
    const link = document.createElement('a');
    link.href = dataUrlOrPath;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // Public static file path
  const fullPath = assetPath(dataUrlOrPath);

  fetch(fullPath)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.blob();
    })
    .then((blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64DataUrl = reader.result as string;
        const link = document.createElement('a');
        link.href = base64DataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      reader.readAsDataURL(blob);
    })
    .catch((err) => {
      console.error('Download failed, using direct link fallback:', err);
      const link = document.createElement('a');
      link.href = fullPath;
      link.download = filename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
}
