# Web Performance & Core Web Vitals — ეტაპობრივი გაიდი

ამ პრაქტიკაში ნახავთ, როგორ მოქმედებს Web Performance პრობლემები მომხმარებლის გამოცდილებაზე. ჩვენ გვაქვს ორი პროექტი — `ცუდი-მაგალითი/` და `კარგი-მაგალითი/`, ასევე საშინაო დავალება `დავალების-პროექტი/`.

---

## წინაპირობა: პროექტების გაშვება

გახსენით ორი ტერმინალი და გაუშვით პროექტები სხვადასხვა პორტზე:

```bash
# ტერმინალი 1 — ცუდი მაგალითი
cd ~/Desktop/Web-optimization/კვირა-1/ლექცია-1-performance-და-core-web-vitals/ცუდი-მაგალითი
npx serve -l 3000
```

```bash
# ტერმინალი 2 — კარგი მაგალითი
cd ~/Desktop/Web-optimization/კვირა-1/ლექცია-1-performance-და-core-web-vitals/კარგი-მაგალითი
npx serve -l 3001
```

გახსენით ბრაუზერში:
- ცუდი: `http://localhost:3000`
- კარგი: `http://localhost:3001`

> **შენიშვნა:** ეს პროექტები არის vanilla HTML/CSS/JS დემონსტრაციისთვის. სხვა ლექციების React პროექტებისთვის გამოიყენება `npm install && npm run dev`.

---

## ეტაპი 1: პირველი შთაბეჭდილება — ჩატვირთვის სიჩქარე

### 1.1 ცუდი მაგალითის ჩატვირთვა

1. გახსენით `http://localhost:3000`
2. დააკვირდით — გვერდი ნელა იტვირთება, ცარიელი ეკრანი ჩანს რამდენიმე წამი
3. გახსენით **Console** (Cmd+Option+J) — ნახეთ ავტომატურად დაბეჭდილი მეტრიკები

> **რატომ არის ნელი?** head-ში არის render-blocking JavaScript (lodash.js — 70KB, moment.js — 300KB) `defer`/`async` ატრიბუტების გარეშე. ბრაუზერი ელოდება სანამ ეს სკრიპტები ჩამოიტვირთება და შესრულდება, მხოლოდ ამის შემდეგ აგრძელებს HTML-ის parsing-ს.

### 1.2 კარგი მაგალითის ჩატვირთვა

1. გახსენით `http://localhost:3001`
2. გვერდი თითქმის მაშინვე ჩანს!
3. Console-ში ნახეთ მეტრიკები — შეადარეთ ცუდ მაგალითს

> **რა შეიცვალა?** script-ებს `defer` ატრიბუტი აქვთ, critical CSS inline-შია, არ არის render-blocking რესურსები.

---

## ეტაპი 2: Network Tab — რესურსების ანალიზი

### 2.1 ცუდი მაგალითი — Network

1. გახსენით DevTools → **Network** tab
2. **Disable cache** მონიშნეთ (checkbox Network tab-ის ზედა ნაწილში)
3. Hard refresh: **Cmd+Shift+R**

### 2.2 რას ხედავთ Network Tab-ში?

| რას ეძებთ | სად ეძებთ | ცუდ მაგალითში |
|-----------|-----------|---------------|
| მოთხოვნების რაოდენობა | ქვედა ზოლი, "requests" | ბევრი — CDN ბიბლიოთეკები, დიდი სურათები |
| გადმოტანილი მონაცემები | ქვედა ზოლი, "transferred" | 20MB+ (10 სურათი x 2MB = ~20MB!) |
| ჩატვირთვის დრო | ქვედა ზოლი, "Finish" | ძალიან ნელი |
| ყველაზე დიდი ფაილები | **Size** სვეტი | სურათები w=3000 (თითოეული 1-3MB) |

### 2.3 კარგი მაგალითი — Network

1. გადადით `http://localhost:3001` tab-ზე
2. Network tab → Disable cache → **Cmd+Shift+R**

### 2.4 შედარება

| პარამეტრი | ცუდი | კარგი |
|-----------|------|-------|
| სურათის ზომა | w=3000 (~2MB) | w=600&q=75 (~50KB) |
| მთლიანი გვერდის ზომა | ~20MB+ | ~1MB |
| render-blocking რესურსები | lodash, moment, animate.css | არცერთი |
| სურათების lazy loading | არ არის | loading="lazy" |

