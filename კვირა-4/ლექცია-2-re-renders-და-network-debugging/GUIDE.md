# Re-renders და Network Debugging — ეტაპობრივი გაიდი

ამ პრაქტიკაში თქვენ შეადარებთ ორ React კომპონენტს — ოპტიმიზაციის გარეშე და ოპტიმიზაციით — და თვალით დაინახავთ, როგორ ამცირებს `React.memo`, `useMemo` და `useCallback` ზედმეტ re-render-ებს. ამის შემდეგ ისწავლით Network tab-ით API request-ების ინსპექტირებას — წარმატებული და შეცდომიანი response-ების ანალიზს.

პროექტი მდებარეობს `demo-rerender-network/` ფოლდერში.

**პროექტი არის სრული Vite + React აპლიკაცია** Before/After შედარებით:
- **`src/App.jsx`** — მთავარი კომპონენტი, Before/After სექციები
- **`src/components/before/`** — ოპტიმიზაციის გარეშე კომპონენტები
  - `UserListBefore.jsx` — მომხმარებლების სია
  - `UserCardBefore.jsx` — ცალკეული მომხმარებლის ბარათი
  - `ExpensiveStatsBefore.jsx` — მძიმე გამოთვლა
- **`src/components/after/`** — ოპტიმიზებული კომპონენტები (React.memo, useMemo, useCallback)
  - `UserListAfter.jsx`
  - `UserCardAfter.jsx`
  - `ExpensiveStatsAfter.jsx`
- **`src/components/APIDemo.jsx`** — Network debugging დემო

---

## წინაპირობა: პროექტის გაშვება

```bash
cd ~/Desktop/Web-optimization/კვირა-4/ლექცია-2-re-renders-და-network-debugging/demo-rerender-network
npm install
npm run dev
```

გახსენით ბრაუზერში: `http://localhost:5173`

> **რატომ Vite?** Vite გთავაზობთ სწრაფ HMR-ს და რეალურ პროექტის სტრუქტურას. კომპონენტები დაყოფილია ცალკეულ ფაილებად, რაც უფრო ახლოსაა რეალურ პროდაქშენ სეტაპთან.

---

## ეტაპი 1: "ოპტიმიზაციამდე" სექციის დაკვირვება

### 1.1 Render Counter-ების ნახვა

გახსენით გვერდი და დააკვირდით მარცხენა სვეტს — **"ოპტიმიზაციამდე (Before)"**. ყოველ კომპონენტზე ხედავთ ბეჯს:

```
renders: 1
```

ეს ნიშნავს, რომ კომპონენტი ერთხელ დარენდერდა (საწყისი render). ბეჯი **წითელია** თუ render-ების რაოდენობა 1-ზე მეტია, და **მწვანე** თუ მხოლოდ 1-ჯერ დარენდერდა.

### 1.2 Search-ში აკრეფა

აკრიფეთ რამდენიმე ასო საძიებო ველში, მაგალითად: `ნ`, `ნი`, `ნინ`.

**რას ხედავთ:**
- UserList-ის render counter იზრდება: `renders: 2`, `renders: 3`, `renders: 4`...
- **ყოველი დარჩენილი** UserCard-ის counter იზრდება — ფილტრაციით გაქრობილი Card-ები unmount ხდება (ამოიღება), და ძიების წაშლისას თავიდან იქმნება renders: 1-ით
- ExpensiveStats-ის counter-იც იზრდება — მძიმე გამოთვლა ყოველ აკრეფაზე ხელახლა ეშვება!

> **რატომ ხდება ეს?** React-ში, როცა parent კომპონენტის state იცვლება (`search` state), parent ხელახლა რენდერდება. ხელახლა რენდერისას React ყველა child კომპონენტსაც ხელახლა რენდერავს — მიუხედავად იმისა, შეიცვალა მათი props თუ არა. ეს არის React-ის default ქცევა.

### 1.3 შეფერხების შემჩნევა

