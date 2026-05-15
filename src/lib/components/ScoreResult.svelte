<script lang="ts">
  import type { Screener, SeverityBand } from '$lib/screeners/types';
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';
  import CrisisBanner from './CrisisBanner.svelte';
  import * as m from '$paraglide/messages';
  import { t } from '$lib/messages';

  let { screener, score, band, flagged } = $props<{
    screener: Screener;
    score: number;
    band: SeverityBand;
    flagged: boolean;
  }>();

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const tweenedScore = tweened(0, {
    duration: reducedMotion ? 0 : 800,
    easing: cubicOut
  });

  let revealed = $state(false);

  onMount(() => {
    tweenedScore.set(score);
    const timeout = setTimeout(
      () => {
        revealed = true;
      },
      reducedMotion ? 0 : 300
    );
    return () => clearTimeout(timeout);
  });

  const severityClass = $derived(`band-${band.severity}`);
</script>

<section aria-labelledby="result-heading" class="result">
  {#if flagged}
    <CrisisBanner />
  {/if}
  <div class="score-block">
    <span class="score-label">{m.your_score()}</span>
    <div class="score-number display" aria-live="polite">
      {Math.round($tweenedScore)}
    </div>
    {#if revealed}
      <div class="band-pill {severityClass}" in:fade={{ duration: reducedMotion ? 0 : 300 }}>
        {t(band.labelKey)}
      </div>
    {/if}
    <h2 id="result-heading" class="sr-only">
      {m.your_score()}: {score} ({t(band.labelKey)})
    </h2>
  </div>

  {#if revealed}
    <div
      class="card action-card"
      in:fade={{ duration: reducedMotion ? 0 : 400, delay: reducedMotion ? 0 : 100 }}
    >
      <p>{t(band.actionKey)}</p>
    </div>
  {/if}

  {#if screener.recommend && screener.recommend.length > 0 && revealed}
    <div
      class="recommend-row"
      in:fade={{ duration: reducedMotion ? 0 : 400, delay: reducedMotion ? 0 : 200 }}
    >
      <h3 class="recommend-title">You may also want to take</h3>
      <div class="recommend-cards">
        {#each screener.recommend as recId}
          <a class="recommend-card card" href={recId === 'phq-9' ? '/' : `/${recId}`}>
            <span class="recommend-name">{recId.toUpperCase()}</span>
            <span class="recommend-arrow" aria-hidden="true">→</span>
          </a>
        {/each}
      </div>
    </div>
  {/if}
</section>

<style>
  .result {
    margin-top: 3rem;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
  .score-block {
    text-align: center;
    padding: 3rem 1rem 2rem;
  }
  .score-label {
    display: block;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-ink-muted);
    margin-bottom: 0.5rem;
  }
  .score-number {
    font-size: clamp(4rem, 12vw, 7.5rem);
    line-height: 1;
    font-weight: 700;
    color: var(--color-accent);
    letter-spacing: -0.03em;
    margin: 0.25rem 0 0.75rem;
  }
  .band-pill {
    display: inline-block;
    padding: 0.375rem 1rem;
    border-radius: 999px;
    background: color-mix(in oklch, var(--color-accent) 18%, var(--color-card));
    border: 1px solid color-mix(in oklch, var(--color-accent) 30%, var(--color-border));
    color: var(--color-ink);
    font-size: 0.9375rem;
    font-weight: 500;
  }
  .band-pill.band-severe,
  .band-pill.band-mod-severe {
    background: color-mix(in oklch, var(--color-crisis) 18%, var(--color-card));
    border-color: color-mix(in oklch, var(--color-crisis) 35%, var(--color-border));
  }
  .band-pill.band-none {
    background: color-mix(in oklch, var(--color-success) 16%, var(--color-card));
    border-color: color-mix(in oklch, var(--color-success) 30%, var(--color-border));
  }
  .action-card {
    margin-top: 0.5rem;
    font-size: 1.0625rem;
    line-height: 1.55;
    color: var(--color-ink);
  }
  .action-card p {
    margin: 0;
  }
  .recommend-row {
    margin-top: 2.5rem;
  }
  .recommend-title {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-ink-muted);
    margin: 0 0 1rem;
    font-weight: 600;
  }
  .recommend-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  .recommend-card {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    padding: 0.875rem 1.25rem;
    color: var(--color-ink);
    transition:
      transform var(--motion-fast) var(--ease-out-soft),
      border-color var(--motion-fast) var(--ease-out-soft);
  }
  .recommend-card:hover {
    transform: translateY(-2px);
    border-color: var(--color-accent-soft);
  }
  .recommend-name {
    font-family: var(--font-display);
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .recommend-arrow {
    color: var(--color-accent);
  }
</style>
