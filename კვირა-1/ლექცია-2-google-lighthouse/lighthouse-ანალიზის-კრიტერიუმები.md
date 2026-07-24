# Lighthouse Navigation ანალიზის კრიტერიუმები

Lighthouse Navigation რეჟიმში გვერდს თავიდან ტვირთავს და აანალიზებს 4 კატეგორიით. ქვემოთ მოცემულია ყველა კრიტერიუმი, რომელსაც ამოწმებს.

---

## 1. Performance

Performance კატეგორია ზომავს გვერდის სიჩქარეს და რეაგირებას. ქულა გამოითვლება 5 მეტრიკის მიხედვით (წონები):

### მეტრიკები (ქულის გამოთვლა):

| მეტრიკა | წონა | რას ზომავს | კარგი | ცუდი |
|---------|------|-----------|-------|------|
| FCP (First Contentful Paint) | 10% | პირველი კონტენტის (ტექსტი, სურათი) გამოჩენის დრო | < 1.8s | > 3.0s |
| Speed Index | 10% | რამდენად სწრაფად ივსება ეკრანი ვიზუალურად | < 3.4s | > 5.8s |
| LCP (Largest Contentful Paint) | 25% | ყველაზე დიდი ელემენტის (hero სურათი, სათაური) გამოჩენის დრო | < 2.5s | > 4.0s |
| TBT (Total Blocking Time) | 30% | main thread-ის დაბლოკვის ჯამური დრო (50ms+ ამოცანები) | < 200ms | > 600ms |
| CLS (Cumulative Layout Shift) | 25% | რამდენად "ხტება" კონტენტი ჩატვირთვისას | < 0.1 | > 0.25 |

### Insights (ინსაითები):

Lighthouse-ი აჩვენებს კონკრეტულ პრობლემებს და რეკომენდაციებს. ყოველ ინსაითზე წერია რომელ მეტრიკას ეხება (FCP, LCP, TBT, CLS).

#### Render-blocking requests
**რას ამოწმებს:** `<head>`-ში არის თუ არა CSS/JS ფაილები, რომლებიც ბლოკავენ გვერდის ჩვენებას.
**რა არის პრობლემა:** ბრაუზერი ელოდება ამ ფაილების ჩამოტვირთვას და შესრულებას — მომხმარებელი ცარიელ ეკრანს ხედავს.
**როგორ აჩვენებს:** ჩამოთვლის blocking ფაილებს, მათ ზომას (KiB) და Duration-ს (ms).
**ეხება:** FCP, LCP

#### Layout shift culprits
**რას ამოწმებს:** რომელმა ელემენტებმა გამოიწვია "მოხტომა" გვერდის ჩატვირთვისას.
**რა არის პრობლემა:** სურათები/ელემენტები ზომის გარეშე ჩნდება, ქვემოთ მყოფი კონტენტი გადაიწევა.
**როგორ აჩვენებს:** ჩამოთვლის ელემენტებს (მაგ. `div.newsletter`) და მათ shift score-ს. "Unsized image element" ნიშნავს სურათს width/height-ის გარეშე.
**ეხება:** CLS

#### LCP request discovery
**რას ამოწმებს:** LCP ელემენტი (ყველაზე დიდი) რამდენად ადრე აღმოაჩინა ბრაუზერმა.
**3 შემოწმება:**
- `fetchpriority=high should be applied` — LCP სურათს უნდა ჰქონდეს მაღალი პრიორიტეტი
- `Request is discoverable in initial document` — სურათის URL HTML-ში პირდაპირ წერია (არა JS-ით ჩასმული)
- `LCP resources should not use loading=lazy` — LCP სურათს არ უნდა ჰქონდეს lazy loading
**ეხება:** LCP

#### LCP breakdown
**რას ამოწმებს:** LCP დროის 4 კომპონენტს:
- **Time to first byte** — სერვერის პასუხის დრო
- **Resource load delay** — სურათის აღმოჩენიდან ჩამოტვირთვის დაწყებამდე
- **Resource load duration** — თავად სურათის ჩამოტვირთვის დრო
- **Element render delay** — ჩამოტვირთვიდან ეკრანზე გამოჩენამდე
**როგორ აჩვენებს:** თითოეული კომპონენტის Duration (ms). იდეალურია როცა დროის უმეტესობა Resource load duration-ზე იხარჯება, არა delay-ებზე.
**ეხება:** LCP

