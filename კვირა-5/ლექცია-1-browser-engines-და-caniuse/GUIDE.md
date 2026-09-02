# Browser Engines & caniuse — ეტაპობრივი გაიდი

ამ პრაქტიკაში ნახავთ, როგორ განსხვავდება თანამედროვე CSS/JS ფუნქციების მხარდაჭერა სხვადასხვა ბრაუზერში, გაეცნობით რენდერინგის ძრავების მნიშვნელობას და ისწავლით **caniuse.com**-ისა და **Browserslist**-ის პრაქტიკულ გამოყენებას.

ჩვენ გვაქვს ერთი პროექტი — `demo-browser-features/`. ის 6 თანამედროვე ფუნქციას აჩვენებს ცოცხალი დემოებით, კოდის მაგალითებით და ბრაუზერის მხარდაჭერის ბეჯებით.

- **`src/App.jsx`** — მთავარი React კომპონენტი — 6 ფუნქციის დემო სექციები
- **`src/components/BrowserInfo.jsx`** — ბრაუზერის ინფორმაციის კომპონენტი
- **`src/components/FeatureCategory.jsx`** — ფუნქციის კატეგორიის wrapper კომპონენტი
- **`src/components/FeatureCard.jsx`** — ცალკეული ფუნქციის ბარათი კომპონენტი
- **`src/components/CodeExample.jsx`** — კოდის მაგალითის კომპონენტი

---

## წინაპირობა: პროექტის გაშვება

```bash
cd ~/Desktop/Web-optimization/კვირა-5/ლექცია-1-browser-engines-და-caniuse/demo-browser-features
npm install
npm run dev
```

გახსენით ბრაუზერში Vite-ის მიერ მითითებულ მისამართზე (ჩვეულებრივ `http://localhost:5173`).

> პროექტი აწყობილია Vite + React-ზე. `npm install` პირველად გაშვებისას აუცილებელია დეპენდენსების დასაყენებლად. `npm run dev` ხსნის development სერვერს hot reload-ით.

---

## ეტაპი 1: გვერდის გახსნა — რომელი ფუნქციები მუშაობს?

### 1.1 პირველი შეხედვა

1. გახსენით აპლიკაცია ბრაუზერში (Vite dev server-ის მითითებული URL)
2. პირველი, რაც დაინახავთ, არის **Hero სექცია** — ის მთელ ეკრანს იკავებს `100dvh` უნიტის წყალობით
3. ნავიგაციის ღილაკებით გადახვიდეთ თითოეულ სექციაზე
4. ყოველ ბარათზე მწვანე ბეჯი აჩვენებს მხარდაჭერის პროცენტს

### 1.2 რას ხედავთ?

გვერდზე 6 სექციაა, თითოეული ერთ თანამედროვე ფუნქციას წარმოადგენს:

1. **CSS Container Queries** (CSS) — ბარათი layout-ს იცვლის კონტეინერის სიგანის მიხედვით
2. **CSS `:has()` Selector** (CSS) — მშობელი ელემენტი სტილს იცვლის შვილის მდგომარეობით
3. **CSS `dvh` Units** (CSS) — Hero სექცია დინამიურ viewport სიმაღლეს იყენებს
4. **`<dialog>` Element** (HTML/JS) — native მოდალი backdrop-ით და Esc-ით დახურვით
5. **`structuredClone()`** (JS) — ობიექტის deep copy — Date, Set, Map შენარჩუნებით
6. **`Array.at()`** (JS) — მასივის ელემენტი უარყოფითი ინდექსით

### 1.3 პირველადი ტესტი

სწრაფად სცადეთ თითოეული ფუნქცია:

- **Container Queries:** სლაიდერი გადაათრიეთ — ბარათის layout შეიცვლება?
- **:has():** checkbox-ები მონიშნეთ — ჯგუფი ჰაილაითდება?
- **dvh:** Hero სექცია მთელ ეკრანს იკავებს?
- **dialog:** „მოდალის გახსნა" ღილაკი მუშაობს?
- **structuredClone():** „დემოს გაშვება" — შედეგი გამოჩნდა?
- **Array.at():** „დემოს გაშვება" — შედეგი გამოჩნდა?

