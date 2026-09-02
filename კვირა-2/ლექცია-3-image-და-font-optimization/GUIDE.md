# Image & Font Optimization — ეტაპობრივი გაიდი

ამ პრაქტიკაში ნახავთ, როგორ მოქმედებს სურათების ფორმატი, lazy loading, responsive images და font optimization ვებგვერდის სიჩქარეზე.

ჩვენ გვაქვს ერთი პროექტი — `demo-image-font-optimization/`. ეს არის React + Vite აპლიკაცია, რომელიც ყველა ოპტიმიზაციის ტექნიკას აჩვენებს React კომპონენტების სახით.

---

## წინაპირობა: პროექტის გაშვება

```bash
cd ~/Desktop/Web-optimization/კვირა-2/ლექცია-3-image-და-font-optimization/demo-image-font-optimization
npm install
```

შემდეგ გაუშვით setup სკრიპტი, რომელიც სურათებს და ფონტებს დააგენერირებს:

```bash
node setup.js
```

### რას აკეთებს setup.js?

1. **სურათების გენერაცია** — `sharp` ბიბლიოთეკით პროგრამულად ქმნის gradient სურათებს (SVG-ს კოდით აგენერირებს და კონვერტაციას უკეთებს). ყოველ სურათს სამ ფორმატში ინახავს (JPEG, WebP, AVIF), hero-სთვის კი დამატებით სამ responsive ზომასაც ქმნის (400w, 800w, 1200w).
2. **ფონტის ჩამოტვირთვა** — Google Fonts API-დან იღებს CSS-ს, CSS-იდან regex-ით ამოიღებს WOFF2 ფაილების URL-ებს და ჩამოტვირთავს `public/fonts/` ფოლდერში. ამით ფონტი self-hosted ხდება.

ნახავთ ასეთ output-ს (ზომები შეიძლება ოდნავ განსხვავდეს):

```
=== სურათების გენერაცია ===

hero:
  JPEG: 25.3 KB
  WebP: 8.1 KB  (68% დაზოგვა)
  AVIF: 4.2 KB  (83% დაზოგვა)

gallery-1:
  JPEG: 18.7 KB
  WebP: 5.9 KB  (68% დაზოგვა)
  AVIF: 3.1 KB  (83% დაზოგვა)
...
```

ახლა გაუშვით dev სერვერი:

```bash
npm run dev
```

გახსენით ბრაუზერში: `http://localhost:5173`

---

## ეტაპი 1: ფორმატების შედარება — JPEG vs WebP vs AVIF

### რა ვნახეთ setup.js-ის output-ში?

setup სკრიპტმა ყოველი სურათი სამ ფორმატში შეინახა. შედარების ცხრილი ტერმინალში გამოჩნდა.

### 1.1 რატომ არის WebP/AVIF პატარა?

არა იმიტომ რომ ხარისხი უარესია — **კომპრესიის ალგორითმი** უფრო ეფექტურია. JPEG 1992 წელს შეიქმნა, WebP და AVIF კი თანამედროვე ალგორითმებს იყენებენ — უკეთ ხვდებიან სურათის რომელი ნაწილი ადამიანის თვალისთვის შეუმჩნეველია და იქ ზოგავენ ადგილს.

### 1.2 ნახეთ ფაილები

```bash
ls -lh images/
```

თვალით შეადარეთ — იგივე სურათის JPEG, WebP და AVIF ვერსიები რამდენად განსხვავდება ზომით.

### 1.3 ჩაინიშნეთ

- **hero** — JPEG: _____, WebP: _____, AVIF: _____, დაზოგვა: _____
- **gallery-1** — JPEG: _____, WebP: _____, AVIF: _____, დაზოგვა: _____
- **gallery-2** — JPEG: _____, WebP: _____, AVIF: _____, დაზოგვა: _____
- **gallery-3** — JPEG: _____, WebP: _____, AVIF: _____, დაზოგვა: _____
- **gallery-4** — JPEG: _____, WebP: _____, AVIF: _____, დაზოგვა: _____

---

## ეტაპი 2: `<picture>` ელემენტი — ბრაუზერი საუკეთესო ფორმატს ირჩევს

### 2.1 გახსენით გვერდი და Network Tab

1. გახსენით `http://localhost:3000`
2. DevTools → **Network** tab → **"Img"** ფილტრი
3. Hard refresh: **Cmd+Shift+R**

### 2.2 რას ხედავთ?

Hero სურათისთვის ბრაუზერმა ავტომატურად აირჩია **საუკეთესო ფორმატი**:
- Chrome, Edge → ალბათ **AVIF** ჩაიტვირთა (hero.avif)
- ძველი ბრაუზერი → **WebP** ან **JPEG**