სწრაფად აკრიფეთ გრძელი ტექსტი. `ExpensiveStatsBefore` ყოველ რენდერზე 25,000-მდე მარტივ რიცხვს ითვლის — ეს არის **"მძიმე გამოთვლა"** რომელიც არ არის კეშირებული. სწრაფ კომპიუტერზე lag-ი შეიძლება ვერ იგრძნოთ, მაგრამ Profiler-ში ნახავთ, რომ `ExpensiveStats` ყოველ ასოზე ზედმეტ დროს ხარჯავს. რეალურ პროექტში, სადაც გაცილებით მეტი მონაცემი ან API-ს გამოძახება იქნება, შეფერხება აუცილებლად იგრძნობა.

Console-ში (Cmd+Option+J) შეგიძლიათ ნახოთ, რომ ყოველ აკრეფაზე ახალი render ხდება.

---

## ეტაპი 2: React DevTools Profiler-ით ანალიზი

### 2.1 Profiler ჩაწერა "Before" სექციაზე

1. გახსენით **React DevTools** → **Profiler** tab
2. დააჭირეთ **Record** ღილაკს (ლურჯი წრე)
3. მარცხენა სვეტის საძიებო ველში აკრიფეთ 3-4 ასო
4. დააჭირეთ **Stop**

**Flamegraph-ში ნახავთ:**
- ყოველ commit-ზე (ყოველ აკრეფაზე) **ყველა** კომპონენტი ფერადია — ანუ ყველა დარენდერდა
- `UserCardBefore` კომპონენტები ერთი და იგივე props-ით არენდერდნენ — ზედმეტი სამუშაო!

### 2.2 Render მიზეზის ნახვა

1. Profiler Settings-ში ჩართეთ: **"Record why each component rendered while profiling"**
2. ხელახლა ჩაწერეთ
3. Flamegraph-ში დააჭირეთ ნებისმიერ `UserCardBefore` კომპონენტს

**ნახავთ:**
```
Why did this render?
- The parent component rendered
```

ეს ადასტურებს — UserCard ხელახლა რენდერდა მხოლოდ იმიტომ, რომ მისი parent (UserList) ხელახლა დარენდერდა, და არა იმიტომ, რომ მისი props შეიცვალა.

---

## ეტაპი 3: "ოპტიმიზაციის შემდეგ" სექციის შედარება

### 3.1 Search-ში აკრეფა "After" სექციაში

ახლა გადახედეთ მარჯვენა სვეტს — **"ოპტიმიზაციის შემდეგ (After)"**.

აკრიფეთ იგივე ასოები (`ნ`, `ნი`, `ნინ`):

- **UserList**-ის counter იზრდება (parent-ის state იცვლება — ეს გარდაუვალია)
- **UserCard**-ების counter-ები **არ** იზრდება! მწვანე ბეჯი რჩება `renders: 1`
- **ExpensiveStats**-ის counter-იც **არ** იზრდება!

> **რა შეიცვალა?** სამი ოპტიმიზაციის ინსტრუმენტი ამუშავდა:
> - `React.memo` — UserCard-ს ახვევს და props-ს ადარებს. თუ props არ შეცვლილა, render-ს გამოტოვებს
> - `useMemo` — მძიმე გამოთვლის შედეგს კეშავს. ხელახლა ითვლის მხოლოდ dependency-ების ცვლილებაზე
> - `useCallback` — ფუნქციის რეფერენსს ინახავს სტაბილურად. React.memo-ს ეხმარება props-ის სწორ შედარებაში

### 3.2 Profiler-ით შედარება

1. ხელახლა ჩაწერეთ Profiler-ით — ამჯერად მარჯვენა სვეტის საძიებო ველში აკრიფეთ
2. Flamegraph-ში ნახავთ:
   - `UserCardAfter` კომპონენტები **ნაცრისფერია** (grayed out) — ეს ნიშნავს, რომ არ დარენდერდნენ!
   - `ExpensiveStatsAfter` ასევე ნაცრისფერია
   - მხოლოდ `UserListAfter` (parent) არის ფერადი

**ეს არის ოპტიმიზაციის ეფექტი** — ნაკლები render = ნაკლები სამუშაო = სწრაფი აპლიკაცია.

---

## ეტაპი 4: React.memo, useMemo, useCallback — ახსნა

### 4.1 React.memo

**გარეშე:**
```jsx
function UserCard({ user }) {
  // ყოველთვის რენდერდება, როცა parent რენდერდება
  return <div>{user.name}</div>;
}
```

