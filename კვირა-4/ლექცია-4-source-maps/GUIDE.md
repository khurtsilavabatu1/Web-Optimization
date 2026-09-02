# Source Maps — ეტაპობრივი გაიდი

Production-ში JavaScript კოდი მინიფიცირებულია — ცვლადის სახელები შეკუმშულია ერთ ასოზე, სივრცეები წაშლილია, ყველაფერი ერთ ხაზზეა. ეს მნიშვნელოვნად ამცირებს ფაილის ზომას, მაგრამ როდესაც შეცდომა ხდება, stack trace სრულიად უსარგებლოა — ხაზი 1, პოზიცია 47, ფუნქცია `a`, ცვლადი `b`. რა ინფორმაცია მოგვცა? არაფერი.

**Source Maps** სწორედ ამ პრობლემას აგვარებს — მინიფიცირებული კოდის თითოეულ პოზიციას უკან აკავშირებს ორიგინალ source code-თან: ფაილი, ხაზი, სვეტი, ფუნქციის და ცვლადის ნამდვილი სახელი.

---

პროექტი მდებარეობს `demo-source-maps/` ფოლდერში.

**პროექტი არის სრული Vite + React აპლიკაცია** შემდეგი სტრუქტურით:
- **`src/App.jsx`** — მთავარი კომპონენტი, Source Maps-ის კონცეფციის ვიზუალიზაცია
- **`src/components/UserManager.jsx`** — მომხმარებლების მენეჯერი კომპონენტი
- **`src/utils/validation.js`** — ვალიდაციის ფუნქციები (შეგნებული შეცდომებით)
- **`src/utils/calculations.js`** — მათემატიკური გამოთვლები
- **`vite.config.js`** — Vite კონფიგურაცია source maps-ის სავარჯიშოებისთვის

---

## წინაპირობა: პროექტის გაშვება

```bash
cd ~/Desktop/Web-optimization/კვირა-4/ლექცია-4-source-maps/demo-source-maps
npm install
npm run dev
```

გახსენით `http://localhost:5173` ბრაუზერში.

> **რატომ Vite?** Vite ავტომატურად გენერირებს source maps-ს development რეჟიმში. პროექტში შეგიძლიათ ექსპერიმენტი გაუკეთოთ `vite.config.js`-ში სხვადასხვა source map ოპციებს და დაინახოთ განსხვავება DevTools-ში.

---

## ეტაპი 1: გვერდის გახსნა და Console-ის მომზადება

### 1.1 გახსენით გვერდი და DevTools

1. გახსენით `http://localhost:5173` (Vite-ის default პორტი)
2. DevTools გახსენით: **Cmd+Option+J** (Mac) ან **Ctrl+Shift+J** (Windows/Linux)
3. გადაერთეთ **Console** tab-ზე

### 1.2 რას ხედავთ?

გვერდზე არის **UserManager** აპლიკაცია, რომელიც საშუალებას გაძლევთ:

- მომხმარებლების დამატება ფორმის მეშვეობით
- Source Maps-ის სხვადასხვა სცენარების ტესტირება
- DevTools-ში ნახოთ როგორ მუშაობს stack trace production build-ში

აპლიკაციაში შეგნებულად არის ჩაშენებული ვალიდაციის შეცდომები, რომლებიც დაგეხმარებათ გამოცდოთ source maps-ის მუშაობა.

> **მნიშვნელოვანი:** Console ღია გქონდეთ მთელი პრაქტიკის განმავლობაში. შეცდომების stack trace-ების ანალიზი ამ პრაქტიკის ბირთვია.

---

## ეტაპი 2: Production Build-ის შექმნა

### 2.1 Production Build

ჯერ შევქმნათ production build source maps-ის გარეშე:

```bash
npm run build
```

ეს ქმნის `dist/` ფოლდერს მინიფიცირებული ფაილებით. გახსენით `dist/index.html` ბრაუზერში ან გამოიყენეთ:

```bash
npm run preview
```

### 2.2 შეცდომის გამოწვევა

აპლიკაციაში სცადეთ მომხმარებლის დამატება ცარიელი სახელით ან არავალიდური ელფოსტით. Console-ში დაინახავთ შეცდომას მინიფიცირებული stack trace-ით:

```
Error: Invalid email format
    at a (index-abc123.js:1:4567)
    at b (index-abc123.js:1:8901)
```

