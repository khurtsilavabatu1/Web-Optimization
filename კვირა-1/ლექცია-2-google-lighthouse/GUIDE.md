# Google Lighthouse — ეტაპობრივი გაიდი

ამ პრაქტიკაში ისწავლით Lighthouse-ის გამოყენებას. ჩვენ გვაქვს სამი პროექტი:
- `ცუდი-პროექტი/` — განზრახ ცუდი, პრობლემებით სავსე
- `გასწორებული-პროექტი/` — იგივე გვერდი, ოპტიმიზირებული
- `დავალების-პროექტი/` — საშინაო დავალება (FoodExpress)

---

## წინაპირობა: პროექტების გაშვება

```bash
# ტერმინალი 1 — ცუდი პროექტი
cd ~/Desktop/Web-optimization/კვირა-1/ლექცია-2-google-lighthouse/ცუდი-პროექტი
npx serve -l 3000
```

```bash
# ტერმინალი 2 — გასწორებული პროექტი
cd ~/Desktop/Web-optimization/კვირა-1/ლექცია-2-google-lighthouse/გასწორებული-პროექტი
npx serve -l 3001
```

გახსენით **Incognito** ფანჯარაში (Cmd+Shift+N):
- ცუდი: `http://localhost:3000`
- გასწორებული: `http://localhost:3001`

> **რატომ Incognito?** ბრაუზერის extension-ები (AdBlock, Grammarly, React DevTools) ამატებენ DOM ელემენტებს, ასრულებენ სკრიპტებს და ხელოვნურად ანელებენ გვერდს. Incognito-ში extension-ები გამორთულია — „სუფთა" შედეგს ვიღებთ.

> **შენიშვნა:** ეს პროექტები არის vanilla HTML/CSS/JS დემონსტრაციისთვის. სხვა ლექციების React პროექტებისთვის გამოიყენება `npm install && npm run dev`.

---

## ეტაპი 1: Lighthouse-ის გაშვება — ცუდ პროექტზე

### 1.1 გახსენით Lighthouse Tab

1. გახსენით `http://localhost:3000` Incognito-ში
2. DevTools → **Lighthouse** tab (Cmd+Option+I)
3. კონფიგურაცია:
   - **Mode:** Navigation
   - **Categories:** ყველა მონიშნეთ (Performance, Accessibility, Best Practices, SEO)
   - **Device:** Mobile
4. დააჭირეთ **"Analyze page load"**

### 1.2 რას ნახავთ — Performance ქულა

ქულა ძალიან დაბალი იქნება (სავარაუდოდ 20-40 დიაპაზონში). ეს ნორმალურია — ეს პროექტი განზრახ ცუდია!

**Performance მეტრიკები** (ზედა წრის ქვემოთ):

| მეტრიკა | წონა | რას ნიშნავს | რა იქნება ცუდ პროექტში |
|---------|------|------------|----------------------|
| FCP | 10% | პირველი კონტენტის გამოჩენა | ნელი — render-blocking JS |
| Speed Index | 10% | ვიზუალური შევსების სიჩქარე | ნელი |
| LCP | 25% | ყველაზე დიდი ელემენტის გამოჩენა | ნელი — blocking + big image |
| TBT | 30% | Main thread-ის ბლოკის ჯამი | მაღალი — heavyComputation() |
| CLS | 25% | Layout shift-ების ჯამი | მაღალი — img ზომების გარეშე |

### 1.3 ჩაინიშნეთ ქულები

| კატეგორია | ქულა (ცუდი) |
|-----------|------------|
| Performance | |
| Accessibility | |
| Best Practices | |
| SEO | |

---

## ეტაპი 2: Lighthouse ანგარიშის სექციების ანალიზი

### 2.1 Opportunities (შესაძლებლობები)

ეს სექცია გიჩვენებს **კონკრეტულ რეკომენდაციებს** დაზოგილი დროის მითითებით. ცუდ პროექტში დაინახავთ:

| Opportunity | რას ნიშნავს | მიახლოებითი savings |
|-------------|------------|-------------------|
| Eliminate render-blocking resources | script.js head-ში defer-ის გარეშე | 1-2s |
| Properly size images | 1920x1080 სურათი viewport-ის ზომის ნაცვლად | 0.5-1s |
| Reduce unused CSS | style.css-ში ბევრი გამოუყენებელი წესი | 0.3s |
| Reduce unused JavaScript | dead code ფუნქციები | 0.2s |

> **Savings** — ეს არის მიახლოებითი შეფასება, რამდენ დროს დაზოგავთ ამ ცვლილების გაკეთებით. ეს არ არის ზუსტი რიცხვი — Lighthouse ლაბორატორიულ პირობებში ზომავს.

### 2.2 Diagnostics (დიაგნოსტიკა)

დიაგნოსტიკის სექცია დამატებით ტექნიკურ ინფორმაციას აძლევს. ცუდ პროექტში ნახავთ:

