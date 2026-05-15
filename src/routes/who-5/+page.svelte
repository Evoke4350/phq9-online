<script lang="ts">
  import ScreenerLanding from '$lib/components/ScreenerLanding.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import { who5 } from '$lib/screeners/who-5';
</script>

<Hero
  title="How is your wellbeing?"
  subtitle="The WHO-5 Well-Being Index measures positive wellbeing across 5 items, on a 0-100 scale."
  ctaLabel="Start the test"
  ctaHref="#quiz"
  tiles={[
    { value: '5', label: 'questions' },
    { value: '~1 min', label: 'to complete' },
    { value: 'Since 1998', label: 'validated' }
  ]}
/>

<div id="quiz"></div>

<ScreenerLanding
  config={who5}
  ogTitle="WHO-5 Well-Being Index"
  ogDescription="5-item positive-framing wellbeing measure from the World Health Organization (1998). Used in primary care across UK, Iceland, Canada, EU."
  url="https://phq9.online/who-5"
  breadcrumbs={[
    { name: 'Home', url: 'https://phq9.online/' },
    { name: 'WHO-5', url: 'https://phq9.online/who-5' }
  ]}
>
  <section class="prose mt-12 max-w-prose">
    <h2>What Is the WHO-5 Well-Being Index?</h2>
    <p>
      The World Health Organization-Five Well-Being Index (WHO-5) is a five-item self-report
      questionnaire that measures subjective psychological wellbeing over the preceding two weeks.
      Unlike the PHQ-9 or GAD-7, which ask about the presence and frequency of negative symptoms,
      the WHO-5 is framed entirely in positive terms: respondents rate how often they have felt
      cheerful and in good spirits, calm and relaxed, active and vigorous, woke up feeling fresh
      and rested, and found their daily life filled with things of interest. This positive framing
      makes the WHO-5 one of the few widely validated measures of wellbeing rather than
      ill-being, placing it at a distinct point on the mental health assessment landscape.
    </p>
    <p>
      The WHO-5 has been used as a screening instrument for depression, as a measure of general
      psychological wellbeing, as an outcome measure in clinical trials and public health
      interventions, and as a population monitoring tool in national health surveys. Its brevity,
      positive framing, and free availability have contributed to widespread adoption across primary
      care systems in Europe, North America, and Asia-Pacific.
    </p>

    <h2>History and Development</h2>
    <p>
      The WHO-5 was developed by the World Health Organization Regional Office for Europe. The
      current 1998 version was adapted from the WHO-10 Well-Being Index, which itself was derived
      from the WHO-BREF quality of life assessment. The five-item version was designed to retain
      the psychometric properties of the longer instrument while reducing respondent burden to the
      minimum practical for routine primary care screening.
    </p>
    <p>
      The WHO-5 was recommended by the WHO Regional Office for Europe as a screening instrument
      for depression in primary care settings. It gained particular prominence as part of the
      WHO's Audit Project Odense (APO) — a multicentre quality improvement programme in European
      primary care — and through its use in large population surveys in Denmark, Iceland, the
      United Kingdom, and other European countries. The Danish Psychiatric Centre in Copenhagen
      maintains an official WHO-5 resource website and has coordinated many of the translation
      and validation efforts.
    </p>
    <p>
      The WHO-5 is available free of charge for use in research and clinical practice, with the
      stipulation that attribution to the World Health Organization is provided.
    </p>

    <h2>The 0 to 100 Scale</h2>
    <p>
      Each of the five items is rated on a six-point scale: 0 (at no time), 1 (some of the time),
      2 (less than half of the time), 3 (more than half of the time), 4 (most of the time), 5
      (all of the time). The raw scores for each item are summed to produce a raw total between
      0 and 25. This raw score is then multiplied by 4 to produce a percentage score on a 0 to
      100 scale, where 0 represents the worst imaginable wellbeing (having experienced no positive
      feelings at all during the past two weeks) and 100 represents the best imaginable wellbeing
      (having experienced all positive feelings all of the time throughout the past two weeks).
    </p>
    <p>
      This 0-to-100 transformation makes the score intuitively interpretable and facilitates
      communication with patients. A score of 50, for example, represents a person who experienced
      positive wellbeing about half of the time, which provides a readily understandable reference
      point. The percentage format also makes it straightforward to track change over time and
      communicate progress in therapeutic settings.
    </p>

    <h2>Interpretation and Severity Bands</h2>
    <p>
      The primary clinical cut-point for the WHO-5 as a depression screening tool is a score
      below 50, which indicates reduced wellbeing and warrants further evaluation. A score of 28
      or below (raw score of 7 or below) suggests a likelihood of depression and is recommended
      as a threshold for proceeding to a more detailed assessment such as the PHQ-9.
    </p>
    <ul>
      <li><strong>0–28:</strong> Very low wellbeing. Suggests a likelihood of clinical depression or significant distress. Further evaluation with a validated depression scale and clinical assessment is recommended.</li>
      <li><strong>29–50:</strong> Reduced wellbeing. Below the threshold that suggests probable depression, but indicates that positive experiences are relatively infrequent. Monitoring and discussion with a clinician may be appropriate depending on context and trend.</li>
      <li><strong>51–100:</strong> Normal to high wellbeing. Scores in this range indicate that positive wellbeing is experienced more often than not. High scores do not rule out specific mental health conditions, but suggest that overall subjective wellbeing is relatively preserved.</li>
    </ul>

    <h2>Psychometric Properties</h2>
    <p>
      The WHO-5 has been extensively evaluated across dozens of studies. A systematic review and
      meta-analysis published by Topp and colleagues in 2015 pooled results across studies and
      reported that using a cut-point of 50 or below, the WHO-5 had a sensitivity of approximately
      0.85 and specificity of approximately 0.73 for major depressive disorder. These properties
      are broadly comparable to other brief depression screens, though the WHO-5's positive framing
      means it captures a somewhat different aspect of the mood disturbance than symptom-focused
      instruments.
    </p>
    <p>
      Internal consistency (Cronbach's alpha) is typically reported between 0.82 and 0.89. The
      factor structure is consistently unidimensional, meaning all five items tap a single latent
      dimension of wellbeing rather than distinct subscales. This unidimensional structure supports
      the use of the total score as a summary measure without subscale scoring.
    </p>

    <h2>Positive Framing and Its Implications</h2>
    <p>
      The entirely positive framing of the WHO-5 items is both a strength and a distinctive feature
      that differentiates it from other instruments. Positive wellbeing and the absence of
      depressive symptoms are related but not identical constructs. A person may have low WHO-5
      scores (infrequent positive experiences) without meeting criteria for major depression, or
      may score moderately on the WHO-5 while still experiencing significant depressive symptoms
      on the PHQ-9. This conceptual distinction is consistent with the two-continua model of
      mental health, which holds that mental illness and mental wellbeing are not opposite ends
      of a single spectrum but partially independent dimensions.
    </p>
    <p>
      For clinical purposes, this means the WHO-5 adds information beyond symptom scales: it
      captures the presence of positive experience, which is itself therapeutically meaningful.
      Treatment goals in positive psychology interventions, wellbeing therapy, and some CBT
      approaches include not just the reduction of negative symptoms but the cultivation of
      positive experiences, and the WHO-5 can track progress on this dimension specifically.
    </p>

    <h2>Population Use and Cross-Cultural Validation</h2>
    <p>
      The WHO-5 has been translated into over 30 languages and validated in primary care and
      community populations across Europe, North America, Africa, and Asia. It is widely used
      in European national health surveys, including in Denmark, Iceland, and Germany, where it
      is part of routine population monitoring. In the United Kingdom, it has been used in general
      practice quality improvement initiatives and patient experience surveys. In diabetes care,
      the WHO-5 has become particularly established as a monitoring tool, with the WHO recommending
      its use for detecting emotional problems in people with diabetes.
    </p>
    <p>
      Cross-cultural validation has generally supported measurement invariance across diverse
      populations, although some studies have found differential item functioning on specific
      items in non-European samples, suggesting that local normative data and cultural adaptation
      may improve interpretation in some contexts.
    </p>

    <h2>Strengths</h2>
    <p>
      The WHO-5 is extremely brief, requiring approximately one minute to complete, and its
      positive framing is generally experienced as less distressing to answer than symptom-focused
      questionnaires. For patients who are reluctant to describe negative symptoms in detail,
      starting with a positive-framing instrument can lower barriers to initial engagement with
      mental health screening. The instrument is well validated and internationally recognised,
      and its free availability under WHO attribution makes it accessible without licensing
      constraints.
    </p>
    <p>
      The 0-to-100 scoring range provides a psychologically intuitive metric that patients and
      clinicians can engage with directly. The ability to track change on this percentage scale
      over time — across appointments, treatment phases, or life circumstances — adds longitudinal
      utility beyond its screening function.
    </p>

    <h2>Limitations</h2>
    <p>
      Because the WHO-5 measures positive wellbeing rather than specific depressive symptoms,
      it has somewhat lower specificity for major depressive disorder than the PHQ-9 when used
      as a standalone depression screen. A low WHO-5 score indicates reduced wellbeing but does
      not specify the cause: physical illness, life adversity, situational stress, and depressive
      disorder can all produce low WHO-5 scores. This breadth is a feature for general wellbeing
      monitoring but a limitation for differential diagnosis.
    </p>
    <p>
      The WHO-5 does not include items assessing suicidality, hopelessness, or functional
      impairment, which are important clinical dimensions. It should not be used as a sole
      assessment tool in settings where safety assessment is a primary concern.
    </p>

    <h2>Relationship to Other Instruments</h2>
    <p>
      The WHO-5 is most naturally used as a complement to symptom-focused instruments rather than
      as a replacement. Pairing the WHO-5 with the PHQ-9 provides a picture of both negative
      symptoms (PHQ-9) and positive wellbeing (WHO-5), capturing a fuller dimensional profile of
      mental health. The WHO-5 can also be paired with the WSAS to add information about functional
      consequences. In primary care settings where time is short, the WHO-5 provides a quick,
      non-stigmatising entry point into mental health monitoring that can be followed up with more
      detailed screening when scores are low.
    </p>

    <h2>When to Discuss Results With a Clinician</h2>
    <p>
      A WHO-5 score below 50 warrants a conversation with a healthcare professional, particularly
      if the low score has been persistent over several assessments or is accompanied by other
      concerns. A score below 28 specifically suggests that further evaluation for depression is
      warranted. If you are experiencing persistent low mood, loss of interest, or any thoughts
      of self-harm, please discuss this with a clinician regardless of your WHO-5 score.
    </p>

    <h3>This Tool Is Screening, Not Diagnosis</h3>
    <p>
      The WHO-5 Well-Being Index is a validated measure of subjective psychological wellbeing.
      A low score indicates reduced wellbeing and may suggest the presence of depression or
      another condition warranting further evaluation, but it does not constitute a clinical
      diagnosis. Only a qualified clinician can assess your mental health comprehensively and
      advise on appropriate support or treatment.
    </p>
  </section>
</ScreenerLanding>
