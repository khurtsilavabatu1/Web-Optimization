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
2. **დააკლიკეთ DevTools-ის პანელზე** (მაგ. Elements ან Console tab-ის სათაურზე) — Command Menu-ს shortcut მხოლოდ მაშინ მუშაობს, როცა DevTools არის ფოკუსში და არა გვერდი ან რედაქტორი
3. დააჭირეთ **Cmd+Shift+P** (Mac) ან **Ctrl+Shift+P** (Windows/Linux) — გაიხსნება Command Menu
4. აკრიფეთ **"Performance Monitor"** და აირჩიეთ **"Show Performance Monitor"**

> **თუ Cmd+Shift+P არ მუშაობს:** გამოიყენეთ ალტერნატიული (უფრო საიმედო) გზა — DevTools-ში ზედა მარჯვნივ **⋮ (three dots) → More tools → Performance monitor**. შედეგი იდენტურია.
>
> ხშირი მიზეზი: shortcut-ს „იტაცებს" სხვა აპლიკაცია — მაგალითად VS Code-ში Cmd+Shift+P საკუთარ Command Palette-ს ხსნის. ამიტომაც არის მნიშვნელოვანი, ბრაუზერის DevTools იყოს ფოკუსში.

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

### 2.1 "დაამატე Listener" — 5-ჯერ დაჭერა

გვერდზე იპოვეთ **"2. Event Listener Leak"** ბარათი და დააჭირეთ ღილაკს **"დაამატე Listener"** — 5-ჯერ ზედიზედ.

**რას ხედავთ:**
- Console-ში 5 შეტყობინება: `+ Resize listener #1 დაემატა (cleanup არ აქვს!)`, `#2`, `#3`...
- ბარათზე **Listeners: 5** და **~Memory: 75 KB**
- ზედა **Total Leaks** ბეჯი გაიზარდა 5-ით
- **Performance Monitor-ში** JS Event Listeners-ის რიცხვი აიწია

> **ყურადღება: Performance Monitor-ის ციფრი ზუსტად 5-ით არ გაიზრდება.** JS Event Listeners ითვლის გვერდის **ყველა** listener-ს — React-ის root-ის delegated listener-ებს, Vite-ის HMR კლიენტს, React DevTools-ს და ბრაუზერის გაფართოებებს. ამიტომ აბსოლუტური რიცხვი „ხმაურიანია".
>
> მნიშვნელოვანია **ტენდენცია**: რიცხვი იზრდება და თავისით უკან **აღარ ბრუნდება** — სწორედ ეს არის leak-ის ნიშანი.
>
> ზუსტი რიცხვის სანახავად აკრიფეთ Console-ში:
> ```js
> getEventListeners(window).resize.length   // → 5
> ```
> (`getEventListeners` არის Chrome DevTools Console-ის ფუნქცია — მუშაობს მხოლოდ DevTools-ის Console-ში.)

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

### 6.5 ეტაპობრივად: რა ხდება Crash!-იდან fallback-მდე

`ErrorBoundary.jsx`-ში ლოგები სპეციალურად დამატებულია, რომ Console-ში მთელი თანმიმდევრობა თვალით დაინახოთ. გახსენით Console, დააჭირეთ **Crash!**-ს და გაჰყევით ნაბიჯებს.

#### სანამ დააჭერთ

გვერდის ჩატვირთვისთანავე Console-ში უკვე წერია:

```
[EB:CrashableBoundary] 0. constructor — boundary იქმნება
[EB:CrashableBoundary] 1. render → children (გამჭვირვალე რეჟიმი)
```

`hasError: false`, ამიტომ `render()` ბოლო ხაზამდე ჩამოდის და აბრუნებს `this.props.children`. ეკრანზე `CrashableComponent`-ია, boundary-ის კვალი არსად — **ის ახლა უხილავია**.

