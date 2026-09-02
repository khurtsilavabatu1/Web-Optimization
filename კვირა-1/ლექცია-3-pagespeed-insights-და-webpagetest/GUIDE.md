# PageSpeed Insights & WebPageTest — ეტაპობრივი გაიდი

ამ პრაქტიკაში ისწავლით სამი ინსტრუმენტის შედარებას: Lighthouse, PageSpeed Insights (PSI) და WebPageTest. ჩვენ გვაქვს demo პროექტი — `demo-performance-analysis/`, რომელიც არის TechStore — Vite + React აპლიკაცია განზრახ არაოპტიმიზირებული performance-ის პრობლემებით.

---

## წინაპირობა: Demo პროექტის გაშვება

```bash
cd ~/Desktop/Web-optimization/კვირა-1/ლექცია-3-pagespeed-insights-და-webpagetest/demo-performance-analysis
npm install
npm run dev
```

გახსენით ბრაუზერში: `http://localhost:5173` (Vite-ის default პორტი)

> **შენიშვნა:** PageSpeed Insights და WebPageTest მხოლოდ პუბლიკურ URL-ებზე მუშაობს — localhost-ზე ვერ გაუშვებთ. ამიტომ ამ პრაქტიკაში demo პროექტს DevTools-ით გავაანალიზებთ, ხოლო PSI და WebPageTest-ს რეალურ საიტებზე (მაგ. web.dev, tbc.ge) გავცდით.

> **რა არის demo-performance-analysis?** React + Vite აპლიკაცია TechStore-ის მაღაზიით, რომელიც შეიცავს ტიპურ performance anti-patterns: render-blocking რესურსები, გამოუყენებელი CSS/JS, დიდი სურათები, Long Tasks და სხვა. ამ პრობლემების ანალიზით ისწავლით DevTools-ის გამოყენებას.

---

## ეტაპი 1: Demo პროექტის ანალიზი DevTools-ით

### 1.1 Network Tab — რესურსების ანალიზი

1. გახსენით `http://localhost:3000`
2. DevTools → **Network** tab
3. **Disable cache** მონიშნეთ
4. Hard refresh: **Cmd+Shift+R**

### 1.2 რას ხედავთ Network Tab-ში?

დააკვირდით:

| რას ვეძებთ | სად ვეძებთ | რას დაინახავთ |
|-----------|-----------|---------------|
| მოთხოვნების რაოდენობა | ქვედა ზოლი | ბევრი request — CDN ბიბლიოთეკები, React bundle-ები |
| გვერდის ზომა | ქვედა ზოლი "transferred" | დიდი — animate.css, font-awesome, fonts |
| Render-blocking | წითელი/ყვითელი waterfall | CSS/JS ბლოკავს rendering-ს |
| ყველაზე დიდი ფაილი | Size სვეტი (დალაგეთ) | font-awesome, animate.css, Google Fonts |

### 1.3 Waterfall-ის კითხვა

Network tab-ში ყოველ request-ს აქვს ჰორიზონტალური ზოლი (waterfall). ეს ზოლი აჩვენებს:

```
request-ის სიცოცხლის ციკლი:
┌──────┬──────┬──────┬──────────┬──────────────┐
│ DNS  │ TCP  │ TLS  │  TTFB    │  Download    │
│ (ლურჯ)│      │      │ (მწვანე)  │  (ლურჯი)     │
└──────┴──────┴──────┴──────────┴──────────────┘
```

- **DNS** — დომენის IP-ზე გადაყვანა
- **TCP** — სერვერთან კავშირის დამყარება
- **TLS** — HTTPS-ის handshake
- **TTFB** — სერვერის პასუხის მოლოდინი (მწვანე ნაწილი)
- **Content Download** — ფაილის გადმოწერა