### 2.3 რატომ არის ეს უსარგებლო?

- **ფუნქცია: `a`, `b`** — ერთასოიანი სახელები — არაფერს ნიშნავს
- **მდებარეობა: `1:4567`** — მთელი კოდი ერთ ხაზზეა — სვეტის ნომერი არაფერს გვეუბნება
- **ფაილი: `index-abc123.js`** — hash-იანი სახელი, ორიგინალი ფაილის სახელი უცნობია

> **დასკვნა:** მინიფიცირებული stack trace-ით debugging პრაქტიკულად შეუძლებელია. რეალურ პროექტში, სადაც ასობით კომპონენტია შეკუმშული ერთ bundle-ში, ეს სრულიად გამოუსადეგარია.

---

## ეტაპი 3: Source Maps-ის ჩართვა

### 3.1 vite.config.js-ის რედაქტირება

გახსენით `vite.config.js` და დაამატეთ source maps:

```javascript
export default {
  build: {
    sourcemap: true, // .map ფაილები გენერირდება
  },
}
```

### 3.2 ხელახალი Build

```bash
npm run build
```

ახლა `dist/assets/` ფოლდერში დაინახავთ `.js.map` ფაილებს JavaScript ფაილების გვერდით:

```
dist/assets/
  index-abc123.js
  index-abc123.js.map  ← ეს არის source map
```

### 3.3 Source Maps-თან შედარება

Preview-ს გაუშვით და ხელახლა გამოიწვიეთ შეცდომა:

```bash
npm run preview
```

ახლა DevTools-ის Console-ში stack trace სრულიად სხვანაირად გამოიყურება:

```
Error: Invalid email format
    at validateEmail (validation.js:15:11)
    at handleAddUser (UserManager.jsx:23:5)
```

**შედარება:**

- **ფუნქციის სახელი** — Source Maps გარეშე: `a` / Source Maps-თან: `validateEmail`
- **მდებარეობა** — Source Maps გარეშე: `index-abc123.js:1:4567` / Source Maps-თან: `validation.js:15:11`
- **ფაილი** — Source Maps გარეშე: `index-abc123.js` (bundle) / Source Maps-თან: `validation.js` (ორიგინალი)
- **გასაგებია?** — Source Maps გარეშე: არა / Source Maps-თან: კი

> **ეს არის source maps-ის ძალა:** production build მინიფიცირებულია (სწრაფი), მაგრამ DevTools-ში ორიგინალ კოდს ხედავთ (debugging მარტივია).

---

## ეტაპი 4: რას ხსნის Source Maps

### 4.1 პრობლემა

Production-ში კოდი ყოველთვის მინიფიცირებულია — ეს აუცილებელია სიჩქარისთვის (ფაილის ზომის შემცირება, სწრაფი ჩატვირთვა). მაგრამ მინიფიცირებული stack trace-ით debugging შეუძლებელია, როგორც ეტაპ 2-ში ვნახეთ.

### 4.2 გადაწყვეტა

**Source Maps** ავტომატურად ასრულებს ტრანსლაციას:

```
მინიფიცირებული stack trace    -->    ორიგინალი stack trace
------------------------------------------------------------
a (bundle.min.js:1:47)        -->    calculateTotal (math.js:9:5)
b, c, d                       -->    price, quantity, total
```

Build tool (Vite, Webpack) ორიგინალ კოდს მინიფიცირებს და **ორ ფაილს** ქმნის:

```
app.js  -->  Build Tool (Vite/Webpack)  -->  app.min.js
                                         -->  app.min.js.map
```

1. `app.min.js` — მინიფიცირებული კოდი (ეს ეგზავნება მომხმარებელს)
2. `app.min.js.map` — Source Map ფაილი (მხოლოდ DevTools-ისთვის)

### 4.3 როგორ პოულობს ბრაუზერი?

მინიფიცირებული ფაილის ბოლო ხაზში ჩაემატება კომენტარი:

```javascript
//# sourceMappingURL=app.min.js.map
```

DevTools ამ კომენტარს ავტომატურად კითხულობს, ჩამოტვირთავს `.map` ფაილს და Sources tab-ში ორიგინალ კოდს აჩვენებს — თითქოს მინიფიკაცია არც მომხდარა.

