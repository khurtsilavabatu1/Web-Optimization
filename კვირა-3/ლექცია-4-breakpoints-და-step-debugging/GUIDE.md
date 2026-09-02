# Breakpoints და Step Debugging — ეტაპობრივი გაიდი

ამ პრაქტიკაში თქვენ იმუშავებთ „გაფუჭებულ" React Shopping Cart აპლიკაციაზე, რომელშიც 5 შეცდომაა ჩაშენებული. თქვენი ამოცანაა — იპოვოთ ყოველი ბაგი **Breakpoints-ის** სხვადასხვა ტიპის და Step Debugging-ის გამოყენებით. ეს სავარჯიშო ასწავლით როგორ გამოიყენოთ DevTools-ის Sources პანელი, breakpoints, Watch expressions და Call Stack.

პროექტი მდებარეობს `demo-breakpoints/` ფოლდერში. ფაილები:

- **`src/App.jsx`** — მთავარი კომპონენტი — კალათის state მენეჯმენტი (1 ბაგი)
- **`src/components/ProductCard.jsx`** — პროდუქტის ბარათი (1 ბაგი)
- **`src/components/Checkout.jsx`** — შეკვეთის გაფორმება (1 ბაგი)
- **`src/components/Cart.jsx`** — კალათის კომპონენტი
- **`src/components/CartItem.jsx`** — კალათის ელემენტი
- **`src/utils/calculations.js`** — ფასდაკლებისა და გადასახადის გამოთვლა (2 ბაგი)

---

## ეტაპი 1: პროექტის გაშვება და პირველი შეხედვა

### 1.1 პროექტის გაშვება

```bash
cd ~/Desktop/Web-optimization/კვირა-3/ლექცია-4-breakpoints-და-step-debugging/demo-breakpoints
npm install
npm run dev
```

გახსენით ბრაუზერში: `http://localhost:5173`

> **რატომ Vite + React?** React-ის async state updates, useEffect side effects და event handlers განსაკუთრებული debugging-ის მეთოდებს მოითხოვს. Breakpoints-ის სწორად დასმა React hooks-ის lifecycle-ში და async code-ში რეალურ პროექტებში ყოველდღიური საჭიროებაა.

### 1.2 გახსენით DevTools

1. გახსენით `http://localhost:5173`
2. DevTools გახსენით: **Cmd+Option+I** (Mac) ან **Ctrl+Shift+I** (Windows/Linux)
3. გადაერთეთ **Sources** tab-ზე

### 1.3 რას ხედავთ?

გვერდზე პროდუქტების სია ჩანს — მაუსი, კლავიატურა, USB ჰაბი, ვებ-კამერა და სხვა. მარჯვნივ კალათა ჩანს. Console-ში შეცდომა არ ჩანს — აპლიკაცია ჩაიტვირთა. მაგრამ **ლოგიკური ბაგები** იმალება!

### 1.4 პირველი ტესტი

სცადეთ რამდენიმე მოქმედება:

1. რაოდენობა გაზარდეთ 3-მდე და დააჭირეთ „კალათაში დამატება" — რამდენი ცალი ჩნდება კალათაში?
2. შეიყვანეთ ფასდაკლების კოდი `SAVE20` — ფასდაკლების თანხა ადეკვატურია?
3. კალათაში პროდუქტის `×` (წაშლის) ღილაკზე დააჭირეთ — წაიშალა?
4. სცადეთ ცარიელ კალათაზე „შეკვეთის გაფორმება" — რა მოხდა?

> **ამ ეტაპზე მიზანია** აპლიკაცია ხელით ტესტირება — დააკვირდით რა არ მუშაობს სწორად. სიმპტომების ჩამონათვალს გაკეთებთ, შემდეგ ეტაპებში Breakpoints-ით მიზეზებს იპოვით.

---

## ეტაპი 2: Line-of-Code Breakpoints — ფასდაკლების გამოთვლა (Bug #1)

### 2.1 სიმპტომი

