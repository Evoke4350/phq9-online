<script lang="ts">
  import ScreenerLanding from '$lib/components/ScreenerLanding.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import { cesd } from '$lib/screeners/ces-d';
</script>

<Hero
  title="An NIH classic, still useful."
  subtitle="The CES-D is a 20-item depression scale from the National Institute of Mental Health, used in research and clinical practice since 1977."
  ctaLabel="Start the test"
  ctaHref="#quiz"
  tiles={[
    { value: '20', label: 'questions' },
    { value: '~5 min', label: 'to complete' },
    { value: 'Since 1977', label: 'validated' }
  ]}
/>

<div id="quiz"></div>

<ScreenerLanding
  config={cesd}
  ogTitle="CES-D — Center for Epidemiologic Studies Depression Scale"
  ogDescription="Classic 20-item NIH-developed depression scale (Radloff 1977). Widely used in epidemiological research."
  url="https://phq9.online/ces-d"
  breadcrumbs={[
    { name: 'Home', url: 'https://phq9.online/' },
    { name: 'CES-D', url: 'https://phq9.online/ces-d' }
  ]}
>
  <section class="prose mt-12 max-w-prose">
    <h2>What Is the CES-D?</h2>
    <p>
      The Center for Epidemiologic Studies Depression Scale (CES-D) is a 20-item self-report
      questionnaire originally designed for use in large-scale epidemiological research on
      depression in the general population. Unlike the PHQ-9, which was developed primarily
      for clinical screening in primary care, the CES-D was developed with the explicit aim of
      measuring the prevalence and distribution of depressive symptoms across community samples.
      It asks respondents to rate how frequently they experienced each of twenty symptoms during
      the past week, using a four-point frequency scale ranging from rarely or none of the time
      (less than one day) to most or all of the time (five to seven days).
    </p>
    <p>
      The CES-D captures six major symptom groups: depressed affect, positive affect, somatic and
      retarded activity, interpersonal difficulties, and two additional positive-framing items. Its
      20-item breadth gives it greater coverage of the depression symptom spectrum than shorter
      instruments, making it sensitive to subclinical levels of distress as well as more severe
      presentations. This breadth has made it one of the most cited depression scales in the
      epidemiological literature.
    </p>

    <h2>History and Development</h2>
    <p>
      The CES-D was developed by Lenore Sawyer Radloff at the Center for Epidemiologic Studies,
      National Institute of Mental Health (NIMH), United States. It was first described in a paper
      published in Applied Psychological Measurement in 1977 (doi:10.1177/014662167700100306).
      Radloff assembled the scale by drawing items from previously validated depression measures
      including the Beck Depression Inventory, the Zung Self-Rating Depression Scale, the MMPI
      Depression Scale, and the Raskin Depression Rating Scale. Items were selected to represent
      the major components of the depressive syndrome that could be assessed through self-report
      and that were appropriate for community use.
    </p>
    <p>
      The instrument was designed as a public domain tool to facilitate large-scale community
      surveys without the licensing barriers that might restrict epidemiological research. Its
      development was funded through NIMH and it remains freely available. The original 1977
      paper reported results from two community surveys and a sample of psychiatric patients,
      establishing the basic psychometric properties and scoring conventions that are still in
      use today.
    </p>

    <h2>Psychometric Properties</h2>
    <p>
      The original validation reported by Radloff found internal consistency (Cronbach's alpha)
      of 0.85 in community samples and 0.90 in a psychiatric patient sample. Test-retest
      reliability over one year was approximately 0.59, reflecting both genuine symptom change
      over time and some measurement instability. Subsequent studies have consistently reported
      alpha values in the range of 0.84 to 0.90 across diverse samples.
    </p>
    <p>
      Using the conventional cut-point of 16 or greater, the CES-D has demonstrated sensitivity
      of approximately 86% and specificity of approximately 74% for major depressive disorder in
      studies using structured diagnostic interviews as the reference standard. These figures vary
      across populations and reference criteria; some studies using DSM-IV structured interviews
      report somewhat different operating characteristics. The CES-D is generally considered to
      have good sensitivity (able to detect most true cases) with somewhat lower specificity
      compared to instruments developed specifically for clinical diagnosis.
    </p>
    <p>
      Factor analyses of the CES-D have typically identified four factors: depressed affect,
      positive affect, somatic complaints, and interpersonal difficulties. The positive affect
      subscale items, which are reverse-scored, contribute to the instrument's ability to
      distinguish depression from the absence of positive wellbeing — a distinction that has
      theoretical and clinical significance.
    </p>

    <h2>Scoring and Interpretation</h2>
    <p>
      The CES-D uses a four-point response scale. For most items, responses are scored 0 (rarely
      or none of the time), 1 (some or a little of the time), 2 (occasionally or a moderate amount
      of time), or 3 (most or all of the time). Four items — numbers 4, 8, 12, and 16 in the
      original numbering — are phrased positively and are reverse scored: a response of "most or
      all of the time" on a positive item scores 0, not 3. This reverse-scoring design serves as
      a check on response acquiescence bias and adds a positive wellbeing dimension.
    </p>
    <p>
      Scores are summed to produce a total between 0 and 60. The most widely used cut-point for
      identifying probable depression is 16 or above. Scores of 0 to 15 are generally considered
      to indicate minimal depressive symptoms, while scores of 16 and above suggest significant
      depressive symptomatology warranting further evaluation. Some researchers have proposed a
      higher threshold of 23 or 27 for identifying cases more consistent with major depressive
      disorder specifically.
    </p>

    <h2>Population and Research Use</h2>
    <p>
      The CES-D has been used in hundreds of epidemiological studies worldwide, including landmark
      projects such as the Epidemiologic Catchment Area (ECA) surveys, the Baltimore Longitudinal
      Study of Aging, and numerous national health surveys. It has been validated in adolescents,
      elderly adults, cancer patients, HIV-positive individuals, and diverse cultural and linguistic
      groups across North America, Europe, Asia, and Africa.
    </p>
    <p>
      The scale's suitability for community surveys stems from its relative brevity combined with
      its breadth of symptom coverage. It was specifically designed to measure the full spectrum
      of depressive symptoms rather than only those meeting clinical thresholds, allowing
      researchers to study depression as a continuously distributed dimension in the general
      population rather than a binary present-or-absent condition.
    </p>

    <h2>Strengths</h2>
    <p>
      The CES-D is one of the most extensively validated depression measures in existence, with
      decades of research establishing its performance across extremely diverse populations and
      contexts. Its public domain status has made it a standard tool in global health research.
      The inclusion of positively worded reverse-scored items provides a more nuanced picture of
      mood state than scales measuring only negative symptoms, and its 20-item breadth offers
      greater coverage of the symptom spectrum than shorter instruments.
    </p>
    <p>
      For longitudinal research, the CES-D has an established track record spanning over four
      decades, allowing direct comparison of findings across studies. Its use in aging research
      is particularly well established, and age-adjusted norms are available for older adult
      populations.
    </p>

    <h2>Limitations</h2>
    <p>
      The CES-D is longer than most clinical screening tools, requiring approximately five to ten
      minutes to complete. Its one-week recall window differs from the two-week window of the
      PHQ-9, which can complicate direct comparison between the instruments. The scale was not
      designed for clinical diagnosis and cannot substitute for a structured clinical interview.
    </p>
    <p>
      The four reverse-scored items require careful attention during administration, particularly
      in settings where respondents may not read instructions closely. Misunderstanding of the
      reversed response format is a known source of scoring error in self-administered surveys.
      Additionally, the somatic items (sleep, appetite, energy) can be confounded by physical
      illness, particularly in medically ill older adults, inflating CES-D scores in those
      populations.
    </p>

    <h2>Relationship to Other Instruments</h2>
    <p>
      In clinical settings, the PHQ-9 is generally preferred over the CES-D because of its direct
      mapping to DSM diagnostic criteria and its more established primary care validation.
      The CES-D remains the preferred instrument for epidemiological and longitudinal population
      research, particularly in aging studies. The two instruments measure overlapping constructs
      but are not interchangeable; studies comparing them in the same samples find moderate to
      strong correlation but systematic differences at the item level. For wellbeing measurement
      complementing the CES-D's depression focus, the WHO-5 Well-Being Index provides a
      positively framed perspective.
    </p>

    <h2>When to Discuss Results With a Clinician</h2>
    <p>
      A CES-D score of 16 or above warrants discussion with a healthcare professional for further
      evaluation. Even scores below 16 that are accompanied by persistent distress, functional
      difficulty, or safety concerns should prompt a clinical consultation. The CES-D score is
      a starting point for conversation, not a definitive assessment.
    </p>

    <h3>This Tool Is Screening, Not Diagnosis</h3>
    <p>
      The CES-D is a validated research and screening instrument. A score above the threshold
      indicates a higher likelihood of clinically significant depressive symptoms and suggests
      that further professional evaluation is appropriate. It does not constitute a clinical
      diagnosis of major depressive disorder or any other condition.
    </p>
  </section>
</ScreenerLanding>