> ნორმალურ დროს ErrorBoundary **სრულიად გამჭვირვალეა**: არანაირ DOM-ს არ ამატებს, არაფერს არ ახვევს — უბრალოდ ატარებს შვილს გამავლად. ის „მძინარე დარაჯია".

#### 1. დაჭერა — შეცდომა ჯერ არ ხდება

```jsx
onClick={() => this.setState({ shouldCrash: true })}
```

Console-ში **ახალი ლოგი არ ჩნდება**. handler წარმატებით სრულდება — მან მხოლოდ `shouldCrash` შეცვალა `true`-ზე და React-ს გადარენდერების მოთხოვნა დაუტოვა.

> **აქ ხალხი ყველაზე ხშირად ცდება:** ჰგონია ღილაკმა „აგდო" შეცდომა. არა — ღილაკმა მხოლოდ **პირობა შეცვალა**. დაჭერასა და შეცდომას შორის React-ის მთელი ციკლი დგას.

#### 2. React იძახებს `render()`-ს — და აქ ხდება `throw`

React გადარენდერებას იწყებს, ჩამოდის ხეში `CrashableComponent`-მდე და **თვითონ იძახებს** `render()`-ს:

```jsx
render() {
  if (this.state.shouldCrash) {
    throw new Error('CrashableComponent შეცდომა: ...');   // ← აქ!
  }
```

`throw` ზევით ადის call stack-ით, მაგრამ **ბრაუზერამდე ვერ აღწევს** — ამ გამოძახებას React-მა საკუთარ `try/catch`-ში გაუშვა. სწორედ ამიტომ იჭერს Error Boundary მხოლოდ render ფაზას: მხოლოდ აქ დგას React თქვენს კოდსა და ბრაუზერს შორის.

#### 3. React ეძებს უახლოეს boundary-ს

ჩავარდნილი კომპონენტიდან React **ზევით მიდის** ხეში და ეძებს უახლოეს წინაპარს, რომელსაც აქვს `getDerivedStateFromError` **ან** `componentDidCatch`:

```
App
└── ErrorBoundary          ← ✅ იპოვა, ძებნა ჩერდება
    └── CrashableComponent ← ჩავარდა
```

თუ ვერავის იპოვა → შეცდომა root-ამდე ადის, React მთელ ხეს unmount-ს უკეთებს, ეკრანი თეთრი რჩება.

#### 4. `getDerivedStateFromError` — *რა ვაჩვენოთ*

```
[EB] 2. getDerivedStateFromError — RENDER ფაზა
   შეცდომა დაიჭირა: CrashableComponent შეცდომა: ...
   ვაბრუნებ: { hasError: true, error } — errorInfo ჯერ არ არის!
```

```jsx
static getDerivedStateFromError(error) {
  return { hasError: true, error };
}
```

React ამას იძახებს **ჯერ კიდევ render ფაზაში**. აქედან ორი წესი:

- **რატომ `static`?** `this` არ სჭირდება და არც უნდა ჰქონდეს — React-ს fallback-ის state ინსტანციის შეხების გარეშე უნდა გამოთვალოს.
- **რატომ უნდა იყოს სუფთა (pure)?** render ფაზა React-ს შეიძლება შეაწყვეტინოს ან თავიდან გაუშვას (Concurrent React). ამიტომ აქ `console.log`-ის მეტი არაფერი — არც `fetch`, არც `setState`. მხოლოდ `return`.

#### 5. Boundary-ის `render()` — fallback, მაგრამ stack-ის გარეშე

```
[EB:CrashableBoundary] 3. render → FALLBACK
   errorInfo: null → stack ჯერ არ ჩანს
```

`hasError` უკვე `true`-ია, ამიტომ `render()` პირველ `if`-ში შედის და `children`-ის ნაცვლად fallback JSX-ს აბრუნებს.

