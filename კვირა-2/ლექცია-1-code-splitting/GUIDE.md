# Code Splitting — ეტაპობრივი გაიდი

ეს გაიდი გაჩვენებთ, როგორ მივხვდეთ რომ Code Splitting გვჭირდება და როგორ გავაკეთოთ — ნაბიჯ-ნაბიჯ.

ჩვენ გვაქვს **ორი იდენტური პროექტი**, რომლებიც ერთნაირად მუშაობს:
- `demo-without-splitting/` — ყველაფერი ერთ bundle-ში
- `demo-with-splitting/` — Code Splitting-ით

---

## წინაპირობა: პროექტების გაშვება

```bash
# ჯერ ორივე პროექტში dependencies დააინსტალირეთ
cd ~/Desktop/Web-optimization/კვირა-2/ლექცია-1-code-splitting/demo-without-splitting && npm install
cd ~/Desktop/Web-optimization/კვირა-2/ლექცია-1-code-splitting/demo-with-splitting && npm install
```

---

## ეტაპი 1: პრობლემის აღმოჩენა (წინა მასალა)

Code Splitting-ზე გადასვლამდე ჯერ უნდა **დავადასტუროთ**, რომ პრობლემა ნამდვილად არსებობს. ამისთვის ვიყენებთ იმ ინსტრუმენტებს, რომლებიც კვირა 1-ში ვისწავლეთ.

### 1.1 Build-ის ანალიზი

გაუშვით build **splitting-ის გარეშე** პროექტში:

```bash
cd ~/Desktop/Web-optimization/კვირა-2/ლექცია-1-code-splitting/demo-without-splitting
npm run build
```

ნახავთ:
```
dist/assets/index-XXXXX.js   184.37 kB │ gzip: 59.94 kB
```

**ერთი დიდი JS ფაილი** — მთელი აპლიკაციის კოდი ერთ ფაილშია. მომხმარებელი Home გვერდზე რომ შემოვა, Dashboard-ის, Settings-ის და About-ის კოდსაც ჩამოტვირთავს, მიუხედავად იმისა რომ ის გვერდები არ სჭირდება.

### 1.2 Coverage Tab-ით ანალიზი (კვირა 1, ლექცია 4)

1. გაუშვით `npm run dev` (without-splitting პროექტში)
2. გახსენით ბრაუზერში: `http://localhost:5173`
3. DevTools-ში: **Cmd+Shift+P** → **"Coverage"** → **"Start instrumenting coverage and reload page"**
4. დარჩით **Home** გვერდზე (არ გადახვიდეთ სხვა გვერდზე)
5. ნახეთ Coverage შედეგი:

რას დაინახავთ:
- **JS ფაილის 60-70% წითელია** (გამოუყენებელი!)
- ეს გამოუყენებელი კოდი Dashboard-ის, Settings-ის, About-ის კომპონენტებია
- HeavyChart-ის და DataTable-ის მთელი კოდიც ჩატვირთულია, თუმცა Home-ზე არ ჩანს

**დასკვნა:** Home გვერდზე მომხმარებელი ტვირთავს კოდს, რომელიც მას არ სჭირდება.

### 1.3 Lighthouse (კვირა 1, ლექცია 2)

1. გაუშვით Lighthouse **Mobile** რეჟიმში
2. **Opportunities** სექციაში მოძებნეთ:
   - "Remove unused JavaScript" — ეს პირდაპირ გვეუბნება, რომ JS კოდის დიდი ნაწილი ზედმეტია
   - "Reduce JavaScript execution time" — ერთი დიდი bundle-ის parsing და execution მეტ დროს მოითხოვს

### 1.4 Performance Tab (კვირა 1, ლექცია 4)

1. Performance Tab → Record → გადატვირთეთ გვერდი → შეაჩერეთ
2. Main Thread-ზე მოძებნეთ **"Evaluate Script"** task
3. ერთი დიდი bundle-ის შემთხვევაში ერთი გრძელი "Evaluate Script" ბლოკი იქნება

