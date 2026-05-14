<script lang="ts">
  import { breadcrumbSchema } from '$lib/schema';

  const url = 'https://phq9.online/about';
  const ld = [
    breadcrumbSchema([
      { name: 'Home', url: 'https://phq9.online/' },
      { name: 'About', url }
    ])
  ];
</script>

<svelte:head>
  <title>About — phq9.online</title>
  <meta
    name="description"
    content="About phq9.online: an independent site offering free, public-domain mental health screening tools. No accounts, no data collection, open-source code."
  />
  <link rel="canonical" href={url} />
  <meta property="og:title" content="About — phq9.online" />
  <meta
    property="og:description"
    content="About phq9.online: an independent site offering free, public-domain mental health screening tools. No accounts, no data collection, open-source code."
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
  <h1>About phq9.online</h1>

  <h2>What This Site Is</h2>
  <p>
    phq9.online is an independent website that provides free access to validated, public-domain
    mental health screening instruments. It is designed for individuals who want to check in on
    their mental health and for clinicians or researchers who need a convenient, accessible
    version of these tools. The site currently offers seven screeners: the PHQ-9, PHQ-2, GAD-7,
    CES-D, PROMIS Depression, WSAS, and WHO-5.
  </p>

  <h2>Methodology</h2>
  <p>
    Only instruments that are in the public domain are included on this site. No proprietary
    screeners requiring licensing fees or permissions are used. Each instrument is implemented
    exactly as specified in the original published validation, including the scoring algorithm,
    item wording, response options, and severity bands. The source references and DOI links for
    each instrument are documented in the screener definitions and on the
    <a href="/compare">compare</a> page.
  </p>
  <p>
    No modifications are made to item wording or scoring. The instruments are administered in
    their standard validated form to preserve the validity and reliability properties established
    in the peer-reviewed literature.
  </p>

  <h2>Privacy and Data</h2>
  <p>
    The site does not require any account, registration, or login. No personally identifiable
    information is collected or stored on any server. If you choose to save your screening
    history, it is stored exclusively in your browser's localStorage on your own device. You
    can export or delete this data at any time from the <a href="/history">history page</a>.
    See the <a href="/privacy">privacy policy</a> for full details.
  </p>

  <h2>How It Is Funded</h2>
  <p>
    The site is funded through Google AdSense advertising and may accept direct sponsorships
    from organisations relevant to the site's audience. Instrument selection, scoring, and
    content editorial decisions are made independently of any funding arrangement. The site will
    never include instruments that are not in the public domain, and will never recommend
    specific commercial products or services within clinical content.
  </p>

  <h2>Source Code</h2>
  <p>
    The full source code for phq9.online is open and available at
    <a href="https://github.com/nathanib/phq9-online" rel="noopener noreferrer" target="_blank">github.com/nathanib/phq9-online</a>.
    The code is released under the MIT licence. Contributions, bug reports, and suggestions are
    welcome via GitHub Issues.
  </p>

  <h2>Maintainer</h2>
  <p>
    phq9.online is maintained by nathanib, a private individual with a personal interest in
    accessible mental health screening. The maintainer is not a licensed healthcare professional
    and the site does not provide clinical services. For questions or feedback, see the
    <a href="/contact">contact page</a>.
  </p>

  <h2>What This Site Is Not</h2>
  <p>
    phq9.online is not a clinical service and does not provide medical advice, diagnosis, or
    treatment of any kind. It is not affiliated with any health authority, pharmaceutical company,
    or professional body. The maintainer is not a licensed healthcare professional. The site's
    instruments and informational content are intended to support individuals in understanding
    their own mental health and having more informed conversations with their clinicians — not to
    replace those conversations.
  </p>
  <p>
    If you are concerned about your mental health or the mental health of someone close to you,
    please speak with a qualified healthcare professional. If you are in crisis, visit the
    <a href="/crisis">crisis resources</a> page for immediate support.
  </p>

  <h2>Disclaimer</h2>
  <p>
    The screening tools on this site are provided for informational purposes only and do not
    constitute medical advice, diagnosis, or treatment. See the full
    <a href="/disclaimer">disclaimer</a> for details.
  </p>
</article>
