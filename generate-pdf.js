const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ margin: 50 });
doc.pipe(fs.createWriteStream('public/resume.pdf'));

// Name and Contact
doc.fontSize(24).fillColor('#008080').text('Prince Varti');
doc.moveDown(0.5);
doc.fontSize(10).fillColor('black').text('Bengaluru • +91-7974789232 • princevarti@gmail.com • linkedin.com/in/princevarti • https://github.com/princeparas16');

doc.moveDown(1.5);
doc.fontSize(14).text('Senior Frontend Engineer | Leaning Full-Stack Engineer', { underline: true });
doc.moveDown(0.5);
doc.fontSize(10).text('Senior Software Engineer with 7.5+ years of experience delivering scalable, enterprise-grade retail products using React, Node.js, AWS, and modern AI technologies. Proven track record of leading end-to-end feature ownership, driving architecture decisions, and shipping production systems across multi-region environments. Delivered LLM-powered intelligence capabilities that is expected to improve user engagement by 20%, reduced production defects by 20% through engineering quality initiatives, and accelerated software delivery by integrating AI across the SDLC.');

doc.moveDown(1.5);
doc.fontSize(12).fillColor('#008080').text('SKILLS');
doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
doc.moveDown(0.5);
doc.fontSize(10).fillColor('black');
doc.text('Frontend: JavaScript (ES6), React.js, Redux, Redux toolkit, HTML5, CSS3, Next.js, Webpack, TypeScript, Accessibility (WCAG), SCSS, Bootstrap, Micro-Frontend');
doc.text('Backend (25%): Node.js, Express, REST APIs, API Integration, Authentication & Authorization, Logging');
doc.text('Cloud & Infra: AWS (EC2, Lambda, ECS, ECR, S3, CloudFront, CloudWatch, Docker, Jenkins, ORCA, SonarQube');
doc.text('Data & Observability: New Relic, Datadog, Mixpanel, MongoDB, Mongoose, Aggregations, Query, Redis');
doc.text('AI & Tools: Windsurf, LLM, RAG, VectorDB, Similarity Search, GIT, JIRA, Agile/Scrum, Jest, RTL, Lighthouse');

doc.moveDown(1.5);
doc.fontSize(12).fillColor('#008080').text('WORK EXPERIENCE');
doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
doc.moveDown(0.5);

doc.fontSize(11).fillColor('black').text('7-Eleven', { continued: true }).text(' • Jun 2022 - Present', { align: 'right' });
doc.fontSize(10).text('Senior Software Engineer • Full-time');
doc.text('• Modernization: Modernized live production systems by upgrading React 16 -> 19, React Router, Redux, Web-pack optimized, dependency upgrades, Node.js upgrades, and reducing technical debt.');
doc.text('• Internationalization: Built an application that supports multiple international languages, currencies, time zones, and formats using i18next, locale, currency/date formatting, etc.');
doc.text('• System performance: Improved system performance via render optimizations, API handling, and Redis + memoization caching — resulting in ~15% faster load times. Also, db indexing results in comparatively faster data load time.');
doc.text('• Monitoring: Owned production incident resolution using New Relic (logs, metrics, traces) — diagnosed root causes and shipped long-term fixes to prevent recurrence.');
doc.text('• Design Decisions: Improved frontend architecture via reusable patterns and micro-frontend alignment, reducing development overhead.');
doc.text('• Technical Documentation: Documented API contracts, PRDs, Tech Specs, Confluence pages, business flows, data flow, architecture decisions, onboarding guides, and multi-repository setup.');
doc.text('• Cross-functional Engineering: Collaborated with Engineering, Product, QA, UX, and business teams on technical trade-offs, PRDs, Tech Specs, feature rollouts, feature flags, epics, user stories, POCs, sprint planning, mentoring, code PR reviews, and stakeholder discussions.');

doc.moveDown(1);
doc.fontSize(11).text('Publicis Sapient', { continued: true }).text(' • Feb 2021 - Jun 2022', { align: 'right' });
doc.fontSize(10).text('Software Engineer • Full-time');
doc.text('• Built scalable UI systems using JavaScript, Handlebars, SCSS.');
doc.text('• Testing: Built testing strategies for multi-brand enterprise apps while maintaining 80%+ test coverage using Jest, React Testing Library (RTL), mocking, snapshots, and CI pipelines.');
doc.text('• Accessibility (WCAG): Implemented accessibility using Semantic HTML, ARIA, keyboard navigation, focus management, and screen reader support.');

doc.moveDown(1);
doc.fontSize(11).text('Infosys', { continued: true }).text(' • Nov 2018 - Feb 2021', { align: 'right' });
doc.fontSize(10).text('Associate Software Engineer • Full-time');
doc.text('• Legacy Modernization: Modernized legacy enterprise desktop applications for desktop, iPad, and mobile by implementing responsive layouts with CSS Grid, Flexbox, and media queries, ensuring feature parity while preserving existing business workflows and minimizing regression risk.');
doc.text('• CI/CD & Release Automation: Contributed via Jenkins, GitLab Pipelines, Docker, SonarQube, and ORCA to automate build, test, deployment, and quality assurance processes, delivering reliable production releases with rollback support.');

doc.end();
console.log('PDF generated successfully');
