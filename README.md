# ვებგვერდის ოპტიმიზაცია — კურსის მასალები

## მოდულის მოცულობა
- **კრედიტები:** 3
- **ხანგრძლივობა:** 5 კვირა × 4 ლექცია = **20 ლექცია** (75 საათი)
- **საკონტაქტო:** 50 სთ | **დამოუკიდებელი:** 20 სთ | **შეფასება:** 5 სთ

---

## კვირების და ლექციების განაწილება

### კვირა 1 — ვებ წარმადობის ანალიზი და გაზომვის ინსტრუმენტები
| # | ლექცია | თემა |
|---|--------|------|
| 1 | ლექცია 1 | რა არის Web Performance + Core Web Vitals (LCP, INP, CLS) |
| 2 | ლექცია 2 | Google Lighthouse — აუდიტი, ქულები, ანგარიშის კითხვა |
| 3 | ლექცია 3 | PageSpeed Insights (Lab+Field) + WebPageTest (Waterfall) |
| 4 | ლექცია 4 | Chrome DevTools Performance Tab + Coverage + პრაქტიკა |

### კვირა 2 — ოპტიმიზაციის ტექნიკები და რესურსების ჩატვირთვა
| # | ლექცია | თემა |
|---|--------|------|
| 5 | ლექცია 1 | Code Splitting — React.lazy, dynamic import, Tree Shaking |
| 6 | ლექცია 2 | Minification (Terser, esbuild) + Compression (Gzip, Brotli) |
| 7 | ლექცია 3 | Image Optimization (WebP, AVIF, lazy loading) + Fonts |
| 8 | ლექცია 4 | CSS/JS ჩატვირთვის ოპტიმიზაცია (Critical CSS, async/defer, Resource Hints) + პრაქტიკა |

### კვირა 3 — Debugging-ის საფუძვლები
| # | ლექცია | თემა |
|---|--------|------|
| 9 | ლექცია 1 | Debugging-ის კონცეფცია + შეცდომების 3 ტიპი (Syntax, Runtime, Logic) |
| 10 | ლექცია 2 | Chrome DevTools: Elements Panel + Console API |
| 11 | ლექცია 3 | Sources Panel + Network Panel (HTTP Status Codes, Throttling) |
| 12 | ლექცია 4 | Breakpoints (6 ტიპი) + Step-by-Step Debugging + პრაქტიკა |

### კვირა 4 — მოწინავე Debugging
| # | ლექცია | თემა |
|---|--------|------|
| 13 | ლექცია 1 | VS Code Debugger + React DevTools (Components, Profiler) |
| 14 | ლექცია 2 | Re-render Prevention (memo, useMemo, useCallback) + Network/CORS Debugging |
| 15 | ლექცია 3 | Memory Leaks (3 ტიპი React-ში) + Error Boundaries |
| 16 | ლექცია 4 | Source Maps + React Error Reference + Debugging Challenge პრაქტიკა |

### კვირა 5 — Cross-Browser თავსებადობა
| # | ლექცია | თემა |
|---|--------|------|
| 17 | ლექცია 1 | Rendering Engines + caniuse.com + Browserslist |
| 18 | ლექცია 2 | CSS თავსებადობა: Vendor Prefixes, Autoprefixer, @supports, CSS Reset |
| 19 | ლექცია 3 | JS თავსებადობა: Babel, Polyfills, Feature Detection, Progressive Enhancement |
| 20 | ლექცია 4 | ტესტირების ინსტრუმენტები (BrowserStack, Responsinator, Screenfly) + პრაქტიკა |

---

## პრაქტიკული პროექტები

| # | პროექტი | კვირა | აღწერა |
|---|---------|-------|--------|
| 1 | ნელი ვებგვერდის ოპტიმიზაცია | 1-2 | React აპი 10+ performance პრობლემით — აუდიტი და ოპტიმიზაცია |
| 2 | Debugging Challenge | 3-4 | Todo + Shopping Cart 10 ბაგით — DevTools-ით პოვნა |
| 3 | Cross-Browser Landing Page | 5 | HTML/CSS თავსებადობის პრობლემებით — fallbacks და testing |

## სტუდენტის დავალებები

| # | დავალება | კვირა | სტრუქტურა |
|---|---------|-------|-----------|
| 1 | Performance აუდიტი | 1-2 | 4 ნაწილი: Core Web Vitals → Lighthouse → Waterfall → ოპტიმიზაცია |
| 2 | Debugging | 3-4 | 4 ნაწილი: JS ბაგები → Console/Elements → Network → React/Memory |
| 3 | Cross-browser ტესტირება | 5 | 4 ნაწილი: caniuse → CSS @supports → JS polyfills → Device testing |

---

## ფაილების სტრუქტურა

```
კვირა-1/
  ლექცია-1/კონსპექტი.md      → Web Performance + Core Web Vitals
  ლექცია-2/კონსპექტი.md      → Google Lighthouse
  ლექცია-3/კონსპექტი.md      → PageSpeed Insights + WebPageTest
  ლექცია-4/კონსპექტი.md      → Chrome DevTools Performance Tab + Coverage

კვირა-2/
  ლექცია-1/კონსპექტი.md      → Code Splitting (React.lazy, dynamic import, Tree Shaking)
  ლექცია-2/კონსპექტი.md      → Minification + Compression (Gzip, Brotli)
  ლექცია-3/კონსპექტი.md      → Image Optimization + Fonts
  ლექცია-4/კონსპექტი.md      → CSS/JS ჩატვირთვის ოპტიმიზაცია (Critical CSS, async/defer)

კვირა-3/
  ლექცია-1/კონსპექტი.md      → Debugging კონცეფცია + შეცდომების 3 ტიპი
  ლექცია-2/კონსპექტი.md      → Chrome DevTools: Elements + Console API
  ლექცია-3/კონსპექტი.md      → Sources Panel + Network Panel
  ლექცია-4/კონსპექტი.md      → Breakpoints (6 ტიპი) + Step Debugging

კვირა-4/
  ლექცია-1/კონსპექტი.md      → VS Code Debugger + React DevTools
  ლექცია-2/კონსპექტი.md      → Re-render Prevention + Network/CORS Debugging
  ლექცია-3/კონსპექტი.md      → Memory Leaks + Error Boundaries
  ლექცია-4/კონსპექტი.md      → Source Maps + Debugging Challenge

კვირა-5/
  ლექცია-1/კონსპექტი.md      → Rendering Engines + caniuse + Browserslist
  ლექცია-2/კონსპექტი.md      → CSS თავსებადობა: Vendor Prefixes, @supports, CSS Reset
  ლექცია-3/კონსპექტი.md      → JS თავსებადობა: Babel, Polyfills, Feature Detection
  ლექცია-4/კონსპექტი.md      → ტესტირების ინსტრუმენტები + პრაქტიკა

პრაქტიკული-პროექტები/        → 3 მინი-პროექტი (კოდით)
დავალებები/                   → 3 დავალება (4 ნაწილიანი)
```
