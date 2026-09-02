# DevTools Performance Tab — ეტაპობრივი გაიდი

ამ პრაქტიკაში ისწავლით Chrome DevTools Performance Tab-ის ღრმა გამოყენებას. ჩვენ გვაქვს `პრაქტიკა/` პროექტი, რომელიც სპეციალურად შეიცავს performance პრობლემებს — Long Tasks, Layout Thrashing, Frame Drop, გამოუყენებელი კოდი.

---

## წინაპირობა: პროექტის გაშვება

```bash
cd ~/Desktop/Web-optimization/კვირა-1/ლექცია-4-devtools-performance-tab/პრაქტიკა
npx serve -l 3000
```

გახსენით ბრაუზერში: `http://localhost:3000`

> **შენიშვნა:** გვერდის ჩატვირთვისას ცოტა ხანი „გაიყინება" — ეს ნორმალურია! `heavy-script.js` განზრახ ბლოკავს main thread-ს.

> **ეს პროექტი არის vanilla HTML/CSS/JS** — DevTools Performance Tab-ის ფუნდამენტური კონცეფციების შესასწავლად. სხვა ლექციების React პროექტებში იგივე პრინციპები მუშაობს, უბრალოდ Flame Chart-ში React-ის სპეციფიკური ფუნქციები დაინახავთ (reconciliation, component lifecycle და ა.შ.).

---

## ეტაპი 1: Performance Recording — ჩატვირთვის ჩაწერა

### 1.1 პირველი Recording

1. გახსენით DevTools → **Performance** tab
2. დააჭირეთ **Record** ღილაკს (ან **Cmd+E**)
3. გადატვირთეთ გვერდი: **Cmd+R**
4. დაელოდეთ 5-10 წამი (რომ auto Long Task-იც ჩაიწეროს)
5. **დასქროლეთ** ზემოთ-ქვემოთ (2-3 ჯერ)
6. შეაჩერეთ Recording (**Cmd+E** ან Stop ღილაკი)

### 1.2 რას ხედავთ — Timeline Overview

Recording-ის ზედა ნაწილში არის სამი ზოლი:

| ზოლი | სად არის | რას აჩვენებს | რა ფერია |
|------|----------|-------------|----------|
| **FPS** | ზემოთ | კადრები წამში | მწვანე = კარგი, წითელი = frame drop |
| **CPU** | შუაში | CPU-ის დატვირთვა | ყვითელი = JS, იასამნისფერი = Layout, მწვანე = Paint |
| **NET** | ქვემოთ | ქსელის აქტივობა | ლურჯი ზოლები = request-ები |

### 1.3 FPS ზოლი — Frame Drop

- სქროლის დროს FPS ზოლი **წითელი** უნდა იყოს — ეს ნიშნავს frame drop-ს
- ეს იმიტომ, რომ `onScrollHandler()` → `animateBoxes()` → `forceReflow()` ყოველ scroll event-ზე ეშვება
- 200 box-ისთვის forced reflow = 200-ჯერ layout გამოთვლა!

> **60 FPS** ნიშნავს ბრაუზერი ყოველ 16.6ms-ში ხატავს ახალ კადრს. თუ JavaScript ან Layout 16.6ms-ზე მეტს ხარჯავს, კადრი იკარგება — ეს არის **frame drop**.

### 1.4 CPU ზოლი

- **ყვითელი პიკები** = JavaScript execution (heavySort, blockingLoop)
- **იასამნისფერი** = Layout/Rendering (სქროლის დროს)
- **მწვანე** = Paint (პიქსელების დახატვა)

---

## ეტაპი 2: Main Thread — Flame Chart-ის კითხვა

### 2.1 Main Thread-ის პოვნა

Recording-ში გადაახვიეთ ქვემოთ სანამ **"Main"** სექციას დაინახავთ. ეს არის ბრაუზერის მთავარი thread — აქ ხდება ყველაფერი: JavaScript, Layout, Paint, Event handling.

