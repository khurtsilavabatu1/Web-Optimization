# Build Optimization — ეტაპობრივი გაიდი

ამ პრაქტიკაში ნახავთ, როგორ მოქმედებს **Minification**, **Source Maps** და **Compression** საბოლოო bundle-ის ზომასა და debugging-ის შესაძლებლობებზე.

ჩვენ გვაქვს ერთი პროექტი — `demo-build-optimization/`. სტუდენტები `vite.config.js`-ის პარამეტრებს ცვლიან და ხედავენ სხვაობას.

---

## წინაპირობა: პროექტის გაშვება

```bash
cd ~/Desktop/Web-optimization/კვირა-2/ლექცია-2-build-tools-minification-და-compression/demo-build-optimization
npm install
```

დარწმუნდით რომ მუშაობს:

```bash
npm run dev
```

გახსენით `http://localhost:3000` — ნახავთ იგივე აპს, რაც ლექცია 1-ში გამოვიყენეთ.

გაჩერეთ dev სერვერი (`Ctrl+C`) და გავაგრძელოთ.

---

## ეტაპი 1: Minification-ის ეფექტი

Minification კოდიდან ზედმეტ სიმბოლოებს შლის — spaces, comments, გრძელ ცვლადის სახელებს.

### 1.1 Build — minification ჩართული (default)

```bash
npm run build
```

ჩაინიშნეთ ტერმინალში რა ზომებია. მაგალითად:
```
dist/assets/index-Abc123.js    55.XX kB │ gzip: XX.XX kB
dist/assets/index-Xyz789.css    2.XX kB │ gzip:  X.XX kB
```

ახლა ნახეთ dist/ ფოლდერი — გარდა `.js` და `.css` ფაილებისა, ნახავთ `.gz` და `.br` ფაილებსაც (compression plugin-ის შედეგი — მას მოგვიანებით დავუბრუნდებით).

### 1.2 Build — minification გამორთული

გახსენით `vite.config.js` და შეცვალეთ:

```javascript
minify: false,    // იყო: 'esbuild'
```

ხელახლა:

```bash
npm run build
```

შეადარეთ ზომები — **ბევრად უფრო დიდია!**

### 1.3 ნახეთ სხვაობა თვალით

ამ ნაბიჯში source map-იც უნდა გამოვრთოთ, თორემ DevTools ავტომატურად გაშიფრავს minified კოდს და სხვაობას ვერ დავინახავთ.

**ჯერ — minification გამორთული:**

`vite.config.js`-ში დარწმუნდით:
```javascript
minify: false,
sourcemap: false,
```

```bash
npm run build
npm run preview
```

გახსენით DevTools (`F12`) → **Sources** tab → `assets/` → გახსენით JS ფაილი.

**წაკითხვადია** — კომენტარებით, ორიგინალი ცვლადის სახელებით.

**ახლა — minification ჩართული:**

```javascript
minify: 'esbuild',
sourcemap: false,       // ჯერ გამორთული დავტოვოთ!
```

```bash
npm run build
npm run preview
```

ისევ Sources tab-ში ნახეთ JS ფაილი — **მინიფიცირებულია**, ერთ ხაზზეა, ცვლადების სახელები შემოკლებული.

> **რატომ გამოვრთეთ source map?** თუ `sourcemap: true` იქნება, DevTools ავტომატურად "თარგმნის" minified კოდს და `src/` ფოლდერში ორიგინალ ფაილებს აჩვენებს — minification-ის ეფექტს ვერ დავინახავთ. Source map-ს ეტაპი 2-ში დეტალურად შევისწავლით.

### 1.4 esbuild vs Terser — სიჩქარის შედარება

სცადეთ Terser-ით build:

```javascript
minify: 'terser',    // იყო: 'esbuild'
```

```bash
npm run build
```

ყურადღება მიაქციეთ **build-ის დროს** — Terser შესამჩნევად უფრო ნელია. ზომა კი ცოტათი (1-3%) უფრო პატარა შეიძლება იყოს.

**დააბრუნეთ `'esbuild'`** — პრაქტიკაში სიჩქარის უპირატესობა ზომის მცირე სხვაობაზე მეტად ღირს.

### 1.5 ჩაინიშნეთ შედეგები

- **`minify: false`** — JS ზომა: _____ kB, Build დრო: _____ ms
- **`minify: 'esbuild'`** — JS ზომა: _____ kB, Build დრო: _____ ms
- **`minify: 'terser'`** — JS ზომა: _____ kB, Build დრო: _____ ms

---

## ეტაპი 2: Source Maps

Source Maps საშუალებას გაძლევს production-ის მინიფიცირებულ კოდში ორიგინალი ფაილებით დადებაგო.

### 2.1 sourcemap: true

`vite.config.js`-ში დარწმუნდით:

```javascript
minify: 'esbuild',
sourcemap: true,
```

```bash
npm run build
npm run preview
```

გახსენით DevTools → **Sources** tab.

ნახავთ ორიგინალ ფაილებს:
```
▸ src/
  ├── App.jsx
  ├── components/
  │   ├── Navbar.jsx
  │   ├── DataTable.jsx
  │   └── HeavyChart.jsx
  ├── pages/
  │   ├── Home.jsx
  │   └── ...
  └── utils/
      └── heavyUtils.js
```

შეგიძლიათ breakpoint-ის დადება ორიგინალ ფაილში — მუშაობს!

ახლა ნახეთ dist/ ფოლდერი:

```bash
ls -la dist/assets/
```

ნახავთ `.map` ფაილებს — ეს არის source map. შეამჩნევთ რომ `.map` ფაილები ძირითად JS ფაილებზე **ბევრად უფრო დიდია**.

