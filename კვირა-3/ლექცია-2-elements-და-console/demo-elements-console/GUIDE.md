# Elements და Console — ეტაპობრივი გაიდი

ამ პრაქტიკაში თქვენ იმუშავებთ „DevTools Playground" გვერდზე — სპეციალურად შექმნილ სავარჯიშო აპლიკაციაზე, სადაც Elements panel-ით DOM სტრუქტურას შეისწავლით, CSS-ს რეალურ დროში შეცვლით, „გატეხილ" განლაგებას გამოასწორებთ და Console API-ის მთელ არსენალს გამოცდით. გვერდზე ფარული ელემენტებიც არის — იპოვეთ ისინი!

პროექტი მდებარეობს `demo-elements-console/` ფოლდერში. ფაილები:

| ფაილი | აღწერა |
|-------|--------|
| `index.html` | სავარჯიშო გვერდი — ნავიგაცია, ბარათები, „გატეხილი" სექცია, ფარული ელემენტები |
| `styles.css` | CSS სტილები — CSS ცვლადები, გრიდი, ანიმაციები, განზრახ „გატეხილი" სტილები |
| `console-exercises.js` | Console სავარჯიშოების მონაცემები და ფუნქციები |

---

## წინაპირობა: პროექტის გაშვება

```bash
cd ~/Desktop/Web-optimization/კვირა-3/ლექცია-2-elements-და-console/demo-elements-console
npx serve -l 3000
```

გახსენით ბრაუზერში: `http://localhost:3000`

> **რატომ გვჭირდება სერვერი?** JavaScript ფაილებს ბრაუზერი ზოგჯერ ბლოკავს, თუ HTML პირდაპირ ფაილიდან (`file://`) გაიხსნა. ლოკალური HTTP სერვერი ამ პრობლემას აგვარებს.

---

## ეტაპი 1: Elements Panel — ინსპექტირება და HTML რედაქტირება

### 1.1 ელემენტის არჩევა

1. გახსენით `http://localhost:3000`
2. დააჭირეთ **Cmd+Shift+C** (Mac) ან **Ctrl+Shift+C** (Windows/Linux) — კურსორი გადაირთვება inspect რეჟიმში
3. მაუსი მიიტანეთ ნავიგაციის ბმულზე **„პროდუქტები"** — ბრაუზერი ელემენტს ლურჯი ჩარჩოთი მონიშნავს
4. დააჭირეთ ბმულზე — Elements panel-ში ეს ელემენტი მონიშნული იქნება

Elements panel-ში დაინახავთ DOM ხის გზას:

```
html > body > header.site-header > div.header-content > nav.main-nav > a.nav-link.active
```

> **DOM ხე (DOM Tree)** არის HTML დოკუმენტის ხისებური წარმოდგენა. ყოველი tag არის კვანძი (node), რომელსაც შეიძლება ჰქონდეს შვილობილი კვანძები. Elements panel-ში ამ სტრუქტურას ნავიგაცია შეგიძლიათ — სამკუთხედებზე დაჭერით გახსნით/დახურავთ კვანძებს.

### 1.2 HTML-ის live რედაქტირება

#### ტექსტის შეცვლა

1. Elements panel-ში იპოვეთ `<h1 class="site-title">DevTools Playground</h1>`
2. **ორჯერ დააჭირეთ** ტექსტზე „DevTools Playground"
3. შეცვალეთ: `ჩემი სავარჯიშო გვერდი`
4. დააჭირეთ Enter — გვერდზე ტექსტი მაშინვე შეიცვლება

#### HTML-ის რედაქტირება

1. Elements panel-ში იპოვეთ ერთ-ერთი `.product-card` ელემენტი
2. **მარჯვენა ღილაკი** → **Edit as HTML**
3. გაიხსნება ტექსტური რედაქტორი, სადაც შეგიძლიათ HTML-ის თავისუფალი რედაქტირება
4. სცადეთ: `<h3>` tag-ში სათაური შეცვალეთ, ან ახალი `<p>` აბზაცი დაამატეთ
5. დააჭირეთ რედაქტორის გარეთ — ცვლილება გამოჩნდება

#### ახალი ელემენტის დამატება

