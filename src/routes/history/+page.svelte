<script lang="ts">
  import { listAttempts, deleteAttempt, clearAll, exportJson, exportCsv, type Attempt } from '$lib/storage';
  import { settings } from '$lib/stores';
  import * as m from '$paraglide/messages';
  import { breadcrumbSchema } from '$lib/schema';

  let attempts = $state<Attempt[]>([]);

  $effect(() => { attempts = listAttempts(); });

  function download(filename: string, mime: string, content: string) {
    const blob = new Blob([content], { type: mime });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function toggleOptIn() {
    settings.update((s) => ({ ...s, saveHistory: !s.saveHistory }));
  }

  const url = 'https://phq9.online/history';
  const ld = [
    breadcrumbSchema([
      { name: 'Home', url: 'https://phq9.online/' },
      { name: 'History', url }
    ])
  ];
</script>

<svelte:head>
  <title>History — phq9.online</title>
  <meta name="description" content="Your saved screener attempts, stored only on this device." />
  <link rel="canonical" href={url} />
  <meta name="robots" content="noindex" />
  {@html ld.map((b) => `<script type="application/ld+json">${JSON.stringify(b).replace(/</g, '\\u003c')}<\/script>`).join('')}
</svelte:head>

<h1 class="text-3xl font-bold">History</h1>
<p class="mt-2">{m.history_saved()}</p>

<label class="mt-4 flex items-center gap-2">
  <input type="checkbox" checked={$settings.saveHistory} on:change={toggleOptIn} />
  <span>{m.history_optin_label()}</span>
</label>

<div class="mt-6 flex gap-2">
  <button on:click={() => download('phq9-history.json', 'application/json', exportJson())} class="rounded bg-[color:var(--color-accent)] px-3 py-1 text-white">{m.history_export_json()}</button>
  <button on:click={() => download('phq9-history.csv', 'text/csv', exportCsv())} class="rounded bg-[color:var(--color-accent)] px-3 py-1 text-white">{m.history_export_csv()}</button>
  <button on:click={() => { clearAll(); attempts = []; }} class="rounded border px-3 py-1">{m.history_clear_all()}</button>
</div>

<table class="mt-6 w-full text-left text-sm">
  <thead>
    <tr><th>Date</th><th>Screener</th><th>Score</th><th>Band</th><th><span class="sr-only">Actions</span></th></tr>
  </thead>
  <tbody>
    {#each attempts as a}
      <tr>
        <td>{new Date(a.completedAt).toLocaleString()}</td>
        <td>{a.screenerId}</td>
        <td>{a.score}</td>
        <td>{a.band}</td>
        <td><button on:click={() => { deleteAttempt(a.id); attempts = listAttempts(); }} aria-label="Delete" class="underline">Delete</button></td>
      </tr>
    {/each}
  </tbody>
</table>