**მნიშვნელოვანი დეტალი:** `errorInfo` ჯერ `null`-ია — `getDerivedStateFromError`-მა მხოლოდ `hasError` და `error` დააყენა. ამიტომ `<pre>` ბლოკი component stack-ით ამ გავლაზე **არ ირენდერდება**.

#### 6. Commit — ეკრანი იცვლება

React ერთ პაკეტად:
1. **შლის** `CrashableComponent`-ის DOM-ს და მთელ მის subtree-ს
2. უშვებს მათ cleanup-ებს (`useEffect`-ის return, `componentWillUnmount`)
3. ჩასვამს fallback-ის DOM-ს

ახლა ეკრანზე წითელი ბარათია. **`shouldCrash: true` აღარ არსებობს** — კომპონენტთან ერთად განადგურდა. ეს ნაბიჯი 9-ისთვის კრიტიკულია.

#### 7. `componentDidCatch` — *რა დავალოგოთ*

```
[EB:CrashableBoundary] 4. componentDidCatch — COMMIT-ის მერე
   ჩავარდნილი subtree უკვე მოშლილია, fallback ეკრანზეა
   ახლა setState({ errorInfo }) → გამოიწვევს მეორე რენდერს

 ErrorBoundary დაიჭირა:
  Error: CrashableComponent შეცდომა: ...
  Component Stack: at CrashableComponent / at ErrorBoundary / at App
```

commit-ის მერეა, ამიტომ side effect-ები **ნებადართულია** — აქ იწერება `console.error`, აქ იგზავნებოდა Sentry-ში.

`errorInfo.componentStack` არ არის JavaScript-ის stack trace — ეს **კომპონენტების ხის გზაა**:

```
error.stack              → CrashableComponent.render (CrashButton.jsx:12)   [JS ქმნის]
errorInfo.componentStack → at CrashableComponent / at ErrorBoundary / at App  [React ქმნის]
```

`error.stack` გეუბნება *რომელ ხაზზე* გატყდა, `componentStack` — *რომელ კომპონენტში*. Debugging-ში მეორე უფრო გვჭირდება.

#### 8. მეორე რენდერი — ახლა stack-ითაც

```
[EB:CrashableBoundary] 3. render → FALLBACK
   errorInfo: არის → component stack ჩანს
```

`setState({ errorInfo })`-მა ახალი რენდერი გამოიწვია, `errorInfo` აღარ არის `null` → `<pre>` ბლოკი ჩნდება და ეკრანზე component stack გამოჩნდა.

> **ამიტომაა ორი ცალკე მეთოდი:** ერთი წყვეტს *რა ვაჩვენოთ* (სუფთა, render ფაზა), მეორე *რა დავალოგოთ* (side effect, commit ფაზა).

#### 9. „ხელახლა ცდა"

```
[EB:CrashableBoundary] 5. handleRetry — hasError: false
   შვილი ხელახლა mount-დება, ახალი constructor-ით
[EB:CrashableBoundary] 1. render → children (გამჭვირვალე რეჟიმი)
```

`hasError: false` → `render()` ისევ `children`-ს აბრუნებს → React **ახლიდან mount-ს უკეთებს** `CrashableComponent`-ს → ახალი `constructor` → `shouldCrash: false` → მუშაობს.

ყურადღება: ლოგი `1.` დაბრუნდა — boundary ისევ „მძინარე დარაჯის" რეჟიმშია.

> **ხაფანგი, რომელიც აუცილებლად უნდა გაიგოთ:** retry იმიტომ მუშაობს, რომ crash-ის მიზეზი (`shouldCrash`) **წაშლილი შვილის შიგნით ცხოვრობდა**. თუ მიზეზი გარეთაა — მშობლისგან მოსული გატეხილი `props` ან `null` მონაცემი — retry მაშინვე ისევ ჩავარდება და მიიღებთ crash → retry → crash მარყუჟს. რეალურ აპლიკაციაში „retry" ხშირად მონაცემების თავიდან წაკითხვასაც უნდა ნიშნავდეს, არა მხოლოდ `hasError`-ის ჩამოყრას.

