# CSS თავსებადობა — ეტაპობრივი გაიდი

ამ პრაქტიკაში ჩვენ შევადარებთ ორ ვერსიას ერთი და იმავე ვებ-გვერდის: ერთი — რომელსაც აქვს cross-browser პრობლემები (`without-fixes.html`), და მეორე — რომელშიც ყველა პრობლემა გამოსწორებულია (`with-fixes.html`). დაინახავთ, როგორ იქცევიან სხვადასხვა ბრაუზერები ერთი და იმავე CSS კოდის მიმართ, და ისწავლით თავსებადობის საუკეთესო პრაქტიკებს: vendor prefix-ებს, `@supports` feature query-ებს, CSS Reset-ს და progressive enhancement-ს.

---

## წინაპირობა: პროექტის გაშვება

```bash
cd ~/Desktop/Web-optimization/კვირა-5/ლექცია-2-css-compatibility/demo-css-compatibility
npm install
npm run dev
```

გახსენით ბრაუზერში Vite-ის მიერ მითითებულ მისამართზე (ჩვეულებრივ `http://localhost:5173`).

> პროექტი აწყობილია Vite + React-ზე. `npm install` პირველად გაშვებისას აუცილებელია, შემდეგ `npm run dev` გაუშვით development სერვერი.

---

## ეტაპი 1: აპლიკაციის გახსნა — პირველი შთაბეჭდილება

გახსენით აპლიკაცია Chrome-ში. თავდაპირველად ნახავთ გვერდს **გაუმართავ სტილებით** (StyleToggle ღილაკით შეგიძლიათ modern.css და fallback.css-ს შორის გადართოთ).

გვერდი შეიცავს:
- **Hero სექცია** — სრულეკრანიანი სექცია გრადიენტით
- **ნავიგაცია** — sticky navbar გამჭვირვალე blur ეფექტით
- **CSS დემოები** — ContainerQueryDemo, ColorMixDemo, CssNestingDemo
- **SupportDetector** — ბრაუზერის თავსებადობის შემოწმება
- **Footer**

Chrome-ში ყველაფერი კარგად გამოიყურება. პრობლემა ის არის, რომ ეს მხოლოდ Chrome-ში ასეა.

> **მთავარი გაკვეთილი**: Chrome-ზე ტესტირება საკმარისი არ არის. თქვენი მომხმარებლების მნიშვნელოვანი ნაწილი Safari-ს, Firefox-ს ან Samsung Internet-ს იყენებს.

---

## ეტაპი 2: DevTools მობილური ემულაცია

Chrome DevTools-ის მობილური ემულაციით შეამოწმეთ, როგორ გამოიყურება გვერდი iPhone-ზე:

1. გახსენით DevTools: `Cmd + Option + I` (Mac) ან `F12`
2. ჩართეთ მობილური ემულაცია: `Cmd + Shift + M`
3. აირჩიეთ მოწყობილობა: **iPhone SE** ან **iPhone 12 Pro**
4. ყურადღება მიაქციეთ hero სექციას — ის სცილდება ეკრანს

რა ხდება? `100vh` iOS Safari-ზე მოიცავს address bar-ის სივრცეს, ამიტომ კონტენტი ბრაუზერის ინტერფეისის ქვეშ იმალება:

```css
/* პრობლემა: iOS Safari-ზე 100vh > ხილული viewport */
.hero {
  height: 100vh;
}
```

> **რა არის `100vh` პრობლემა iOS-ზე?** iOS Safari-ის address bar დინამიურია — scroll-ის დროს ის ქრება. `100vh` ყოველთვის ითვლის სრულ viewport-ს (address bar-ის ჩათვლით), ამიტომ კონტენტი "იჭრება" ბრაუზერის UI ელემენტებით.

---

## ეტაპი 3: პრობლემების იდენტიფიკაცია Elements Panel-ით

DevTools-ის Elements პანელში შეამოწმეთ შემდეგი ელემენტები:

### 3.1 — `gap` flexbox-ში

```css
/* modern.css */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;  /* Safari < 14.1 არ აღიარებს gap-ს flexbox-ში */
}
```

