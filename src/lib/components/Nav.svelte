<script lang="ts">
  import * as m from '$paraglide/messages';
  import ThemeToggle from './ThemeToggle.svelte';
</script>

<header class="border-b border-[color:var(--color-border)]">
  <nav aria-label="Primary" class="mx-auto flex max-w-5xl items-center justify-between p-4">
    <a href="/" class="text-lg font-semibold">{m.site_name()}</a>
    <ul class="flex items-center gap-4 text-sm">
      <li><a href="/">{m.nav_home()}</a></li>
      <li><a href="/compare">{m.nav_screeners()}</a></li>
      <li><a href="/faq">{m.nav_faq()}</a></li>
      <li><a href="/crisis">{m.nav_crisis()}</a></li>
      <li><a href="/history">{m.nav_history()}</a></li>
      <li><a href="/about">{m.nav_about()}</a></li>
      <li><ThemeToggle /></li>
    </ul>
  </nav>
</header>
