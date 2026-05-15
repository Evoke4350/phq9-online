<script lang="ts">
  import Logo from './Logo.svelte';
  import TrustStrip from './TrustStrip.svelte';

  let {
    title,
    subtitle,
    ctaLabel = 'Start the test',
    ctaHref = '#quiz',
    tiles
  } = $props<{
    title: string;
    subtitle: string;
    ctaLabel?: string;
    ctaHref?: string;
    tiles?: { label: string; value: string }[];
  }>();
</script>

<section class="hero">
  <div class="logo-mark">
    <Logo variant="mark" size={72} />
  </div>
  <h1 class="display">{title}</h1>
  <p class="lede">{subtitle}</p>
  <a class="btn-primary cta" href={ctaHref}>
    {ctaLabel}
    <span aria-hidden="true">→</span>
  </a>
  {#if tiles && tiles.length > 0}
    <TrustStrip {tiles} />
  {/if}
</section>

<style>
  .hero {
    text-align: center;
    padding: 3rem 1rem 2rem;
    max-width: 56rem;
    margin: 0 auto;
  }
  .logo-mark {
    display: inline-block;
    margin-bottom: 1.5rem;
    filter: drop-shadow(0 4px 20px color-mix(in oklch, var(--color-accent) 30%, transparent));
  }
  h1 {
    font-size: clamp(2.25rem, 5vw, 3.5rem);
    line-height: 1.05;
    margin: 0;
    font-weight: 600;
    color: var(--color-ink);
  }
  .lede {
    font-size: clamp(1.0625rem, 1.6vw, 1.25rem);
    line-height: 1.55;
    color: var(--color-ink-muted);
    margin: 1.25rem auto 0;
    max-width: 38rem;
  }
  .cta {
    margin-top: 2rem;
    font-size: 1.0625rem;
  }
  @media (min-width: 768px) {
    .hero {
      padding: 5rem 1.5rem 3rem;
    }
  }
</style>