> **კითხვა:** ყველა ფუნქცია იმუშავა თქვენს ბრაუზერში? თუ რომელიმე არ მუშაობს, ჩაინიშნეთ — ეტაპ 2-ში გავარკვევთ, რატომ.

---

## ეტაპი 2: რენდერინგის ძრავები — Blink, WebKit, Gecko

### 2.1 ძრავების ცხრილი

ბრაუზერი და ძრავა ერთი და იგივე არ არის. სხვადასხვა ბრაუზერი შეიძლება ერთსა და იმავე ძრავას იყენებდეს:

- **Blink** (Google) — JS ძრავა: V8 — ბრაუზერები: Chrome, Edge, Opera, Brave, Vivaldi — წილი: ~72%
- **WebKit** (Apple) — JS ძრავა: JavaScriptCore — ბრაუზერები: Safari, iOS-ის ყველა ბრაუზერი* — წილი: ~18%
- **Gecko** (Mozilla) — JS ძრავა: SpiderMonkey — ბრაუზერები: Firefox — წილი: ~3%

> **\* მნიშვნელოვანი:** iOS-ზე ყველა ბრაუზერი — Chrome iOS, Firefox iOS, Edge iOS — სინამდვილეში **WebKit**-ს იყენებს. Apple-ის პოლიტიკა ამას მოითხოვს. ანუ iOS-ზე „Chrome" რეალურად Safari-ს engine-ზე მუშაობს.

### 2.2 რატომ არის მნიშვნელოვანი?

რენდერინგის ძრავა განსაზღვრავს, **როგორ** ინტერპრეტირდება HTML, CSS და JavaScript. პრაქტიკული შედეგი:

- **Chrome-ში მუშაობს** — Edge-შიც და Opera-შიც იმუშავებს (სამივე Blink-ია)
- **Safari-ში არ მუშაობს** — iOS-ის არცერთ ბრაუზერში არ იმუშავებს
- **Firefox-ში მუშაობს** — მხოლოდ Firefox-ში — Gecko დამოუკიდებელი ძრავაა

### 2.3 პრობლემური სფეროები

ისტორიულად Safari (WebKit) ყველაზე ხშირად ჩამორჩება ახალი ფუნქციების დანერგვაში:

**CSS-ში:**
- `backdrop-filter` — prefix (`-webkit-`) სჭირდებოდა
- `:has()` selector — Safari-მ Chrome-ზე ადრე დაამატა (იშვიათი გამონაკლისი!)
- `100vh` — iOS Safari-ში address bar-ს არ ითვალისწინებდა

**JavaScript-ში:**
- `structuredClone()` — Safari 15.4-დან, Chrome-ზე გვიან
- Optional chaining (`?.`) — ძველ ბრაუზერებში არ მუშაობს
- `ResizeObserver` — Safari-მ გვიან დაამატა

> **მთავარი აზრი:** Chrome-ში მუშაობს არ ნიშნავს ყველგან მუშაობს. ტესტირება სამივე ძრავაზე (Blink, WebKit, Gecko) აუცილებელია.

---

## ეტაპი 3: ფუნქციების გასინჯვა და Console-ის შემოწმება

### 3.1 DevTools Console-ის გახსნა

DevTools გახსენით: **Cmd+Option+J** (Mac) ან **Ctrl+Shift+J** (Windows/Linux)

### 3.2 CSS Container Queries

1. **სლაიდერი** გადაათრიეთ მარცხნივ-მარჯვნივ
2. დააკვირდით — ბარათი **ვერტიკალურიდან ჰორიზონტალურ** layout-ზე გადავა 450px-ის ზღვარზე
3. Console-ში შეამოწმეთ:

```javascript
CSS.supports('container-type', 'inline-size')
// true = მხარდაჭერილია
```

