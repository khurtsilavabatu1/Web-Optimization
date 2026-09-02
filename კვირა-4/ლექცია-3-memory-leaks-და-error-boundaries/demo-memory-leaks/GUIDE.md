# Memory Leaks & Error Boundaries -- ეტაპობრივი გაიდი

ამ პრაქტიკაში თქვენ იმუშავებთ ინტერაქტიულ React აპლიკაციაზე, რომელშიც ოთხი ტიპის memory leak არის ჩაშენებული. თქვენი ამოცანაა -- DevTools-ის Performance Monitor-ით და Memory tab-ით აღმოაჩინოთ ლიკები, გაიგოთ რატომ ხდება გაჟონვა, და ისწავლოთ cleanup-ის პატერნები. მეორე ნაწილში Error Boundary-ის მუშაობას გაეცნობით -- როგორ იჭერს render-ის შეცდომებს და იზოლირებს "ჩავარდნილ" კომპონენტს.

პროექტი მდებარეობს `demo-memory-leaks/` ფოლდერში.

**პროექტი არის სრული Vite + React აპლიკაცია** შემდეგი სტრუქტურით:

| ფაილი/ფოლდერი | აღწერა |
|---------------|--------|
| `src/App.jsx` | მთავარი კომპონენტი — leak და error boundary სექციები |
| `src/components/IntervalLeak.jsx` | setInterval leak-ის დემო |
| `src/components/EventListenerLeak.jsx` | Event listener leak-ის დემო |
| `src/components/DetachedDomLeak.jsx` | Detached DOM nodes leak-ის დემო |
| `src/components/GrowingDataLeak.jsx` | მზარდი მასივის leak-ის დემო |
| `src/components/ErrorBoundary.jsx` | Error Boundary class კომპონენტი |
| `src/components/CrashButton.jsx` | CrashableComponent და SafeComponent |
| `src/components/ExercisePanel.jsx` | პრაქტიკული დავალებების პანელი |
| `GUIDE.md` | ეს ფაილი -- ეტაპობრივი ინსტრუქცია |

---

## წინაპირობა: პროექტის გაშვება

```bash
cd ~/Desktop/Web-optimization/კვირა-4/ლექცია-3-memory-leaks-და-error-boundaries/demo-memory-leaks
npm install
npm run dev
```

გახსენით ბრაუზერში: `http://localhost:5173`

> **რატომ Vite?** Vite უზრუნველყოფს სწრაფ HMR-ს და რეალურ პროექტის სტრუქტურას. კომპონენტები დაყოფილია ცალკეულ ფაილებად, რაც აადვილებს memory leak-ების იზოლირებულ შესწავლას.

---

## ეტაპი 1: Performance Monitor-ის გახსნა

### 1.1 გახსენით გვერდი და DevTools

1. გახსენით `http://localhost:5173`
2. DevTools გახსენით: **Cmd+Option+I** (Mac) ან **Ctrl+Shift+I** (Windows/Linux)
3. გახსენით Command Menu: **Cmd+Shift+P** (Mac) ან **Ctrl+Shift+P** (Windows/Linux)
4. ჩაწერეთ: `Performance Monitor` და აირჩიეთ **Show Performance Monitor**

### 1.2 რას ხედავთ Performance Monitor-ში?

ეკრანის ქვედა ნაწილში გამოჩნდება real-time მონიტორი შემდეგი მეტრიკებით:

| მეტრიკა | რას აჩვენებს | ნორმალური მნიშვნელობა |
|---------|-------------|---------------------|
| **CPU usage** | პროცესორის დატვირთვა ამ tab-ისთვის | 0-2% უმოქმედო აპისთვის |
| **JS Heap Size** | JavaScript-ის ობიექტების (ცვლადები, მასივები, ფუნქციები) მიერ გამოყენებული მეხსიერება | პატარა აპისთვის 10-50 MB ჩვეულებრივია |
| **DOM Nodes** | HTML ელემენტების რაოდენობა გვერდზე (div, span, button...) | რამდენიმე ასეული ნორმალურია |
| **JS Event Listeners** | რეგისტრირებული event listener-ების რაოდენობა (click, resize, scroll...) | აპის სირთულეზეა დამოკიდებული |
| **Documents** | ღია document-ების რაოდენობა (გვერდი + iframe-ები) | 1-2 ჩვეულებრივია (2 = React DevTools-ის iframe) |