### 2.3 როგორ მუშაობს?

React კომპონენტში (`src/components/HeroPicture.jsx`) `<picture>` ელემენტს აქვს სამი ვარიანტი:

```jsx
<picture>
  <source srcSet="/images/hero.avif" type="image/avif" />   {/* 1. ჯერ ცდის AVIF-ს */}
  <source srcSet="/images/hero.webp" type="image/webp" />   {/* 2. თუ არ იცის, WebP-ს */}
  <img src="/images/hero.jpg" fetchPriority="high" />       {/* 3. fallback — JPEG */}
</picture>
```

ბრაუზერი **ზემოდან ქვემოთ** ამოწმებს და პირველ მხარდაჭერილ ფორმატს ირჩევს.

### 2.4 Network Tab-ში რით ვამოწმებთ?

- **Name** სვეტში ნახეთ ფაილის სახელი — `.avif`, `.webp` თუ `.jpg` იტვირთება
- **Size** სვეტში ნახეთ ფაილის ზომა — AVIF ყველაზე პატარა იქნება

---

## ეტაპი 3: fetchpriority — რესურსების პრიორიტეტი

### 3.1 Priority სვეტის ჩართვა

1. Network tab-ში **დააჭირეთ სვეტების header-ს მარჯვენა ღილაკით**
2. ჩართეთ **"Priority"** სვეტი

### 3.2 Hard refresh (Cmd+Shift+R) და შეადარეთ:

- **Hero (ზემოთ)** — fetchpriority: `high`, Priority: **High**
- **Gallery (ქვემოთ)** — fetchpriority: არ აქვს, Priority: Low

### 3.3 რას ნიშნავს?

ბრაუზერს შეზღუდული რაოდენობის პარალელური კავშირები აქვს. `fetchpriority="high"` ეუბნება — ეს სურათი პრიორიტეტულად, სხვებზე ადრე ჩამოტვირთე. **სხვა დაბალი პრიორიტეტის რესურსები ამის ხარჯზე ცოტა მოგვიანებით ჩაიტვირთება.**

Hero image-ისთვის ეს გამართლებულია, რადგან მომხმარებელი მას პირველად ხედავს.

---

## ეტაპი 4: Lazy Loading — სურათების ჩატვირთვის გადადება

### 4.1 Network Tab-ში დაკვირვება

1. Network tab → **"Img"** ფილტრი → **Clear** (ყველა request წაშალეთ)
2. Hard refresh (Cmd+Shift+R)
3. **არ დასქროლოთ!** — დარჩით ზემოთ

### 4.2 რას ხედავთ?

- **Hero სურათი** ჩაიტვირთა (fetchpriority="high")
- **Gallery სურათები არ ჩაიტვირთა!** — ისინი `loading="lazy"` არის

### 4.3 ახლა დასქროლეთ ქვემოთ

ნელა დასქროლეთ gallery-ის სექციამდე. Network tab-ში დაინახავთ **ახალ request-ებს** — gallery სურათები სქროლის დროს იტვირთება!

### 4.4 რატომ არის ეს ოპტიმიზაცია?

თუ გვერდზე 20 სურათია, მაგრამ მომხმარებელი მხოლოდ 3-ს ხედავს ეკრანზე, რატომ ჩავტვირთოთ 20-ვე? `loading="lazy"` ზოგავს ტრაფიკს და აჩქარებს საწყის ჩატვირთვას.

### 4.5 მნიშვნელოვანი წესი

- **Above the fold (ეკრანზე ჩანს)** — loading: `eager` (default), fetchpriority: `high`
- **Below the fold (სქროლის ქვემოთ)** — loading: `lazy`, fetchpriority: არ სჭირდება

**არასდროს გამოიყენოთ `loading="lazy"` hero image-ზე!** — მომხმარებელი დაინახავს ცარიელ ადგილს.

> React კომპონენტებში lazy loading-ის მაგალითი ნახავთ `src/components/LazyImage.jsx` და `src/components/ResponsiveGallery.jsx` ფაილებში.

---

## ეტაპი 5: Responsive Images — srcset + sizes

### 5.1 Device Toolbar-ის ჩართვა

1. DevTools → **Device Toolbar** ჩართეთ (Cmd+Shift+M)
2. აირჩიეთ **"iPhone SE"** (375px)
3. Network tab → "Img" ფილტრი → **Hard refresh** (Cmd+Shift+R)

### 5.2 რას ხედავთ?

Responsive სექციის სურათისთვის ბრაუზერმა **400w ვერსია** ჩამოტვირთა (პატარა ფაილი), რადგან ტელეფონის ეკრანისთვის 400px საკმარისია.

