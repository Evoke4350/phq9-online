<script lang="ts">
  import * as m from '$paraglide/messages';
</script>

<aside role="alert" aria-live="assertive" class="crisis">
  <h2 class="title">{m.crisis_banner_title()}</h2>
  <ul class="resources">
    <li>{m.crisis_banner_us_988()}</li>
    <li>{m.crisis_banner_text_line()}</li>
    <li>{m.crisis_banner_uk_samaritans()}</li>
    <li>{m.crisis_banner_canada_988()}</li>
    <li>{m.crisis_banner_iceland_pieta()}</li>
    <li>
      <a class="link" href="/crisis">{m.crisis_banner_intl_link()}</a>
    </li>
  </ul>
</aside>

<style>
  .crisis {
    background: color-mix(in oklch, var(--color-crisis-soft) 25%, var(--color-card));
    border-left: 4px solid var(--color-crisis);
    border-radius: 1rem;
    padding: 1.5rem 1.75rem;
    margin: 0 0 2rem;
    box-shadow: 0 8px 24px color-mix(in oklch, var(--color-crisis) 12%, transparent);
  }
  .title {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-ink);
    margin: 0 0 1rem;
    letter-spacing: -0.015em;
  }
  .resources {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: var(--color-ink);
    font-size: 0.9375rem;
    line-height: 1.5;
  }
  .resources li::before {
    content: '·';
    color: var(--color-crisis);
    margin-right: 0.5rem;
    font-weight: 700;
  }
  .resources li:last-child::before {
    content: '→';
  }
  .link {
    color: var(--color-accent);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
  }
  .link:hover {
    color: var(--color-accent-soft);
  }
</style>
