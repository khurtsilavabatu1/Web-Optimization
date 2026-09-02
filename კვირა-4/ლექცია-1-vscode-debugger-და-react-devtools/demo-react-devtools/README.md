# Product Dashboard — React DevTools Demo

React DevTools-ის სასწავლო პროექტი, რომელიც აჩვენებს კომპონენტების re-render-ების ოპტიმიზაციის საჭიროებას.

## პროექტის აღწერა

ეს არის Product Dashboard აპლიკაცია, რომელიც ნამდვილად დემონსტრირებს React-ის რენდერების ქცევას და საშუალებას გაძლევს სტუდენტებს ნახონ როგორ მუშაობს React DevTools.

### ძირითადი ფუნქციონალი

- **პროდუქტების ძიება** — ტექსტური ფილტრაცია
- **კალათაში დამატება** — პროდუქტების მართვა
- **რენდერების თვალთვალი** — ვიზუალური მთვლელი თითოეულ კომპონენტზე
- **Console.log-ები** — lifecycle events-ის დაკვირვება DevTools-ში

### კომპონენტების სტრუქტურა

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Main app component
├── App.css               # Global styles
└── components/
    ├── SearchBar.jsx     # Search input component
    ├── ProductList.jsx   # Products list container
    ├── ProductCard.jsx   # Individual product card
    └── CartSummary.jsx   # Shopping cart sidebar
```

## React DevTools-ის სასწავლო მიზნები

### 1. რენდერების თვალთვალი

თითოეულ კომპონენტს აქვს `useRef` რომელიც ითვლის რენდერების რაოდენობას. ეს ვიზუალურად ჩანს სპეციალურ badge-ში.

**გასათვალისწინებელი:** არცერთი კომპონენტი არ იყენებს `React.memo`, `useMemo` ან `useCallback` — ეს განზრახ გაკეთებულია რომ სტუდენტებმა დაინახონ როგორ ხდება ზედმეტი re-render-ები.

### 2. Console.log სისტემა

თითოეულ კომპონენტში დამატებულია console.log-ები:
- 🎯 Component mounted
- 👋 Component will unmount  
- 🔄 Component re-rendered
- 🔍 State changes (search, cart)
- ➕➖ User actions

### 3. React DevTools-ის გამოყენება

სტუდენტებს შეუძლიათ:

1. **Components Tab**
   - კომპონენტების იერარქიის დანახვა
   - Props & State-ის ინსპექცია
   - Re-render-ების highlight

2. **Profiler Tab**
   - რენდერების ჩაწერა
   - Flame chart-ის ანალიზი
   - რენდერების მიზეზების იდენტიფიკაცია

3. **ოპტიმიზაციის შესაძლებლობები**
   - რომელი კომპონენტები რენდერდებიან ზედმეტად?
   - რა ხდება search input-ის აკრეფისას?
   - რა ხდება კალათაში პროდუქტის დამატებისას?

## დეველოპმენტი

### Installation

```bash
npm install
```

### Development server

```bash
npm run dev
```

App გაიხსნება `http://localhost:5173`

### Build

```bash
npm run build
```

Build output: `dist/` directory

### Preview production build

```bash
npm run preview
```

## ტექნოლოგიები

- **React 18.3.1** — useState, useEffect, useRef
- **Vite 5.4** — Build tool & dev server
- **CSS** — Pure CSS (no frameworks)

## სავარჯიშოები სტუდენტებისთვის

1. **გახსენით React DevTools და:**
   - დააკვირდით Components tab-ს
   - ჩაანიშნეთ "Highlight updates when components render"
   - აკრიფეთ search bar-ში და ნახეთ რა კომპონენტები რენდერდებიან

2. **გამოიყენეთ Profiler:**
   - დააჭირეთ Record ღილაკს
   - დაამატეთ რამდენიმე პროდუქტი კალათაში
   - შეაჩერეთ ჩაწერა
   - გააანალიზეთ რომელი კომპონენტები რენდერდებიან და რატომ

3. **Console-ის მონიტორინგი:**
   - გახსენით Console
   - შეასრულეთ სხვადასხვა action (search, add to cart, remove)
   - დააკვირდით lifecycle events-ს

4. **ოპტიმიზაცია (დამოუკიდებელი სავარჯიშო):**
   - შეცვალეთ ProductCard → `React.memo(ProductCard)`
   - გამოიყენეთ `useCallback` handleAddToCart-ისთვის
   - გამოიყენეთ `useMemo` filteredProducts-ისთვის
   - შეადარეთ რენდერების რაოდენობა before/after

## ლიცენზია

სასწავლო მიზნებისთვის — Web Optimization კურსი