> **ყურადღება მიაქციეთ:** სხვადასხვა CDN domain-ისთვის (cdnjs.cloudflare.com, fonts.googleapis.com, fonts.gstatic.com) ბრაუზერს **ცალ-ცალკე** DNS lookup + TCP + TLS სჭირდება. ეს არის preconnect-ის მნიშვნელობა!

### 1.4 Priority სვეტის ჩართვა

1. Network tab-ში სვეტის header-ზე **მარჯვენა ღილაკი**
2. ჩართეთ **"Priority"** სვეტი
3. ნახეთ — CSS და JS ფაილებს High priority აქვთ (render-blocking!)

### 1.5 ჩაინიშნეთ

| პარამეტრი | მნიშვნელობა |
|-----------|-------------|
| Requests რაოდენობა | |
| Transferred (KB/MB) | |
| Finish time | |
| Render-blocking რესურსები (ჩამოთვალეთ) | |
| ყველაზე დიდი ფაილი | |

---

## ეტაპი 2: Coverage Tab — გამოუყენებელი კოდის პოვნა

### 2.1 Coverage Tab-ის გახსნა

1. DevTools-ში დააჭირეთ **Cmd+Shift+P**
2. ჩაწერეთ **"Coverage"**
3. აირჩიეთ **"Start instrumenting coverage and reload page"**
4. Coverage panel გამოჩნდება **ქვედა ნაწილში**

### 2.2 რას ხედავთ?

| ფაილი | Total Bytes | Unused Bytes | Unused % |
|-------|-------------|-------------|----------|
| App.css | დიდი | ბევრი | 50%+ |
| App.jsx (bundle) | დიდი | ბევრი | 40%+ |
| animate.min.css | ~80KB | ~78KB | ~97% |
| all.min.css (font-awesome) | ~80KB | ~75KB | ~93% |

### 2.3 ფაილზე დაკლიკება

1. დააკლიკეთ **App.css** ფაილს Coverage panel-ში
2. Sources tab-ში გაიხსნება ფაილი ხაზ-ხაზ მარკირებით:
   - **მწვანე ხაზი** = გამოყენებული CSS
   - **წითელი ხაზი** = გამოუყენებელი CSS

3. გადაახვიეთ ქვემოთ — ნახავთ `unused-` პრეფიქსის მქონე სელექტორებს, ყველა წითლად

> **დასკვნა:** App.css-ში `.unused-modal-overlay`, `.unused-sidebar`, `.unused-cart-drawer` და სხვა — ეს ყველაფერი მკვდარი კოდია. არ გამოიყენება, მაგრამ ბრაუზერი მაინც აპარსავს, ხარჯავს დროს და მეხსიერებას. გამოსავალი: წაშალეთ ან code splitting-ით ცალკე ფაილში გადაიტანეთ (React.lazy(), dynamic imports).

---

## ეტაპი 3: Performance Tab — ჩატვირთვის ანალიზი

### 3.1 Performance Recording

1. DevTools → **Performance** tab
2. დააჭირეთ **Record** (Cmd+E)
3. Hard refresh: **Cmd+Shift+R**
4. დაელოდეთ ჩატვირთვას (~5 წამი)
5. შეაჩერეთ Recording

### 3.2 რას ხედავთ?

**Timeline Overview (ზედა ნაწილი):**
- **FPS ზოლი** — სავარაუდოდ წითელი frame drop-ები ჩატვირთვის დროს
- **CPU ზოლი** — ყვითელი (JS), იასამნისფერი (Layout), მწვანე (Paint)
- **NET ზოლი** — request-ების ზოლები

**Main Thread (შუა ნაწილი):**
- `Evaluate script` → React component rendering
- მძიმე გამოთვლები ProductGrid-ში — **Long Task!** (წითელი კუთხე)
- React reconciliation — Virtual DOM-ის შედარება და რეალური DOM-ის განახლება

### 3.3 Long Tasks-ის პოვნა