1. Elements panel-ში იპოვეთ `.card-grid` ელემენტი
2. **მარჯვენა ღილაკი** → **Edit as HTML**
3. ბოლოს, ბოლო `</div>`-ის წინ, ჩაამატეთ:

```html
<div class="product-card" data-category="ტესტი" data-price="0" data-id="99">
  <div class="card-image books">&#127775;</div>
  <h3 class="card-title">ტესტური ბარათი</h3>
  <p class="card-description">ეს ბარათი Elements panel-ში დავამატე!</p>
</div>
```

4. ახალი ბარათი გვერდზე გამოჩნდება

### 1.3 CSS-ის ცვლილება

1. Elements panel-ში აირჩიეთ ერთ-ერთი `.product-card`
2. მარჯვენა Styles pane-ში დაინახავთ ამ ელემენტზე მოქმედ CSS წესებს
3. სცადეთ:
   - **ფერის შეცვლა:** `background` თვისების მნიშვნელობაზე დააჭირეთ, შეცვალეთ `#ffe0e0`
   - **ახალი თვისების დამატება:** Styles pane-ში, `.product-card` წესის ფიგურული ფრჩხილების შიგნით, ცარიელ ადგილზე დააჭირეთ. ჩაწერეთ `border: 3px solid red` და Enter
   - **თვისების ჩართვა/გამორთვა:** ყველა CSS თვისების მარცხნივ არის checkbox — მოხსენით `box-shadow`-ს checkbox და ნახეთ, როგორ გაქრება ჩრდილი

> **მნიშვნელოვანი:** Elements panel-ში გაკეთებული ყველა ცვლილება **დროებითია** — გვერდის refresh-ის შემდეგ ყველაფერი ორიგინალს დაუბრუნდება. ეს ინსტრუმენტი ექსპერიმენტისთვისაა, არა მუდმივი რედაქტირებისთვის.

---

## ეტაპი 2: Computed Tab და Box Model

### 2.1 Box Model ვიზუალიზაცია

1. Elements panel-ში აირჩიეთ ერთ-ერთი `.product-card` ელემენტი
2. Styles pane-ში გადაერთეთ **Computed** tab-ზე (ან Styles tab-ის ბოლოში ნახავთ Box Model დიაგრამას)
3. დაინახავთ ფერადი მართკუთხედების დიაგრამას:

```
┌──────────── margin (გარე დაშორება) ────────────┐
│  ┌────────── border (საზღვარი) ──────────┐     │
│  │  ┌──────── padding (შიდა დაშორება) ──┐│     │
│  │  │                                    ││     │
│  │  │        content (შიგთავსი)          ││     │
│  │  │                                    ││     │
│  │  └────────────────────────────────────┘│     │
│  └────────────────────────────────────────┘     │
└────────────────────────────────────────────────┘
```

4. `.product-card`-ისთვის დაინახავთ:
   - **padding:** `24px` (ყველა მხრიდან — ეს არის `var(--spacing-lg)`)
   - **border-radius:** `16px`
   - **margin:** `0`

5. მაუსი მიიტანეთ Box Model დიაგრამის ნებისმიერ ზონაზე — გვერდზე შესაბამისი ზონა ფერადი მონიშვნით გამოჩნდება

> **Box Model** არის CSS-ის ფუნდამენტური კონცეფცია. ყველა HTML ელემენტი არის „ყუთი" ოთხი ფენით: content → padding → border → margin. ელემენტის საბოლოო ზომა (`box-sizing: border-box` დროს) მოიცავს content + padding + border.

### 2.2 Computed Tab

Computed tab-ზე ხედავთ ელემენტის **ფინალურ, გამოთვლილ** სტილებს — ანუ იმას, რაც რეალურად მოქმედებს, ყველა cascade-ის, inheritance-ისა და specificity-ის გათვალისწინებით.

1. Computed tab-ის ზედა ნაწილში არის **Filter** ველი — ჩაწერეთ `font` და ნახავთ მხოლოდ font-თან დაკავშირებულ თვისებებს
2. ყოველი თვისების გვერდით არის **ისარი** — დააჭირეთ მას და ნახავთ, რომელმა CSS წესმა დააყენა ეს მნიშვნელობა
3. სცადეთ `color` ფილტრი — ნახავთ, რომ ტექსტის ფერი მემკვიდრეობითაა მიღებული `body`-დან (`var(--text-color)`)

