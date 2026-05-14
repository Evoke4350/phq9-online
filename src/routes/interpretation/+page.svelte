<script lang="ts">
  import { breadcrumbSchema } from '$lib/schema';

  const url = 'https://phq9.online/interpretation';
  const ld = [
    breadcrumbSchema([
      { name: 'Home', url: 'https://phq9.online/' },
      { name: 'Interpreting Your Score', url }
    ])
  ];
</script>

<svelte:head>
  <title>Interpreting Your Score — phq9.online</title>
  <meta
    name="description"
    content="What your screening score means clinically: severity band interpretations across depression and anxiety instruments, when to seek professional support, and an overview of treatment approaches."
  />
  <link rel="canonical" href={url} />
  <meta property="og:title" content="Interpreting Your Score — phq9.online" />
  <meta
    property="og:description"
    content="What your screening score means clinically: severity band interpretations across depression and anxiety instruments, when to seek professional support, and an overview of treatment approaches."
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
  <h1>Interpreting Your Score</h1>

  <p>
    A screener score is a number on a continuum, not a verdict. Understanding what the number
    means — and what it does not mean — is the first step toward using it constructively. This
    page explains what different severity bands typically indicate across the instruments
    available on phq9.online, when professional support is advisable, and a general overview of
    how depression and anxiety are treated when they are identified.
  </p>
  <p>
    None of the information here constitutes medical advice, diagnosis, or a recommendation to
    start or stop any treatment. These instruments are screening tools. Only a qualified clinician
    who has assessed you fully can provide a diagnosis and recommend a treatment plan.
  </p>

  <h2>What a Screening Score Tells You</h2>
  <p>
    Screening instruments are designed to be sensitive: they aim to identify as many people who
    may have the condition as possible, accepting a degree of false positives. A score above a
    cut-point means that your pattern of responses resembles that of people in the validation
    studies who were subsequently confirmed to have the condition by a clinical interview. It does
    not mean you have been diagnosed.
  </p>
  <p>
    Conversely, a score below the cut-point does not guarantee you are well. Depression exists on
    a spectrum, and people with subclinical scores can still experience significant distress. If
    you are worried about how you feel regardless of your score, speaking to a doctor or counsellor
    is always appropriate.
  </p>

  <h2>Minimal / No Symptoms</h2>
  <p>
    Scores in the minimal or no-symptom range — PHQ-9 0–4, GAD-7 0–4, CES-D 0–15, WSAS 0,
    WHO-5 51–100 — suggest that you are not currently reporting symptoms at a level associated
    with clinical disorder. This is a broadly positive finding, but it should be understood in
    context:
  </p>
  <ul>
    <li>
      Some people minimise symptoms when completing questionnaires, particularly in a first
      assessment or when there is perceived stigma around mental health.
    </li>
    <li>
      Symptoms fluctuate. A minimal score today does not mean symptoms cannot worsen in coming
      weeks. If you have had prior episodes of depression or anxiety, periodic rescreening can
      detect early changes.
    </li>
    <li>
      Wellbeing is broader than the absence of symptoms. A minimal depression score does not
      capture burnout, chronic stress, relationship difficulties, or other sources of distress that
      might warrant attention.
    </li>
  </ul>

  <h2>Mild Symptoms</h2>
  <p>
    Scores in the mild range — PHQ-9 5–9, GAD-7 5–9, CES-D 16 (at threshold), WSAS 1–9,
    WHO-5 29–50 — suggest the presence of some symptoms that are meaningful but not yet at
    levels typically associated with a clinical diagnosis requiring immediate intervention.
  </p>
  <p>
    At this level, clinicians commonly recommend:
  </p>
  <ul>
    <li>
      <strong>Watchful waiting:</strong> Rescreening in four to six weeks to see whether symptoms
      are improving, stable, or worsening.
    </li>
    <li>
      <strong>Lifestyle review:</strong> Sleep regularity, physical activity (30 minutes of
      moderate aerobic activity most days has robust evidence for mood benefit), reducing alcohol
      consumption, maintaining social contact, and managing workload where possible.
    </li>
    <li>
      <strong>Psychoeducation:</strong> Learning about the nature of depression and anxiety,
      including the evidence that they are treatable conditions and that most episodes improve
      with or without formal intervention.
    </li>
    <li>
      <strong>Low-intensity psychological support:</strong> Some health systems offer guided
      self-help, computerised cognitive-behavioural therapy (CBT), or group-based support for
      mild symptoms without a formal referral.
    </li>
  </ul>
  <p>
    Mild symptoms should not be dismissed. For many people, mild presentations escalate without
    support, whereas early intervention at this stage can prevent progression to more severe
    episodes.
  </p>

  <h2>Moderate Symptoms</h2>
  <p>
    Scores in the moderate range — PHQ-9 10–14, GAD-7 10–14, WSAS 10–19, WHO-5 29–50 with
    additional indicators — are associated with meaningful interference in daily functioning and
    generally warrant a clinical assessment. At this level you should consider speaking to your
    general practitioner, a psychiatrist, or a licensed mental health professional.
  </p>
  <p>
    Moderate-severity presentations are the level at which evidence-based psychological and
    pharmacological treatments are typically recommended. Cognitive-behavioural therapy (CBT) has
    the strongest evidence base across both depression and anxiety disorders. Interpersonal
    therapy (IPT), behavioural activation, and mindfulness-based cognitive therapy (MBCT) also
    have well-replicated evidence. Antidepressant medication may be appropriate depending on the
    clinical picture, comorbidities, and patient preferences; this is a decision to make with a
    prescribing clinician, not on the basis of a screening score.
  </p>

  <h2>Moderately Severe and Severe Symptoms</h2>
  <p>
    Scores in the moderately severe and severe ranges — PHQ-9 15–19 (moderately severe) and
    20–27 (severe), GAD-7 15–21 (severe), WSAS 20–40 (severe), WHO-5 0–28 (very low) —
    are associated with substantial distress and significant impairment in work, social, and
    personal functioning. Seeking professional support as soon as possible is strongly advised.
  </p>
  <p>
    At severe levels, assessment by a clinician is important to:
  </p>
  <ul>
    <li>Confirm or rule out a formal diagnosis and rule out other medical causes of symptoms.</li>
    <li>Assess safety, including the presence of thoughts of self-harm or suicide.</li>
    <li>
      Develop a structured treatment plan that may include psychological therapy, medication,
      crisis planning, and coordination with other health services.
    </li>
  </ul>
  <p>
    You do not need to be in immediate danger to seek help. Feeling severely depressed or anxious
    is itself sufficient reason to contact a healthcare provider.
  </p>

  <h2>When to Seek Help Immediately</h2>
  <p>
    Contact emergency services or go to your nearest emergency department immediately if you:
  </p>
  <ul>
    <li>Are having thoughts of suicide or self-harm and have a plan or intention to act.</li>
    <li>Have made an attempt to harm yourself.</li>
    <li>Feel you may be a danger to yourself or others.</li>
  </ul>
  <p>
    If you are not in immediate danger but are having recurring thoughts of suicide or self-harm,
    contact a crisis service now. See the <a href="/crisis">crisis resources</a> page for
    helpline numbers in your country, including 988 (US), 116 123 Samaritans (UK), 988 (Canada),
    13 11 14 Lifeline (Australia), and others.
  </p>
  <p>
    PHQ-9 item 9 asks directly about thoughts of self-harm or being better off dead. Any response
    other than "not at all" to this item — regardless of the total score — warrants careful
    clinical attention.
  </p>

  <h2>Overview of Treatment Approaches</h2>
  <p>
    This section provides a general overview of recognised treatment approaches for depression
    and anxiety. It is not a treatment recommendation and is not a substitute for advice from a
    qualified clinician who knows your individual circumstances.
  </p>

  <h3>Psychological Therapies</h3>
  <p>
    Cognitive-behavioural therapy (CBT) is the most extensively studied psychological treatment
    for depression and generalised anxiety disorder. CBT addresses unhelpful thinking patterns and
    behaviours that maintain low mood and worry. It is typically delivered over 8 to 20 sessions,
    either individually or in a group format, and can also be delivered via digital platforms.
  </p>
  <p>
    Other evidence-supported psychological approaches include:
  </p>
  <ul>
    <li>
      <strong>Interpersonal therapy (IPT):</strong> Focuses on grief, role transitions, and
      interpersonal conflicts as triggers for depression.
    </li>
    <li>
      <strong>Behavioural activation (BA):</strong> A component of CBT that targets the
      withdrawal and avoidance behaviours that perpetuate depression by increasing engagement
      with rewarding activities.
    </li>
    <li>
      <strong>Mindfulness-based cognitive therapy (MBCT):</strong> Particularly effective for
      preventing relapse in people who have had three or more previous depressive episodes.
    </li>
    <li>
      <strong>Acceptance and commitment therapy (ACT):</strong> Focuses on psychological
      flexibility and values-based action rather than symptom elimination.
    </li>
  </ul>

  <h3>Pharmacological Treatment</h3>
  <p>
    Selective serotonin reuptake inhibitors (SSRIs) are the first-line pharmacological treatment
    for moderate to severe depression and for most anxiety disorders. Serotonin-norepinephrine
    reuptake inhibitors (SNRIs) are an alternative with similar efficacy. Medication decisions
    must be made with a prescribing clinician, who will consider your individual medical history,
    current medications, and preferences.
  </p>
  <p>
    Medication and psychological therapy in combination produce better outcomes than either alone
    in moderate to severe depression, according to multiple clinical trials.
  </p>

  <h3>Lifestyle and Self-Management</h3>
  <p>
    Regular aerobic exercise is one of the best-evidenced lifestyle interventions for mild to
    moderate depression, with effect sizes comparable to antidepressant medication in several
    randomised trials. Consistent sleep patterns, limiting alcohol and cannabis use, and
    maintaining social contact are also associated with better mood regulation. These approaches
    complement formal treatment but are not a substitute for it when symptoms are moderate to
    severe.
  </p>

  <h2>Understanding Your Score in Relation to WSAS</h2>
  <p>
    The WSAS measures functional impairment rather than symptom severity. A high WSAS score
    alongside moderate or severe symptoms on the PHQ-9 or GAD-7 provides additional evidence
    that the condition is having a significant impact on daily life and warrants prompt clinical
    attention. A low WSAS score alongside elevated symptom scores may indicate that the
    individual is coping functionally despite distress, which does not reduce the importance of
    seeking support but may affect urgency and the choice of intervention.
  </p>

  <h2>Longitudinal Monitoring</h2>
  <p>
    One of the most valuable uses of validated screeners is tracking change over time. Repeated
    assessments at regular intervals — for example, monthly or at each clinical appointment —
    allow both the individual and their clinician to see whether symptoms are improving, stable,
    or worsening. A decrease of 5 or more points on the PHQ-9 from baseline is generally
    considered a clinically meaningful improvement. If you are in treatment and your score is not
    improving after several weeks, discuss this with your clinician.
  </p>
  <p>
    Use the <a href="/history">history</a> page to review your past screening attempts if you
    have opted in to saving them on this device.
  </p>
</article>
