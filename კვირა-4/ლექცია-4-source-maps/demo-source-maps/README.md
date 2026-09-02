# Source Maps Demo — Vite + React

პრაქტიკული დემო პროექტი Source Maps-ის შესასწავლად Vite + React გარემოში.

## პროექტის სტრუქტურა

```
demo-source-maps/
├── package.json
├── vite.config.js          # Source Maps კონფიგურაცია
├── index.html
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── utils/
    │   └── userManager.js  # UserManager კლასი (CRUD ოპერაციები)
    └── components/
        ├── UserList.jsx
        ├── UserForm.jsx
        ├── UserSearch.jsx
        ├── SourceMapInfo.jsx   # Source Maps-ის ახსნა
        └── ExercisePanel.jsx   # 4 სავარჯიშო
```

## ფუნქციონალი

### UserManager კლასი
- მომხმარებლების დამატება, წაშლა, განახლება
- ძიება სახელით/ემაილით
- სორტირება სხვადასხვა ველით
- სტატისტიკის გამოთვლა
- განზრახ შეცდომის გენერირება (stack trace დემოსთვის)

### React კომპონენტები
- **UserForm**: ახალი მომხმარებლის დამატების ფორმა
- **UserList**: მომხმარებლების სია სორტირებით
- **UserSearch**: ძიების ველი
- **SourceMapInfo**: Source Maps-ის ახსნა და vite.config.js ოფციები
- **ExercisePanel**: 4 სავარჯიშო Source Maps-ის ტესტირებისთვის

## დაინსტალირება

```bash
npm install
```

## გაშვება

### Development რეჟიმი
```bash
npm run dev
```

გადით http://localhost:5173 (ან სხვა პორტზე თუ 5173 დაკავებულია)

### Production Build
```bash
npm run build
```

შედეგი: `dist/` ფოლდერში

### Production Preview
```bash
npm run preview
```

## Source Maps კონფიგურაცია

`vite.config.js` ფაილში შეგიძლიათ შეცვალოთ `build.sourcemap` პარამეტრი:

### 1. `sourcemap: true` (ნაგულისხმევი)
- ქმნის სრულფასოვან `.js.map` ფაილებს
- ბრაუზერი ავტომატურად ტვირთავს და აჩვენებს ორიგინალ კოდს
- DevTools → Sources → ხედავთ `src/` ფოლდერს სრულად

**როდის გამოიყენოთ**: Development, Staging გარემოებში

### 2. `sourcemap: false`
- Source Maps არ იქმნება
- DevTools-ში მხოლოდ minified კოდი
- Stack trace-ები წაუკითხავია

**როდის გამოიყენოთ**: Production (თუ სურთ სრული უსაფრთხოება)

### 3. `sourcemap: 'hidden'`
- ქმნის `.js.map` ფაილებს
- არ ემატება `sourceMappingURL` კომენტარი
- ბრაუზერი ავტომატურად ვერ იპოვის

**როდის გამოიყენოთ**: Production (Sentry, Rollbar error tracking-ისთვის)

## პრაქტიკული სავარჯიშოები

### სავარჯიშო 1: Build with sourcemap: true
1. გახსენით `vite.config.js` → `sourcemap: true`
2. გაუშვით: `npm run build`
3. შეამოწმეთ `dist/assets/` → ნახეთ `.js.map` ფაილები
4. გაუშვით: `npm run preview`
5. DevTools → Sources → ნახეთ `src/` ფოლდერი
6. დააყენეთ breakpoint რომელიმე `.jsx` ფაილში

### სავარჯიშო 2: Build with sourcemap: false
1. შეცვალეთ `vite.config.js` → `sourcemap: false`
2. გაუშვით: `npm run build`
3. შეამოწმეთ `dist/assets/` → `.js.map` ფაილები აღარ არის
4. გაუშვით: `npm run preview`
5. DevTools → Sources → ნახავთ მხოლოდ minified კოდს
6. დააწკაპუნეთ "შეცდომის გენერირება" და ნახეთ stack trace

### სავარჯიშო 3: Build with sourcemap: 'hidden'
1. შეცვალეთ `vite.config.js` → `sourcemap: 'hidden'`
2. გაუშვით: `npm run build`
3. შეამოწმეთ `dist/assets/` → `.js.map` ფაილები არსებობს
4. გახსენით bundle ფაილი → ბოლო ხაზზე `sourceMappingURL` არ არის
5. გაუშვით: `npm run preview`
6. DevTools → ბრაუზერი ვერ იპოვის source maps

### სავარჯიშო 4: Stack Trace შედარება
1. დააბილდეთ `sourcemap: true` და `sourcemap: false` ვარიანტებით
2. თითოეულში დააწკაპუნეთ "შეცდომის გენერირება"
3. შეადარეთ Console-ში stack trace:
   - ფუნქციების სახელები
   - ფაილის სახელები
   - ხაზის ნომრები
4. დაინახეთ განსხვავება წაკითხვადობაში

## შეცდომის გენერირება

აპლიკაციაში არის განზრახ შეცდომის გენერირების ღილაკი:
- იძახებს nested ფუნქციებს (`levelOne` → `levelTwo` → `levelThree`)
- `levelThree`-ში ხდება `TypeError` (`undefined.someProperty`)
- Console-ში ნახავთ stack trace-ს სრული call chain-ით

Source Maps-ის გარეშე:
```
TypeError: Cannot read property 'someProperty' of undefined
    at a.c (index-ABC123.js:1:1234)
```

Source Maps-ით:
```
TypeError: Cannot read property 'someProperty' of undefined
    at UserManager.levelThree (userManager.js:212:48)
    at UserManager.levelTwo (userManager.js:207:10)
    at UserManager.levelOne (userManager.js:202:10)
```

## რეკომენდაციები

### Development
- **sourcemap**: `true` (ნაგულისხმევად ჩართულია)
- სრული debugging შესაძლებლობა

### Staging
- **sourcemap**: `true` ან `'hidden'`
- ტესტირებისთვის სასარგებლოა

### Production
- **sourcemap**: `'hidden'`
- .map ფაილები არსებობს Sentry/Rollbar-ისთვის
- მომხმარებლებს არ ეჩვენება source კოდი
- Stack traces წაკითხვადი რჩება error tracking სისტემებში

## ტექნოლოგიები

- **React 18.3** — UI ბიბლიოთეკა
- **Vite 5.4** — Build tool
- **Terser** — Minification
- **ES6+ Classes** — UserManager

## ავტორი

Web Optimization Course — კვირა 4, ლექცია 4