> **ბრაუზერის მეხსიერების ლიმიტი:** Chrome ერთ tab-ს აძლევს დაახლოებით **2-4 GB** (სისტემის RAM-ზე დამოკიდებული). Memory leak ნიშნავს, რომ JS Heap Size **მუდმივად იზრდება** და არ ბრუნდება — სანამ tab არ გაიყინება ან Chrome არ მოკლავს.

> **ახლა ეს რიცხვები სტაბილური უნდა იყოს.** ჩაინიშნეთ JS Event Listeners-ის მიმდინარე მნიშვნელობა — ის მალე გაიზრდება.

---

## ეტაპი 2: Leak #1 -- setInterval

აპლიკაციის "Memory Leaks" სექციაში ოთხი leak-ის ბარათია. პირველი არის **"1. setInterval Leak"**.

### 2.1 Interval-ის დაწყება

1. პირველ ბარათში დააჭირეთ ღილაკს **"დაიწყე ახალი Interval"**
2. Counter-ის მნიშვნელობა სწრაფად იზრდება (ყოველ 500ms)
3. Console-ში დაინახავთ წითელ შეტყობინებას:
   ```
   + ახალი Interval დაიწყო (clearInterval არ არის!) ID: ...
   ```
4. ბარათზე **Active Intervals: 1** გამოჩნდება

### 2.2 დააჭირეთ კიდევ 4-ჯერ

დააჭირეთ **"დაიწყე ახალი Interval"** კიდევ 4-ჯერ. ახლა:
- **Active Intervals: 5**
- Counter 5-ჯერ უფრო სწრაფად იზრდება (5 interval ერთდროულად ცვლის state-ს)
- **~Memory** ზოლი იზრდება
- Performance Monitor-ში **JS Heap Size** თანდათანობით იზრდება

### 2.3 რატომ?

```javascript
// ❌ ეს არის leak -- ყოველ დაჭერაზე ახალი interval, წინა არ სუფთავდება
const startLeakyInterval = () => {
  const id = setInterval(() => {
    setCounter(prev => prev + 1);
  }, 500);
  // clearInterval არსად არ გამოიძახება!
};
```

> **მნიშვნელოვანი:** `setInterval` ბრაუზერს ეუბნება "ყოველ 500ms ეს ფუნქცია გაუშვი". თუ `clearInterval`-ს არ გამოიძახებთ, interval **სამუდამოდ** იმუშავებს -- თუნდაც კომპონენტი unmount-ი გახდეს.

### 2.4 გაჩერება

დააჭირეთ **"გააჩერე ყველა"** — ყველა interval გასუფთავდება, counter და memory ნულდება.

---

## ეტაპი 3: Leak #2 -- Event Listeners

### 3.1 Resize Listener-ის დამატება

მეორე ბარათი — **"2. Event Listener Leak"**.

1. დააჭირეთ ღილაკს **"დაამატე Listener"**
2. Console-ში დაინახავთ წითელ შეტყობინებას:
   ```
   + Resize listener #1 დაემატა (cleanup არ აქვს!)
   ```
3. ბარათზე **Listeners: 1** გამოჩნდება

### 3.2 დააჭირეთ კიდევ 4-ჯერ

დააჭირეთ **"დაამატე Listener"** ჯამში **5-ჯერ**. ყოველ დაჭერაზე:
- Console-ში ახალი შეტყობინება ჩნდება
- Listeners რიცხვი იზრდება
- **Performance Monitor-ში JS Event Listeners რიცხვი იზრდება!**

### 3.3 შეამოწმეთ ლიკის ეფექტი

