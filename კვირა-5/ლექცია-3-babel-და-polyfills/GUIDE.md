# Babel & Polyfills — ეტაპობრივი გაიდი

თანამედროვე JavaScript-ი ახალ სინტაქსს და API-ებს ამატებს ყოველწლიურად — Optional Chaining, Array.at(), structuredClone() და ა.შ. პრობლემა ის არის, რომ ყველა მომხმარებლის ბრაუზერი არ უჭერს მხარს ამ ფუნქციებს. ამ პრობლემის გადასაჭრელად სამი ინსტრუმენტი გვაქვს:

- **Babel (ტრანსპილერი)** — ახალ **სინტაქსს** ძველ ფორმაში გარდაქმნის (compile-time)
- **Polyfills** — ახალ **API-ებს** ამატებს ძველ ბრაუზერებში (runtime)
- **Feature Detection** — ამოწმებს რა აქვს ბრაუზერს და შესაბამისად მოქმედებს

ეს გაიდი `demo-babel-polyfills/` პროექტზე დაყრდნობით გაჩვენებთ, როგორ მუშაობს თითოეული მიდგომა.

---

## წინაპირობა: პროექტის გაშვება

```bash
cd ~/Desktop/Web-optimization/კვირა-5/ლექცია-3-babel-და-polyfills/demo-babel-polyfills
npm install
npm run dev
```

გახსენით ბრაუზერში Vite-ის მიერ მითითებულ მისამართზე (ჩვეულებრივ `http://localhost:5173`).

> პროექტი აწყობილია Vite + React-ზე. `npm install` და `npm run dev` ავტომატურად დაამატებს hot reload-ს განვითარების დროს.

---

## ეტაპი 1: გახსენით აპლიკაცია — Feature Showcase

### 1.1 რას ხედავთ?

გახსენით React აპლიკაცია ბრაუზერში. გვერდზე ნახავთ ორ მთავარ სექციას:

1. **TranspilationDemo** — თანამედროვე JS ფუნქციების დემონსტრაცია რეალური შედეგებით
2. **PolyfillDemo** — Polyfill-ების მუშაობის დემონსტრაცია

### 1.2 React კომპონენტების სტრუქტურა

აპლიკაცია შედგება შემდეგი კომპონენტებისგან:

- **`TranspilationDemo.jsx`** — სინტაქსის ტრანსპილაციის დემონსტრაცია
- **`CodeComparison.jsx`** — თანამედროვე vs ტრანსპილირებული კოდის შედარება
- **`PolyfillDemo.jsx`** — API polyfill-ების დემონსტრაცია
- **`PolyfillCard.jsx`** — ცალკეული polyfill-ის ბარათი
- **`RunButton.jsx`** — დემოს გაშვების ღილაკი

> თითოეული კომპონენტი აჩვენებს: ფუნქციის სახელს, თანამედროვე კოდს, მიღებულ შედეგს, ბრაუზერის მხარდაჭერის პროცენტს და ძველ ალტერნატივას. ეს ფორმატი გვეხმარება გავიგოთ, **რა იცვლება** Babel-ის ტრანსპილაციისას.

გამოყენებული თანამედროვე ფუნქციები:

- **Optional Chaining `?.`** (ES2020) — ჩაშლილ ობიექტში უსაფრთხო წვდომა
- **Nullish Coalescing `??`** (ES2020) — default მნიშვნელობა მხოლოდ `null`/`undefined`-ზე
- **Template Literals** (ES2015) — სტრინგების ინტერპოლაცია `${}`
- **Destructuring & Spread** (ES2015/ES2018) — ობიექტებისა და მასივების დაშლა/გაერთიანება
- **`Array.at()`** (ES2022) — უარყოფითი ინდექსით წვდომა
- **`Object.hasOwn()`** (ES2022) — უსაფრთხო property შემოწმება
- **`structuredClone()`** (ES2022) — ღრმა კლონირება (deep clone)
- **`async/await`** (ES2017) — ასინქრონული კოდის სინქრონული სტილით წერა

### 1.3 რას ვაკვირდებით

- ყველა ფუნქცია მუშაობს თანამედროვე ბრაუზერში
- CodeComparison კომპონენტი აჩვენებს თანამედროვე და ტრანსპილირებულ ვერსიებს გვერდიგვერდ
- **მარჯვენა პანელი ცოცხალი Babel-ის output-ია** — `@babel/standalone` პირდაპირ
  ბრაუზერში მუშაობს, ტექსტი წინასწარ ჩაწერილი არ არის