### 2.3 „გატეხილი" განლაგების გამოსწორება

1. გვერდზე გადაახვიეთ **„გატეხილი" განლაგება** სექციამდე — დაინახავთ სამ ელემენტს, რომლებიც არასწორადაა განლაგებული
2. **Cmd+Shift+C** → დააჭირეთ `.broken-flex-container`-ზე
3. Styles pane-ში იპოვეთ `.broken-flex-container` წესი

პრობლემა #1 — ელემენტები კონტეინერში არ არის ცენტრირებული:

4. იპოვეთ `justify-content: flex-start` — შეცვალეთ `center`
5. იპოვეთ `align-items: flex-start` — შეცვალეთ `center`

პრობლემა #2 — ელემენტები ერთმანეთს შორის ძალიან დიდი მანძილია და გადმოდის:

6. აირჩიეთ ერთ-ერთი `.broken-item` ელემენტი
7. Styles pane-ში იპოვეთ `margin: 40px` — შეცვალეთ `8px`
8. იპოვეთ `min-width: 200px` — შეცვალეთ `auto` ან `100px`

ახლა ელემენტები ცენტრირებულია და ლამაზად ეტევა კონტეინერში.

> **Flex Layout debugging-ის რჩევა:** Chrome DevTools-ში, როცა flex კონტეინერს აირჩევთ, Elements panel-ში ელემენტის tag-ის გვერდით `flex` ბეჯი გამოჩნდება. მასზე დაჭერით flex overlay ჩაირთვება — ხაზებით ნახავთ, როგორ ანაწილებს flex კონტეინერი თავის შვილობილ ელემენტებს.

---

## ეტაპი 3: Force State (:hover, :active)

### 3.1 :hov ღილაკი

ნავიგაციის ბმულებს (`<a class="nav-link">`) აქვთ `:hover` და `:active` სტილები — მაგრამ მათ სანახავად მაუსი უნდა მიიტანოთ ან დააჭიროთ. DevTools-ით ამ მდგომარეობის იმიტაცია შეგიძლიათ:

1. Elements panel-ში აირჩიეთ ერთ-ერთი `.nav-link` ელემენტი
2. Styles pane-ის ზემოთ იპოვეთ **`:hov`** ღილაკი — დააჭირეთ მას
3. გაიხსნება checkbox-ების სია: `:active`, `:focus`, `:focus-within`, `:focus-visible`, `:target`, `:hover`, `:visited`
4. მონიშნეთ **`:hover`** checkbox

რა მოხდა:
- გვერდზე ბმულმა hover მდგომარეობა მიიღო (ფონი შეიცვალა, ტექსტი გათეთრდა)
- Styles pane-ში `:hover` წესიც გამოჩნდა:

```css
.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  transform: translateY(-1px);
}
```

> **რატომ არის Force State სასარგებლო?** Hover სტილების დიზაინისა და debugging-ის დროს, მაუსი რომ ელემენტზე მიიტანოთ, DevTools-ის Styles pane-ში ვეღარ ჩაიხედავთ. Force State ამ პრობლემას წყვეტს — hover მდგომარეობა „იძულებით" ჩართულია, მაუსის მიტანის გარეშე.

### 3.2 სხვა მდგომარეობები

სცადეთ სხვა მდგომარეობებიც:

1. **`:active`** — მონიშნეთ `.nav-link`-ზე. დაინახავთ:

```css
.nav-link:active {
  background: rgba(255, 255, 255, 0.35);
  transform: translateY(0) scale(0.97);
}
```

2. **`:focus`** — მონიშნეთ `.nav-link`-ზე. ფოკუსის outline გამოჩნდება:

```css
.nav-link:focus {
  outline: 2px solid rgba(255, 255, 255, 0.6);
  outline-offset: 2px;
}
```

3. სცადეთ `.action-btn` ღილაკებზეც — მათაც აქვთ hover და active სტილები

> **რჩევა:** შეგიძლიათ რამდენიმე მდგომარეობა ერთდროულად მონიშნოთ. მაგალითად, `:hover` და `:focus` ორივე ჩართეთ, რომ ნახოთ, როგორ გამოიყურება ელემენტი, როცა ორივე აქტიურია.

