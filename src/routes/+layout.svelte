<script lang="ts">
  import '../app.css';
  import { ParaglideJS } from '@inlang/paraglide-sveltekit';
  import { i18n } from '$lib/i18n';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  let { children } = $props();

  // Read the ads flag via the define constant injected by vite.config.ts.
  // This works in both SSR (prerender) and client contexts, with or without
  // the env var set — it always defaults to 'false'.
  const adsEnabled = typeof __PUBLIC_ENABLE_ADS__ !== 'undefined' && __PUBLIC_ENABLE_ADS__ === 'true';
</script>

<svelte:head>
  {#if adsEnabled}
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8001142558091314" crossorigin="anonymous"></script>
  {/if}
</svelte:head>

<ParaglideJS {i18n}>
  <Nav />
  <main class="mx-auto max-w-5xl px-4 py-8">
    {@render children?.()}
  </main>
  <Footer />
</ParaglideJS>