ახლა ბრაუზერის ფანჯრის ზომა შეცვალეთ (resize). Console-ში **5 ცალკეული შეტყობინება** გამოჩნდება:

```
Resize detected! (Listener #1)
Resize detected! (Listener #2)
Resize detected! (Listener #3)
Resize detected! (Listener #4)
Resize detected! (Listener #5)
```

> **პრობლემა ნათელია:** ყოველ დაჭერაზე `window.addEventListener('resize', handler)` ემატება, მაგრამ არავინ იძახებს `removeEventListener`-ს. Listener-ები გროვდება და არასოდეს სუფთავდება -- ეს არის **memory leak**.

### 3.4 რატომ არის ეს პრობლემა?

| სიტუაცია | რა ხდება |
|----------|----------|
| 5 listener | ყოველ resize-ზე 5 ფუნქცია სრულდება |
| 50 listener | ბრაუზერი შესამჩნევად ნელდება |
| 500 listener | გვერდი "იყინება", მეხსიერება ამოიწურება |

### 3.5 გასუფთავება

დააჭირეთ **"გაასუფთავე"** — ყველა listener მოიხსნება `removeEventListener`-ით.

---

## ეტაპი 4: Leak #3 -- Detached DOM Nodes

### 4.1 Detached Node-ის შექმნა

მესამე ბარათი — **"3. Detached DOM Nodes"**.

1. დააჭირეთ **"შექმენი Detached Node"**
2. Console-ში დაინახავთ:
   ```
   + Detached DOM node შეიქმნა (არ არის DOM-ში, მაგრამ JS-ში ინახება!)
   ```
3. ბარათზე **Detached Nodes: 1** და **~Memory** იზრდება

### 4.2 რატომ არის ეს leak?

```javascript
const createDetachedNode = () => {
  const div = document.createElement('div');
  div.innerHTML = `<h3>...</h3><p>${'Lorem ipsum...'.repeat(100)}</p>`;

  // შევინახოთ ლინკი JS-ში, მაგრამ არ დავამატოთ DOM-ში
  domNodeTracker.add(div);  // ← reference რჩება!
};
```

DOM node შეიქმნა `document.createElement`-ით, მაგრამ **არ დაემატა** გვერდზე (`appendChild` არ გამოძახებულა). ამის მიუხედავად, JavaScript-ში reference ინახება (`domNodeTracker.nodes` მასივში). Garbage Collector ვერ გაასუფთავებს, რადგან reference არსებობს.

### 4.3 Heap Snapshot-ით შემოწმება

1. შექმენით რამდენიმე detached node
2. DevTools → **Memory** tab → **Heap snapshot** → **Take snapshot**
3. Summary view-ში მოძებნეთ "Detached"
4. დაინახავთ **Detached HTMLDivElement**-ებს — ეს არის leak!

### 4.4 გასუფთავება

დააჭირეთ **"გაასუფთავე"** — ყველა reference წაიშლება და Garbage Collector გაათავისუფლებს მეხსიერებას.

---

## ეტაპი 5: Leak #4 -- Growing Data

### 5.1 მონაცემების ზრდის დაწყება

მეოთხე ბარათი — **"4. Growing Data Leak"**.

1. დააჭირეთ **"დაიწყე ზრდა"**
2. Status გახდება **"იზრდება"**
3. **Data Chunks** რიცხვი ყოველ წამს იზრდება (1000 ელემენტი წამში)
4. **~Memory** ზოლი თანდათანობით ივსება
5. Console-ში:
   ```
   + მასივი გაიზარდა: 1 chunks (~100KB)
   + მასივი გაიზარდა: 2 chunks (~200KB)
   ...
   ```

### 5.2 რატომ?

```javascript
dataTracker.intervalId = setInterval(() => {
  const largeChunk = new Array(1000).fill(null).map((_, i) => ({
    id: Date.now() + i,
    data: 'x'.repeat(100),
    timestamp: new Date().toISOString(),
  }));
  dataTracker.add(largeChunk);  // ← მასივი უსასრულოდ იზრდება!
}, 1000);
```

