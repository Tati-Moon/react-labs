# school-react-course-tasks

<details>
<summary>
## TASK 1: React project setup. Class components. Error boundary.
</summary>

Link: https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/class-components.md

This project is a React application built using Vite, TypeScript, and modern development tools like ESLint, Prettier, and Husky. It follows best practices for code quality, formatting, and Git hooks.

## Features

- **React with TypeScript: Type-safe React components.**
- **Vite: Fast development server and build tool.**
- **ESLint: Static code analysis for catching errors and enforcing coding standards.**
- **Prettier: Automated code formatting for consistent style.**
- **Husky: Git hooks for running linting and formatting before commits.**
- **Error Boundary: Graceful error handling with a fallback UI.**
- **Local Storage Integration: Persists search terms across sessions.**
- **API Integration: Fetches data from a RESTful API (e.g., PokeAPI, SWAPI).**

## Setup

### Steps

1. Setup Node.js
2. Install vite & run NPM install

```bash
npm create vite@latest rs-react-app -- --template react-ts
cd rs-react-app
npm install
npm run dev
```

3. Set up ESLint и Prettier

```bash
npm install -D eslint-plugin-react eslint-plugin-prettier eslint-config-prettier eslint-plugin-react-compiler@beta
npm install -D --save-exact prettier
```

Add a new file .prettierrc to the root of the project:

```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```

Update file eslint.config.js

```js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import reactCompiler from 'eslint-plugin-react-compiler';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      eslintPluginPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-compiler': reactCompiler,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react-compiler/react-compiler': 'error',
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
);
```

4. Husky Setup

```bash
npm install --save-dev husky
npx husky init
npx husky add .husky/pre-commit "npm run lint"
```

5. Add package.json commands:

```json
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --fix",
    "format:fix": "prettier --write .",
    "prepare": "husky install"
```

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── Search.tsx
│   │   ├── CardList.tsx
│   │   ├── Card.tsx
│   │   └── ErrorBoundary.tsx
│   ├── App.tsx
│   └── main.tsx
├── .eslintrc.js
├── .prettierrc
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

## Template

Successful response.

```
+-------------------------------------------------------+
|                                                       |
|  +------------------ Top controls ------------------+ |
|  | +--------------------------+ +-----------------+ | |
|  | | [Search Input Field]     | | [Search Button] | | |
|  | +--------------------------+ +-----------------+ | |
|  +--------------------------------------------------+ |
|                                                       |
|  +-------------------- Results ---------------------+ |
|  | +----------------------------------------------+ | |
|  | | Item Name  | Item Description                | | |
|  | +----------------------------------------------+ | |
|  | | [Item 1]   | [Description 1]                 | | |
|  | | [Item 2]   | [Description 2]                 | | |
|  | | ...        | ...                             | | |
|  +--------------------------------------------------+ |
|                                       [Error Button]  |
+-------------------------------------------------------+
```

Non-successful response.

```
+-------------------------------------------------------+
|                                                       |
|  +------------------ Top controls ------------------+ |
|  | +--------------------------+ +-----------------+ | |
|  | | [Search Input Field]     | | [Search Button] | | |
|  | +--------------------------+ +-----------------+ | |
|  +--------------------------------------------------+ |
|                                                       |
|  +-------------------- Results ---------------------+ |
|  |                                                  | |
|  |                 Error description                | |
|  |                                                  | |
|  +--------------------------------------------------+ |
|                                       [Error Button]  |
+-------------------------------------------------------+
```

</details>
