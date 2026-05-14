<script lang="ts">
  import type { Screener } from '$lib/screeners/types';
  import ScreenerForm from './Screener.svelte';
  import AdSlot from './AdSlot.svelte';
  import { medicalWebPageSchema, quizSchema, breadcrumbSchema } from '$lib/schema';

  let { config, ogTitle, ogDescription, url, children, breadcrumbs } = $props<{
    config: Screener;
    ogTitle: string;
    ogDescription: string;
    url: string;
    children?: any;
    breadcrumbs: { name: string; url: string }[];
  }>();

  const ld = [
    medicalWebPageSchema({ url, name: ogTitle, description: ogDescription }),
    quizSchema({ name: ogTitle, url, about: config.domain }),
    breadcrumbSchema(breadcrumbs)
  ];
</script>

<svelte:head>
  <title>{ogTitle}</title>
  <meta name="description" content={ogDescription} />
  <link rel="canonical" href={url} />
  <meta property="og:title" content={ogTitle} />
  <meta property="og:description" content={ogDescription} />
  <meta property="og:url" content={url} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://phq9.online/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  {@html ld.map((b) => `<script type="application/ld+json">${JSON.stringify(b).replace(/</g, '\\u003c')}<\/script>`).join('')}
</svelte:head>

<article>
  <h1 class="text-3xl font-bold">{ogTitle}</h1>
  <p class="mt-2 text-[color:var(--color-ink-2)]">{ogDescription}</p>

  <ScreenerForm {config} />

  <AdSlot slot="1234567890" />

  {@render children?.()}

  <AdSlot slot="2345678901" />

  <section class="mt-8 text-xs text-[color:var(--color-ink-2)]">
    <strong>Source:</strong> {config.source.citation}
    {#if config.source.doi}<br />doi:{config.source.doi}{/if}
    <br /><strong>License:</strong> {config.source.license}
  </section>
</article>