---

## ეტაპი 4: Break on DOM Changes

Break on DOM Changes საშუალებას გაძლევთ breakpoint დასვათ DOM-ის ცვლილებებზე — როცა JavaScript-ის კოდი HTML-ს ცვლის, ბრაუზერი შეჩერდება და გაჩვენებთ, რომელმა კოდმა გამოიწვია ცვლილება.

### 4.1 Subtree Modifications

1. Elements panel-ში იპოვეთ `<div class="card-grid" id="card-grid">` ელემენტი
2. **მარჯვენა ღილაკი** → **Break on** → **subtree modifications**
3. ელემენტის გვერდით ლურჯი წერტილი გამოჩნდება
4. ახლა გვერდზე დააჭირეთ **„+ ბარათის დამატება"** ღილაკს

რა მოხდა:
- JavaScript შეჩერდა! Sources panel-ზე გადაგიყვანთ
- ნახავთ `console-exercises.js` ფაილში `addNewCard()` ფუნქციას, ზუსტად იმ ხაზზე, სადაც `grid.appendChild(card)` სრულდება
- ეს არის ის კოდი, რომელმაც DOM-ის subtree შეცვალა

5. **Resume** (F8 ან ▶ ღილაკი) დააჭირეთ გასაგრძელებლად

### 4.2 Attribute Modifications

1. Elements panel-ში აირჩიეთ `<html>` ელემენტი (ან `.theme-demo-box`)
2. **მარჯვენა ღილაკი** → **Break on** → **attribute modifications**
3. Console-ში ჩაწერეთ:

```javascript
document.documentElement.style.setProperty('--primary-color', '#e74c3c');
```

4. JavaScript შეჩერდა — ნახავთ, რომელმა კოდმა შეცვალა ელემენტის ატრიბუტი (ამ შემთხვევაში `style` ატრიბუტი)
5. **Resume** (F8) დააჭირეთ

### 4.3 Node Removal

1. Elements panel-ში აირჩიეთ ერთ-ერთი `.product-card` ელემენტი
2. **მარჯვენა ღილაკი** → **Break on** → **node removal**
3. Console-ში ჩაწერეთ:

```javascript
document.querySelector('.product-card').remove();
```

4. JavaScript შეჩერდება იმ ხაზზე, სადაც ელემენტი იშლება
5. **Resume** (F8) დააჭირეთ — ბარათი წაიშლება

> **Break on DOM Changes პრაქტიკული გამოყენება:** წარმოიდგინეთ, რომ გვერდზე რაღაც ელემენტი მოულოდნელად იცვლება ან ქრება, და არ იცით, რომელი JavaScript კოდი იწვევს ამას. Break on DOM Changes-ით breakpoint დასვამთ იმ ელემენტზე, და ბრაუზერი გაჩვენებთ „დამნაშავე" კოდს.

---

## ეტაპი 5: Console API

DevTools Console გახსენით: **Cmd+Option+J** (Mac) ან **Ctrl+Shift+J** (Windows/Linux).

გვერდის ჩატვირთვისას Console-ში უკვე დაინახავთ ლურჯ სტილიზებულ შეტყობინებას და ხელმისაწვდომი ცვლადების/ფუნქციების სიას.

### 5.1 ძირითადი — log, warn, error

Console-ში სათითაოდ ჩაწერეთ:

```javascript
console.log('ჩვეულებრივი შეტყობინება');
console.warn('გაფრთხილება — ყვითელი ფერით');
console.error('შეცდომა — წითელი ფერით');
```

რას დაინახავთ:
- `console.log` — ჩვეულებრივი ტექსტი, თეთრი/ნაცრისფერი ფონით
- `console.warn` — **ყვითელი** ფონით, გაფრთხილების ხატულით
- `console.error` — **წითელი** ფონით, შეცდომის ხატულით + stack trace

> **როდის რომელი?** `log` — ჩვეულებრივი ინფორმაცია. `warn` — რაღაც არასასურველია, მაგრამ აპლიკაცია მუშაობს. `error` — რაღაც გატყდა. Console-ის ზედა ნაწილში ფილტრების ღილაკებით (All, Errors, Warnings, Info) შეგიძლიათ მხოლოდ კონკრეტული ტიპის შეტყობინებების ნახვა.