ყოველ წამს 1000 ობიექტი ემატება მასივში, მაგრამ ძველი მონაცემები **არასოდეს სუფთავდება**. რეალურ აპლიკაციებში ეს ხშირად ხდება:
- ლოგების დაგროვება
- WebSocket შეტყობინებების შენახვა ლიმიტის გარეშე
- ისტორიის (undo/redo) უსასრულო დაგროვება

### 5.3 შეჩერება და გასუფთავება

- **"შეაჩერე"** — ზრდა ჩერდება, მაგრამ მონაცემები **კვლავ მეხსიერებაშია!**
- **"გაასუფთავე"** — მონაცემები წაიშლება და მეხსიერება თავისუფლდება

> **ყურადღება:** "შეაჩერე" ღილაკი მხოლოდ interval-ს აჩერებს, მასივის reference-ს არ წაშლის. რეალურ აპლიკაციაშიც ეს ხშირი შეცდომაა — "გავაჩერე" ≠ "გავასუფთავე".

---

## ეტაპი 6: როგორ გამოვასწოროთ -- Cleanup პატერნები

### 6.1 setInterval Cleanup

```javascript
// ❌ არასწორი -- clearInterval არ არის
useEffect(() => {
  setInterval(() => fetchData(), 5000);
}, []);

// ✅ სწორი -- id შევინახოთ და cleanup-ში გავწმინდოთ
useEffect(() => {
  const id = setInterval(() => fetchData(), 5000);
  return () => clearInterval(id);
}, []);
```

### 6.2 Event Listener Cleanup

```javascript
// ❌ არასწორი -- cleanup-ის გარეშე
useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []);

// ✅ სწორი -- useEffect-ის cleanup ფუნქცია
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

### 6.3 Detached DOM -- Reference-ების გაწმენდა

```javascript
// ❌ არასწორი -- reference-ები რჩება
const nodes = [];
function createNode() {
  const div = document.createElement('div');
  nodes.push(div);  // reference ინახება!
}

// ✅ სწორი -- WeakRef ან პერიოდული გაწმენდა
useEffect(() => {
  const nodes = [];
  // ... გამოყენება ...
  return () => { nodes.length = 0; }; // cleanup-ში გავწმინდოთ
}, []);
```

### 6.4 Growing Data -- ლიმიტი და გაწმენდა

```javascript
// ❌ არასწორი -- უსასრულო ზრდა
const logs = [];
socket.on('message', (msg) => {
  logs.push(msg);
});

// ✅ სწორი -- ლიმიტი
const MAX_LOGS = 1000;
socket.on('message', (msg) => {
  logs.push(msg);
  if (logs.length > MAX_LOGS) {
    logs.splice(0, logs.length - MAX_LOGS);
  }
});
```

### 6.5 Async Cleanup (AbortController)

```javascript
// ❌ არასწორი -- fetch გრძელდება unmount-ის შემდეგ
useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(data => setData(data));
}, []);

