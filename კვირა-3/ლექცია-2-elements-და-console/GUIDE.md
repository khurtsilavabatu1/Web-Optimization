# Elements და Console — ეტაპობრივი გაიდი

ამ პრაქტიკაში თქვენ იმუშავებთ **React DevTools Playground** აპლიკაციაზე — ინტერაქტიულ გვერდზე, რომელშიც სავარჯიშოების ბარათები, სტილების explorer, CSS ცვლადების დემონსტრაცია და ფარული ელემენტებია. თქვენი ამოცანაა — Elements Panel-ით React-ის დარენდერებული HTML/CSS-ის ინსპექტირება, React DevTools-ით კომპონენტების შესწავლა და Console-ით JavaScript-ის მძლავრი ინსტრუმენტების გამოყენება.

პროექტი მდებარეობს `demo-elements-console/` ფოლდერში. ფაილები:

- **`src/App.jsx`** — მთავარი კომპონენტი — სავარჯიშოების სია, state მენეჯმენტი
- **`src/components/Playground.jsx`** — ინტერაქტიული playground კომპონენტი (მთვლელი, ტექსტის ინპუტი, დინამიური სია)
- **`src/components/DemoSection.jsx`** — დემო სექცია პროდუქტებით და სტუდენტებით
- **`src/components/ExerciseCard.jsx`** — სავარჯიშოს ბარათის კომპონენტი
- **`src/components/StyleExplorer.jsx`** — CSS ცვლადების explorer
- **`src/main.jsx`** — Console-ის სავარჯიშოებისთვის მონაცემები (`window.appState`, `window.helpers`)

---

## წინაპირობა: პროექტის გაშვება

```bash
cd ~/Desktop/Web-optimization/კვირა-3/ლექცია-2-elements-და-console/demo-elements-console
npm install
npm run dev
```

გახსენით ბრაუზერში: `http://localhost:5173`

> **რატომ Vite + React?** React-ის დომინირება თანამედროვე ფრონტენდში ნიშნავს, რომ უნდა ვისწავლოთ როგორ ვაკეთებთ debugging რეალურ ინსტრუმენტებზე. Elements Panel აჩვენებს React-ის დარენდერებულ HTML-ს, ხოლო React DevTools — კომპონენტების სტრუქტურას.

---

## ეტაპი 1: Elements Panel — ელემენტების ინსპექტირება

### 1.1 Elements Panel-ის და React DevTools-ის გახსნა

1. გახსენით `http://localhost:5173`
2. DevTools გახსენით: **Cmd+Option+I** (Mac) ან **Ctrl+Shift+I** (Windows/Linux)
3. დააინსტალირეთ **React Developer Tools** extension (თუ არ გაქვთ)
4. ახლა DevTools-ში ორი ახალი tab ჩნდება: **Components** და **Profiler**
5. გადაერთეთ **Elements** tab-ზე (HTML/CSS ინსპექტირებისთვის)

### 1.2 ელემენტის არჩევა — Inspect (React და HTML)

**Cmd+Shift+C** (Mac) ან **Ctrl+Shift+C** (Windows/Linux) — ეს ააქტიურებს ელემენტის არჩევის რეჟიმს. მაუსი მიიტანეთ გვერდის ნებისმიერ ელემენტზე — ლურჯი overlay აჩვენებს ელემენტის საზღვრებს, padding-ს და margin-ს.

სცადეთ შემდეგი ელემენტების ინსპექტირება:

- **„DevTools Playground" სათაური** — Elements Panel-ში: `<h1 class="app-title">DevTools Playground</h1>`
- **სავარჯიშოს ბარათი** — Elements Panel-ში: `<div class="exercise-card">...</div>`
- **Verify ღილაკი** — Elements Panel-ში: `<button class="verify-btn">მონიშვნა შესრულებულად</button>`

> **შეამჩნიეთ:** Elements Panel-ში React-ის დარენდერებული HTML ჩანს — JSX არ ჩანს! რომ ნახოთ რომელი React კომპონენტი დაარენდერა ეს HTML:
> 1. Elements Panel-ში ელემენტზე მარჯვენა ღილაკით დააჭირეთ
> 2. აირჩიეთ **"Show in React DevTools"** (თუ React DevTools გაქვთ)
> 3. გადახვალთ Components tab-ზე და ნახავთ კომპონენტის ხეს — `<App>` → `<ExerciseCard>` და ა.შ.