### 5.2 console.table()

Console-ში ჩაწერეთ:

```javascript
console.table(products);
```

რას დაინახავთ — ლამაზ ცხრილს:

```
┌─────────┬──────────────┬───────┬───────┬──────────────┐
│ (index) │     name     │ price │ stock │   category   │
├─────────┼──────────────┼───────┼───────┼──────────────┤
│    0    │ 'ლეპტოპი'   │ 2499  │  15   │'ელექტრონიკა' │
│    1    │ 'მაუსი'      │  49   │  230  │'აქსესუარები'  │
│    2    │ 'კლავიატურა' │  149  │  85   │'აქსესუარები'  │
│    3    │ 'მონიტორი'   │  899  │  42   │'ელექტრონიკა' │
│    4    │ 'ყურსასმენი' │  199  │  120  │'აქსესუარები'  │
└─────────┴──────────────┴───────┴───────┴──────────────┘
```

ახლა სცადეთ კონკრეტული სვეტების ფილტრაცია:

```javascript
console.table(products, ['name', 'price']);
```

ეს მხოლოდ `name` და `price` სვეტებს აჩვენებს. ცხრილის header-ზე დაჭერით სორტირებაც შეგიძლიათ.

> **console.table() პრაქტიკული გამოყენება:** მასივების და ობიექტების მასივის ნახვისთვის `console.table()` ბევრად უკეთესია ვიდრე `console.log()`, რადგან სტრუქტურირებულ, სორტირებად ცხრილს აჩვენებს. API-დან მიღებული მონაცემების სწრაფი ინსპექტირებისთვის იდეალურია.

### 5.3 console.group() / groupEnd()

Console-ში ჩაწერეთ:

```javascript
showUserInfo(sampleUser);
```

რას დაინახავთ — ჩაკეცვად (collapsible) ჯგუფებს:

```
▼ მომხმარებელი: ნინო
    ელ-ფოსტა: nino@example.com
    როლი: დეველოპერი
    ▼ პარამეტრები
        თემა: dark
        ენა: ka
```

ჯგუფის სათაურზე დაჭერით ჩაკეცვა/გახსნა შეგიძლიათ. ეს მეთოდი დაკავშირებულ ინფორმაციას ვიზუალურად აჯგუფებს.

> **console.groupCollapsed()** — იგივეა რაც `console.group()`, ოღონდ ჯგუფი თავიდანვე ჩაკეცილია. სასარგებლოა, როცა ბევრი ჯგუფია და არ გინდათ Console გადაივსოს.

### 5.4 console.time() / timeEnd()

Console-ში სათითაოდ გაუშვით:

```javascript
slowLoop();
```

```javascript
fastLoop();
```

რას დაინახავთ:

```
Slow Loop: 12.45ms
Fast Loop: 3.21ms
```

(კონკრეტული დროები თქვენს კომპიუტერზე განსხვავებული იქნება)

`Float64Array` (Typed Array) ბევრად სწრაფია ვიდრე ჩვეულებრივი მასივის `push()` — რადგან მეხსიერება წინასწარ არის გამოყოფილი.

> **console.time()/timeEnd() პრაქტიკული გამოყენება:** კოდის შესრულების დროის გაზომვისთვის. მაგალითად, API-დან მონაცემების მიღების დრო, დიდი სიის რენდერინგის დრო, ან სხვადასხვა ალგორითმის შედარება.

### 5.5 console.assert()

Console-ში ჩაწერეთ:

```javascript
validateProduct(badProduct);
```

რას დაინახავთ — **მხოლოდ ჩავარდნილი** (false) assertions გამოჩნდება წითელი შეცდომის სახით:

```
Assertion failed: ფასი უნდა იყოს დადებითი! {name: '', price: -50, stock: -3, category: ''}
Assertion failed: მარაგი არ შეიძლება იყოს უარყოფითი! {name: '', price: -50, stock: -3, category: ''}
Assertion failed: სახელი არ უნდა იყოს ცარიელი! {name: '', price: -50, stock: -3, category: ''}
```