Main Thread-ზე მოძებნეთ **წითელი სამკუთხედი** ზოლის კუთხეში — ეს არის Long Task (50ms+).

დააკლიკეთ Long Task ზოლზე და ქვემოთ **Summary** tab-ში ნახეთ:
- **Self Time** — რამდენი ms დახარჯა
- **Initiator** — ვინ გამოიძახა

### 3.4 ჩაინიშნეთ

| Long Task | ხანგრძლივობა (ms) | ფუნქცია/კომპონენტი |
|-----------|-------------------|--------------------|
| 1 | | ProductGrid rendering |
| 2 | | React reconciliation |
| 3 | | მძიმე გამოთვლები კომპონენტებში |

---

## ეტაპი 4: PageSpeed Insights — რეალურ საიტებზე

### 4.1 რა არის PSI?

PageSpeed Insights (pagespeed.web.dev) არის Google-ის ონლაინ ინსტრუმენტი. Lighthouse-ისგან განსხვავებით, PSI აერთიანებს:
- **Lab Data** — Lighthouse-ის ანალიზი (სიმულირებული)
- **Field Data** — Chrome User Experience Report (CrUX) — რეალური მომხმარებლების მონაცემები

### 4.2 PSI-ის გაშვება

1. გახსენით: **https://pagespeed.web.dev**
2. შეიყვანეთ URL: `web.dev` (ან `tbc.ge`, `mymarket.ge`)
3. აირჩიეთ **Mobile**
4. დაელოდეთ ანალიზს (~30 წამი)

### 4.3 PSI ანგარიშის სექციები

**1. Core Web Vitals Assessment (ზედა ნაწილი)**

ეს სექცია აჩვენებს **Field Data** — რეალური მომხმარებლების მონაცემებს:

```
Core Web Vitals Assessment
┌────────────────────────────┐
│ LCP: 2.1s    ✅ Good       │  ← რეალური მომხმარებლების საშუალო
│ INP: 150ms   ✅ Good       │
│ CLS: 0.05    ✅ Good       │
│                            │
│ Overall: PASSED ✅          │  ← 75% მომხმარებლებისთვის კარგია
└────────────────────────────┘
```

> **Pass/Fail** — საიტი Pass-ია, თუ 75% მომხმარებლებისთვის ყველა CWV მეტრიკა „კარგ" დიაპაზონშია. ეს რეალური მონაცემებია — არა სიმულაცია!

**2. Lab Data (Lighthouse)**

ეს სექცია იგივეა, რაც Lighthouse-ის Performance. იგივე მეტრიკები: FCP, LCP, TBT, CLS, Speed Index.

**3. Opportunities + Diagnostics**

იგივე ფორმატი, რაც Lighthouse-ში — კონკრეტული რეკომენდაციები.

### 4.4 ჩაინიშნეთ — PSI შედეგები

| მეტრიკა | web.dev | ქართული საიტი (რომელი?) |
|---------|---------|------------------------|
| LCP (Field) | | |
| INP (Field) | | |
| CLS (Field) | | |
| Performance (Lab) | | |
| Pass/Fail | | |

---

## ეტაპი 5: WebPageTest — დეტალური ანალიზი

### 5.1 რა არის WebPageTest?

WebPageTest (webpagetest.org) არის ყველაზე დეტალური უფასო ინსტრუმენტი:
- **რეალური ბრაუზერები** სხვადასხვა გეოგრაფიულ ლოკაციიდან
- **Waterfall Chart** — თითოეული რესურსის დეტალური ვიზუალიზაცია
- **Filmstrip View** — ჩატვირთვის პროცესი კადრ-კადრ

### 5.2 WebPageTest-ის გაშვება

1. გახსენით: **https://www.webpagetest.org**
2. შეიყვანეთ URL (მაგ. `web.dev`)
3. აირჩიეთ **Test Location:** Europe — London (ან სხვა ახლომდებარე)
4. აირჩიეთ **Browser:** Chrome
5. დააჭირეთ **"Start Test"**
6. დაელოდეთ (შეიძლება 1-3 წუთი)