> **მნიშვნელოვანი:** Source Maps მხოლოდ DevTools-ში მუშაობს. საბოლოო მომხმარებელს ისინი არ ჩანს და საიტის სიჩქარეზე არ მოქმედებს — ბრაუზერი `.map` ფაილს მხოლოდ მაშინ ჩამოტვირთავს, თუ DevTools გახსნილია.

---

## ეტაპი 5: Source Map ფაილის სტრუქტურა

### 5.1 JSON ფორმატი

Source Map არის ჩვეულებრივი JSON ფაილი `.map` გაფართოებით. მის სტრუქტურას ნახავთ გვერდის მესამე სექციაში:

```json
{
  "version":        3,
  "file":           "app.min.js",
  "sources":        ["src/math.js", "src/utils.js"],
  "names":          ["calculateTotal", "price", "quantity", "total"],
  "mappings":       "AAAA,SAASA,eAAeC,EAAOC,GAC7B...",
  "sourcesContent": ["function calculateTotal(price, quantity) { ... }"]
}
```

### 5.2 ველების აღწერა

- **`version`** — Source Map-ის ვერსია — ყოველთვის `3` (მიმდინარე სტანდარტი)
- **`file`** — გენერირებული (minified) ფაილის სახელი
- **`sources`** — ორიგინალი source ფაილების სია — შეიძლება ბევრი ფაილი იყოს
- **`names`** — ორიგინალი ცვლადებისა და ფუნქციების სახელები, რომლებიც მინიფიკაციისას შეიცვალა
- **`mappings`** — Base64 VLQ-ით დაშიფრული პოზიციების რუკა — მინიფიცირებული სვეტი/ხაზი -> ორიგინალი ფაილი/ხაზი/სვეტი
- **`sourcesContent`** — ორიგინალი კოდი ჩაშენებული (არასავალდებულო) — რომ `.map` ფაილი თვითკმარი იყოს

### 5.3 Mapping ცხრილი (ჩვენი მაგალითისთვის)

- **`a`** → `calculateTotal` — ფუნქციის სახელი
- **`b`** → `price` — პირველი პარამეტრი
- **`c`** → `quantity` — მეორე პარამეტრი
- **`d`** → `total` — ლოკალური ცვლადი

> **mappings ველი** — ყველაზე რთული ნაწილი. ის Base64 VLQ კოდირებას იყენებს, რომ თითოეულ სიმბოლოს მინიფიცირებულ ფაილში შეუსაბამოს ორიგინალი ფაილი, ხაზი, სვეტი და სახელი. ამ კოდირების დეტალები დეველოპერს ხელით არ უხდება — build tool ავტომატურად აკეთებს.

---

## ეტაპი 6: Vite-ში კონფიგურაცია

### 6.1 Source Maps-ის ჩართვა

Vite-ში source maps ჩართვა ძალიან მარტივია — `vite.config.js`-ში:

```javascript
// vite.config.js
export default {
  build: {
    sourcemap: true,     // .map ფაილები გენერირდება
  },
};
```

### 6.2 ყველა ვარიანტი

- **`true`** — რას აკეთებს: `.map` ფაილი + `sourceMappingURL` კომენტარი — როდის: Development, ან თუ `.map` ფაილების საჯაროობა არ გაწუხებთ
- **`'hidden'`** — რას აკეთებს: `.map` ფაილი, **კომენტარის გარეშე** — როდის: Production (რეკომენდებული)
- **`'inline'`** — რას აკეთებს: Source map ჩაშენებული JS ფაილშივე (Base64) — როდის: მხოლოდ development
- **`false`** — რას აკეთებს: Source maps არ გენერირდება (default) — როდის: როცა არ გჭირდებათ

> **Development-ში** Vite ავტომატურად რთავს source maps-ს `dev` სერვერის რეჟიმში — ცალკე კონფიგურაცია არ სჭირდება. `build` ბლოკი მხოლოდ `vite build` ბრძანებისთვის (production build) მუშაობს.

---

## ეტაპი 7: Webpack-ში კონფიგურაცია

### 7.1 `devtool` პარამეტრი

Webpack-ში source maps `devtool` პარამეტრით კონფიგურირდება:

```javascript
// webpack.config.js
module.exports = {
  devtool: 'source-map',            // production — სრული source map
  // devtool: 'eval-source-map',    // development — სწრაფი rebuild
  // devtool: 'hidden-source-map',  // production — .map კომენტარის გარეშე
};
```