- PolyfillCard კომპონენტები აჩვენებს თითოეული polyfill-ის მუშაობას
- RunButton ღილაკებით შეგიძლიათ გაუშვათ თითოეული დემო

### 1.5 სამიზნე ბრაუზერების გადამრთველი

TranspilationDemo-ს თავზე სამი ღილაკია — **ES5 (IE 11)**, **Safari 12**,
**თანამედროვე**. დააჭირეთ თითოეულს და უყურეთ, როგორ იცვლება მარჯვენა პანელი.

მაგალითად `const city = user?.address?.city ?? 'უცნობი'`:

| სამიზნე | შედეგი |
|---|---|
| **ES5 (IE 11)** | `var` + სრული `!== null && !== void 0` ჯაჭვი |
| **Safari 12** | `const` რჩება, მაგრამ `?.`/`??` მაინც იშლება |
| **თანამედროვე** | კოდი **საერთოდ არ იცვლება** |

> ეს არის ეტაპის მთავარი დასკვნა: **„ტრანსპილაცია" ერთი ფიქსირებული რამ არ არის.**
> რა მოხდება კოდთან, სრულად `targets`-ზეა დამოკიდებული. თუ სამიზნე ბრაუზერები
> ისედაც იცნობენ სინტაქსს, Babel ხელს არ ახლებს — და ბანდლიც პატარა რჩება.

### 1.4 სცადეთ Console-ში

გახსენით DevTools Console: **Cmd+Option+J** (Mac) / **Ctrl+Shift+J** (Windows/Linux)

```javascript
// Optional Chaining — undefined-ს დააბრუნებს, error არ იქნება
const obj = { a: { b: 1 } };
console.log(obj?.a?.b);      // 1
console.log(obj?.x?.y?.z);   // undefined

// Nullish Coalescing — 0 და '' არის "valid" მნიშვნელობები
console.log(0 ?? 42);        // 0
console.log(0 || 42);        // 42  (განსხვავება!)
```

> **რატომ არის ეს მნიშვნელოვანი:** ძველ ბრაუზერში (მაგ., IE11 ან Safari 13) ეს კოდი **SyntaxError**-ს გამოიწვევდა, რადგან ბრაუზერი `?.` და `??` ოპერატორებს საერთოდ ვერ აცნობს. სწორედ ამისთვის გვჭირდება Babel.

> **React კონტექსტში:** Vite ავტომატურად აკეთებს ტრანსპილაციას თანამედროვე სინტაქსისთვის, მაგრამ production build-ისთვის browserslist კონფიგურაცია განსაზღვრავს, რამდენად "ძველი" უნდა იყოს output კოდი.

---

## ეტაპი 2: რა არის Babel — ტრანსპილაცია

**Babel** არის JavaScript ტრანსპილერი — ის ახალ სინტაქსს ძველ, ყველა ბრაუზერისთვის გასაგებ ფორმაში გარდაქმნის. ეს ხდება **build-time**-ზე (კომპილაციის დროს), არა runtime-ზე.

> ტრანსპილაცია = **სინტაქსის** გარდაქმნა. კოდი იგივეს აკეთებს, მაგრამ ძველი სტილით არის დაწერილი.

### მაგალითი 1: Optional Chaining + Nullish Coalescing

```javascript
// თანამედროვე კოდი (ES2020)
const city = data?.items?.map(item => item.name) ?? [];

// Babel-ის output (ES5-თავსებადი)
var _data, _data$items;
var city = (_data = data) !== null && _data !== void 0
  && (_data$items = _data.items) !== null && _data$items !== void 0
  ? _data$items.map(function(item) { return item.name; })
  : [];
```

> ორი სტრიქონიანი თანამედროვე კოდი Babel-მა 5 სტრიქონიან ES5 კოდად გარდაქმნა. ეს არის **ტრანსპილაცია** — ლოგიკა იგივე რჩება, მხოლოდ სინტაქსი იცვლება.

### მაგალითი 2: Arrow Functions

```javascript
// თანამედროვე
const double = (x) => x * 2;
const greet = (name) => `Hello, ${name}!`;

// Babel output
var double = function(x) { return x * 2; };
var greet = function(name) { return "Hello, " + name + "!"; };
```

### მაგალითი 3: Destructuring

