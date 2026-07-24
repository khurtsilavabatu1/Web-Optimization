# დავალება 3: ვებ აპლიკაციის თავსებადობის ტესტირება

**კვირა:** 5  
**ტიპი:** პრაქტიკული დავალება  
**წონა:** პრაქტიკული დავალება (სწ.შ. #3)

---

## დავალების აღწერა

აირჩიეთ ვებგვერდი და ჩაატარეთ სრული თავსებადობის ტესტირება. დავალება დაყოფილია 4 ნაწილად ლექციების შესაბამისად.

---

## ნაწილი 1: ბრაუზერების ანალიზი და caniuse (ლექცია 1-ის მასალა)

### 1.1 ვებგვერდის არჩევა
- URL: ___
- რა ტექნოლოგიებს იყენებს (React? Vue? Vanilla?): ___

### 1.2 caniuse კვლევა
გახსენით პროექტის CSS/JS და იპოვეთ ის ფუნქციები, რომლებსაც პოტენციური თავსებადობის პრობლემა აქვს:

| CSS/JS ფუნქცია | გამოყენებულია? | Browser Support % | Fallback საჭირო? |
|---------------|-------------|-------------------|-----------------|
| CSS Grid | | | |
| Flexbox gap | | | |
| CSS Variables | | | |
| backdrop-filter | | | |
| clamp() | | | |
| :has() selector | | | |
| Optional chaining (?.) | | | |
| Nullish coalescing (??) | | | |
| dvh/svh units | | | |

### 1.3 Browserslist
- რა browserslist კონფიგურაცია აქვს პროექტს? ___
- `npx browserslist`-ის შედეგი (ბრაუზერების სია): ___
- არის ამ სიაში ბრაუზერი, რომელიც არ უჭერს მხარს გამოყენებულ ფუნქციას? ___

---

## ნაწილი 2: CSS თავსებადობა (ლექცია 2-ის მასალა)

### 2.1 @supports Queries
დაწერეთ @supports queries მინიმუმ 3 ფუნქციისთვის:

**ფუნქცია 1:** ___
```css
/* Fallback */

/* @supports */
```

**ფუნქცია 2:** ___
```css
/* Fallback */

/* @supports */
```

**ფუნქცია 3:** ___
```css
/* Fallback */

/* @supports */
```

### 2.2 Autoprefixer
1. Autoprefixer-ით build გაუშვით
2. რომელი prefixes დაემატა?
   - ___
   - ___
   - ___
3. browserslist კონფიგურაცია: ___

### 2.3 CSS Reset
- გამოყენებულია CSS Reset/Normalize? ___
- თუ არა — რა განსხვავებები ჩანს ბრაუზერებს შორის default სტილებში? ___

---

## ნაწილი 3: JS თავსებადობა და Feature Detection (ლექცია 3-ის მასალა)

### 3.1 Feature Detection
დაწერეთ feature detection მინიმუმ 2 API-სთვის:

```javascript
// API 1: ___
if (/* condition */) {
  // modern approach
} else {
  // fallback
}

// API 2: ___
if (/* condition */) {
  // modern approach
} else {
  // fallback
}
```

### 3.2 Babel/Transpilation
- პროექტი იყენებს Babel-ს ან esbuild-ს transpilation-ისთვის? ___
- რა target ბრაუზერებისთვის transpile-დება? ___
- Polyfills: core-js გამოიყენება? ___

### 3.3 Progressive Enhancement
აღწერეთ 1 მაგალითი თქვენი ვებგვერდიდან, სადაც Progressive Enhancement ან Graceful Degradation-ის მიდგომა გამოიყენება (ან უნდა გამოიყენებოდეს):
- ძირითადი ფუნქციონალურობა (JavaScript-ის გარეშე): ___
- გაუმჯობესებული ვერსია (JavaScript-ით): ___

---

## ნაწილი 4: ტესტირება სხვადასხვა მოწყობილობებზე (ლექცია 4-ის მასალა)

### 4.1 Device Mode ტესტირება
DevTools Device Mode-ით შეამოწმეთ:

| მოწყობილობა | ზომა | Layout OK? | Touch targets OK? | პრობლემა |
|------------|------|-----------|-------------------|---------|
| iPhone SE | 375×667 | | | |
| iPhone 14 Pro | 393×852 | | | |
| Samsung Galaxy | 360×800 | | | |
| iPad Mini | 768×1024 | | | |
| Desktop | 1440×900 | | | |

### 4.2 Touch-Friendly შემოწმება
- ყველა interactive ელემენტი >= 44×44px? ___
- @media (hover: hover) გამოიყენება? ___
- Touch targets ხომ არ ფარავს ერთმანეთს? ___

### 4.3 Responsinator/Screenfly
1. გახსენით responsinator.com → URL
2. გადაიღეთ screenshots მინიმუმ 3 მოწყობილობისთვის
3. ჩამოწერეთ ვიზუალური პრობლემები

### 4.4 ინსტრუმენტების შეჯამება
რომელი ინსტრუმენტი გამოიყენეთ?
- [ ] Chrome DevTools Device Mode
- [ ] Responsinator
- [ ] Screenfly
- [ ] BrowserStack (თუ ხელმისაწვდომი)
- [ ] caniuse.com
- [ ] Autoprefixer
- [ ] სხვა: ___

### 4.5 თავსებადობის მატრიცა (საბოლოო)

| ფუნქცია | Chrome | Firefox | Safari/Edge | iOS Safari | Android Chrome |
|---------|--------|---------|-------------|-----------|---------------|
| Layout | | | | | |
| Forms | | | | | |
| Animations | | | | | |
| JS Features | | | | | |
| Responsive | | | | | |

---

## ჩასაბარებელი მასალა

1. **PDF ანგარიში** (5-8 გვერდი) — ოთხივე ნაწილი screenshots-ით
2. **გამოსწორებული CSS/JS კოდი** (@supports, prefixes, polyfills)
3. **თავსებადობის მატრიცა** (შევსებული)

## შეფასების კრიტერიუმები

| კრიტერიუმი | ქულა |
|-----------|-------|
| ნაწილი 1: caniuse/Browserslist ანალიზი | 20 |
| ნაწილი 2: CSS @supports და Autoprefixer | 25 |
| ნაწილი 3: JS Feature Detection | 20 |
| ნაწილი 4: Device ტესტირება და მატრიცა | 25 |
| ანგარიშის ფორმატი | 10 |
| **სულ** | **100** |
