# Babel & Polyfills Demo

Interactive demonstration of Babel transpilation and JavaScript polyfills built with Vite + React.

## Features

### Section 1: Babel Transpilation
Side-by-side comparison of modern ES2015+ code and **live** Babel output.

The right-hand panel is generated in the browser by `@babel/standalone` — it is
not pre-written text. A target picker (ES5 / Safari 12 / modern) re-runs the
transform so you can watch the output change with `targets`.

Examples covered:
- Arrow Functions
- Destructuring
- Template Literals
- Async/Await
- Optional Chaining
- Nullish Coalescing
- Class Fields
- Private Methods

### Section 2: Polyfills
Interactive demos of modern JavaScript APIs with polyfill implementations:
- `Array.prototype.at()`
- `Object.hasOwn()`
- `structuredClone()`
- `Array.prototype.findLast()`
- `Promise.withResolvers()`
- `String.prototype.replaceAll()`

Each polyfill includes:
- Implementation code
- "Run Example" button with interactive demo
- Native browser support detection

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Produces **two bundles** via `@vitejs/plugin-legacy`:

```
dist/assets/index-*.js              ← modern, <script type="module">
dist/assets/polyfills-*.js          ← modern polyfills
dist/assets/index-legacy-*.js       ← legacy, <script nomodule>
dist/assets/polyfills-legacy-*.js   ← core-js + regenerator + SystemJS
```

Each browser downloads **one** set, never both — `type="module"` and `nomodule`
are mutually exclusive.

```bash
npm run bundles    # compare modern vs legacy sizes + show <script> tags
```

## რა არის რა (ქართულად)

| ფაილი | როლი |
|---|---|
| `vite.config.js` | `@vitejs/plugin-react` (Babel → JSX/Fast Refresh) + `@vitejs/plugin-legacy` (preset-env + core-js) |
| `package.json` → `browserslist` | სამიზნე ბრაუზერები |
| `scripts/show-bundles.mjs` | `npm run bundles` — modern vs legacy შედარება |
| `src/components/TranspilationDemo.jsx` | ცოცხალი Babel `@babel/standalone`-ით |

> ⚠️ `@babel/standalone` (~3 MB) **მხოლოდ ამ დემოს** სჭირდება — ბრაუზერში
> ტრანსპილაციის საჩვენებლად. ნამდვილ პროექტში Babel build-დროს მუშაობს და
> ბანდლში არ ხვდება. აქ dynamic import-ით ცალკე lazy chunk-ად გამოდის, რომ
> მთავარი ბანდლი არ დაამძიმოს.

> ⚠️ **Vite-ის ვერსია**: `@vitejs/plugin-legacy@8` Vite 8-ს ითხოვს. ეს პროექტი
> Vite 5-ზეა, ამიტომ `@vitejs/plugin-legacy@^5.4.3` აქვს.

## Preview

```bash
npm run preview
```

## Technology Stack

- React 18.3
- Vite 5.3
- `@vitejs/plugin-legacy` — @babel/preset-env + core-js + SystemJS legacy bundle
- `@babel/standalone` — live in-browser transpilation (demo only)
- Dark professional theme with Georgian UI text