Elements პანელში აირჩიეთ grid კონტეინერი და Computed ტაბში ნახეთ, რომ `gap` გამოიყენება. Safari-ის ძველ ვერსიებში ეს თვისება იგნორირებული იქნება — ელემენტები ერთმანეთს მიეწებებიან.

### 3.2 — `backdrop-filter` prefix-ის გარეშე

```css
/* modern.css */
.navbar {
  backdrop-filter: blur(12px);  /* Safari-ს -webkit- prefix სჭირდება */
}
```

Safari-ში navbar-ის blur ეფექტი არ იმუშავებს, თეთრი ფონი გამოჩნდება blur-ის ნაცვლად.

### 3.3 — Container Queries და თანამედროვე CSS ფუნქციები

React კომპონენტებში (ContainerQueryDemo, ColorMixDemo, CssNestingDemo) ნახავთ თანამედროვე CSS ფუნქციების გამოყენებას:

```jsx
// ContainerQueryDemo.jsx — container queries დემო
<div className="container-demo">
  <div className="card">
    {/* კონტენტი რეაგირებს კონტეინერის ზომაზე, არა viewport-ზე */}
  </div>
</div>
```

> **შეამოწმეთ**: გახსენით Firefox (თუ გაქვთ დაყენებული) და შეამოწმეთ სხვადასხვა CSS ფუნქციების მხარდაჭერა. განსხვავება თვალსაჩინოა.

### 3.4 — CSS Reset-ის არარსებობა

`without-fixes.html`-ს არ აქვს CSS Reset. ეს ნიშნავს, რომ ბრაუზერების default `margin`, `padding` და `line-height` განსხვავებულია:

- Chrome: `body { margin: 8px; }`
- Firefox: `body { margin: 8px; }` (მსგავსი, მაგრამ heading-ებისთვის განსხვავებული)
- Safari: სხვა default-ები

---

## ეტაპი 4: სტილების გადართვა — StyleToggle კომპონენტი

აპლიკაციაში არის **StyleToggle** კომპონენტი, რომლითაც შეგიძლიათ გადართოთ `modern.css` (პრობლემური) და `fallback.css` (გამოსწორებული) სტილებს შორის.

1. დააჭირეთ "Toggle Styles" ღილაკს
2. შეამოწმეთ ორივე ვერსია ვიზუალურად

ვიზუალურად ისინი Chrome-ში თითქმის იდენტურია, მაგრამ `fallback.css`:
- იყენებს CSS Reset-ს ბაზური სტილების გასათანაბრებლად
- აქვს `dvh` fallback მობილურისთვის
- აქვს `-webkit-` prefix backdrop-filter-ისთვის
- აქვს cross-browser scrollbar სტილი
- იყენებს margin fallback + `@supports` gap-ისთვის

> **Side-by-side შედარება**: React state-ით სტილების გადართვა ხდება დინამიურად. SupportDetector კომპონენტი ავტომატურად ამოწმებს თქვენი ბრაუზერის მხარდაჭერას.

---

## ეტაპი 5: `@supports` Feature Queries

`@supports` გაძლევთ საშუალებას, ბრაუზერის შესაძლებლობების მიხედვით პირობითი სტილი გამოიყენოთ. ეს არის CSS-ის "if statement":

### backdrop-filter fallback

```css
/* fallback.css */

/* ბაზისური სტილი — მუშაობს ყველგან */
.navbar {
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.7);
}

/* თუ ბრაუზერი საერთოდ არ უჭერს მხარს backdrop-filter-ს */
@supports not ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))) {
  .navbar {
    background: rgba(255, 255, 255, 0.95);
  }
}
```

> **როგორ მუშაობს?** `@supports not (...)` ამოწმებს, ხომ არ აკლია ბრაუზერს ეს თვისება. თუ აკლია, fallback სტილი გამოიყენება — ამ შემთხვევაში ნაკლებად გამჭვირვალე ფონი, რომელიც blur-ის გარეშეც კარგად გამოიყურება.

### gap fallback

