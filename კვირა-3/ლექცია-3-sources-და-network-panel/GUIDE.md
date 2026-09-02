# Sources და Network Panel — ეტაპობრივი გაიდი

ამ პრაქტიკაში თქვენ იმუშავებთ **React User Dashboard** აპლიკაციაზე — ინტერაქტიულ გვერდზე, რომელიც JSONPlaceholder API-დან მომხმარებლების, პოსტების და კომენტარების მონაცემებს ტვირთავს React hooks-ით და custom service layer-ით. თქვენი ამოცანაა — Sources Panel-ით React კომპონენტების და Vite build-ის source code-ის ნახვა, breakpoint-ებით debugging, და Network Panel-ით API მოთხოვნების ანალიზი.

პროექტი მდებარეობს `demo-sources-network/` ფოლდერში. ფაილები:

- **`src/App.jsx`** — მთავარი კომპონენტი — API data fetching, filtering, error handling
- **`src/services/apiService.js`** — API calls — `fetchUsers()`, `fetchPosts()`, `fetchComments()`
- **`src/components/DataCard.jsx`** — მონაცემების ბარათის კომპონენტი
- **`src/components/LoadingSpinner.jsx`** — loading state-ის UI
- **`vite.config.js`** — Vite კონფიგურაცია

---

## წინაპირობა: პროექტის გაშვება

```bash
cd ~/Desktop/Web-optimization/კვირა-3/ლექცია-3-sources-და-network-panel/demo-sources-network
npm install
npm run dev
```

გახსენით ბრაუზერში: `http://localhost:5173`

> **რატომ Vite + React?** Vite-ის dev server სწრაფი HMR (Hot Module Replacement) გვაძლევს — ფაილის შენახვისთანავე კომპონენტი განახლდება state-ის დაკარგვის გარეშე. Network Panel-ში Vite-ის WebSocket კავშირიც ჩანს (HMR-ისთვის). React hooks-ის async logic-ის debugging ეს დემო იდეალურია.

---

## ეტაპი 1: Sources Panel — ფაილების ნახვა

### 1.1 Sources Panel-ის გახსნა

1. გახსენით `http://localhost:3000`
2. DevTools გახსენით: **Cmd+Option+I** (Mac) ან **Ctrl+Shift+I** (Windows/Linux)
3. გადაერთეთ **Sources** tab-ზე

### 1.2 ფაილების ხე (File Tree) — Vite + React

Sources Panel-ის მარცხენა მხარეს **Navigator** პანელი ჩანს. იქ ნახავთ:

```
▼ localhost:5173
  ├── node_modules (Vite dev server-ის გზით)
  ├── src
  │   ├── App.jsx
  │   ├── main.jsx
  │   ├── services
  │   │   └── apiService.js
  │   └── components
  │       ├── DataCard.jsx
  │       └── LoadingSpinner.jsx
  ├── @vite/client (HMR runtime)
  └── index.html
```

დააჭირეთ `src/services/apiService.js`-ს — ფაილის შიგთავსი ცენტრალურ პანელში გამოჩნდება.

### 1.3 კოდის წაკითხვა Sources Panel-ში — React კომპონენტები

`src/App.jsx`-ში ნახავთ:

- React hooks: `useState`, `useEffect`
- `fetchUsers()`, `fetchPosts()`, `fetchComments()` API calls
- JSX markup — ბრაუზერში ტრანსპილირებული JavaScript-ად

`src/services/apiService.js`-ში ნახავთ:

- `API_BASE` კონსტანტა — `'https://jsonplaceholder.typicode.com'`
- `fetchUsers()`, `fetchPosts()`, `fetchComments()` — `async/await` ფუნქციები
- `fetchBadEndpoint()` — განზრახ 404 შეცდომისთვის

> **Sources Panel vs VS Code — Vite Context:** Sources Panel-ში ხედავთ Vite-ის მიერ ტრანსფორმირებულ კოდს. JSX → JavaScript, ESM imports → ბრაუზერის native ESM. Vite-ის dev mode-ში bundling არ არის — ყოველი ფაილი ცალკე იტვირთება. Production build-ში კი minified bundle იქნება.

