<script lang="ts">
  let { tiles } = $props<{
    tiles: { label: string; value: string }[];
  }>();
</script>

<ul class="trust" aria-label="Quick facts about this test">
  {#each tiles as tile}
    <li class="tile">
      <span class="value">{tile.value}</span>
      <span class="label">{tile.label}</span>
    </li>
  {/each}
</ul>

<style>
  .trust {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.75rem;
    margin-top: 2rem;
    list-style: none;
    padding: 0;
  }
  .tile {
    background: color-mix(in oklch, var(--color-card) 80%, transparent);
    border: 1px solid var(--color-border);
    border-radius: 1rem;
    padding: 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    backdrop-filter: blur(8px);
  }
  .value {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-ink);
    letter-spacing: -0.02em;
  }
  .label {
    font-size: 0.8125rem;
    color: var(--color-ink-muted);
  }
  @media (max-width: 640px) {
    .trust {
      grid-template-columns: 1fr;
    }
  }
</style>
