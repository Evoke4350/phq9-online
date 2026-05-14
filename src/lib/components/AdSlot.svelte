<script lang="ts">
  import { onMount } from 'svelte';
  import { adsEnabled, adsSuppressed } from '$lib/stores';
  let { slot, format = 'auto' } = $props<{ slot: string; format?: 'auto' | 'fluid' }>();
  let mounted = $state(false);
  onMount(() => {
    mounted = true;
    if ($adsEnabled && !$adsSuppressed) {
      try { (window as any).adsbygoogle = (window as any).adsbygoogle || []; (window as any).adsbygoogle.push({}); }
      catch { /* swallow */ }
    }
  });
</script>

{#if mounted && $adsEnabled && !$adsSuppressed}
  <ins class="adsbygoogle block my-6"
       style="display:block"
       data-ad-client="ca-pub-8001142558091314"
       data-ad-slot={slot}
       data-ad-format={format}
       data-full-width-responsive="true"></ins>
{/if}