// ✅ სწორი -- AbortController-ით გაუქმება
useEffect(() => {
  const controller = new AbortController();
  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      if (err.name !== 'AbortError') throw err;
    });
  return () => controller.abort();
}, []);
```

> **წესი:** `useEffect`-ის cleanup ფუნქცია (`return () => {...}`) სრულდება კომპონენტის unmount-ისას. **ყოველთვის** გაწმინდეთ: listeners, intervals, timeouts, subscriptions, AbortController.

### 6.6 Cleanup-ის ცხრილი

| რესურსი | დამატება | გასუფთავება |
|---------|----------|-------------|
| Event Listener | `addEventListener(...)` | `removeEventListener(...)` |
| Interval | `setInterval(...)` | `clearInterval(id)` |
| Timeout | `setTimeout(...)` | `clearTimeout(id)` |
| Fetch | `fetch(url, { signal })` | `controller.abort()` |
| WebSocket | `new WebSocket(url)` | `ws.close()` |
| DOM Reference | `nodes.push(element)` | `nodes.length = 0` |
| Growing Data | `data.push(item)` | ლიმიტი ან `data.length = 0` |

---

## ეტაპი 7: Memory Tab -- Heap Snapshots

Performance Monitor real-time სურათს აჩვენებს, მაგრამ **Heap Snapshot** საშუალებას გაძლევთ ობიექტების დონეზე დაინახოთ რა არის მეხსიერებაში.

### 7.1 Snapshot 1 -- საწყისი მდგომარეობა

1. დააჭირეთ **"🧹 Reset All Leaks"** ღილაკს, რომ ყველაფერი გასუფთავდეს
2. DevTools-ში გახსენით **Memory** tab
3. აირჩიეთ **Heap snapshot** და დააჭირეთ **Take snapshot**
4. ეს არის "სუფთა" მდგომარეობა -- Snapshot 1

### 7.2 ლიკების შექმნა

1. დააჭირეთ **"დაიწყე ახალი Interval"** 3-ჯერ
2. დააჭირეთ **"დაამატე Listener"** 5-ჯერ
3. დააჭირეთ **"შექმენი Detached Node"** 5-ჯერ
4. დააჭირეთ **"დაიწყე ზრდა"** და დაელოდეთ 5 წამს

### 7.3 Snapshot 2 -- ლიკების შემდეგ

1. კვლავ **Take snapshot** (Snapshot 2)
2. Snapshot 2-ის პანელში, dropdown-ში აირჩიეთ **Comparison**
3. შეადარეთ Snapshot 1-თან

### 7.4 რას ეძებთ?

| რას ნახავთ | რას ნიშნავს |
|-----------|-------------|
| **# New** სვეტი მაღალი რიცხვებით | ახალი ობიექტები შეიქმნა |
| **# Deleted** დაბალი რიცხვებით | ძველი ობიექტები ვერ გასუფთავდა |
| **Size Delta** დადებითი | მეხსიერება გაიზარდა |
| **Detached HTMLDivElement** | DOM ელემენტი მეხსიერებაშია, მაგრამ გვერდზე აღარ არის |

> **თუ Heap Size მუდმივად იზრდება ყოველ snapshot-ზე -- ეს memory leak-ის ნიშანია.** ნორმალურ აპლიკაციაში Garbage Collector პერიოდულად ასუფთავებს მეხსიერებას და ზომა სტაბილიზდება.

---

## ეტაპი 8: Error Boundaries

ახლა გადავიდეთ აპლიკაციის მეორე სექციაზე -- **"Error Boundaries (შეცდომების საზღვრები)"**.

### 8.1 რა არის Error Boundary?

Error Boundary არის React class component, რომელიც:
- იჭერს შვილი კომპონენტების render-ის შეცდომებს
- აჩვენებს fallback UI-ს (ნაცვლად თეთრი ეკრანისა)
- იზოლირებს crash-ს -- მეზობელი კომპონენტები აგრძელებენ მუშაობას

### 8.2 Crash-ის სიმულაცია

1. მარცხენა ბარათში ("იზოლირებული Boundary") ხედავთ **CrashableComponent**-ს
2. დააჭირეთ წითელ ღილაკს **"Crash!"**

### 8.3 რას ხედავთ?

CrashableComponent-ის ადგილას გამოჩნდა **fallback UI**:

- ძახილის ნიშანი და წარწერა: **"რაღაც შეცდომა მოხდა!"**
- შეცდომის დეტალები: `CrashableComponent შეცდომა: კომპონენტი "ჩავარდა" render-ის დროს!`
- Component Stack (რომელმა კომპონენტმა გამოიწვია crash)
- ღილაკი **"ხელახლა ცდა"**
- Boundary-ის სახელი: `CrashableBoundary`

Console-ში ასევე დაინახავთ:

```
ErrorBoundary დაიჭირა:
  Error: CrashableComponent შეცდომა...
  Component Stack: ...
