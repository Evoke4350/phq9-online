<script lang="ts">
  import { faqPageSchema, breadcrumbSchema } from '$lib/schema';

  const url = 'https://phq9.online/faq';

  const faq = [
    {
      q: 'What is the PHQ-9?',
      a: 'The PHQ-9 (Patient Health Questionnaire-9) is a validated nine-item self-report screening instrument used to detect and measure the severity of depressive symptoms. It was developed by Drs. Robert Spitzer, Janet Williams, and Kurt Kroenke as part of the PRIME-MD project and first validated in a study of 6,000 primary care patients published in 2001. The instrument is in the public domain and is used worldwide in clinical, research, and population health settings.'
    },
    {
      q: 'Is the PHQ-9 free to use?',
      a: 'Yes. The PHQ-9 is in the public domain. It was originally developed with support from an educational grant from Pfizer Inc., but Pfizer waived all rights to the instrument. It can be reproduced, translated, and used without permission or payment. The other instruments on this site — the PHQ-2, GAD-7, CES-D, PROMIS Depression, WSAS, and WHO-5 — are also in the public domain.'
    },
    {
      q: 'Is this a diagnosis?',
      a: 'No. A score from any instrument on this site is not a diagnosis. These are screening tools designed to identify people who may benefit from further clinical evaluation. A high score indicates that your pattern of responses resembles that of people who were subsequently found to have the condition by a structured clinical interview, but only a qualified clinician who has conducted a full assessment can provide a diagnosis.'
    },
    {
      q: 'How accurate is the PHQ-9?',
      a: 'At the standard cut-point of 10 or greater, the PHQ-9 has demonstrated sensitivity of approximately 88% and specificity of approximately 88% for major depressive disorder in primary care settings, based on the original 2001 validation study of 6,000 patients. A 2010 meta-analysis across 38 independent studies confirmed these estimates, reporting pooled sensitivity of 88% (95% CI 83–92%) and specificity of 85% (95% CI 82–88%).'
    },
    {
      q: 'What does my score mean?',
      a: 'PHQ-9 scores fall into five bands: 0–4 (minimal or no depression), 5–9 (mild), 10–14 (moderate), 15–19 (moderately severe), and 20–27 (severe). Scores should be interpreted alongside your clinical context. A score at any level does not automatically require a specific action, but a score of 10 or above generally warrants a conversation with a healthcare professional. See the full interpretation guide at phq9.online/interpretation.'
    },
    {
      q: 'What is the GAD-7?',
      a: 'The GAD-7 (Generalised Anxiety Disorder Scale-7) is a seven-item self-report instrument that assesses symptoms of generalised anxiety disorder over the past two weeks. It uses the same four-point frequency scale as the PHQ-9. Scores range from 0 to 21, with bands at 0–4 (minimal), 5–9 (mild), 10–14 (moderate), and 15–21 (severe). A cut-point of 10 was validated against structured clinical interview in a study published in 2006.'
    },
    {
      q: 'What is the CES-D?',
      a: 'The CES-D (Center for Epidemiologic Studies Depression Scale) is a 20-item self-report depression scale developed at the National Institute of Mental Health by Lenore Radloff in 1977. It was designed for use in epidemiological research and covers depressed mood, somatic symptoms, positive affect (reverse-scored), and interpersonal problems over the past week. Scores range from 0 to 60. A score of 16 or above is the standard screening threshold.'
    },
    {
      q: 'What is the WHO-5?',
      a: 'The WHO-5 Well-Being Index is a five-item questionnaire developed by the World Health Organization that assesses subjective psychological wellbeing over the past two weeks using positive statements. The raw score (0–25) is multiplied by four to produce a percentage score from 0 to 100. Higher scores indicate better wellbeing. A score below 50 is used as a threshold for further depression assessment, and a score below 28 suggests likely depression.'
    },
    {
      q: 'What is the WSAS?',
      a: 'The Work and Social Adjustment Scale (WSAS) is a five-item instrument that measures functional impairment across five life domains: work, home management, social leisure, private leisure, and close relationships. Each item is rated 0 (not impaired) to 8 (very severely impaired), giving a total range of 0 to 40. It is used alongside symptom-focused screeners to assess whether symptoms are causing meaningful disruption to daily life.'
    },
    {
      q: 'What is the PROMIS Depression Short Form?',
      a: 'The PROMIS Depression Short Form 8a is an eight-item self-report instrument developed by the National Institutes of Health as part of the Patient-Reported Outcomes Measurement Information System. Items are rated on a five-point scale from "never" to "always" over the past seven days. It is calibrated using item response theory, which allows comparison across populations. The raw score ranges from 8 to 40. PROMIS instruments are in the public domain.'
    },
    {
      q: 'Does the site store my answers or personal data?',
      a: "No answers or personal data are sent to any server. If you opt in to saving your history, screener attempts are stored only in your browser's localStorage on your own device. No account, registration, or login is required. The site does not use analytics cookies by default. Google AdSense may set cookies in relation to advertising if ads are shown; see the privacy policy for details."
    },
    {
      q: 'What should I do if I scored high?',
      a: 'A high score is a prompt to seek further evaluation, not a cause for alarm. If you scored 10 or above on the PHQ-9, or in the moderate to severe range on any other instrument, consider speaking with your general practitioner or a mental health professional. They can conduct a thorough assessment, rule out other causes, and discuss appropriate support or treatment options.'
    },
    {
      q: 'What should I do if I am having thoughts of suicide or self-harm?',
      a: 'Please contact a crisis service immediately. In the US, call or text 988. In the UK, call Samaritans on 116 123 (free, available 24 hours). In Canada, call or text 988. In Australia, call Lifeline on 13 11 14. For a full list of international resources, visit phq9.online/crisis or go to findahelpline.com. If you are in immediate danger, call local emergency services (911, 999, 112, or 110 depending on your country).'
    },
    {
      q: 'Can I use the PHQ-9 to monitor my treatment progress?',
      a: 'Yes. One of the most valuable uses of the PHQ-9 is longitudinal monitoring. Repeated assessments at regular intervals allow both individuals and clinicians to track whether symptoms are improving, stable, or worsening over the course of treatment. A reduction of 5 or more points from a baseline score is generally considered clinically meaningful. The history page on this site allows you to save and review past attempts if you opt in.'
    },
    {
      q: 'Are these instruments validated in languages other than English?',
      a: 'Yes. The PHQ-9 has been translated into more than 80 languages and validated in numerous cultural contexts. The GAD-7, WHO-5, and other instruments are also widely translated. While psychometric properties are generally replicated, minor differences in performance across cultures have been identified, particularly for somatic items. The instruments on this site are currently presented in English; localised versions may be added in future updates.'
    },
    {
      q: 'Who should not rely on these screeners?',
      a: 'These screeners are not validated for young children, and specialised instruments are available for adolescents and older adults that may be more appropriate in those age groups. People with significant cognitive impairment or acute psychosis may not be able to complete self-report instruments accurately. The PHQ-9 should not be the sole screening tool when bipolar disorder is a concern, as it does not assess manic or hypomanic symptoms.'
    },
    {
      q: 'How is phq9.online funded?',
      a: 'The site is funded through Google AdSense advertising. Ads may be shown to visitors in accordance with Google\'s advertising policies. The maintainer may also accept direct sponsorships from organisations whose products or services are relevant to the site\'s audience. Instrument selection and content are independent of funding sources; only public-domain, evidence-based instruments are included.'
    },
    {
      q: 'What is the difference between screening and diagnosis?',
      a: 'Screening is a population-level process of identifying individuals who are likely to have a condition and who should receive further clinical evaluation. A screening test is designed to be sensitive — that is, to miss as few true cases as possible — at the cost of some false positives. Diagnosis is a clinical judgment made by a qualified professional after a thorough assessment that takes into account symptom history, duration, functional impact, differential diagnosis, and the patient\'s full medical context. The PHQ-9 and other instruments on this site are screening tools. They can support clinical decision-making but cannot replace it.'
    },
    {
      q: 'Is phq9.online affiliated with Pfizer, Spitzer, Kroenke, or any health authority?',
      a: 'No. phq9.online is an independent website maintained by a private individual (nathanib). It is not affiliated with Pfizer, the instrument authors, the NHS, the WHO, or any government health authority. The instruments are reproduced from public-domain sources. The site does not provide clinical services and has no commercial relationship with any healthcare provider.'
    }
  ];

  const ld = [
    breadcrumbSchema([
      { name: 'Home', url: 'https://phq9.online/' },
      { name: 'FAQ', url }
    ]),
    faqPageSchema(faq)
  ];
