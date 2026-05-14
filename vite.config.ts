import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    paraglide({
      project: './project.inlang',
      outdir: './src/paraglide'
    }),
    sveltekit()
  ],
  define: {
    // Make PUBLIC_ENABLE_ADS available as a build-time constant so code that
    // cannot use $env/static/public (e.g. plain .ts modules) can still read it.
    __PUBLIC_ENABLE_ADS__: JSON.stringify(process.env.PUBLIC_ENABLE_ADS ?? 'false')
  },
  test: { include: ['tests/unit/**/*.{test,spec}.{js,ts}'] }
});
