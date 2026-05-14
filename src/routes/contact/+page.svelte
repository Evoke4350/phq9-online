<script lang="ts">
  import { breadcrumbSchema } from '$lib/schema';

  const url = 'https://phq9.online/contact';
  const ld = [
    breadcrumbSchema([
      { name: 'Home', url: 'https://phq9.online/' },
      { name: 'Contact', url }
    ])
  ];
</script>

<svelte:head>
  <title>Contact — phq9.online</title>
  <meta
    name="description"
    content="Contact phq9.online by email at contact@phq9.online or via GitHub Issues."
  />
  <link rel="canonical" href={url} />
  <meta property="og:title" content="Contact — phq9.online" />
  <meta property="og:description" content="Contact phq9.online by email at contact@phq9.online or via GitHub Issues." />
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
  <h1>Contact</h1>

  <p>
    For questions, feedback, content corrections, or general enquiries, please email
    <a href="mailto:contact@phq9.online">contact@phq9.online</a>.
    The maintainer aims to respond within a few business days, though response times may vary
    depending on volume.
  </p>

  <p>
    For bug reports, feature requests, or technical issues, the preferred channel is
    <a href="https://github.com/nathanib/phq9-online/issues" rel="noopener noreferrer" target="_blank">GitHub Issues</a>.
    Opening an issue there allows others to see the discussion and contribute, and makes it
    easier to track progress on any reported problems.
  </p>

  <p>
    Please note that this site does not provide clinical or medical advice. If you have a mental
    health concern, please contact a qualified healthcare professional or, if you are in crisis,
    a crisis helpline. See the <a href="/crisis">crisis resources</a> page for contact numbers
    in your country.
  </p>

  <p>
    If you are contacting us about a screener error, a broken link, or a factual inaccuracy in
    the content, please include the page URL and a brief description of the issue. We take
    accuracy seriously and aim to address substantive content corrections promptly.
  </p>

  <p>
    The maintainer is based in Iceland. Response times are typically within a few business days,
    but may be longer during busy periods. For time-sensitive technical matters, GitHub Issues
    tends to be monitored more frequently than the contact email address and is the preferred
    channel for anything related to screener accuracy or site bugs.
  </p>
</article>