```javascript
// თანამედროვე
const { name, age } = person;
const [first, ...rest] = items;

// Babel output
var name = person.name;
var age = person.age;
var first = items[0];
var rest = items.slice(1);
```

### მნიშვნელოვანი

> Babel მხოლოდ **სინტაქსს** ცვლის. ის ვერ დაამატებს ახალ API-ს (მაგ. `Array.at()`, `structuredClone()`). ამისთვის **polyfill** გვჭირდება.

---

## ეტაპი 3: რა არის Polyfills — runtime დამატებები

**Polyfill** = ახალი API-ის იმპლემენტაცია ძველი ბრაუზერისთვის. Babel-ისგან განსხვავებით, polyfill **runtime**-ზე მუშაობს — ის JavaScript-ის ობიექტებს ამატებს ახალ მეთოდებს.

### მთავარი განსხვავება:

```
Babel = სინტაქსის ტრანსფორმაცია (compile-time)
  ?.  ??  =>  ...  const/let  class  arrow functions

Polyfill = API-ის დამატება (runtime)
  Array.at()  Object.hasOwn()  structuredClone()  Promise  Map  Set
```

> **წესი:** თუ ბრაუზერი ვერ **აცნობს** კოდს (SyntaxError) — Babel სჭირდება. თუ ბრაუზერი ვერ **პოულობს** ფუნქციას (TypeError: X is not a function) — Polyfill სჭირდება.

### მაგალითი: Array.prototype.at() Polyfill

```javascript
// ეს polyfill ამატებს at() მეთოდს, თუ ბრაუზერს არ აქვს
if (!Array.prototype.at) {
  Array.prototype.at = function(index) {
    // უარყოფითი ინდექსისთვის ბოლოდან ითვლის
    if (index < 0) index = this.length + index;
    return this[index];
  };
}

// ახლა ძველ ბრაუზერშიც მუშაობს:
const last = [10, 20, 30].at(-1);  // 30
```

### core-js — polyfill-ების ბიბლიოთეკა

ხელით polyfill-ების წერა არაპრაქტიკულია. **core-js** არის ყველაზე სრული polyfill-ების კოლექცია:

```bash
npm install core-js
```

babel.config.json-ში `useBuiltIns: "usage"` ავტომატურად ჩასვამს საჭირო polyfill-ებს:

```javascript
// თქვენი კოდი:
const last = items.at(-1);

// Babel + core-js ავტომატურად დაამატებს:
import "core-js/modules/es.array.at.js";
const last = items.at(-1);
```

### ტრანსპილაცია vs Polyfill — შედარება

**ტრანსპილაცია (Babel):**
- რას აკეთებს: სინტაქსს ცვლის
- მაგალითები: `?.`, `??`, arrow functions, `class`
- როდის მუშაობს: build time (კომპილაციისას)
- ზომა: კოდი შეიძლება გაიზარდოს

**Polyfill (core-js):**
- რას აკეთებს: ახალ API-ს ამატებს
- მაგალითები: `Array.at()`, `structuredClone()`, `Promise`
- როდის მუშაობს: runtime (ბრაუზერში)
- ზომა: polyfill-ები ბანდლს ემატება

---

## ეტაპი 4: Babel-ის კონფიგურაცია (preset-env, targets, corejs)

### 4.1 babel.config.json

```json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": "> 0.5%, last 2 versions, not dead",
      "useBuiltIns": "usage",
      "corejs": 3
    }]
  ]
}
```

### 4.2 პარამეტრების ახსნა

- **`targets`** — რომელ ბრაუზერებს ვუჭერთ მხარს (browserslist ფორმატი)
- **`useBuiltIns`** — როგორ ჩასვას polyfill-ები (`"usage"` = მხოლოდ საჭირო)
- **`corejs`** — core-js ვერსია polyfill-ებისთვის

### 4.3 targets — ბრაუზერების მითითება

```json
// ვარიანტი 1: browserslist query
"targets": "> 0.5%, last 2 versions, not dead"

// ვარიანტი 2: კონკრეტული ბრაუზერები
"targets": { "chrome": "80", "firefox": "78", "safari": "13" }

// ვარიანტი 3: მხოლოდ თანამედროვე
"targets": { "esmodules": true }
```

