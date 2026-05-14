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
    const unsubscribe = settings.subscribe((s) => {
      // Only apply the theme to the DOM; do NOT call settings.update to avoid an
      // infinite reactive loop (subscribe → apply → update → subscribe → …).
      if (s.theme === 'auto') document.documentElement.removeAttribute('data-theme');
      else document.documentElement.setAttribute('data-theme', s.theme);
    });
    return unsubscribe;
  });
</script>

<select aria-label="Theme" on:change={(e) => apply((e.currentTarget as HTMLSelectElement).value as any)}>
  <option value="auto">Auto</option>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
</select>