### 5.3 ახლა შეცვალეთ "iPad" ან "Laptop"-ზე

1. აირჩიეთ უფრო დიდი viewport (1024px+)
2. **Hard refresh** (Cmd+Shift+R)
3. ნახეთ Network tab — ახლა **800w** ან **1200w** ვერსია ჩაიტვირთა

### 5.4 როგორ მუშაობს?

React კომპონენტში (`src/components/HeroPicture.jsx`):

```jsx
<img
  srcSet="/images/hero-400w.jpg 400w, /images/hero-800w.jpg 800w, /images/hero-1200w.jpg 1200w"
  sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
  src="/images/hero-800w.jpg"
  fetchPriority="high"
/>
```

- `srcSet` — ბრაუზერს ეუბნები **რა ვერსიები არსებობს**
- `sizes` — ეუბნები **ეკრანზე რამდენ ადგილს დაიკავებს** სურათი
- ბრაუზერი ორივეს აერთიანებს და **ოპტიმალურ ვერსიას** ირჩევს

ტელეფონი არ ჩამოტვირთავს 1200px-იან დიდ სურათს, როცა 400px საკმარისია — **ზოგავს ტრაფიკს**.

### 5.5 ჩაინიშნეთ

- **375px (iPhone)** — sizes: 100vw, ჩატვირთული ვერსია: ___w, ფაილის ზომა: ___ KB
- **768px (iPad)** — sizes: 50vw, ჩატვირთული ვერსია: ___w, ფაილის ზომა: ___ KB
- **1440px (Desktop)** — sizes: 33vw, ჩატვირთული ვერსია: ___w, ფაილის ზომა: ___ KB

---

## ეტაპი 6: Font Optimization

### 6.1 @font-face — რა არის?

@font-face არის ფონტის რეგისტრაცია CSS-ში. ბრაუზერს ეუბნები: "ამ სახელის ფონტი ამ ფაილიდან ჩამოტვირთე."

React პროექტში font-face დეკლარაცია `src/index.css` ფაილშია:

```css
@font-face {
  font-family: 'Inter-Swap';
  src: url('/fonts/inter-400.woff2') format('woff2');
  font-display: swap;
}
```

- `font-family` — სახელი, რომელიც შემდეგ CSS-ში გამოიყენება
- `src` — სად არის ფონტის ფაილი (ლოკალურად ან URL-ით)
- `format('woff2')` — ბრაუზერს ეუბნები ფორმატს, რომ ტყუილად არ ჩამოტვირთოს რაც არ იცის
- `font-display` — რა ქნას ტექსტთან ფონტის ჩატვირთვამდე

**ფონტის ფაილი** (მაგ. `inter-400.woff2`) — ფაილი, რომელშიც ასოების ვიზუალური დიზაინია შენახული. WOFF2 ფორმატი Brotli კომპრესიას იყენებს და WOFF-ზე ~30%-ით პატარაა.

### 6.2 font-display — 4 ვარიანტის შედარება

ეს არის ყველაზე საინტერესო ნაწილი. ბრაუზერს ფონტის ჩამოტვირთვა დრო სჭირდება — `font-display` ეუბნები, ამ დროს რა ქნას ტექსტთან.

1. DevTools → **Network** tab → **"Font"** ფილტრი
2. Network throttling: **"Slow 3G"** აირჩიეთ (ნელი ინტერნეტის სიმულაცია)
3. **Hard refresh** (Cmd+Shift+R)
4. სწრაფად შეხედეთ გვერდზე font-display სექციას

### 6.3 რა უნდა დაინახოთ:

- **block** — ფონტის ჩატვირთვამდე: ტექსტი **უხილავია** (ცარიელი ადგილი), ჩატვირთვის შემდეგ: ჩნდება custom ფონტით
- **swap** — ფონტის ჩატვირთვამდე: ტექსტი **ჩანს** სისტემური ფონტით, ჩატვირთვის შემდეგ: იცვლება custom-ზე
- **fallback** — ფონტის ჩატვირთვამდე: მოკლე ხანს უხილავი, შემდეგ სისტემური, ჩატვირთვის შემდეგ: იცვლება (თუ დროში მოესწრო)
- **optional** — ფონტის ჩატვირთვამდე: სისტემური ფონტით, ჩატვირთვის შემდეგ: იცვლება მხოლოდ თუ ძალიან სწრაფად ჩაიტვირთა

### 6.4 რომელი გამოვიყენოთ?

**`swap`** — რეკომენდებული. მომხმარებელი მაშინვე ხედავს ტექსტს (სისტემური ფონტით), ფონტი რომ ჩაიტვირთება — წამით შეიცვლება. ეს ბევრად უკეთესია ვიდრე ცარიელი ეკრანი (block).