### 2.2 Flame Chart — როგორ წავიკითხოთ?

Flame chart არის ფუნქციების გამოძახების ვიზუალიზაცია:
- **ჰორიზონტალური სიგანე** = დრო (რაც უფრო ფართოა, მით მეტხანს გრძელდება)
- **ვერტიკალური** = გამოძახების იერარქია (ზემოდან ქვემოთ)
- **ფერი**: ყვითელი = JS, იასამნისფერი = Layout, მწვანე = Paint

```
Main Thread Flame Chart:
──────────────────────────────────────────────────────────
│ Evaluate script (heavy-script.js)                     │  ← 300ms+
│  └── heavySort()                                      │
│       └── sort() x3                                   │
──────────────────────────────────────────────────────────
│ Timer Fired                                           │  ← Auto Long Task (1 წამის შემდეგ)
│  └── blockingLoop(8000000)                            │
──────────────────────────────────────────────────────────
│ Event: scroll                                         │
│  └── onScrollHandler()                                │
│       └── animateBoxes()                              │
│            └── forceReflow() x200                     │
──────────────────────────────────────────────────────────
```

### 2.3 Long Tasks-ის პოვნა

Main Thread-ზე მოძებნეთ ზოლები **წითელი სამკუთხედით** ზედა მარჯვენა კუთხეში — ეს არის Long Tasks (50ms+).

**ამ პროექტში Long Tasks:**

| Long Task | ფუნქცია | მიახლოებითი ხანგრძლივობა | როდის ხდება |
|-----------|---------|------------------------|------------|
| 1 | heavySort() | 300-500ms | გვერდის ჩატვირთვისთანავე |
| 2 | blockingLoop(8M) | 200-400ms | 1 წამის შემდეგ (setTimeout) |
| 3 | Event: scroll → animateBoxes() | 50-200ms | ყოველ სქროლზე |

### 2.4 Long Task-ზე დაკლიკება

1. დააკლიკეთ heavySort()-ის ზოლზე
2. ქვემოთ **Summary** tab-ში ნახავთ:
   - **Total Time** — მთლიანი დრო
   - **Self Time** — რამდენი ms დახარჯა **თავად** ამ ფუნქციამ
   - **URL** — რომელ ფაილშია (heavy-script.js)
   - **Line** — რომელ ხაზზე

---

## ეტაპი 3: Bottom-Up Tab — ყველაზე მძიმე ფუნქციები

### 3.1 Bottom-Up Tab-ის გახსნა

1. Recording-ში ქვედა ნაწილში ნახეთ tab-ები: **Summary**, **Bottom-Up**, **Call Tree**, **Event Log**
2. აირჩიეთ **Bottom-Up**

### 3.2 რას ხედავთ?

Bottom-Up დალაგებულია **Self Time**-ის მიხედვით — ის ფუნქცია რომელმაც ყველაზე მეტი „საკუთარი" დრო დახარჯა, ზემოთ არის.

| ფუნქცია | Self Time | Total Time | რა არის |
|---------|-----------|------------|---------|
| heavySort() | ~300ms+ | ~300ms+ | heavy-script.js-ში სორტირება |
| blockingLoop() | ~200ms+ | ~200ms+ | app.js-ში მძიმე ციკლი |
| sort() | | | heavySort()-ის შიგნით |
| animateBoxes() | | | scroll handler |

> **Self Time** vs **Total Time**: თუ `renderProducts()` 200ms-ს ხარჯავს, და მის შიგნით `formatDate()` 150ms-ს ხარჯავს — Bottom-Up-ში `formatDate()` იქნება ზემოთ 150ms Self Time-ით, რადგან **ის** არის ნამდვილი „დამნაშავე".

### 3.3 ჩაინიშნეთ — Bottom-Up

| # | ფუნქცია | Self Time (ms) | ფაილი |
|---|---------|---------------|-------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

---

## ეტაპი 4: Call Tree Tab — გამოძახების იერარქია

### 4.1 Call Tree Tab-ის გახსნა