---

#### მთელი თანმიმდევრობა ერთად

```
0. constructor                    boundary იქმნება
1. render → children              ნორმალური მუშაობა
   ── Crash! დაჭერა ──            setState, შეცდომა ჯერ არ არის
   ── React იძახებს render()-ს ── throw new Error()  ← აქ ვარდება
2. getDerivedStateFromError       RENDER ფაზა · სუფთა · static
3. render → FALLBACK              errorInfo: null (stack არ ჩანს)
   ── COMMIT ──                   subtree იშლება, fallback ჩნდება
4. componentDidCatch              COMMIT-ის მერე · console.error + setState
3. render → FALLBACK              errorInfo: არის (stack ჩანს)
   ── ხელახლა ცდა ──
5. handleRetry                    hasError: false
1. render → children              შვილი ხელახლა mount-დება
```

**ორი დეტალი, რომელიც ამ სიიდან უნდა გამოიტანოთ:**

1. **`3.` ორჯერ ჩნდება** — და ეს ბაგი არ არის. ეს არის იმის შედეგი, რომ ორი lifecycle მეთოდი განზრახ სხვადასხვა ფაზაშია.
2. **`4.` მოდის `3.`-ის შემდეგ, არა მანამდე** — ლოგირება მაშინ ხდება, როცა fallback უკვე ეკრანზეა. React-ს პრიორიტეტი მომხმარებლის ეკრანია, ლოგირება მეორეა.

> **StrictMode-ის შენიშვნა:** dev რეჟიმში `1.` და `3.` ლოგები შეიძლება გაორმაგდეს — StrictMode render-ს ორჯერ ატარებს. `2.`, `4.` და `5.` ერთხელ ჩნდება, და ლოგების **რიგი არ იცვლება**.

---

## ეტაპი 7: Error Boundary-ის შეზღუდვები

### 7.1 რა ვერ იჭერს Error Boundary?

მთავარი კრიტერიუმი ერთი კითხვაა: **„ამ კოდს React იძახებს თუ სხვა?"** თუ React — დაიჭერს. თუ ბრაუზერი (event dispatch, ტაიმერი, promise) — React call stack-ზე არ არის და ვერაფერს დაიჭერს.

| ✅ იჭერს (React იძახებს) | ❌ არ იჭერს (სხვა იძახებს) |
|---|---|
| კომპონენტის ფუნქციის სხეული / `render()` | `onClick`, `onChange` და სხვა handler-ების სხეული |
| `constructor` | `setTimeout` / `setInterval` callback-ები |
| JSX-ის children-ის გამოთვლა | `.then()` / `async` ფუნქციის სხეული `await`-ის მერე |
| `useEffect` / `useLayoutEffect` სხეული **და cleanup** | თვითონ Error Boundary-ში მომხდარი შეცდომა |
| `useMemo`, `useState`-ის initializer ფუნქცია | `window.addEventListener`-ით მიბმული კოდი |
| `componentDidMount`, `componentDidUpdate` | Server-Side Rendering (SSR) |
| `React.lazy`-ის chunk-ის ჩატვირთვის შეცდომა | `fetch`-ის ქსელური შეცდომა |

`useEffect` ხშირად აკვირვებს ხალხს, მაგრამ დიახ — effect-ს **React იძახებს** commit ფაზაში, ამიტომ იჭერს.

**შეადარეთ ეს ორი ვარიანტი — განსხვავება ერთადერთია, სად ხდება `throw`:**

```jsx
onClick={() => this.setState({ shouldCrash: true })}   // ✅ → render ჩავარდება → boundary იჭერს
onClick={() => { throw new Error('არ დაიჭირება'); }}    // ❌ → window.onerror, boundary ვერ იგებს
```