მეოთხე assert (`price < 10000`) გაიარა — `-50 < 10000` არის `true`, ამიტომ არაფერი გამოჩნდა.

ახლა სცადეთ ნორმალურ პროდუქტზე:

```javascript
validateProduct(products[0]);
```

არაფერი გამოჩნდა — ყველა assert გაიარა. **assert მხოლოდ წარუმატებლობის დროს იბეჭდება.**

> **console.assert() vs console.error():** `assert` პირობითია — მხოლოდ მაშინ იბეჭდება, როცა პირობა `false`-ია. ეს სასარგებლოა ინვარიანტების შემოწმებისთვის: „ეს მნიშვნელობა ყოველთვის დადებითი უნდა იყოს."

### 5.6 console.trace()

Console-ში ჩაწერეთ:

```javascript
processOrder(42);
```

რას დაინახავთ — ფუნქციის გამოძახების ჯაჭვს (call stack):

```
console.trace შეკვეთა #42 — trace
  getDistance          @ console-exercises.js:74
  calculateShipping   @ console-exercises.js:70
  processOrder        @ console-exercises.js:66
  (anonymous)         @ VM...:1
```

trace-ით ხედავთ, რომ `processOrder()` გამოიძახა `calculateShipping()`, რომელმაც გამოიძახა `getDistance()`, სადაც `console.trace()` დაიბეჭდა.

> **console.trace() პრაქტიკული გამოყენება:** როცა ფუნქცია სხვადასხვა ადგილიდან იძახება და გინდათ გაიგოთ, ვინ გამოიძახა კონკრეტულ შემთხვევაში. ეს განსაკუთრებით სასარგებლოა event handler-ებში და callback-ებში.

### 5.7 console.count()

Console-ში რამდენჯერმე ჩაწერეთ:

```javascript
console.count('render');
console.count('render');
console.count('render');
console.count('click');
console.count('render');
```

რას დაინახავთ:

```
render: 1
render: 2
render: 3
click: 1
render: 4
```

ყოველი label-ისთვის ცალკე მთვლელია. `console.countReset('render')` ჩაწერეთ მთვლელის გასანულებლად.

> **console.count() პრაქტიკული გამოყენება:** React-ში კომპონენტის რენდერების დასათვლელად — `console.count('MyComponent render')` კომპონენტის ფუნქციაში ჩასვით და ნახავთ, რამდენჯერ ხდება re-render.

### 5.8 სტილიზებული console.log

Console-ში ჩაწერეთ:

```javascript
console.log('%cSuccess!', 'color: green; font-size: 20px; font-weight: bold; background: #d4f8e8; padding: 4px 12px; border-radius: 4px;');
```

ტექსტი მწვანე, დიდი და bold გამოჩნდება. `%c` ნიშნავს, რომ მომდევნო არგუმენტი CSS სტილებია.

რამდენიმე სტილი ერთ ხაზში:

```javascript
console.log('%cINFO%c მონაცემები ჩაიტვირთა', 'background: #4a6cf7; color: white; padding: 2px 8px; border-radius: 3px;', 'color: #333;');
```

---

## ეტაპი 6: Console Shortcuts

### 6.1 $0 — არჩეული ელემენტი

`$0` არის Console-ის სპეციალური ცვლადი — ის ყოველთვის Elements panel-ში **ბოლოს არჩეულ** ელემენტს აბრუნებს.

1. Elements panel-ში აირჩიეთ ერთ-ერთი `.product-card` ელემენტი (დააჭირეთ მას)
2. Console-ში ჩაწერეთ:

```javascript
$0
```

ნახავთ არჩეულ DOM ელემენტს.

3. სცადეთ:

```javascript
$0.textContent
```

ნახავთ ელემენტის ტექსტურ შიგთავსს.

4. სცადეთ ცვლილება:

```javascript
$0.style.border = '3px solid red';
$0.style.transform = 'rotate(2deg)';
```

ბარათს წითელი ჩარჩო და მცირე დახრა მიეცემა.

5. data ატრიბუტების წაკითხვა:

```javascript
$0.dataset.category
$0.dataset.price
```

> **$1, $2, $3, $4** — წინა არჩეული ელემენტებია. `$1` არის წინა არჩეული, `$2` — მის წინა, და ა.შ. სასარგებლოა ორი ელემენტის შედარებისთვის.