**React.memo-თი:**
```jsx
const UserCard = React.memo(function UserCard({ user }) {
  // რენდერდება მხოლოდ user prop-ის ცვლილებაზე
  return <div>{user.name}</div>;
});
```

> **როგორ მუშაობს:** `React.memo` ახვევს კომპონენტს და render-მდე ადარებს წინა props-ს ახალ props-ს (shallow comparison). თუ props არ შეცვლილა, React გამოტოვებს render-ს და ბოლო შედეგს ხელახლა გამოიყენებს.

### 4.2 useMemo

**გარეშე:**
```jsx
function Stats({ users }) {
  // ყოველ რენდერზე 25,000 მარტივ რიცხვს ითვლის!
  const primeCount = countPrimes(25000);
  return <div>{primeCount}</div>;
}
```

**useMemo-თი:**
```jsx
function Stats({ users }) {
  // ითვლის მხოლოდ ერთხელ, შედეგს კეშავს
  const primeCount = useMemo(() => countPrimes(25000), []);
  return <div>{primeCount}</div>;
}
```

> **როგორ მუშაობს:** `useMemo` იღებს ფუნქციას და dependency მასივს. პირველ რენდერზე ფუნქციას ეშვება და შედეგს ინახავს. შემდეგ რენდერებზე — თუ dependency-ები არ შეცვლილა — კეშირებულ შედეგს აბრუნებს ხელახალი გამოთვლის გარეშე.

### 4.3 useCallback

**გარეშე:**
```jsx
function UserList() {
  // ყოველ რენდერზე ახალი ფუნქციის ობიექტი იქმნება
  const handleClick = (user) => {
    console.log(user.name);
  };

  return <UserCard onClick={handleClick} />;
  // React.memo ვერ დაეხმარება — handleClick ყოველთვის "ახალი" props-ია!
}
```

**useCallback-ით:**
```jsx
function UserList() {
  // ფუნქციის რეფერენსი სტაბილურია — იგივე ობიექტია ყოველ რენდერზე
  const handleClick = useCallback((user) => {
    console.log(user.name);
  }, []);

  return <UserCard onClick={handleClick} />;
  // React.memo ხედავს, რომ onClick არ შეცვლილა — render გამოტოვდება!
}
```

> **როგორ მუშაობს:** JavaScript-ში ყოველი `() => {}` ახალ ფუნქციის ობიექტს ქმნის. `useCallback` ინახავს ფუნქციის რეფერენსს და იგივეს აბრუნებს, სანამ dependency-ები არ შეიცვლება. ეს აუცილებელია `React.memo`-სთან ერთად მუშაობისთვის — წინააღმდეგ შემთხვევაში `memo` ყოველთვის "ახალ" props-ს დაინახავს.

> **მნიშვნელოვანი გაფრთხილება:** ნუ გამოიყენებთ `React.memo`, `useMemo` და `useCallback`-ს ყველგან "ყოველი შემთხვევისთვის"! ოპტიმიზაციის ამ ინსტრუმენტებს თავისი ფასი აქვს — დამატებითი მეხსიერება props-ის შედარებისთვის და კეშირებული მნიშვნელობებისთვის. **გამოიყენეთ მხოლოდ მაშინ, როცა Profiler-ით რეალურ performance პრობლემას დაინახავთ.** Premature optimization — "ოპტიმიზაცია პრობლემის დანახვამდე" — თავისთავად პრობლემაა.

---

## ეტაპი 5: Network Debugging — წარმატებული Request

### 5.1 Network Tab-ის გახსნა

1. DevTools გახსენით: **Cmd+Option+I** (Mac) ან **Ctrl+Shift+I** (Windows/Linux)
2. გადაერთეთ **Network** tab-ზე
3. ფილტრში აირჩიეთ **Fetch/XHR** — ეს აჩვენებს მხოლოდ API request-ებს (CSS, JS, სურათები გაიფილტრება)

### 5.2 "Load Users" ღილაკზე დაჭერა

გვერდის ქვედა ნაწილში — **"API Demo"** სექციაში — დააჭირეთ **"Load Users"** ღილაკს.