> Container Queries არის media queries-ის ევოლუცია — კომპონენტი **საკუთარი კონტეინერის** ზომაზე რეაგირებს, viewport-ის ნაცვლად. ეს ნამდვილი component-based responsive design-ია.

### 3.3 CSS `:has()` Selector

1. **მონიშნეთ** checkbox-ები სათითაოდ
2. მთელი ჯგუფი (მშობელი `.form-group`) ფერსა და ბორდერს შეიცვლის
3. Console-ში:

```javascript
CSS.supports('selector(:has(*))')
// true = მხარდაჭერილია
```

> `:has()` არის CSS-ის „მშობლის სელექტორი" — ათწლეულობით ყველაზე მოთხოვნადი ფუნქცია. ამით მშობელ ელემენტს შვილის მდგომარეობის მიხედვით ვცვლით სტილს, JavaScript-ის გარეშე.

### 3.4 CSS `dvh` Units

1. Hero სექცია `100dvh`-ს იყენებს — მთელ ეკრანს უნდა იკავებდეს
2. dvh vs vh შედარების ბოქსები ვიზუალურ სხვაობას აჩვენებს
3. Console-ში:

```javascript
CSS.supports('height', '100dvh')
// true = მხარდაჭერილია
```

> `100vh` მობილურ Safari-ში address bar-ს არ ითვალისწინებს — კონტენტი „გადმოცდება". `100dvh` ეს პრობლემა მოაგვარა — დინამიურად ადაპტირდება address bar-ის ჩვენება/დამალვისას.

### 3.5 HTML `<dialog>` Element

1. დააჭირეთ **„მოდალის გახსნა"** ღილაკს
2. Backdrop ავტომატურად ჩნდება blur ეფექტით
3. სცადეთ სამი გზით დახურვა: **Esc კლავიში**, **backdrop-ზე დაჭერა**, **ღილაკი**
4. Console-ში ნახავთ: `Dialog closed — returnValue: "cancel"` ან `"confirm"` ან `"backdrop"`

```javascript
typeof HTMLDialogElement.prototype.showModal
// "function" = მხარდაჭერილია
```

> `<dialog>` ელემენტამდე მოდალისთვის გვჭირდებოდა JavaScript ბიბლიოთეკა, ARIA ატრიბუტები, focus trapping. ახლა ბრაუზერი ყველაფერს თავად აკეთებს — accessibility ჩაშენებულია.

### 3.6 JavaScript `structuredClone()`

1. დააჭირეთ **„დემოს გაშვება"**
2. შედეგში ნახავთ: კლონირებული ობიექტის ცვლილება **ორიგინალზე არ მოქმედებს**
3. ბოლოში — JSON vs structuredClone შედარება: Date ტიპი JSON-ით იკარგება

```javascript
typeof structuredClone
// "function" = მხარდაჭერილია
```

> `JSON.parse(JSON.stringify(...))` წლობით იყო deep copy-ის ერთადერთი გზა, მაგრამ ის Date-ს, Set-ს, Map-ს და RegExp-ს კარგავს. `structuredClone()` ამ პრობლემას ნატიურად აგვარებს.

### 3.7 JavaScript `Array.at()`

1. დააჭირეთ **„დემოს გაშვება"**
2. უარყოფითი ინდექსი ბოლოდან ითვლის: `.at(-1)` = ბოლო ელემენტი
3. String-ზეც მუშაობს — ქართული სიმბოლოებითაც (`'თბილისი'.at(-1)` = `'ი'`)

```javascript
typeof Array.prototype.at
// "function" = მხარდაჭერილია
```

### 3.8 ერთიანი შემოწმების სკრიპტი

Console-ში ჩასვით ეს სკრიპტი ყველა ფუნქციის ერთდროული შემოწმებისთვის:

```javascript
const features = [
  { name: 'Container Queries', test: () => CSS.supports('container-type', 'inline-size') },
  { name: ':has() Selector',   test: () => CSS.supports('selector(:has(*))') },
  { name: 'dvh Units',         test: () => CSS.supports('height', '100dvh') },
  { name: '<dialog>',          test: () => typeof HTMLDialogElement !== 'undefined' },
  { name: 'structuredClone()', test: () => typeof structuredClone === 'function' },
  { name: 'Array.at()',        test: () => typeof Array.prototype.at === 'function' },
];

console.table(features.map(f => ({
  Feature: f.name,
  Supported: f.test() ? 'Yes' : 'No'
})));
```

