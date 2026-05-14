<script lang="ts">
  import { breadcrumbSchema } from '$lib/schema';

  const url = 'https://phq9.online/compare';
  const ld = [
    breadcrumbSchema([
      { name: 'Home', url: 'https://phq9.online/' },
      { name: 'Compare Screeners', url }
    ])
  ];
</script>

<svelte:head>
  <title>Compare Screeners — phq9.online</title>
  <meta
    name="description"
    content="Side-by-side comparison of all seven screeners on phq9.online: PHQ-9, PHQ-2, GAD-7, CES-D, PROMIS Depression, WSAS, and WHO-5 — domain, items, scale, time, licence, and citation."
  />
  <link rel="canonical" href={url} />
  <meta property="og:title" content="Compare Screeners — phq9.online" />
  <meta
    property="og:description"
    content="Side-by-side comparison of all seven screeners on phq9.online: PHQ-9, PHQ-2, GAD-7, CES-D, PROMIS Depression, WSAS, and WHO-5 — domain, items, scale, time, licence, and citation."
  />
  <meta property="og:url" content={url} />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="https://phq9.online/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  {@html ld
    .map(
      (b) =>
        `<script type="application/ld+json">${JSON.stringify(b).replace(/</g, '\\u003c')}</script>`
    )
    .join('')}
</svelte:head>