> **@babel/preset-env** ავტომატურად ირჩევს, რომელი ტრანსფორმაციები სჭირდება `targets`-ის მიხედვით. თუ ყველა target ბრაუზერი უჭერს მხარს Optional Chaining-ს, Babel საერთოდ არ შეცვლის მას — ეს ამცირებს output-ის ზომას.

### 4.4 useBuiltIns — სამი ვარიანტი

- **`false`** — polyfill-ები არ ჩაისმის (ხელით უნდა მართოთ)
- **`"entry"`** — ყველა polyfill ჩაისმის (დიდი bundle)
- **`"usage"`** — მხოლოდ გამოყენებული polyfill-ები ჩაისმის (რეკომენდებული)

> **რეკომენდაცია:** ყოველთვის გამოიყენეთ `"usage"` — ის ანალიზს უკეთებს თქვენს კოდს და მხოლოდ იმ polyfill-ებს ამატებს, რომლებიც რეალურად საჭიროა. ეს მნიშვნელოვნად ამცირებს bundle-ის ზომას.

### 4.5 Babel CLI მაგალითი

```bash
# ინსტალაცია
npm install --save-dev @babel/core @babel/cli @babel/preset-env

# ტრანსპილაცია
npx babel src --out-dir dist
```

---

## ეტაპი 4.6: Vite-ში Babel — რა ერთვება ავტომატურად და რა არა

ეს ყველაზე ხშირად დასმული კითხვაა და პასუხი ორნაწილიანია.

### რა ერთვება ავტომატურად

`@vitejs/plugin-react` შიგნით **Babel-ს იყენებს** — React Fast Refresh-ისა და
JSX transform-ისთვის. ამიტომ `@babel/core` `node_modules`-ში გიდევს მაშინაც კი,
თუ `package.json`-ში არსად დაგიწერია:

```bash
ls node_modules/@babel
# core  parser  traverse  plugin-transform-react-jsx-self  ...
```

> ⚠️ ეს **არ** ნიშნავს, რომ `@babel/preset-env` ან polyfill-ები მუშაობს.
> plugin-react-ის Babel მხოლოდ JSX-ს და Fast Refresh-ს ემსახურება.

### რა *არ* ერთვება ავტომატურად

| რამ | Vite-ს მოყვება? | სად მოდის |
|---|---|---|
| JSX → JS | ✅ დიახ | `@vitejs/plugin-react` (Babel-ით) |
| სინტაქსის downlevel | ✅ დიახ | **esbuild**, `build.target`-ის მიხედვით |
| `@babel/preset-env` | ❌ არა | `@vitejs/plugin-legacy` |
| `core-js` polyfill-ები | ❌ არა | `@vitejs/plugin-legacy` |
| legacy `nomodule` ბანდლი | ❌ არა | `@vitejs/plugin-legacy` |

**მნიშვნელოვანი**: Vite-ის ჩვეულებრივი build მხოლოდ **სინტაქსს** ამცირებს
(esbuild-ით). polyfill-ებს **არ ამატებს**. ანუ `Object.hasOwn()` თქვენს ბანდლში
ისე დარჩება, როგორც დაწერეთ — და ძველ ბრაუზერში გატყდება.

### რატომ *არ* კითხულობს Vite `babel.config.json`-ს

`@vitejs/plugin-react` Babel-ს `babelrc: false, configFile: false`-ით იძახებს.
ანუ ეტაპი 4.1-ის `babel.config.json` პროექტის ფესვში რომ დადოთ — **ignore-დება**.
რომ წაიკითხოს, ცალკე უნდა ჩართოთ:

```js
react({ babel: { babelrc: true, configFile: true } })
```

> პრაქტიკაში ეს იშვიათად სჭირდება. Vite-ში სწორი გზა `@vitejs/plugin-legacy`-ია.

### @vitejs/plugin-legacy — preset-env + core-js Vite-ისთვის

