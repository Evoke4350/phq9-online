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
  test: { include: ['tests/unit/**/*.{test,spec}.{js,ts}'] }
});