<article class="prose max-w-prose lg:max-w-5xl">
  <h1>Compare Screeners</h1>

  <p>
    phq9.online offers seven validated, public-domain screening instruments covering depression,
    anxiety, functional impairment, and general wellbeing. The table below summarises the key
    characteristics of each instrument to help you choose the most appropriate tool.
  </p>

  <div class="overflow-x-auto">
    <table class="min-w-full text-sm">
      <thead>
        <tr>
          <th class="text-left">Instrument</th>
          <th class="text-left">Domain</th>
          <th class="text-left">Items</th>
          <th class="text-left">Response scale</th>
          <th class="text-left">Approx. minutes</th>
          <th class="text-left">Licence</th>
          <th class="text-left">Primary citation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a href="/">PHQ-9</a></td>
          <td>Depression</td>
          <td>9</td>
          <td>0–3 (frequency, 4-point); total 0–27</td>
          <td>2–3</td>
          <td>Public domain (Pfizer waiver)</td>
          <td>
            Kroenke K, Spitzer RL, Williams JB. J Gen Intern Med. 2001;16(9):606–613.
            doi:<a href="https://doi.org/10.1046/j.1525-1497.2001.016009606.x" rel="noopener noreferrer" target="_blank">10.1046/j.1525-1497.2001.016009606.x</a>
          </td>
        </tr>
        <tr>
          <td><a href="/phq-2">PHQ-2</a></td>
          <td>Depression (ultra-brief screen)</td>
          <td>2</td>
          <td>0–3 (frequency, 4-point); total 0–6</td>
          <td>&lt;1</td>
          <td>Public domain (Pfizer waiver)</td>
          <td>
            Kroenke K, Spitzer RL, Williams JB. Med Care. 2003;41(11):1284–1292.
            doi:<a href="https://doi.org/10.1097/01.MLR.0000093487.78664.3C" rel="noopener noreferrer" target="_blank">10.1097/01.MLR.0000093487.78664.3C</a>
          </td>
        </tr>
        <tr>
          <td><a href="/gad-7">GAD-7</a></td>
          <td>Anxiety (generalised anxiety disorder)</td>
          <td>7</td>
          <td>0–3 (frequency, 4-point); total 0–21</td>
          <td>1–2</td>
          <td>Public domain (Pfizer waiver)</td>
          <td>
            Spitzer RL, Kroenke K, Williams JB, Löwe B. Arch Intern Med. 2006;166(10):1092–1097.
            doi:<a href="https://doi.org/10.1001/archinte.166.10.1092" rel="noopener noreferrer" target="_blank">10.1001/archinte.166.10.1092</a>
          </td>
        </tr>
        <tr>
          <td><a href="/ces-d">CES-D</a></td>
          <td>Depression (research / epidemiology)</td>
          <td>20</td>
          <td>0–3 (frequency, 4-point, 4 items reverse-scored); total 0–60</td>
          <td>5–10</td>
          <td>Public domain (NIMH)</td>
          <td>
            Radloff LS. Appl Psychol Meas. 1977;1(3):385–401.
            doi:<a href="https://doi.org/10.1177/014662167700100306" rel="noopener noreferrer" target="_blank">10.1177/014662167700100306</a>
          </td>
        </tr>
        <tr>
          <td><a href="/promis-depression">PROMIS Depression</a></td>
          <td>Depression (IRT-calibrated)</td>
          <td>8</td>
          <td>1–5 (frequency, 5-point); total 8–40; T-score conversion available</td>
          <td>2–3</td>
          <td>Public domain (NIH PROMIS)</td>
          <td>
            Pilkonis PA et al. Assessment. 2011;18(3):263–283.
            doi:<a href="https://doi.org/10.1177/1073191111411667" rel="noopener noreferrer" target="_blank">10.1177/1073191111411667</a>
          </td>
        </tr>
        <tr>
          <td><a href="/wsas">WSAS</a></td>
          <td>Functional impairment</td>
          <td>5</td>
          <td>0–8 (impairment, 9-point per domain); total 0–40</td>
          <td>2–3</td>
          <td>Public domain</td>
          <td>
            Mundt JC, Marks IM, Shear MK, Greist JH. Br J Psychiatry. 2002;180:461–464.
            doi:<a href="https://doi.org/10.1192/bjp.180.5.461" rel="noopener noreferrer" target="_blank">10.1192/bjp.180.5.461</a>
          </td>
        </tr>
        <tr>
          <td><a href="/who-5">WHO-5</a></td>
          <td>Wellbeing (positive)</td>
          <td>5</td>
          <td>0–5 (frequency, 6-point); raw 0–25 multiplied by 4 = 0–100</td>
          <td>1</td>
          <td>Free to use with attribution to WHO</td>
          <td>
            World Health Organization. WHO (Five) Well-Being Index (1998 version). WHO Regional Office for Europe, Copenhagen.
            <a href="https://www.psykiatri-regionh.dk/who-5/Pages/default.aspx" rel="noopener noreferrer" target="_blank">who-5.org</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>How to Choose a Screener</h2>
  <p>
    The right instrument depends on your purpose:
  </p>
  <ul>
    <li>
      <strong>Routine depression check:</strong> The PHQ-9 is the most widely validated and
      broadly used option. It is suitable for most adults in primary care and community settings.
    </li>
    <li>
      <strong>Quick initial screen:</strong> The PHQ-2 can be completed in under a minute.
      A positive result (score 3 or above) should prompt administration of the full PHQ-9.
    </li>
    <li>
      <strong>Anxiety screening:</strong> The GAD-7 is the standard choice for generalised
      anxiety disorder. It is also used dimensionally across anxiety disorders more broadly.
    </li>
    <li>
      <strong>Research or epidemiology:</strong> The CES-D is widely used in population studies
      and is particularly sensitive to subclinical depressive symptoms.
    </li>
    <li>
      <strong>IRT-based or NIH research context:</strong> The PROMIS Depression Short Form
      provides T-score-based measurement suitable for comparing across populations.
    </li>
    <li>
      <strong>Functional impairment assessment:</strong> Use the WSAS alongside any symptom
      screener to assess how much symptoms are affecting work, home, and social life.
    </li>
    <li>
      <strong>General wellbeing monitoring:</strong> The WHO-5 measures positive wellbeing
      rather than symptom severity and is useful for longitudinal tracking of overall mood state.
    </li>
  </ul>
  <p>
    All seven instruments are free to use and are in the public domain or have equivalent open
    licensing. See the <a href="/scoring">scoring guide</a> for full details on how each
    instrument is scored and what the bands mean.
  </p>

  <h2>Notes on the Table</h2>
  <p>
    <strong>Approx. minutes</strong> refers to estimated self-completion time under typical
    conditions. Actual time will vary by individual and administration context.
  </p>
  <p>
    <strong>PROMIS T-scores:</strong> The PROMIS Depression Short Form 8a produces a raw score
    (8–40) which can be converted to a T-score (population mean of 50, SD of 10) using conversion
    tables provided by the NIH HealthMeasures programme. The raw score bands shown in the scoring
    guide are approximations. For precise T-score conversion in research contexts, use the
    <a href="https://www.healthmeasures.net/score-and-interpret/calculate-scores" rel="noopener noreferrer" target="_blank">HealthMeasures Scoring Service</a>.
  </p>
  <p>
    <strong>CES-D reverse scoring:</strong> Four items on the CES-D (covering positive affect)
    are reverse-scored: a response of 3 contributes 0 to the total, and a response of 0
    contributes 3. This is handled automatically on this site.
  </p>
  <p>
    <strong>WHO-5 scaling:</strong> The WHO-5 raw score (0–25) is multiplied by 4 to produce a
    percentage score on a 0–100 scale. This conversion is handled automatically on this site.
    Higher scores indicate better wellbeing; lower scores indicate poorer wellbeing and possible
    depression requiring further evaluation.
  </p>
</article>