### 7.2 ძირითადი ვარიანტები

- **`'source-map'`** — Build: ნელი — ხარისხი: სრული, ზუსტი — გამოყენება: Production
- **`'hidden-source-map'`** — Build: ნელი — ხარისხი: სრული, ზუსტი — გამოყენება: Production (Sentry-სთვის)
- **`'eval-source-map'`** — Build: სწრაფი — ხარისხი: კარგი — გამოყენება: Development
- **`'cheap-module-source-map'`** — Build: საშუალო — ხარისხი: ხაზ-ხაზ (სვეტის გარეშე) — გამოყენება: Development
- **`false`** — Source maps გამორთულია

> **განსხვავებები:**
> - `eval-source-map` — development-ისთვის კარგი ბალანსი (სწრაფი rebuild, კარგი ხარისხი)
> - `source-map` — სრული, ზუსტი mapping (ნელი build, production-ისთვის)
> - `hidden-source-map` — იგივე `source-map`, მაგრამ `sourceMappingURL` კომენტარი არ ემატება
> - `nosources-source-map` — ხაზის ნომრები და ფუნქციების სახელები ჩანს, მაგრამ ორიგინალი კოდი არა

---

## ეტაპი 8: უსაფრთხოება — `hidden-source-map` Production-ისთვის

### 8.1 რატომ არის ეს მნიშვნელოვანი?

Source Map ფაილი შეიცავს **მთელ ორიგინალ კოდს** — ცვლადების სახელებს, ბიზნეს-ლოგიკას, კომენტარებს, შიდა API-ების მისამართებს. თუ ეს ფაილი საჯაროდ ხელმისაწვდომია, ნებისმიერ ადამიანს შეუძლია ნახოს თქვენი source კოდი.

ეს ნიშნავს:
- ბიზნეს ლოგიკის გამჟღავნება
- API endpoint-ების და key-ების გამოაშკარავება
- უსაფრთხოების ხვრელების პოვნა თავდამსხმელის მიერ

### 8.2 `hidden-source-map` — სწორი მიდგომა

- **`source-map`** — `.map` ფაილი: გენერირდება — `sourceMappingURL` კომენტარი: ჩაემატება — საჯაროდ ხელმისაწვდომი: კი — ბრაუზერი პოულობს
- **`hidden-source-map`** — `.map` ფაილი: გენერირდება — `sourceMappingURL` კომენტარი: **არ** ჩაემატება — საჯაროდ ხელმისაწვდომი: არა — ხელით უნდა ატვირთოთ

```javascript
// Vite
export default {
  build: {
    sourcemap: 'hidden',  // .map ფაილი იქმნება, მაგრამ კომენტარი არ ემატება
  },
};

// Webpack
module.exports = {
  devtool: 'hidden-source-map',
};
```

### 8.3 Sentry-სთან ინტეგრაცია

Production-ისთვის რეკომენდებული workflow:

1. Build-ის დროს `hidden-source-map` გამოიყენეთ
2. `.map` ფაილები Sentry-ზე ატვირთეთ
3. Deploy-ის დროს `.map` ფაილები **არ** ატვირთოთ საჯარო სერვერზე

```bash
# Sentry CLI-ით source maps-ის ატვირთვა
sentry-cli sourcemaps upload \
  --release=1.0.0 \
  --url-prefix='~/assets' \
  ./dist/assets
```

ან CI/CD-ში (GitHub Actions):

```yaml
# .github/workflows/deploy.yml
- name: Upload Source Maps to Sentry
  run: |
    npx @sentry/cli sourcemaps upload \
      --release=${{ github.sha }} \
      ./dist/assets
  env:
    SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
    SENTRY_ORG: my-org
    SENTRY_PROJECT: my-project
```

> **წესი:** Production-ში არასდროს გამოიყენოთ `source-map` (საჯარო). გამოიყენეთ `hidden-source-map` და error tracking სერვისს ცალკე მიაწოდეთ `.map` ფაილები.

---

## ეტაპი 9: გავრცელებული React შეცდომები — სწრაფი Reference

Source Maps-ის გარეშე ქვემოთ ჩამოთვლილი შეცდომები კიდევ უფრო რთულია debugging-ისთვის — მინიფიცირებულ bundle-ში კომპონენტის სახელიც კი არ ჩანს. Source Maps-ით DevTools ზუსტ კომპონენტს და ხაზს მიუთითებს.

