<script lang="ts">
  import type { Screener } from '$lib/screeners/types';
  import ScoreResult from './ScoreResult.svelte';
  import { saveAttempt } from '$lib/storage';
  import { settings, adsSuppressed } from '$lib/stores';
  import * as m from '$paraglide/messages';

  let { config } = $props<{ config: Screener }>();
  let answers: (number | null)[] = $state(Array(config.itemCount).fill(null));
  let submitted = $state(false);
  let score = $state(0);
  let band = $state(config.bands[0]!);
  let flagged = $state(false);

  const complete = $derived(answers.every((a) => a !== null));

  function submit() {
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
    answers = Array(config.itemCount).fill(null);
    submitted = false;
    adsSuppressed.set(false);
  }
</script>

{#if !submitted}
  <form on:submit|preventDefault={submit} class="mt-6 space-y-6">
    {#each config.items as item, idx}
      <fieldset class="rounded-md border border-[color:var(--color-border)] p-4">
        <legend class="px-2 text-sm font-medium">
          {idx + 1}. {item.textKey}
        </legend>
        <div class="mt-2 grid gap-2 sm:grid-cols-2">
          {#each config.scale.values as v, vi}
            <label class="flex items-center gap-2 rounded p-2 hover:bg-[color:var(--color-base-2)] cursor-pointer">
              <input
                type="radio"
                name={`q${idx}`}
                value={v}
                checked={answers[idx] === v}
                on:change={() => (answers[idx] = v)}
                aria-label={config.scale.labelKeys[vi]}
              />
              <span>{config.scale.labelKeys[vi]}</span>
            </label>
          {/each}
        </div>
      </fieldset>
    {/each}
    <button
      type="submit"
      disabled={!complete}
      class="rounded-md bg-[color:var(--color-accent)] px-4 py-2 font-medium text-white disabled:opacity-50"
    >
      {m.submit_answers()}
    </button>
  </form>
{:else}
  <ScoreResult screener={config} {score} {band} {flagged} />
  <button on:click={reset} class="mt-6 text-sm underline">Retake</button>
{/if}
