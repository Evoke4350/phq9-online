<script lang="ts">
  import { onMount } from 'svelte';
  import { adsEnabled } from '$lib/stores';

  let { slot, format = 'auto' } = $props<{ slot: string; format?: 'auto' | 'fluid' }>();
  let mounted = $state(false);
  let enabled = $state(false);
  let pushed = $state(false);

  const visible = $derived(mounted && enabled);

  onMount(() => {
    mounted = true;
    const unsub = adsEnabled.subscribe((v) => { enabled = v; });
    return unsub;
  });

  $effect(() => {
    if (visible && !pushed) {
      try {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
        pushed = true;
      } catch {
        /* swallow */
      }
    }
  });
</script>

{#if visible}
  <ins
    class="adsbygoogle block my-6"
    style="display:block"
    data-ad-client="ca-pub-8001142558091314"
    data-ad-slot={slot}
    data-ad-format={format}
    data-full-width-responsive="true"
  ></ins>
{/if}
