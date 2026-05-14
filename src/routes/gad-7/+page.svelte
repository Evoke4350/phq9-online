<script lang="ts">
  import ScreenerLanding from '$lib/components/ScreenerLanding.svelte';
  import { gad7 } from '$lib/screeners/gad-7';
</script>

<ScreenerLanding
  config={gad7}
  ogTitle="GAD-7 — Generalized Anxiety Test"
  ogDescription="7-item validated anxiety screening tool by Spitzer 2006. Standard NHS/CANMAT instrument paired with PHQ-9."
  url="https://phq9.online/gad-7"
  breadcrumbs={[
    { name: 'Home', url: 'https://phq9.online/' },
    { name: 'GAD-7', url: 'https://phq9.online/gad-7' }
  ]}
>
  <section class="prose mt-12 max-w-prose">
    <h2>What Is the GAD-7?</h2>
    <p>
      The Generalized Anxiety Disorder scale (GAD-7) is a seven-item self-administered questionnaire
      designed to screen for and measure the severity of generalized anxiety disorder in clinical
      and community settings. It asks respondents to rate how often, over the previous two weeks,
      they have been bothered by seven core anxiety symptoms drawn from the DSM diagnostic criteria
      for generalised anxiety disorder. These symptoms include feeling nervous or on edge, not being
      able to stop or control worrying, worrying too much about different things, trouble relaxing,
      being so restless it is hard to sit still, becoming easily annoyed or irritable, and feeling
      afraid as if something awful might happen.
    </p>
    <p>
      The GAD-7 has become one of the most widely used anxiety measures internationally. It is the
      standard anxiety screening instrument in NHS Improving Access to Psychological Therapies
      (IAPT) services in England, is included in CANMAT clinical guidelines in Canada, and is
      routinely used in research studies, large epidemiological surveys, and primary care quality
      improvement programmes.
    </p>

    <h2>History and Development</h2>
    <p>
      The GAD-7 was developed by Robert L. Spitzer, Kurt Kroenke, Janet B. W. Williams, and Bernd
      Löwe, and was first described in a paper published in Archives of Internal Medicine in 2006
      (doi:10.1001/archinte.166.10.1092). The development followed the same approach as the PHQ-9:
      items were drawn from the DSM criteria for generalised anxiety disorder, the scale was
      self-administered, and validation was conducted in large primary care samples. The instrument
      was developed with support from Pfizer Inc. as part of the broader Patient Health
      Questionnaire programme and is available in the public domain without restriction.
    </p>
    <p>
      The timing of the GAD-7 publication came at a point when clinicians had growing awareness of
      anxiety disorders as a major contributor to primary care consultations but lacked a brief,
      validated measure that could complement the PHQ-9 in routine screening. The two instruments
      were designed to work together, and their shared response format and scoring approach make
      them practical to administer as a pair.
    </p>

    <h2>Psychometric Properties</h2>
    <p>
      The 2006 validation study enrolled 2,740 patients across 15 primary care clinics and compared
      GAD-7 scores to structured clinical interviews. Using a cut-point of 10 or greater for
      generalised anxiety disorder, the GAD-7 demonstrated a sensitivity of 89% and a specificity
      of 82%. Subsequent studies have reported slightly varying figures depending on population
      and reference standard, with sensitivity typically ranging from 80% to 92% and specificity
      from 76% to 88% across different settings and cut-points.
    </p>
    <p>
      Internal consistency is high, with Cronbach's alpha consistently above 0.89 in validation
      studies. Test-retest reliability in stable patients has been reported at 0.83. The GAD-7 also
      shows good convergent validity with established anxiety measures including the Beck Anxiety
      Inventory, the Hospital Anxiety and Depression Scale anxiety subscale, and the State-Trait
      Anxiety Inventory.
    </p>
    <p>
      An important feature of the GAD-7 is that while it was designed for generalised anxiety
      disorder, research has shown it also screens reasonably well for other anxiety disorders
      including panic disorder, social anxiety disorder, and post-traumatic stress disorder. This
      broad sensitivity to anxiety psychopathology, rather than specificity for GAD alone, makes it
      useful as a general anxiety indicator in primary care settings.
    </p>

    <h2>Scoring and Severity Bands</h2>
    <p>
      Each of the seven items is rated 0 (not at all), 1 (several days), 2 (more than half the
      days), or 3 (nearly every day). The total score ranges from 0 to 21. The four severity bands
      established in the original validation are as follows:
    </p>
    <ul>
      <li><strong>0–4:</strong> Minimal anxiety. Symptoms at this level are unlikely to represent a clinical anxiety disorder. Monitoring is appropriate if symptoms are new or worsening.</li>
      <li><strong>5–9:</strong> Mild anxiety. Watchful waiting is appropriate. Consider lifestyle factors and psychoeducation. Reassess in four to six weeks.</li>
      <li><strong>10–14:</strong> Moderate anxiety. Further evaluation and consideration of treatment with psychological therapy or pharmacotherapy is recommended.</li>
      <li><strong>15–21:</strong> Severe anxiety. Active treatment is indicated. Referral to a mental health specialist should be strongly considered.</li>
    </ul>

    <h2>Anxiety and Depression Comorbidity</h2>
    <p>
      Anxiety and depression are the two most commonly co-occurring mental health conditions.
      Population-based studies consistently find that 40% to 60% of individuals with major
      depressive disorder also meet criteria for an anxiety disorder, and vice versa. This high
      comorbidity rate is one of the primary reasons the GAD-7 is routinely administered alongside
      the PHQ-9: a person presenting with a PHQ-9 score of 10 or above may have a concurrent
      anxiety disorder that shapes the clinical presentation, affects prognosis, and has
      implications for treatment selection.
    </p>
    <p>
      When both conditions are present, treatment complexity increases. Cognitive behavioural
      therapy protocols need to address both presentations, and some antidepressant medications
      are more effective than others when anxiety is prominent. Having quantitative scores on both
      dimensions at baseline also enables tracking of both symptom clusters over time as treatment
      progresses.
    </p>

    <h2>NHS IAPT Use</h2>
    <p>
      In England, the NHS IAPT programme mandates the PHQ-9 and GAD-7 as the minimum data set for
      all adult patients entering psychological therapy services. Both measures are administered
      at every session, allowing clinicians and service managers to monitor symptom trajectories
      across the full episode of care. This has generated one of the largest real-world datasets
      of anxiety and depression outcomes in existence, providing evidence that brief psychological
      therapies are effective at population scale. Recovery is defined in IAPT as moving from above
      to below the clinical threshold on both measures simultaneously.
    </p>

    <h2>Strengths</h2>
    <p>
      The GAD-7 is brief, free to use, and well validated across a wide range of populations and
      settings. Its scoring is transparent and easily explained to patients. The shared format with
      the PHQ-9 minimises the cognitive switch required when answering both questionnaires in
      sequence, which reduces respondent burden. The instrument is available in numerous validated
      translations and has been used successfully in non-English-speaking populations across Europe,
      Asia, Latin America, and Africa.
    </p>

    <h2>Limitations</h2>
    <p>
      The GAD-7 was developed and validated specifically for generalised anxiety disorder and
      cannot diagnose or distinguish between specific anxiety disorders such as social anxiety
      disorder, panic disorder, agoraphobia, or specific phobias. A high score indicates probable
      clinically significant anxiety but does not specify the subtype or aetiology. Some items,
      particularly those about irritability and restlessness, can be elevated in conditions other
      than anxiety, including hyperthyroidism, stimulant use, mania, and attention deficit
      hyperactivity disorder, which may produce false positives in some populations.
    </p>
    <p>
      The instrument also relies on self-report over a two-week recall window, which introduces
      recall bias. Patients in acute distress may report more symptoms than would be captured over
      a structured clinical interview, while patients minimising their difficulties may underreport.
    </p>

    <h2>Relationship to Other Instruments</h2>
    <p>
      The GAD-7 is most commonly paired with the PHQ-9 in clinical practice and research. For
      functional impairment, the Work and Social Adjustment Scale (WSAS) is a validated complement
      that quantifies how anxiety or depression affects everyday activities. For patients in whom
      panic disorder is specifically suspected, the PHQ-Panic module provides additional screening
      specificity. In research contexts, the GAD-7 is frequently used alongside longer measures
      such as the Penn State Worry Questionnaire for discriminant validity studies.
    </p>

    <h2>When to Discuss Results With a Clinician</h2>
    <p>
      A GAD-7 score of 10 or above warrants a conversation with a general practitioner or mental
      health professional. Lower scores that are still causing distress or functional difficulty
      also warrant discussion. Anxiety disorders are among the most treatable of mental health
      conditions, and effective psychological therapies — particularly cognitive behavioural therapy
      — are available through NHS IAPT and similar services internationally without requiring a
      psychiatrist referral in most healthcare systems.
    </p>

    <h3>This Tool Is Screening, Not Diagnosis</h3>
    <p>
      The GAD-7 is a validated self-report screening instrument designed to support clinical
      decision-making. A score above the threshold suggests that further evaluation is warranted;
      it cannot, on its own, establish a clinical diagnosis of generalised anxiety disorder or any
      other condition. Diagnosis requires a comprehensive assessment by a qualified clinician.
    </p>
  </section>
</ScreenerLanding>
