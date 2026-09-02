# Browser Feature Detector

Vite + React აპლიკაცია, რომელიც ამოწმებს ბრაუზერის მხარდაჭერას თანამედროვე JavaScript, CSS და Web APIs-თვის.

## მახასიათებლები

### Browser Detection
- ამოწმებს ბრაუზერ engine-ს (Blink / Gecko / WebKit)
- აჩვენებს ბრაუზერს და ვერსიას
- აჩვენებს პლატფორმას

### Feature Categories

**თანამედროვე JavaScript (7 features)**
- Optional Chaining (`?.`)
- Nullish Coalescing (`??`)
- Promise.allSettled()
- Top-level await
- Array.at()
- structuredClone()
- Object.hasOwn()

**თანამედროვე CSS (6 features)**
- Container Queries
- :has() Selector
- color-mix()
- CSS Nesting
- @layer
- Subgrid

**თანამედროვე Browser APIs (6 features)**
- Web Share API
- View Transitions API
- Navigation API
- Popover API
- `<dialog>` Element
- @starting-style

## პროექტის სტრუქტურა

```
demo-browser-features/
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── main.jsx           # Entry point
    ├── App.jsx            # Main component with feature detection logic
    ├── App.css            # Global styles (dark theme)
    └── components/
        ├── BrowserInfo.jsx       # Browser engine & version display
        ├── FeatureCategory.jsx   # Feature category section
        ├── FeatureCard.jsx       # Individual feature card with toggle
        └── CodeExample.jsx       # Expandable code examples
```

## გაშვება

```bash
# დაინსტალირება
npm install

# Development სერვერი
npm run dev

# Production build
npm run build

# Preview production build
npm preview
```

## ტექნოლოგიები

- **React 18** - UI ბიბლიოთეკა
- **Vite 6** - Build tool და dev server
- **CSS Custom Properties** - Dark theme
- **Feature Detection APIs** - CSS.supports(), უშუალო ტესტები

## UI Features

- ✅ Dark პროფესიული თემა
- ✅ Green/Red ინდიკატორები supported/unsupported features-ისთვის
- ✅ Expandable კოდის მაგალითები
- ✅ Responsive დიზაინი
- ✅ Georgian ენა UI-სთვის
- ✅ Real-time feature detection
