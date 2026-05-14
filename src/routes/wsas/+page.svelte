<script lang="ts">
  import ScreenerLanding from '$lib/components/ScreenerLanding.svelte';
  import { wsas } from '$lib/screeners/wsas';
</script>

<ScreenerLanding
  config={wsas}
  ogTitle="WSAS — Work and Social Adjustment Scale"
  ogDescription="5-item measure of functional impairment by Mundt 2002. NHS IAPT minimum dataset, complements depression and anxiety scales."
  url="https://phq9.online/wsas"
  breadcrumbs={[
    { name: 'Home', url: 'https://phq9.online/' },
    { name: 'WSAS', url: 'https://phq9.online/wsas' }
  ]}
>
  <section class="prose mt-12 max-w-prose">
    <h2>What Is the WSAS?</h2>
    <p>
      The Work and Social Adjustment Scale (WSAS) is a five-item self-report measure that
      quantifies the degree to which a psychological problem is interfering with a person's
      ability to function across five key life domains: ability to work, ability to manage home,
      social leisure activities, private leisure activities, and close relationships. Each item
      is rated on a nine-point scale from 0 (no impairment at all) to 8 (very severely impairs
      and I have stopped doing this because of my problem). The WSAS was designed not to measure
      symptom severity directly but to capture the functional consequences of any psychological
      condition, making it agnostic to the specific diagnosis or symptom type.
    </p>
    <p>
      This symptom-agnostic design is one of the WSAS's most important features. Because it
      measures functional disability rather than specific symptoms, it can be paired with any
      disease-specific measure — depression, anxiety, OCD, PTSD, or others — to provide a
      complementary picture of how much the condition is actually affecting daily life. A high
      PHQ-9 score paired with a high WSAS score indicates both significant symptoms and significant
      impairment; a high PHQ-9 paired with a low WSAS may indicate that, despite depressive
      symptoms, the person is maintaining everyday function and the urgency for intervention
      may differ.
    </p>

    <h2>History and Development</h2>
    <p>
      The WSAS was developed by James C. Mundt, Isaac M. Marks, M. Katherine Shear, and John H.
      Greist and was first described in a paper published in the British Journal of Psychiatry in
      2002 (doi:10.1192/bjp.180.5.461). The scale's origins trace back to work by Isaac Marks
      at the Maudsley Hospital in London, where simple functional impairment ratings were used
      clinically to complement symptom measures in anxiety and phobia research from the 1970s
      onwards. The WSAS formalized and extended these clinical ratings into a validated
      psychometric instrument.
    </p>
    <p>
      The 2002 validation study demonstrated that the WSAS was sensitive to treatment change
      and that it discriminated meaningfully between levels of symptomatic severity across
      different anxiety and depressive disorders. The instrument was deliberately kept brief —
      five items rated on a nine-point scale — to maximise compliance and minimise respondent
      burden in both research and routine clinical monitoring contexts.
    </p>
    <p>
      The WSAS is in the public domain and may be freely used, copied, and translated. It is
      included in the NHS IAPT minimum dataset in England, meaning it is collected for every
      patient at every session in all IAPT services alongside the PHQ-9 and GAD-7.
    </p>

    <h2>Psychometric Properties</h2>
    <p>
      The original validation by Mundt et al. reported high internal consistency, with Cronbach's
      alpha of 0.89 across multiple diagnostic groups including depression, panic disorder,
      agoraphobia, OCD, and social phobia. The WSAS demonstrated good convergent validity,
      correlating strongly with global clinician-rated functional assessments and with the
      severity of primary symptom measures across different conditions.
    </p>
    <p>
      The instrument showed good sensitivity to change over the course of treatment. In studies
      of cognitive behavioural therapy and pharmacotherapy for anxiety and depression, WSAS scores
      declined significantly in parallel with symptom improvement, providing evidence that the
      scale measures a construct related to but distinct from symptom severity itself — namely,
      the functional consequences of those symptoms in everyday life.
    </p>
    <p>
      Test-retest reliability has been reported at approximately 0.73 in stable patients, which
      is adequate for a measure intended to capture change over time. The scale has demonstrated
      discriminant validity between diagnostic groups of different severity levels.
    </p>

    <h2>Scoring and Interpretation</h2>
    <p>
      Each of the five items is rated on a scale from 0 to 8, giving a total score range of 0 to
      40. Higher scores indicate greater functional impairment. The scoring conventions established
      in the literature are:
    </p>
    <ul>
      <li><strong>0–9:</strong> Subclinical impairment. Functional disruption at this level is unlikely to represent a clinically significant condition, though monitoring is appropriate if symptoms are new or worsening.</li>
      <li><strong>10–19:</strong> Significant functional impairment, typically associated with a diagnosable psychiatric condition causing moderate disruption to daily life. Treatment is usually appropriate.</li>
      <li><strong>20–40:</strong> Severe functional impairment. Scores in this range are associated with severe psychiatric disorder and indicate a substantial impact on the ability to work, maintain relationships, and participate in ordinary social activities.</li>
    </ul>
    <p>
      In NHS IAPT recovery criteria, functional recovery is defined as a WSAS score below 10
      at the end of treatment. This dual requirement — achieving both symptom recovery (PHQ-9
      below 10 and GAD-7 below 8) and functional recovery (WSAS below 10) — represents a more
      demanding and arguably more clinically meaningful definition of treatment success than
      symptom scores alone.
    </p>

    <h2>The Relationship Between Functional Impairment and Symptom Severity</h2>
    <p>
      An important insight from WSAS research is that symptom severity and functional impairment,
      while correlated, are not the same thing. Two people with identical PHQ-9 scores of 15 may
      have WSAS scores that differ by 20 points, depending on their coping resources, social
      support, nature of their employment, and other contextual factors. This dissociation means
      that treatment outcomes should ideally be assessed on both dimensions independently.
    </p>
    <p>
      Some patients achieve substantial symptomatic improvement (large PHQ-9 reductions) with
      modest functional gains, while others show the opposite pattern. Understanding these
      trajectories is clinically informative and helps guide decisions about whether additional
      interventions focused specifically on functional rehabilitation — such as supported
      employment, occupational therapy, or graded activity programmes — may be warranted beyond
      symptom-focused psychological therapy.
    </p>

    <h2>NHS IAPT and Routine Outcome Monitoring</h2>
    <p>
      The inclusion of the WSAS in the NHS IAPT minimum dataset reflects a policy decision to
      measure treatment success beyond symptom reduction alone. IAPT services in England collect
      PHQ-9, GAD-7, and WSAS scores at every appointment for every patient, generating one of
      the most comprehensive routine outcome monitoring datasets in the world. Published IAPT
      annual reports use these data to report on recovery rates, reliable improvement rates, and
      deterioration rates at service and national level, enabling benchmarking and quality
      improvement across hundreds of individual services.
    </p>

    <h2>Strengths</h2>
    <p>
      The WSAS is extremely brief, requiring approximately one to two minutes to complete, yet it
      captures five distinct life domains that are meaningful to patients and clinicians. Its
      symptom-agnostic design means it can be used across diagnostic categories without modification,
      making it valuable in routine care settings where patients present with heterogeneous
      conditions. The nine-point response format provides more granularity than four-point scales,
      which may improve sensitivity to change over time.
    </p>

    <h2>Limitations</h2>
    <p>
      Item 1 (work) may be difficult to interpret for people who are retired, unemployed, or
      unable to work for reasons unrelated to their mental health. In these cases, respondents
      are typically instructed to rate how their problem affects their ability to do housework or
      other regular activities in place of paid employment. This adaptation is not always clearly
      explained in standard administration, which can introduce ambiguity.
    </p>
    <p>
      The WSAS does not specify what "the problem" is, which means respondents must hold in mind
      the correct referent condition when rating each item. In patients with multiple comorbidities,
      it may be unclear whether they are rating impairment due to depression, anxiety, physical
      illness, or some combination, which can complicate interpretation.
    </p>

    <h2>When to Discuss Results With a Clinician</h2>
    <p>
      A WSAS score of 10 or above suggests that a psychological condition is causing significant
      interference with everyday functioning and warrants discussion with a healthcare professional.
      Even lower scores are informative context for understanding the impact of any symptoms you
      are experiencing. Discussing your WSAS score alongside your PHQ-9 and GAD-7 results gives
      your clinician a more complete picture of both your symptom burden and its real-world
      consequences.
    </p>

    <h3>This Tool Is Screening, Not Diagnosis</h3>
    <p>
      The WSAS is a validated measure of functional impairment. It does not assess symptoms or
      diagnose any mental health condition. A high WSAS score indicates that something is
      significantly affecting your day-to-day functioning and that a clinical evaluation is
      warranted to identify the cause and discuss appropriate support.
    </p>
  </section>
</ScreenerLanding>
