# Memory Leaks და Error Boundaries — ეტაპობრივი გაიდი

Memory leak-ები აპლიკაციის „ჩუმი მკვლელები" არიან — ისინი თანდათანობით ჭამენ მეხსიერებას, აპლიკაცია ნელდება და საბოლოოდ ბრაუზერის tab-ი „იყინება". Error Boundary-ები კი React-ის დამცავი ფარია — ერთი კომპონენტის crash-ი მთელ აპლიკაციას აღარ „აჩერებს".

ამ პრაქტიკაში თქვენ საკუთარი თვალით დაინახავთ, როგორ ჩნდება memory leak-ები, როგორ აღმოვაჩინოთ ისინი DevTools-ით და როგორ დაგვიცვას Error Boundary-მ crash-ისგან.

პროექტი მდებარეობს `demo-memory-leaks/` ფოლდერში.

**პროექტი არის სრული Vite + React აპლიკაცია** შემდეგი სტრუქტურით:
- **`src/App.jsx`** — მთავარი კომპონენტი
- **`src/components/LeakyComponent.jsx`** — კომპონენტი სამი სახის memory leak-ით
- **`src/components/LeakCounter.jsx`** — ლიკების მთვლელი პანელი
- **`src/components/ErrorBoundary.jsx`** — Error Boundary class კომპონენტი
- **`src/components/CrashableComponent.jsx`** — კომპონენტი რომელიც შეგნებულად "ვარდება"
- **`src/components/SafeComponent.jsx`** — მუშა კომპონენტი Error Boundary-ის ტესტისთვის

---

## წინაპირობა: პროექტის გაშვება

```bash
cd ~/Desktop/Web-optimization/კვირა-4/ლექცია-3-memory-leaks-და-error-boundaries/demo-memory-leaks
npm install
npm run dev
```

გახსენით ბრაუზერში: `http://localhost:5173`

> **რატომ Vite?** Vite უზრუნველყოფს სწრაფ დეველოპმენტ გარემოს და რეალურ პროექტის სტრუქტურას. კომპონენტები დაყოფილია ცალკეულ ფაილებად, რაც აადვილებს memory leak-ების იზოლირებულ შესწავლას.

---

## ეტაპი 1: Performance Monitor-ის გახსნა

### 1.1 Performance Monitor

1. გახსენით DevTools: **Cmd+Option+I** (Mac) ან **Ctrl+Shift+I** (Windows/Linux)
2. დააჭირეთ **Cmd+Shift+P** (Mac) ან **Ctrl+Shift+P** (Windows/Linux) — გაიხსნება Command Menu
3. აკრიფეთ **"Performance Monitor"** და აირჩიეთ **"Show Performance Monitor"**

ეკრანის ქვემოთ გამოჩნდება real-time გრაფიკი. ყურადღება მიაქციეთ ამ მეტრიკებს:

- **JS Event Listeners** — რამდენი event listener არის რეგისტრირებული
- **JS Heap Size** — JavaScript-ის მიერ გამოყენებული მეხსიერება
- **DOM Nodes** — DOM ელემენტების რაოდენობა

### 1.2 საწყისი მნიშვნელობების ჩაწერა

ჩაიწერეთ ან დაიმახსოვრეთ:
- **JS Event Listeners:** რამდენია ახლა? (მაგ. 15-20)
- **JS Heap Size:** რა ზომისაა? (მაგ. 5-8 MB)

ეს საწყისი მნიშვნელობებია — მალე დავინახავთ, როგორ იზრდება.

---

## ეტაპი 2: Event Listener Memory Leak

### 2.1 "Resize Listener-ის დამატება" — 5-ჯერ დაჭერა

გვერდზე იპოვეთ **"Leak #1: Event Listener"** ბლოკი და დააჭირეთ ღილაკს **"Resize Listener-ის დამატება"** — 5-ჯერ ზედიზედ.

**რას ხედავთ:**
- Console-ში 5 შეტყობინება: `+ Resize listener #1 დაემატა`, `#2`, `#3`...
- **Performance Monitor-ში** JS Event Listeners-ის რიცხვი გაიზარდა 5-ით
- **Leak Counter** პანელში Resize Listeners = 5

### 2.2 ფანჯრის ზომის შეცვლა

ახლა შეცვალეთ ბრაუზერის ფანჯრის ზომა — გადაათრიეთ კიდე.

**Console-ში გამოჩნდება:**
```
Resize detected! (Listener #1)
Resize detected! (Listener #2)
Resize detected! (Listener #3)
Resize detected! (Listener #4)
Resize detected! (Listener #5)
```