---

## ეტაპი 2: `debugger;` Statement

### 2.1 debugger-ის მოქმედება

`app.js`-ის `loadData` ფუნქციაში ჩაშენებულია `debugger;` statement (45-ე ხაზი):

```javascript
async function loadData(type) {
  // ...
  const data = await response.json();
  requestCount++;

  debugger;  // აქ კოდი გაჩერდება, თუ DevTools გახსნილია

  allData = processData(data, type);
  renderData(allData, type);
  // ...
}
```

### 2.2 debugger-ის გამოცდა

1. DevTools **გახსნილი** უნდა იყოს (თუ დახურულია, `debugger` იგნორირდება)
2. გვერდზე დააჭირეთ ღილაკს **„მომხმარებლების ჩატვირთვა"**
3. კოდი `debugger;` ხაზზე **გაჩერდება** — Sources Panel-ში ხაზი ლურჯად მოინიშნება

### 2.3 გაჩერებული მდგომარეობა

კოდის გაჩერების დროს:
- **Scope** პანელში (მარჯვნივ) ნახავთ ლოკალურ ცვლადებს:
  - `type` — `"users"`
  - `data` — მასივი 10 მომხმარებლით
  - `response` — Response ობიექტი (`status: 200`)
  - `requestCount` — `1`
  - `startTime`, `endTime` — performance დროები

- მაუსი მიიტანეთ კოდში ნებისმიერ ცვლადზე — tooltip-ში მისი მნიშვნელობა ჩანს

### 2.4 გაგრძელება

- **Resume (▶)** — Shortcut: F8 — გააგრძელებს შესრულებას
- **Step Over (⤳)** — Shortcut: F10 — შემდეგ ხაზზე გადავა, ფუნქციაში არ შევა
- **Step Into (↓)** — Shortcut: F11 — ფუნქციაში შევა (მაგ., `processData`-ში)
- **Step Out (↑)** — Shortcut: Shift+F11 — ამ ფუნქციიდან გამოვა

სცადეთ: **Step Over** (F10) დააჭირეთ ორჯერ — `allData = processData(data, type)` შესრულდება, შემდეგ `renderData(allData, type)`. Scope-ში `allData`-ს მნიშვნელობა გამოჩნდება.

> **debugger vs breakpoint:** `debugger;` statement კოდშია ჩაწერილი — ყოველთვის გააჩერებს (თუ DevTools გახსნილია). Breakpoint-ი DevTools-ში ისმება (ხაზის ნომერზე დაჭერით) და კოდს არ ეხება. **წესი:** `debugger;` გამოიყენეთ დროებით, კონკრეტული პრობლემის მოსაძებნად. **ყოველთვის წაშალეთ production კოდიდან!**

---

## ეტაპი 3: Breakpoints — Sources Panel-ში

### 3.1 Breakpoint-ის დასმა

1. Sources Panel-ში გახსენით `src/App.jsx`
2. იპოვეთ `handleSearch` ფუნქცია (დაახლოებით 51-ე ხაზი)
3. ხაზის ნომერზე დააჭირეთ — ლურჯი წერტილი გამოჩნდება (breakpoint)

### 3.2 Breakpoint-ის გამოცდა