### 2.5 ჩაინიშნეთ

| მეტრიკა | ცუდი (3000) | კარგი (3001) |
|---------|-------------|--------------|
| Requests | | |
| Transferred | | |
| Finish time | | |
| ყველაზე დიდი ფაილი | | |

---

## ეტაპი 3: CLS — Layout Shift-ის დაკვირვება

### 3.1 ცუდი მაგალითი — CLS პრობლემები

1. გახსენით `http://localhost:3000`
2. **ნელა** დააკვირდით ჩატვირთვას (Cmd+Shift+R)

**სამი CLS პრობლემას დაინახავთ:**

**პრობლემა 1: სურათები ზომების გარეშე**
- სურათებს HTML-ში `width`/`height` ატრიბუტები არ აქვთ
- სანამ სურათი ჩაიტვირთება, ბრაუზერმა არ იცის რამდენი ადგილი დაუთმოს
- ჩატვირთვისას კონტენტი „ხტება" ქვემოთ

**პრობლემა 2: ფონტის ჩანაცვლება**
- Google Fonts-ს `display=block` აქვს — ჯერ ტექსტი უხილავია
- ფონტის ჩატვირთვისას ტექსტის ზომა/spacing იცვლება

**პრობლემა 3: ბანერის ჩასმა**
- 2 წამის შემდეგ ბანერი ჩაისმება `#banner-container`-ში
- ადგილი არ არის დაჯავშნული — ქვემოთ მყოფი კონტენტი გადაინაცვლებს

Console-ში დაინახავთ:
```
❌ CLS: ბანერი ჩაისვა ადგილის დაჯავშნის გარეშე — layout shift!
❌ Layout Shift detected! Score: 0.XXXX, Total CLS: 0.XXXX
```

### 3.2 კარგი მაგალითი — CLS გადაწყვეტა

1. გახსენით `http://localhost:3001` → Cmd+Shift+R
2. დააკვირდით — არაფერი არ „ხტება"!

**გადაწყვეტები:**
- სურათებს აქვთ `width="280" height="200"` ატრიბუტები
- ფონტს `display=swap` აქვს — ჯერ system font ჩანს
- ბანერისთვის `min-height: 100px` დაჯავშნულია

---

## ეტაპი 4: LCP — ყველაზე დიდი ელემენტის ჩატვირთვა

### 4.1 Console-ში LCP-ის ნახვა

ორივე პროექტში Console-ში ჩანს:
```
LCP: XXXms — Element: <img ...> ან <h1 ...>
```

### 4.2 რა აგვიანებს LCP-ს ცუდ მაგალითში?

| მიზეზი | დეტალები |
|--------|----------|
| Render-blocking JS | lodash (70KB) + moment (300KB) head-ში defer-ის გარეშე |
| Render-blocking CSS | animate.css (80KB) + font-awesome (80KB) |
| CSS @import | styles.css-ში კიდევ ერთი font-ის import |
| მძიმე JS execution | heavyComputation() — 10M iteration ჩატვირთვისთანავე |
| დიდი სურათები | w=3000 — ყველა სურათი 1-3MB |

### 4.3 კარგ მაგალითში რა არის სხვანაირად?

| ოპტიმიზაცია | როგორ |
|-------------|-------|
| defer script | `<script src="script.js" defer>` |
| Critical CSS inline | მნიშვნელოვანი CSS `<style>` ტეგში |
| Non-critical CSS async | `media="print" onload="this.media='all'"` |
| პატარა სურათები | w=600&q=75 |
| preconnect | `<link rel="preconnect" href="...">` |
| font-display: swap | ჯერ system font, მერე custom |

---

## ეტაპი 5: Long Tasks — Main Thread-ის ბლოკირება

### 5.1 ცუდი მაგალითი — Long Tasks