---

## ეტაპი 2: HTML-ის Live რედაქტირება

### 2.1 ტექსტის შეცვლა

1. Elements Panel-ში იპოვეთ `<h1 class="app-title">DevTools Playground</h1>`
2. ორჯერ დააჭირეთ ტექსტს „DevTools Playground"
3. შეცვალეთ — მაგალითად, ჩაწერეთ „ჩემი სავარჯიშო გვერდი"
4. Enter-ს დააჭირეთ — გვერდზე მაშინვე შეიცვლება!

### 2.2 ატრიბუტის რედაქტირება

1. იპოვეთ სტუდენტის ელემენტი: `<div class="student-item active">`
2. ორჯერ დააჭირეთ `active` კლასს
3. შეცვალეთ `inactive`-ით — ელემენტის მწვანე border გაქრება და გამჭვირვალე გახდება
4. სხვა სტუდენტს დაუმატეთ `active` კლასი — ის გახდება მონიშნული

### 2.3 ელემენტის წაშლა და დამატება

1. იპოვეთ მესამე პროდუქტის ბარათი — „ერგონომიული სავარძელი" (`<div class="product-item">`)
2. მარჯვენა ღილაკით დააჭირეთ → **Delete element**
3. ბარათი გაქრება (Cmd+Z / Ctrl+Z — undo)

> **მნიშვნელოვანი:** Elements Panel-ში გაკეთებული ცვლილებები **დროებითია**. გვერდის refresh-ის შემდეგ ყველაფერი ორიგინალ მდგომარეობას დაუბრუნდება. ეს არის ექსპერიმენტირების იდეალური გარემო — არაფრის გაფუჭების შიში არ არსებობს.

---

## ეტაპი 3: CSS-ის Live რედაქტირება

### 3.1 სტილების ნახვა და ცვლილება

1. აირჩიეთ (Inspect) პირველი პროდუქტის ბარათი (`.product-item`)
2. Elements Panel-ის მარჯვენა მხარეს **Styles** ჩანართში ნახავთ CSS წესებს:

```css
.product-item {
  background: var(--card-bg);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  /* ... */
}
```

3. დააჭირეთ `var(--card-bg)` მნიშვნელობას და შეცვალეთ `#ffe0e0` — ბარათის ფონი გაწითლდება
4. `border-radius: var(--radius-md)` შეცვალეთ `border-radius: 0` — კუთხეები მართკუთხა გახდება

### 3.2 ახალი CSS თვისების დამატება

1. Styles პანელში, `.product-item` წესის ბოლოს დააჭირეთ ცარიელ ადგილს
2. ჩაწერეთ: `border: 3px solid red`
3. ბარათს წითელი ჩარჩო გაუჩნდება

### 3.3 CSS ცვლადების რედაქტირება

გვერდზე CSS ცვლადების შოუქეისი არის. `:root`-ში განსაზღვრული ცვლადების შეცვლა მთელ გვერდზე აისახება:

1. Elements Panel-ში იპოვეთ `<html>` ელემენტი (ან `:root`)
2. Styles-ში ნახავთ CSS Custom Properties-ს:

```css
:root {
  --primary-color: #4a6cf7;
  --secondary-color: #6c5ce7;
  --success-color: #00b894;
  /* ... */
}
```

3. შეცვალეთ `--primary-color: #e74c3c` (წითელი) — header-ის gradient, ღილაკები, ფასის ტექსტი — ყველაფერი ერთდროულად შეიცვლება!

> **CSS Custom Properties-ის ძალა:** ერთი ცვლადის ცვლილება ათობით ელემენტზე აისახება. ეს არის „თემის" ცვლილების საფუძველი თანამედროვე ვებაპლიკაციებში. Console-ში შეგიძლიათ სცადოთ: `document.documentElement.style.setProperty('--primary-color', '#e74c3c')` — header-ის gradient, ღილაკები, ფასის ტექსტი ერთდროულად შეიცვლება.

---

## ეტაპი 4: Computed Tab და Box Model

### 4.1 Computed Tab

1. აირჩიეთ პროდუქტის ბარათის სათაური — `<h4 class="product-name">ლეპტოპი Pro X</h4>`
2. Styles-ის გვერდით გადაერთეთ **Computed** ჩანართზე
3. აქ ჩანს **ფინალური** გამოთვლილი მნიშვნელობები — ყველა კასკადის, მემკვიდრეობის და default-ის შემდეგ

