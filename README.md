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

3. Set up ESLint and Prettier

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
<details>
<summary>
## TASK 2: React Routing. Tests.
</summary>

Link: https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/routing.md

## Implemented Features

### Component Refactoring and Hooks

- **Converted all class components into functional components except the Error Boundary component.**
- **Created a custom hook to restore the search query from local storage.**
- **Used appropriate React lifecycle hooks.**
- **Ensured state management was handled within individual components.**

### Routing

- **Implemented routing using React Router in SPA (non-SSR) mode.**
- **Added a 404 page for non-existing routes.**

### Pagination

- **Implemented pagination for the existing item list (search results).**
- **Updated the browser URL with the current page using query parameters.**
- **Ensured the pagination component appears after receiving the full list of items.**

### Search and Item Details Display

- Configured the main page to display search results.
- On item click, the page was split into two sections:
  - The left section continued to display search results.
  - The right section displayed item details using Router Outlet.
- Added a loading indicator while fetching additional details.
- Implemented a close button for the details section.
- Allowed closing the details section by clicking on the left section.
- Reflected the state of the opened details section in the URL (e.g., /?frontpage=2&details=1).

### Testing

- Configured Jest as the test runner.
- Ensured the test runner displayed test coverage.
- Achieved at least 70% test coverage (excluding App.tsx).
- Included only .tsx files in coverage.
- Integrated React Testing Library for component testing.

### Installation of Dependencies

To set up routing, the following library was installed:

```bash
npm install react-router-dom
```

The following packages were installed for testing:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom ts-jest jest-environment-jsdom identity-obj-proxy
```

## Branching and Development Workflow

All changes were implemented in a dedicated branch:

```bash
git checkout -b hooks-and-routing
```

</details>

<details>
<summary>
## TASK 3: Redux. Redux Toolkit, RTK Query. Context api.
</summary>

Link: https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/redux.md

## Theme Management (Context API)

To implement a custom theme selection feature, the following changes were made:

- **Created `ThemeProvider` and `ThemeContext`** to manage the application's theme.
- **Added a theme selection option** theme button to allow users to switch between light and dark themes.
- **Ensured the selected theme applies to the entire application** by wrapping the app with `ThemeProvider`.

### Installation of Dependencies

To support dynamic theming, Redux state management, and API requests, the following libraries were installed:

```bash
npm install classnames
npm install @reduxjs/toolkit axios react-redux
```

### Purpose of Installed Packages

- **`classnames`** – Used for conditionally applying CSS class names based on the selected theme.
- **`@reduxjs/toolkit`** – Integrated Redux into the application, including setting up the store and reducers.
- **`axios`** – Used for making API requests to fetch data.
- **`react-redux`** – Provided React bindings for Redux to connect components with the store.

## Redux State Management

To implement item selection and management using Redux, the following changes were made:

- **Each item in the dashboard now has a checkbox** to allow selection.
- **Selected items are stored in the Redux store**, ensuring persistence across page navigations.
- **Unselecting an item removes it from the store** dynamically.
- **A flyout panel appears when at least one item is selected**, displaying the total number of selected items and providing two actions:
  - **"Unselect all"** – Clears all selections and hides the flyout.
  - **"Download"** – Exports the list of selected items to a `.csv` file.

## RTK Query Integration

RTK Query was implemented to optimize API interactions:

- **Replaced direct API calls with RTK Query**, improving caching and reducing redundant requests.
- **Implemented a loading state in the store**, ensuring smooth UI updates without prop-drilling.
- **Stored API responses in Redux**, maintaining the current page’s data.

## Branching and Development Workflow

All changes were implemented in a dedicated branch:

```bash
git checkout -b app-state-management
```

</details>

<details>
<summary>
## TASK 4: Next.js. Server Side Rendering
</summary>

Task: https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/nextjs-ssr-ssg.md

Doc: https://nextjs.org/docs/app/building-your-application/upgrading/from-vite

## Why Switch?

There are several reasons why you might want to switch from Vite to Next.js:

### Data Fetching Strategy

With Next.js, you can choose your data fetching strategy per page or component. You can fetch data at build time, on the server at request time, or on the client. For example, you can fetch CMS data and render blog posts at build time, which will be efficiently cached on a CDN.

### Middleware

Next.js Middleware allows you to run code on the server before a request is completed. This can be helpful for features like user authentication or internationalization.

### Built-in Optimizations

Next.js comes with built-in optimizations for images, fonts, and third-party scripts, helping improve application performance.

---

## Migration Steps

The goal of this migration is to transition your app to Next.js as smoothly as possible, starting with a purely client-side application (SPA). We'll also avoid migrating your existing router initially to minimize issues and reduce merge conflicts.

### Step 1: Install the Next.js Dependency

First, install Next.js as a dependency:

```bash
npm install next@latest
```

### Step 2: Create the Next.js Configuration File

Create a `next.config.mjs` file at the root of your project:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Outputs a Single-Page Application (SPA).
  distDir: './dist', // Changes the build output directory to `./dist/`.
};

export default nextConfig;
```

