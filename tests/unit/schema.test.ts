import { describe, it, expect } from 'vitest';
import {
  websiteSchema,
  organizationSchema,
  faqPageSchema,
  medicalWebPageSchema,
  quizSchema,
  breadcrumbSchema
} from '$lib/schema';

describe('schema', () => {
  it('websiteSchema has @type WebSite', () => {
    expect(websiteSchema()['@type']).toBe('WebSite');
  });

  it('faqPageSchema embeds questions', () => {
    const s = faqPageSchema([{ q: 'Is this medical advice?', a: 'No.' }]);
    expect(s['@type']).toBe('FAQPage');
    expect(s.mainEntity).toHaveLength(1);
  });

  it('breadcrumbSchema preserves order', () => {
    const s = breadcrumbSchema([
      { name: 'Home', url: 'https://phq9.online/' },
      { name: 'FAQ', url: 'https://phq9.online/faq' }
    ]);
    expect(s.itemListElement[0]!.position).toBe(1);
    expect(s.itemListElement[1]!.position).toBe(2);
  });

  it('organizationSchema has correct email', () => {
    expect(organizationSchema().email).toBe('contact@phq9.online');
  });

  it('medicalWebPageSchema has Patient audience', () => {
    const s = medicalWebPageSchema({
      url: 'https://phq9.online/',
      name: 'Test',
      description: 'Test'
    });
    expect(s.medicalAudience.audienceType).toBe('Patient');
  });

  it('quizSchema has educationalLevel consumer', () => {
    const s = quizSchema({ name: 'Test', url: 'https://phq9.online/', about: 'depression' });
    expect(s.educationalLevel).toBe('consumer');
  });
});