- **`font-size`** — `17.6px` (1.1rem გადაყვანილი px-ში)
- **`font-weight`** — `600`
- **`color`** — `rgb(45, 55, 72)` (ეს არის `--text-primary: #2d3748`)

> **რატომ არის Computed მნიშვნელოვანი?** Styles ჩანართში რამდენიმე CSS წესი შეიძლება ერთ თვისებაზე მოქმედებდეს — ზოგი გადახაზულია (overridden), ზოგი მემკვიდრეობითაა. Computed ჩანართი აჩვენებს **საბოლოო** მნიშვნელობას, რომელსაც ბრაუზერი რეალურად იყენებს.

### 4.2 Box Model ვიზუალიზაცია

Computed ჩანართის ზემოთ **Box Model** დიაგრამა ჩანს — ოთხი ჩარჩო:

```
┌─────────── margin ───────────┐
│  ┌──────── border ────────┐  │
│  │  ┌──── padding ────┐   │  │
│  │  │    content       │   │  │
│  │  │   (width x h)    │   │  │
│  │  └─────────────────┘   │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

1. აირჩიეთ `.product-item` ელემენტი
2. Box Model-ში ნახავთ:
   - **padding:** `24px` (ეს არის `--spacing-lg`)
   - **margin:** `0`
   - **border:** `0`
3. მაუსი მიიტანეთ Box Model-ის თითოეულ ზონაზე — გვერდზე შესაბამისი არე მოინიშნება

> **პრაქტიკული რჩევა:** თუ ელემენტი მოულოდნელ ადგილზეა ან ზედმეტი სივრცე აქვს, Box Model-ი პირველია რაც უნდა შეამოწმოთ. ხშირად პრობლემა ზედმეტი margin-ი ან padding-ია.

---

## ეტაპი 5: Force State — :hover, :active, :focus

### 5.1 :hover სტილის ნახვა

პროდუქტის ბარათებს და ღილაკებს hover ეფექტები აქვთ, მაგრამ Inspect-ის დროს მაუსი Elements Panel-ზეა, გვერდზე კი hover ვერ ხდება. **Force State** ამას აგვარებს.

1. აირჩიეთ `.product-item` ელემენტი (მაგ., „ლეპტოპი Pro X")
2. Styles პანელში იპოვეთ **`:hov`** ღილაკი (ან მარჯვენა ღილაკით → **Force state**)
3. მონიშნეთ **`:hover`** checkbox
4. Styles-ში გამოჩნდება hover-ის წესები:

```css
.product-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
```

### 5.2 :active და :focus

1. აირჩიეთ `.demo-btn.primary` ღილაკი („ინტერაქციის ტესტი") და მონიშნეთ **`:active`** — ბრაუზერის default active სტილი გამოჩნდება.

2. აირჩიეთ `.demo-input` ელემენტი (ტექსტის ინპუტი) და მონიშნეთ **`:focus`**:

```css
.demo-input:focus {
  outline: none;
  border-color: var(--primary-color);
}
```

> **Force State რატომ არის სასარგებლო?** Hover ეფექტების debugging-ის გარეშე — როგორ შეამოწმებ? მაუსს Inspect-ზე რომ მიიტან, hover გვერდიდან იხსნება. Force State ელემენტს „იძულებით" ამ მდგომარეობაში აყენებს, სანამ არ გააუქმებ.

---

## ეტაპი 6: Console API

გვერდის ჩატვირთვისას Console-ში უკვე ჩანს მისალმება და ხელმისაწვდომი ცვლადები/ფუნქციები. გახსენით Console: **Cmd+Option+J** (Mac) ან **Ctrl+Shift+J** (Windows/Linux).

### 7.1 console.log / console.warn / console.error

Console-ში ჩაწერეთ სათითაოდ:

```javascript
console.log('ეს არის ჩვეულებრივი შეტყობინება');
console.warn('ეს არის გაფრთხილება');
console.error('ეს არის შეცდომა');
```

- **`console.log()`** — ფერი: ჩვეულებრივი — ზოგადი ინფორმაცია, debugging
- **`console.warn()`** — ფერი: ყვითელი — პოტენციური პრობლემა, deprecated ფუნქციის გამოყენება
- **`console.error()`** — ფერი: წითელი — შეცდომა, მოულოდნელი მდგომარეობა

### 7.2 console.table

`main.jsx`-ში წინასწარ განსაზღვრული `window.appState` ობიექტი არის. Console-ში ჩაწერეთ:

```javascript
console.table(window.appState.users);
```

ნახავთ ლამაზ ცხრილს:

- **[0]** ნინო — email: nino@example.com, role: დეველოპერი, active: true
- **[1]** გიორგი — email: giorgi@example.com, role: დიზაინერი, active: true
- **[2]** მარიამი — email: mariam@example.com, role: მენეჯერი, active: false

ასევე სცადეთ tasks მასივი:

```javascript
console.table(window.appState.tasks);
```

კონკრეტული სვეტების ჩვენება:

```javascript
console.table(window.appState.users, ['name', 'role', 'active']);
```

> **console.table-ის ძალა:** მასივებისა და ობიექტების ვიზუალიზაცია ბევრად ადვილია ცხრილის ფორმატში, ვიდრე `console.log`-ის ჩადგმული ობიექტებით. API-დან მოსული მონაცემების სწრაფი ინსპექტირებისთვის იდეალურია.

### 7.3 console.group / console.groupEnd

Console-ში ჩაწერეთ შემდეგი კოდი:

```javascript
const user = window.appState.users[0];
console.group('მომხმარებელი: ' + user.name);
  console.log('ელ-ფოსტა:', user.email);
  console.log('როლი:', user.role);
  console.group('პარამეტრები');
    console.log('თემა:', user.settings.theme);
    console.log('ენა:', user.settings.language);
  console.groupEnd();
