<script lang="ts">
  import { breadcrumbSchema } from '$lib/schema';

  const url = 'https://phq9.online/scoring';
  const ld = [
    breadcrumbSchema([
      { name: 'Home', url: 'https://phq9.online/' },
      { name: 'Scoring Guide', url }
    ])
  ];
</script>

<svelte:head>
  <title>Scoring Guide — phq9.online</title>
  <meta
    name="description"
    content="How each of the seven screeners on phq9.online is scored, what the bands mean, and how to interpret your total score for the PHQ-9, PHQ-2, GAD-7, CES-D, PROMIS Depression, WSAS, and WHO-5."
  />
  <link rel="canonical" href={url} />
  <meta property="og:title" content="Scoring Guide — phq9.online" />
  <meta
    property="og:description"
    content="How each of the seven screeners on phq9.online is scored, what the bands mean, and how to interpret your total score for the PHQ-9, PHQ-2, GAD-7, CES-D, PROMIS Depression, WSAS, and WHO-5."
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
  <h1>Scoring Guide</h1>

  <p>
    This page explains how each of the seven validated screening instruments available on
    phq9.online is scored, what the score bands mean, and what thresholds are used to distinguish
    severity levels. Scoring is calculated automatically when you complete a screener, but
    understanding the underlying method helps you interpret results in context.
  </p>
  <p>
    All scores generated here are purely for informational purposes. A score is a starting point
    for a conversation with a qualified clinician, not a diagnosis. See the
    <a href="/disclaimer">disclaimer</a> for full details.
  </p>

  <h2>PHQ-9 — Patient Health Questionnaire (9 items)</h2>
  <p>
    The PHQ-9 consists of nine items, each rated on a four-point frequency scale. Responses are
    summed to produce a total score ranging from 0 to 27. Higher scores indicate greater severity.
  </p>
  <ul>
    <li><strong>0:</strong> Not at all</li>
    <li><strong>1:</strong> Several days</li>
    <li><strong>2:</strong> More than half the days</li>
    <li><strong>3:</strong> Nearly every day</li>
  </ul>
  <p>Severity bands (Kroenke, Spitzer, Williams, 2001):</p>
  <ul>
    <li><strong>0–4:</strong> Minimal or no depression</li>
    <li><strong>5–9:</strong> Mild depression</li>
    <li><strong>10–14:</strong> Moderate depression</li>
    <li><strong>15–19:</strong> Moderately severe depression</li>
    <li><strong>20–27:</strong> Severe depression</li>
  </ul>
  <p>
    A score of 10 or greater has demonstrated sensitivity and specificity of approximately 88%
    each for detecting major depressive disorder in primary care settings, based on a study of
    6,000 patients validated against structured psychiatric interviews.
  </p>

  <h2>PHQ-2 — Patient Health Questionnaire (2 items)</h2>
  <p>
    The PHQ-2 uses only the first two items of the PHQ-9 (depressed mood and anhedonia). Each
    item is rated 0 to 3 on the same frequency scale. The total score ranges from 0 to 6.
  </p>
  <ul>
    <li><strong>0–2:</strong> Screen negative — no further action required on the basis of this screen alone</li>
    <li><strong>3–6:</strong> Screen positive — administration of the full PHQ-9 is recommended</li>
  </ul>
  <p>
    At a cut-point of 3, sensitivity is approximately 83% and specificity approximately 92% for
    major depressive disorder (Kroenke, Spitzer, Williams, 2003). The PHQ-2 is intended as an
    ultra-brief gateway screen, not as a standalone assessment. A positive result does not
    indicate a diagnosis; it indicates that a more thorough evaluation is warranted.
  </p>

  <h2>GAD-7 — Generalised Anxiety Disorder Scale (7 items)</h2>
  <p>
    The GAD-7 assesses symptoms of generalised anxiety disorder over the preceding two weeks.
    Each of its seven items is rated 0 to 3 on the same frequency scale as the PHQ-9. The total
    score ranges from 0 to 21.
  </p>
  <ul>
    <li><strong>0–4:</strong> Minimal anxiety</li>
    <li><strong>5–9:</strong> Mild anxiety</li>
    <li><strong>10–14:</strong> Moderate anxiety</li>
    <li><strong>15–21:</strong> Severe anxiety</li>
  </ul>
  <p>
    A cut-point of 10 or greater is recommended for detecting generalised anxiety disorder, with
    sensitivity of 89% and specificity of 82% in the original validation study (Spitzer, Kroenke,
    Williams, Löwe, 2006,
    doi:<a href="https://doi.org/10.1001/archinte.166.10.1092" rel="noopener noreferrer" target="_blank">10.1001/archinte.166.10.1092</a>).
    The GAD-7 is also used as a dimensional measure across anxiety disorders more broadly,
    including panic disorder, social anxiety disorder, and post-traumatic stress disorder.
  </p>

  <h2>CES-D — Center for Epidemiologic Studies Depression Scale (20 items)</h2>
  <p>
    The CES-D was developed at the National Institute of Mental Health for use in epidemiological
    research. It contains 20 items covering depressed mood, somatic symptoms, positive affect, and
    interpersonal problems over the past week. Items are rated on a frequency scale:
  </p>
  <ul>
    <li><strong>0:</strong> Rarely or none of the time (less than 1 day)</li>
    <li><strong>1:</strong> Some or a little of the time (1–2 days)</li>
    <li><strong>2:</strong> Occasionally or a moderate amount of time (3–4 days)</li>
    <li><strong>3:</strong> Most or all of the time (5–7 days)</li>
  </ul>
  <p>
    Four items (numbers 4, 8, 12, and 16 in the original scale) assess positive affect and are
    reverse-scored: a rating of 3 contributes 0 to the sum, and a rating of 0 contributes 3.
    The total score ranges from 0 to 60. Severity bands:
  </p>
  <ul>
    <li><strong>0–15:</strong> Below clinical threshold — screen negative</li>
    <li><strong>16–60:</strong> At or above clinical threshold — screen positive</li>
  </ul>
  <p>
    The standard cut-point of 16 was established in the original validation (Radloff, 1977,
    doi:<a href="https://doi.org/10.1177/014662167700100306" rel="noopener noreferrer" target="_blank">10.1177/014662167700100306</a>).
    The CES-D is particularly sensitive to subclinical depressive symptoms and is used extensively
    in longitudinal community studies.
  </p>

  <h2>PROMIS Depression — NIH PROMIS Short Form 8a (8 items)</h2>
  <p>
    The PROMIS Depression Short Form 8a consists of eight items drawn from the NIH Patient-Reported
    Outcomes Measurement Information System item bank, calibrated using item response theory.
    Each item is rated on a five-point frequency scale over the past seven days:
  </p>
  <ul>
    <li><strong>1:</strong> Never</li>
    <li><strong>2:</strong> Rarely</li>
    <li><strong>3:</strong> Sometimes</li>
    <li><strong>4:</strong> Often</li>
    <li><strong>5:</strong> Always</li>
  </ul>
  <p>
    The raw score (sum of all eight items) ranges from 8 to 40. Severity bands used on
    phq9.online correspond to approximate T-score ranges relative to the US general population
    normative sample (mean T-score of 50, SD of 10):
  </p>
  <ul>
    <li><strong>8–11:</strong> No or minimal symptoms (approximate T-score below 55)</li>
    <li><strong>12–18:</strong> Mild symptoms (approximate T-score 55–65)</li>
    <li><strong>19–26:</strong> Moderate symptoms (approximate T-score 65–75)</li>
    <li><strong>27–40:</strong> Severe symptoms (approximate T-score above 75)</li>
  </ul>
  <p>
    The PROMIS Depression instrument is in the public domain, developed with NIH funding. For
    precise T-score conversion, the HealthMeasures Scoring Service is available at
    <a href="https://www.healthmeasures.net" rel="noopener noreferrer" target="_blank">healthmeasures.net</a>.
    The band labels above are approximations suitable for consumer screening; clinical use should
    reference the full T-score tables.
  </p>

  <h2>WSAS — Work and Social Adjustment Scale (5 items)</h2>
  <p>
    The WSAS measures functional impairment across five life domains: work or ability to work,
    home management, social leisure activities, private leisure activities, and close personal
    relationships. Each domain is rated on a nine-point scale:
  </p>
  <ul>
    <li><strong>0:</strong> Not at all impaired</li>
    <li><strong>8:</strong> Very severely impaired</li>
  </ul>
  <p>
    The total score ranges from 0 to 40. Severity bands (Mundt, Marks, Shear, Greist, 2002,
    doi:<a href="https://doi.org/10.1192/bjp.180.5.461" rel="noopener noreferrer" target="_blank">10.1192/bjp.180.5.461</a>):
  </p>
  <ul>
    <li><strong>0:</strong> No impairment</li>
    <li><strong>1–9:</strong> Subclinical impairment — mild functional limitation that may not require specific intervention</li>
    <li><strong>10–19:</strong> Significant impairment associated with notable distress or disability</li>
    <li><strong>20–40:</strong> Severe impairment — clinical-level functional disability warranting assessment and treatment</li>
  </ul>
  <p>
    The WSAS is often used alongside disorder-specific screeners such as the PHQ-9 or GAD-7 to
    assess whether depressive or anxiety symptoms are associated with meaningful functional
    impairment. It is not itself a diagnostic instrument.
  </p>

  <h2>WHO-5 — WHO Well-Being Index (5 items)</h2>
  <p>
    The WHO-5 assesses subjective psychological wellbeing over the past two weeks using five
    positive statements. Each item is rated on a six-point scale:
  </p>
  <ul>
    <li><strong>0:</strong> At no time</li>
    <li><strong>1:</strong> Some of the time</li>
    <li><strong>2:</strong> Less than half of the time</li>
    <li><strong>3:</strong> More than half of the time</li>
    <li><strong>4:</strong> Most of the time</li>
    <li><strong>5:</strong> All of the time</li>
  </ul>
  <p>
    The raw score (sum of items, 0–25) is multiplied by 4 to produce a percentage score on a
    scale of 0 to 100. Higher scores indicate better wellbeing. Severity bands:
  </p>
  <ul>
    <li><strong>0–28:</strong> Very low wellbeing — likely depression; further assessment is recommended</li>
    <li><strong>29–50:</strong> Low wellbeing — possible depression; monitoring or follow-up is warranted</li>
    <li><strong>51–100:</strong> Normal range wellbeing</li>
  </ul>
  <p>
    A WHO-5 score below 50 is used as a threshold for further assessment in the WHO's own
    guidance and has been incorporated into diabetes care guidelines. The WHO-5 assesses positive
    wellbeing rather than negative symptoms, which makes it complementary to depression-focused
    instruments. It is particularly useful for monitoring improvement over time rather than
    measuring symptom severity in the traditional sense.
  </p>

  <h2>How to Use These Scores</h2>
  <p>
    Scores from any of these instruments should be interpreted in the context of the individual's
    full clinical picture, including medical history, current stressors, functioning, and any
    other information a clinician has gathered. No cut-point is a clinical decision rule. These
    instruments assist in decision-making but do not replace clinical judgment.
  </p>
  <p>
    For guidance on what different severity levels mean clinically and when to seek professional
    support, see the <a href="/interpretation">interpretation guide</a>. For crisis contacts if
    you are in distress now, see the <a href="/crisis">crisis resources</a> page.
  </p>
</article>