კალათაში პროდუქტი დაამატეთ (მაგ., მექანიკური კლავიატურა — 120 ₾). ფასდაკლების კოდი შეიყვანეთ `SAVE20`. ფასდაკლება 20% უნდა იყოს, ანუ 24 ₾. სანაცვლოდ ფასდაკლება **2400 ₾**-ია — ჯამი უარყოფითი ხდება!

კოდს რომ შეხედავთ, `subtotal * discountPercent` ერთი შეხედვით ლოგიკურად ჟღერს — "ქვეჯამი გამრავლებული ფასდაკლების პროცენტზე". მაგრამ ბაგი აქ იმალება — Breakpoint-ით ნელ-ნელა მივყვეთ.

### 2.2 Breakpoint-ის დასმა

1. **Sources** tab-ზე გახსენით `src/utils/calculations.js` (მარცხენა პანელში Page → localhost → src → utils)
2. იპოვეთ `applyDiscount` ფუნქცია
3. დააჭირეთ ხაზის ნომერს **ფუნქციის პირველ ხაზზე** (`if (!code)`) — **ლურჯი წერტილი** გაჩნდება

ეს არის **Line-of-Code Breakpoint** — ყველაზე ძირითადი ტიპი. კოდი ამ ხაზზე შეჩერდება.

### 2.3 Breakpoint-ზე შეჩერება და Step-ით გავლა

1. კალათაში დაამატეთ პროდუქტი და შეიყვანეთ ფასდაკლების კოდი `SAVE20`
2. კოდი breakpoint-ზე **შეჩერდება**
3. ახლა **F10** (Step Over) დააჭირეთ ხაზ-ხაზ და Scope Panel-ში ცვლადებს ადევნეთ თვალი:

### 2.4 F10-ით ხაზ-ხაზ — Scope Panel-ის დაკვირვება

დააჭირეთ **F10** (Step Over) ყოველ ხაზზე:

- `if (!code)` — code არის `"SAVE20"`, პირობა false, გავდივართ
- `let discountPercent = 0;` — Scope: `discountPercent: 0` ✓
- `switch → case 'SAVE20':` — Scope: `discountPercent: 20` — ჯერ ყველაფერი ლოგიკურია
- `const discount = subtotal * discountPercent;` — **აქ შეჩერდით!**

Scope-ში ნახავთ:

```
Local:
  subtotal: 120
  discountPercent: 20
  discount: 2400        ← 120 × 20 = 2400 !!!
```

**აჰა მომენტი:** `discountPercent` არის `20` (მთელი რიცხვი), არა `0.20` (ათწილადი). ფორმულა `subtotal * discountPercent` ამრავლებს 120 × 20 = 2400, ნაცვლად 120 × 0.20 = 24. პრობლემა ისაა, რომ 20% პროცენტი არ გარდაქმნილა ათწილად რიცხვში.

### 2.5 გამოსწორება

გახსენით `src/utils/calculations.js` და შეცვალეთ:

```javascript
// ადრე:
const discount = subtotal * discountPercent;

// სწორი — პროცენტი გაყავით 100-ზე:
const discount = subtotal * (discountPercent / 100);
```

შეინახეთ ფაილი — Vite ავტომატურად განაახლებს გვერდს.

### 2.6 ჩაინიშნეთ

> **Line-of-Code Breakpoint + Step Over:**
> 1. Sources tab-ზე გახსენით ფაილი
> 2. Breakpoint დასვით ფუნქციის **დასაწყისში** — არა ბაგიან ხაზზე!
> 3. მოქმედება გაიმეორეთ (ღილაკზე დაჭერა, და ა.შ.)
> 4. **F10**-ით ხაზ-ხაზ მიყევით — Scope Panel-ში უყურეთ, სად ხდება ცვლადის მნიშვნელობა არასწორი
> 5. Resume (F8) — გაგრძელება

---

## ეტაპი 3: Step Over / Step Into / Step Out — რაოდენობის ღილაკი (Bug #2)