```

### 8.4 მეზობლის იზოლაცია

ყურადღება მიაქციეთ: მარჯვენა ბარათში **SafeComponent** კვლავ მუშაობს! +1 / -1 ღილაკები ფუნქციონირებს. ეს არის Error Boundary-ის მთავარი უპირატესობა -- **crash იზოლირებულია**.

> **რატომ მუშაობს?** თითოეული ბარათი თავის `ErrorBoundary`-ში არის ჩასმული. CrashableComponent-ის crash-ს მხოლოდ მისი Boundary იჭერს (`CrashableBoundary`). SafeComponent-ის Boundary-ს (`SafeBoundary`) არაფერი არ შეხებია.

### 8.5 Retry -- აღდგენა

1. Fallback UI-ში დააჭირეთ **"ხელახლა ცდა"**
2. CrashableComponent ხელახლა დარენდერდება -- ნორმალურ მდგომარეობაში
3. ისევ შეგიძლიათ "Crash!" დააჭიროთ

> **როგორ მუშაობს Retry?** `ErrorBoundary` არის class component, რომლის state-ში `hasError: true` არის. "ხელახლა ცდა" ღილაკი `setState({ hasError: false, error: null, errorInfo: null })`-ს იძახებს, რაც ხელახალ render-ს იწვევს. ამჯერად `shouldCrash` state ნაგულისხმევად `false` არის, ამიტომ კომპონენტი ნორმალურად ჩაიტვირთება.

---

## ეტაპი 9: Error Boundary-ის შეზღუდვები

აპლიკაციის ბოლოში ცხრილი აჩვენებს, რა შეუძლია და რა არ შეუძლია Error Boundary-ს:

| სიტუაცია | იჭერს? | ალტერნატივა |
|----------|--------|-------------|
| Render-ის შეცდომა | **იჭერს** | -- |
| Event handler-ის შეცდომა | **ვერ იჭერს** | `try/catch` |
| Async კოდი (setTimeout, fetch) | **ვერ იჭერს** | `try/catch`, `.catch()` |
| Error Boundary-ის საკუთარი შეცდომა | **ვერ იჭერს** | მშობელი Error Boundary |

> **მნიშვნელოვანი:** Error Boundary მხოლოდ **render-ის** შეცდომებს იჭერს -- ანუ მაშინ, როცა `render()` მეთოდის (ან function component-ის return-ის) შესრულებისას throw ხდება. Event handler-ებში (onClick, onChange) მოხდა შეცდომა? Error Boundary ვერ იჭერს -- გამოიყენეთ try/catch.

---

## ეტაპი 10: Error Boundary-ის კოდი -- როგორ იწერება?

```jsx
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  // 1. შეცდომის დაჭერა -- state განახლება
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // 2. ლოგირება (Sentry, LogRocket და ა.შ.)
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    this.setState({ errorInfo }); // შევინახოთ component stack-ისთვის
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    // 3. Fallback UI
    if (this.state.hasError) {
      return (
        <div>
          <h2>რაღაც შეცდომა მოხდა!</h2>
          <p>{this.state.error?.message}</p>
          {this.state.errorInfo && (
            <pre>{this.state.errorInfo.componentStack}</pre>
          )}
          <button onClick={this.handleRetry}>ხელახლა ცდა</button>
        </div>
      );
    }

    // 4. ნორმალური რენდერი
    return this.props.children;
  }
}
```

> **რატომ class component?** React-ში `getDerivedStateFromError` და `componentDidCatch` ლაიფსაიკლ მეთოდებია -- ისინი მხოლოდ class component-ებში არსებობს. Function component-ით Error Boundary-ს ვერ დაწერთ (React 18-ის მდგომარეობით).

### გამოყენების პატერნი

```jsx
// ✅ ცალკე Boundary თითოეული სექციისთვის
function App() {
  return (
    <ErrorBoundary>
      <Header />
      <ErrorBoundary><MainContent /></ErrorBoundary>
      <ErrorBoundary><Sidebar /></ErrorBoundary>
    </ErrorBoundary>
  );
}
```

> **პრინციპი:** რაც უფრო "ვიწრო" არის Boundary, მით ნაკლები ნაწილი ზარალდება crash-ისგან. Sidebar-ი ჩავარდა? MainContent კვლავ მუშაობს.

---

## ეტაპი 11: პრაქტიკული დავალებები

აპლიკაციის ბოლოში **"პრაქტიკული დავალებები"** სექციაა 4 სავარჯიშოთი. თითოეულს აქვს ნაბიჯ-ნაბიჯ ინსტრუქციები (დააჭირეთ **+** ღილაკს გასახსნელად) და checkbox შესრულების მოსანიშნად:

| # | დავალება | რას ისწავლით |
|---|---------|-------------|
| 1 | Heap Snapshot-ის გადაღება | Memory tab-ის ძირითადი გამოყენება |
| 2 | Interval Leak-ის აღმოჩენა | Snapshot-ების შედარება (Comparison view) |
| 3 | Detached DOM-ის პოვნა | Detached node-ების იდენტიფიკაცია Heap-ში |
| 4 | Allocation Timeline-ის გამოყენება | რეალურ დროში მეხსიერების განაწილების მონიტორინგი |

> **რეკომენდაცია:** შეასრულეთ ეს დავალებები თანმიმდევრობით. თითოეული წინა დავალების ცოდნას ეყრდნობა.

---

## შეჯამება: Cleanup პატერნები და საკონტროლო სია

### Memory Leaks -- ძირითადი წესები

| # | წესი | მაგალითი |
|---|------|---------|
| 1 | `useEffect`-ში **ყოველთვის** დააბრუნეთ cleanup ფუნქცია | `return () => removeEventListener(...)` |
| 2 | `setInterval` / `setTimeout` -- **შეინახეთ id** და გაწმინდეთ | `return () => clearInterval(id)` |
| 3 | Async -- გამოიყენეთ **AbortController** | `return () => controller.abort()` |
| 4 | WebSocket -- **დახურეთ** unmount-ისას | `return () => ws.close()` |
| 5 | Subscriptions -- **unsubscribe** | `return () => subscription.unsubscribe()` |
| 6 | DOM reference-ები -- **გაწმინდეთ** | `return () => { refs.length = 0; }` |
| 7 | მზარდი მასივები -- **ლიმიტი** დაუწესეთ | `if (data.length > MAX) data.splice(...)` |

### Error Boundaries -- ძირითადი წესები

| # | წესი |
|---|------|
| 1 | ყოველ დამოუკიდებელ სექციას საკუთარი ErrorBoundary |
| 2 | Fallback UI-ში აჩვენეთ მოქმედებადი ინფორმაცია (retry ღილაკი, საკონტაქტო ლინკი) |
| 3 | `componentDidCatch`-ში გააგზავნეთ შეცდომა error tracking სერვისზე (Sentry, LogRocket) |
| 4 | Event handler-ებში -- `try/catch`, არა Error Boundary |

### DevTools-ის ინსტრუმენტები

| ინსტრუმენტი | როდის გამოვიყენოთ |
|-------------|-------------------|
| **Performance Monitor** | real-time -- ხედავთ listener-ების, heap-ის, DOM-ის ზრდას |
| **Memory tab -- Heap Snapshot** | "სანამ" და "შემდეგ" შედარება -- რა ობიექტები დაგროვდა? |
| **Memory tab -- Allocation Timeline** | დროში გაწერილი მეხსიერების განაწილება |
| **Console** | leak-ების console.log შეტყობინებები, Error Boundary-ის ლოგები |

### მთავარი პრინციპი

> **"ყველაფერი რასაც ხსნი -- დახურე. ყველაფერი რასაც იწყებ -- შეაჩერე. ყველაფერს რაზეც გამოიწერ -- გააუქმე."** ეს არის memory leak-ების პრევენციის უმარტივესი წესი. `useEffect`-ის cleanup ფუნქცია სწორედ ამისთვის არის შექმნილი.
