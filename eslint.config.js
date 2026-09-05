// @ts-check
import eslint from '@eslint/js';
import angular from 'angular-eslint';
import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['**/*.ts'],
    plugins: {
      import: importPlugin,
    },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      eslintPluginPrettierRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      'import/order': [
        'error',
        {
          'newlines-between': 'always-and-inside-groups',
          groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'],
          pathGroups: [
            {
              pattern: '@angular/**',
              group: 'external',
            },
            {
              pattern: '(rxjs|rxjs/**)',
              group: 'external',
            },
            {
              pattern: '@core/**',
              group: 'internal',
            },
            {
              pattern: '@shared/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['type', 'object'],
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {},
  }
);