### 6.2 $() და $$()

`$()` არის `document.querySelector()`-ის მოკლე ჩანაწერი, ხოლო `$$()` — `document.querySelectorAll()`-ის, მაგრამ ის მასივს აბრუნებს (NodeList-ის ნაცვლად).

Console-ში სცადეთ:

```javascript
$('.nav-link')
```

პირველი `.nav-link` ელემენტი დაბრუნდება.

```javascript
$$('.student-card')
```

ყველა `.student-card` ელემენტის **მასივი** დაბრუნდება.

```javascript
$$('.student-card').map(el => el.dataset.name)
```

შედეგი:

```
['გიორგი', 'მარიამი', 'დავითი', 'ანა', 'ლუკა', 'ნინო']
```

კიდევ რამდენიმე მაგალითი:

```javascript
// ყველა პროდუქტის ფასის წაკითხვა
$$('.product-card').map(el => ({ name: el.querySelector('.card-title').textContent, price: el.dataset.price }))

// data ატრიბუტით ფილტრაცია
$$('[data-active="true"]').length
```

### 6.3 copy()

`copy()` ნებისმიერ მნიშვნელობას clipboard-ში აკოპირებს.

Console-ში ჩაწერეთ:

```javascript
copy(JSON.stringify(products, null, 2));
```

ახლა გახსენით ტექსტური რედაქტორი (VS Code, Notepad) და Cmd+V (paste) — ნახავთ products მასივის ლამაზად დაფორმატებულ JSON-ს.

სხვა მაგალითები:

```javascript
// გვერდის ყველა ბმულის კოპირება
copy($$('a').map(a => a.href).join('\n'));

// არჩეული ელემენტის HTML-ის კოპირება
copy($0.outerHTML);
```

> **copy() პრაქტიკული გამოყენება:** API-დან მიღებული response-ის კოპირება, DOM-ის ფრაგმენტის კოპირება, ან Console-ში დაგენერირებული მონაცემების ექსპორტი.

### 6.4 monitor()

`monitor()` ფუნქციის გამოძახების მონიტორინგს ჩართავს — ყოველ გამოძახებაზე Console-ში ჩაიწერება ფუნქციის სახელი და არგუმენტები.

Console-ში ჩაწერეთ:

```javascript
monitor(greet);
```

ახლა გამოიძახეთ ფუნქცია:

```javascript
greet('ნინო');
```

Console-ში დაინახავთ:

```
function greet called with arguments: ნინო
'გამარჯობა, ნინო!'
```

მონიტორინგის გამოსართავად:

```javascript
unmonitor(greet);
```

ახლა `greet('ანა')` გამოძახებისას მონიტორინგის შეტყობინება აღარ გამოჩნდება.

> **monitor() პრაქტიკული გამოყენება:** როცა გინდათ გაიგოთ, როდის და რა არგუმენტებით იძახება ფუნქცია, კოდის შეუცვლელად. სასარგებლოა event handler-ების და callback-ების debugging-ისთვის.

---

## ეტაპი 7: ფარული ელემენტების აღმოჩენა

გვერდზე 2 ფარული ელემენტია — იპოვეთ ისინი Elements panel-ში!

### 7.1 display: none ელემენტი

1. Elements panel-ში გამოიყენეთ **Cmd+F** (Find) და ჩაწერეთ `hidden-message`
2. იპოვეთ `<div class="hidden-message-1">` ელემენტი — ის გვერდზე არ ჩანს, მაგრამ DOM-ში არსებობს
3. Styles pane-ში ნახავთ `display: none` — მოხსენით ამ თვისების checkbox
4. ფარული შეტყობინება გამოჩნდება გვერდზე!

### 7.2 visibility: hidden ელემენტი

1. იპოვეთ `<div class="hidden-message-2">` ელემენტი
2. ამ ელემენტს აქვს `visibility: hidden` და `height: 0`
3. Styles pane-ში მოხსენით ორივე თვისების checkbox — მეორე ფარული შეტყობინება გამოჩნდება

### 7.3 display: none vs visibility: hidden

