<script lang="ts">
  import { settings } from '$lib/stores';
  import { onMount } from 'svelte';

  function apply(theme: 'auto' | 'light' | 'dark') {
    settings.update((s) => ({ ...s, theme }));
    if (typeof document !== 'undefined') {
      if (theme === 'auto') document.documentElement.removeAttribute('data-theme');
      else document.documentElement.setAttribute('data-theme', theme);
    }
  }

  onMount(() => {
    if (typeof document === 'undefined') return;
    settings.subscribe((s) => apply(s.theme));
  });
</script>

<select aria-label="Theme" on:change={(e) => apply((e.currentTarget as HTMLSelectElement).value as any)}>
  <option value="auto">Auto</option>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
</select>