1. გვერდზე ჯერ ჩატვირთეთ მონაცემები (მაგ., „მომხმარებლების ჩატვირთვა")
   - `debugger;`-ზე რომ გაჩერდეს, დააჭირეთ Resume (F8) გასაგრძელებლად
2. ძებნის ველში ჩაწერეთ რაიმე ტექსტი
3. კოდი `handleSearch` ფუნქციის breakpoint-ზე გაჩერდება
4. Scope-ში ნახავთ `query` ცვლადის მნიშვნელობას — ის, რაც ძებნის ველში ჩაწერეთ

### 3.3 Conditional Breakpoint

1. არსებულ breakpoint-ზე მარჯვენა ღილაკით დააჭირეთ → **Edit breakpoint**
2. ჩაწერეთ პირობა: `query.length > 3`
3. ახლა breakpoint მხოლოდ მაშინ გააჩერებს, როცა ძებნის ტექსტი 3 სიმბოლოზე გრძელია

> **Conditional Breakpoint-ის გამოყენება:** წარმოიდგინეთ ციკლი 1000 იტერაციით — breakpoint ყოველ ჯერზე გააჩერებს. Conditional breakpoint-ით შეგიძლიათ მხოლოდ 500-ე იტერაციაზე გაჩერდეთ (`i === 500`).

---

## ეტაპი 4: Snippets — კოდის ფრაგმენტების შენახვა

### 4.1 Snippet-ის შექმნა

1. Sources Panel-ში მარცხნივ იპოვეთ **Snippets** ჩანართი (Page | Filesystem | Snippets)
2. დააჭირეთ **+ New snippet**
3. დაარქვით სახელი: `page-stats`
4. ჩაწერეთ:

```javascript
// გვერდის სტატისტიკა
const stats = {
  title: document.title,
  links: document.querySelectorAll('a').length,
  buttons: document.querySelectorAll('button').length,
  images: document.querySelectorAll('img').length,
  scripts: document.querySelectorAll('script').length,
  stylesheets: document.querySelectorAll('link[rel="stylesheet"]').length,
};
console.table(stats);
console.log('DOM ელემენტების რაოდენობა:', document.querySelectorAll('*').length);
```

### 4.2 Snippet-ის გაშვება

- **Cmd+Enter** (Mac) ან **Ctrl+Enter** (Windows/Linux)
- ან მარჯვენა ღილაკით → **Run**

Console-ში ნახავთ გვერდის სტატისტიკას ცხრილის ფორმატში.

### 4.3 სხვა სასარგებლო Snippet-ის მაგალითი

შექმენით ახალი snippet `highlight-elements`:

```javascript
// ყველა ბარათის მონიშვნა წითელი ჩარჩოთი
document.querySelectorAll('.data-card, .product-card').forEach(card => {
  card.style.outline = '3px solid red';
});
console.log('ბარათები მონიშნულია');
```

> **Snippets-ის რეალური გამოყენება:** ხშირად იყენებთ კოდს, რომელიც არ ეკუთვნის თქვენს პროექტს, მაგრამ debugging-ისთვის გჭირდებათ. მაგალითად: performance audit სკრიპტი, DOM-ის ანალიზი, cookie-ების წაკითხვა. Snippet-ები DevTools-ში ინახება და ყველა საიტზე ხელმისაწვდომია.

---

## ეტაპი 5: Network Panel — მოთხოვნების ინსპექტირება

### 5.1 Network Panel-ის გახსნა

1. გადაერთეთ **Network** tab-ზე
2. მონიშნეთ **Disable cache** checkbox (DevTools-ის ზოლში)
3. გააკეთეთ refresh (Cmd+Shift+R) — ნახავთ ყველა მოთხოვნას, რომელიც გვერდის ჩატვირთვისას გაეშვა

### 5.2 ჩატვირთვის მოთხოვნები

გვერდის ჩატვირთვისას Network-ში ასეთ მოთხოვნებს ნახავთ:

- **`localhost`** — Type: document, Status: 200, Size: ~2 KB
- **`styles.css`** — Type: stylesheet, Status: 200, Size: ~4 KB
- **`app.js`** — Type: script, Status: 200, Size: ~3 KB
- **`600/200` (picsum.photos)** — Type: image, Status: 200, Size: ~30 KB

ყურადღება მიაქციეთ — სურათი (`picsum.photos`) ყველაზე დიდია და ყველაზე მეტი დრო სჭირდება.

### 5.3 API მოთხოვნის ინსპექტირება

1. გვერდზე დააჭირეთ ღილაკს **„მომხმარებლების ჩატვირთვა"**
   - (თუ `debugger;`-ზე გაჩერდა, Resume (F8) დააჭირეთ)
2. Network Panel-ში ახალი მოთხოვნა გამოჩნდება: `users`
3. დააჭირეთ `users` მოთხოვნას — გაიხსნება დეტალური ინფორმაცია

#### Headers ჩანართი

```
Request URL: https://jsonplaceholder.typicode.com/users
Request Method: GET
Status Code: 200 OK
```

Response Headers-ში ნახავთ:
- `content-type: application/json; charset=utf-8` — პასუხის ფორმატი. `application/json` ნიშნავს, რომ სერვერი JSON მონაცემებს აბრუნებს (და არა HTML-ს ან სურათს). `charset=utf-8` — ტექსტის კოდირება, UTF-8 უნივერსალური სტანდარტია რომელიც ქართულსაც მოიცავს.
- `cache-control` — ბრაუზერს ეუბნება, შეინახოს თუ არა ეს პასუხი ქეშში (მეხსიერებაში). მაგ., `max-age=3600` ნიშნავს — 1 საათი შეინახე, ამ დროში თავიდან სერვერზე ნუ მიმართავ. `no-cache` ნიშნავს — ყოველთვის სერვერს ჰკითხე ახალია თუ არა.

#### Preview ჩანართი

JSON მონაცემები ფორმატირებული, ხის სტრუქტურით:

```
▼ 0: {id: 1, name: "Leanne Graham", username: "Bret", ...}
▼ 1: {id: 2, name: "Ervin Howell", username: "Antonette", ...}
...
```

#### Response ჩანართი

Raw JSON ტექსტი — ეს არის ზუსტად ის, რაც სერვერმა დააბრუნა.

#### Timing ჩანართი

მოთხოვნის დროითი დაშლა — ამას მე-9 ეტაპში დეტალურად განვიხილავთ.

> **Headers vs Preview vs Response:** Headers გაჩვენებთ მეტა-ინფორმაციას (status, content-type, cookies). Preview — ფორმატირებული, წაკითხვისთვის მოსახერხებელი. Response — raw მონაცემები, ზუსტად ისე, როგორც სერვერმა გამოგზავნა.

---

## ეტაპი 6: Network ფილტრები

### 6.1 ტიპის მიხედვით ფილტრაცია

Network Panel-ის ზედა ნაწილში ფილტრების ზოლი არის:

- **All** — ყველა მოთხოვნა
- **Fetch/XHR** — API მოთხოვნები (`fetch`, `XMLHttpRequest`)
- **JS** — JavaScript ფაილები
- **CSS** — სტილების ფაილები
- **Img** — სურათები
- **Doc** — HTML დოკუმენტები
- **Font** — შრიფტები
- **WS** — WebSocket კავშირები

### 6.2 პრაქტიკა

1. ჯერ ჩატვირთეთ ყველა სახის მონაცემი — დააჭირეთ „მომხმარებლების ჩატვირთვა", „პოსტების ჩატვირთვა", „კომენტარების ჩატვირთვა"
2. ახლა ფილტრებით სცადეთ:
   - **Fetch/XHR** — მხოლოდ API მოთხოვნები ჩანს (`users`, `posts`, `comments`)
   - **JS** — მხოლოდ `app.js`
   - **CSS** — მხოლოდ `styles.css`
   - **Img** — მხოლოდ `picsum.photos` სურათი

### 6.3 ტექსტური ფილტრი

ფილტრების ზოლში **Filter** ველი არის. ჩაწერეთ `json` — მხოლოდ JSON API-ს მოთხოვნები დარჩება.

> **რეალური გამოყენება:** დიდ აპლიკაციებში ასობით მოთხოვნა შეიძლება იყოს. ფილტრების გარეშე, კონკრეტული API call-ის პოვნა თითქმის შეუძლებელია. **Fetch/XHR** ფილტრი ყველაზე ხშირად გამოიყენება — ის მხოლოდ API მოთხოვნებს აჩვენებს.

---

## ეტაპი 7: Throttling — ნელი ქსელის სიმულაცია

### 7.1 Throttling-ის ჩართვა

1. Network Panel-ის ზედა ზოლში იპოვეთ **No throttling** dropdown
2. აირჩიეთ **Slow 3G**

### 7.2 ნელი ქსელის ეფექტი

1. გააკეთეთ Hard Refresh (Cmd+Shift+R)
2. დააკვირდით:
   - გვერდის ჩატვირთვა **რამდენიმე წამი** სჭირდება (ნორმალურად — მილიწამები)
   - სტატუსბარში ჩანს ჯამური დრო და მოთხოვნების რაოდენობა
   - **Waterfall** სვეტში ჩანს, რომ მოთხოვნები ბევრად გრძელია

3. ახლა დააჭირეთ **„პოსტების ჩატვირთვა"**
   - Loading overlay-ი (`იტვირთება...`) დიდხანს ჩანს
   - Network-ში `posts` მოთხოვნის Waterfall ბარი გრძელია

### 7.3 Throttling პარამეტრები

- **Fast 3G** — Download: 1.5 Mbps, Upload: 750 Kbps, Latency: 563 ms
- **Slow 3G** — Download: 500 Kbps, Upload: 500 Kbps, Latency: 2000 ms
- **Offline** — Download: 0, Upload: 0, Latency: -

> **რატომ გვჭირდება Throttling?** თქვენი კომპიუტერი ალბათ სწრაფ ინტერნეტზეა. მაგრამ მომხმარებლების ნაწილი მობილურით, ნელი კავშირით სარგებლობს. Throttling-ით ხედავთ, როგორი იქნება აპლიკაცია მათთვის. ეს არის **performance optimization-ის** ფუნდამენტური ინსტრუმენტი.

**არ დაგავიწყდეთ!** Throttling გამორთეთ სავარჯიშოს დასრულების შემდეგ (აირჩიეთ **No throttling**), თორემ ყველა საიტი ნელა ჩაიტვირთება.

---

## ეტაპი 8: HTTP Status Codes — შეცდომების პოვნა

### 8.1 წარმატებული მოთხოვნა (200)

1. დააჭირეთ **„მომხმარებლების ჩატვირთვა"**
2. Network-ში `users` მოთხოვნის **Status** სვეტში: **200** (მწვანე)

### 8.2 404 შეცდომა

1. დააჭირეთ **„არასწორი URL (404)"** ღილაკს
2. Network-ში ახალი მოთხოვნა: `nonexistent-endpoint` — **Status: 404** (წითელი)
3. Console-ში: `404 შეცდომა: HTTP 404 — Not Found`

`loadBadEndpoint()` ფუნქცია განზრახ არასწორ URL-ზე აკეთებს მოთხოვნას (`/nonexistent-endpoint`), რომელიც სერვერზე არ არსებობს:

```javascript
const response = await fetch(`${API_BASE}/nonexistent-endpoint`);
console.log('Response status:', response.status);  // 404
console.log('Response ok:', response.ok);           // false
```

### 8.3 HTTP Status Codes ცხრილი

- **200 OK** — მოთხოვნა წარმატებით შესრულდა
- **201 Created** — ახალი რესურსი შეიქმნა (POST)
- **301 Moved Permanently** — რესურსი სხვა URL-ზე გადავიდა (redirect)
- **304 Not Modified** — რესურსი არ შეცვლილა — cache-დან აიღეთ
- **400 Bad Request** — არასწორი მოთხოვნა (validation error)
- **401 Unauthorized** — ავტორიზაცია საჭიროა (token/password)
- **403 Forbidden** — წვდომა აკრძალულია (უფლება არ გაქვთ)
- **404 Not Found** — რესურსი ვერ მოიძებნა (არასწორი URL)
- **500 Internal Server Error** — სერვერზე შეცდომა მოხდა
- **503 Service Unavailable** — სერვერი დროებით მიუწვდომელია

> **პრაქტიკული წესი:**
> - **2xx** — ყველაფერი კარგადაა
> - **3xx** — გადამისამართება (redirect)
> - **4xx** — კლიენტის (თქვენი კოდის) შეცდომა
> - **5xx** — სერვერის შეცდომა (backend-ის პრობლემა)

---

## ეტაპი 9: Timing Breakdown — მოთხოვნის დროითი ანალიზი

### 9.1 Timing ჩანართი

1. დააჭირეთ **„მომხმარებლების ჩატვირთვა"**
2. Network-ში `users` მოთხოვნაზე დააჭირეთ
3. გახსენით **Timing** ჩანართი

### 9.2 დროითი ეტაპები

- **Queueing** — მოთხოვნა რიგში დგას. გავლენა: ბრაუზერი ერთდროულად 6 კავშირს უშვებს ერთ დომეინზე
- **Stalled** — მოთხოვნა დაბლოკილია (proxy, cache check). გავლენა: ჩვეულებრივ მცირეა
- **DNS Lookup** — დომეინის IP მისამართად გარდაქმნა. გავლენა: პირველ ჯერზე შეიძლება ნელი იყოს
- **Initial connection** — TCP კავშირის დამყარება. გავლენა: HTTPS-ით — SSL/TLS handshake-ს მოიცავს
- **SSL** — უსაფრთხო კავშირის დამყარება. გავლენა: HTTPS მოთხოვნებისთვის
- **TTFB** — Time To First Byte — სერვერის პასუხის მოლოდინი. გავლენა: **ყველაზე მნიშვნელოვანი მეტრიკა** — სერვერის სიჩქარე
- **Content Download** — შიგთავსის ჩამოტვირთვა. გავლენა: ფაილის ზომაზე და ქსელის სიჩქარეზე დამოკიდებული

### 9.3 TTFB — ყველაზე მნიშვნელოვანი მეტრიკა

**Time To First Byte (TTFB)** — დრო, რომელიც სჭირდება სერვერს პირველი ბაიტის გამოგზავნას.

- **კარგი TTFB:** < 200ms
- **დამაკმაყოფილებელი:** 200-600ms
- **ცუდი:** > 600ms

```
Client ──── request ──────> Server
  │                           │
  │    TTFB = სერვერის        │
  │    მუშაობის დრო           │
  │                           │
  │ <───── first byte ────────│
```

ჩვენი `users` მოთხოვნისთვის TTFB დაახლოებით 100-400ms იქნება (JSONPlaceholder უფასო API-ა და სხვადასხვა დროს სხვადასხვა სიჩქარე აქვს).

### 9.4 Waterfall დიაგრამა

Network Panel-ის **Waterfall** სვეტში ყოველი მოთხოვნის ვიზუალური timeline ჩანს:

- **ღია ფერი** — Queueing/Stalled
- **მუქი მწვანე** — TTFB
- **ლურჯი** — Content Download

რაც უფრო გრძელია ბარი, მით მეტი დრო სჭირდება მოთხოვნას. რამდენიმე მოთხოვნის Waterfall-ის შედარებით ხედავთ, რომელია ყველაზე ნელი.

> **Waterfall-ის წაკითხვის წესი:** თუ მოთხოვნები ერთმანეთის ქვემოთ „კიბეებივით" წყობილია, ისინი **თანმიმდევრულად** შესრულდა (ერთი მეორეს ელოდება). თუ პარალელურად — ბრაუზერი ერთდროულად რამდენიმეს ტვირთავს. პარალელური ტვირთვა სწრაფია.

---

## ეტაპი 10: პრაქტიკული სავარჯიშო — ყველაფრის ერთად გამოყენება

### 10.1 სავარჯიშო: სრული მოთხოვნის ანალიზი

1. Network Panel გახსენით, **Clear** (🚫) დააჭირეთ ძველი მოთხოვნების წასაშლელად
2. დააჭირეთ **„პოსტების ჩატვირთვა"**
3. `posts` მოთხოვნაზე შეავსეთ ეს ცხრილი:

- **Request URL** — `https://jsonplaceholder.typicode.com/posts`
- **Method** — ?
- **Status Code** — ?
- **Content-Type** — ?
- **Response Size** — ?
- **TTFB** — ?
- **ჩანაწერების რაოდენობა** — ?

### 10.2 სავარჯიშო: 404-ის ანალიზი

1. დააჭირეთ **„არასწორი URL (404)"**
2. Network-ში იპოვეთ ეს მოთხოვნა
3. შეადარეთ წარმატებულ მოთხოვნას:
   - რა განსხვავებაა Status-ში?
   - რა ჩანს Preview-ში?
   - რა ჩანს Console-ში?

### 10.3 სავარჯიშო: Throttling-ის ეფექტი

1. აირჩიეთ **Slow 3G** throttling
2. ჩატვირთეთ „კომენტარების ჩატვირთვა" (ეს ყველაზე დიდი dataset-ია)
3. ჩაინიშნეთ დრო Timing ჩანართიდან
4. გამორთეთ throttling (**No throttling**) და ისევ ჩატვირთეთ
5. შეადარეთ დროები

---

## შეჯამება

### Sources Panel — რა ვისწავლეთ?

- **File Tree (Navigator)** — პროექტის ფაილების ნახვა
- **Source Code Viewer** — ბრაუზერში ჩატვირთული კოდის წაკითხვა
- **`debugger;` statement** — კოდში ჩაშენებული გაჩერების წერტილი
- **Breakpoints** — DevTools-ში დასმული გაჩერების წერტილები (კოდს არ ეხება)
- **Conditional Breakpoints** — პირობითი გაჩერება — მხოლოდ კონკრეტულ მდგომარეობაში
- **Step Over / Into / Out** — კოდის ხაზ-ხაზ შესრულება
- **Scope Panel** — ცვლადების მნიშვნელობების ნახვა გაჩერების დროს
- **Snippets** — ხშირად გამოყენებული სკრიპტების შენახვა და გაშვება

### Network Panel — რა ვისწავლეთ?

- **Request List** — ყველა ქსელური მოთხოვნის სია
- **Headers** — request/response მეტა-ინფორმაცია
- **Preview / Response** — სერვერის პასუხის ნახვა
- **Timing** — მოთხოვნის დროითი დაშლა (DNS, TTFB, Download)
- **ფილტრები (XHR, JS, CSS, Img)** — მოთხოვნების ტიპის მიხედვით ფილტრაცია
- **Throttling** — ნელი ქსელის სიმულაცია
- **Waterfall** — მოთხოვნების ვიზუალური timeline
- **Disable cache** — ქეშის გამორთვა ტესტირების დროს

### მთავარი წესები

1. **Sources Panel** — კოდის debugging-ის მთავარი ინსტრუმენტი. Breakpoint-ები `console.log`-ზე ეფექტურია — ცვლადების მნიშვნელობები Scope-ში ჩანს, კოდი ხაზ-ხაზ შეიძლება შესრულდეს.
2. **`debugger;`** — სწრაფი, მაგრამ დროებითი. production კოდში **არასოდეს** დატოვოთ.
3. **Snippets** — ხშირად გამოყენებული debugging სკრიპტები შეინახეთ Snippet-ებად. ისინი DevTools-ში რჩება და ნებისმიერ საიტზე ხელმისაწვდომია.
4. **Network Panel** — API-სთან მუშაობისას **პირველი**, რაც უნდა შეამოწმოთ. Status code, response body, და timing — ეს სამი რამ მოგცემთ პასუხს, რატომ არ მუშაობს API call.
5. **Throttling** — ყოველთვის შეამოწმეთ, როგორ მუშაობს აპლიკაცია Slow 3G-ზე. თუ არ მუშაობს — ოპტიმიზაცია გჭირდებათ.
6. **TTFB** — თუ TTFB მაღალია, პრობლემა სერვერზეა (ნელი database query, არაოპტიმალური API). თუ Content Download გრძელია — ფაილი ძალიან დიდია (კომპრესია, lazy loading გჭირდებათ).
