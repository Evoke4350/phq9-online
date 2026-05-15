<script lang="ts">
  import ScreenerLanding from '$lib/components/ScreenerLanding.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import { promisDepression } from '$lib/screeners/promis-depression';
</script>

<Hero
  title="Modern psychometrics, free."
  subtitle="PROMIS Depression 8a is an 8-item NIH-developed measure with modern IRT calibration."
  ctaLabel="Start the test"
  ctaHref="#quiz"
  tiles={[
    { value: '8', label: 'questions' },
    { value: '~2 min', label: 'to complete' },
    { value: 'Since 2011', label: 'validated' }
  ]}
/>

<div id="quiz"></div>

<ScreenerLanding
  config={promisDepression}
  ogTitle="PROMIS Depression Short Form 8a"
  ogDescription="Modern 8-item NIH PROMIS depression measure. Item response theory calibrated, used in clinical research."
  url="https://phq9.online/promis-depression"
  breadcrumbs={[
    { name: 'Home', url: 'https://phq9.online/' },
    { name: 'PROMIS Depression', url: 'https://phq9.online/promis-depression' }
  ]}
>
  <section class="prose mt-12 max-w-prose">
    <h2>What Is the PROMIS Depression Short Form 8a?</h2>
    <p>
      The Patient-Reported Outcomes Measurement Information System (PROMIS) Depression Short Form
      8a is an eight-item self-report measure developed by the National Institutes of Health (NIH)
      to assess the frequency of depressive symptoms including sadness, loss of interest, feelings
      of worthlessness, and hopelessness over the preceding seven days. Unlike traditional
      depression scales that were developed through factor analysis of existing item pools, the
      PROMIS Depression measure was built using a modern psychometric framework called item
      response theory (IRT), which allows precise calibration of each item's difficulty and
      discrimination properties across the full severity continuum.
    </p>
    <p>
      The eight items in the Short Form 8a were selected from a much larger calibrated item bank
      to provide efficient, high-precision measurement of depression severity for both research
      and clinical monitoring purposes. The measure uses a five-point frequency scale ranging from
      "never" to "always." Because the items are IRT-calibrated, the Short Form 8a can be directly
      compared to results from the full computerised adaptive testing (CAT) version, enabling
      flexible deployment across different study designs and clinical contexts.
    </p>

    <h2>History and Development</h2>
    <p>
      The PROMIS initiative was launched by the NIH in 2004 as a large-scale effort to develop a
      rigorously standardised system of patient-reported outcome measures for use across clinical
      research and healthcare. The goal was to create measures with superior psychometric
      properties compared to the heterogeneous collection of legacy instruments that had
      accumulated across different disease areas and research traditions, making cross-study
      comparisons difficult.
    </p>
    <p>
      The PROMIS Depression item bank was developed and validated by Paul A. Pilkonis and
      colleagues at the University of Pittsburgh and across multiple PROMIS network sites.
      The landmark publication describing the Depression, Anxiety, and Anger item banks was
      published in Assessment in 2011 (doi:10.1177/1073191111411667). Item development involved
      systematic literature review, expert consultation, cognitive interviewing with patients,
      and large-scale calibration studies. The final calibrated items are available through the
      HealthMeasures platform maintained by the Northwestern University Feinberg School of Medicine.
    </p>
    <p>
      The PROMIS system is entirely in the public domain, developed with federal funding, and is
      freely available for use in research and clinical practice without licensing fees or
      permission requirements.
    </p>

    <h2>Item Response Theory and What Makes PROMIS Different</h2>
    <p>
      Traditional depression scales use classical test theory, treating all items as contributing
      equally to the total score. Item response theory takes a fundamentally different approach:
      each item in the PROMIS calibration is characterised by its location on the underlying
      severity continuum (how severe depression must be for the item to be relevant) and its
      discrimination (how sharply the item distinguishes between adjacent severity levels). This
      means that different subsets of items can be used in different settings while still producing
      scores that are directly comparable on a common metric.
    </p>
    <p>
      The Short Form 8a represents a fixed selection of eight items chosen to provide balanced
      coverage across the severity continuum. In settings where computerised adaptive testing
      infrastructure is available, the PROMIS CAT selects items dynamically for each patient
      based on their previous responses, achieving similar measurement precision with fewer items.
      The fixed short forms were developed to provide an IRT-based alternative in settings where
      adaptive testing is not feasible.
    </p>

    <h2>Scoring and Interpretation</h2>
    <p>
      Each of the eight items is rated on a five-point scale: 1 (never), 2 (rarely), 3 (sometimes),
      4 (often), 5 (always). Raw scores range from 8 to 40. In research and clinical applications,
      raw scores are typically converted to T-scores using the PROMIS scoring tables derived from
      the IRT calibration. The T-score metric is scaled to a mean of 50 and standard deviation of
      10 in the US general population, meaning a T-score of 50 represents average depressive
      symptom severity in the population.
    </p>
    <p>
      For the Short Form 8a used as a standalone screening tool without T-score conversion,
      raw score bands have been established in clinical studies. Scores in the lower range (8–11)
      indicate minimal depressive symptoms comparable to the general population average. Scores
      of 12–18 suggest mild symptoms, 19–26 moderate symptoms, and 27 and above indicate severe
      depressive symptomatology. These bands are approximate, and clinical interpretation should
      consider the full clinical context.
    </p>

    <h2>Populations and Validation</h2>
    <p>
      The PROMIS Depression measure has been validated across a wide range of clinical and community
      populations including adults with chronic conditions such as diabetes, heart disease, cancer,
      and HIV; adults in primary care; older adults; and community samples from diverse ethnic and
      socioeconomic backgrounds. Cross-cultural validation has demonstrated good measurement
      invariance across racial and ethnic groups in the United States, and translations have been
      validated in multiple languages including Spanish.
    </p>
    <p>
      The measure has also been used in paediatric research, with a separate PROMIS Pediatric
      Depression measure available for children aged 8 and above. In oncology research, PROMIS
      has become increasingly standard because of its ability to compare outcomes across different
      cancer types and treatment regimens on a common scale.
    </p>

    <h2>Strengths</h2>
    <p>
      The principal advantage of PROMIS Depression over legacy scales is the rigorous IRT-based
      development that ensures each item contributes meaningfully and in a characterised way to
      the total measurement. The T-score metric allows direct comparison of scores across studies
      and populations, which is particularly valuable for multi-site clinical trials and systematic
      reviews. Because the item bank is large and calibrated, researchers can administer different
      subsets of items across different timepoints or settings and still pool results with
      confidence.
    </p>
    <p>
      PROMIS measures have also been designed to be efficient: the eight-item short form achieves
      good precision in approximately two to three minutes, comparable to longer classical test
      instruments. The common metric across PROMIS health domains (depression, anxiety, fatigue,
      pain, physical function, and others) enables profiling of multiple domains simultaneously
      without the ceiling and floor effects that affect many legacy scales in the mild and severe
      ranges.
    </p>

    <h2>Limitations</h2>
    <p>
      The PROMIS scoring system, particularly T-score conversion, requires access to scoring
      tables or software, which adds a technical step compared to the simple sum scores of the
      PHQ-9 or GAD-7. For routine clinical use without research infrastructure, this can be a
      practical barrier. The one-week recall window differs from the two-week windows of the
      PHQ-9 and GAD-7, which means direct numerical comparison between measures requires caution.
    </p>
    <p>
      PROMIS was calibrated primarily in English-speaking US populations, and while cross-cultural
      validation studies have been conducted, the normative T-score framework may not be equally
      applicable in non-US populations where the general population distribution of depressive
      symptoms differs from US norms. Users in other countries should be aware that a T-score
      of 50 reflects the US average, not a local population average.
    </p>

    <h2>Relationship to Other Instruments</h2>
    <p>
      PROMIS Depression and the PHQ-9 measure related but not identical constructs: the PHQ-9
      is aligned to DSM diagnostic criteria with a two-week recall window, while PROMIS Depression
      focuses on symptom frequency with a one-week window and uses IRT-calibrated items rather
      than a simple frequency count. Both are suitable for monitoring treatment response over time.
      Crosswalk tables exist that allow approximate conversion between PROMIS T-scores and PHQ-9
      scores, enabling researchers to compare results across studies using different instruments.
    </p>

    <h2>When to Discuss Results With a Clinician</h2>
    <p>
      A Short Form 8a raw score of 19 or above, or a T-score of approximately 60 or above,
      suggests moderate-to-severe depressive symptomatology and warrants discussion with a
      healthcare professional. As with all self-report measures, the score should be considered
      in the context of duration, functional impact, and any safety concerns. If you are
      experiencing thoughts of self-harm, contact a clinician or crisis service immediately.
    </p>

    <h3>This Tool Is Screening, Not Diagnosis</h3>
    <p>
      The PROMIS Depression Short Form 8a is a validated self-report measure developed by the NIH.
      Scores indicate symptom frequency and severity but cannot establish a clinical diagnosis of
      major depressive disorder or any other condition. A comprehensive clinical assessment by
      a qualified mental health professional is required for diagnosis and treatment planning.
    </p>
  </section>
</ScreenerLanding>
