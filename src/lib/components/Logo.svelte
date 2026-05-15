<script lang="ts">
  let { size = 28, variant = 'full' } = $props<{
    size?: number;
    variant?: 'full' | 'mark';
  }>();
  const gradId = `logo-grad-${Math.random().toString(36).slice(2, 8)}`;
</script>

{#if variant === 'mark'}
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--color-accent)" />
        <stop offset="100%" stop-color="var(--color-accent-soft)" />
      </radialGradient>
    </defs>
    <circle cx="22" cy="22" r="14" fill="url(#{gradId})" opacity="0.9" />
    <circle cx="42" cy="22" r="14" fill="url(#{gradId})" opacity="0.9" />
    <circle cx="22" cy="42" r="14" fill="url(#{gradId})" opacity="0.9" />
    <circle cx="42" cy="42" r="14" fill="url(#{gradId})" opacity="0.9" />
  </svg>
{:else}
  <span
    class="inline-flex items-center gap-2 font-semibold"
    style="font-family: var(--font-display); letter-spacing: -0.02em;"
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--color-accent)" />
          <stop offset="100%" stop-color="var(--color-accent-soft)" />
        </radialGradient>
      </defs>
      <circle cx="22" cy="22" r="14" fill="url(#{gradId})" opacity="0.9" />
      <circle cx="42" cy="22" r="14" fill="url(#{gradId})" opacity="0.9" />
      <circle cx="22" cy="42" r="14" fill="url(#{gradId})" opacity="0.9" />
      <circle cx="42" cy="42" r="14" fill="url(#{gradId})" opacity="0.9" />
    </svg>
    <span>phq9<span style="color: var(--color-accent);">.</span>online</span>
  </span>
{/if}