ყოველი resize-ზე 5 ცალკეული listener რეაგირებს! ეს არის ზედმეტი მუშაობა.

### 2.3 პრობლემის ახსნა

> **რა ხდება:** ყოველი ღილაკის დაჭერისას `window.addEventListener('resize', handler)` ამატებს **ახალ** ფუნქციას, მაგრამ ძველი არასოდეს იშლება. ბრაუზერი ყველა მათგანს ინახავს მეხსიერებაში და ყოველ resize-ზე ყველას ეძახის.
>
> რეალურ აპლიკაციაში, თუ კომპონენტი 100-ჯერ mount/unmount-დება (მაგ. tab-ების გადართვა), 100 listener დაგროვდება!

### 2.4 გამოსწორების გზა

სწორი მიდგომა — `useEffect`-ში დაამატეთ და cleanup ფუნქციაში წაშალეთ:

```javascript
useEffect(() => {
  const handler = () => console.log('Resize detected!');
  window.addEventListener('resize', handler);

  // cleanup — კომპონენტის unmount-ზე ავტომატურად ეშვება
  return () => {
    window.removeEventListener('resize', handler);
  };
}, []); // ცარიელი dependency array = მხოლოდ mount/unmount-ზე
```

> **წესი:** ყოველი `addEventListener`-ისთვის უნდა არსებობდეს შესაბამისი `removeEventListener` cleanup ფუნქციაში.

---

## ეტაპი 3: Interval Memory Leak

### 3.1 "Counter-ის დაწყება" — რამდენიმეჯერ დაჭერა

იპოვეთ **"Leak #2: setInterval"** ბლოკი. დააჭირეთ ღილაკს **"Counter-ის დაწყება"** — 3-ჯერ ზედიზედ.

**რას ხედავთ:**
- Counter-ი არანორმალურად სწრაფად იზრდება — 3 interval ერთდროულად ამატებს
- Leak Counter პანელში Active Intervals = 3

### 3.2 Mount/Unmount ტესტი

ახლა დააჭირეთ **"Unmount LeakyComponent"** ღილაკს.

**რა მოხდა:**
- კომპონენტი გაქრა ეკრანიდან
- **მაგრამ!** Console-ში counter-ი კვლავ იზრდება (თუ counter-ის log-ი ჩართულია)
- Performance Monitor-ში interval-ები კვლავ მუშაობს

> **ეს არის leak:** კომპონენტი აღარ არსებობს, მაგრამ მისი interval-ები გაურკვეველ ვადით აგრძელებს მუშაობას, ჭამს CPU-ს და მეხსიერებას.

### 3.3 გამოსწორების გზა

```javascript
useEffect(() => {
  const id = setInterval(() => {
    setCounter(prev => prev + 1);
  }, 500);

  // cleanup — unmount-ზე interval წყდება
  return () => {
    clearInterval(id);
  };
}, []); // ეშვება ერთხელ, იწმინდება unmount-ზე
```

> **წესი:** ყოველი `setInterval`-ისთვის — `clearInterval` cleanup-ში. ყოველი `setTimeout`-ისთვის — `clearTimeout`.

---

## ეტაპი 4: Async Leak after Unmount

### 4.1 "Fetch Data" → სწრაფად Unmount

1. დარწმუნდით, რომ LeakyComponent mount-ია (ეკრანზე ჩანს)
2. დააჭირეთ **"Fetch Data"** ღილაკს — სტატუსი შეიცვლება "იტვირთება..."-ზე
3. **სწრაფად** (3 წამში) დააჭირეთ **"Unmount LeakyComponent"** ღილაკს

### 4.2 რა მოხდა?

3 წამის შემდეგ Console-ში გამოჩნდება გაფრთხილება:

```
setState unmounted კომპონენტზე! ეს არის memory leak.
```

> **პრობლემა:** `setTimeout` (ან `fetch`) გრძელდება კომპონენტის unmount-ის შემდეგაც. როცა callback ეცდება `setState`-ის გამოძახებას, კომპონენტი უკვე აღარ არსებობს. React 18-ში ეს warning-ს აღარ აგენერირებს, მაგრამ leak-ი მაინც არსებობს — ფუნქცია და მისი closure მეხსიერებაში რჩება.

### 4.3 გამოსწორების გზა — AbortController