### 3.1 სიმპტომი

პროდუქტის ბარათზე რაოდენობა აირჩიეთ 3 (პლუსით გაზარდეთ), შემდეგ დააჭირეთ **"კალათაში დამატება"**. კალათაში უნდა ჩავიდეს 3 ცალი, მაგრამ **ყოველთვის 1 ცალი** ჩნდება — რაოდენობის არჩევა არ მუშაობს!

მინუს და პლუს ღილაკები თავისთავად გამართულად ცვლის რიცხვს. პრობლემა სხვაგანაა — მაგრამ სად?

### 3.2 Breakpoint-ის დასმა

1. Sources tab-ზე გახსენით `src/components/ProductCard.jsx`
2. იპოვეთ `handleAddToCart` ფუნქცია
3. Breakpoint დასვით ფუნქციის **პირველ ხაზზე**

### 3.3 Step-by-Step გავლა

1. გვერდზე რაოდენობა გაზარდეთ 3-მდე, შემდეგ დააჭირეთ „კალათაში დამატება"
2. კოდი breakpoint-ზე შეჩერდება

ახლა გამოიყენეთ debugger controls:

- **F10** — Step Over — შემდეგ ხაზზე გადავა (ფუნქციაში არ შედის)
- **F11** — Step Into — ფუნქციაში შესვლა
- **Shift+F11** — Step Out — ფუნქციიდან გამოსვლა
- **F8** — Resume — გაგრძელება შემდეგ breakpoint-მდე

### 3.4 F10-ით ხაზ-ხაზ

Scope პანელში ნახავთ:

```
Local:
  product: {id: 2, name: "მექანიკური კლავიატურა", price: 120, ...}
  quantity: 3
```

`quantity` სწორია — 3. ახლა **F10** დააჭირეთ და შემდეგ ხაზზე გადახვალთ:

```javascript
onAddToCart(product, 1);  // ← quantity არის 3, მაგრამ აქ 1 იგზავნება!
```

**აჰა მომენტი:** Scope-ში `quantity: 3` ჩანს, მაგრამ ფუნქცია `1`-ს აგზავნის `quantity`-ის ნაცვლად! ეს არის copy-paste შეცდომა — ვიღაცამ hardcode-ით `1` ჩაწერა.

### 3.5 გამოსწორება

გახსენით `src/components/ProductCard.jsx` და `handleAddToCart` ფუნქციაში შეცვალეთ:

```javascript
// ადრე:
onAddToCart(product, 1);

// სწორი:
onAddToCart(product, quantity);
```

### 3.6 Step Into (F11) — როდის ვიყენებთ?

**Step Into** (F11) გამოიყენეთ, როცა ფუნქციის შიგნით შესვლა გინდათ. მაგალითად:

```javascript
onAddToCart(product, quantity);  // F11 დააჭირეთ
// F11 → App.jsx-ში handleAddToCart ფუნქციის პირველ ხაზზე შეჩერდება
// F10 → handleAddToCart-ს მთლიანად შეასრულებს და შემდეგ ხაზზე გადავა
```

**Step Out** (Shift+F11) გამოიყენეთ, როცა ფუნქციაში შეხვედით და გინდათ გამოსვლა — ფუნქციის დანარჩენ ხაზებს ავტომატურად შეასრულებს.

> **Step Over vs Step Into vs Step Out:**
> - **F10 (Step Over)** — ჩვეულებრივი შემთხვევისთვის: ხაზ-ხაზ გავლა
> - **F11 (Step Into)** — როცა ფუნქციის შიგნით რა ხდება გინტერესებთ
> - **Shift+F11 (Step Out)** — როცა ფუნქციაში შეცდომით შეხვედით ან საინტერესო ადგილი გაიარეთ

---

## ეტაპი 4: Logpoints — პროდუქტის წაშლა (Bug #3)

### 4.1 სიმპტომი