```css
/* fallback.css */

/* Fallback — margin-ებით */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  margin: -12px;
}

.card-grid > .card {
  margin: 12px;
}

/* თანამედროვე ბრაუზერებისთვის — gap */
@supports (gap: 1px) {
  .card-grid {
    gap: 24px;
    margin: 0;
  }

  .card-grid > .card {
    margin: 0;
  }
}
```

### @supports სინტაქსის ცნობარი

- **`@supports (display: grid)`** — თუ ბრაუზერი grid-ს უჭერს მხარს
- **`@supports not (gap: 1px)`** — თუ ბრაუზერი gap-ს **არ** უჭერს მხარს
- **`@supports (display: grid) and (gap: 1px)`** — თუ ორივეს უჭერს მხარს
- **`@supports (display: grid) or (display: flex)`** — თუ ერთ-ერთს უჭერს მხარს
- **`@supports selector(:has(*))`** — თუ `:has()` სელექტორი მუშაობს

---

## ეტაპი 6: Vendor Prefix-ები და Autoprefixer

### რა არის Vendor Prefix?

ბრაუზერების მწარმოებლები ექსპერიმენტულ CSS თვისებებს prefix-ით ნიშნავენ:

- **`-webkit-`** — Chrome, Safari, Edge (Chromium), iOS Safari
- **`-moz-`** — Firefox
- **`-ms-`** — Internet Explorer, ძველი Edge
- **`-o-`** — ძველი Opera

### მაგალითი: backdrop-filter

```css
/* ხელით — ჯერ prefix, შემდეგ სტანდარტული */
-webkit-backdrop-filter: blur(12px);
backdrop-filter: blur(12px);
```

> **რატომ ჯერ prefix?** ბრაუზერი ბოლო გაცხადებულ თვისებას იყენებს. თუ სტანდარტულ ვერსიას უჭერს მხარს, ის გადაფარავს prefix-იან ვერსიას. ეს არის **progressive enhancement** — ძველებისთვის prefix მუშაობს, ახლებისთვის სტანდარტი.

### Autoprefixer — ავტომატური გამოსავალი

ხელით prefix-ების დაწერა შრომატევადია და ძველდება: დღეს საჭირო prefix ორი წლის
შემდეგ ზედმეტი ნაგავია. **Autoprefixer** ამ სამუშაოს build-ზე იღებს.

#### ვარიანტი ა: ცალკე CLI-ით (სასწავლო მიზნით)

```bash
npm install autoprefixer postcss postcss-cli --save-dev
npx postcss styles.css --use autoprefixer -o styles.prefixed.css
```

#### ვარიანტი ბ: Vite-ში (რეალურ პროექტში ასე კეთდება)

Vite CSS-ს უკვე PostCSS-ით ამუშავებს — უბრალოდ `postcss.config.js` უნდა დადო
პროექტის ფესვში და Vite თავად აღმოაჩენს მას (**დამატებითი კონფიგურაცია არ სჭირდება**):

```bash
npm install -D autoprefixer postcss
```

```js
// postcss.config.js
import autoprefixer from 'autoprefixer'

export default {
  plugins: [autoprefixer()],
}
```

> ⚠️ **ხშირი გაუგებრობა**: `postcss` პაკეტი `node_modules`-ში იმ შემთხვევაშიც
> გიდევს, თუ არაფერი დაგიყენებია — ის Vite-ის **საკუთარი** dependency-ია.
> ეს იმას *არ* ნიშნავს, რომ Autoprefixer მუშაობს. Autoprefixer ცალკე უნდა
> დააყენო და `postcss.config.js`-ში ჩართო.

#### Browserslist — ვინ წყვეტს, რომელი prefix დაემატოს

Autoprefixer თვითონ არაფერს „წყვეტს". ის [caniuse](https://caniuse.com)-ის
მონაცემებს კითხულობს და **Browserslist**-ის სიას უდარებს. სია `package.json`-ში:

```json
{
  "browserslist": [
    "> 0.2%",
    "last 4 versions",
    "Safari >= 12",
    "not dead"
  ]
}
```

