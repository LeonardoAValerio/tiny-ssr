# Tiny-SSR

A minimalistic **Server-Side Rendering (SSR) framework** for Node.js, designed to dynamically render HTML pages using a component-like structure similar to front-end frameworks.  

This framework provides:

- **Widget system**: Build reusable HTML elements programmatically.
- **Page abstraction**: Define complete HTML pages with `<head>` and `<body>` content.
- **SSR server**: Serve static assets and precompiled pages automatically.

---

## Features

- Component-based page construction with `Widget` and `Page`.
- Automatic HTML string generation for server rendering.
- Lightweight HTTP server to handle SSR and static files.
- Supports dynamic routes and fallback 404 pages.

---

## Installation

```bash
npm install @leonardoavalerio/tiny-ssr
```

---

## Setup

After installing, you can run the following command to generate the default project configuration:

```bash
npx create-tiny-ssr
```

---

## Usage

1. Create a Page
Import the `Widget` and `Page` classes, and define the page structure:
```ts
import { Widget } from '@leonardoavalerio/tiny-ssr/lib/structure-components/widget';
import { Page } from '@leonardoavalerio/tiny-ssr/lib/structure-components/page';

export default new Page({
  title: 'My First Page',
  children: [
    new Widget({
      element: 'div',
      class: ['container'],
      children: [
        new Widget({
          element: 'h1',
          children: ['Hello, World!']
        }),
        new Widget({
          element: 'p',
          children: ['This is a server-rendered page.']
        })
      ]
    })
  ]
});
```

---

2. Start the SSR Server
Import `SSRServer` and configure it:
```ts
import { SSRServer } from "@leonardoavalerio/tiny-ssr/lib/server/index";

const server = new SSRServer({
  port: 3000,
  pagesDir: './dist/src/app', // path to compiled pages
  publicDir: './public'   // path to static assets
});

server.init();
```
- Serves static files from publicDir.
- Renders precompiled pages from pagesDir.
- Automatically falls back to a 404 page if a route is not found.

---

## Api

### `Widget`
**Properties:**
- `element: keyof HTMLElementTagNameMap` – HTML tag name.
- `attributes?: Record<string, string>` – Element attributes.
- `children?: WidgetContent[]` – Nested content (string or Widget).
- `class?: string[]` – CSS classes.
- `id?: string` – Element ID.
- `style?: Partial<CSSStyleDeclaration>` – Inline styles.

**Methods:**
- `build(): string` – Returns the HTML string representation of the widget and its children.

### `Page`
**Properties:**
- `title: string` – Page title.
- `children: WidgetContent[]` – Body content.
- `headers?: WidgetContent[]` – Optional <head> content.

**Methods:**
- `build(): string` – Returns the full HTML page with DOCTYPE, <html>, <head>, and <body>.

### `SSRServer`
**Properties:**
- `port: number` – Port for the server.
- `pagesDir: string` – Directory with precompiled pages.
- `publicDir: string` – Directory with static assets.

**Methods:**
- `init(): void` – Starts the HTTP server for SSR.

---

## Folder Structure

```bash
/dist/src/app         # Compiled page modules
/public           # Static assets
/src/
    index.ts # SSRServer class
    /app # Pages
    /componentes # Components
README.md
```

---

## Licence
MIT © Leonardo Augusto Valério