**ყველა ინსტრუმენტი ერთსა და იმავე პრობლემას აჩვენებს:** ზედმეტი JavaScript ჩაიტვირთება პირველივე გვერდზე.

---

## ეტაპი 2: გადაწყვეტილების მიღება — გვჭირდება თუ არა Code Splitting?

### გვჭირდება, თუ:

- **Coverage-ში JS-ის 40%+ გამოუყენებელია** — როგორ ვამოწმებთ: Coverage Tab
- **Bundle ზომა 200KB+ (gzip-მდე)** — როგორ ვამოწმებთ: `npm run build`
- **აპლიკაციას 3+ გვერდი/route აქვს** — როგორ ვამოწმებთ: კოდის სტრუქტურა
- **მძიმე კომპონენტები მხოლოდ ზოგ გვერდზეა საჭირო** — როგორ ვამოწმებთ: Coverage Tab / კოდის ანალიზი
- **Lighthouse ამბობს "Remove unused JavaScript"** — როგორ ვამოწმებთ: Lighthouse Opportunities

### არ გვჭირდება, თუ:

- Bundle ზომა პატარაა (< 100KB gzip)
- ერთგვერდიანი აპლიკაციაა (landing page)
- ყველა კომპონენტი ყველა გვერდზე გამოიყენება

**ჩვენს შემთხვევაში:** bundle არის 184KB (59KB gzip), 4 გვერდია, Coverage-ში 60%+ გამოუყენებელია Home-ზე. **გვჭირდება Code Splitting!**

---

## ეტაპი 3: Route-based Code Splitting

ყველაზე ბუნებრივი და ეფექტური ვარიანტი — **თითოეული გვერდი ცალკე chunk-ად გამოვყოთ**.

### რა იცვლება?

შეადარეთ ორი App.jsx ფაილი:

**without-splitting/src/App.jsx** — ჩვეულებრივი import:
```jsx
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import About from "./pages/About";
```
ეს import-ები build-ისას ყველა კოდს ერთ ფაილში ჩაამატებს.

**with-splitting/src/App.jsx** — React.lazy + Suspense:
```jsx
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));
const About = lazy(() => import("./pages/About"));

// Suspense აუცილებელია — lazy კომპონენტი ასინქრონულად იტვირთება,
// და სანამ ჩაიტვირთება, Suspense-ის fallback ჩანს
<Suspense fallback={<div>Loading...</div>}>
  <Routes>...</Routes>
</Suspense>
```

### 3 ნაბიჯი:

1. `import` ჩაანაცვლეთ `lazy(() => import(...))`-ით
2. დაამატეთ `<Suspense>` wrapper `fallback`-ით
3. სხვა არაფერი იცვლება — კომპონენტები, props, ლოგიკა — ყველაფერი იგივეა

---

## ეტაპი 4: Component-based Code Splitting

Route-based splitting-ის გარდა, შეგვიძლია **ცალკეული მძიმე კომპონენტების** გამოყოფაც.

### მაგალითი: HeavyChart

ჩვენი HeavyChart კომპონენტი "მძიმეა" — ბევრი მონაცემი და DOM ელემენტი. Dashboard-ზეც კი მხოლოდ ღილაკზე click-ით ჩანს.

**without-splitting/src/pages/Dashboard.jsx:**
```jsx
import HeavyChart from "../components/HeavyChart";

// HeavyChart-ის კოდი ყოველთვის ჩატვირთულია, მაშინაც კი
// თუ მომხმარებელი Chart-ს არასდროს ნახავს
{showChart && <HeavyChart />}
```

**with-splitting/src/pages/Dashboard.jsx:**
```jsx
const HeavyChart = lazy(() => import("../components/HeavyChart"));

// HeavyChart-ის კოდი მხოლოდ ღილაკზე click-ისას ჩაიტვირთება
{showChart && (
  <Suspense fallback={<div>Chart is loading...</div>}>
    <HeavyChart />
  </Suspense>
)}
```