რომ ნახო, კონკრეტულად რომელი ბრაუზერები მოხვდა სიაში:

```bash
npx browserslist
```

**სიის სიგანე პირდაპირ განსაზღვრავს output-ს.** მაგალითად:

| browserslist | `backdrop-filter`-ს დაემატება `-webkit-`? |
|---|---|
| `defaults` | ❌ არა — სიაში მოხვედრილ ბრაუზერებს უკვე უპრეფიქსოდ აქვთ |
| `Safari >= 12` | ✅ დიახ — Safari 12–17 მხოლოდ prefix-ით იცნობს |

ანუ თუ „Autoprefixer-მა არაფერი დაამატა", ეს ხშირად **სწორი** შედეგია: სამიზნე
ბრაუზერებს prefix არ სჭირდებათ.

> **რეკომენდაცია**: თანამედროვე პროექტებში ყოველთვის გამოიყენეთ Autoprefixer
> build pipeline-ში და **წაშალეთ ხელით დაწერილი prefix-ები** — თორემ ორმაგდება
> და ძველდება.

#### რას *არ* აკეთებს Autoprefixer

ეს ხშირად ერევათ. Autoprefixer მხოლოდ **სტანდარტული** property-ების prefix-იან
ვარიანტებს ქმნის. ის **არასოდეს** გამოიტანს:

- `::-webkit-scrollbar`, `::-moz-range-thumb` — ცალკეული ბრაუზერის საკუთარი
  pseudo-element-ებია, სტანდარტში არ არსებობენ
- `-webkit-text-fill-color` — WebKit-ის საკუთარი property-ია, არა prefix
- `@media (-ms-high-contrast: active)` — IE-ის საკუთარი media feature
- **polyfill-ები** — Autoprefixer სინტაქსს ეხება, არა ფუნქციონალს. თუ ბრაუზერს
  `color-mix()` არ აქვს, prefix ვერაფერს უშველის — იქ `@supports` fallback სჭირდება.

#### სცადე დემოზე

`demo-css-compatibility` პროექტში:

```bash
npm install
npm run prefixes     # აჩვენებს, ზუსტად რა prefix-ებს ამატებს Autoprefixer
npm run build        # dist/assets/*.css — შედეგი უკვე prefix-ებიანი
```

შემდეგ შეცვალე `package.json`-ის `browserslist` (მაგ. დაწერე მხოლოდ
`["last 1 chrome version"]`) და ისევ გაუშვი `npm run prefixes` — დაინახავ,
როგორ ქრება prefix-ები.

---

## ეტაპი 6.5: სრული ფლოუ — build-იდან მომხმარებლის ეკრანამდე

აქამდე ვნახეთ, *რა* აკეთებს Autoprefixer. ახლა ვნახოთ, *როდის* — და რა ხდება
მაშინ, როცა კონკრეტული ადამიანი შემოდის საიტზე.

### მთავარი წესი

> **ყველაფერი build-ზე წყდება. request-ზე — არაფერი.**

`npm run build` შენს მანქანაზე ორშაბათს გაუშვი. მომხმარებელი პარასკევს შემოვიდა.
build-ს არ უნახავს და ვერც ნახავდა, ვინ მოვა. ანუ **ყველასთვის ერთი და იგივე
`dist/` არსებობს.**

### 6.5.1 ფაზა 1 — Build (შენს მანქანაზე)

```
  src/App.css                 postcss.config.js          package.json
  .navbar {                   plugins: [                 "browserslist": [
    position: sticky;    ──▶    autoprefixer()    ◀──      "Safari >= 12"
  }                           ]                          ]
                                     │
                                     ▼
                          ┌──────────────────────┐
                          │  npm run build        │
                          │  Vite → PostCSS       │
                          │       → Autoprefixer  │
                          └──────────┬───────────┘
                                     ▼
                     dist/assets/index-Cd24So0k.css
                     ┌───────────────────────────────────────┐
                     │ .navbar{position:-webkit-sticky;      │
                     │         position:sticky}              │
                     └───────────────────────────────────────┘
                          ☝️ ორივე ვერსია ერთ ფაილში
```