console.groupEnd();
```

Console-ში ნახავთ დაჯგუფებულ ინფორმაციას:

```
▼ მომხმარებელი: ნინო
    ელ-ფოსტა: nino@example.com
    როლი: დეველოპერი
    ▼ პარამეტრები
        თემა: dark
        ენა: ka
```

ეს კოდი ორ დონეზე ჯგუფავს: მომხმარებლის ძირითადი ინფორმაცია და ჩადგმული პარამეტრები. `console.group()` ხსნის ჯგუფს, `console.groupEnd()` ხურავს.

### 7.4 console.time / console.timeEnd

კოდის შესრულების დროის გაზომვა. Console-ში ჩაწერეთ:

```javascript
console.time('ციკლი');
const arr = [];
for (let i = 0; i < 100000; i++) arr.push(i);
console.timeEnd('ციკლი');
```

Console-ში ნახავთ:

```
ციკლი: 12.5ms
```

`console.time('ლეიბლი')` იწყებს ტაიმერს, `console.timeEnd('ლეიბლი')` აჩერებს და აჩვენებს რამდენი მილიწამი გავიდა.

> **რეალური გამოყენება:** API-ის გამოძახების, რენდერინგის, ან ნებისმიერი ოპერაციის დროის გაზომვა. მაგალითად: `console.time('API call')` → `fetch(...)` → `console.timeEnd('API call')`.

### 7.5 console.assert

პირობითი logging — **მხოლოდ** მაშინ ბეჭდავს შეტყობინებას, როცა პირობა `false`-ია. Console-ში ჩაწერეთ:

```javascript
const badProduct = { name: '', price: -50, stock: -3, category: '' };
console.assert(badProduct.price > 0, 'ფასი უნდა იყოს დადებითი!', badProduct);
console.assert(badProduct.stock >= 0, 'მარაგი არ შეიძლება იყოს უარყოფითი!', badProduct);
console.assert(badProduct.name !== '', 'სახელი არ უნდა იყოს ცარიელი!', badProduct);
```

Console-ში ნახავთ რამდენიმე assertion failure-ს:

```
Assertion failed: ფასი უნდა იყოს დადებითი! {name: '', price: -50, stock: -3, category: ''}
Assertion failed: მარაგი არ შეიძლება იყოს უარყოფითი! {name: '', price: -50, stock: -3, category: ''}
Assertion failed: სახელი არ უნდა იყოს ცარიელი! {name: '', price: -50, stock: -3, category: ''}
```

`badProduct` ობიექტი განზრახ არასწორი მონაცემებითაა შევსებული (`price: -50`, `stock: -3`, `name: ''`). `console.assert` ყოველ დარღვეულ პირობას აჩვენებს.

### 7.6 console.trace

ფუნქციის გამოძახების ჯაჭვის ნახვა. Console-ში ჩაწერეთ:

```javascript
function getDistance() { console.trace('შეკვეთის trace'); }
function calculateShipping() { getDistance(); }
function processOrder(id) { console.log('შეკვეთა #' + id); calculateShipping(); }
processOrder(42);
```

Console-ში ნახავთ:

```
შეკვეთა #42
შეკვეთის trace
  getDistance          @ VM...:1
  calculateShipping   @ VM...:2
  processOrder        @ VM...:3