1. ქვედა tab-ებიდან აირჩიეთ **Call Tree**

### 4.2 რას ხედავთ?

Call Tree აჩვენებს **ვინ ვის გამოიძახა** — ხისებური სტრუქტურით:

```
Call Tree:
├── Evaluate script (heavy-script.js) ── 300ms+
│   └── heavySort() ── 300ms+
│        └── Array.sort() x3
│
├── Timer Fired ── 200ms+
│   └── blockingLoop(8000000) ── 200ms+
│
├── Event: click (btn-heavy) ── 400ms+
│   └── runHeavyTask() ── 400ms+
│        └── blockingLoop(15000000) ── 400ms+
│
├── Event: scroll ── 50-200ms
│   └── onScrollHandler() ── 50-200ms
│        └── animateBoxes() ── 50-200ms
│             └── forceReflow() x200
│
└── generateCards() ── 10ms
     └── DOM manipulation
```

### 4.3 რა განსხვავებაა Bottom-Up-სა და Call Tree-ს შორის?

| | Bottom-Up | Call Tree |
|---|----------|----------|
| **მიმართულება** | ქვემოდან ზემოთ | ზემოდან ქვემოთ |
| **კითხვა** | „ვინ დახარჯა ყველაზე მეტი დრო?" | „ვინ ვის გამოიძახა?" |
| **გამოყენება** | „დამნაშავე" ფუნქციის პოვნა | გამოძახების ჯაჭვის გაგება |
| **დალაგება** | Self Time-ით | Total Time-ით |

---

## ეტაპი 5: ღილაკებით ტესტირება

### 5.1 Long Task ღილაკი

1. Performance tab → **Record** (Cmd+E)
2. დააჭირეთ **"გაუშვი Long Task"** ღილაკს
3. შეაჩერეთ Recording

**რას დაინახავთ Main Thread-ზე:**
- `Event: click` → `runHeavyTask()` → `blockingLoop(15000000)`
- ეს არის ერთი გრძელი ყვითელი ზოლი **წითელი კუთხით** (Long Task)
- ანიმაციის ყუთი გაჩერდება ამ დროს — main thread ბლოკირებულია!

### 5.2 მძიმე სორტირება

1. Record → **"გაუშვი მძიმე სორტირება"** → Stop
2. Main Thread-ზე: `runHeavySort()` → `sortArray()` → `Array.sort()` x5
3. Bottom-Up-ში: `sort()` ყველაზე მეტი Self Time-ით

### 5.3 DOM ელემენტების დამატება

1. Record → **"დაამატე 2000 DOM ელემენტი"** → Stop
2. Main Thread-ზე ნახეთ **სამი ფაზა**:
   - **ყვითელი** = JavaScript (DOM ელემენტების შექმნა)
   - **იასამნისფერი** = Layout (2000 ელემენტის პოზიციის გამოთვლა)
   - **მწვანე** = Paint (2000 ელემენტის დახატვა)

> ეს არის **JS → Layout → Paint** ჯაჭვი. ყოველ DOM ცვლილებას ბრაუზერი ამ სამ ფაზას გაივლის.

### 5.4 Layout Thrashing

1. Record → **"Layout Thrashing"** → Stop
2. Main Thread-ზე: `triggerReflowStorm()` — ბევრი იასამნისფერი **Layout** ზოლი
3. **Warning** icon (სამკუთხედი !) — „Forced reflow is a likely performance bottleneck"

> **Layout Thrashing** = ყოველ iteration-ში: offsetWidth-ს კითხულობ (ბრაუზერი layout-ს ითვლის) → style-ს ცვლი (layout invalidate) → ისევ კითხულობ → ისევ ითვლის... x20 box x100 round = 2000 forced layout!

---

## ეტაპი 6: Scroll Performance — FPS Drop

### 6.1 FPS Recording

1. Performance tab → **Record** (Cmd+E)
2. **დასქროლეთ** ზემოთ-ქვემოთ (5-10 წამი)
3. შეაჩერეთ Recording

