# Shopping Cart — Breakpoints & Step Debugging Practice

ეს არის სავარჯიშო პროექტი Vite + React-ზე, შექმნილი Breakpoints და Step Debugging-ის სწავლისთვის. აპლიკაცია შეიცავს განზრახ ჩადებულ შეცდომებს, რომელთა პოვნა და გამოსწორება უნდა მოხდეს DevTools-ის დახმარებით.

## 🚀 გაშვება

```bash
# დაინსტალირეთ dependencies
npm install

# გაუშვით development სერვერი
npm run dev

# ბრაუზერში გახსენით: http://localhost:5173
```

## 🐛 შეცდომების სია

აპლიკაცია **5 განზრახ შეცდომას** შეიცავს:

### 1. **ProductCard.jsx** — Quantity Minus Bug (ხაზი 13)
```javascript
// BUG: Minus ღილაკი ზრდის რაოდენობას გაკლების ნაცვლად
if (quantity > 1) {
  setQuantity(quantity + 1); // უნდა იყოს: quantity - 1
}
```

**როგორ იპოვოთ:**
- დააყენეთ breakpoint `handleMinus` ფუნქციაში
- დააჭირეთ minus ღილაკს პროდუქტზე
- Step Over (F10) გამოიყენეთ და ნახეთ `quantity` მნიშვნელობა

---

### 2. **calculations.js** — Discount Calculation Bug (ხაზი 52)
```javascript
// BUG: პროცენტი როგორც flat amount გამოიყენება
const discount = subtotal - discountPercent; // უნდა იყოს: subtotal * (discountPercent / 100)
```

**როგორ იპოვოთ:**
- შეიყვანეთ ფასდაკლების კოდი: `SAVE20`
- დააყენეთ breakpoint `applyDiscount` ფუნქციაში
- დააკვირდეთ `discountPercent` (20) და `discount` მნიშვნელობებს
- შეცდომა: subtotal-დან აკლდება 20 ₾ ნაცვლად 20%-ისა

---

### 3. **Checkout.jsx** — Async/Await Bug (ხაზი 23)
```javascript
// BUG: არ ელოდება async ოპერაციის დასრულებას
processCheckout(cart, total); // უნდა იყოს: await processCheckout(cart, total)

// alert მაშინვე ჩნდება
alert(`შეკვეთა გაფორმებულია!...`);
```

**როგორ იპოვოთ:**
- დააყენეთ breakpoint-ები `handleCheckout` ფუნქციაში
- Step Over (F10) გამოიყენეთ
- ნახეთ რომ `alert` ჩნდება მანამ სანამ `processCheckout` დასრულდება
- Console-ში ნახავთ "Async operation complete" შეტყობინებას alert-ის შემდეგ

**გამოსწორება:**
```javascript
async handleCheckout() {
  setIsProcessing(true);
  await processCheckout(cart, total);
  alert(`შეკვეთა გაფორმებულია!...`);
  setIsProcessing(false);
}
```

---

### 4. **CartItem.jsx** — DOM Updates (არ არის ბაგი, მაგრამ საინტერესოა)
თქვენ შეგიძლიათ დააყენოთ **DOM Breakpoint** cart items container-ზე:
- Elements → `#cart-items` → Break on → Subtree modifications
- დაამატეთ/წაშალეთ პროდუქტი
- ნახეთ რომელი React კოდი ცვლის DOM-ს

---

### 5. **ProductCard.jsx** — Conditional Breakpoint Practice
დააყენეთ conditional breakpoint `handlePlus`-ში:
```
quantity > 5
```
Breakpoint გააქტიურდება მხოლოდ მაშინ, როცა რაოდენობა 5-ზე მეტია.

---

## 📚 სავარჯიშოები

აპლიკაციის ქვედა ნაწილში არის **ExercisePanel** კომპონენტი 5 დეტალური სავარჯიშოთ:

1. **Line Breakpoint** — ბაზისური breakpoint-ის დაყენება და variables inspection
2. **Conditional Breakpoint** — breakpoint გარკვეული პირობით
3. **Debug Discount Bug** — ფასდაკლების შეცდომის პოვნა და გამოსწორება
4. **DOM Breakpoint** — DOM ცვლილებების თვალყურის დევნება
5. **Async Debugging** — async/await ბაგის პოვნა