**async შეცდომა boundary-ს რომ მიაწოდოთ** — ჩააგდეთ state-ში და ააგდეთ render-ში, ანუ ხელოვნურად render ფაზაში გადაიტანეთ:

```jsx
const [error, setError] = useState(null);
if (error) throw error;                    // ← ახლა უკვე render-ია → boundary დაიჭერს

const load = async () => {
  try { await fetchData(); } catch (e) { setError(e); }
};
```

ზუსტად ამას აკეთებს `react-error-boundary`-ის `showBoundary()`.

### 7.2 რატომ class component და არა ფუნქციური?

Error Boundary აუცილებლად **class component** უნდა იყოს. ეს ასეა **React 19-შიც** — hook-ის ეკვივალენტი არ არსებობს და React-ის გუნდი შეგნებულად არ ამატებს. მიზეზი მექანიკურია:

**1. ჩავარდნილი კომპონენტის hook-ებს React ვერ ენდობა.**
როცა render-ის შუაში `throw` მოხდა, კომპონენტმა hook-ების სია **ბოლომდე ვერ გაიარა**. React-ისთვის მისი hook state დაზიანებულია. `useState`/`useEffect` მკაცრ თანმიმდევრობას ეყრდნობა — შეწყვეტილ რენდერზე ეს თანმიმდევრობა ირღვევა. class-ის `this.state` კი ჩვეულებრივი ობიექტია და render-ის შეწყვეტა მას არ აზიანებს.

**2. Boundary-ს ორ სხვადასხვა ფაზაში უნდა ჩართვა.**
`getDerivedStateFromError` **render ფაზაშია** და სუფთა უნდა იყოს; `componentDidCatch` **commit-ის მერეა** და side effect-ები შეიძლება. hook-ებში ეს ორი წერტილი გამოსაყოფი არ არის — hook-ის სხეული ყოველთვის render ფაზაშია, `useEffect` კი მხოლოდ commit-ის მერე.

**3. `static` ნიშნავს „ინსტანციის გარეშე".**
`getDerivedStateFromError`-ს React მაშინ იძახებს, როცა ხის ნაწილი ჩავარდნილია. `static`-ი მას საშუალებას აძლევს fallback-ის state ინსტანციის შეხების გარეშე გამოთვალოს. ფუნქციურ კომპონენტში „static" ცნება არ არსებობს — ყველაფერი გამოძახების შიგნითაა.

**რა დაემატა React 19-ში** (და ეს boundary-ის შემცვლელი არ არის) — root-ის დონის handler-ები, ლოგირებისთვის:

```jsx
createRoot(document.getElementById('root'), {
  onCaughtError:      (error, errorInfo) => {},  // boundary-მ დაიჭირა
  onUncaughtError:    (error, errorInfo) => {},  // ვერავინ დაიჭირა
  onRecoverableError: (error, errorInfo) => {},
});
```

fallback UI-ს ეს არ იძლევა — მხოლოდ Sentry-ს/ანალიტიკას გამოადგება.

> **რჩევა რეალური პროექტისთვის:** `npm i react-error-boundary`. შიგნით ისიც class-ია, უბრალოდ **თქვენ class არ წერთ**. სამაგიეროდ აქვს ის, რაც ხელით ნაწერს არ აქვს: `useErrorBoundary()`-ის `showBoundary(error)`, რომლითაც async კოდის და handler-ის შეცდომას boundary-სთან „მიიტანთ", `resetKeys` და `onReset`.

> **ეს პროექტი React 18.3.1-ზეა**, მაგრამ ამ საკითხში 18-სა და 19-ს შორის სხვაობა არ არის.

---

## ეტაპი 8: ბუნებრივი შეცდომები — როგორ ხდება ეს პრაქტიკაში

დემოში `throw new Error(...)` ხელით დავწერეთ, რომ crash **სამართავი და გამეორებადი** იყოს. რეალურ პროექტში ასეთი `throw` თითქმის არასდროს გვხვდება. სამაგიეროდ ხდება ის, რაც არსობრივად იგივეა:

> **პრაქტიკაში შეცდომას თქვენ არ აგდებთ — მას JavaScript აგდებს, როცა render-ის დროს მონაცემი ისეთი არ არის, როგორსაც ელოდით.**

თითქმის ყველა რეალური crash ერთ წინადადებაში ჯდება: **„მონაცემი, რომელიც ვიგულისხმე რომ არსებობს, არ არსებობს."**

### 8.1 ყველაზე ხშირი რეალური მიზეზები

**1. `undefined`-ზე property-ს წაკითხვა — API-მ ველი არ დააბრუნა**

```jsx
function UserCard({ user }) {
  return <p>{user.profile.name}</p>;   // profile === undefined → TypeError
}
```
რატომ ხდება ბუნებრივად: backend-მა ველის სახელი შეცვალა, მომხმარებელს პროფილი არ შეუვსია, API-მ `404`-ზე `{}` დააბრუნა, ან loading მდგომარეობა არ დაგვამუშავებია და `user` ჯერ `null`-ია.

**2. `.map()` არა-მასივზე**

```jsx
{items.map(item => <Row key={item.id} {...item} />)}
// items === null → TypeError: items.map is not a function
```
რატომ: API-მ ცარიელ პასუხზე `null` დააბრუნა `[]`-ის ნაცვლად, ან შეცდომაზე `{ error: "..." }` — ობიექტი, არა მასივი.

**3. მეთოდი არასწორ ტიპზე**

```jsx
<span>{price.toFixed(2)}</span>     // price არის string ან null → TypeError
<span>{name.toUpperCase()}</span>   // name === undefined → TypeError
```
რატომ: JSON-ში რიცხვი სტრინგად მოვიდა (`"19.99"`), ან ველი `null`-ია.

**4. `React.lazy` / dynamic import-ის ჩავარდნა — deploy-ის შემდეგ**

```jsx
const Dashboard = lazy(() => import('./Dashboard'));
```
რატომ: ახალი deploy-ის შემდეგ chunk-ების hash-ები შეიცვალა. მომხმარებელს tab-ი ღია აქვს ძველი `index.html`-ით, დააჭირა ლინკს — და ძველი chunk სერვერზე აღარ არსებობს. **ეს პროდაქშენში ერთ-ერთი ყველაზე ხშირი crash-ია** და ზუსტად ისეთი, რომლისთვისაც Error Boundary „ხელახლა ცდა"-სთან ერთად იდეალურია.

**5. მესამე მხარის კომპონენტის ბაგი**

chart/table/map ბიბლიოთეკა ცარიელ ან მოულოდნელი ფორმის მონაცემზე ვარდება. თქვენს კოდში ბაგი არ არის, მაგრამ თქვენი გვერდი ვარდება. Boundary აქ სავალდებულოა — უცხო კოდს ვერ გაასწორებთ.

**6. Context-ის გარეშე გამოძახებული hook**

```jsx
const { theme } = useContext(ThemeContext);   // Provider არ არის → undefined → TypeError
```

**7. გამოთვლა `useMemo`-ში ცარიელ მასივზე**

```jsx
const first = useMemo(() => data[0].value, [data]);   // data === [] → TypeError
```

**8. თარიღები და `Intl`**

```jsx
new Date(bad).toISOString()   // Invalid Date → RangeError
```

### 8.2 როგორ აღწევს ეს boundary-მდე — ბუნებრივი ჯაჭვი

დააკვირდით: აქ არსად არის `throw`, მაგრამ ბოლო ნაბიჯი ზუსტად იგივეა, რაც დემოში.

```
useEffect → fetch('/api/user')
   ↓
API აბრუნებს { user: { id: 7 } }   ← profile ველი არ არის!
   ↓
setUser(data.user)                  ← state იცვლება, არაფერი არ ვარდება
   ↓
React იძახებს render()-ს            RENDER ფაზა
   ↓
<p>{user.profile.name}</p>          → TypeError: Cannot read properties of undefined
   ↓
Error Boundary იჭერს  ✅
```