```bash
npm install -D @vitejs/plugin-legacy terser
```

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'],
      renderLegacyChunks: true,   // legacy nomodule ბანდლი
      modernPolyfills: true,      // polyfill-ები modern ბანდლისთვისაც
    }),
  ],
})
```

> **Vite-ის ვერსია მნიშვნელოვანია.** `@vitejs/plugin-legacy@8` Vite 8-ს ითხოვს.
> Vite 5-ზე `npm i -D @vitejs/plugin-legacy@^5.4.3` დააყენეთ, თორემ
> `ERESOLVE unable to resolve dependency tree` შეცდომას მიიღებთ.

`npm run build`-ის შემდეგ `dist/assets/`-ში **ორი კომპლექტი** გაჩნდება:

```
index-DoY6G_8O.js            151 kB   ← modern  (<script type="module">)
polyfills-BMCQ5me4.js         92 kB   ← modern polyfills
index-legacy-B9mZLyAM.js     154 kB   ← legacy  (<script nomodule>)
polyfills-legacy-*.js         63 kB   ← core-js + regenerator + SystemJS
```

და `index.html`-ში:

```html
<script type="module" src="/assets/index-....js"></script>
<script nomodule src="/assets/polyfills-legacy-....js"></script>
<script nomodule id="vite-legacy-entry" data-src="/assets/index-legacy-....js"></script>
```

`type="module"` და `nomodule` ერთმანეთს გამორიცხავს: **თითოეული ბრაუზერი
მხოლოდ ერთ კომპლექტს ჩამოტვირთავს**, არა ორივეს. ეს არის „ორჯერ დიდი build,
მაგრამ არა ორჯერ დიდი ჩამოტვირთვა".

### სცადეთ დემოზე

```bash
npm install
npm run build
npm run bundles     # modern vs legacy შედარება + <script> თეგები
```

---

## ეტაპი 4.7: სრული ფლოუ — build-იდან მომხმარებლის ეკრანამდე

ყველაზე ხშირი გაუგებრობა: *„როდის ხდება ბრაუზერის ვერსიის გარკვევა? მაშინ, როცა
მომხმარებელი საიტზე შემოდის?"*

**არა.** ბრაუზერის ვერსია build-ზე საერთოდ არავის აინტერესებს.

### მთავარი წესი

> **ყველაფერი build-ზე წყდება. request-ზე — არაფერი.**

`npm run build` შენს მანქანაზე ორშაბათს გაუშვი. მომხმარებელი პარასკევს შემოვიდა.
build-ს არ უნახავს და ვერც ნახავდა, ვინ მოვა. `targets` კითხვას პასუხობს
**„რისთვის მოვამზადო?"**, და არა „ვინ მოვიდა?".

### 4.7.1 ფაზა 1 — Build (შენს მანქანაზე)

```
  src/App.jsx                  vite.config.js             package.json
  const city =                 legacy({                   "browserslist": [
    user?.address?.city  ──▶     targets: [...]   ◀──       "> 0.2%", ...
                                })                         ]
                                      │
                                      ▼
                         ┌────────────────────────────┐
                         │  npm run build              │
                         │  Vite → @babel/preset-env   │
                         │       → core-js             │
                         └──────────┬─────────────────┘
                                    ▼
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
         index-DoY6G_8O.js                index-legacy-B9mZLyAM.js
         ┌─────────────────────┐          ┌──────────────────────────┐
         │ user?.address?.city │          │ user === null ||         │
         │ (უცვლელი)           │          │ user === void 0 ? ...    │
         └─────────────────────┘          └──────────────────────────┘
         polyfills-*.js  (პატარა)         polyfills-legacy-*.js
                                          (core-js + regenerator + SystemJS)
```

**დაიმახსოვრე:** JS-ის ფაილი **ორია**. ორივე ერთდროულად არსებობს `dist/`-ში.

### 4.7.2 ფაზა 2 — Deploy

`dist/`-ს სერვერზე დებ. Babel-ი, core-js, `node_modules` — არაფერი მიჰყვება.
მათი საქმე build-ზე დამთავრდა.

### 4.7.3 ფაზა 3 — მომხმარებელი შემოდის

სერვერი `User-Agent` header-ს იღებს, მაგრამ **არ იყენებს**. ყველას იდენტურ
`index.html`-ს უგზავნის:

```html
<script type="module" crossorigin src="/assets/index-DoY6G_8O.js"></script>
<script nomodule crossorigin src="/assets/polyfills-legacy-DnmCZJF6.js"></script>
<script nomodule id="vite-legacy-entry" data-src="/assets/index-legacy-B9mZLyAM.js"></script>
```

არჩევანს **ბრაუზერი თვითონ აკეთებს**, უკვე HTML-ის წაკითხვისას:

```
   ახალი ბრაუზერი (Chrome 141)         ძველი ბრაუზერი (IE 11)
            │                                     │
            │           GET /                     │
            ▼                                     ▼
   ╔════════════════════════════════════════════════════════╗
   ║   ერთი და იგივე index.html, ბაიტში ბაიტი               ║
   ╚════════════════════════════════════════════════════════╝
            │                                     │
            ▼                                     ▼
   <script type="module">                <script type="module">
      ✅ ვიცი რა არის → ვტვირთავ            ❓ "module"? უცნობი ტიპია
                                             → გამოვტოვებ
   <script nomodule>                     <script nomodule>
      ⏭️ ვიცი რა არის → ვგულებელყოფ          ✅ ჩვეულებრივი სკრიპტია
                                             → ვტვირთავ
            │                                     │
            ▼                                     ▼
   📥 index-DoY6G_8O.js                  📥 polyfills-legacy-*.js
      (~151 kB)                             + index-legacy-*.js
                                            (~217 kB)