| თვისება | ადგილი გვერდზე | DOM-ში | ხილვადობა |
|---------|---------------|--------|-----------|
| `display: none` | **არ იკავებს** ადგილს | არსებობს | არ ჩანს |
| `visibility: hidden` | **იკავებს** ადგილს | არსებობს | არ ჩანს |
| `opacity: 0` | **იკავებს** ადგილს | არსებობს | არ ჩანს, მაგრამ **კლიკზე რეაგირებს** |

> **Console-ით პოვნა:** ფარული ელემენტების პოვნა Console-იდანაც შეგიძლიათ:
>
> ```javascript
> $$('[data-secret]')
> ```
>
> ეს ყველა ელემენტს დააბრუნებს, რომელსაც `data-secret` ატრიბუტი აქვს.

---

## შეჯამება

### ნასწავლი ტექნიკების ცხრილი

| ტექნიკა | რა აკეთებს | სად ვიყენებთ |
|---------|-----------|-------------|
| **Cmd+Shift+C** | ელემენტის არჩევა inspect-ით | გვერდის ნებისმიერი ელემენტის სწრაფი ინსპექტირება |
| **HTML live რედაქტირება** | DOM-ის რეალურ დროში ცვლილება | ტექსტის, სტრუქტურის ექსპერიმენტული ცვლილება |
| **CSS live რედაქტირება** | სტილების რეალურ დროში ცვლილება | დიზაინის iteration, ფერების/ზომების მორგება |
| **Computed tab** | ფინალური გამოთვლილი სტილები | რომელი CSS წესი „იმარჯვებს" — specificity-ის გაგება |
| **Box Model** | margin/border/padding ვიზუალიზაცია | განლაგების პრობლემების debugging |
| **Force State (:hov)** | :hover/:active/:focus სიმულაცია | ინტერაქტიული სტილების ინსპექტირება |
| **Break on DOM** | DOM ცვლილებაზე breakpoint | „ვინ ცვლის ამ ელემენტს?" — კოდის პოვნა |
| **console.table()** | მონაცემების ცხრილის სახით ნახვა | მასივების, ობიექტების ინსპექტირება |
| **console.group()** | ჩაკეცვადი ჯგუფები | დაკავშირებული ინფორმაციის ორგანიზება |
| **console.time()** | კოდის შესრულების დროის გაზომვა | performance-ის შედარება |
| **console.assert()** | პირობითი logging | ინვარიანტების შემოწმება |
| **console.trace()** | call stack ბეჭდვა | ფუნქციის გამოძახების წყაროს პოვნა |
| **console.count()** | გამოძახებების დათვლა | render-ების, event-ების დათვლა |
| **$0** | არჩეული ელემენტი Console-ში | ელემენტის სწრაფი მანიპულაცია |
| **$() / $$()** | querySelector/querySelectorAll shortcut | ელემენტების სწრაფი მოძებნა |
| **copy()** | clipboard-ში კოპირება | მონაცემების ექსპორტი |
| **monitor()** | ფუნქციის გამოძახების მონიტორინგი | debugging — ვინ, როდის, რა არგუმენტებით იძახებს |

### მთავარი წესები

1. **Elements panel = ვიზუალური debugging.** CSS-ის ცვლილებები Elements panel-ში სცადეთ, და მხოლოდ მერე გადაიტანეთ კოდში. ეს iteration-ს ბევრად აჩქარებს.
2. **Console API > console.log().** `table`, `group`, `time`, `assert` და `trace` ბევრად უფრო ინფორმაციულია ვიდრე უბრალო `log`. შეისწავლეთ და გამოიყენეთ.
3. **Console shortcuts დროს ზოგავს.** `$0`, `$()`, `$$()`, `copy()` და `monitor()` — ეს არის DevTools-ის „superpowers", რომლებიც ბევრი typing-ისგან გიხსნით.
4. **Force State (:hov) — hover-ის debugging-ის ერთადერთი სწორი გზა.** მაუსის მიტანა და იმავდროულად Styles pane-ის ნახვა შეუძლებელია — Force State ამას წყვეტს.
5. **Break on DOM Changes — „დეტექტივის" ინსტრუმენტი.** როცა არ იცით, რომელი კოდი ცვლის DOM-ს, ეს breakpoint გაჩვენებთ „დამნაშავეს".
