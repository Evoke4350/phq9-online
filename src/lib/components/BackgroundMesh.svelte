<div class="mesh" aria-hidden="true">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 800"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <radialGradient id="mesh-a" cx="20%" cy="20%" r="40%">
        <stop offset="0%" stop-color="var(--color-accent)" stop-opacity="0.55" />
        <stop offset="100%" stop-color="var(--color-accent)" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="mesh-b" cx="80%" cy="40%" r="45%">
        <stop offset="0%" stop-color="var(--color-highlight)" stop-opacity="0.35" />
        <stop offset="100%" stop-color="var(--color-highlight)" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="mesh-c" cx="50%" cy="95%" r="55%">
        <stop offset="0%" stop-color="var(--color-accent-soft)" stop-opacity="0.4" />
        <stop offset="100%" stop-color="var(--color-accent-soft)" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="1200" height="800" fill="url(#mesh-a)" />
    <rect width="1200" height="800" fill="url(#mesh-b)" />
    <rect width="1200" height="800" fill="url(#mesh-c)" />
  </svg>
</div>

<style>
  .mesh {
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    filter: blur(80px) saturate(1.1);
    opacity: 0.7;
  }
  .mesh svg {
    width: 100%;
    height: 100%;
  }
</style>