კალათაში რამდენიმე პროდუქტი დაამატეთ. ერთ-ერთის `x` (წაშლის) ღილაკზე დააჭირეთ. **პროდუქტი კალათაში რჩება** — ჯამი არ იცვლება, სია არ განახლდება.

### 4.2 Logpoint — რა არის?

Logpoint არის breakpoint-ის ალტერნატივა, რომელიც **არ აჩერებს** კოდს — უბრალოდ Console-ში ბეჭდავს. ეს არის `console.log()`-ის ალტერნატივა, კოდში ცვლილების გარეშე!

### 4.3 Logpoint-ის დასმა

1. Sources tab-ზე გახსენით `src/App.jsx` (მარცხენა პანელში Page → localhost → src)
2. იპოვეთ `handleRemoveItem` ფუნქცია
3. **Right-click** ხაზის ნომერზე `cart.filter(...)` → **"Add logpoint"**
4. შეიყვანეთ: `'handleRemoveItem called. productId:', productId`

### 4.4 Console-ში ნახვა

ახლა წაშალეთ პროდუქტი. Console-ში ნახავთ:

```
handleRemoveItem called. productId: 2
```

ფუნქცია **გამოიძახება** (productId სწორია), მაგრამ UI არ განახლდა — პროდუქტი კალათაში რჩება! ეს ნიშნავს, რომ პრობლემა გამოძახებაში კი არა, ფუნქციის **შიგნით** არის. ახლა შეხედეთ კოდს:

შეხედეთ `handleRemoveItem` ფუნქციის კოდს:

```javascript
const handleRemoveItem = (productId) => {
  // BUG #3: filter-ის შედეგი არსად ინახება — setCart არ არის გამოძახებული!
  cart.filter(item => item.id !== productId);
};
```

`cart.filter(...)` ახალ მასივს აბრუნებს, მაგრამ ეს შედეგი არსად ინახება. React-ის `setCart` არ არის გამოძახებული — ამიტომ state არ იცვლება და UI არ განახლდება.

### 4.5 გამოსწორება

```javascript
const handleRemoveItem = (productId) => {
  setCart(prevCart => prevCart.filter(item => item.id !== productId));
};
```

### 4.6 Logpoint-ის უპირატესობა

> **Logpoint vs console.log:**
>
> - **კოდის ცვლილება:** `console.log` — კოდში ჩასმა საჭიროა; Logpoint — არა, DevTools-ში ისმება
> - **წაშლა:** `console.log` — ხელით წაშლა, commit-ში შეიძლება დარჩეს; Logpoint — DevTools-ში ერთი click
> - **პროდაქშენ კოდი:** `console.log` — არ უნდა მოხვდეს; Logpoint — საფრთხე არ არის
> - **გამოყენება:** `console.log` — ნებისმიერ რედაქტორში; Logpoint — მხოლოდ DevTools-ში
>
> **რეკომენდაცია:** სწრაფი debugging-ისთვის Logpoint-ი უკეთესია. კომპლექსური ლოგიკისთვის `console.log` უფრო მოქნილია.

---

## ეტაპი 5: Exception Breakpoint — ცარიელი კალათა (Bug #4)

### 5.1 სიმპტომი