### 5.3 Waterfall Chart-ის კითხვა

WebPageTest-ის Waterfall ძალიან დეტალურია:

```
ხაზების ფერი:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 წითელი     = HTML დოკუმენტი
🟢 მწვანე     = CSS ფაილები
🔵 ლურჯი      = JavaScript ფაილები
🟣 იისფერი    = სურათები
⬛ შავი ხაზი  = ფონტები
```

### 5.4 რა უნდა ვეძებოთ Waterfall-ში?

| რას ვეძებთ | როგორ ჩანს | რა ნიშნავს |
|-----------|-----------|-----------|
| Render-blocking | CSS/JS ჩატვირთვამდე არაფერი არ ჩანს | ბრაუზერი ელოდება ამ ფაილებს |
| Long TTFB | ზოლის მწვანე ნაწილი გრძელია | სერვერი ნელი პასუხობს |
| Large files | ზოლი ძალიან გრძელია | ფაილი დიდია, ჩამოტვირთვას დრო სჭირდება |
| Request chain | request-ები ერთმანეთის მოლოდინში არიან | ჯაჭვური დამოკიდებულება |
| No compression | Headers-ში Content-Encoding არ არის | gzip/brotli არ არის ჩართული |

### 5.5 Filmstrip View

WebPageTest-ის შედეგების გვერდზე ნახეთ **Filmstrip** — გვერდის ჩატვირთვის სკრინშოტები ყოველ 0.5 წამში:

```
0.0s     0.5s     1.0s     1.5s     2.0s     2.5s     3.0s
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│ ცარი-│ │ ცარი-│ │ header│ │header│ │ სრუ- │ │ სრუ- │ │ სრუ- │
│ ელი  │ │ ელი  │ │ ჩანს │ │+მენიუ│ │ ლად  │ │ ლად  │ │ ლად  │
└──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘
```

ეს გეხმარებათ **ვიზუალურად** ნახოთ, როდის რას ხედავს მომხმარებელი.

---

## ეტაპი 6: სამი ინსტრუმენტის შედარება

### 6.1 შედარების ცხრილი

| | Lighthouse | PSI | WebPageTest |
|---|-----------|-----|-------------|
| **უფასო** | დიახ | დიახ | დიახ |
| **სად მუშაობს** | ლოკალურად | ონლაინ | ონლაინ |
| **localhost** | დიახ | არა | არა |
| **Field data** | არა | დიახ (CrUX) | არა |
| **რეალური ბრაუზერები** | არა (სიმულაცია) | არა | დიახ |
| **გეოგრაფიული ლოკაცია** | არა | არა | დიახ |
| **Waterfall chart** | არა | არა | დიახ (დეტალური) |
| **Filmstrip** | არა | არა | დიახ |
| **CI/CD ინტეგრაცია** | დიახ (CLI) | API | დიახ (API) |
| **Performance ქულა** | დიახ | დიახ | არა (მეტრიკები ცალკე) |

### 6.2 როდის რომელი გამოვიყენოთ?

| სიტუაცია | საუკეთესო ინსტრუმენტი | რატომ |
|----------|---------------------|-------|
| Development-ში სწრაფი შემოწმება | **Lighthouse** | localhost-ზე მუშაობს, 30 წამში შედეგი |
| Production-ის რეალური წარმადობა | **PSI** | Field data — რეალური მომხმარებლების მონაცემები |
| ნელი ჩატვირთვის მიზეზის გარკვევა | **WebPageTest** | Waterfall — ყოველი request-ის დეტალური ანალიზი |
| სხვადასხვა ქვეყნიდან ტესტირება | **WebPageTest** | London, Tokyo, Sydney... |
| SEO/Accessibility აუდიტი | **Lighthouse** | ყველა კატეგორია ერთ ადგილას |
| Core Web Vitals Pass/Fail | **PSI** | ოფიციალური CrUX მონაცემები |