### Step 3: Update TypeScript Configuration

If you're using TypeScript, update your `tsconfig.json` file with the following changes to make it compatible with Next.js. If not, you can skip this step.

- Remove the project reference to `tsconfig.node.json`
- Add `./dist/types/**/*.ts` and `./next-env.d.ts` to the `include` array
- Add `./node_modules` to the `exclude` array
- Add `{ "name": "next" }` to the `plugins` array
- Set `esModuleInterop` to `true`
- Set `jsx` to `preserve`
- Set `allowJs` to `true`
- Set `forceConsistentCasingInFileNames` to `true`
- Set `incremental` to `true`

Example `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "allowJs": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "plugins": [{ "name": "next" }]
  },
  "include": ["./src", "./dist/types/**/*.ts", "./next-env.d.ts"],
  "exclude": ["./node_modules"]
}
```

### Step 4: Create the Root Layout

Next.js requires a root layout file, which is a React Server Component that wraps all pages. This is similar to `index.html` in Vite.

Create the following files:

1. **`src/app/layout.tsx`**:

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <title>My App</title>
        <meta name="description" content="My App is a..." />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
```

2. Move relevant metadata files (e.g., favicon, robots.txt) into the `app` directory and remove `<link>` tags.

3. Use the `Metadata` API for managing head content:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My App',
  description: 'My App is a...',
};
```

### Step 5: Create the Entrypoint Page

In Next.js, the entrypoint is a page declared via `page.tsx`. We will configure a catch-all route.

1. Create a directory `app/[[...slug]]/` and inside it, create `page.tsx`:

```tsx
import '../../index.css';

export function generateStaticParams() {
  return [{ slug: [''] }];
}

export default function Page() {
  return '...';
}
```

2. Create a `client.tsx` for running the Vite application in Next.js as a client-side app:

```tsx
'use client';

import dynamic from 'next/dynamic';

const App = dynamic(() => import('../../App'), { ssr: false });

export function ClientOnly() {
  return <App />;
}
```

3. Update `page.tsx` to render the client-only component:

```tsx
import '../../index.css';
import { ClientOnly } from './client';

export function generateStaticParams() {
  return [{ slug: [''] }];
}

export default function Page() {
  return <ClientOnly />;
}
```

### Step 6: Update Static Image Imports

Next.js handles static images differently from Vite. Update your image imports:

1. **Before**:

```tsx
import image from './img.png';
```

2. **After**:

```tsx
import image from '../public/img.png';

<img src={image.src} />;
```

### Step 7: Migrate Environment Variables

- Change all `VITE_` variables to `NEXT_PUBLIC_`.
- Replace `import.meta.env.MODE` with `process.env.NODE_ENV`.
- Replace `import.meta.env.PROD` with `process.env.NODE_ENV === 'production'`.
- Replace `import.meta.env.SSR` with `typeof window !== 'undefined'`.

### Step 8: Update Scripts in `package.json`

Update your `scripts` to use Next.js commands:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

And update `.gitignore`:

```
.next
next-env.d.ts
dist
```

### Step 9: Clean Up

Remove Vite-related files from your project:

- Delete `main.tsx`
- Delete `index.html`
- Delete `vite-env.d.ts`
- Delete `vite.config.ts`
- Uninstall Vite dependencies

Removing vite

```bash
npm uninstall vite @vitejs/plugin-react react-router-dom
```

Install SASS

```bash
 npm i sass
```

## Next Steps

Now that your Next.js app is up and running, you can start leveraging additional features:

- Migrate from React Router to Next.js App Router for automatic code splitting, server-side rendering, and React Server Components.
- Optimize images and fonts with Next.js built-in components.
- Use Next.js's built-in components for third-party scripts optimization.
- Update your ESLint configuration to support Next.js rules.

This concludes the initial migration process from Vite to Next.js.

</details>