- **Avoid an excessive DOM size** — 200 კომენტარი, თითოეული 6-7 wrapper div-ით = 1500+ DOM ელემენტი
- **Minimize main-thread work** — heavyComputation() + generateComments()
- **Reduce JavaScript execution time** — blocking script head-ში

### 2.3 Accessibility პრობლემები

Lighthouse-ის Accessibility სექციაში ცუდ პროექტში ბევრ პრობლემას დაინახავთ:

| პრობლემა | სად არის | რატომ არის ცუდი |
|----------|---------|----------------|
| `<html>` lang ატრიბუტის გარეშე | index.html ხაზი 1 | Screen reader-მა არ იცის რა ენაზეა |
| `<img>` alt ატრიბუტის გარეშე | hero image | ბრმა მომხმარებელი ვერ გაიგებს რა არის |
| Low contrast text | `.low-contrast` — #ccc on #ddd | წაუკითხავი ტექსტი |
| Heading level skip | h1 არ არის, h3-დან იწყება | სტრუქტურის დარღვევა |
| Form inputs without labels | newsletter inputs | Screen reader ვერ ეტყვის რა ველია |
| Button without accessible name | `<button></button>` — ცარიელი | რა ღილაკია? |
| Link without discernible text | `<a href="#"><img ...></a>` | სად მიდის? |

### 2.4 SEO პრობლემები

| პრობლემა | რატომ |
|----------|-------|
| Missing `<meta viewport>` | მობილურზე არ იმუშავებს სწორად |
| Missing `<meta description>` | Google-ს არ ექნება საიტის აღწერა |
| Missing `<title>` | Tab-ში სათაური არ ჩანს |
| Non-descriptive link text | „დააჭირეთ აქ" — SEO-სთვის ცუდია |

### 2.5 Best Practices პრობლემები

| პრობლემა | სად არის |
|----------|---------|
| console.error | script.js-ში `console.error('Configuration error...')` |
| `document.write()` | index.html-ის ბოლოში inline script |
| Links to cross-origin without `rel="noopener"` | footer-ში Facebook/Instagram ლინკები |

---

## ეტაპი 3: Lighthouse — გასწორებულ პროექტზე

### 3.1 გაშვება

1. გახსენით `http://localhost:3001` Incognito-ში
2. Lighthouse tab → Navigation, ყველა კატეგორია, Mobile
3. **"Analyze page load"**

### 3.2 რა შეიცვალა?

ქულა მნიშვნელოვნად მაღალი იქნება. შეადარეთ:

| კატეგორია | ცუდი | გასწორებული | რა შეიცვალა |
|-----------|------|------------|-------------|
| Performance | | | defer, critical CSS, image optimization |
| Accessibility | | | lang, alt, labels, contrast, headings |
| Best Practices | | | no console.error, no document.write, rel="noopener" |
| SEO | | | title, description, viewport, semantic links |

### 3.3 რა ცვლილებები გაკეთდა HTML-ში?

გახსენით ორივე `index.html` და შეადარეთ:

```html
<!-- ❌ ცუდი -->
<html>
<head>
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
</head>

<!-- ✅ გასწორებული -->
<html lang="ka">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="GeorgiaNews — ...">
    <title>GeorgiaNews — ...</title>
    <style>/* critical CSS inline */</style>
    <link rel="stylesheet" href="style.css" media="print" onload="this.media='all'">
    <script src="script.js" defer></script>
</head>
```

### 3.4 სემანტიკური HTML

```html
<!-- ❌ ცუდი — div ყველგან -->
<div class="header">
    <div class="nav">
        <a href="#">მთავარი</a>
    </div>
</div>
<h3>სტატიები</h3>

<!-- ✅ გასწორებული — სემანტიკური ელემენტები -->
<header>
    <nav aria-label="მთავარი ნავიგაცია">
        <a href="#">მთავარი</a>
    </nav>
</header>
<main id="main-content">
    <h1>სტატიები</h1>
</main>
<footer>...</footer>
```

### 3.5 JavaScript-ის ოპტიმიზაცია

```javascript
// ❌ ცუდი — 200 კომენტარი, თითოეული ცალკე appendChild
for (let i = 0; i < 200; i++) {
    container.appendChild(comment);
}

// ✅ გასწორებული — 20 კომენტარი, DocumentFragment, requestIdleCallback
const fragment = document.createDocumentFragment();
for (let i = 0; i < 20; i++) {
    fragment.appendChild(comment);
}
container.appendChild(fragment);
```

---

## ეტაპი 4: Lighthouse რეჟიმების გაგება

### 4.1 Navigation (Default)

ეს არის ის რეჟიმი, რომელიც გამოვიყენეთ. გვერდს თავიდან ტვირთავს და ზომავს ყველაფერს.

### 4.2 Timespan — სცადეთ!