**დაიმახსოვრე:** CSS-ის ფაილი **ერთია**. გაყოფა არ ხდება.

### 6.5.2 ფაზა 2 — Deploy

`dist/`-ს სერვერზე დებ. ეს უბრალო ტექსტური ფაილებია — `node_modules` აღარ
სჭირდებათ, Autoprefixer აღარ სჭირდებათ. მათი საქმე დამთავრებულია.

### 6.5.3 ფაზა 3 — მომხმარებელი შემოდის

სერვერი `User-Agent` header-ს იღებს, მაგრამ **არ იყენებს**. სტატიკური ჰოსტინგი
ყველას იდენტურ ბაიტებს უგზავნის.

```
   ახალი ბრაუზერი (Safari 18)          ძველი ბრაუზერი (Safari 12)
            │                                     │
            │  GET /assets/index-Cd24So0k.css     │
            ▼                                     ▼
   ╔════════════════════════════════════════════════════════╗
   ║   ერთი და იგივე ფაილი, ბაიტში ბაიტი                    ║
   ║   .navbar{position:-webkit-sticky;position:sticky}      ║
   ╚════════════════════════════════════════════════════════╝
            │                                     │
            ▼                                     ▼
   position:-webkit-sticky  ✅ ვიცი      position:-webkit-sticky  ✅ ვიცი
   position:sticky          ✅ ვიცი      position:sticky          ❓ არ ვიცი
            │                                     │      → ამ ხაზს ვტოვებ
            ▼                                     ▼
   იყენებს: sticky                       იყენებს: -webkit-sticky
   (ბოლო გასაგები იმარჯვებს)             (გაუგებარი უგულებელყოფილია)
```

### 6.5.4 რატომ მუშაობს ეს — CSS-ის „მიმტევებლობა"

CSS სპეციფიკაცია ავალდებულებს ბრაუზერს: **გაუგებარი declaration ჩუმად
გამოტოვე და დანარჩენი გააგრძელე.** შეცდომა არ არის, გაფრთხილება არ არის.

სწორედ ამიტომ არის **თანმიმდევრობა კრიტიკული**:

```css
/* ✅ სწორი — prefix ჯერ, სტანდარტი ბოლოს */
position: -webkit-sticky;
position: sticky;

/* ❌ არასწორი — ახალი ბრაუზერი prefix-იანს გამოიყენებს */
position: sticky;
position: -webkit-sticky;
```

ორივე declaration ვალიდურია ახალი ბრაუზერისთვის, ამიტომ **ბოლო იმარჯვებს**
(cascade-ის წესი). Autoprefixer ამას ავტომატურად სწორად აწყობს.

### 6.5.5 შედარება: CSS vs JavaScript

ეს ხშირად ერევათ — **CSS და JS სხვადასხვა მექანიზმით მუშაობს** (JS-ს ლექცია 3-ში
დეტალურად ვნახავთ):

| | CSS (Autoprefixer) | JavaScript (Babel) |
|---|---|---|
| გაუგებარ კოდს რას უშვრება | **ხაზს** ჩუმად გამოტოვებს | **მთელი ფაილი** ჩავარდება (`SyntaxError`) |
| შეიძლება ორივე ვერსია ერთ ფაილში? | ✅ დიახ | ❌ არა |
| რამდენი ფაილი იქმნება build-ზე | **1** | **2** (modern + legacy) |
| ვინ ირჩევს | არავინ — ერთია | ბრაუზერი, `module`/`nomodule`-ით |
| ძველი ბრაუზერი | უცნობ **ხაზს** ტოვებს | უცნობ **ფაილს** არ ტვირთავს |

> **დასკვნა:** Autoprefixer-ს ბანდლის გაყოფა არ სჭირდება, რადგან CSS თვითონ
> უმკლავდება უცნობ სინტაქსს. JS-ს ეს ფუფუნება არ აქვს — ერთი გაუგებარი სიმბოლო
> და სკრიპტი მთლიანად კვდება. სწორედ ამიტომ არსებობს `nomodule` ხრიკი.

