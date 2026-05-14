<script lang="ts">
  import { breadcrumbSchema } from '$lib/schema';

  const url = 'https://phq9.online/disclaimer';
  const ld = [
    breadcrumbSchema([
      { name: 'Home', url: 'https://phq9.online/' },
      { name: 'Disclaimer', url }
    ])
  ];
</script>

<svelte:head>
  <title>Disclaimer — phq9.online</title>
  <meta
    name="description"
    content="phq9.online provides validated screening tools for informational purposes only. This is not medical advice and does not create a doctor-patient relationship."
  />
  <link rel="canonical" href={url} />
  <meta property="og:title" content="Disclaimer — phq9.online" />
  <meta
    property="og:description"
    content="phq9.online provides validated screening tools for informational purposes only. This is not medical advice and does not create a doctor-patient relationship."
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
  <h1>Disclaimer</h1>

  <h2>Not Medical Advice</h2>
  <p>
    The content on phq9.online, including all screening questionnaires, scoring results,
    interpretive text, and informational articles, is provided for general informational and
    educational purposes only. Nothing on this site constitutes medical advice, clinical
    guidance, diagnosis, or treatment. You should not use the results of any screener on this
    site as the basis for starting, stopping, or modifying any medical treatment, including
    medication, therapy, or other interventions.
  </p>

  <h2>Screening Is Not Diagnosis</h2>
  <p>
    The instruments available on this site — including the PHQ-9, PHQ-2, GAD-7, CES-D, PROMIS
    Depression, WSAS, and WHO-5 — are validated screening tools, not diagnostic tests. Screening
    is a population-level process of identifying individuals who may benefit from further clinical
    evaluation. A score above a cut-point indicates that your responses resemble those of people
    who were subsequently found to meet diagnostic criteria in a clinical assessment, but it does
    not constitute a diagnosis of any mental health condition.
  </p>
  <p>
    A low score does not guarantee that you do not have depression, anxiety, or any other
    condition. Mental health symptoms exist on a spectrum, and significant distress can be present
    at any score level. If you are concerned about your mental health, speak with a qualified
    healthcare professional regardless of your screening result.
  </p>

  <h2>No Doctor-Patient Relationship</h2>
  <p>
    Using this website does not create a doctor-patient relationship, a therapist-client
    relationship, or any other professional relationship between you and the maintainer of
    phq9.online or any third party associated with this site. The maintainer is not a licensed
    healthcare provider and does not provide clinical services of any kind.
  </p>

  <h2>Seek Professional Advice</h2>
  <p>
    Always consult a qualified and licensed healthcare provider — such as a general practitioner,
    psychiatrist, psychologist, or other mental health professional — before making any decisions
    about your mental health or treatment. They are the appropriate people to evaluate your
    specific circumstances, order relevant assessments, and provide personalised advice.
  </p>

  <h2>Crisis and Emergency Situations</h2>
  <p>
    If you are experiencing a mental health emergency, are in immediate danger, or are having
    thoughts of suicide or self-harm, do not rely on this website for help. Contact your local
    emergency services immediately (911 in the US, 999 in the UK, 112 in the EU, 000 in
    Australia), or call a dedicated crisis helpline. A list of crisis services is available on
    the <a href="/crisis">crisis resources</a> page.
  </p>

  <h2>Accuracy and Currency</h2>
  <p>
    While every effort has been made to ensure the accuracy of the screening instruments and
    supporting information on this site, the maintainer makes no representations or warranties
    of any kind — express or implied — as to the completeness, accuracy, reliability, or
    suitability of the information for any purpose. The field of mental health research evolves
    continuously; clinical guidelines and scoring thresholds may change. Users are encouraged to
    consult current clinical guidelines and primary literature.
  </p>
</article>