```

**თითოეული ერთ კომპლექტს ტვირთავს, არასდროს ორივეს.**

### 4.7.4 რატომ მუშაობს `nomodule` ხრიკი

ეს HTML-ის სპეციფიკაციაშია ჩაშენებული, არა Vite-ის ჭკუა:

| ატრიბუტი | ახალი ბრაუზერი | ძველი ბრაუზერი |
|---|---|---|
| `type="module"` | იცნობს → ტვირთავს | **უცნობი ტიპია** → გამოტოვებს |
| `nomodule` | იცნობს → **შეგნებულად** უგულებელყოფს | ატრიბუტს ვერ ხედავს → ტვირთავს |

ორივე მხარე ერთმანეთს ავსებს: ძველი ვერ ხედავს პირველს, ახალი უარს ამბობს მეორეზე.

### 4.7.5 რატომ *ორი ფაილი*, როცა CSS-ს ერთი ჰყოფნის?

ლექცია 2-ში Autoprefixer ორივე ვერსიას **ერთ** ფაილში წერდა:

```css
.navbar{position:-webkit-sticky;position:sticky}
```

JS-ში ასე არ გამოვა. მიზეზი ფუნდამენტურია:

| | CSS | JavaScript |
|---|---|---|
| გაუგებარ კოდს რას უშვრება | **ხაზს** ჩუმად გამოტოვებს | **მთელი ფაილი** ჩავარდება (`SyntaxError`) |
| შეიძლება ორივე ვერსია ერთ ფაილში? | ✅ დიახ | ❌ არა |
| ფაილების რაოდენობა | **1** | **2** |
| ვინ ირჩევს | არავინ — ერთია | ბრაუზერი, `module`/`nomodule`-ით |

CSS მიმტევებელია: `position: sticky` თუ არ ესმის, ამ ერთ ხაზს გადაახტება.
JS — არა: ერთი `?.` რომელიც ვერ გაიგო, და სკრიპტი **მთლიანად** კვდება, ჯერ კიდევ
parse-ის ეტაპზე. ამიტომ ორი ცალკე ფაილი გარდაუვალია.

### 4.7.6 პრაქტიკული დასკვნა

`targets`-ის უსაფუძვლოდ გაფართოება **ყველას** ამძიმებს:

```js
legacy({ targets: ['ie >= 11'] })   // ← legacy ბანდლი საგრძნობლად გაიზრდება
```

`browserslist` არ უნდა იყოს „ყოველი შემთხვევისთვის ფართო" — ის შენი რეალური
აუდიტორიის ანალიტიკას უნდა შეესაბამებოდეს.

### 4.7.7 შეამოწმე თავად

```bash
npm run build
npm run preview
```

```bash
curl -s -A "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0)" http://localhost:4173/ | md5
curl -s -A "Mozilla/5.0 (Macintosh) Chrome/141.0.0.0"           http://localhost:4173/ | md5
```

**ორივე md5 იდენტური იქნება** — სერვერი არავის არაფერს არჩევს. შემდეგ DevTools →
Network-ში ნახე, რომ მხოლოდ ერთი კომპლექტი ჩამოიტვირთა.

> **სრულყოფილებისთვის:** სერვერზე User-Agent-ით ბანდლის არჩევა
> (*differential serving*) ტექნიკურად შესაძლებელია, მაგრამ პრაქტიკაში თითქმის
> არ გამოიყენება — CDN-ის ქეშირებას ანგრევს (ერთი URL, სხვადასხვა შიგთავსი) და
> UA-ს გაყალბება ადვილია. `module`/`nomodule` სწორედ ამიტომ გახდა სტანდარტი.

---

## ეტაპი 5: Feature Detection — როდის და როგორ

ზოგჯერ არც Babel გამოგვადგება და არც Polyfill — მაგალითად, IntersectionObserver ან Service Worker ბრაუზერ-სპეციფიკური API-ებია, რომლებიც ვერ გაიპოლიფილება მარტივად. ასეთ დროს **Feature Detection**-ს ვიყენებთ.

### 5.1 გვერდზე ნახეთ Feature Detection ბეჯები

გვერდის ქვედა ნაწილში ნახავთ 4 ფუნქციის detection-ის შედეგებს. თითოეულს აქვს:
- მწვანე ან წითელი ბეჯი (მხარდაჭერილია თუ არა)
- Detection-ის კოდი (ზუსტად როგორ ვამოწმებთ)
- Fallback მიდგომა (რა ვქნათ, თუ არ აქვს მხარდაჭერა)

### 5.2 Detection-ის პატერნები

**1. API არსებობის შემოწმება (`in` ოპერატორი):**

```javascript
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(callback);
  observer.observe(element);
} else {
  // fallback: scroll event
  window.addEventListener('scroll', handleScroll);
}
```

**2. typeof შემოწმება:**

```javascript
if (typeof structuredClone === 'function') {
  const copy = structuredClone(data);
} else {
  const copy = JSON.parse(JSON.stringify(data));
}
```

**3. CSS.supports() — CSS ფუნქციებისთვის:**

```javascript
if (CSS.supports('container-type', 'inline-size')) {
  // container queries ხელმისაწვდომია
}
```

**4. CSS-ში @supports:**

```css
.layout {
  display: flex;
  flex-wrap: wrap;
}