**რას ხედავთ აპლიკაციაში:**
1. ჯერ — loading spinner (მონაცემები იტვირთება...)
2. შემდეგ — მწვანე Status chip (`Status: 200`) და response time
3. ცხრილი 10 მომხმარებლით

**რას ხედავთ Network tab-ში:**
- ახალი ჩანაწერი: `users` (ან სრული URL)
- Status: `200`
- Type: `fetch`

### 5.3 Request-ის ინსპექტირება

Network tab-ში დააჭირეთ `users` ჩანაწერს. გაიხსნება დეტალური ინფორმაცია:

**Headers tab:**

- **Request URL** — `https://jsonplaceholder.typicode.com/users` — სად გაიგზავნა request
- **Request Method** — `GET` — მონაცემების მოთხოვნა (არა შეცვლა)
- **Status Code** — `200 OK` — წარმატება
- **Content-Type** — `application/json; charset=utf-8` — პასუხი JSON ფორმატშია

**Response tab:**
- JSON მონაცემები — 10 მომხმარებლის ობიექტი name, email, phone, company და სხვა ველებით

**Timing tab:**

- **Stalled / Queueing** — ბრაუზერმა request-ის გაგზავნა დააყოვნა (ხშირად მინიმალურია)
- **DNS Lookup** — დომენის IP მისამართად გარდაქმნა
- **Initial Connection** — TCP კავშირის დამყარება
- **SSL** — HTTPS-ის უსაფრთხოების handshake
- **TTFB** — Time to First Byte — სერვერიდან პირველი ბაიტის მიღებამდე დრო
- **Content Download** — მონაცემების ჩამოტვირთვის დრო

> **TTFB (Time to First Byte)** არის ყველაზე მნიშვნელოვანი მეტრიკა სერვერის სიჩქარის შესაფასებლად. თუ TTFB მაღალია — პრობლემა სერვერზეა (ნელი database query, მძიმე გამოთვლა). თუ Content Download მაღალია — პასუხი ძალიან დიდია (საჭიროა pagination ან compression).

---

## ეტაპი 6: Network Debugging — შეცდომიანი Request

### 6.1 "Load Error" ღილაკზე დაჭერა

დააჭირეთ **"Load Error (404)"** ღილაკს.

**რას ხედავთ აპლიკაციაში:**
1. Loading spinner
2. წითელი Status chip (`Status: 404`)
3. წითელი error შეტყობინება: `HTTP 404: Not Found`

**რას ხედავთ Network tab-ში:**
- ახალი ჩანაწერი **წითლად** მონიშნული
- Status: `404`

### 6.2 Error Response-ის ანალიზი

დააჭირეთ წითელ ჩანაწერს Network tab-ში:

- **Headers tab:** Status Code `404 Not Found` — რესურსი ვერ მოიძებნა
- **Response tab:** ცარიელი ობიექტი `{}` — სერვერმა ვერ იპოვა მოთხოვნილი endpoint

### 6.3 აპლიკაციის Error Handling

ჩვენი აპლიკაცია სწორად ამუშავებს შეცდომას:

```jsx
if (!response.ok) {
  throw new Error(`HTTP ${response.status}: ${response.statusText}`);
}
```

**რა ხდება:**
1. `fetch()` წარმატებით ასრულებს request-ს (404 არის ვალიდური HTTP response)
2. `response.ok` ამოწმებს — status code 200-299 დიაპაზონშია?
3. 404 არ არის ამ დიაპაზონში → `throw new Error(...)` — Error ობიექტი იქმნება
4. `catch` ბლოკი იჭერს შეცდომას და მომხმარებელს აჩვენებს

> **მნიშვნელოვანი:** `fetch()` არ "აგდებს" შეცდომას 404-ზე ან 500-ზე! `fetch()` მხოლოდ **ქსელის შეცდომაზე** აგდებს Error-ს (მაგ., ინტერნეტი გათიშულია). HTTP სტატუს კოდების შემოწმება **თქვენი პასუხისმგებლობაა** — `response.ok` ან `response.status`-ით.

---

## ეტაპი 7: CORS — კონცეპტუალური ახსნა

### 7.1 რა არის CORS?

