import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: true,
      strict: true
    }),
    prerender: { handleHttpError: 'fail', handleMissingId: 'fail' },
    alias: { $lib: 'src/lib', $paraglide: 'src/paraglide' }
  }
};
