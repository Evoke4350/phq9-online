<script lang="ts">
  import * as m from '$paraglide/messages';
</script>

<footer class="mt-16 border-t border-[color:var(--color-border)] py-8">
  <div class="mx-auto max-w-5xl px-4 text-sm text-[color:var(--color-ink-2)]">
    <p class="mb-2">{m.footer_disclaimer()}</p>
    <p>
      <a class="underline" href="/disclaimer">Disclaimer</a> ·
      <a class="underline" href="/privacy">Privacy</a> ·
      <a class="underline" href="/terms">Terms</a> ·
      <a class="underline" href="/contact">Contact</a> ·
      <a class="underline" href="https://github.com/nathanib/phq9-online">Source</a>
    </p>
    <p class="mt-2">© {new Date().getFullYear()} phq9.online · MIT licensed</p>
  </div>
</footer>
