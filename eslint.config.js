import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  prettier,
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        console: 'readonly',
        crypto: 'readonly',
        URL: 'readonly',
        Blob: 'readonly',
        globalThis: 'readonly',
        process: 'readonly',
        Storage: 'readonly',
        HTMLSelectElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLElement: 'readonly'
      }
    },
    plugins: { '@typescript-eslint': tseslint },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tsparser },
      globals: {
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        console: 'readonly',
        crypto: 'readonly',
        URL: 'readonly',
        Blob: 'readonly',
        globalThis: 'readonly',
        Storage: 'readonly',
        HTMLSelectElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLElement: 'readonly',
        HTMLAnchorElement: 'readonly',
        HTMLButtonElement: 'readonly',
        Event: 'readonly',
        CustomEvent: 'readonly',
        KeyboardEvent: 'readonly',
        MouseEvent: 'readonly'
      }
    },
    plugins: { svelte },
    rules: {
      ...svelte.configs.recommended.rules,
      'no-unused-vars': 'off',
      // Svelte 5 migration: deprecated on:event directives and state_referenced_locally
      // are warnings, not errors, until migration is complete.
      'svelte/valid-compile': ['warn', { ignoreWarnings: true }],
      // JSON-LD uses {@html} intentionally; content is sanitised via JSON.stringify.
      'svelte/no-at-html-tags': 'off',
      // Template literals that embed </script> need the escape.
      'no-useless-escape': 'off'
    }
  },
  {
    ignores: ['build/', '.svelte-kit/', 'src/paraglide/', 'node_modules/']
  }
];
