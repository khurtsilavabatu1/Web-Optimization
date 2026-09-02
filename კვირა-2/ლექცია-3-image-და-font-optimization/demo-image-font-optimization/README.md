# Image & Font Optimization Demo - Vite + React

ეს დემო პროექტი აჩვენებს სურათების და ფონტების ოპტიმიზაციის 5 ძირითად ტექნიკას React-ში.

## პროექტის სტრუქტურა

```
demo-image-font-optimization/
├── package.json              # პროექტის კონფიგურაცია
├── vite.config.js           # Vite კონფიგურაცია
├── setup.js                 # სურათებისა და ფონტების გენერატორი (Node.js script)
├── index.html               # Vite entry point
├── images/                  # გენერირებული სურათები (setup.js-ით)
├── fonts/                   # self-hosted ფონტები
├── public/                  # სტატიკური ფაილები (Vite-სთვის)
│   ├── images/             # სურათების ასლი
│   └── fonts/              # ფონტების ასლი
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # მთავარი კომპონენტი
    ├── App.css             # გლობალური სტილები
    └── components/
        ├── HeroPicture.jsx           # <picture> ელემენტი AVIF/WebP/JPG-სთვის
        ├── ResponsiveGallery.jsx     # srcset + sizes დემონსტრაცია
        ├── LazyImage.jsx             # lazy loading + Intersection Observer
        ├── FontDisplayDemo.jsx       # font-display ვარიანტების შედარება
        └── PerformanceMetrics.jsx    # Performance Observer API (LCP, FCP, TTFB)
```

## ოპტიმიზაციის ტექნიკები

### 1. `<picture>` ელემენტი (HeroPicture.jsx)
- AVIF, WebP, JPG ფორმატების მხარდაჭერა
- ბრაუზერი ავტომატურად აირჩევს საუკეთესო ფორმატს
- `fetchpriority="high"` hero სურათისთვის

### 2. Responsive Images (ResponsiveGallery.jsx)
- `srcset` ატრიბუტი სხვადასხვა ზომის ვერსიებისთვის (400w, 800w, 1200w)
- `sizes` ატრიბუტი viewport-ის მიხედვით
- ბრაუზერი აირჩევს ოპტიმალურ ზომას

### 3. Lazy Loading (LazyImage.jsx)
- Native `loading="lazy"` ატრიბუტი
- Intersection Observer API დამატებითი კონტროლისთვის
- სურათები იტვირთება მხოლოდ viewport-ში გამოჩენისას

### 4. Font Display (FontDisplayDemo.jsx)
- 4 ვარიანტის დემონსტრაცია: block, swap, fallback, optional
- FOIT vs FOUT განსხვავების ვიზუალიზაცია
- `font-display: swap` რეკომენდებულია

### 5. Self-hosted vs CDN ფონტები
- Self-hosted: ლოკალური WOFF2 ფაილი
- CDN: Google Fonts-დან ჩატვირთვა
- Network requests-ის შედარება

### 6. Performance Metrics (PerformanceMetrics.jsx)
- Performance Observer API გამოყენება
- LCP (Largest Contentful Paint)
- FCP (First Contentful Paint)
- TTFB (Time to First Byte)
- რეალურ დროში მონიტორინგი

## გაშვება

### 1. სურათებისა და ფონტების გენერაცია

პირველად გაშვებამდე უნდა გენერირდეს სურათები და ჩამოიტვირთოს ფონტები:

```bash
npm run setup
```

ეს script:
- ქმნის ფერად gradient სურათებს sharp ბიბლიოთეკით
- აგენერირებს JPEG, WebP და AVIF ვერსიებს
- hero-სთვის ქმნის responsive ვერსიებს (400w, 800w, 1200w)
- ჩამოტვირთავს Inter ფონტს Google Fonts-დან

### 2. Development სერვერი

```bash
npm run dev
```

გაიხსნება http://localhost:3000

### 3. Production Build

```bash
npm run build
```

Build ფაილები შეიქმნება `dist/` დირექტორიაში.

### 4. Preview Build

```bash
npm preview
```

## დამოკიდებულებები

### Runtime
- `react` - UI ბიბლიოთეკა
- `react-dom` - DOM rendering

### Development
- `vite` - Build tool და dev server
- `@vitejs/plugin-react` - React plugin Vite-სთვის
- `sharp` - სურათების გენერაციისა და კონვერტაციისთვის (setup.js)

## ტესტირება DevTools-ით

### სურათების ოპტიმიზაცია
1. DevTools → Network tab → "Img" ფილტრი
2. რომელი ფორმატი ჩაიტვირთა (AVIF, WebP, JPG)?
3. რა ზომის სურათი ჩაიტვირთა responsive gallery-ში?
4. lazy loading სურათები scroll-ზე იტვირთება?

### ფონტების ოპტიმიზაცია
1. DevTools → Network tab → "Font" ფილტრი
2. Network throttling: "Slow 3G"
3. Hard refresh (Cmd+Shift+R)
4. font-display ვარიანტების ქცევა

### Performance Metrics
1. DevTools → Performance tab
2. LCP, FCP, TTFB ნახეთ გვერდის ბოლოში
3. Lighthouse audit გაუშვით

## ძირითადი კონცეფციები

### Image Formats
- **AVIF**: ყველაზე თანამედროვე, უმაღლესი შეკუმშვა (80%+ დაზოგვა)
- **WebP**: ფართოდ მხარდაჭერილი, კარგი შეკუმშვა (60%+ დაზოგვა)
- **JPEG**: fallback ძველი ბრაუზერებისთვის

### Font Display
- **block**: ტექსტი უხილავია ფონტის ჩატვირთვამდე (FOIT)
- **swap**: მაშინვე სისტემური ფონტი, შემდეგ custom (FOUT) ✅ რეკომენდებული
- **fallback**: მოკლე ლოდინი, შემდეგ fallback
- **optional**: ფონტი optional-ია, performance პრიორიტეტია

### Core Web Vitals
- **LCP < 2.5s**: კარგი
- **FCP < 1.8s**: კარგი
- **TTFB < 800ms**: კარგი

## უკუღმართი თავსებადობა

პროექტი ინახავს ორიგინალურ setup.js script-სა და images/fonts დირექტორიებს.
public/ დირექტორია შეიცავს ასლებს, რათა Vite-მ სწორად მოემსახუროს სტატიკურ ფაილებს.
