<script lang="ts">
  import * as m from '$paraglide/messages';
  import Logo from './Logo.svelte';
  import ThemeToggle from './ThemeToggle.svelte';
</script>

<header class="nav-shell">
  <nav aria-label="Primary" class="nav-inner">
    <a href="/" class="brand" aria-label="phq9.online home">
      <Logo size={24} />
    </a>
    <ul class="links">
      <li><a href="/compare">{m.nav_screeners()}</a></li>
      <li><a href="/faq">{m.nav_faq()}</a></li>
      <li><a href="/crisis">{m.nav_crisis()}</a></li>
      <li><a href="/history">{m.nav_history()}</a></li>
      <li class="toggle-wrap"><ThemeToggle /></li>
    </ul>
  </nav>
</header>

<style>
  .nav-shell {
    position: sticky;
    top: 0;
    z-index: 50;
    border-bottom: 1px solid color-mix(in oklch, var(--color-border) 60%, transparent);
    background: color-mix(in oklch, var(--color-bg) 75%, transparent);
    backdrop-filter: blur(12px) saturate(1.4);
    -webkit-backdrop-filter: blur(12px) saturate(1.4);
  }
  .nav-inner {
    max-width: 64rem;
    margin: 0 auto;
    padding: 0.875rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .brand {
    display: inline-flex;
    color: var(--color-ink);
    text-decoration: none;
  }
  .links {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 0.9375rem;
  }
  .links a {
    color: var(--color-ink-muted);
    text-decoration: none;
    transition: color var(--motion-fast) var(--ease-out-soft);
  }
  .links a:hover {
    color: var(--color-ink);
  }
  .toggle-wrap {
    margin-left: 0.5rem;
  }
  @media (max-width: 640px) {
    .links {
      gap: 0.875rem;
      font-size: 0.8125rem;
    }
    .links li:nth-child(4) {
      display: none;
    }
  }
</style>