**CORS (Cross-Origin Resource Sharing)** არის ბრაუზერის უსაფრთხოების მექანიზმი, რომელიც აკონტროლებს — შეუძლია თუ არა ერთ წარმომავლობის (origin) ვებ-გვერდს სხვა წარმომავლობის სერვერთან მონაცემების მოთხოვნა.

**რა არის "Origin"?**
```
https://myapp.com:3000
  │         │       │
  │         │       └── პორტი
  │         └── დომენი
  └── პროტოკოლი

ეს სამი ნაწილი ერთად = Origin
```

**Cross-origin request ხდება, როცა:**
- `http://localhost:3000` → `https://api.example.com` (სხვა დომენი)
- `http://localhost:3000` → `http://localhost:5000` (სხვა პორტი)
- `http://site.com` → `https://site.com` (სხვა პროტოკოლი)

**Console-ში CORS შეცდომა ასე გამოიყურება:**
```
Access to fetch at 'https://api.example.com/data' from origin 'http://localhost:3000'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
on the requested resource.
```

### 7.2 გამოსწორების გზები

- **Backend CORS headers** — როდის: Production-ში — როგორ: სერვერზე `Access-Control-Allow-Origin` header-ის დამატება
- **Vite/Webpack proxy** — როდის: Development-ში — როგორ: `vite.config.js`-ში `proxy` კონფიგურაცია — request სერვერის გავლით მიდის
- **CORS proxy service** — როდის: სწრაფ ტესტირებაში — როგორ: `https://cors-anywhere.herokuapp.com/` — მხოლოდ dev-ისთვის!
- **Browser extension** — როდის: ერთჯერადი ტესტირებისთვის — როგორ: CORS Unblock extension — მხოლოდ dev-ისთვის!

**Vite proxy-ს მაგალითი:**
```javascript
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://api.example.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
}
```

ამის შემდეგ `fetch('/api/data')` ბრაუზერიდან Vite სერვერზე მიდის, Vite კი სერვერ-სერვერზე (CORS არ ვრცელდება) გადამისამართებს.

> **შენიშვნა:** ჩვენი demo იყენებს `jsonplaceholder.typicode.com`-ს, რომელიც CORS-ს ნებას რთავს ყველა origin-ისთვის (`Access-Control-Allow-Origin: *`). ამიტომ ჩვენ CORS შეცდომას ვერ დავინახავთ. მაგრამ რეალურ პროექტებში ეს ძალიან ხშირი პრობლემაა.

---

## შეჯამება

- **Re-render პრობლემა** — Parent-ის render ტრიგერავს ყველა Child-ის render-ს — ეს არის React-ის default ქცევა
- **React.memo** — Child-ის render-ის პრევენცია, თუ props არ შეცვლილა (shallow comparison)
- **useMemo** — მძიმე გამოთვლის კეშირება — ხელახლა ითვლის მხოლოდ dependency-ების ცვლილებაზე
- **useCallback** — Callback ფუნქციის რეფერენსის კეშირება — React.memo-სთან ერთად მუშაობს
- **Network Tab** — Request/Response ინსპექტირება — Headers, Response, Timing
- **Error Handling** — `fetch()` არ აგდებს Error-ს 404/500-ზე — `response.ok` შემოწმება აუცილებელია
- **CORS** — Cross-origin request-ების უსაფრთხოების პოლიტიკა — ბრაუზერის დაცვის მექანიზმი

### მთავარი დასკვნები

1. **React-ში ყველა state ცვლილება ტრიგერავს მშობლისა და შვილი კომპონენტების re-render-ს** — ეს ნორმალურია, მაგრამ დიდ აპლიკაციებში performance პრობლემა ხდება
2. **React.memo, useMemo, useCallback — ოპტიმიზაციის ძირითადი ინსტრუმენტები** — გამოიყენეთ მხოლოდ მაშინ, როცა Profiler-ით რეალურ პრობლემას დაინახავთ
3. **Network tab — API debugging-ის მთავარი ინსტრუმენტი** — Headers, Response, Timing ინფორმაცია
4. **ყოველთვის handle error responses** — აპლიკაცია არ უნდა "გაითიშოს" სერვერის შეცდომაზე; მომხმარებელს გასაგები შეტყობინება უნდა მიაწოდოს