@supports (display: grid) {
  .layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
```

### 5.3 Feature Detection vs User-Agent Sniffing

**Feature Detection:**
- რას ამოწმებს: აქვს თუ არა API
- სანდოობა: 100% სანდო
- მომავლის მხარდაჭერა: ახალი ბრაუზერი ავტომატურად მუშაობს
- რეკომენდაცია: ყოველთვის ეს

**User-Agent Sniffing:**
- რას ამოწმებს: რომელი ბრაუზერია
- სანდოობა: ხშირად არასწორი (UA-ს აყალბებენ)
- მომავლის მხარდაჭერა: ყოველ ახალ ბრაუზერს ხელით ამატებთ
- რეკომენდაცია: არასდროს

### 5.4 როდის ვიყენებთ Feature Detection-ს (და არა Polyfill-ს)?

- ბრაუზერ-სპეციფიკური API-ები (Service Worker, Geolocation)
- Hardware-თან დაკავშირებული ფუნქციები (WebGL, WebXR)
- CSS ფუნქციები (`@supports`)
- მედია ფორმატების მხარდაჭერა (WebP, AVIF, WebM)

---

## ეტაპი 6: Progressive Enhancement vs Graceful Degradation

ორი ფუნდამენტური მიდგომა არსებობს ბრაუზერთა თავსებადობის მართვისთვის:

### 6.1 Progressive Enhancement (პროგრესული გაუმჯობესება)

**იდეა:** დაიწყე ძირითადი, მარტივი ფუნქციონალურობით, შემდეგ **გააუმჯობესე** თანამედროვე ბრაუზერებისთვის.

```html
<!-- ძირითადი ფუნქციონალობა: HTML form — მუშაობს ყველგან -->
<form action="/search" method="GET">
  <input type="text" name="q" placeholder="Search...">
  <button type="submit">Search</button>
</form>

<div id="results"></div>

<script>
// გაუმჯობესება: fetch API-ით AJAX search
if ('fetch' in window) {
  document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = e.target.q.value;
    const response = await fetch(`/api/search?q=${query}`);
    const data = await response.json();
    renderResults(data);
  });
}
// თუ fetch არ არის — ფორმა ჩვეულებრივ გაიგზავნება
// სერვერზე და სრული გვერდი დაბრუნდება
</script>
```

### 6.2 Graceful Degradation (მოხდენილი დეგრადაცია)

**იდეა:** დაიწყე **თანამედროვე** ფუნქციონალურობით, დაამატე fallback-ები ძველი ბრაუზერებისთვის.

```css
/* თანამედროვე layout: CSS Grid */
.layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

