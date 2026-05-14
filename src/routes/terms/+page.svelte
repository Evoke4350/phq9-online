<script lang="ts">
  import { breadcrumbSchema } from '$lib/schema';

  const url = 'https://phq9.online/terms';
  const ld = [
    breadcrumbSchema([
      { name: 'Home', url: 'https://phq9.online/' },
      { name: 'Terms of Use', url }
    ])
  ];
</script>

<svelte:head>
  <title>Terms of Use — phq9.online</title>
  <meta
    name="description"
    content="Terms of use for phq9.online: MIT-licensed code, informational use only, no warranty, governing law of Iceland."
  />
  <link rel="canonical" href={url} />
  <meta property="og:title" content="Terms of Use — phq9.online" />
  <meta
    property="og:description"
    content="Terms of use for phq9.online: MIT-licensed code, informational use only, no warranty, governing law of Iceland."
  />
  <meta property="og:url" content={url} />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="https://phq9.online/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  {@html ld
    .map(
      (b) =>
        `<script type="application/ld+json">${JSON.stringify(b).replace(/</g, '\\u003c')}</script>`
    )
    .join('')}
</svelte:head>

<article class="prose max-w-prose">
  <h1>Terms of Use</h1>

  <p>
    These Terms of Use ("Terms") govern your use of phq9.online (the "Site"). By accessing or
    using the Site, you agree to be bound by these Terms. If you do not agree to these Terms,
    please do not use the Site.
  </p>
  <p>Last updated: January 2025.</p>

  <h2>Use of the Site</h2>
  <p>
    The Site provides access to validated, public-domain mental health screening instruments and
    related informational content. You may use the Site for personal, educational, clinical, or
    research purposes, provided that such use complies with these Terms and all applicable laws.
  </p>
  <p>
    You may not use the Site in any way that is unlawful, harmful, fraudulent, or deceptive. You
    may not use automated means to scrape, crawl, or systematically download content from the
    Site in a manner that disrupts its operation or imposes an unreasonable burden on the Site's
    infrastructure.
  </p>

  <h2>Not Medical Advice</h2>
  <p>
    The Site is provided for informational purposes only. Nothing on the Site constitutes medical
    advice, diagnosis, or treatment. Your use of the Site does not create any professional
    relationship between you and the maintainer. See the <a href="/disclaimer">disclaimer</a>
    for full details.
  </p>

  <h2>Licence for Site Code</h2>
  <p>
    The source code of phq9.online is released under the
    <strong>MIT Licence</strong>. You are free to use, copy, modify, merge, publish, distribute,
    sublicence, and sell copies of the software in accordance with the terms of the MIT Licence,
    which is reproduced in full in the source repository at
    <a href="https://github.com/nathanib/phq9-online" rel="noopener noreferrer" target="_blank">github.com/nathanib/phq9-online</a>.
  </p>
  <p>
    The screening instruments reproduced on the Site (PHQ-9, PHQ-2, GAD-7, CES-D, PROMIS
    Depression, WSAS, WHO-5) are in the public domain. Their reproduction does not require
    permission, but attribution to the original authors is encouraged as a matter of academic
    good practice.
  </p>

  <h2>No Warranty</h2>
  <p>
    The Site and its content are provided "as is" and "as available," without warranty of any
    kind, express or implied, including but not limited to warranties of merchantability, fitness
    for a particular purpose, accuracy, or non-infringement. The maintainer does not warrant
    that the Site will be uninterrupted, error-free, or free of viruses or other harmful
    components.
  </p>

  <h2>Limitation of Liability</h2>
  <p>
    To the fullest extent permitted by applicable law, the maintainer of phq9.online shall not
    be liable for any direct, indirect, incidental, special, consequential, or exemplary damages
    arising out of or in connection with your use of the Site or its content, including but not
    limited to decisions made in reliance on screening results.
  </p>

  <h2>Indemnification</h2>
  <p>
    You agree to indemnify and hold harmless the maintainer of phq9.online from and against any
    claims, liabilities, damages, losses, and expenses, including reasonable legal fees, arising
    out of or in any way connected with your access to or use of the Site, your violation of
    these Terms, or your infringement of any rights of any third party.
  </p>

  <h2>Governing Law</h2>
  <p>
    These Terms shall be governed by the laws of Iceland, without regard to its conflict of laws
    provisions.
  </p>

  <h2>Changes to These Terms</h2>
  <p>
    The maintainer reserves the right to update these Terms at any time. The "last updated" date
    at the top of this page will reflect any changes. Your continued use of the Site after any
    modification constitutes your acceptance of the revised Terms.
  </p>

  <h2>Severability</h2>
  <p>
    If any provision of these Terms is found to be unenforceable or invalid under applicable
    law, that provision will be limited or eliminated to the minimum extent necessary so that
    the remaining provisions of these Terms remain in full force and effect.
  </p>

  <h2>Entire Agreement</h2>
  <p>
    These Terms, together with the <a href="/privacy">Privacy Policy</a> and
    <a href="/disclaimer">Disclaimer</a>, constitute the entire agreement between you and
    the maintainer of phq9.online with respect to your use of the Site, and supersede all prior
    or contemporaneous communications and proposals, whether oral or written.
  </p>

  <h2>Contact</h2>
  <p>
    For questions about these Terms, contact
    <a href="mailto:contact@phq9.online">contact@phq9.online</a>.
  </p>
</article>
