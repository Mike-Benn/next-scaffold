import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),

  ...nextVitals,
  ...nextTs,

  // Type-aware rules — scoped to extensions tsconfig actually includes.
  // Don't widen this to .js/.mjs/.cjs or the TS project service will
  // error on files like this one (eslint.config.mjs isn't in the
  // app's tsconfig `include`).
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    extends: [tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
    },
  },

  // Plain JS config files (postcss.config.mjs etc.) — base rules only.
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended],
    languageOptions: { globals: { ...globals.node } },
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
    },
  },

  // Project conventions
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'import-x': (await import('eslint-plugin-import-x')).default,
    },
    rules: {
      'import-x/no-duplicates': 'error',
      'import-x/no-cycle': 'warn',
      'no-restricted-imports': ['error', { patterns: ['../**/'] }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'react/jsx-no-target-blank': 'error',
      'react/no-array-index-key': 'warn',
      'react/self-closing-comp': 'warn',
      'react/jsx-curly-brace-presence': ['warn', 'never'],
    },
  },

  // Server-only files — console logging is expected here
  {
    files: ['**/route.ts', 'middleware.ts', '**/*.actions.ts'],
    rules: { 'no-console': 'off' },
  },

  eslintConfigPrettier,
]);