### 6.2 FPS ზოლი

- **მწვანე ადგილები** = კარგი FPS (60-ს მიახლოებული)
- **წითელი ადგილები** = frame drop (FPS დაბალია)
- სქროლის დროს წითელი იქნება — `onScrollHandler()` ძალიან მძიმეა

### 6.3 რატომ არის სქროლი ნელი?

Main Thread-ზე ყოველ `Event: scroll`-ზე ხდება:

```
Event: scroll
  └── onScrollHandler()
       └── animateBoxes()
            ├── querySelector('.scroll-box') x200
            ├── style.transform = ... x200
            ├── style.opacity = ... x200
            └── forceReflow(box) x200  ← ეს არის მთავარი პრობლემა!
                 ├── box.offsetHeight ← forced layout!
                 └── box.style.height = ... ← invalidate!
```

200 box x forced reflow = ძალიან ნელი!

### 6.4 გვერდზე FPS მონიტორი

გვერდის ზედა მარჯვენა კუთხეში ცოცხალი FPS counter ჩანს:
- **მწვანე** = 50+ FPS (კარგი)
- **ყვითელი** = 30-50 FPS (საშუალო)
- **წითელი** = 30-ზე ნაკლები (ცუდი)

სქროლის დროს FPS დაეცემა!

---

## ეტაპი 7: Coverage Tab — გამოუყენებელი კოდი

### 7.1 Coverage Tab-ის გახსნა

1. DevTools-ში დააჭირეთ **Cmd+Shift+P** (Command Palette)
2. ჩაწერეთ **"Coverage"**
3. აირჩიეთ **"Start instrumenting coverage and reload page"**
4. Coverage panel ქვედა ნაწილში გამოჩნდება

### 7.2 რას ხედავთ?

| ფაილი | Total Bytes | Unused Bytes | Unused % | რა არის |
|-------|-------------|-------------|----------|---------|
| unused-library.js | ~8KB | ~7.5KB | **~90%+** | მთლიანი ბიბლიოთეკა — 1 ფუნქცია გამოყენებული |
| styles.css | ~12KB | ~5KB+ | **~45%+** | `.unused-*` სელექტორები |
| app.js | ~8KB | ~2KB | ~25% | unused ფუნქციები ბოლოში |
| heavy-script.js | ~1KB | ~0 | ~0% | ყველაფერი გამოიყენება |

### 7.3 unused-library.js — დეტალურად

1. დააკლიკეთ **unused-library.js** Coverage panel-ში
2. Sources tab-ში გაიხსნება ხაზ-ხაზ:
   - **მწვანე ხაზები** = `initLibrary()` — გამოიყენება
   - **წითელი ხაზები** = `unusedFormatDate()`, `unusedCurrencyFormat()`, `unusedValidateEmail()`... — **არასდროს** გაშვებული!

### 7.4 დასკვნა

- **unused-library.js** — 90%+ გამოუყენებელია → **წაშალეთ** ან **code splitting**
- **styles.css** — `.unused-*` სელექტორები → **წაშალეთ**
- **animate.min.css** (თუ ისევ Coverage-ში ნახავთ) — 95%+ გამოუყენებელია → **მოაშორეთ**

> **Code Splitting-ის გადაწყვეტილება:** Coverage tab-ით ხედავ, რომ JS-ის 50%+ გამოუყენებელია → ეს კოდი სხვა გვერდებზეა საჭირო → `React.lazy()` ან `dynamic import()` — მხოლოდ საჭიროების დროს ჩაიტვირთება.

---

## ეტაპი 8: Network Tab — Disable Cache შედარება

### 8.1 Disable Cache ჩართული

1. DevTools → **Network** tab
2. მონიშნეთ **"Disable cache"** checkbox
3. Hard refresh: **Cmd+Shift+R**
4. ჩაინიშნეთ: requests, transferred, finish time

### 8.2 Disable Cache გამორთული