**ანუ განსხვავება მხოლოდ ის არის, რომ `throw new Error()`-ის ნაცვლად `TypeError`-ს JavaScript აგდებს.** boundary-სთვის ეს ერთი და იგივეა — შეცდომა render ფაზაშია, სხვას მნიშვნელობა არ აქვს.

### 8.3 მნიშვნელოვანი გამიჯვნა

აქ სტუდენტები ხშირად ერევიან, ამიტომ ცალკე უნდა თქვათ:

| შემთხვევა | Boundary | სწორი გზა |
|---|---|---|
| `fetch` ჩავარდა (ქსელი, 500) | ❌ ვერ იჭერს | `try/catch` + error state + „ხელახლა" ღილაკი |
| fetch გამოვიდა, მაგრამ **გატეხილი მონაცემი** მოვიდა და render ვარდება | ✅ იჭერს | Boundary = ბოლო თავდაცვის ხაზი |

ანუ Boundary **ქსელის შეცდომას არ ცვლის** — ის იჭერს ქსელის შეცდომის *შედეგს*, თუ ის render-ამდე მიაღწია.

### 8.4 რას აკეთებენ რეალურ პროექტებში

Boundary არ იდება „ერთხელ, App-ის თავზე". ის იდება იმ საზღვრებზე, სადაც **crash-ის იზოლაცია აზრს იძენს**:

```jsx
<ErrorBoundary>                    {/* მთელი აპლიკაცია — ბოლო თავდაცვა */}
  <Layout>
    <Sidebar />
    <ErrorBoundary>                {/* თითო route — გვერდი ვარდება, ნავიგაცია რჩება */}
      <Suspense fallback={<Spinner />}>
        <Route />
      </Suspense>
    </ErrorBoundary>
    <ErrorBoundary>                {/* თითო widget — chart ვარდება, dashboard რჩება */}
      <RevenueChart data={data} />
    </ErrorBoundary>
  </Layout>
</ErrorBoundary>
```

**წესი:** რაც უფრო ღრმაა boundary, მით ნაკლები იკარგება crash-ის დროს. თუ მთელ აპლიკაციაზე ერთი boundary გაქვთ, ერთი პატარა chart-ის ბაგი მთელ ეკრანს fallback-ით ჩაანაცვლებს.

**და კიდევ ერთი:** dev რეჟიმში შეცდომა Console-შიც ჩანს და overlay-შიც — fallback UI-ს რეალური ფასი **პროდაქშენშია**, სადაც მომხმარებელი თეთრი ეკრანის ნაცვლად გასაგებ შეტყობინებას და „ხელახლა ცდა" ღილაკს ხედავს.

### 8.5 დამატებითი სავარჯიშო (რეკომენდებული)

დემოში `throw`-ის ნაცვლად სცადეთ ბუნებრივი crash — შედეგი იდენტური იქნება, მაგრამ სტუდენტისთვის ბევრად უფრო ცნობადი:

```jsx
function BrokenUserCard() {
  // API-ს იმიტაცია, რომელმაც profile ველი "დაკარგა"
  const [user, setUser] = useState(null);

  useEffect(() => {
    setTimeout(() => setUser({ id: 7 }), 500);   // profile არ არის!
  }, []);

  if (!user) return <p>იტვირთება…</p>;

  return <p>მომხმარებელი: {user.profile.name}</p>;   // 💥 TypeError render-ში
}
```

შეახვიეთ `<ErrorBoundary>`-ში და Console-ში იგივე `[EB] 2 → 3 → 4 → 3` თანმიმდევრობას დაინახავთ — მხოლოდ შეცდომის ტექსტი იქნება `Cannot read properties of undefined (reading 'name')`.

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