### Dynamic Import ფუნქციებისთვის (არა კომპონენტი):

```jsx
// ❌ ჩვეულებრივი import — generateReport ყოველთვის bundle-შია
import { generateReport } from "../utils/heavyUtils";
onClick={() => setReport(generateReport())}

// ✅ Dynamic import — მხოლოდ ღილაკზე click-ისას ჩაიტვირთება
const handleGenerateReport = async () => {
  const { generateReport } = await import("../utils/heavyUtils");
  setReport(generateReport());
};
```

---

## ეტაპი 5: შედეგების შედარება

### 5.1 Build Output

```bash
cd ~/Desktop/Web-optimization/კვირა-2/ლექცია-1-code-splitting/demo-with-splitting
npm run build
```

ნახავთ:
```
dist/assets/Home-XXXXX.js          1.01 kB   (ცალკე chunk)
dist/assets/About-XXXXX.js         1.09 kB   (ცალკე chunk)
dist/assets/Settings-XXXXX.js      3.22 kB   (ცალკე chunk)
dist/assets/HeavyChart-XXXXX.js    3.34 kB   (ცალკე chunk)
dist/assets/Dashboard-XXXXX.js     4.71 kB   (ცალკე chunk)
dist/assets/heavyUtils-XXXXX.js    6.48 kB   (ცალკე chunk)
dist/assets/index-XXXXX.js       167.71 kB   (მთავარი — React + Router)
```

### 5.2 შედარების ცხრილი

**JS ფაილების რაოდენობა**
- Without Splitting: 1
- With Splitting: 7

**Home-ზე ჩასატვირთი JS**
- Without Splitting: 184 KB
- With Splitting: 168 KB (მთავარი + Home chunk)

**Dashboard-ის კოდი Home-ზე**
- Without Splitting: ჩატვირთულია
- With Splitting: არ არის ჩატვირთული

**HeavyChart Dashboard-ზე**
- Without Splitting: ყოველთვის ჩატვირთული
- With Splitting: მხოლოდ ღილაკზე click-ით

### 5.3 Coverage Tab-ით შედარება

1. გაუშვით `demo-with-splitting`: `npm run dev`
2. Coverage Tab → Home გვერდზე
3. შეადარეთ — გამოუყენებელი JS-ის პროცენტი **მნიშვნელოვნად ნაკლებია**

### 5.4 Network Tab-ში დაკვირვება

1. DevTools → Network Tab → "JS" ფილტრი
2. Home გვერდზე — მხოლოდ `index-XXXXX.js` და `Home-XXXXX.js` ჩაიტვირთება
3. Dashboard-ზე გადასვლისას — ნახავთ **ახალ request-ს**: `Dashboard-XXXXX.js` ჩაიტვირთება
4. "Show Chart" ღილაკზე — კიდევ ერთი request: `HeavyChart-XXXXX.js`

---

## შეჯამება

```
პრობლემის აღმოჩენა          გადაწყვეტა              შემოწმება
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│  Coverage Tab    │    │  Route-based:    │    │  npm run build   │
│  Lighthouse      │───→│  React.lazy()    │───→│  Coverage Tab    │
│  Build ზომა      │    │  Component-based:│    │  Network Tab     │
│  Performance Tab │    │  lazy + Suspense │    │  Lighthouse      │
└──────────────────┘    └──────────────────┘    └──────────────────┘
```

### მთავარი წესი:

**Code Splitting არ არის ოპტიმიზაცია, რომელიც ყოველთვის სჭირდება.** ჯერ გაზომეთ (Coverage, Lighthouse, Build), და მხოლოდ მაშინ გააკეთეთ, როცა მონაცემები პრობლემას აჩვენებს.