```

ეს აჩვენებს გამოძახების ჯაჭვს: `processOrder` → `calculateShipping` → `getDistance`. რეალურ აპლიკაციაში, როცა ფუნქცია მრავალი ადგილიდან იძახება, `console.trace` გეტყვით ზუსტად **საიდან** მოვიდა ეს გამოძახება.

---

## ეტაპი 7: Console Shortcuts

### 8.1 $0 — არჩეული ელემენტი

1. Elements Panel-ში აირჩიეთ პროდუქტის ბარათის სათაური (მაგ., „ლეპტოპი Pro X")
2. Console-ში ჩაწერეთ:

```javascript
$0
```

ნახავთ Elements-ში არჩეულ ელემენტს. შემდეგ:

```javascript
$0.textContent          // "ლეპტოპი Pro X"
$0.className            // "product-name"
$0.style.color = 'red'  // ტექსტი გაწითლდება
```

> **$1, $2, $3, $4** — წინა 4 არჩეული ელემენტი (ისტორია). ეს გამოსადეგია, როცა რამდენიმე ელემენტს ერთმანეთს ადარებ.

### 8.2 $() და $$() — querySelector / querySelectorAll

```javascript
// პირველი .product-price ელემენტი
$('.product-price')
// "₾2499" ელემენტი

// ყველა .product-price — მასივის სახით
$$('.product-price')
// [span.product-price, span.product-price, span.product-price]

// ყველა ფასი ტექსტად
$$('.product-price').map(el => el.textContent)
// ["₾2499", "₾149", "₾799"]
```

გვერდზე სტუდენტების ელემენტების ინფორმაციის ამოღება:

```javascript
console.table($$('.student-item').map(card => ({
  name: card.dataset.name,
  grade: card.dataset.grade,
  active: card.dataset.active
})));
```

### 8.3 copy() — clipboard-ში კოპირება

```javascript
// გვერდის სათაურის კოპირება
copy(document.title)

// ყველა ლინკის href-ის კოპირება JSON ფორმატში
copy(JSON.stringify($$('a').map(a => a.href), null, 2))