- **`Cannot read properties of undefined`** — მიზეზი: მონაცემები ჯერ არ ჩატვირთულა — გამოსწორება: optional chaining (`?.`) ან loading state
- **`Objects are not valid as a React child`** — მიზეზი: ობიექტის პირდაპირ render — გამოსწორება: `obj.propertyName`
- **`Each child should have a unique key`** — მიზეზი: `.map()`-ში key არ არის — გამოსწორება: `key={item.id}`
- **`Too many re-renders`** — მიზეზი: `setState` render-ის დროს — გამოსწორება: event handler ან `useEffect`
- **`Cannot update while rendering different component`** — მიზეზი: სხვა კომპონენტის state ცვლილება render-ში — გამოსწორება: `useEffect`

### მაგალითი: optional chaining-ით დაცვა

```javascript
// პრობლემა — data ჯერ არ ჩატვირთულა, undefined.name ისვრის შეცდომას
<h1>{data.name}</h1>

// გამოსწორება — optional chaining
<h1>{data?.name}</h1>

// ან — loading state
if (!data) return <div>Loading...</div>;
<h1>{data.name}</h1>
```

### მაგალითი: key prop

```javascript
// პრობლემა — key არ არის
{items.map(item => <li>{item.name}</li>)}

// გამოსწორება — უნიკალური key
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

> **Source Maps + React DevTools = debugging სუპერძალა.** Source Maps გვიჩვენებს ზუსტ ფაილს და ხაზს, React DevTools კი კომპონენტის state-ს და props-ს. ორივე ერთად — პრობლემის მოძებნა წამებში ხდება.

---

## ეტაპი 10: შეჯამება

### 10.1 რა ვისწავლეთ?

- **Minification** — კოდის შეკუმშვა production-ისთვის — ზომის შემცირება, მაგრამ წაუკითხაობა
- **Source Maps** — მინიფიცირებული პოზიციის ტრანსლაცია ორიგინალში — ფაილი, ხაზი, სახელი
- **`.map` ფაილები** — JSON ფაილი mapping ინფორმაციით (version, sources, names, mappings)
- **Vite** — `build: { sourcemap: true }` ან `'hidden'`
- **Webpack** — `devtool: 'source-map'` ან `'hidden-source-map'`
- **უსაფრთხოება** — `hidden-source-map` — `.map` ფაილი იქმნება, მაგრამ საჯარო არ არის
- **Error Monitoring** — Sentry/LogRocket — `.map` ფაილების ცალკე ატვირთვა

### 10.2 Source Maps-ის პროცესი

```
ორიგინალი კოდი (app.js)
       |
       v
Build Tool (Vite / Webpack)
       |
       v
app.min.js  +  app.min.js.map
       |              |
       v              v
ბრაუზერი          DevTools
(სწრაფი)        (ორიგინალი ჩანს)
```

### 10.3 კონფიგურაციის ჩეკლისტი

- **Vite** — Development: ავტომატურად ჩართულია — Production: `build: { sourcemap: 'hidden' }`
- **Webpack** — Development: `devtool: 'eval-source-map'` — Production: `devtool: 'hidden-source-map'`
- **Error Tracking** — Development: არ სჭირდება — Production: Sentry-ზე `.map` ფაილების ატვირთვა
- **უსაფრთხოება** — Development: არ აქვს მნიშვნელობა — Production: `.map` ფაილები **არ** უნდა იყოს საჯარო

### 10.4 მთავარი წესები

> 1. **Development-ში** source maps ყოველთვის ჩართეთ — debugging ბევრად ადვილია.
> 2. **Production-ში** გამოიყენეთ `hidden-source-map` — `.map` ფაილები არ გახდება საჯარო.
> 3. **Error tracking სერვისს** (Sentry, Bugsnag) ცალკე ატვირთეთ `.map` ფაილები.
> 4. **არასდროს** გამოაქვეყნოთ source maps საჯარო სერვერზე — ის შეიცავს სრულ ორიგინალ კოდს.

> Production-ის debugging workflow: შეცდომა ხდება --> Sentry იჭერს მინიფიცირებულ stack trace-ს (`a`, ხაზი 1) --> Source Maps-ით ტრანსლირებს ორიგინალში --> თქვენ ხედავთ: `calculateTotal`, ხაზი 4, `throw new Error("overflow")`.