```javascript
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(data => {
      // მხოლოდ მაშინ, თუ კომპონენტი ჯერ კიდევ mount-ია
      setData(data);
    })
    .catch(err => {
      if (err.name !== 'AbortError') {
        console.error(err);
      }
    });

  // cleanup — fetch-ი წყდება unmount-ზე
  return () => {
    controller.abort();
  };
}, []);
```

> **წესი:** Async ოპერაციებისთვის გამოიყენეთ `AbortController` — unmount-ზე `controller.abort()` წყვეტს მიმდინარე request-ს.

---

## ეტაპი 5: Heap Snapshot-ით ანალიზი

### 5.1 Snapshot 1 — საწყისი მდგომარეობა

1. პირველ რიგში, დააჭირეთ **"Reset All Leaks"** ღილაკს — გაასუფთავეთ ყველა არსებული leak-ი
2. DevTools-ში გადაერთეთ **Memory** tab-ზე
3. აირჩიეთ **"Heap snapshot"** და დააჭირეთ **"Take snapshot"**
4. ჩაიწერეთ **Total Size** — ეს საწყისი მდგომარეობაა

### 5.2 Leak-ების შექმნა

ახლა შეგნებულად შექმენით leak-ები:
1. "Resize Listener-ის დამატება" — 10-ჯერ
2. "Counter-ის დაწყება" — 5-ჯერ
3. Unmount → Mount → Unmount — რამდენიმეჯერ
4. "Fetch Data" → Unmount — 3-ჯერ

### 5.3 Snapshot 2 — შედარება

1. ახალი Heap snapshot გადაიღეთ
2. ზემოთ აირჩიეთ **"Comparison"** ხედი
3. შეადარეთ ორი snapshot-ი

**რას ეძებთ:**
- **#New** სვეტი — ახლად შექმნილი ობიექტები
- **#Deleted** სვეტი — წაშლილი ობიექტები
- **Size Delta** — მეხსიერების ცვლილება

> **დასკვნა:** თუ #New > #Deleted, მეხსიერება იზრდება. ეს არის leak-ის ნიშანი.

---

## ეტაპი 6: Error Boundary

### 6.1 "Crash!" ღილაკზე დაჭერა

გადაახვიეთ ქვემოთ **"Error Boundaries"** სექციაზე. იპოვეთ **CrashableComponent** და დააჭირეთ **"Crash!"** ღილაკს.

**რა მოხდა:**
- CrashableComponent-ი „ჩავარდა" — render-ის დროს `throw new Error(...)` გაისროლა
- ErrorBoundary-მ დაიჭირა შეცდომა

### 6.2 Fallback UI

CrashableComponent-ის ნაცვლად ეკრანზე გამოჩნდა:
- წითელი ბარათი **"რაღაც შეცდომა მოხდა!"** შეტყობინებით
- შეცდომის დეტალები (Error message)
- Component Stack — სად მოხდა შეცდომა
- **"ხელახლა ცდა"** ღილაკი

Console-ში ასევე დაილოგა: `ErrorBoundary დაიჭირა:` შეცდომის სრული ინფორმაციით.

### 6.3 SafeComponent-ი „ცოცხალია"!

**ყურადღება მიაქციეთ:** მარჯვენა ბარათზე **SafeComponent** კვლავ ნორმალურად მუშაობს! +1 / -1 ღილაკები ფუნქციონირებს.

> **ეს არის Error Boundary-ის მთავარი დანიშნულება:** ერთი კომპონენტის crash-ი არ „მოკლავს" მთელ აპლიკაციას. ყოველი სექცია დამოუკიდებლად „გადარჩება".

### 6.4 "ხელახლა ცდა"

დააჭირეთ **"ხელახლა ცდა"** ღილაკს.

**რა მოხდა:**
- ErrorBoundary-მ reset-ი გააკეთა (`hasError: false`)
- CrashableComponent ხელახლა დარენდერდა — ნორმალურ მდგომარეობაში

> **როგორ მუშაობს:** "ხელახლა ცდა" ღილაკი ცვლის ErrorBoundary-ის state-ს (`hasError: false`). ეს იწვევს re-render-ს, და რადგან `shouldCrash` state-იც თავიდან იქმნება (`false`), კომპონენტი ნორმალურად რენდერდება.

---

## ეტაპი 7: Error Boundary-ის შეზღუდვები

### 7.1 რა ვერ იჭერს Error Boundary?

Error Boundary ყველა შეცდომას ვერ იჭერს. მხოლოდ **render-ის დროს** (და lifecycle methods-ში) მომხდარ შეცდომებს იჭერს.