### 6.5.6 შეამოწმე თავად

```bash
npm run build
npm run preview
```

შემდეგ სხვადასხვა `User-Agent`-ით გამოითხოვე იგივე გვერდი:

```bash
curl -s -A "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0)" http://localhost:4173/ | md5
curl -s -A "Mozilla/5.0 (Macintosh) Chrome/141.0.0.0"           http://localhost:4173/ | md5
```

**ორივე md5 იდენტური იქნება** — სერვერი არავის არაფერს არჩევს.

---

## ეტაპი 7: CSS თავსებადობის ხშირი პატერნები

### პრობლემა / გამოსწორება ცხრილი

- **`gap` flexbox-ში** (Safari < 14.1) — გამოსწორება: margin fallback + `@supports`
- **`backdrop-filter`** (Safari) — გამოსწორება: `-webkit-` prefix
- **`100vh`** (iOS Safari) — გამოსწორება: `dvh` + `vh` fallback
- **scrollbar styling** (Firefox) — გამოსწორება: `scrollbar-width` + `scrollbar-color`
- **`box-sizing`** (ყველა) — გამოსწორება: CSS Reset

### dvh / vh Progressive Enhancement

```css
/* Fallback ყველა ბრაუზერისთვის */
height: 100vh;
/* თანამედროვე ბრაუზერებისთვის (გადაფარავს vh-ს) */
height: 100dvh;
```

> **dvh, svh, lvh — რა განსხვავებაა?**
> - `dvh` (dynamic) — იცვლება address bar-ის ჩვენება/დამალვისას
> - `svh` (small) — ყველაზე პატარა viewport (address bar ჩანს)
> - `lvh` (large) — ყველაზე დიდი viewport (address bar დამალულია)
>
> უმეტეს შემთხვევაში `dvh` საუკეთესო არჩევანია.

### Cross-browser Scrollbar

```css
/* Firefox — სტანდარტული თვისებები */
.element {
  scrollbar-width: thin;
  scrollbar-color: #94a3b8 #f1f5f9;
}

/* Chrome / Safari / Edge — WebKit pseudo-elements */
.element::-webkit-scrollbar {
  width: 8px;
}

.element::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.element::-webkit-scrollbar-thumb {
  background: #94a3b8;
  border-radius: 4px;
}
```

### CSS Reset-ის მნიშვნელობა

```css
/* reset.css — ნორმალიზება */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

> **box-sizing: border-box** — ელემენტის სიგანეში `padding` და `border` ჩართულია. ეს ხელს უშლის "გაუთვალისწინებელ" გაფართოებას და ყველა ბრაუზერში თანმიმდევრულ ქცევას უზრუნველყოფს.

---

## შეჯამება

ამ პრაქტიკაში ისწავლეთ:

1. **CSS Reset** — ბრაუზერების default სტილების გათანაბრება (`box-sizing`, `margin`, `padding`)
2. **Vendor Prefix-ები** — `-webkit-`, `-moz-` prefix-ების გამოყენება ბრაუზერ-სპეციფიკური თვისებებისთვის
3. **`@supports` Feature Queries** — პირობითი სტილების გამოყენება ბრაუზერის შესაძლებლობების მიხედვით
4. **Progressive Enhancement** — ძველი ბრაუზერებისთვის fallback, თანამედროვეებისთვის — საუკეთესო ვერსია
5. **Viewport ერთეულები** — `dvh`/`svh`/`lvh` მობილური ბრაუზერების სწორი მხარდაჭერა
6. **Cross-browser Scrollbar** — ორი სისტემის ერთდროული გამოყენება (webkit + standard)
7. **Autoprefixer** — prefix-ების ავტომატური დამატება build pipeline-ში

> **მთავარი პრინციპი**: ყოველთვის დაიწყეთ fallback-ით (ძველი სინტაქსი), შემდეგ დაამატეთ თანამედროვე ვერსია. ბრაუზერი ბოლო გაცხადებულ თვისებას გამოიყენებს, თუ მას ესმის — ეს არის **progressive enhancement**.
