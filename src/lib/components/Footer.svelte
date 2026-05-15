<script lang="ts">
  import * as m from '$paraglide/messages';
  import Logo from './Logo.svelte';
</script>

<footer class="footer">
  <div class="footer-inner">
    <div class="brand-col">
      <Logo variant="mark" size={36} />
      <p class="tagline">{m.footer_disclaimer()}</p>
    </div>
    <div class="col">
      <h2 class="col-title">Screeners</h2>
      <ul>
        <li><a href="/">PHQ-9</a></li>
        <li><a href="/phq-2">PHQ-2</a></li>
        <li><a href="/gad-7">GAD-7</a></li>
        <li><a href="/ces-d">CES-D</a></li>
        <li><a href="/promis-depression">PROMIS Depression</a></li>
        <li><a href="/wsas">WSAS</a></li>
        <li><a href="/who-5">WHO-5</a></li>
        <li><a href="/compare">Compare all</a></li>
      </ul>
    </div>
    <div class="col">
      <h2 class="col-title">Reference</h2>
      <ul>
        <li><a href="/about-phq9">About PHQ-9</a></li>
        <li><a href="/scoring">Scoring guide</a></li>
        <li><a href="/interpretation">Interpretation</a></li>
        <li><a href="/faq">FAQ</a></li>
        <li><a href="/crisis">Crisis resources</a></li>
      </ul>
    </div>
    <div class="col">
      <h2 class="col-title">About</h2>
      <ul>
        <li><a href="/about">About the site</a></li>
        <li><a href="/disclaimer">Disclaimer</a></li>
        <li><a href="/privacy">Privacy</a></li>
        <li><a href="/terms">Terms</a></li>
        <li><a href="/contact">Contact</a></li>
        <li>
          <a href="https://github.com/Evoke4350/phq9-online" rel="noopener">Source on GitHub</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© {new Date().getFullYear()} phq9.online</span>
    <span class="dot" aria-hidden="true">·</span>
    <span>MIT licensed</span>
    <span class="dot" aria-hidden="true">·</span>
    <span>No accounts, no PII, no tracking by default</span>
  </div>
</footer>

<style>
  .footer {
    margin-top: 6rem;
    border-top: 1px solid var(--color-border);
    background: color-mix(in oklch, var(--color-bg-elevated) 60%, transparent);
    padding: 3rem 1rem 2rem;
  }
  .footer-inner {
    max-width: 64rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
    gap: 2rem;
  }
  .brand-col {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }
  .tagline {
    color: var(--color-ink-muted);
    font-size: 0.875rem;
    line-height: 1.55;
    max-width: 22rem;
    margin: 0;
  }
  .col-title {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-ink-muted);
    margin: 0 0 0.875rem;
    font-weight: 600;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.875rem;
  }
  ul a {
    color: var(--color-ink);
    text-decoration: none;
    transition: color var(--motion-fast) var(--ease-out-soft);
  }
  ul a:hover {
    color: var(--color-accent);
  }
  .footer-bottom {
    max-width: 64rem;
    margin: 2.5rem auto 0;
    padding-top: 1.5rem;
    border-top: 1px solid color-mix(in oklch, var(--color-border) 50%, transparent);
    color: var(--color-ink-muted);
    font-size: 0.8125rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }
  .dot {
    opacity: 0.5;
  }
  @media (max-width: 768px) {
    .footer-inner {
      grid-template-columns: 1fr 1fr;
    }
    .brand-col {
      grid-column: 1 / -1;
    }
  }
  @media (max-width: 480px) {
    .footer-inner {
      grid-template-columns: 1fr;
    }
  }
</style>
