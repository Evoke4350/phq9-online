<script lang="ts">
  import { medicalWebPageSchema, breadcrumbSchema } from '$lib/schema';

  const url = 'https://phq9.online/about-phq9';
  const ld = [
    breadcrumbSchema([
      { name: 'Home', url: 'https://phq9.online/' },
      { name: 'About the PHQ-9', url }
    ]),
    medicalWebPageSchema({
      url,
      name: 'About the PHQ-9 Depression Screening Questionnaire',
      description:
        'A comprehensive reference covering the history, development, psychometric properties, scoring, cross-cultural validation, and clinical use of the PHQ-9 depression screener.',
      lastReviewed: '2025-01-01'
    })
  ];
</script>

<svelte:head>
  <title>About the PHQ-9 — phq9.online</title>
  <meta
    name="description"
    content="Comprehensive reference on the PHQ-9: history, validation, scoring bands, cross-cultural use, comparison with other depression scales, and primary literature citations."
  />
  <link rel="canonical" href={url} />
  <meta property="og:title" content="About the PHQ-9 — phq9.online" />
  <meta
    property="og:description"
    content="Comprehensive reference on the PHQ-9: history, validation, scoring bands, cross-cultural use, comparison with other depression scales, and primary literature citations."
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
  <h1>About the PHQ-9</h1>

  <p>
    The Patient Health Questionnaire-9 (PHQ-9) is a nine-item self-administered screening
    instrument designed to detect and quantify the severity of depressive symptoms in primary care
    and community settings. It asks respondents to rate the frequency of nine core symptoms of
    major depressive disorder over the preceding two weeks, using a four-point scale that ranges
    from "not at all" (0) to "nearly every day" (3). The nine items map directly onto the
    diagnostic criteria for major depressive disorder set out in the Diagnostic and Statistical
    Manual of Mental Disorders, making the PHQ-9 one of the most criterion-aligned screening
    instruments available.
  </p>
  <p>
    Because it is brief, freely reproducible, and validated across thousands of patients, the
    PHQ-9 has become one of the most widely deployed depression screeners in the world. It is used
    routinely in primary care offices, mental health clinics, hospital outpatient departments,
    research studies, and large national health programmes, including NHS Improving Access to
    Psychological Therapies (IAPT) in England and the Canadian Network for Mood and Anxiety
    Treatments (CANMAT) clinical guidelines.
  </p>

  <h2>History and Development</h2>
  <p>
    The PHQ-9 was developed by Drs. Robert L. Spitzer, Janet B. W. Williams, and Kurt Kroenke as
    part of the Primary Care Evaluation of Mental Disorders (PRIME-MD) project, which began in
    the early 1990s. PRIME-MD was a clinician-administered structured interview published in 1994
    that systematically screened for several common mental disorders in primary care settings. The
    self-report version — the Patient Health Questionnaire (PHQ) — was created to reduce
    clinician burden while preserving diagnostic accuracy. The PHQ-9 represents the depression
    module of that broader questionnaire.
  </p>
  <p>
    The landmark validation study was published by Kroenke, Spitzer, and Williams in the
    <em>Journal of General Internal Medicine</em> in 2001
    (doi:<a href="https://doi.org/10.1046/j.1525-1497.2001.016009606.x" rel="noopener noreferrer" target="_blank">10.1046/j.1525-1497.2001.016009606.x</a>).
    That study enrolled 6,000 patients across eight primary care clinics in the United States and
    compared PHQ-9 scores to independent structured psychiatric interviews conducted by mental
    health professionals. The PHQ-9 was developed with support from an educational grant provided
    by Pfizer Inc. The instrument itself is in the public domain and may be reproduced freely
    without permission.
  </p>
  <p>
    A subsequent study by Kroenke, Spitzer, Williams, and Löwe published in 2010 in
    <em>General Hospital Psychiatry</em>
    (doi:<a href="https://doi.org/10.1016/j.genhosppsych.2009.12.003" rel="noopener noreferrer" target="_blank">10.1016/j.genhosppsych.2009.12.003</a>)
    provided an updated meta-analytic review of the PHQ-9's accuracy across 38 validation
    studies, further cementing its status as the reference standard for self-report depression
    screening in primary care.
  </p>

  <h2>Psychometric Properties</h2>
  <p>
    The 2001 validation study found that a PHQ-9 score of 10 or greater had a sensitivity of 88%
    and a specificity of 88% for detecting major depressive disorder, as determined by structured
    clinical interview. The 2010 meta-analysis across 38 studies confirmed these estimates,
    reporting a pooled sensitivity of 88% (95% CI 83–92%) and specificity of 85% (95% CI 82–88%)
    at the standard cut-point of 10, across more than 8,000 participants.
  </p>
  <p>
    Internal consistency is high: Cronbach's alpha is typically reported between 0.86 and 0.89
    across different populations. Test-retest reliability is strong, with intraclass correlation
    coefficients around 0.84 in stable patients over a one-week interval. The PHQ-9 shows good
    convergent validity, correlating significantly with the Beck Depression Inventory (BDI-II),
    the Hamilton Rating Scale for Depression (HDRS-17), and the Montgomery-Asberg Depression
    Rating Scale (MADRS).
  </p>
  <p>
    Factor analyses generally support a single general depression factor, although some studies
    have identified a two-factor structure distinguishing somatic/neurovegetative symptoms
    (sleep, appetite, fatigue) from cognitive/affective symptoms (hopelessness, concentration,
    suicidal ideation). For most clinical screening purposes the unidimensional total score is
    sufficient.
  </p>

  <h2>Scoring and Severity Bands</h2>
  <p>
    Each of the nine items is scored 0 (not at all), 1 (several days), 2 (more than half the
    days), or 3 (nearly every day). The total score ranges from 0 to 27. The five severity bands
    established in the original validation and widely reproduced in clinical guidelines are as
    follows:
  </p>
  <ul>
    <li>
      <strong>0–4: Minimal or no depression.</strong> No specific intervention is typically
      indicated. Continued monitoring is reasonable if the patient has a history of depression or
      reports symptoms that are worsening.
    </li>
    <li>
      <strong>5–9: Mild depression.</strong> Watchful waiting, patient education about depression,
      and rescreening in four to six weeks are appropriate responses. Lifestyle factors including
      physical activity, sleep hygiene, and social support are worth discussing.
    </li>
    <li>
      <strong>10–14: Moderate depression.</strong> A treatment plan should be considered. Options
      include counselling, structured psychological therapy (such as cognitive-behavioural therapy),
      pharmacotherapy, or a combination. Referral to a mental health professional is appropriate.
    </li>
    <li>
      <strong>15–19: Moderately severe depression.</strong> Active treatment is indicated. Close
      clinical follow-up and referral to a mental health specialist are strongly recommended.
      Safety assessment is important.
    </li>
    <li>
      <strong>20–27: Severe depression.</strong> Immediate referral to a mental health specialist
      is warranted. More intensive interventions, including consideration of hospital assessment if
      safety is a concern, should be discussed.
    </li>
  </ul>
  <p>
    Alternative cut-points have been proposed for specific populations. A cut-point of 8 improves
    sensitivity in perinatal populations, while a cut-point of 11 or 12 may reduce false positives
    in medically ill patients with prominent somatic symptoms. Clinicians should exercise judgment
    when applying standard thresholds in these contexts.
  </p>

  <h2>Item 10 — Functional Impairment</h2>
  <p>
    The original PHQ questionnaire includes a tenth item asking how much the problems described in
    items 1 through 9 have made it difficult to do work, take care of things at home, or get along
    with other people. This item is scored separately and is not included in the 0–27 total. A
    positive functional impairment item alongside a PHQ-9 score of 5 or greater strengthens the
    clinical case for intervention. For a more detailed multi-domain assessment of functional
    impact, the Work and Social Adjustment Scale (WSAS) provides a validated five-item alternative
    covering work, home management, social leisure, private leisure, and relationships.
  </p>

  <h2>Cross-Cultural Validation</h2>
  <p>
    The PHQ-9 has been translated into more than 80 languages and validated in diverse cultural
    and linguistic contexts including Spanish, Mandarin, Arabic, Hindi, Portuguese, Swahili, and
    many others. A 2012 systematic review by Manea, Gilbody, and McMillan identified 29
    independent validation studies and found that the standard cut-point of 10 performed
    reasonably well across cultures, with sensitivity ranging from 74% to 100% and specificity
    from 60% to 96% depending on the population and reference standard.
  </p>
  <p>
    Some studies have identified minor differential item functioning across cultures, particularly
    for somatic items such as sleep disruption, fatigue, and appetite change, which may carry
    different cultural salience. Clinicians should apply contextually sensitive interpretation when
    using the PHQ-9 with populations whose cultural and linguistic background differs substantially
    from the original English-speaking US samples in which the tool was validated.
  </p>
  <p>
    Validated adapted versions exist for specific groups: the Edinburgh Postnatal Depression
    Scale (EPDS) is often preferred for perinatal populations, and the Geriatric Depression Scale
    (GDS) addresses specific characteristics of late-life depression. However, the PHQ-9 itself
    has shown acceptable performance in both older adults and perinatal women and remains widely
    used in those groups.
  </p>

  <h2>Comparison with Other Depression Scales</h2>
  <p>
    Several validated self-report depression instruments exist alongside the PHQ-9. Understanding
    their differences helps clinicians choose the most appropriate tool.
  </p>
  <ul>
    <li>
      <strong>PHQ-2:</strong> A two-item ultra-brief screen using items 1 and 2 of the PHQ-9
      (anhedonia and depressed mood). At a cut-point of 3 or greater, sensitivity is approximately
      83% and specificity is 92% for major depressive disorder (Kroenke, Spitzer, Williams, 2003,
      doi:<a href="https://doi.org/10.1097/01.MLR.0000093487.78664.3C" rel="noopener noreferrer" target="_blank">10.1097/01.MLR.0000093487.78664.3C</a>).
      The PHQ-2 is suitable as an initial gateway screen; a positive result warrants full PHQ-9
      administration.
    </li>
    <li>
      <strong>CES-D (Center for Epidemiologic Studies Depression Scale):</strong> A 20-item
      instrument developed by Radloff at the National Institute of Mental Health in 1977, designed
      for use in epidemiological research. It covers depressed mood, somatic symptoms, positive
      affect (reverse-scored), and interpersonal problems. The CES-D is sensitive to subclinical
      depressive symptoms and is well validated in community samples, but its length makes it less
      practical for routine clinical screening than the PHQ-9.
    </li>
    <li>
      <strong>Beck Depression Inventory-II (BDI-II):</strong> A 21-item self-report instrument
      that is widely used in clinical and research settings. The BDI-II has strong psychometric
      properties and good sensitivity to treatment change, but it is a proprietary instrument
      requiring purchase of a licence.
    </li>
    <li>
      <strong>Hamilton Rating Scale for Depression (HDRS/HAM-D):</strong> A clinician-administered
      instrument, not self-report. The 17-item version is the reference standard for measuring
      treatment response in clinical trials. It requires trained administration and is not
      practical for routine screening.
    </li>
    <li>
      <strong>WHO-5 Wellbeing Index:</strong> A five-item questionnaire assessing subjective
      wellbeing rather than discrete depressive symptoms. Scores below 50 (on a 0–100 scale) are
      used as a threshold for further assessment. The WHO-5 is particularly useful for monitoring
      general wellbeing over time and has been proposed as an initial screen for depression in
      diabetes care guidelines.
    </li>
    <li>
      <strong>PROMIS Depression (Short Form 8a):</strong> An eight-item instrument developed by
      the National Institutes of Health as part of the Patient-Reported Outcomes Measurement
      Information System. It uses item response theory calibration and T-scores rather than raw
      sum scores, enabling comparison across populations. The PROMIS Depression bank is in the
      public domain and is increasingly used in research and integrated health systems.
    </li>
  </ul>
  <p>
    The PHQ-9 compares favourably with all of these instruments for primary care screening. Its
    advantages include its brevity (nine items), free public-domain status, direct alignment with
    DSM diagnostic criteria, and a very large validation evidence base.
  </p>

  <h2>Strengths</h2>
  <p>
    The PHQ-9 takes approximately two to three minutes to complete and requires no special
    training to administer or score. Its brevity makes it practical in busy clinical settings and
    for longitudinal monitoring of treatment response. The scoring algorithm is transparent and
    can be explained directly to patients, supporting shared decision-making. Its public-domain
    status removes barriers affecting proprietary instruments such as the BDI-II, and its large
    validation evidence base means clinicians can interpret scores with confidence across a wide
    range of settings and populations.
  </p>

  <h2>Limitations</h2>
  <p>
    The PHQ-9 is a screening tool, not a diagnostic test. A high score does not confirm a
    diagnosis of major depressive disorder, and a low score does not rule one out. The instrument
    cannot distinguish between depressive episodes caused by different aetiologies — bipolar
    depression, adjustment disorder with depressed mood, grief reactions, or medically induced
    mood changes will all produce elevated scores. It does not screen for manic or hypomanic
    episodes and should not be used as the sole instrument when bipolar spectrum disorder is a
    clinical concern.
  </p>
  <p>
    Somatic symptoms such as sleep disruption, fatigue, and appetite change can be elevated in
    people with chronic physical illness or significant pain, which may inflate PHQ-9 scores in
    those populations independently of depressive disorder. Researchers have proposed
    cognitive-affective subscales or adjusted cut-points for use in medically ill patients,
    though these alternatives are not yet universally adopted.
  </p>
  <p>
    Self-report measures are also vulnerable to response biases including social desirability and
    recall limitations. Patients may minimise or amplify symptoms, and a single assessment
    provides only a cross-sectional snapshot. Repeated assessment over time provides more
    clinically meaningful information than any single score.
  </p>

  <h2>What to Do With Your Score</h2>
  <p>
    A score in the minimal range (0–4) is generally reassuring, but is not a guarantee of
    wellbeing. If you have been feeling persistently low or hopeless even with a low score, that
    is worth discussing with a doctor or therapist. A score in the mild range (5–9) suggests it is
    worth monitoring your symptoms and considering lifestyle factors such as sleep, physical
    activity, and social support. A score of 10 or above warrants a conversation with a qualified
    clinician who can properly evaluate your symptoms, rule out other causes, and discuss
    evidence-based treatment options including psychological therapy and medication.
  </p>
  <p>
    If you are having thoughts of self-harm or suicide, please seek help immediately. Visit the
    <a href="/crisis">crisis resources</a> page for helpline numbers in your country.
  </p>

  <h2>Primary References</h2>
  <ul>
    <li>
      Kroenke K, Spitzer RL, Williams JB. The PHQ-9: validity of a brief depression severity
      measure. J Gen Intern Med. 2001;16(9):606-613.
      doi:<a href="https://doi.org/10.1046/j.1525-1497.2001.016009606.x" rel="noopener noreferrer" target="_blank">10.1046/j.1525-1497.2001.016009606.x</a>
    </li>
    <li>
      Spitzer RL, Kroenke K, Williams JB. Validation and utility of a self-report version of
      PRIME-MD: the PHQ primary care study. JAMA. 1999;282(18):1737-1744.
      doi:<a href="https://doi.org/10.1001/jama.282.18.1737" rel="noopener noreferrer" target="_blank">10.1001/jama.282.18.1737</a>
    </li>
    <li>
      Kroenke K, Spitzer RL, Williams JB, Löwe B. The Patient Health Questionnaire somatic,
      anxiety, and depressive symptom scales: a systematic review. Gen Hosp Psychiatry.
      2010;32(4):345-359.
      doi:<a href="https://doi.org/10.1016/j.genhosppsych.2009.12.003" rel="noopener noreferrer" target="_blank">10.1016/j.genhosppsych.2009.12.003</a>
    </li>
    <li>
      Manea L, Gilbody S, McMillan D. Optimal cut-off score for diagnosing depression with the
      Patient Health Questionnaire (PHQ-9): a meta-analysis. CMAJ. 2012;184(3):E191-196.
      doi:<a href="https://doi.org/10.1503/cmaj.110829" rel="noopener noreferrer" target="_blank">10.1503/cmaj.110829</a>
    </li>
    <li>
      Kroenke K, Spitzer RL, Williams JB. The Patient Health Questionnaire-2: validity of a
      two-item depression screener. Med Care. 2003;41(11):1284-1292.
      doi:<a href="https://doi.org/10.1097/01.MLR.0000093487.78664.3C" rel="noopener noreferrer" target="_blank">10.1097/01.MLR.0000093487.78664.3C</a>
    </li>
  </ul>
</article>
