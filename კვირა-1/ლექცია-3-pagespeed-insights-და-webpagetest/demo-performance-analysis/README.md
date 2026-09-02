# TechStore — არაოპტიმიზირებული React Demo

ეს არის **განზრახ არაოპტიმიზირებული** e-commerce აპლიკაცია, რომელიც შექმნილია PageSpeed Insights-ისა და WebPageTest-ის ანალიზისთვის.

## მიზანი

სტუდენტები უნდა გაანალიზონ ეს აპლიკაცია performance ინსტრუმენტებით და აღმოაჩინონ პრობლემები.

## პრობლემების სია

### HTML/Meta პრობლემები
- ❌ არ არის `lang`, `charset`, `viewport` meta tags
- ❌ არ არის `description` meta tag
- ❌ არა-სემანტიკური HTML (div-ები header/main/footer-ის მაგივრად)
- ❌ Accessibility პრობლემები (არ არის labels, low contrast)

### CSS პრობლემები
- ❌ Render-blocking CSS from CDN (animate.css, font-awesome)
- ❌ `@import` CSS-ში (დამატებითი render-blocking request)
- ❌ `font-display: block` (invisible text)
- ❌ მძიმე ანიმაციები box-shadow-ით (triggers expensive paint)
- ❌ Continuous animations (wastes CPU/battery)
- ❌ გამოუყენებელი CSS (dead code)
- ❌ არ არის responsive design

### JavaScript/React პრობლემები
- ❌ არ არის code splitting
- ❌ 2-second artificial delay in `useEffect` (Long Task)
- ❌ Heavy calculations on every render (არ არის `useMemo`)
- ❌ Heavy calculations on user interactions (hover, click, scroll)
- ❌ Scroll listener without debounce
- ❌ Forced reflows (reading layout properties in scroll handler)
- ❌ Search without debounce (heavy calc on every keystroke)
- ❌ Rendering 200 products at once (no pagination/virtualization)
- ❌ არ არის `React.memo` — ყველა component re-renders
- ❌ არ არის `useCallback` — event handlers recreated on every render
- ❌ Inline styles computed on every render
- ❌ Continuous `setInterval` wasting CPU
- ❌ არ არის `StrictMode`

### Image პრობლემები
- ❌ Large unoptimized images from picsum.photos
- ❌ არ არის `width`/`height` attributes (causes CLS)
- ❌ არ არის `loading="lazy"`
- ❌ არ არის modern formats (WebP, AVIF)

### Layout Shift (CLS) პრობლემები
- ❌ Loading screen without skeleton (empty → full content)
- ❌ Dynamic promo banner injection after 2.5s
- ❌ Dynamic stats injection after 1s
- ❌ Images without dimensions
- ❌ Hero section without fixed height

### Other პრობლემები
- ❌ Console errors (simulated)
- ❌ No error boundary
- ❌ No loading states

## დაყენება და გაშვება

\`\`\`bash
# Dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
\`\`\`

## რას უნდა აანალიზონ სტუდენტებმა?

1. **Chrome DevTools**
   - Performance tab — Long Tasks, Layout Shifts
   - Coverage tab — Unused CSS/JS
   - Network tab — Render-blocking resources
   - Lighthouse — Core Web Vitals

2. **PageSpeed Insights**
   - Performance score
   - FCP, LCP, CLS, TBT metrics
   - Opportunities და Diagnostics

3. **WebPageTest**
   - Waterfall chart
   - Visual Progress
   - Speed Index

## პროექტის სტრუქტურა

\`\`\`
demo-performance-analysis/
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── main.jsx          # Entry point (no StrictMode)
    ├── App.jsx           # Main app (heavy calculations, CLS)
    ├── App.css           # Unoptimized CSS with animations
    └── components/
        ├── Hero.jsx          # Large images, inline styles
        ├── ProductGrid.jsx   # 200 products, no memo, no debounce
        ├── ProductCard.jsx   # Heavy calc on render, hover
        ├── Features.jsx      # Unnecessary DOM nesting
        ├── Newsletter.jsx    # Accessibility issues
        └── Footer.jsx        # Low contrast text
\`\`\`

## შენიშვნა

**ეს აპლიკაცია განზრახ არის ცუდად დაწერილი!** არ გამოიყენოთ როგორც მაგალითი რეალურ პროექტებში.