- **Render-ის შეცდომა** — Error Boundary იჭერს — ალტერნატივა: --
- **Event handler-ის შეცდომა** — ვერ იჭერს — ალტერნატივა: `try/catch` handler-ის შიგნით
- **Async კოდი (`setTimeout`, `fetch`)** — ვერ იჭერს — ალტერნატივა: `try/catch`, `.catch()`
- **Error Boundary-ის საკუთარი შეცდომა** — ვერ იჭერს — ალტერნატივა: მშობელი (parent) Error Boundary
- **Server-side rendering (SSR)** — ვერ იჭერს — ალტერნატივა: სერვერის error handling

### 7.2 რატომ class component?

Error Boundary აუცილებლად **class component** უნდა იყოს, რადგან:

- `getDerivedStateFromError` და `componentDidCatch` — ეს ორი lifecycle method მხოლოდ class component-ებს აქვს
- React-ის ჯგუფი ჯერ არ შეუქმნია hooks-ის ეკვივალენტი Error Boundary-სთვის
- პრაქტიკაში, ეს ერთ-ერთი იშვიათი შემთხვევაა, სადაც class component-ი კვლავ საჭიროა

> **რჩევა:** რეალურ პროექტებში გამოიყენეთ `react-error-boundary` ბიბლიოთეკა — ის გაძლევთ hooks-ზე დაფუძნებულ API-ს (`useErrorBoundary`) და დამატებით ფუნქციონალს.

---

## შეჯამება

### Memory Leak-ების პრევენცია

- **Event Listeners** — პრობლემა: `addEventListener` cleanup-ის გარეშე — პრევენცია: `useEffect` cleanup: `removeEventListener`
- **Intervals / Timeouts** — პრობლემა: `setInterval` / `setTimeout` cleanup-ის გარეშე — პრევენცია: `useEffect` cleanup: `clearInterval` / `clearTimeout`
- **Async Operations** — პრობლემა: `fetch` / `setTimeout` unmount-ის შემდეგ — პრევენცია: `AbortController` + cleanup ფუნქცია
- **DOM References** — პრობლემა: შენახული DOM reference-ები — პრევენცია: `useRef` + cleanup-ში `null`-ზე დაყენება

### Error Boundaries

- **`getDerivedStateFromError`** — შეცდომის state-ში ჩაწერა → Fallback UI-ს ჩართვა
- **`componentDidCatch`** — შეცდომის ლოგირება (Sentry, LogRocket, და სხვ.)
- **Nested Boundaries** — სხვადასხვა სექციის იზოლაცია — ერთის crash-ი მეორეს არ ეხება
- **Retry (ხელახლა ცდა)** — `hasError: false` state reset-ით კომპონენტის ხელახალი რენდერი

### useEffect cleanup — ოქროს წესი

```javascript
useEffect(() => {
  // Setup: რესურსის შექმნა
  const id = setInterval(...);
  window.addEventListener('resize', handler);
  const controller = new AbortController();

  // Cleanup: რესურსის გაწმენდა
  return () => {
    clearInterval(id);
    window.removeEventListener('resize', handler);
    controller.abort();
  };
}, [dependencies]);
```

> **დაიმახსოვრეთ:** `useEffect`-ის cleanup ფუნქცია ეშვება:
> 1. კომპონენტის **unmount**-ზე
> 2. dependency-ების **ცვლილებისას** (ახალი effect-ის გაშვებამდე)
>
> ყოველთვის დააბრუნეთ cleanup ფუნქცია, თუ effect-ში რაიმე „გარე რესურსს" იყენებთ!

### მთავარი დასკვნები

1. **Memory leak-ები „ჩუმი მკვლელები" არიან** — აპლიკაცია ნელდება თანდათან, მაგრამ მომხმარებელი ვერ ხვდება მიზეზს
2. **useEffect-ის cleanup function** — ყოველთვის დააბრუნეთ, თუ addEventListener, setInterval, fetch ან სხვა „გარე" რესურსს იყენებთ
3. **Performance Monitor** — real-time მეთვალყურეობა JS Event Listeners-ის და Heap Size-ის
4. **Heap Snapshots** — leak-ების აღმოჩენა „წინა-შემდეგ" შედარებით
5. **Error Boundaries** — აპლიკაციის ნაწილობრივი crash-ისგან დაცვა, fallback UI-ს ჩვენება
6. **Nested Error Boundaries** — თითოეული სექცია დამოუკიდებლად „გადარჩება"
7. **Error Boundary მხოლოდ render-ის შეცდომებს იჭერს** — event handler-ებისა და async კოდისთვის `try/catch` გამოიყენეთ