// appState მონაცემების კოპირება
copy(JSON.stringify(window.appState.users, null, 2))
```

`copy()` შემდეგ Cmd+V (Ctrl+V) ნებისმიერ ტექსტურ რედაქტორში — მონაცემები იქ ჩაისმება.

### 8.4 monitor() — ფუნქციის მონიტორინგი

```javascript
monitor(window.helpers.greet)
```

ახლა Console-ში გამოიძახეთ:

```javascript
window.helpers.greet('ნინო')
```

Console-ში ნახავთ:

```
function greet called with arguments: ნინო
"გამარჯობა, ნინო!"
```

`monitor()` ავტომატურად ბეჭდავს ფუნქციის ყოველ გამოძახებას და არგუმენტებს. გამოსართავად: `unmonitor(window.helpers.greet)`.

> **monitor-ის რეალური გამოყენება:** როცა არ იცით, ფუნქცია იძახება თუ არა, ან რა არგუმენტებით იძახება — `monitor()` მყისიერ პასუხს გაძლევთ `console.log`-ის ყველგან ჩამატების გარეშე.

---

## ეტაპი 8: ფარული ელემენტების აღმოჩენა

გვერდზე ფარული ელემენტია — Elements Panel-ში იპოვეთ:

### 9.1 display: none

1. Elements Panel-ში მოძებნეთ `class="secret-message"` (Cmd+F / Ctrl+F Elements Panel-ში)
2. ნახავთ: `<div class="secret-message hidden" data-secret="true">`
3. Styles-ში: `.secret-message.hidden` წესი ადგენს `display: none` — ელემენტი DOM-ში არსებობს, მაგრამ **არ ჩანს და ადგილს არ იკავებს**
4. წაშალეთ `hidden` კლასი ატრიბუტებიდან (ან გააუქმეთ `display: none` checkbox-ით) — ფარული შეტყობინება გამოჩნდება

### 9.2 ელემენტების დამალვის სამი გზა — თეორია

ისწავლეთ სამი განსხვავებული მიდგომა ელემენტების დამალვისთვის:

- **`display: none`** — ადგილი: არ იკავებს, ხილვადობა: არ ჩანს, Event-ები: არ იჭერს
- **`visibility: hidden`** — ადგილი: იკავებს, ხილვადობა: არ ჩანს, Event-ები: არ იჭერს
- **`opacity: 0`** — ადგილი: იკავებს, ხილვადობა: არ ჩანს, Event-ები: იჭერს!

სცადეთ Console-ში: აირჩიეთ ნებისმიერი ელემენტი Elements Panel-ში და `$0.style.visibility = 'hidden'` ან `$0.style.opacity = '0'` — დააკვირდით განსხვავებებს.

---

## ეტაპი 9: CSS-ის ექსპერიმენტი — განლაგების შეცვლა

Elements Panel-ით შეცვალეთ არსებული ელემენტების განლაგება:

### 10.1 პროდუქტების Grid-ის შეცვლა

აირჩიეთ `.products-grid` და Styles-ში ნახეთ:

```css
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-md);
}
```

სცადეთ:
1. `grid-template-columns` შეცვალეთ `1fr` — პროდუქტები ერთ სვეტში ჩამოწყობა
2. `gap` შეცვალეთ `0` — ბარათებს შორის ადგილი გაქრება
3. დაუმატეთ `justify-items: center` — ბარათები ცენტრში გადავა

### 10.2 Playground-ის Grid-ის შეცვლა

1. აირჩიეთ `.playground-grid` ელემენტი
2. `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))` შეცვალეთ `repeat(2, 1fr)` — ბარათები ორ სვეტში განლაგდება
3. `gap` შეცვალეთ `var(--spacing-2xl)` — ბარათებს შორის მეტი სივრცე გაჩნდება

ექსპერიმენტირება სტილებზე Elements Panel-ში დროებითია — გვერდის refresh-ით ყველაფერი თავის ადგილზე დაბრუნდება.

---

## შეჯამება

### Elements Panel — რა ვისწავლეთ?

- **Inspect (Cmd+Shift+C)** — ელემენტის სწრაფი არჩევა გვერდზე
- **HTML რედაქტირება** — ტექსტის, ატრიბუტების, სტრუქტურის ცვლილება real-time
- **CSS რედაქტირება (Styles)** — სტილების ცვლილება, ახალი თვისებების დამატება
- **Computed tab** — ფინალური გამოთვლილი მნიშვნელობები
- **Box Model** — margin, border, padding ვიზუალიზაცია
- **Force State (:hov)** — :hover, :active, :focus სიმულაცია

### Console API — რა ვისწავლეთ?

- **`console.log/warn/error`** — ინფორმაცია, გაფრთხილება, შეცდომა
- **`console.table()`** — მასივების/ობიექტების ცხრილური ჩვენება
- **`console.group/groupEnd`** — ლოგების დაჯგუფება
- **`console.time/timeEnd`** — კოდის შესრულების დროის გაზომვა
- **`console.assert()`** — პირობითი logging — მხოლოდ false-ზე
- **`console.trace()`** — ფუნქციის გამოძახების ჯაჭვი
- **`$0`** — Elements-ში არჩეული ელემენტი
- **`$() / $$()`** — querySelector / querySelectorAll
- **`copy()`** — მონაცემების clipboard-ში კოპირება
- **`monitor()`** — ფუნქციის გამოძახებების თვალყურის დევნა

### მთავარი წესები

1. **Elements Panel** — HTML/CSS-ის ინსპექტირების და ექსპერიმენტირების მთავარი ინსტრუმენტი. ცვლილებები დროებითია — თამამად ცადეთ ყველაფერი.
2. **Computed tab** — როცა CSS-ის რომელი წესი „იმარჯვებს" ვერ გაიგეთ, Computed გაჩვენებთ საბოლოო შედეგს.
3. **Force State** — hover/focus/active ეფექტების debugging-ის ერთადერთი საიმედო გზა.
4. **console.table()** — `console.log()`-ზე ბევრად ინფორმატიულია მასივებისა და ობიექტებისთვის.
5. **$0 და $$()** — Elements Panel-ისა და Console-ის ერთად გამოყენების ყველაზე სწრაფი გზა.