კალათა ცარიელია (ან გაასუფთავეთ „კალათის გასუფთავება" ღილაკით). დააჭირეთ „შეკვეთის გაფორმება". Console-ში წითელი შეცდომა ჩნდება:

```
Uncaught TypeError: Cannot read properties of undefined (reading 'name')
    at handleCheckout (Checkout.jsx)
```

### 5.2 Exception Breakpoint — ავტომატური შეჩერება

Exception Breakpoint კოდს **ყველა** გამონაკლისზე (exception) შეაჩერებს — ხაზის ნომრის წინასწარ ცოდნა არ გჭირდებათ!

1. Sources tab-ზე, მარჯვნივ, იპოვეთ **Breakpoints** სექცია
2. ჩართეთ **"Pause on uncaught exceptions"** (⏸ ღილაკი)

### 5.3 შეცდომის გამეორება

1. გაასუფთავეთ კალათა
2. დააჭირეთ „შეკვეთის გაფორმება"
3. კოდი **ავტომატურად შეჩერდება** `Checkout.jsx`-ის `handleCheckout` ფუნქციაში

Scope პანელში ნახავთ:

```
Local:
  cart: []   (ცარიელი მასივი)
```

კოდი:

```javascript
const firstItemName = cart[0].name;  // cart[0] = undefined → undefined.name → TypeError!
```

### 5.4 გამოსწორება

გახსენით `src/components/Checkout.jsx` და `handleCheckout` ფუნქციის დასაწყისში ცარიელი კალათის შემოწმება დაამატეთ:

```javascript
const handleCheckout = () => {
  if (cart.length === 0) {
    alert('კალათა ცარიელია! ჯერ პროდუქტი დაამატეთ.');
    return;
  }

  // ... დანარჩენი კოდი
};
```

### 5.5 ჩაინიშნეთ

> **Exception Breakpoint — როდის ვიყენებთ:**
> - როცა Console-ში `TypeError`, `ReferenceError` ან სხვა exception ჩანს
> - როცა გინდათ ზუსტად იმ მომენტში შეჩერება, როცა შეცდომა მოხდა
> - ხაზის ნომრის წინასწარ ცოდნა არ არის საჭირო — DevTools თვითონ იპოვის
>
> **გამორთეთ** სხვა debugging-ის დროს, თორემ ყოველ caught exception-ზეც შეჩერდება.

---

## ეტაპი 6: Conditional Breakpoints და Watch Expressions — გადასახადი (Bug #5)

### 6.1 სიმპტომი

კალათაში პროდუქტი დაამატეთ და შეადარეთ: ქვეჯამი 120.00, ფასდაკლება 24.00 (20%), ანუ ფასდაკლებული ჯამი 96.00. გადასახადი 18% = 17.28 ₾ უნდა იყოს. სანაცვლოდ **17.00 ₾** ჩანს — თეთრები (cents) დაკარგულია!

### 6.2 Conditional Breakpoint — რა არის?

ჩვეულებრივი breakpoint ყოველთვის ჩერდება. **Conditional Breakpoint** მხოლოდ მაშინ ჩერდება, როცა თქვენი პირობა `true`-ს აბრუნებს. ეს განსაკუთრებით სასარგებლოა ციკლებში ან ხშირად გამოძახებულ ფუნქციებში.

### 6.3 Conditional Breakpoint-ის დასმა

1. Sources tab-ზე გახსენით `src/utils/calculations.js`
2. იპოვეთ `calculateTax` ფუნქცია
3. **Right-click** ხაზის ნომერზე `const roundedTax = parseInt(tax);` → **"Add conditional breakpoint"**
4. შეიყვანეთ პირობა: `amount > 50`

ეს ნიშნავს: breakpoint მხოლოდ მაშინ გააქტიურდება, როცა თანხა 50-ზე მეტია.

### 6.4 შეჩერება და ანალიზი

1. კალათაში დაამატეთ 120 ₾-ის პროდუქტი
2. კოდი `calculateTax`-ში შეჩერდება (რადგან amount > 50)

Scope-ში ნახავთ:

```
Local:
  amount: 120
  tax: 21.6
```

### 6.5 Watch Expressions — დამატებითი მონიტორინგი

Watch პანელში (`+` ღილაკი) დაამატეთ:

```
amount * 0.18
parseInt(amount * 0.18)
```

Watch-ში ნახავთ:

```
amount * 0.18:               21.6
parseInt(amount * 0.18):     21
```

**აი პრობლემა!** `parseInt` ათწილად რიცხვს მთელ რიცხვად გარდაქმნის — `21.6` ხდება `21`. თეთრები იკარგება.

### 6.6 გამოსწორება

გახსენით `src/utils/calculations.js` და `calculateTax` ფუნქციაში შეცვალეთ:

```javascript
// ადრე:
const roundedTax = parseInt(tax);

// სწორი — Math.round * 100 / 100 ინახავს 2 ათწილადს:
const roundedTax = Math.round(tax * 100) / 100;
```

### 6.7 ჩაინიშნეთ

> **Conditional Breakpoint — როდის ვიყენებთ:**
> - ციკლში — მხოლოდ კონკრეტულ ელემენტზე (`i === 5`, `item.id === 42`)
> - ხშირად გამოძახებულ ფუნქციაში — მხოლოდ გარკვეულ პირობაზე
> - დიდ მასივთან მუშაობისას — ყოველი ელემენტზე შეჩერება არაპრაქტიკულია
>
> **სინტაქსი:** ნებისმიერი JavaScript expression, რომელიც `true` ან `false` აბრუნებს.
> მაგალითები:
> - `userId === 42`
> - `items.length > 10`
> - `price * quantity > 1000`

---

## ეტაპი 7: Scope Panel — ლოკალური, Closure, გლობალური

### 7.1 სამი Scope

როცა კოდი breakpoint-ზე შეჩერებულია, **Scope** პანელში სამი სექცია ჩანს:

- **Local** — ფუნქციის ლოკალური ცვლადები (მაგ.: `subtotal`, `discount`, `tax`)
- **Closure** — გარე ფუნქციიდან „ნასესხები" ცვლადები (მაგ.: event handler-ებში `btn`, `display`)
- **Global** — გლობალური ცვლადები (`window`) (მაგ.: `cart`, `products`, `TAX_RATE`)

### 7.2 პრაქტიკა

1. Breakpoint დასვით `calculateTotal` ფუნქციაში (`src/utils/calculations.js`)
2. კალათაში პროდუქტი დაამატეთ
3. Scope → **Local** ნახავთ:

```
Local:
  subtotal: 120
  discount: 100       (ან 24 — თუ Bug #1 უკვე გამოგისწორებიათ!)
  tax: 21
```

4. Scope → **Closure** ნახავთ:

```
Closure:
  TAX_RATE: 0.18
```

> **რჩევა:** Local scope-ში ცვლადების მნიშვნელობების **შეცვლა** შეგიძლიათ! Double-click ცვლადის მნიშვნელობაზე, შეიყვანეთ ახალი და Resume (F8) — კოდი ახალი მნიშვნელობით გააგრძელებს.

---

## ეტაპი 8: Watch Expressions — ცვლადების მონიტორინგი

### 8.1 Watch Panel

Watch expressions არის ცვლადები ან გამოსახულებები, რომლებსაც DevTools ყოველ breakpoint-ზე ავტომატურად აფასებს და აჩვენებს.

### 8.2 პრაქტიკა

1. Breakpoint დასვით `calculateTotal` ფუნქციაში (`src/utils/calculations.js`)
2. Watch პანელში (`+` ღილაკი) დაამატეთ:

```
subtotal
discount
tax
subtotal - discount + tax
```

3. კალათაში პროდუქტები დაამატეთ — ყოველ დამატებაზე Watch-ში ახალი მნიშვნელობები ჩანს

### 8.3 Watch-ის მაგალითი

```
subtotal:                    165
discount:                    145     (165 - 20 — ბაგიანი!)
tax:                         3       (parseInt-ით — ბაგიანი!)
subtotal - discount + tax:   23
```

> **Watch Expressions-ის უპირატესობა:**
> - ნებისმიერი JavaScript expression შეიძლება — არა მხოლოდ ცვლადები
> - ფუნქციების გამოძახებაც შეგიძლიათ (`calculateSubtotal()`)
> - ინახება breakpoint-ებს შორის — ყოველ შეჩერებაზე ავტომატურად განახლდება
> - `<not available>` ჩანს, თუ expression მიმდინარე scope-ში ვერ შეფასდა

---

## ეტაპი 9: Call Stack — ფუნქციების გამოძახების ჯაჭვი

### 9.1 Call Stack — რა არის?

Call Stack აჩვენებს **ფუნქციების გამოძახების ჯაჭვს** — საიდან მოხვდა კოდი ამ წერტილში. ეს განსაკუთრებით სასარგებლოა, როცა ერთი ფუნქცია სხვა ფუნქციიდან იძახება.

### 9.2 პრაქტიკა

1. Breakpoint დასვით `applyDiscount` ფუნქციის `return` ხაზზე (`src/utils/calculations.js`)
2. კალათაში პროდუქტი დაამატეთ და ფასდაკლების კოდი შეიყვანეთ
3. Call Stack პანელში ნახავთ:

```
applyDiscount        calculations.js
Cart                 Cart.jsx
App                  App.jsx
```

**ქვემოდან ზემოთ წაიკითხეთ:**

1. `App` კომპონენტი რენდერდება
2. `Cart` კომპონენტი იძახებს `applyDiscount`-ს ფასდაკლების გამოსათვლელად
3. `applyDiscount` — ჩვენ **აქ** ვართ

### 9.3 Call Stack-ში ნავიგაცია

Call Stack-ში სხვა ფუნქციის სახელზე დაჭერით ამ ფუნქციის **კონტექსტში** გადახვალთ — Scope პანელში იმ ფუნქციის ლოკალური ცვლადები ჩანს. ეს ეხმარება ბაგის წარმოშობის ადგილის პოვნას.

> **Call Stack — როდის ვიყენებთ:**
> - როცა გინდათ გაიგოთ **ვინ** გამოიძახა ეს ფუნქცია
> - როცა ბაგი ერთ ფუნქციაშია, მაგრამ მიზეზი მეორეშია
> - როცა callback-ების ან event handler-ების ჯაჭვი გრძელია

---

## ეტაპი 10: შეამოწმეთ გამოსწორებები

### 10.1 ყველა ბაგის გამოსწორების შემდეგ შეამოწმეთ

- **მინუს ღილაკი:** პროდუქტის ბარათზე რაოდენობა მცირდება
- **ფასდაკლება:** 120 ₾-ზე SAVE20 = 24.00 ₾ ფასდაკლება
- **წაშლა:** `×` ღილაკით პროდუქტი კალათიდან იშლება
- **ცარიელი კალათა:** „შეკვეთის გაფორმება" → alert „კალათა ცარიელია!"
- **გადასახადი:** 120.00 × 0.18 = 21.60 ₾ (არა 21.00)

---

## შეჯამება: 5 Bug-ის ცხრილი

1. **Bug #1 — Discount Calculation (Logic)**
   - **სიმპტომი:** ფასდაკლება უზარმაზარია — 120₾-ზე SAVE20-ით 2400₾ ფასდაკლება ჩანს 24₾-ის ნაცვლად
   - **მიზეზი:** `subtotal * discountPercent` (120×20=2400) — პროცენტი არ იყოფა 100-ზე (`calculations.js`)
   - **Breakpoint ტიპი:** Line-of-Code Breakpoint + F10 Step Over + Scope Panel
   - **გამოსწორება:** `discount = subtotal * (discountPercent / 100)`

2. **Bug #2 — Add to Cart Quantity (Hardcoded Value)**
   - **სიმპტომი:** რაოდენობა 3 აირჩიე, მაგრამ კალათაში ყოველთვის 1 ჩნდება
   - **მიზეზი:** `onAddToCart(product, 1)` — hardcoded `1` ნაცვლად `quantity` (`ProductCard.jsx`)
   - **Breakpoint ტიპი:** Step Over (F10) — Scope-ში quantity:3, მაგრამ კოდი 1-ს აგზავნის
   - **გამოსწორება:** `onAddToCart(product, quantity)`

3. **Bug #3 — Remove Item (State Update)**
   - **სიმპტომი:** კალათიდან პროდუქტის წაშლა არ მუშაობს — `×` ღილაკზე არაფერი იცვლება
   - **მიზეზი:** `cart.filter(...)` — შედეგი არსად ინახება, `setCart` არ არის გამოძახებული (`App.jsx`)
   - **Breakpoint ტიპი:** Logpoint + ფუნქციის კოდის ანალიზი
   - **გამოსწორება:** `setCart(prevCart => prevCart.filter(...))`

4. **Bug #4 — Empty Cart Validation (Runtime)**
   - **სიმპტომი:** ცარიელ კალათაზე checkout → `Cannot read properties of undefined (reading 'name')`
   - **მიზეზი:** `cart[0].name` — `cart[0]` არ არსებობს, validation აკლია (`Checkout.jsx`)
   - **Breakpoint ტიპი:** Exception Breakpoint (Pause on uncaught exceptions)
   - **გამოსწორება:** `if (cart.length === 0) { alert(...); return; }`

5. **Bug #5 — Tax Precision (Math Logic)**
   - **სიმპტომი:** გადასახადი თეთრებს კარგავს (21₾ ნაცვლად 21.60₾)
   - **მიზეზი:** `parseInt(tax)` ჭრის ათწილადებს (`calculations.js`)
   - **Breakpoint ტიპი:** Conditional Breakpoint + Watch expression
   - **გამოსწორება:** `Math.round(tax * 100) / 100` — 2 ათწილადის შენარჩუნება

---

## Breakpoint ტიპების შეჯამება

- **Line-of-Code** — როგორ ისმება: ხაზის ნომერზე click — ყველაზე ძირითადი, კონკრეტულ ხაზზე შეჩერება
- **Conditional** — როგორ ისმება: Right-click → Add conditional breakpoint — მხოლოდ პირობის შესრულებისას (ციკლებში, ხშირ გამოძახებებში)
- **Logpoint** — როგორ ისმება: Right-click → Add logpoint — Console-ში ბეჭდვა კოდის შეჩერების გარეშე
- **Exception** — როგორ ისმება: Sources → ⏸ ღილაკი — ნებისმიერ exception-ზე ავტომატური შეჩერება
- **DOM** — როგორ ისმება: Elements → Right-click → Break on — DOM-ის ცვლილებებზე შეჩერება
- **Event Listener** — როგორ ისმება: Sources → Event Listener Breakpoints — კონკრეტულ event-ზე (click, keydown, XHR)

## Debugger Controls შეჯამება

- **F8** — Resume — გაგრძელება შემდეგ breakpoint-მდე
- **F10** — Step Over — შემდეგ ხაზზე (ფუნქციაში არ შედის)
- **F11** — Step Into — ფუნქციაში შესვლა
- **Shift+F11** — Step Out — ფუნქციიდან გამოსვლა

---

## მთავარი წესები

1. **Line-of-Code Breakpoint** — პირველი ნაბიჯი ნებისმიერი ბაგის გამოძიებისას. Scope პანელში ცვლადების მნიშვნელობები ნახეთ.
2. **Step Over (F10)** — ხაზ-ხაზ გავლა ლოგიკის გასაგებად. Step Into (F11) — ფუნქციის შიგნით შესასვლელად.
3. **Logpoint** — `console.log()`-ის ალტერნატივა კოდის ცვლილების გარეშე. პროდაქშენ debugging-ისთვის იდეალურია.
4. **Conditional Breakpoint** — ციკლებში და ხშირ გამოძახებებში. არ შეგაწყვეტინებთ ყოველ iteration-ზე.
5. **Watch Expressions** — რთული გამოსახულებების მონიტორინგი. ფუნქციების გამოძახებაც შეგიძლიათ.
6. **Call Stack** — „ვინ გამოიძახა ეს ფუნქცია?" კითხვაზე პასუხი.
7. **Exception Breakpoint** — ჩართეთ, როცა Console-ში TypeError ან სხვა exception ჩანს — DevTools ზუსტ ადგილას შეგაჩერებთ.
