# Babel & Polyfills Demo

Interactive demonstration of Babel transpilation and JavaScript polyfills built with Vite + React.

## Features

### Section 1: Babel Transpilation
Side-by-side comparison of modern ES2015+ code and transpiled ES5 code:
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

## Preview

```bash
npm run preview
```

## Technology Stack

- React 18.3
- Vite 5.3
- Dark professional theme with Georgian UI text
