<script lang="ts">
  import ScreenerLanding from '$lib/components/ScreenerLanding.svelte';
  import { phq9 } from '$lib/screeners/phq-9';
</script>

<ScreenerLanding
  config={phq9}
  ogTitle="PHQ-9 Depression Test — Free & Confidential"
  ogDescription="Take the PHQ-9, the validated 9-item depression screening questionnaire used worldwide. Free, instant scoring, no signup, no data leaves your browser."
  url="https://phq9.online/"
  breadcrumbs={[{ name: 'Home', url: 'https://phq9.online/' }]}
>
  <section class="prose mt-12 max-w-prose">
    <h2>What Is the PHQ-9?</h2>
    <p>
      The Patient Health Questionnaire-9 (PHQ-9) is a nine-item self-administered screening tool
      designed to detect and measure the severity of depressive symptoms in primary care and
      community settings. It asks about the frequency of nine core symptoms of major depressive
      disorder over the previous two weeks, using a four-point scale that ranges from "not at all"
      to "nearly every day." The nine items map directly onto the diagnostic criteria for major
      depressive disorder in the Diagnostic and Statistical Manual of Mental Disorders, making the
      PHQ-9 one of the most closely aligned screening instruments available.
    </p>
    <p>
      Because it is brief, self-administered, and free to use, the PHQ-9 has become one of the
      most widely deployed depression screeners in the world. It is used routinely in primary care
      offices, mental health clinics, hospitals, research studies, and large national health
      programmes including NHS Improving Access to Psychological Therapies (IAPT) in England and
      CANMAT guidelines in Canada.
    </p>

    <h2>History and Development</h2>
    <p>
      The PHQ-9 was developed by Drs. Robert L. Spitzer, Janet B. W. Williams, and Kurt Kroenke as
      part of the Primary Care Evaluation of Mental Disorders project (PRIME-MD). PRIME-MD was a
      clinician-administered structured interview published in 1994 that systematically screened for
      several common mental disorders in primary care. The self-report version, the Patient Health
      Questionnaire (PHQ), was developed to reduce clinician burden while preserving diagnostic
      accuracy. The PHQ-9 represents the depression module of that broader questionnaire.
    </p>
    <p>
      The landmark validation study was published by Kroenke, Spitzer, and Williams in the Journal
      of General Internal Medicine in 2001 (doi:10.1046/j.1525-1497.2001.016009606.x). That study
      enrolled 6,000 patients across eight primary care clinics and compared PHQ-9 scores to
      independent structured psychiatric interviews conducted by mental health professionals. The
      PHQ-9 was developed with support from an educational grant provided by Pfizer Inc., but the
      instrument itself is in the public domain and may be reproduced freely without permission.
    </p>

    <h2>Psychometric Properties</h2>
    <p>
      The 2001 validation study found that a PHQ-9 score of 10 or greater had a sensitivity of 88%
      and a specificity of 88% for detecting major depressive disorder, as determined by structured
      interview. These properties have been replicated across dozens of independent studies
      conducted in diverse populations including adolescents, elderly adults, perinatal women,
      primary care patients, and general community samples.
    </p>
    <p>
      Internal consistency is high, with Cronbach's alpha typically reported between 0.86 and 0.89.
      Test-retest reliability is also strong, with intraclass correlation coefficients around 0.84
      in stable patients. The PHQ-9 has demonstrated good convergent validity, correlating
      significantly with the Beck Depression Inventory, the Hamilton Rating Scale for Depression,
      and other established measures.
    </p>

    <h2>Scoring and Severity Bands</h2>
    <p>
      Each of the nine items is scored 0 (not at all), 1 (several days), 2 (more than half the
      days), or 3 (nearly every day). The total score ranges from 0 to 27. The five severity bands
      established in the original validation are as follows:
    </p>
    <ul>
      <li><strong>0–4:</strong> Minimal or no depression. No specific action is typically indicated, but continued monitoring is reasonable if symptoms have been present or worsening.</li>
      <li><strong>5–9:</strong> Mild depression. Watchful waiting and patient education about depression are appropriate. Rescreening in four to six weeks is recommended.</li>
      <li><strong>10–14:</strong> Moderate depression. A treatment plan, including counselling, pharmacotherapy, or both, should be considered. Referral to a mental health professional is appropriate.</li>
      <li><strong>15–19:</strong> Moderately severe depression. Active treatment is indicated. Close follow-up and referral are strongly recommended.</li>
      <li><strong>20–27:</strong> Severe depression. Immediate referral to a mental health specialist and consideration of more intensive interventions, including hospitalisation assessment if safety is a concern, is warranted.</li>
    </ul>

    <h2>Item 10 — Functional Impairment</h2>
    <p>
      The original PHQ questionnaire includes a tenth item that asks how much the problems listed
      in items 1–9 have made it difficult to do work, take care of things at home, or get along
      with other people. This item is sometimes included as a functional impairment indicator but
      is not scored as part of the 0–27 total. A positive functional impairment item alongside a
      PHQ-9 score of 5 or greater strengthens the clinical case for intervention. For a detailed
      multi-domain assessment of functional impact, the Work and Social Adjustment Scale (WSAS)
      provides a validated alternative.
    </p>

    <h2>Cross-Cultural Validation</h2>
    <p>
      The PHQ-9 has been translated into more than 80 languages and validated in diverse
      cultural and linguistic contexts including Spanish, Mandarin, Arabic, Hindi, Portuguese,
      and many others. While the psychometric properties are generally replicated, some studies
      have identified minor differential item functioning across cultures, particularly for
      somatic items such as changes in sleep and appetite. Clinicians should apply culturally
      sensitive interpretation when using the tool with populations whose primary language and
      cultural background differ from the original English-speaking US samples.
    </p>

    <h2>Strengths of the PHQ-9</h2>
    <p>
      The PHQ-9 takes approximately two to three minutes to complete and requires no special
      training to administer. Its brevity makes it practical for busy clinical settings and for
      longitudinal monitoring of treatment response over time. The scoring algorithm is transparent
      and can be explained directly to patients, which supports shared decision-making. Its
      free-to-use public domain status removes barriers that affect other validated instruments.
    </p>

    <h2>Limitations</h2>
    <p>
      The PHQ-9 is a screening tool, not a diagnostic test. A high score does not confirm a
      diagnosis of major depressive disorder, and a low score does not rule one out. The instrument
      cannot distinguish between depressive episodes caused by different aetiologies, such as
      bipolar depression, adjustment disorder, or medically induced mood changes. It does not assess
      manic or hypomanic episodes, so it should not be used alone when bipolar spectrum disorder is
      a concern.
    </p>
    <p>
      Some somatic symptoms such as sleep disruption, fatigue, and appetite change can be elevated
      in people with chronic physical illness or pain, which may inflate PHQ-9 scores in those
      populations. Researchers have proposed cognitive-affective subscales or adjusted cut-points
      for use in medically ill patients.
    </p>

    <h2>What to Do With Your Score</h2>
    <p>
      A score in the minimal range is reassuring but not a guarantee of wellbeing. If you have been
      feeling persistently low or hopeless even with a low score, that is worth discussing with a
      doctor or therapist. A score in the mild range suggests it is worth monitoring your symptoms
      and considering lifestyle factors such as sleep, physical activity, and social support. A
      score of 10 or above warrants a conversation with a qualified clinician who can properly
      evaluate your symptoms, rule out other causes, and discuss evidence-based treatment options.
    </p>
    <p>
      If you are having thoughts of self-harm or suicide, please contact a crisis service
      immediately. In the UK, call Samaritans on 116 123. In the US, call or text 988. In an
      immediate emergency, call local emergency services.
    </p>

    <h2>Common Misconceptions</h2>
    <p>
      One common misconception is that "passing" a PHQ-9 (scoring below 10) means you do not have
      depression. Depression exists on a spectrum and causes significant distress at any score level.
      Another misconception is that a high score alone is sufficient to start medication. Treatment
      decisions require clinical assessment that goes far beyond any questionnaire, including
      medical history, risk factors, patient preferences, and differential diagnosis.
    </p>

    <h3>This Tool Is Screening, Not Diagnosis</h3>
    <p>
      The PHQ-9 is a validated screening instrument intended to support clinical decision-making,
      not to replace it. Your score provides a useful starting point for a conversation with a
      healthcare professional but cannot, on its own, constitute a clinical diagnosis of any
      mental health condition.
    </p>
  </section>
</ScreenerLanding>