#### Network dependency tree
**რას ამოწმებს:** Critical Request Chains — რესურსების ჩატვირთვის თანმიმდევრობას.
**რა არის პრობლემა:** თუ რესურსები ერთმანეთზე თანმიმდევრულად არის დამოკიდებული (HTML → CSS → font → image), თითოეული წინას ელოდება.
**როგორ აჩვენებს:** ხისებური სტრუქტურით — რომელი ფაილი რომელზე არის დამოკიდებული, თითოეულის ზომა და ხანგრძლივობა. Maximum critical path latency (ms) — ყველაზე ნელი გზა.
**ეხება:** LCP

#### Document request latency
**რას ამოწმებს:** თავად HTML დოკუმენტის ჩამოტვირთვის ეფექტურობას.
**3 შემოწმება:**
- **Avoids redirects** — URL-ი პირდაპირ მიდის გვერდზე, არ გადამისამართდება
- **Server responds quickly** — სერვერის პასუხის დრო (ms)
- **Compression applied** — HTML gzip/brotli-თი შეკუმშულია
**ეხება:** FCP, LCP

#### Improve image delivery
**რას ამოწმებს:** სურათები ოპტიმალური ზომისა და ფორმატისაა თუ არა.
**რა არის პრობლემა:** სურათი უფრო დიდია ვიდრე ეკრანზე ჩანს, ან JPEG/PNG ფორმატია WebP/AVIF-ის ნაცვლად.
**როგორ აჩვენებს:** ჩამოთვლის სურათებს, მათ ზომას (Resource Size) და რამდენი დაიზოგება (Est Savings).
**ეხება:** FCP, LCP

#### Optimize viewport for mobile
**რას ამოწმებს:** `<meta name="viewport">` ტეგის არსებობას.
**რა არის პრობლემა:** ამის გარეშე მობილურზე ყოველი tap 300ms დაგვიანდება, რადგან ბრაუზერი double-tap zoom-ს ელოდება.
**ეხება:** Unscored (ქულაში არ ითვლება, მაგრამ მნიშვნელოვანია)

#### Minify CSS / Minify JavaScript
**რას ამოწმებს:** CSS/JS ფაილები შეკუმშულია თუ არა (ზედმეტი space-ები, კომენტარები წაშლილია).
**როგორ აჩვენებს:** ფაილის ზომა და Est Savings.
**ეხება:** FCP, LCP

#### Avoid long main-thread tasks
**რას ამოწმებს:** არის თუ არა 50ms-ზე მეტხანს მომუშავე ამოცანები main thread-ზე.
**როგორ აჩვენებს:** ჩამოთვლის ამოცანებს ფაილის სახელით, Start Time-ით და Duration-ით. "Unattributable" ნიშნავს ბრაუზერის შიდა სამუშაო.
**შეზღუდვა:** მხოლოდ ფაილის სახელს აჩვენებს, კონკრეტულ ფუნქციას — არა. ფუნქციის დონეზე ანალიზისთვის DevTools Performance tab გჭირდება.
**ეხება:** TBT

#### 3rd parties
**რას ამოწმებს:** მესამე მხარის სკრიპტების (analytics, ads, fonts) გავლენას.
**როგორ აჩვენებს:** ჩამოთვლის third-party დომენებს, მათ transfer size-ს და main thread blocking time-ს.

---

## 2. Accessibility (ქულა: 0-100)

Accessibility ამოწმებს რამდენად ხელმისაწვდომია გვერდი ყველა ადამიანისთვის, განსაკუთრებით შეზღუდული შესაძლებლობების მქონეთათვის (უსინათლოები, სმენადაქვეითებულები, მოტორული შეზღუდვები).

### Names and Labels (სახელები და ლეიბლები):