1. გახსენით `http://localhost:3000`
2. DevTools → **Performance** tab
3. დააჭირეთ **Record** (ან **Cmd+E**)
4. ძებნის ველში აკრიფეთ რამე (მაგ. „პროდუქტი")
5. 5 წამის შემდეგ შეაჩერეთ Recording

### 5.2 რას ხედავთ Performance Tab-ში?

- **Main Thread**-ზე: გრძელი ყვითელი ზოლები **წითელი კუთხით** — ეს არის Long Tasks (50ms+)
- ყოველ keystroke-ზე `heavyComputation()` ეშვება — 200-500ms!
- 1000 row ხელახლა რენდერდება ყოველ ასოზე

> **Long Task** = ნებისმიერი ამოცანა, რომელიც main thread-ს **50ms-ზე მეტხანს** იკავებს. ამ დროს მომხმარებელი ვერ ასქროლებს, ვერ კლიკავს — გვერდი „გაყინულია".

### 5.3 კარგი მაგალითი — Long Tasks არ არის

1. გახსენით `http://localhost:3001`
2. Performance tab → Record → აკრიფეთ ძებნის ველში → Stop

**განსხვავება:**
- `debounce(300ms)` — 300ms პაუზის შემდეგ ძებნა
- მხოლოდ 50 row ჩანს ერთდროულად (pagination)
- არ არის heavyComputation()
- `Intl.DateTimeFormat` — moment.js-ის ნაცვლად (0KB)

### 5.4 ჩაინიშნეთ — Performance Tab

| მეტრიკა | ცუდი | კარგი |
|---------|------|-------|
| Long Tasks რაოდენობა | | |
| ყველაზე გრძელი task (ms) | | |
| keystroke-ზე რეაგირების დრო | | |
| FPS ძებნის დროს | | |

---

## ეტაპი 6: დავალების პროექტი — TravelGeorgia

`დავალების-პროექტი/` არის სატესტო პროექტი, რომელიც უნდა გაანალიზოთ და გაასწოროთ.

### 6.1 გაშვება

```bash
cd ~/Desktop/Web-optimization/კვირა-1/ლექცია-1-performance-და-core-web-vitals/დავალების-პროექტი
npx serve -l 3002
```

გახსენით: `http://localhost:3002`

### 6.2 პრობლემების პოვნა

გამოიყენეთ ის, რაც ამ ლექციაში ისწავლეთ, და იპოვეთ:

| კატეგორია | რას ეძებთ | სად ეძებთ |
|-----------|-----------|-----------|
| LCP | რა ანელებს LCP-ს? | Network tab, Console |
| CLS | სად არის layout shift? | თვალით + Console |
| Long Tasks | რომელი ფუნქცია ბლოკავს? | Performance tab |
| Page Size | რამდენად დიდია გვერდი? | Network tab ქვედა ზოლი |
| Render-blocking | რა ბლოკავს რენდერინგს? | HTML head-ის ანალიზი |

### 6.3 პრობლემების სია (შეავსეთ)

| # | პრობლემა | კატეგორია | როგორ გავასწორო? |
|---|----------|-----------|-----------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |
| 7 | | | |
| 8 | | | |

> **მინიშნება:** scroll event handler-ში `computeDistanceMatrix()` იძახება ყოველ scroll-ზე — ეს იწვევს frame drop-ებს. Console-ში აკრიფეთ სრული პრობლემების სია.

---

## შეჯამება

```
ცუდი მაგალითი                          კარგი მაგალითი
┌────────────────────────┐             ┌────────────────────────┐
│ Render-blocking JS/CSS │             │ defer + async CSS      │
│ სურათები w=3000        │             │ სურათები w=600         │
│ img ზომების გარეშე     │             │ width + height         │
│ ბანერი ადგილის გარეშე  │             │ min-height reserved    │
│ font-display: block    │             │ font-display: swap     │
│ No lazy loading        │             │ loading="lazy"         │
│ No debounce            │             │ debounce(300ms)        │
│ 1000 row ერთდროულად   │             │ Pagination (50 row)    │
│ moment.js (300KB)      │             │ Intl.DateTimeFormat    │
│ lodash (70KB)          │             │ Native JS              │
│ heavyComputation()     │             │ არ არის Long Tasks     │
└────────────────────────┘             └────────────────────────┘
```

### მთავარი წესები:

1. **LCP** — მოხსენით render-blocking რესურსები (`defer`, critical CSS inline, `preconnect`)
2. **CLS** — ყველა სურათს/ვიდეოს მიუთითეთ `width` და `height`, ბანერებს ადგილი დაუჯავშნეთ
3. **INP/TBT** — არ ბლოკოთ main thread (debounce, pagination, Web Workers)
4. **Page Size** — შეამცირეთ სურათები, მოაშორეთ ზედმეტი ბიბლიოთეკები
5. **Long Tasks** — Performance tab-ში წითელი კუთხე = 50ms+ ბლოკი, იპოვეთ და გაასწორეთ
