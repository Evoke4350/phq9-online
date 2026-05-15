<script lang="ts">
  import type { Screener } from '$lib/screeners/types';
  import ScoreResult from './ScoreResult.svelte';
  import { saveAttempt } from '$lib/storage';
  import { settings, adsSuppressed } from '$lib/stores';
  import * as m from '$paraglide/messages';
  import { t } from '$lib/messages';
  import { fly, fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  let { config } = $props<{ config: Screener }>();
  let answers: (number | null)[] = $state(Array(config.itemCount).fill(null));
  let currentIdx = $state(0);
  let submitted = $state(false);
  let score = $state(0);
  let band = $state(config.bands[0]!);
  let flagged = $state(false);
  let direction: 1 | -1 = $state(1);

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const isLast = $derived(currentIdx === config.itemCount - 1);
  const currentAnswered = $derived(answers[currentIdx] !== null);
  const progressPct = $derived(((currentIdx + 1) / config.itemCount) * 100);

  let advanceTimer: ReturnType<typeof setTimeout> | undefined;

  function chooseAnswer(value: number) {
    if (advanceTimer) clearTimeout(advanceTimer);
    answers[currentIdx] = value;
    if (!isLast) {
      const delay = reducedMotion ? 0 : 320;
      advanceTimer = setTimeout(() => {
        direction = 1;
        currentIdx += 1;
      }, delay);
    }
  }

  function goBack() {
    if (advanceTimer) clearTimeout(advanceTimer);
    if (currentIdx > 0) {
      direction = -1;
      currentIdx -= 1;
    }
  }

  function submit() {
    if (advanceTimer) clearTimeout(advanceTimer);
    if (answers.some((a) => a === null)) return;
    const finalAnswers = answers as number[];
    score = config.score(finalAnswers);
    band = config.bandFor(score);
    flagged = config.flagFired(finalAnswers);
    submitted = true;
    adsSuppressed.set(flagged || !!config.suppressAdsOnResult);
    if ($settings.saveHistory) {
      saveAttempt({
        id: crypto.randomUUID(),
        screenerId: config.id,
        completedAt: new Date().toISOString(),
        locale: $settings.locale,
        answers: finalAnswers,
        score,
        band: band.labelKey,
        flagged
      });
    }
  }

  function reset() {
    if (advanceTimer) clearTimeout(advanceTimer);
    answers = Array(config.itemCount).fill(null);
    currentIdx = 0;
    direction = 1;
    submitted = false;
    adsSuppressed.set(false);
  }

  const flyDistance = 40;
</script>

{#if !submitted}
  <div class="screener-shell">
    <div class="progress" aria-label="Quiz progress">
      <div class="progress-meta">
        <span class="progress-step">
          Question {currentIdx + 1}
          <span class="progress-of">of {config.itemCount}</span>
        </span>
        <span class="progress-pct">{Math.round(progressPct)}%</span>
      </div>
      <div class="progress-bar" role="presentation">
        <div class="progress-fill" style="width: {progressPct}%"></div>
      </div>
    </div>

    {#key currentIdx}
      <fieldset
        class="question"
        in:fly={{
          x: direction * flyDistance,
          duration: reducedMotion ? 0 : 320,
          easing: cubicOut
        }}
        out:fade={{ duration: reducedMotion ? 0 : 160 }}
      >
        <legend class="question-text display">
          {t(config.items[currentIdx].textKey)}
        </legend>
        <div class="choices">
          {#each config.scale.values as v, vi (vi)}
            <label class="choice" class:selected={answers[currentIdx] === v}>
              <input
                type="radio"
                name={`q${currentIdx}`}
                value={v}
                checked={answers[currentIdx] === v}
                onchange={() => chooseAnswer(v)}
                class="choice-input"
                aria-label={t(config.scale.labelKeys[vi]!)}
              />
              <span class="choice-label">{t(config.scale.labelKeys[vi]!)}</span>
            </label>
          {/each}
        </div>
      </fieldset>
    {/key}

    <div class="controls">
      <button
        type="button"
        class="btn-ghost"
        onclick={goBack}
        disabled={currentIdx === 0}
        aria-label="Previous question"
      >
        <span aria-hidden="true">←</span>
        Back
      </button>
      {#if isLast}
        <button
          type="button"
          class="btn-primary"
          onclick={submit}
          disabled={!currentAnswered}
        >
          {m.submit_answers()}
          <span aria-hidden="true">→</span>
        </button>
      {/if}
    </div>
  </div>
{:else}
  <ScoreResult screener={config} {score} {band} {flagged} />
  <div class="retake">
    <button type="button" class="btn-ghost" onclick={reset}>Retake the test</button>
  </div>
{/if}

<style>
  .screener-shell {
    max-width: 42rem;
    margin: 2.5rem auto 0;
    padding: 0 1rem;
  }
  .progress {
    margin-bottom: 2rem;
  }
  .progress-meta {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 0.875rem;
    color: var(--color-ink-muted);
    margin-bottom: 0.625rem;
  }
  .progress-step {
    font-weight: 600;
    color: var(--color-ink);
  }
  .progress-of {
    color: var(--color-ink-muted);
    font-weight: 400;
    margin-left: 0.25rem;
  }
  .progress-pct {
    font-variant-numeric: tabular-nums;
    color: var(--color-accent);
    font-weight: 600;
  }
  .progress-bar {
    height: 6px;
    background: color-mix(in oklch, var(--color-border) 60%, transparent);
    border-radius: 999px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--color-accent),
      var(--color-accent-soft)
    );
    border-radius: 999px;
    transition: width var(--motion-normal) var(--ease-out-soft);
  }
  .question {
    border: none;
    padding: 0;
    margin: 0;
    min-height: 18rem;
  }
  .question-text {
    font-size: clamp(1.5rem, 3.5vw, 2rem);
    line-height: 1.25;
    color: var(--color-ink);
    text-align: center;
    padding: 0 1rem;
    margin: 0 0 2rem;
    max-width: 36rem;
    margin-left: auto;
    margin-right: auto;
  }
  .choices {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 32rem;
    margin: 0 auto;
  }
  .choice {
    position: relative;
    display: block;
    cursor: pointer;
    border: 1px solid var(--color-border);
    background: var(--color-card);
    border-radius: 1rem;
    padding: 1rem 1.25rem;
    transition:
      transform var(--motion-fast) var(--ease-out-soft),
      border-color var(--motion-fast) var(--ease-out-soft),
      background var(--motion-fast) var(--ease-out-soft);
  }
  .choice:hover {
    transform: translateY(-1px);
    border-color: var(--color-accent-soft);
  }
  .choice.selected {
    border-color: var(--color-accent);
    background: color-mix(in oklch, var(--color-accent) 14%, var(--color-card));
  }
  .choice:has(input:focus-visible) {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
  .choice-input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: pointer;
  }
  .choice-label {
    position: relative;
    color: var(--color-ink);
    font-size: 1rem;
    font-weight: 500;
    pointer-events: none;
  }
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    gap: 1rem;
  }
  .retake {
    text-align: center;
    margin-top: 2rem;
  }
</style>