> თანამედროვე ბრაუზერში (Chrome 115+, Firefox 121+, Safari 17+) ყველა ფუნქცია მხარდაჭერილი უნდა იყოს. მაგრამ მომხმარებლების ნაწილი ძველ ვერსიებს იყენებს — სწორედ ამიტომ გვჭირდება caniuse.

---

## ეტაპი 4: caniuse.com — თითოეული ფუნქციის შემოწმება

### 4.1 გახსენით caniuse.com

1. ბრაუზერში გახსენით [caniuse.com](https://caniuse.com)
2. საძიებო ველში ჩაწერეთ ფუნქციის სახელი (ინგლისურად)

### 4.2 ფერების მნიშვნელობა

- **მწვანე** — სრულად მხარდაჭერილი
- **ღია მწვანე** — ნაწილობრივ მხარდაჭერილი (prefix ან შეზღუდვებით)
- **წითელი** — არ არის მხარდაჭერილი
- **ნაცრისფერი** — უცნობია

### 4.3 მოძებნეთ თითოეული ფუნქცია

პირდაპირი ბმულები:

1. **CSS Container Queries** — [caniuse.com/css-container-queries](https://caniuse.com/css-container-queries)
2. **CSS :has() Selector** — [caniuse.com/css-has](https://caniuse.com/css-has)
3. **CSS dvh Units** — [caniuse.com/viewport-unit-variants](https://caniuse.com/viewport-unit-variants)
4. **dialog Element** — [caniuse.com/dialog](https://caniuse.com/dialog)
5. **structuredClone()** — [caniuse.com/mdn-api_structuredclone](https://caniuse.com/mdn-api_structuredclone)
6. **Array.at()** — [caniuse.com/mdn-javascript_builtins_array_at](https://caniuse.com/mdn-javascript_builtins_array_at)

### 4.4 შეავსეთ ცხრილი

თითოეულისთვის ჩაწერეთ ვერსია, საიდანაც მხარდაჭერა დაიწყო, და გლობალური support პროცენტი:

თითოეულისთვის ჩაწერეთ Chrome, Firefox, Safari ვერსია, Support % და Fallback საჭიროა თუ არა:

- **Container Queries** — Chrome: ___ / Firefox: ___ / Safari: ___ / Support: ___% / Fallback: ___
- **`:has()` Selector** — Chrome: ___ / Firefox: ___ / Safari: ___ / Support: ___% / Fallback: ___
- **`dvh` Units** — Chrome: ___ / Firefox: ___ / Safari: ___ / Support: ___% / Fallback: ___
- **`<dialog>` Element** — Chrome: ___ / Firefox: ___ / Safari: ___ / Support: ___% / Fallback: ___
- **`structuredClone()`** — Chrome: ___ / Firefox: ___ / Safari: ___ / Support: ___% / Fallback: ___
- **`Array.at()`** — Chrome: ___ / Firefox: ___ / Safari: ___ / Support: ___% / Fallback: ___

### 4.5 რას უნდა მიაქციოთ ყურადღება

თითოეული ფუნქციისთვის იკითხეთ:

1. **რომელ ვერსიიდან** არის მხარდაჭერილი სამივე ძრავაზე?
2. **რა პროცენტი** მომხმარებლებისა შეძლებს გამოყენებას?
3. **Known Issues** tab — შეიძლება მხარდაჭერილია, მაგრამ bug-ებით
4. **მობილური ბრაუზერები** — iOS Safari ცალკე სვეტში ნაჩვენებია

> ყურადღება მიაქციეთ არა მარტო Desktop ბრაუზერებს — **მობილურ ბრაუზერებსაც** შეამოწმეთ. iOS Safari ხშირად Desktop Safari-სგანაც ჩამორჩება, და რადგან iOS-ზე ყველა ბრაუზერი WebKit-ზეა — ეს მთელ iOS-ს ეხება.

---

## ეტაპი 5: Browserslist კონფიგურაცია — რას აკეთებს `package.json`-ში

### 5.1 რა არის Browserslist?

**Browserslist** არის კონფიგურაცია, რომელიც build ინსტრუმენტებს ეუბნება — **რომელ ბრაუზერებს** უნდა მხარი დაუჭიროს პროექტმა. ის თავად არაფერს აკეთებს — სხვა ინსტრუმენტები კითხულობენ მას.

### 5.2 სად ვწერთ?

`package.json`-ში:

```json
{
  "name": "my-project",
  "browserslist": [
    "> 0.5%",
    "last 2 versions",
    "not dead",
    "not ie 11"
  ]
}
```

ან ცალკე `.browserslistrc` ფაილში:

```
> 0.5%
last 2 versions
not dead
not ie 11
```

### 5.3 Query-ების ახსნა

- **`> 0.5%`** — ბრაუზერები გლობალური market share-ის 0.5%-ზე მეტით
- **`last 2 versions`** — თითოეული ბრაუზერის ბოლო 2 ვერსია
- **`not dead`** — მხოლოდ „ცოცხალი" ბრაუზერები (ოფიციალური განახლებები გამოდის)
- **`not ie 11`** — Internet Explorer 11-ის გამორიცხვა
- **`defaults`** — ნაგულისხმევი: `> 0.5%, last 2 versions, Firefox ESR, not dead`
- **`> 1% in GE`** — საქართველოში 1%-ზე მეტი market share

### 5.4 ვინ იყენებს Browserslist-ს?

- **Babel** — JS ტრანსპილაცია — `?.`, `??`, `Array.at()` ძველ სინტაქსზე გადაიყვანს
- **Autoprefixer** — CSS prefix-ები ავტომატურად: `-webkit-backdrop-filter`
- **PostCSS** — CSS-ის ტრანსფორმაცია — თანამედროვე CSS ძველ ფორმატში
- **ESLint** — გაფრთხილებს, თუ target ბრაუზერში მხარდაუჭერელ ფუნქციას იყენებთ

### 5.5 სცადეთ ტერმინალში

```bash
# რომელ ბრაუზერებს მოიცავს ნაგულისხმევი კონფიგურაცია?
npx browserslist "defaults"

# კონკრეტული query
npx browserslist "> 0.5%, last 2 versions, not dead"

# საქართველოსთვის
npx browserslist "> 1% in GE"
```

> **ანალოგია:** Browserslist არის „კონტრაქტი" — თქვენ აცხადებთ: „ჩემი პროექტი ამ ბრაუზერებს უჭერს მხარს", და Babel/Autoprefixer/PostCSS ავტომატურად მოერგება. კონფიგურაცია ერთხელ ვწერთ, ყველა ინსტრუმენტი ამას კითხულობს.

---

## ეტაპი 6: შეჯამება — უსაფრთხოდ გამოსაყენებელი vs Fallback საჭირო

### 6.1 დღევანდელი მდგომარეობა

- **CSS Container Queries** — მხარდაჭერა: ~91% — სტატუსი: უსაფრთხო — გამოიყენეთ, ძველ ბრაუზერებს media queries fallback
- **CSS `:has()`** — მხარდაჭერა: ~91% — სტატუსი: უსაფრთხო — გამოიყენეთ, `@supports selector(:has(*))` fallback-ით
- **CSS `dvh`** — მხარდაჭერა: ~90% — სტატუსი: უსაფრთხო — გამოიყენეთ `vh` fallback-ით — აუცილებლად
- **`<dialog>`** — მხარდაჭერა: ~96% — სტატუსი: უსაფრთხო — გამოიყენეთ თამამად, polyfill ძველი ბრაუზერებისთვის
- **`structuredClone()`** — მხარდაჭერა: ~95% — სტატუსი: უსაფრთხო — გამოიყენეთ, `JSON.parse(JSON.stringify())` fallback
- **`Array.at()`** — მხარდაჭერა: ~96% — სტატუსი: უსაფრთხო — გამოიყენეთ თამამად, პატარა polyfill ადვილია

> **საერთო წესი:** თუ support 90%-ს აღემატება და fallback ადვილია — თამამად გამოიყენეთ. თუ 90%-ზე დაბალია და fallback რთულია — დაელოდეთ ან polyfill გამოიყენეთ.

### 6.2 Fallback-ის სტრატეგიები

**CSS — `@supports` feature detection:**

```css
/* საბაზისო — ყველა ბრაუზერში მუშაობს */
.hero {
  min-height: 100vh;
}

/* Enhancement — dvh მხარდაჭერის შემთხვევაში */
@supports (min-height: 100dvh) {
  .hero {
    min-height: 100dvh;
  }
}
```

**როგორ მუშაობს `@supports`?**

`@supports` არის CSS-ის **feature query** — ბრაუზერს ეკითხება: „შენ ეს CSS property/value გესმის?"

- **ძველი ბრაუზერი** — კითხულობს `100vh` (საბაზისო), `@supports` ბლოკს ვერ ხვდება → გამოტოვებს, არაფერი იტყდება
- **თანამედროვე ბრაუზერი** — ჯერ `100vh` წაიკითხავს, მერე `@supports`-ში შეამოწმებს — „კი, `dvh` მესმის!" → გადაწერს `100dvh`-ით

**რატომ `dvh` და არა `vh`?**

- `vh` — viewport-ის სიმაღლე, მაგრამ მობილურზე არ ითვალისწინებს address bar-ს (URL ზოლი ზემოთ)
- `dvh` (dynamic viewport height) — ითვალისწინებს address bar-ის გაქრობა/გამოჩენას. მობილურზე scroll-ის დროს address bar იმალება — `dvh` ამას ერგება, `vh` ვერა

> **`@supports`-ის ლოგიკა:** თუ ბრაუზერს ესმის CSS → გამოიყენე; თუ არა → გამოტოვე, არაფერი არ გაფუჭდება. ეს არის **Progressive Enhancement** — ძველისთვის მუშაობს საბაზისო ვერსია, ახალისთვის ემატება გაუმჯობესება.

**JavaScript — feature detection:**

```javascript
// structuredClone fallback
function deepClone(obj) {
  if (typeof structuredClone === 'function') {
    return structuredClone(obj);
  }
  return JSON.parse(JSON.stringify(obj));
}

// Array.at() polyfill
if (!Array.prototype.at) {
  Array.prototype.at = function(index) {
    index = Math.trunc(index) || 0;
    if (index < 0) index += this.length;
    return this[index];
  };
}
```

### 6.3 მთავარი წესები

1. **ჯერ caniuse.com შეამოწმეთ** — არასოდეს დაეყრდნოთ ინტუიციას
2. **Browser Engine = მხარდაჭერა** — Blink-ში მუშაობს? Chrome, Edge, Opera-შიც. მაგრამ Safari-ში ცალკე შეამოწმეთ
3. **Browserslist განსაზღვრეთ** პროექტის დასაწყისში — ინსტრუმენტები ავტომატურად მოერგება
4. **Feature Detection > Browser Detection** — არასოდეს `navigator.userAgent`, ყოველთვის `@supports` ან `typeof`
5. **Progressive Enhancement** — ჯერ საბაზისო გამოცდილება, შემდეგ გაუმჯობესება
6. **ტესტირება სამივე ძრავაზე** — Chrome-ში მუშაობს არ ნიშნავს Safari-ში ან Firefox-ში მუშაობს

> ვებ-დეველოპერის ამოცანა არ არის ყველა ბრაუზერში იდენტური გამოცდილების მიცემა — ამოცანაა **ყველა ბრაუზერში მუშაობადი** გამოცდილების მიცემა. თანამედროვე ბრაუზერები მეტს მიიღებენ, ძველები — ბაზისურ ვერსიას.