---

## ეტაპი 7: Demo პროექტის Lighthouse ანალიზი

### 7.1 გაუშვით Lighthouse demo პროექტზე

1. გახსენით `http://localhost:3000` **Incognito**-ში
2. Lighthouse → Navigation → Mobile → ყველა კატეგორია
3. **"Analyze page load"**

### 7.2 ჩაინიშნეთ Lighthouse შედეგები

| კატეგორია | ქულა |
|-----------|------|
| Performance | |
| Accessibility | |
| Best Practices | |
| SEO | |

### 7.3 Opportunities-იდან ტოპ 5

| # | Opportunity | Savings |
|---|-------------|---------|
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |

### 7.4 იპოვეთ პრობლემები კოდში

გახსენით `index.html`, `src/App.css`, `src/App.jsx` და კომპონენტები, და თითოეული Opportunity-სთვის იპოვეთ კონკრეტული ხაზი, რომელიც პრობლემას იწვევს:

| Opportunity | ფაილი | პრობლემა |
|-------------|-------|----------|
| Render-blocking resources | index.html | animate.css, font-awesome `<head>`-ში |
| Reduce unused CSS | src/App.css | `.unused-*` სელექტორები |
| Reduce unused JS | React bundle | გამოუყენებელი კომპონენტები, ფუნქციები |
| Avoid excessive DOM | src/components/ | ProductGrid — ბევრი ProductCard ერთდროულად |
| Large bundle size | Vite build output | დიდი JavaScript bundle code splitting-ის გარეშე |

---

## ეტაპი 8: რეალურ საიტებზე სავარჯიშო

### 8.1 აირჩიეთ ერთი ვებგვერდი

აირჩიეთ ერთი ქართული საიტი (მაგ. `tbc.ge`, `mymarket.ge`, `myvideo.ge`) და გაუშვით სამივე ინსტრუმენტით:

### 8.2 შეავსეთ შედარების ცხრილი

| მეტრიკა | Lighthouse | PSI (Lab) | PSI (Field) | WebPageTest |
|---------|-----------|-----------|-------------|-------------|
| LCP | | | | |
| CLS | | | | |
| TBT/INP | | | | |
| Performance Score | | | N/A | N/A |

### 8.3 WebPageTest Waterfall-ში იპოვეთ

- ყველაზე დიდი ფაილი: _______________
- Render-blocking რესურსი: _______________
- ყველაზე ნელი TTFB: _______________
- Request-ების რაოდენობა: _______________

---

## შეჯამება

```
ინსტრუმენტების გამოყენების flow:
┌──────────────────────────────────────────────────┐
│                                                  │
│  Development     →    Staging      →   Production│
│                                                  │
│  Lighthouse         Lighthouse        PSI        │
│  (localhost)        (staging URL)     (Field!)   │
│                                                  │
│  Coverage Tab       WebPageTest       WebPageTest│
│  (unused code)      (waterfall)       (regions)  │
│                                                  │
│  Performance Tab                                 │
│  (Long Tasks)                                    │
│                                                  │
└──────────────────────────────────────────────────┘
```

### მთავარი წესები:

1. **Lighthouse** — development-ის მთავარი ინსტრუმენტი, localhost-ზე მუშაობს
2. **PSI** — production-ის მთავარი ინსტრუმენტი, Field data აჩვენებს რეალობას
3. **WebPageTest** — ღრმა ანალიზისთვის, Waterfall და Filmstrip ხელს გიწვდის
4. **Coverage Tab** — გამოუყენებელი კოდის პოვნისთვის (code splitting-ის გადაწყვეტილება)
5. **Lab vs Field** — Lab სიმულაციაა, Field რეალობა; ორივე მნიშვნელოვანია
