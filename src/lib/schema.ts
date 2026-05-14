const ORIGIN = 'https://phq9.online';

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'phq9.online',
  url: ORIGIN,
  inLanguage: 'en'
});

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'phq9.online',
  url: ORIGIN,
  email: 'contact@phq9.online',
  logo: `${ORIGIN}/favicon.svg`
});

export const medicalWebPageSchema = (opts: {
  url: string;
  name: string;
  description: string;
  lastReviewed?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  url: opts.url,
  name: opts.name,
  description: opts.description,
  lastReviewed: opts.lastReviewed ?? new Date().toISOString().slice(0, 10),
  medicalAudience: { '@type': 'MedicalAudience', audienceType: 'Patient' }
});

export const quizSchema = (opts: { name: string; url: string; about: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: opts.name,
  url: opts.url,
  about: opts.about,
  educationalLevel: 'consumer'
});

export const faqPageSchema = (qa: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: qa.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a }
  }))
});

export const breadcrumbSchema = (crumbs: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: c.url
  }))
});
