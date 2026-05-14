<script lang="ts">
  import { breadcrumbSchema } from '$lib/schema';

  const url = 'https://phq9.online/crisis';
  const ld = [
    breadcrumbSchema([
      { name: 'Home', url: 'https://phq9.online/' },
      { name: 'Crisis Resources', url }
    ])
  ];
</script>

<svelte:head>
  <title>Crisis Resources — phq9.online</title>
  <meta
    name="description"
    content="Mental health crisis helplines by country: US 988, UK Samaritans 116 123, Canada 988, Australia Lifeline 13 11 14, Iceland Pieta 1717, Germany TelefonSeelsorge, France 3114, and international directory."
  />
  <link rel="canonical" href={url} />
  <meta property="og:title" content="Crisis Resources — phq9.online" />
  <meta
    property="og:description"
    content="Mental health crisis helplines by country: US 988, UK Samaritans 116 123, Canada 988, Australia Lifeline 13 11 14, Iceland Pieta 1717, Germany TelefonSeelsorge, France 3114, and international directory."
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
  <h1>Crisis Resources</h1>

  <p>
    If you are in immediate danger, call your local emergency services now: <strong>911</strong>
    (US, Canada), <strong>999</strong> (UK), <strong>112</strong> (EU, including Iceland),
    <strong>000</strong> (Australia), or <strong>110 / 112</strong> (Germany).
  </p>
  <p>
    If you are not in immediate danger but are having thoughts of suicide or self-harm, please
    reach out to a crisis service below. All phone lines listed are free unless noted otherwise.
    Many also offer text, web chat, and email options for those who prefer not to speak aloud.
  </p>

  <h2>United States</h2>
  <ul>
    <li>
      <strong>988 Suicide and Crisis Lifeline</strong> — Call or text <strong>988</strong> (24/7,
      free). Also available via chat at
      <a href="https://988lifeline.org" rel="noopener noreferrer" target="_blank">988lifeline.org</a>.
      Specialised options for veterans (press 1), LGBTQ+ individuals, and Spanish speakers.
    </li>
    <li>
      <strong>Crisis Text Line</strong> — Text <strong>HOME</strong> to <strong>741741</strong>
      (24/7, free). Text-based crisis support with trained counsellors.
    </li>
  </ul>

  <h2>United Kingdom</h2>
  <ul>
    <li>
      <strong>Samaritans</strong> — Call <strong>116 123</strong> (24/7, free from any phone in
      the UK and Ireland). Also available at
      <a href="https://www.samaritans.org" rel="noopener noreferrer" target="_blank">samaritans.org</a>
      via email (jo@samaritans.org — response within 24 hours).
    </li>
    <li>
      <strong>Shout</strong> — Text <strong>SHOUT</strong> to <strong>85258</strong> (24/7, free).
      Text-based crisis support via
      <a href="https://giveusashout.org" rel="noopener noreferrer" target="_blank">giveusashout.org</a>.
    </li>
    <li>
      <strong>PAPYRUS (under 35s)</strong> — Call <strong>0800 068 4141</strong> (Mon–Fri 10am–10pm,
      weekends 2pm–10pm). Text 07786 209697.
    </li>
  </ul>

  <h2>Canada</h2>
  <ul>
    <li>
      <strong>988 Suicide Crisis Helpline</strong> — Call or text <strong>988</strong> (24/7, free,
      available in English and French). Launched November 2023.
    </li>
    <li>
      <strong>Crisis Services Canada</strong> — Call <strong>1-833-456-4566</strong> (24/7).
      Text 45645 (4pm–midnight ET).
    </li>
  </ul>

  <h2>Iceland</h2>
  <ul>
    <li>
      <strong>Pieta / Throskahjálp</strong> — Call <strong>1717</strong> (24/7, free). The
      national suicide prevention helpline operated by Pieta in cooperation with Icelandic
      health authorities.
    </li>
  </ul>

  <h2>Australia</h2>
  <ul>
    <li>
      <strong>Lifeline</strong> — Call <strong>13 11 14</strong> (24/7, free). Also available
      via web chat at
      <a href="https://www.lifeline.org.au" rel="noopener noreferrer" target="_blank">lifeline.org.au</a>.
    </li>
    <li>
      <strong>Beyond Blue</strong> — Call <strong>1300 22 4636</strong> (24/7). Also available
      via web chat at
      <a href="https://www.beyondblue.org.au" rel="noopener noreferrer" target="_blank">beyondblue.org.au</a>.
    </li>
  </ul>

  <h2>Germany</h2>
  <ul>
    <li>
      <strong>TelefonSeelsorge</strong> — Call <strong>0800 111 0 111</strong> or
      <strong>0800 111 0 222</strong> (24/7, free). Confidential emotional support and crisis
      counselling. Also available via web chat and email at
      <a href="https://www.telefonseelsorge.de" rel="noopener noreferrer" target="_blank">telefonseelsorge.de</a>.
    </li>
  </ul>

  <h2>France</h2>
  <ul>
    <li>
      <strong>Numéro national de prévention du suicide</strong> — Call <strong>3114</strong>
      (24/7, free). The French national suicide prevention hotline staffed by mental health
      professionals. Also available via chat at
      <a href="https://www.3114.fr" rel="noopener noreferrer" target="_blank">3114.fr</a>.
    </li>
  </ul>

  <h2>International Directory</h2>
  <p>
    If your country is not listed above, the following resources provide comprehensive
    international directories:
  </p>
  <ul>
    <li>
      <a href="https://findahelpline.com" rel="noopener noreferrer" target="_blank">findahelpline.com</a>
      — searchable directory of crisis lines covering over 100 countries, including phone, text,
      and chat services.
    </li>
    <li>
      <a href="https://www.iasp.info/resources/Crisis_Centres/" rel="noopener noreferrer" target="_blank">
        International Association for Suicide Prevention — Crisis Centres
      </a>
      — directory maintained by the IASP.
    </li>
  </ul>

  <h2>Text and Chat Services</h2>
  <p>
    For those who prefer not to use the phone, text and web chat options are available in many
    countries. Key services include:
  </p>
  <ul>
    <li>
      <strong>Crisis Text Line (US/UK/Canada/Ireland)</strong> — Free 24/7 text-based support.
      Text HOME to 741741 (US/Canada), 85258 (UK), or 50808 (Ireland).
    </li>
    <li>
      <strong>988 Chat (US)</strong> — Available at
      <a href="https://988lifeline.org/chat" rel="noopener noreferrer" target="_blank">988lifeline.org/chat</a>.
    </li>
    <li>
      <strong>3114 Chat (France)</strong> — Available at
      <a href="https://www.3114.fr" rel="noopener noreferrer" target="_blank">3114.fr</a>.
    </li>
  </ul>

  <h2>What to Expect When You Call</h2>
  <p>
    Many people hesitate to call a crisis line because they are unsure what to expect. Crisis
    lines are staffed by trained volunteers or professionals who will listen without judgment.
    You do not need to be at the point of attempting suicide to call — you can reach out whenever
    you are in distress, overwhelmed, or struggling to cope. Calls are confidential. The
    counsellor will listen, help you think through your situation, and may provide information
    about local resources. You are in control of the conversation and can end it at any time.
  </p>
  <p>
    If you are unable to speak or prefer not to use the phone, most of the services listed above
    also offer text or web chat options. Some services also support email contact if you need
    more time to express yourself in writing.
  </p>

  <p>
    You deserve support. Reaching out is a sign of strength, not weakness. If one service does
    not feel right for you, try another — they all exist to help.
  </p>
</article>
