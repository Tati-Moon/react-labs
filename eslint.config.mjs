import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  {
    ignores: [
      '**/node_modules/*',
      '**/out/*',
      '**/.next/*',
      '**/coverage',
      '**/*.test.*',
    ],
  },
  ...compat.config({
    extends: [
      'eslint:recommended',
      'prettier',
      'next',
      'next/core-web-vitals',
      'next/typescript',
    ],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      'jest/expect-expect': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-undef': 'warn',
      'object-shorthand': ['warn'],
      'react/react-in-jsx-scope': 'off',
      '@next/next/no-img-element': 'off',
    },
    globals: { React: true },
  }),
];

export default eslintConfig;