/* Fallback ძველი ბრაუზერებისთვის */
@supports not (display: grid) {
  .layout {
    display: flex;
    flex-wrap: wrap;
  }
  .layout > * {
    flex: 0 0 calc(33.333% - 20px);
    margin: 10px;
  }
}
```

### 6.3 შედარება

**Progressive Enhancement:**
- საწყისი წერტილი: ძირითადი/მარტივი
- მიმართულება: ქვემოდან ზემოთ
- პრიორიტეტი: ყველას ეთვალსწინება
- ხელმისაწვდომობა: უკეთესი
- რეალური მაგალითი: HTML form + fetch enhancement

**Graceful Degradation:**
- საწყისი წერტილი: სრული/თანამედროვე
- მიმართულება: ზემოდან ქვემოთ
- პრიორიტეტი: თანამედროვე ბრაუზერი პირველი
- ხელმისაწვდომობა: შეიძლება დაიკარგოს
- რეალური მაგალითი: SPA + IE11 polyfills

> **რომელია სასურველი?** ზოგადად, **Progressive Enhancement** ითვლება უკეთეს პრაქტიკად, რადგან:
> - გვერდი ყოველთვის მუშაობს ბაზისურ დონეზე
> - ხელმისაწვდომობა (accessibility) ბუნებრივად ინტეგრირებულია
> - JavaScript-ის ჩატვირთვის შეფერხების შემთხვევაშიც გვერდი ფუნქციონალურია
>
> თუმცა პრაქტიკაში ორივე მიდგომას ერთდროულად ვიყენებთ — Progressive Enhancement HTML/CSS-ისთვის, Graceful Degradation JavaScript API-ებისთვის.

---

## ეტაპი 7: შეჯამება — გადაწყვეტილების ხე

### 7.1 როდის რას ვიყენებთ

- **ახალი სინტაქსი (syntax)** — მიდგომა: Babel ტრანსპილაცია — მაგალითი: `?.`, `??`, arrow functions
- **ახალი API** — მიდგომა: Polyfill (core-js) — მაგალითი: `Array.at()`, `structuredClone`
- **ბრაუზერ-სპეციფიკური API** — მიდგომა: Feature Detection — მაგალითი: IntersectionObserver, Service Worker
- **CSS ფუნქცია** — მიდგომა: `@supports` + fallback — მაგალითი: container queries, `:has()`

### 7.2 გადაწყვეტილების სქემა

```
ბრაუზერი კოდს ვერ აცნობს?  (SyntaxError)
│
├── დიახ ──→  Babel ტრანსპილაცია
│             (compile-time სინტაქსის გარდაქმნა)
│
└── არა ──→  ბრაუზერს API არ აქვს?  (TypeError / undefined)
             │
             ├── API პოლიფილებადია? ──→  core-js Polyfill
             │                          (runtime API დამატება)
             │
             └── არ არის პოლიფილებადი ──→  Feature Detection
                                           + fallback / progressive enhancement
```

### 7.3 Babel + core-js — ერთად მუშაობა

```
Source Code (ES2024)
       │
       ▼
   ┌────────┐
   │ Babel  │  ← babel.config.json
   └────┬───┘
        │
        ├── სინტაქსის ტრანსპილაცია  (?. → &&, ?? → ternary)
        │
        ├── useBuiltIns: "usage"
        │   └── ავტომატურად ამატებს polyfill-ებს
        │       import 'core-js/modules/es.array.at';
        │
        ▼
   Output (ES5-თავსებადი)
```

### 7.4 მთავარი Takeaway-ები

- **Babel** აგვარებს **სინტაქსის** პრობლემას — `?.`, `??`, `=>`, `class`, `let/const` ტრანსპილირდება ES5-ში
- **Polyfill** (core-js) აგვარებს **API-ის** პრობლემას — `Array.at()`, `Promise`, `Map`, `Set` ემატება runtime-ზე
- **Feature Detection** გამოიყენეთ ბრაუზერ-სპეციფიკური და არაპოლიფილებადი API-ებისთვის
- `useBuiltIns: "usage"` ავტომატურად მართავს polyfill-ებს — ხელით ჩამატება არ გჭირდებათ
- **@babel/preset-env** + **browserslist targets** = მხოლოდ საჭირო ტრანსფორმაციები
- **Progressive Enhancement** სასურველია — ბაზისური ფუნქციონალობა ყველასთვის, გაუმჯობესება თანამედროვე ბრაუზერებისთვის