| შემოწმება | რას ამოწმებს |
|----------|-------------|
| Buttons have accessible name | ღილაკებს აქვთ ტექსტი ან aria-label (screen reader-მა იცის რა აკეთებს) |
| Image elements have `[alt]` | სურათებს აქვთ alt ატრიბუტი (screen reader-ი აღწერს სურათს) |
| Document has `<title>` | გვერდს აქვს სათაური (tab-ზე ჩანს, screen reader-ი პირველად ამას კითხულობს) |
| Links have discernible name | ლინკებს აქვთ ტექსტი (არა ცარიელი `<a><img></a>`) |
| Form elements have labels | input-ებს აქვთ label (screen reader-მა იცის რისთვისაა) |
| `<input type="image">` has alt | სურათიანი ღილაკებს აქვთ აღწერა |
| Select elements have labels | dropdown-ებს აქვთ label |

### Contrast (კონტრასტი):

| შემოწმება | რას ამოწმებს |
|----------|-------------|
| Sufficient contrast ratio | ტექსტის ფერი საკმარისად განსხვავდება ფონისგან (მინიმუმ 4.5:1 ჩვეულებრივი ტექსტისთვის) |

### Internationalization and Localization:

| შემოწმება | რას ამოწმებს |
|----------|-------------|
| `<html>` has `[lang]` attribute | ბრაუზერმა და screen reader-მა იცის რა ენაზეა საიტი |
| `[lang]` values are valid | lang ატრიბუტის მნიშვნელობა ვალიდურია (მაგ. "ka", "en") |

### Navigation:

| შემოწმება | რას ამოწმებს |
|----------|-------------|
| Heading elements in order | სათაურების თანმიმდევრობა სწორია (h1 → h2 → h3, არა h1 → h4) |
| `[tabindex]` not > 0 | Tab-ის თანმიმდევრობა ხელოვნურად არ არის შეცვლილი |
| `[accesskey]` values unique | კლავიატურის shortcut-ები არ მეორდება |
| Skip links are focusable | "skip to content" ლინკი მუშაობს |

### ARIA:

| შემოწმება | რას ამოწმებს |
|----------|-------------|
| ARIA attributes match roles | ARIA ატრიბუტები სწორ ელემენტებზეა |
| ARIA IDs are unique | ARIA ID-ები არ მეორდება |
| `[role]` values are valid | role-ების მნიშვნელობები ვალიდურია |
| `aria-hidden` no focusable children | დამალულ ელემენტებში ფოკუსირებადი ელემენტი არ არის |

### Additional Items to Manually Check:

ეს Lighthouse-მა ავტომატურად ვერ შეამოწმა — ადამიანმა უნდა გადახედოს:
- Interactive controls are keyboard focusable — ელემენტებს Tab-ით მიაღწევს?
- Interactive elements indicate their purpose — ღილაკზე ჩანს რომ ღილაკია?
- Logical tab order — Tab ლოგიკური თანმიმდევრობით გადადის?
- Visual order follows DOM order — ვიზუალური განლაგება HTML-ის თანმიმდევრობას ემთხვევა?
- User focus is not trapped — ფოკუსი არ "იჭედება" რომელიმე სექციაში?
- HTML5 landmark elements — გამოყენებულია `<header>`, `<nav>`, `<main>`, `<footer>`?

---

## 3. Best Practices (ქულა: 0-100)

### Trust and Safety (უსაფრთხოება):

| შემოწმება | რას ამოწმებს |
|----------|-------------|
| Uses HTTPS | საიტი უსაფრთხო კავშირს იყენებს |
| CSP against XSS | Content Security Policy ხელს უშლის მავნე სკრიპტების ჩასმას |
| Strong HSTS policy | სერვერი აიძულებს მხოლოდ HTTPS-ის გამოყენებას |
| Origin isolation (COOP) | გვერდი იზოლირებულია სხვა საიტებისგან |
| Clickjacking protection | სხვა საიტი ვერ ჩასვამს თქვენს გვერდს iframe-ში |

### User Experience:

| შემოწმება | რას ამოწმებს |
|----------|-------------|
| Images with correct resolution | სურათების რეზოლუცია შეესაბამება ეკრანის ზომას (არა ძალიან პატარა, არა ძალიან დიდი) |
| Images with correct aspect ratio | სურათები არ არის გაწელილი/შეკუმშული |
| Avoids deprecated APIs | მოძველებული ბრაუზერის API-ები არ გამოიყენება |
| No console errors | console-ში error-ები არ არის (ნიშნავს რაღაც არასწორად მუშაობს) |
| Allows pasting into inputs | მომხმარებელს შეუძლია paste-ის გაკეთება input-ებში |
| No geolocation on load | ადგილმდებარეობას არ ითხოვს ჩატვირთვისთანავე |
| No notification on load | შეტყობინებების უფლებას არ ითხოვს ჩატვირთვისთანავე |

