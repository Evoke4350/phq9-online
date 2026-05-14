<script lang="ts">
  import { breadcrumbSchema } from '$lib/schema';

  const url = 'https://phq9.online/privacy';
  const ld = [
    breadcrumbSchema([
      { name: 'Home', url: 'https://phq9.online/' },
      { name: 'Privacy Policy', url }
    ])
  ];
</script>

<svelte:head>
  <title>Privacy Policy — phq9.online</title>
  <meta
    name="description"
    content="Privacy policy for phq9.online: no accounts, no PII collected, localStorage only for history, Google AdSense advertising with consent via Google Funding Choices, GDPR and CCPA notes."
  />
  <link rel="canonical" href={url} />
  <meta property="og:title" content="Privacy Policy — phq9.online" />
  <meta
    property="og:description"
    content="Privacy policy for phq9.online: no accounts, no PII collected, localStorage only for history, Google AdSense advertising with consent via Google Funding Choices, GDPR and CCPA notes."
  />
  <meta property="og:url" content={url} />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="https://phq9.online/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  {@html ld
    .map(
      (b) =>
        `<script type="application/ld+json">${JSON.stringify(b).replace(/</g, '\\u003c')}<\/script>`
    )
    .join('')}
</svelte:head>

<article class="prose max-w-prose">
  <h1>Privacy Policy</h1>

  <p>
    This privacy policy explains what data phq9.online collects (very little), how it is used,
    and what rights you have. It applies to all visitors to phq9.online.
  </p>
  <p>Last updated: January 2025.</p>

  <h2>No Accounts, No Personally Identifiable Information</h2>
  <p>
    phq9.online does not require any account, registration, or login. You can use every
    screener on the site without providing any name, email address, date of birth, or any other
    personally identifiable information (PII). The site does not collect or store PII on any
    server operated by the maintainer.
  </p>

  <h2>Screener Answers and Local History</h2>
  <p>
    When you complete a screener, your answers are processed entirely in your browser to calculate
    your score. The answers and your score are not transmitted to any server. If you opt in to
    saving your history, your completed screener attempts (screener name, date, score, band, and
    individual answers) are stored in your browser's <code>localStorage</code>. This data stays
    on your device and is not accessible to the site's server or to any third party.
  </p>
  <p>
    History storage is opt-in and disabled by default. You can enable or disable it at any time
    from the <a href="/history">history page</a>, and you can export or delete all stored data
    from that page at any time. Clearing your browser's site data will also remove all stored
    history.
  </p>

  <h2>Advertising — Google AdSense</h2>
  <p>
    phq9.online uses <strong>Google AdSense</strong> to display advertisements. Google AdSense
    may use cookies and similar tracking technologies to show personalised ads based on your
    browsing activity, as described in
    <a href="https://policies.google.com/technologies/ads" rel="noopener noreferrer" target="_blank">Google's advertising policies</a>.
    Google's use of advertising cookies enables it and its partners to serve ads based on your
    visits to this and other websites.
  </p>
  <p>
    You can opt out of personalised advertising by visiting
    <a href="https://www.google.com/settings/ads" rel="noopener noreferrer" target="_blank">Google Ads Settings</a>
    or by visiting
    <a href="https://www.aboutads.info/choices/" rel="noopener noreferrer" target="_blank">aboutads.info</a>.
  </p>

  <h2>Consent Management — Google Funding Choices</h2>
  <p>
    For visitors in the European Economic Area (EEA), the United Kingdom, and Canada, consent
    for advertising cookies is collected via the <strong>Google Funding Choices</strong> Consent
    Management Platform (CMP). This is a Google-provided tool that meets the requirements of the
    IAB Europe Transparency and Consent Framework (TCF). You will be presented with a consent
    notice when you first visit the site if you are in one of these regions. You may change your
    consent preferences at any time.
  </p>
  <p>
    If you do not consent to advertising cookies, Google will serve non-personalised ads instead.
    The site remains fully functional regardless of your advertising consent choice.
  </p>

  <h2>Analytics</h2>
  <p>
    phq9.online does not use any analytics service by default. No Google Analytics, no Matomo,
    no Plausible — nothing that tracks page views or user behaviour out of the box. If
    <strong>Cloudflare Web Analytics</strong> is added in the future, it is cookieless and
    privacy-preserving — it does not use cookies and does not collect personally identifiable
    information. This policy will be updated if analytics are introduced.
  </p>

  <h2>Cookies</h2>
  <p>
    The site itself does not set any first-party cookies. Google AdSense and the Google Funding
    Choices CMP may set third-party cookies as described above. If you decline advertising
    consent, no advertising cookies will be set.
  </p>

  <h2>Third-Party Links</h2>
  <p>
    phq9.online links to external websites including crisis helplines, academic journals, and
    reference resources. These third-party sites have their own privacy policies, and the
    maintainer is not responsible for their content or privacy practices.
  </p>

  <h2>GDPR (European Economic Area and UK)</h2>
  <p>
    If you are located in the EEA or UK, the General Data Protection Regulation (GDPR) or its
    UK equivalent applies. Because phq9.online does not collect any personal data directly, the
    legal basis for data processing does not arise in the ordinary course of use. Advertising
    cookies placed by Google AdSense are subject to your explicit consent, which is collected
    via the Google Funding Choices CMP as described above. Google acts as a data controller for
    the advertising data it collects. You have the right to access, correct, or request deletion
    of any personal data Google holds about you via Google's
    <a href="https://myaccount.google.com" rel="noopener noreferrer" target="_blank">My Account</a>
    settings.
  </p>

  <h2>CCPA (California Residents)</h2>
  <p>
    If you are a California resident, the California Consumer Privacy Act (CCPA) may apply to
    data collected by Google AdSense in connection with your use of this site. phq9.online does
    not sell your personal information. To exercise your rights under the CCPA regarding
    Google's data collection, please refer to
    <a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">Google's Privacy Policy</a>.
  </p>

  <h2>Changes to This Policy</h2>
  <p>
    This privacy policy may be updated from time to time. The "last updated" date at the top of
    this page will reflect any changes. Continued use of the site after an update constitutes
    acceptance of the revised policy.
  </p>

  <h2>Data Retention</h2>
  <p>
    Because no personal data is collected by the maintainer, there is nothing to retain or delete
    on the server side. LocalStorage data on your device persists until you delete it via the
    history page or clear your browser's site data for phq9.online. Advertising data collected
    by Google is subject to Google's own data retention policies.
  </p>

  <h2>Children</h2>
  <p>
    phq9.online is not directed at children under the age of 13, and the site does not knowingly
    collect personal information from children. The screening instruments are intended for use
    by adults or by older adolescents under the supervision of a parent, guardian, or healthcare
    professional.
  </p>

  <h2>Contact</h2>
  <p>
    For questions about this privacy policy, contact
    <a href="mailto:contact@phq9.online">contact@phq9.online</a>.
  </p>
</article>