### 6.5 სისტემური ფონტი (fallback) სად ვწერთ?

`font-family`-ში fallback-ად (`src/index.css`):

```css
body {
  font-family: 'Inter-Swap', Arial, sans-serif;
}
```

`Arial` და `sans-serif` ყველა კომპიუტერზე დაყენებულია — ჩამოტვირთვა არ სჭირდებათ. `font-display: swap`-ის დროს ბრაუზერი სწორედ მათ აჩვენებს, სანამ Inter ჩაიტვირთება.

> React კომპონენტში font-display-ის 4 ვარიანტი ნახავთ `src/components/FontDisplayDemo.jsx` ფაილში.

---

## ეტაპი 7: Self-hosted vs Google Fonts CDN

### 7.1 Network Tab-ში შედარება

1. Network tab → **ყველა** (All) ფილტრი
2. Hard refresh (Cmd+Shift+R)
3. მოძებნეთ request-ები:

**Self-hosted:**
- `fonts/inter-400.woff2` — ერთი request, ლოკალური ფაილი

**Google Fonts CDN:**
- `fonts.googleapis.com/css2?family=...` — ჯერ CSS ფაილი
- `fonts.gstatic.com/s/...` — შემდეგ ფონტის ფაილი

### 7.2 სხვაობა

**Request-ების რაოდენობა**
- Self-hosted: 1
- Google Fonts CDN: 2+

**DNS lookup**
- Self-hosted: არ სჭირდება
- Google Fonts CDN: 2 სერვერისთვის

**კონტროლი**
- Self-hosted: სრული
- Google Fonts CDN: Google-ზე დამოკიდებული

**ქეშირება**
- Self-hosted: შენი სერვერის წესებით
- Google Fonts CDN: Google-ის წესებით

Self-hosted უკეთესია performance-ის კუთხით, რადგან ბრაუზერს ნაკლები კავშირის დამყარება სჭირდება.

### 7.3 throttling-ის გამორთვა

არ დაგავიწყდეთ! Network throttling → **"No throttling"** დააბრუნეთ.

---

## დამატებითი რესურსები

### React კომპონენტების სტრუქტურა

პროექტი აგებულია შემდეგი კომპონენტებით:

- **`src/App.jsx`** — მთავარი კომპონენტი, ყველაფრის კონტეინერი
- **`src/components/HeroPicture.jsx`** — `<picture>` ელემენტის დემო (AVIF/WebP/JPEG fallback)
- **`src/components/ResponsiveGallery.jsx`** — responsive images (`srcSet` + `sizes`) და lazy loading
- **`src/components/LazyImage.jsx`** — lazy loading-ის მექანიზმის დემო
- **`src/components/FontDisplayDemo.jsx`** — font-display-ის 4 ვარიანტის ვიზუალური შედარება
- **`src/components/PerformanceMetrics.jsx`** — რეალურ დროში performance მეტრიკების ჩვენება

### setup.js სკრიპტი

`setup.js` სკრიპტი პროექტის root დირექტორიაშია და პასუხისმგებელია სურათებისა და ფონტების გენერაციაზე. მას შეგიძლიათ ნებისმიერ დროს გაუშვათ თავიდან:

```bash
node setup.js
```

---

## შეჯამება

```
სურათის ოპტიმიზაცია                    ფონტის ოპტიმიზაცია
┌──────────────────────┐               ┌──────────────────────┐
│ ფორმატი:             │               │ ფორმატი:             │
│   AVIF > WebP > JPEG │               │   WOFF2 > WOFF       │
│                      │               │                      │
│ ჩატვირთვა:           │               │ font-display:        │
│   <picture> fallback │               │   swap (recommended) │
│   srcset + sizes     │               │                      │
│   loading="lazy"     │               │ წყარო:               │
│   fetchpriority      │               │   Self-hosted > CDN  │
└──────────────────────┘               └──────────────────────┘
```

### მთავარი წესები:

1. **ფორმატი** — ყოველთვის AVIF/WebP შეთავაზეთ `<picture>`-ით, JPEG fallback-ად
2. **Responsive** — არ ატვირთოთ 1200px სურათი ტელეფონზე, `srcset`+`sizes` გამოიყენეთ
3. **Lazy loading** — ეკრანის ქვემოთ მყოფი სურათები `loading="lazy"`-ით
4. **fetchpriority** — hero image-ს `fetchpriority="high"`, gallery-ს არაფერი
5. **ფონტი** — WOFF2 ფორმატი, `font-display: swap`, self-hosted უფრო სწრაფია