### Browser Compatibility:

| შემოწმება | რას ამოწმებს |
|----------|-------------|
| Baseline Features | რა ტექნოლოგიებს იყენებს გვერდი და რამდენად ფართოდ არის მხარდაჭერილი ბრაუზერებში |

სტატუსები:
- **Widely Available** — ყველა ბრაუზერში მუშაობს (უსაფრთხოა)
- **Newly Available** — ახლახან დაემატა, ძველ ვერსიებზე არ მუშაობს
- **Limited Availability** — ყველა ბრაუზერს ჯერ არ აქვს

### General:

| შემოწმება | რას ამოწმებს |
|----------|-------------|
| Page has HTML doctype | `<!DOCTYPE html>` არსებობს |
| Properly defines charset | `<meta charset="utf-8">` არსებობს |
| Valid source maps | source map ფაილები ვალიდურია |
| No issues in DevTools Issues panel | Chrome DevTools-ის Issues პანელი ცარიელია |
| HTTPS redirects | HTTP → HTTPS გადამისამართება მუშაობს |

---

## 4. SEO (ქულა: 0-100)

### Content Best Practices:

| შემოწმება | რას ამოწმებს | რატომ არის მნიშვნელოვანი |
|----------|-------------|------------------------|
| Document has `<title>` | `<title>` ტეგი არსებობს | Google-ის ძიებაში ეს სათაური ჩანს |
| Document has meta description | `<meta name="description">` არსებობს | ძიების შედეგში სათაურის ქვემოთ ეს ტექსტი ჩანს |
| Images have `[alt]` | სურათებს alt ატრიბუტი აქვთ | Google Images ინდექსირებისთვის |
| Links have descriptive text | ლინკების ტექსტი აღწერითია | Google-ს ესმის სად მიდის ლინკი |
| Page not blocked from indexing | `noindex` არ არის | Google-ს შეუძლია გვერდის ინდექსირება |
| HTTP status code successful | გვერდი 200 კოდს აბრუნებს | 404/500 გვერდებს Google არ ინდექსირებს |
| Links are crawlable | ლინკებს Google-ის ბოტი მიჰყვება | JS-ით დინამიურად შექმნილ ლინკებს ბოტი ვერ ხედავს |
| Valid hreflang | მრავალენოვანი ტეგები სწორია | Google-მა იცის რომელი ენის ვერსია რომელ ქვეყანას აჩვენოს |
| Valid robots.txt | robots.txt ფაილი ვალიდურია | ეუბნება Google-ს სად შეუძლია და სად არ შეუძლია შესვლა |
| Valid rel=canonical | canonical ტეგი სწორია | Google-მა იცის დუბლიკატებს შორის ორიგინალი რომელია |

### Structured Data (ხელით შესამოწმებელი):

Lighthouse ვერ ამოწმებს structured data-ს ავტომატურად — გთავაზობს გამოიყენოთ Google-ის Structured Data Testing Tool ან Rich Results Test.

---

## ქულების ინტერპრეტაცია (ყველა კატეგორიისთვის):

| ქულა | ფერი | მნიშვნელობა |
|------|------|-------------|
| 90-100 | მწვანე | კარგი |
| 50-89 | ყვითელი | საჭიროა გაუმჯობესება |
| 0-49 | წითელი | ცუდი |

## ანგარიშის სექციების ტიპები:

| ტიპი | აღნიშვნა | მნიშვნელობა |
|------|---------|-------------|
| ▲ წითელი | Failed | ვერ ჩააბარა — აუცილებლად გასასწორებელი |
| ■ ყვითელი | Warning | გასაუმჯობესებელი |
| ● მწვანე | Passed | ჩააბარა |
| ○ ნაცრისფერი | Manual check / Not applicable | ხელით შესამოწმებელი ან არ ეხება |