### 2.2 sourcemap: false

```javascript
sourcemap: false,
```

```bash
npm run build
npm run preview
```

Sources tab-ში ახლა **მხოლოდ** მინიფიცირებული bundle ჩანს — ორიგინალი ფაილები არ არის.

ასევე ნახეთ dist/:

```bash
ls -la dist/assets/
```

`.map` ფაილები გაქრა — dist/ ზომა შემცირდა.

### 2.3 sourcemap: 'hidden'

```javascript
sourcemap: 'hidden',
```

```bash
npm run build
npm run preview
```

- **Sources tab** — ორიგინალი ფაილები **არ ჩანს** (როგორც `false`-ზე)
- **dist/ ფოლდერი** — `.map` ფაილები **არის** (როგორც `true`-ზე)

რატომ? რადგან bundle JS ფაილის ბოლოში არ ჩაიწერა ეს ხაზი:
```
//# sourceMappingURL=index-Abc123.js.map
```

`.map` ფაილი არსებობს, მაგრამ ბრაუზერს არ ეუბნება სად არის. შეგიძლიათ ხელით ატვირთოთ DevTools-ში ან error-tracking სერვისზე (მაგ: Sentry).

### 2.4 ჩაინიშნეთ შედეგები

- **`true`** — Sources tab: ორიგინალი ჩანს, .map ფაილები dist/-ში: არის, გამოყენება: Development, staging
- **`false`** — Sources tab: მხოლოდ bundle, .map ფაილები dist/-ში: არ არის, გამოყენება: Production (კოდი დაცულია)
- **`'hidden'`** — Sources tab: მხოლოდ bundle, .map ფაილები dist/-ში: არის, გამოყენება: Production + Sentry/error tracking

**დააბრუნეთ `sourcemap: true`** შემდეგი ეტაპისთვის.

---

## ეტაპი 3: Compression — Gzip და Brotli

Compression ფაილებს ამცირებს ქსელში გადაცემამდე. სერვერი აკუმშავს → ბრაუზერი ხსნის.

### 3.1 ნახეთ compressed ფაილები

`vite.config.js`-ში უკვე ჩართულია compression plugin-ები. build გავაკეთოთ:

```bash
npm run build
```

ნახეთ dist/assets/:

```bash
ls -lh dist/assets/*.js dist/assets/*.gz dist/assets/*.br 2>/dev/null
```

ყოველი JS ფაილისთვის სამი ვერსია:
```
index-Abc123.js       55 KB    ← ორიგინალი (minified)
index-Abc123.js.gz    18 KB    ← Gzip-ით შეკუმშული
index-Abc123.js.br    15 KB    ← Brotli-ით შეკუმშული
```

### 3.2 ზომების შედარება

ახლა გავაკეთოთ სრული შედარება. ჯერ build `minify: false`-ით:

```bash
# 1. minification გამორთული
# vite.config.js-ში: minify: false
npm run build
ls -lh dist/assets/*.js | head -3
```

ჩაინიშნეთ ზომა, შემდეგ:

```bash
# 2. minification ჩართული
# vite.config.js-ში: minify: 'esbuild'
npm run build
ls -lh dist/assets/*.js dist/assets/*.gz dist/assets/*.br 2>/dev/null | head -9
```

### 3.3 ჩაინიშნეთ შედეგები

- **Original (minify: false)** — JS ზომა: _____ kB
- **Minified (esbuild)** — JS ზომა: _____ kB, შემცირება: ___% ↓
- **+ Gzip (.gz)** — JS ზომა: _____ kB, შემცირება: ___% ↓
- **+ Brotli (.br)** — JS ზომა: _____ kB, შემცირება: ___% ↓

### 3.4 Network tab-ში Compression-ის ნახვა

```bash
npm run preview
```

DevTools → **Network** tab → ჩატვირთეთ გვერდი → დააჭირეთ JS ფაილს → **Response Headers**:

```
Content-Encoding: gzip     ← ან br (Brotli)
Content-Length: 18432       ← შეკუმშული ზომა
```

თუ `Content-Encoding` header არ ჩანს, ეს ნორმალურია — Vite-ის preview სერვერი ყოველთვის არ ირთავს compression-ს. რეალურ production სერვერზე (Nginx, Cloudflare, Vercel) ეს ავტომატურად ჩართულია.

### 3.5 Compression-ის გამორთვა (ბონუს)

თუ გინდათ ნახოთ build compression plugin-ის გარეშე, დააკომენტარეთ plugin-ები `vite.config.js`-ში:

```javascript
plugins: [
  react(),
  // compression({ algorithm: "gzip", ext: ".gz" }),
  // compression({ algorithm: "brotliCompress", ext: ".br" }),
],
```

```bash
npm run build
ls dist/assets/
```

ახლა მხოლოდ `.js` და `.css` ფაილებია — `.gz` და `.br` გაქრა.

**არ დაგავიწყდეთ დაბრუნება!**

---

## დასკვნა — სრული Pipeline

```
შენი კოდი (500KB)
     │
     ▼
[ Transpilation ]     JSX/TS → JS
     │
     ▼
[ Bundling ]          100+ ფაილი → რამდენიმე bundle
     │
     ▼
[ Minification ]      500KB → 180KB (64% ↓)
     │
     ▼
[ Compression ]       180KB → 45KB (91% ↓)
     │
     ▼
სერვერი → ბრაუზერი
```

### მთავარი წესი

> Minification და Compression ყოველთვის ჩართეთ production-ში — ეს "უფასო" ოპტიმიზაციაა, კოდის ცვლილება არ სჭირდება, მხოლოდ build config.
