<script lang="ts">
  import ScreenerLanding from '$lib/components/ScreenerLanding.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import { phq2 } from '$lib/screeners/phq-2';
</script>

<Hero
  title="A quick check, in two questions."
  subtitle="The PHQ-2 is the 2-item primary-care screener for depression. Use it as a fast first check before the full PHQ-9."
  ctaLabel="Start the test"
  ctaHref="#quiz"
  tiles={[
    { value: '2', label: 'questions' },
    { value: '< 1 min', label: 'to complete' },
    { value: 'Since 2003', label: 'validated' }
  ]}
/>

<div id="quiz"></div>

<ScreenerLanding
  config={phq2}
  ogTitle="PHQ-2 — 2-Item Depression Quick Screen"
  ogDescription="Two-question primary care depression screen by Kroenke 2003. Quick check before deciding whether to take the full PHQ-9."
  url="https://phq9.online/phq-2"
  breadcrumbs={[
    { name: 'Home', url: 'https://phq9.online/' },
    { name: 'PHQ-2', url: 'https://phq9.online/phq-2' }
  ]}
>
  <section class="prose mt-12 max-w-prose">
    <h2>What Is the PHQ-2?</h2>
    <p>
      The Patient Health Questionnaire-2 (PHQ-2) is a two-item ultra-brief screening instrument
      designed to detect probable depression with minimal patient burden. It asks about the two
      cardinal symptoms of major depressive disorder — depressed mood and anhedonia (loss of
      interest or pleasure) — over the preceding two weeks. Each item is rated on a four-point
      frequency scale identical to the full PHQ-9, giving a total score range of 0 to 6. The
      PHQ-2 functions as a first-stage triage tool: a positive result (typically a score of 3 or
      higher) prompts the clinician or patient to proceed with the full nine-item PHQ-9 to assess
      all symptom dimensions of depression and establish severity.
    </p>
    <p>
      Despite its brevity, the PHQ-2 captures the two symptoms that define a depressive episode
      according to the Diagnostic and Statistical Manual of Mental Disorders. Most clinicians and
      researchers consider that at least one of these two items must be endorsed for a major
      depressive episode to be diagnosed, which means the PHQ-2 has good face validity as a
      gateway screen.
    </p>

    <h2>History and Development</h2>
    <p>
      The PHQ-2 was developed by Kurt Kroenke, Robert L. Spitzer, and Janet B. W. Williams, the
      same team responsible for the broader Patient Health Questionnaire family of screeners. It
      was validated and described in a paper published in the journal Medical Care in 2003
      (doi:10.1097/01.MLR.0000093487.78664.3C). The two items were not newly created for the
      PHQ-2; they are simply the first two questions of the PHQ-9, which themselves correspond to
      the two core criteria for major depressive disorder. The innovation was demonstrating that
      these two items alone, scored together, offered clinically useful screening performance
      comparable to longer instruments when used as an initial triage gate.
    </p>
    <p>
      The PHQ-2 was developed with support from an educational grant by Pfizer Inc. and is
      in the public domain, available for unrestricted use without permission or payment.
    </p>

    <h2>Psychometric Properties</h2>
    <p>
      The 2003 validation study by Kroenke et al. enrolled 6,000 primary care patients and compared
      PHQ-2 scores against structured diagnostic interviews. Using a cut-point of 3 or greater, the
      PHQ-2 achieved a sensitivity of 83% and a specificity of 90% for major depressive disorder.
      Area under the receiver operating characteristic curve was 0.91, indicating excellent overall
      discrimination between those with and without depression. These properties have been replicated
      in independent samples including elderly adults, patients with chronic illness, perinatal
      populations, and adolescents.
    </p>
    <p>
      One consistent finding is that the PHQ-2 has slightly lower sensitivity than the PHQ-9 when
      both are used as standalone tools, which is expected given that it measures fewer symptom
      dimensions. This is why it is recommended as a first-stage screen rather than a complete
      assessment. The two-step approach — PHQ-2 followed by PHQ-9 when positive — preserves both
      sensitivity and efficiency in high-throughput settings such as busy general practice surgeries.
    </p>

    <h2>Scoring and Interpretation</h2>
    <p>
      Each item is scored 0 (not at all), 1 (several days), 2 (more than half the days), or 3
      (nearly every day). Scores are summed to produce a total between 0 and 6. The recommended
      threshold for a positive screen is a total score of 3 or greater. At this threshold, the
      PHQ-2 performs comparably to many longer screens.
    </p>
    <p>
      A score of 0–2 suggests that major depression is unlikely, though it does not exclude
      dysthymia, adjustment disorder, or other mood presentations that manifest more subtly.
      A score of 3–6 indicates a positive screen and should be followed up with the complete PHQ-9
      to determine symptom count, severity, and functional impact. Some guidelines also recommend
      following a positive PHQ-2 with open clinical enquiry about duration, context, and prior
      history before jumping to formal scoring.
    </p>

    <h2>Population and Validation Contexts</h2>
    <p>
      The PHQ-2 has been validated across a wide range of clinical and community populations.
      Studies have confirmed its utility in adult primary care, geriatric medicine, oncology,
      obstetrics (screening for perinatal depression), and adolescent health settings. It has been
      translated into dozens of languages and validated cross-culturally, broadly mirroring the
      reach of the PHQ-9. The brevity of the instrument makes it especially attractive in settings
      where patient literacy or cognitive capacity limits tolerance for longer questionnaires.
    </p>

    <h2>Strengths</h2>
    <p>
      The PHQ-2 can be administered verbally in under thirty seconds, making it practical for
      systematic screening during routine clinical encounters such as annual health checks or
      urgent care visits. It adds negligible burden to workflows where the goal is population-level
      case finding rather than detailed severity measurement. Its tight relationship to the PHQ-9
      means that a positive result naturally leads to a validated instrument that provides all the
      information needed for treatment planning without the patient needing to start over.
    </p>

    <h2>Limitations</h2>
    <p>
      The PHQ-2 cannot determine depression severity, identify specific symptom profiles, or
      provide the granular information needed to guide treatment decisions. A negative PHQ-2 does
      not rule out subsyndromal depression or other mental health conditions, and clinicians should
      not rely solely on a score of 0–2 to dismiss concerns raised by a patient. The instrument
      also cannot assess suicidality; item 9 of the PHQ-9, which asks about thoughts of self-harm,
      is absent from the PHQ-2. In any situation where safety is a concern, a more comprehensive
      assessment is essential regardless of PHQ-2 score.
    </p>
    <p>
      Like the PHQ-9, the PHQ-2 measures frequency of symptoms without addressing their cause.
      Somatic conditions such as hypothyroidism, anaemia, or sleep apnoea can produce depressive
      symptoms that inflate scores. A positive screen always warrants clinical evaluation to
      identify potentially treatable medical causes before attributing symptoms to primary
      depressive disorder.
    </p>

    <h2>Relationship to Other Instruments</h2>
    <p>
      The PHQ-2 is the natural entry point to the PHQ-9 within the Patient Health Questionnaire
      family. In practice, many clinical protocols use the PHQ-2 as a universal screen administered
      to all presenting patients and then deploy the PHQ-9 only to those who score positively,
      conserving clinical time. When anxiety comorbidity is also a concern, the PHQ-9 is
      frequently paired with the GAD-7; this combination is a mandated minimum dataset in NHS
      IAPT services in England. For an assessment of functional impairment, the Work and Social
      Adjustment Scale (WSAS) provides a validated complement.
    </p>

    <h2>When to Discuss Results With a Clinician</h2>
    <p>
      Any PHQ-2 score of 3 or above warrants follow-up with a healthcare professional. Even a
      score of 1 or 2 should prompt a conversation if you have been feeling persistently low,
      if symptoms have been worsening, or if you are concerned about your mental health. Early
      discussion can identify whether a fuller assessment is warranted and whether any immediate
      support would be helpful.
    </p>

    <h3>This Tool Is Screening, Not Diagnosis</h3>
    <p>
      The PHQ-2 is a validated two-item screening instrument. A positive result indicates that
      further evaluation is appropriate; it does not constitute a clinical diagnosis of any mental
      health condition. Only a qualified clinician can diagnose depression after a comprehensive
      assessment that takes into account your full medical and psychological history.
    </p>
  </section>
</ScreenerLanding>