</script>

<svelte:head>
  <title>FAQ — phq9.online</title>
  <meta
    name="description"
    content="Frequently asked questions about the PHQ-9, GAD-7, CES-D, WHO-5, WSAS, PROMIS Depression, scoring, privacy, and how to use phq9.online."
  />
  <link rel="canonical" href={url} />
  <meta property="og:title" content="FAQ — phq9.online" />
  <meta
    property="og:description"
    content="Frequently asked questions about the PHQ-9, GAD-7, CES-D, WHO-5, WSAS, PROMIS Depression, scoring, privacy, and how to use phq9.online."
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
  <h1>Frequently Asked Questions</h1>

  <section>
    <h2>What is the PHQ-9?</h2>
    <p>
      The PHQ-9 (Patient Health Questionnaire-9) is a validated nine-item self-report screening
      instrument used to detect and measure the severity of depressive symptoms. It was developed
      by Drs. Robert Spitzer, Janet Williams, and Kurt Kroenke as part of the PRIME-MD project
      and first validated in a study of 6,000 primary care patients published in 2001. The
      instrument is in the public domain and is used worldwide in clinical, research, and
      population health settings.
    </p>
  </section>

  <section>
    <h2>Is the PHQ-9 free to use?</h2>
    <p>
      Yes. The PHQ-9 is in the public domain. It was originally developed with support from an
      educational grant from Pfizer Inc., but Pfizer waived all rights to the instrument. It can
      be reproduced, translated, and used without permission or payment. The other instruments on
      this site — the PHQ-2, GAD-7, CES-D, PROMIS Depression, WSAS, and WHO-5 — are also in the
      public domain.
    </p>
  </section>

  <section>
    <h2>Is this a diagnosis?</h2>
    <p>
      No. A score from any instrument on this site is not a diagnosis. These are screening tools
      designed to identify people who may benefit from further clinical evaluation. A high score
      indicates that your pattern of responses resembles that of people who were subsequently
      found to have the condition by a structured clinical interview, but only a qualified
      clinician who has conducted a full assessment can provide a diagnosis.
    </p>
  </section>

  <section>
    <h2>How accurate is the PHQ-9?</h2>
    <p>
      At the standard cut-point of 10 or greater, the PHQ-9 has demonstrated sensitivity of
      approximately 88% and specificity of approximately 88% for major depressive disorder in
      primary care settings, based on the original 2001 validation study of 6,000 patients. A
      2010 meta-analysis across 38 independent studies confirmed these estimates, reporting pooled
      sensitivity of 88% (95% CI 83–92%) and specificity of 85% (95% CI 82–88%).
    </p>
  </section>

  <section>
    <h2>What does my score mean?</h2>
    <p>
      PHQ-9 scores fall into five bands: 0–4 (minimal or no depression), 5–9 (mild), 10–14
      (moderate), 15–19 (moderately severe), and 20–27 (severe). Scores should be interpreted
      alongside your clinical context. A score at any level does not automatically require a
      specific action, but a score of 10 or above generally warrants a conversation with a
      healthcare professional. See the full <a href="/interpretation">interpretation guide</a>.
    </p>
  </section>

  <section>
    <h2>What is the GAD-7?</h2>
    <p>
      The GAD-7 (Generalised Anxiety Disorder Scale-7) is a seven-item self-report instrument
      that assesses symptoms of generalised anxiety disorder over the past two weeks. It uses the
      same four-point frequency scale as the PHQ-9. Scores range from 0 to 21, with bands at 0–4
      (minimal), 5–9 (mild), 10–14 (moderate), and 15–21 (severe). A cut-point of 10 was
      validated against structured clinical interview in a study published in 2006
      (doi:10.1001/archinte.166.10.1092).
    </p>
  </section>

  <section>
    <h2>What is the CES-D?</h2>
    <p>
      The CES-D (Center for Epidemiologic Studies Depression Scale) is a 20-item self-report
      depression scale developed at the National Institute of Mental Health by Lenore Radloff in
      1977. It was designed for use in epidemiological research and covers depressed mood, somatic
      symptoms, positive affect (reverse-scored), and interpersonal problems over the past week.
      Scores range from 0 to 60. A score of 16 or above is the standard screening threshold.
    </p>
  </section>

  <section>
    <h2>What is the WHO-5?</h2>
    <p>
      The WHO-5 Well-Being Index is a five-item questionnaire developed by the World Health
      Organization that assesses subjective psychological wellbeing over the past two weeks using
      positive statements. The raw score (0–25) is multiplied by four to produce a percentage
      score from 0 to 100. Higher scores indicate better wellbeing. A score below 50 is used as a
      threshold for further depression assessment, and a score below 28 suggests likely depression.
    </p>
  </section>

  <section>
    <h2>What is the WSAS?</h2>
    <p>
      The Work and Social Adjustment Scale (WSAS) is a five-item instrument that measures
      functional impairment across five life domains: work, home management, social leisure,
      private leisure, and close relationships. Each item is rated 0 (not impaired) to 8 (very
      severely impaired), giving a total range of 0 to 40. It is used alongside symptom-focused
      screeners to assess whether symptoms are causing meaningful disruption to daily life.
    </p>
  </section>

  <section>
    <h2>What is the PROMIS Depression Short Form?</h2>
    <p>
      The PROMIS Depression Short Form 8a is an eight-item self-report instrument developed by
      the National Institutes of Health as part of the Patient-Reported Outcomes Measurement
      Information System. Items are rated on a five-point scale from "never" to "always" over the
      past seven days. It is calibrated using item response theory, which allows comparison across
      populations. The raw score ranges from 8 to 40. PROMIS instruments are in the public domain.
    </p>
  </section>

  <section>
    <h2>Does the site store my answers or personal data?</h2>
    <p>
      No answers or personal data are sent to any server. If you opt in to saving your history,
      screener attempts are stored only in your browser's localStorage on your own device. No
      account, registration, or login is required. The site does not use analytics cookies by
      default. Google AdSense may set cookies in relation to advertising if ads are shown; see the
      <a href="/privacy">privacy policy</a> for full details on how data is handled.
      LocalStorage data can be exported or deleted at any time from the history page.
    </p>
  </section>

  <section>
    <h2>What should I do if I scored high?</h2>
    <p>
      A high score is a prompt to seek further evaluation, not a cause for alarm. If you scored
      10 or above on the PHQ-9, or in the moderate to severe range on any other instrument,
      consider speaking with your general practitioner or a mental health professional. They can
      conduct a thorough assessment, rule out other medical or situational causes, and discuss
      appropriate support or evidence-based treatment options including psychological therapy and,
      where indicated, medication. You do not need to wait until symptoms become severe before
      seeking help. Earlier evaluation generally leads to better outcomes.
    </p>
  </section>

  <section>
    <h2>What should I do if I am having thoughts of suicide or self-harm?</h2>
    <p>
      Please contact a crisis service immediately. In the US, call or text 988. In the UK, call
      Samaritans on 116 123 (free, available 24 hours). In Canada, call or text 988. In
      Australia, call Lifeline on 13 11 14. In Germany, call TelefonSeelsorge on 0800 111 0 111.
      In France, call 3114. In Iceland, call Pieta on 1717. For a full list of international
      resources, visit the <a href="/crisis">crisis resources</a> page or go to
      <a href="https://findahelpline.com" rel="noopener noreferrer" target="_blank">findahelpline.com</a>.
      If you are in immediate danger, call local emergency services (911, 999, 112, or 110
      depending on your country).
    </p>
  </section>

  <section>
    <h2>Can I use the PHQ-9 to monitor my treatment progress?</h2>
    <p>
      Yes. One of the most valuable uses of the PHQ-9 is longitudinal monitoring. Repeated
      assessments at regular intervals — for example, monthly or at each clinical appointment —
      allow both individuals and clinicians to track whether symptoms are improving, stable, or
      worsening over the course of treatment. A reduction of 5 or more points from a baseline
      score is generally considered a clinically meaningful improvement. Response is typically
      defined as a 50% reduction in score, and remission as a score below 5. The
      <a href="/history">history page</a> on this site allows you to save and review past
      attempts if you opt in to local history storage.
    </p>
  </section>

  <section>
    <h2>Are these instruments validated in languages other than English?</h2>
    <p>
      Yes. The PHQ-9 has been translated into more than 80 languages and validated in numerous
      cultural contexts including Spanish, Mandarin, Arabic, Hindi, and Portuguese. The GAD-7,
      WHO-5, and other instruments on this site are also widely translated and validated
      internationally. While psychometric properties are generally replicated, minor differences
      in performance across cultures have been identified, particularly for somatic symptom items
      such as sleep and appetite. The instruments on this site are currently presented in English;
      localised versions may be added in future updates.
    </p>
  </section>

  <section>
    <h2>Who should not rely on these screeners?</h2>
    <p>
      These screeners are not validated for young children, and specialised instruments are
      available for adolescents and older adults that may be more appropriate in those age groups.
      The Geriatric Depression Scale (GDS) and the Edinburgh Postnatal Depression Scale (EPDS)
      are examples of instruments adapted for specific populations. People with significant
      cognitive impairment or acute psychosis may not be able to complete self-report instruments
      accurately. The PHQ-9 should not be the sole screening tool when bipolar disorder is a
      concern, as it does not assess manic or hypomanic symptoms. Anyone using a screener in a
      clinical context should consult current professional guidelines for their specific population.
    </p>
  </section>

  <section>
    <h2>How is phq9.online funded?</h2>
    <p>
      The site is funded through Google AdSense advertising. Ads may be shown to visitors in
      accordance with Google's advertising policies. The maintainer may also accept direct
      sponsorships from organisations whose products or services are relevant to the site's
      audience. Instrument selection and content are independent of funding sources; only
      public-domain, evidence-based instruments are included. The site's source code is
      open and available for review.
    </p>
  </section>

  <section>
    <h2>What is the difference between screening and diagnosis?</h2>
    <p>
      Screening is a population-level process of identifying individuals who are likely to have
      a condition and who should receive further clinical evaluation. A screening test is
      designed to be sensitive — that is, to miss as few true cases as possible — at the cost
      of some false positives. Diagnosis, in contrast, is a clinical judgment made by a qualified
      professional after a thorough assessment that takes into account symptom history, duration,
      functional impact, differential diagnosis, and the patient's full medical context. The
      PHQ-9 and other instruments on this site are screening tools. They can support clinical
      decision-making but cannot replace it.
    </p>
  </section>

  <section>
    <h2>Is phq9.online affiliated with Pfizer, Spitzer, Kroenke, or any health authority?</h2>
    <p>
      No. phq9.online is an independent website maintained by a private individual (nathanib).
      It is not affiliated with Pfizer, the instrument authors, the NHS, the WHO, or any
      government health authority. The instruments are reproduced from public-domain sources.
      The site does not provide clinical services and has no commercial relationship with any
      healthcare provider. For the full source code, see
      <a href="https://github.com/Evoke4350/phq9-online" rel="noopener noreferrer" target="_blank">github.com/Evoke4350/phq9-online</a>.
    </p>
  </section>
</article>