თითოეული სავარჯიშო შეიცავს:
- დეტალურ ნაბიჯ-ნაბიჯ ინსტრუქციებს
- DevTools-ის რომელი ფუნქციის გამოყენება უნდა
- რა უნდა დააკვირდეთ და როგორ იპოვოთ შეცდომა

---

## 🛠️ DevTools-ის სასარგებლო ფუნქციები

### Breakpoints Panel-ში:
- **Line Breakpoint** — ხაზის ნომერზე დაკლიკებით
- **Conditional Breakpoint** — მარჯვენა კლიკი → Add conditional breakpoint
- **Logpoint** — მარჯვენა კლიკი → Add logpoint (console.log-ის გარეშე)

### Debugger Controls:
- **F8** (Resume) — გაგრძელება მომდევნო breakpoint-მდე
- **F10** (Step Over) — შემდეგ ხაზზე გადასვლა
- **F11** (Step Into) — ფუნქციის შიგნით შესვლა
- **Shift+F11** (Step Out) — ფუნქციიდან გამოსვლა

### Panels:
- **Scope** — მიმდინარე ცვლადების ნახვა
- **Watch** — custom expressions-ების დამატება
- **Call Stack** — ფუნქციების გამოძახების ისტორია

---

## 📝 შენიშვნები

- ყველა ფუნქციაში დამატებულია `console.log` breadcrumbs — Sources-ში ადვილად იპოვით
- ბაგები განზრახ არის subtle და დაბუგვის გარეშე რთულად შესამჩნევი
- გამოსწორებული კოდი არ არის ჩართული — თქვენ უნდა იპოვოთ და გამოასწოროთ
- Dark theme არის გამოყენებული professional look-ისთვის

---

## 🎯 სასწავლო მიზნები

ამ პროექტის დასრულების შემდეგ თქვენ შეძლებთ:

1. ✅ Breakpoint-ების დაყენებას და მართვას
2. ✅ Step Over, Step Into, Step Out-ის გამოყენებას
3. ✅ Conditional Breakpoint-ების გამოყენებას
4. ✅ DOM Breakpoint-ების გამოყენებას
5. ✅ Async კოდის დებაგვას
6. ✅ Variables inspection-ს Scope/Watch პანელებში
7. ✅ Call Stack-ის გაგებას

---

## 📦 პროექტის სტრუქტურა

```
demo-breakpoints/
├── src/
│   ├── components/
│   │   ├── ProductList.jsx      # პროდუქტების სია
│   │   ├── ProductCard.jsx       # პროდუქტის ქარდი (BUG #1)
│   │   ├── Cart.jsx              # კალათის მთავარი კომპონენტი
│   │   ├── CartItem.jsx          # კალათის ელემენტი
│   │   ├── DiscountForm.jsx      # ფასდაკლების ფორმა
│   │   ├── Checkout.jsx          # Checkout ღილაკი (BUG #3)
│   │   └── ExercisePanel.jsx     # სავარჯიშოების პანელი
│   ├── utils/
│   │   └── calculations.js       # გამოთვლები (BUG #2)
│   ├── App.jsx                   # მთავარი კომპონენტი
│   ├── App.css                   # სტილები
│   └── main.jsx                  # Entry point
├── package.json
├── vite.config.js
└── index.html
```

---

## 🎓 რჩევები

1. **არ იჩქაროთ** — Debugging-ი არის ნელი და ყურადღებიანი პროცესი
2. **წაიკითხეთ Scope** — ყოველთვის შეამოწმეთ რა მნიშვნელობებია ცვლადებს
3. **გამოიყენეთ Watch** — დაამატეთ expressions რომლებსაც ყურადღებით აკვირდებით
4. **Call Stack არის თქვენი მეგობარი** — ის გიჩვენებთ როგორ მოხვდით ამ ხაზზე
5. **Console.log-ს დახმარება** — breadcrumbs გეხმარებათ ნავიგაციაში

---

## 🌟 გაფართოება

როცა ყველა ბაგს იპოვით, სცადეთ:

1. დაამატეთ ახალი ფუნქციები (favorites, search, sorting)
2. დაამატეთ თქვენი ბაგები სავარჯიშოდ
3. გაიმეორეთ იგივე ამოცანები უფრო სწრაფად
4. ნახეთ React DevTools-ით როგორ მუშაობს state updates

---

**წარმატებები დებაგვაში! 🐛🔍**