1. Lighthouse tab → **Mode: Timespan**
2. დააჭირეთ **"Start timespan"**
3. გვერდზე **დასქროლეთ**, დააკლიკეთ ელემენტებს — 10 წამი
4. დააჭირეთ **"End timespan"**
5. ნახეთ შედეგები — INP და CLS ინტერაქციის დროს

> **Timespan** გამოსადეგია SPA აპლიკაციებში — სადაც გვერდი ერთხელ იტვირთება და შემდეგ მომხმარებელი შიგნით მოქმედებს.

### 4.3 Snapshot

1. Lighthouse tab → **Mode: Snapshot**
2. **"Analyze page state"**
3. ნახეთ — Performance ქულა არ არის, მხოლოდ Accessibility, SEO, Best Practices

> **Snapshot** — მიმდინარე მდგომარეობის ფოტო. გამოსადეგია Accessibility-ის სწრაფი შემოწმებისთვის.

---

## ეტაპი 5: Lab Data vs Field Data

### 5.1 რა განსხვავებაა?

| | Lab Data | Field Data |
|---|----------|-----------|
| **წყარო** | Lighthouse (შენს კომპიუტერზე) | Chrome User Experience Report (CrUX) |
| **მომხმარებლები** | სიმულაცია | რეალური ვიზიტორები |
| **მოწყობილობა** | სიმულირებული Mobile/Desktop | ათასობით სხვადასხვა მოწყობილობა |
| **ქსელი** | სიმულირებული 4G | რეალური — Wi-Fi, 3G, 5G... |
| **სად ვნახავთ** | DevTools Lighthouse tab | PageSpeed Insights (ლექცია 3) |
| **localhost** | შეიძლება | არ შეიძლება |

### 5.2 რატომ განსხვავდება ქულები?

- Lighthouse ყოველ გაშვებაზე ოდნავ სხვა ქულას იძლევა
- CPU-ს დატვირთვა, ქსელის მდგომარეობა იცვლება
- **გაუშვით 3-ჯერ და აიღეთ საშუალო**

### 5.3 Mobile vs Desktop

გაუშვით Lighthouse ორივე Device-ით:

| კატეგორია | Mobile | Desktop |
|-----------|--------|---------|
| Performance | | |

> **Mobile ყოველთვის უფრო დაბალია** — Lighthouse CPU-ს 4x-ით ანელებს და ნელი 4G-ს სიმულაციას აკეთებს. Desktop-ზე ეს შეზღუდვები არ არის.

---

## ეტაპი 6: დავალების პროექტი — FoodExpress

### 6.1 გაშვება

```bash
cd ~/Desktop/Web-optimization/კვირა-1/ლექცია-2-google-lighthouse/დავალების-პროექტი
npx serve -l 3002
```

### 6.2 დავალება

1. გაუშვით Lighthouse **Mobile** რეჟიმში `http://localhost:3002`-ზე
2. ჩაინიშნეთ ქულები:

| კატეგორია | ქულა |
|-----------|------|
| Performance | |
| Accessibility | |
| Best Practices | |
| SEO | |

3. Opportunities სექციიდან ჩამოწერეთ ტოპ 5 რეკომენდაცია
4. Accessibility სექციიდან ჩამოწერეთ ტოპ 5 პრობლემა
5. გახსენით `index.html`, `script.js`, `style.css` და იპოვეთ ეს პრობლემები კოდში

### 6.3 ბონუს: გაასწორეთ!

შეეცადეთ გაასწოროთ რაც შეიძლება მეტი პრობლემა და ისევ გაუშვით Lighthouse. რამდენით გაუმჯობესდა ქულა?

---

## შეჯამება

```
Lighthouse ანგარიშის სექციები
┌─────────────────────────────────┐
│ Performance Score (0-100)       │
│   FCP (10%) + SI (10%)          │
│   LCP (25%) + TBT (30%)        │
│   CLS (25%)                    │
├─────────────────────────────────┤
│ Opportunities                   │
│   კონკრეტული რეკომენდაციები     │
│   + დაზოგილი დროის შეფასება      │
├─────────────────────────────────┤
│ Diagnostics                     │
│   DOM size, JS execution time   │
│   Critical request chains       │
├─────────────────────────────────┤
│ Passed Audits                   │
│   რა არის უკვე კარგად           │
└─────────────────────────────────┘
```

### მთავარი წესები:

1. **Incognito** რეჟიმში გაუშვით — extension-ები ხელს უშლის
2. **3-5-ჯერ** გაუშვით — საშუალო ქულა უფრო სანდოა
3. **Mobile** ქულა უფრო რეალისტურია — Desktop „ოპტიმისტურია"
4. **Opportunities** — პრიორიტეტულად გაასწორეთ ის, რაც ყველაზე მეტ დროს ზოგავს
5. **Passed Audits** — ნუ გააუარესებთ იმას, რაც უკვე კარგად მუშაობს
