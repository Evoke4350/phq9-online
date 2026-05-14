<script lang="ts">
  import * as m from '$paraglide/messages';
</script>

<aside role="alert" aria-live="assertive" class="rounded-lg border-2 border-[color:var(--color-crisis)] bg-[color:var(--color-base-2)] p-4 mb-6">
  <h2 class="text-lg font-semibold text-[color:var(--color-crisis-2)]">{m.crisis_banner_title()}</h2>
  <ul class="mt-3 space-y-1 text-sm">
    <li>{m.crisis_banner_us_988()}</li>
    <li>{m.crisis_banner_uk_samaritans()}</li>
    <li>{m.crisis_banner_canada_988()}</li>
    <li>{m.crisis_banner_iceland_pieta()}</li>
    <li><a class="underline" href="/crisis">{m.crisis_banner_intl_link()}</a></li>
  </ul>
</aside>
