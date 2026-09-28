# CSS Compatibility Demo - Vite + React

თანამედროვე CSS ფუნქციების დემო პროექტი Vite + React-ზე დაფუძნებული.

## პროექტის სტრუქტურა

```
demo-css-compatibility/
├── package.json                # "browserslist" — აქ წყდება, რა prefix დაემატება
├── vite.config.js
├── postcss.config.js           # Autoprefixer ჩართულია აქ
├── index.html
├── scripts/
│   └── show-prefixes.mjs       # `npm run prefixes` — before/after შედარება
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── modern.css              # თანამედროვე CSS ფუნქციები
    ├── fallback.css            # Fallback სტილები ძველი ბრაუზერებისთვის
    └── components/
        ├── StyleToggle.jsx     # Modern/Fallback გადამრთველი
        ├── FeatureDemo.jsx     # ფუნქციების შედარების ბარათი
        ├── ContainerQueryDemo.jsx
        ├── ColorMixDemo.jsx
        ├── CssNestingDemo.jsx
        └── SupportDetector.jsx # ბრაუზერის მხარდაჭერის შემოწმება
```

## ფუნქციონალი

### თანამედროვე CSS ფუნქციები
1. **Container Queries** - კონტეინერის ზომაზე დაფუძნებული სტილები
2. **color-mix()** - ფერების დინამიური შერევა
3. **CSS Nesting** - Sass-ის მსგავსი სინტაქსი
4. **@layer** - CSS cascade-ის კონტროლი
5. **:has()** - მშობელი ელემენტის სელექცია
6. **text-wrap: balance** - ტექსტის ბალანსირება

### დემო კომპონენტები
- **StyleToggle** - თანამედროვე და fallback CSS-ს შორის გადართვა
- **ContainerQueryDemo** - Container vs Media Queries შედარება
- **ColorMixDemo** - color-mix() vs წინასწარ გამოთვლილი ფერები
- **CssNestingDemo** - CSS Nesting vs Flat Selectors
- **SupportDetector** - CSS.supports() API გამოყენებით ბრაუზერის შემოწმება

## ინსტალაცია და გაშვება

```bash
# დამოკიდებულებების ინსტალაცია
npm install

# Development სერვერის გაშვება
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# რა prefix-ებს ამატებს Autoprefixer? (ტექსტური ანგარიში)
npm run prefixes
```

## Autoprefixer — როგორ არის ჩართული

ამ პროექტში vendor prefix-ები **ხელით არსად არ წერია** (გარდა `fallback.css`-ისა —
ის განზრახ არის „ძველი სტილის" ნიმუში). prefix-ებს `npm run build` ამატებს:

| ფაილი | როლი |
|---|---|
| `postcss.config.js` | Autoprefixer-ს რთავს PostCSS pipeline-ში; Vite თავად აღმოაჩენს ამ ფაილს |
| `package.json` → `browserslist` | განსაზღვრავს სამიზნე ბრაუზერებს — **სწორედ ეს წყვეტს, რომელი prefix დაემატება** |

### სცადე

```bash
npm run prefixes
```

გამოიტანს დაახლოებით:

```
📄 src/App.css  (+3)
   + -webkit-background-clip: text;
   + position: -webkit-sticky;
   + -webkit-backdrop-filter: blur(12px);
```

ახლა `package.json`-ში `browserslist` შეცვალე:

```json
"browserslist": ["last 1 chrome version"]
```

და ისევ გაუშვი `npm run prefixes` — **prefix-ები გაქრება**, რადგან ბოლო Chrome-ს
ისინი აღარ სჭირდება. ეს არის გაკვეთილის მთავარი აზრი: Autoprefixer არ „ამატებს
ყველაფერს" — ის ზუსტად იმას ამატებს, რაც შენს სამიზნე ბრაუზერებს სჭირდება.

> ⚠️ `postcss` პაკეტი `node_modules`-ში Autoprefixer-ის გარეშეც იდება — ის
> Vite-ის საკუთარი dependency-ია. მისი არსებობა **არ** ნიშნავს, რომ Autoprefixer
> მუშაობს.

## ტექნოლოგიები

- **Vite** - Build tool და dev server
- **PostCSS + Autoprefixer** - vendor prefix-ების ავტომატური დამატება
- **Browserslist** - სამიზნე ბრაუზერების განსაზღვრა
- **React 18** - UI ფრეიმვორქი
- **Modern CSS** - თანამედროვე CSS ფუნქციები
- **CSS.supports()** - Feature detection API

## შენიშვნები

- პროექტი აჩვენებს თანამედროვე CSS ფუნქციებსა და მათ fallback ალტერნატივებს
- StyleToggle საშუალებას გაძლევთ რეალურ დროში შეადაროთ ორივე მიდგომა
- SupportDetector ამოწმებს თქვენი ბრაუზერის მხარდაჭერას CSS.supports() API-ით
- dark theme დიზაინი professional სტილით
- responsive დიზაინი ყველა ეკრანის ზომისთვის
- `modern.css` და `fallback.css` `?url` იმპორტით იტვირთება — ასე ისინიც
  გაივლიან PostCSS/Autoprefixer-ს და production build-შიც მუშაობენ
- `fallback.css`-ში prefix-ები განზრახ ხელითაა დაწერილი — ეს „Autoprefixer-ამდე"
  მიდგომის საჩვენებელი ნიმუშია
