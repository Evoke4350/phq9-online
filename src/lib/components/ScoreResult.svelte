<script lang="ts">
  import type { Screener, SeverityBand } from '$lib/screeners/types';
  import CrisisBanner from './CrisisBanner.svelte';
  import * as m from '$paraglide/messages';

  let { screener, score, band, flagged } = $props<{
    screener: Screener;
    score: number;
    band: SeverityBand;
    flagged: boolean;
  }>();
</script>

<section aria-labelledby="result-heading" class="mt-8">
  {#if flagged}
    <CrisisBanner />
  {/if}
  <h2 id="result-heading" class="text-2xl font-semibold">{m.your_score()}: {score}</h2>
  <p class="mt-2 text-lg">
    <span class="font-medium">{band.severity}</span>
  </p>
  <p class="mt-4 max-w-prose text-[color:var(--color-ink-2)]">
    {band.actionKey}
  </p>
</section>