1. მოხსენით **"Disable cache"**
2. Cmd+R (ჩვეულებრივი refresh)
3. ჩაინიშნეთ: requests, transferred, finish time

### 8.3 შედარება

| პარამეტრი | Disable Cache ON | Disable Cache OFF |
|-----------|-----------------|-------------------|
| Requests | | |
| Transferred | | ბევრად ნაკლები (from cache) |
| Finish time | | ბევრად სწრაფი |

> **Disable cache** სიმულირებს პირველ ვიზიტს — როცა მომხმარებელს არაფერი აქვს cache-ში. მეორე ვიზიტზე ფაილები cache-დან მოვა — ძალიან სწრაფი იქნება. **არ დაგავიწყდეთ გამორთვა** ტესტის შემდეგ!

---

## ეტაპი 9: ინსტრუმენტების შეჯამება

### 9.1 შეავსეთ ცხრილი

| სიტუაცია | საუკეთესო ინსტრუმენტი | რატომ? |
|----------|---------------------|--------|
| სწრაფი აუდიტი development-ში | Lighthouse | ერთ კლიკში ყველა კატეგორია |
| Production გვერდის რეალური წარმადობა | PSI (Field Data) | რეალური მომხმარებლების მონაცემები |
| ნელი ჩატვირთვის მიზეზის გარკვევა | Performance Tab | Flame chart, Long Tasks, Call Tree |
| გამოუყენებელი კოდის პოვნა | Coverage Tab | ხაზ-ხაზ მარკირება |
| Bundle ზომის ანალიზი | Bundle Analyzer | treemap ვიზუალიზაცია |
| სხვადასხვა ქვეყნიდან ტესტირება | WebPageTest | გეოგრაფიული ლოკაციები |
| FPS/scroll პრობლემები | Performance Tab → FPS ზოლი | frame drop ვიზუალიზაცია |
| Layout Thrashing-ის პოვნა | Performance Tab → Main Thread | იასამნისფერი Layout ზოლები |

---

## შეჯამება

```
Performance Tab-ის სექციები
┌─────────────────────────────────────────────┐
│  Timeline Overview                          │
│  ┌─────────────────────────────────────┐    │
│  │ FPS:  ███████░░░██████░░░░████████  │    │
│  │ CPU:  ░░██░░░░████░░░░░░██░░░░░░░   │    │
│  │ NET:  ██ ██ █████ ██ ███            │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  Main Thread (Flame Chart)                  │
│  ┌─────────────────────────────────────┐    │
│  │ ████████████  ████  ██████  ██      │    │
│  │  ████████      ██    ████           │    │
│  │   █████                             │    │
│  └─────────────────────────────────────┘    │
│  █ = JS  █ = Layout  █ = Paint             │
│  ▲ = Long Task (50ms+)                     │
│                                             │
│  ┌──────────┬──────────┬──────────┐         │
│  │ Bottom-Up│ Call Tree│ Event Log│         │
│  │ "ვინ     │ "ვინ ვის │ ქრონო-  │         │
│  │  დახარჯა │  გამოი-  │ ლოგიური │         │
│  │  დროს?"  │  ძახა?"  │ სია     │         │
│  └──────────┴──────────┴──────────┘         │
└─────────────────────────────────────────────┘
```

### მთავარი წესები:

1. **Long Task** (50ms+) = წითელი კუთხე Main Thread-ზე — იპოვეთ და გაასწორეთ
2. **Bottom-Up** — „დამნაშავე" ფუნქციის პოვნა (ყველაზე დიდი Self Time)
3. **Call Tree** — გამოძახების ჯაჭვის გაგება (ვინ ვის გამოიძახა)
4. **FPS ზოლი** — წითელი = frame drop = სქროლი „იჭრება"
5. **Coverage Tab** — წითელი ხაზი = გამოუყენებელი კოდი = code splitting-ის კანდიდატი
6. **Layout Thrashing** — იასამნისფერი Layout ზოლები = forced reflow = offsetHeight/offsetWidth
