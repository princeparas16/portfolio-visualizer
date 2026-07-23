import type { ParsedResumeData } from '@/types/portfolio';

/**
 * Extracts text from a PDF file using pdfjs-dist.
 * Dynamically imports pdfjs-dist to avoid loading it in the initial bundle.
 */
export async function extractTextFromPdf(file: File): Promise<string> {
  const pdfjs = await import('pdfjs-dist');
  
  // Set the worker source
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ');
    fullText += pageText + '\n';
  }

  return fullText.trim();
}

/**
 * Parses extracted PDF text into structured resume data.
 * Uses regex patterns to identify sections and extract information.
 */
export function parseResumeText(text: string): ParsedResumeData {
  const result: ParsedResumeData = {
    contact: {},
    skills: [],
    experience: [],
    projects: [],
  };

  if (!text || text.trim().length === 0) {
    return result;
  }

  // --- Contact Info ---
  const emailMatch = text.match(
    /[\w.+-]+@[\w-]+\.[\w.]+/
  );
  if (emailMatch) {
    result.contact.email = emailMatch[0];
  }

  const phoneMatch = text.match(
    /(\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{4}/
  );
  if (phoneMatch) {
    result.contact.phone = phoneMatch[0];
  }

  // Try to find location patterns
  const locationPatterns = [
    /(?:location|city|based in)[:\s]*([A-Za-z\s,]+)/i,
    /\b(bengaluru|bangalore|mumbai|delhi|pune|hyderabad|chennai|kolkata|noida|gurgaon|gurugram)\b/i,
  ];
  for (const pattern of locationPatterns) {
    const match = text.match(pattern);
    if (match) {
      result.contact.location = match[1] || match[0];
      break;
    }
  }

  // Try to extract name (usually the first prominent text)
  const nameMatch = text.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})/m);
  if (nameMatch) {
    result.contact.name = nameMatch[1].trim();
  }

  // Try to extract title
  const titlePatterns = [
    /(?:senior|lead|staff|principal|junior)?\s*(?:software|frontend|backend|fullstack|full-stack|web)\s*(?:engineer|developer|architect)/i,
    /(?:software|frontend|backend|fullstack|full-stack|web)\s*(?:engineer|developer|architect)/i,
  ];
  for (const pattern of titlePatterns) {
    const match = text.match(pattern);
    if (match) {
      result.contact.title = match[0].trim();
      break;
    }
  }

  // --- Skills ---
  const skillsSectionMatch = text.match(
    /(?:skills|technical skills|tech stack|technologies)[:\s]*\n?([\s\S]*?)(?=\n\s*(?:experience|work|employment|projects|education|certifications|$))/i
  );
  if (skillsSectionMatch) {
    const skillsText = skillsSectionMatch[1];

    // Try to find sub-categories
    const frontendMatch = skillsText.match(
      /(?:frontend|front-end|ui)[:\s]*(.*?)(?=\n|$)/i
    );
    if (frontendMatch) {
      result.skills.push({
        id: 'frontend',
        title: 'CORE FRONTEND EXPERTISE',
        items: frontendMatch[1].split(/[,;|]/).map((s) => s.trim()).filter(Boolean),
      });
    }

    const aiMatch = skillsText.match(
      /(?:ai|ml|machine learning|intelligence|llm)[:\s]*(.*?)(?=\n|$)/i
    );
    if (aiMatch) {
      result.skills.push({
        id: 'ai',
        title: 'AI & INTELLIGENCE INTEGRATION',
        items: aiMatch[1].split(/[,;|]/).map((s) => s.trim()).filter(Boolean),
      });
    }

    const backendMatch = skillsText.match(
      /(?:backend|back-end|server)[:\s]*(.*?)(?=\n|$)/i
    );
    if (backendMatch) {
      result.skills.push({
        id: 'backend',
        title: 'Backend',
        items: backendMatch[1].split(/[,;|]/).map((s) => s.trim()).filter(Boolean),
      });
    }
  }

  // --- Experience ---
  const experienceSectionMatch = text.match(
    /(?:experience|work experience|employment|work history)[:\s]*\n?([\s\S]*?)(?=\n\s*(?:projects|education|certifications|skills|$))/i
  );
  if (experienceSectionMatch) {
    const expText = experienceSectionMatch[1];
    // Match patterns like "Company Name Role Date - Date"
    const expEntries = expText.match(
      /([A-Z][A-Za-z\s&.-]+?)[\s|—–-]+([A-Za-z\s]+?)[\s|—–-]+(\w+\s?\d{4})\s*[-–—to]+\s*((?:\w+\s?\d{4})|Present)/gi
    );

    if (expEntries) {
      expEntries.forEach((entry) => {
        const parts = entry.match(
          /([A-Z][A-Za-z\s&.-]+?)[\s|—–-]+([A-Za-z\s]+?)[\s|—–-]+(\w+\s?\d{4})\s*[-–—to]+\s*((?:\w+\s?\d{4})|Present)/i
        );
        if (parts) {
          result.experience.push({
            id: parts[1].trim().toLowerCase().replace(/\s+/g, '-'),
            company: parts[1].trim(),
            role: parts[2].trim(),
            startDate: parts[3].trim(),
            endDate: parts[4].trim(),
            highlights: [],
          });
        }
      });
    }

    // Extract bullet points as highlights
    const bullets = expText.match(/[•\-*]\s*(.+)/g);
    if (bullets && result.experience.length > 0) {
      const highlights = bullets.map((b) =>
        b.replace(/^[•\-*]\s*/, '').trim()
      );
      // Assign to most recent entry
      result.experience[result.experience.length - 1].highlights = highlights;
    }
  }

  // --- Projects ---
  const projectsSectionMatch = text.match(
    /(?:projects|personal projects|portfolio)[:\s]*\n?([\s\S]*?)(?=\n\s*(?:education|certifications|skills|$))/i
  );
  if (projectsSectionMatch) {
    const projText = projectsSectionMatch[1];
    const projLines = projText.split('\n').filter((l) => l.trim().length > 0);

    let currentProject: ParsedResumeData['projects'][0] | null = null;
    projLines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.length > 0 && !trimmed.startsWith('•') && !trimmed.startsWith('-') && !trimmed.startsWith('*')) {
        if (currentProject) {
          result.projects.push(currentProject);
        }
        currentProject = {
          title: trimmed,
          description: '',
          tags: [],
        };
      } else if (currentProject && (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*'))) {
        const bulletText = trimmed.replace(/^[•\-*]\s*/, '');
        if (!currentProject.description) {
          currentProject.description = bulletText;
        }
      }
    });
    if (currentProject) {
      result.projects.push(currentProject);
    }
  }

  return result;
}

/**
 * Validates whether a file is a valid PDF.
 */
export function validatePdfFile(file: File): { valid: boolean; error?: string } {
  if (!file.type || file.type !== 'application/pdf') {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'pdf') {
      return {
        valid: false,
        error: 'Unsupported file type. Please upload a PDF.',
      };
    }
  }
  
  // 10MB limit
  if (file.size > 10 * 1024 * 1024) {
    return {
      valid: false,
      error: 'File too large. Please upload a PDF under 10MB.',
    };
  }

  return { valid: true };
}
