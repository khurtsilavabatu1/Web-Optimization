# დავალება 2: კოდის გამართვა (Debugging)

**კვირა:** 3-4  
**ტიპი:** პრაქტიკული დავალება  
**წონა:** პრაქტიკული დავალება (სწ.შ. #2)

---

## დავალების აღწერა

4 ნაწილიანი დავალება, რომელიც მოიცავს შეცდომების პოვნას, DevTools-ის ფლობას, React debugging-ს და Memory Leak ანალიზს.

---

## ნაწილი 1: შეცდომების პოვნა და კლასიფიკაცია (ლექცია 1-ის მასალა)

### 1.1 JavaScript ფუნქციების Debugging

თითოეული ფუნქცია შეცდომ(ებ)ს შეიცავს. იპოვეთ, დაასახელეთ ტიპი (Syntax/Runtime/Logic), გამოასწორეთ.

```javascript
// ფუნქცია 1: მასივის დუბლიკატების მოშორება
function removeDuplicates(arr) {
  const result = [];
  for (let i = 0; i <= arr.length; i++) {
    if (result.indexOf(arr[i] === -1)) {
      result.push(arr[i]);
    }
  }
  return result;
}
// Test: removeDuplicates([1, 2, 2, 3, 3, 4]) → [1, 2, 3, 4]


// ფუნქცია 2: ობიექტების ფილტრაცია ფასით
function filterByPrice(products, minPrice, maxPrice) {
  return products.filter(product => {
    product.price >= minPrice && product.price <= maxPrice;
  });
}
// Test: filterByPrice([{name:'A', price:10}, {name:'B', price:50}], 5, 30) → [{name:'A', price:10}]


// ფუნქცია 3: async fetch
async function fetchUserData(userId) {
  const response = fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  const data = response.json();
  return data;
}
// Test: fetchUserData(1) → user object


// ფუნქცია 4: deep clone
function deepClone(obj) {
  const clone = {};
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      clone[key] = deepClone(obj[key]);
    } else {
      clone[key] = obj[key];
    }
  }
  return clone;
}
// Test: deepClone({a: 1, b: [1,2], c: null}) — რა პრობლემებია null-ით და Array-ით?


// ფუნქცია 5: debounce
function debounce(func, delay) {
  let timeoutId;
  return function() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func();
    }, delay);
  };
}
// Test: const debouncedLog = debounce((msg) => console.log(msg), 300);
//       debouncedLog('hello') → 'hello' არ დაილოგება. რატომ?
```

**თითოეულისთვის ჩაწერეთ:**

| # | შეცდომის ტიპი | აღწერა | გამოსწორებული კოდი |
|---|-------------|--------|-------------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

---

## ნაწილი 2: Console და Elements Panel (ლექცია 2-ის მასალა)

### 2.1 Console API
გახსენით ნებისმიერი ვებგვერდი და Console-ში შეასრულეთ. ჩაწერეთ შედეგები:

```javascript
// 1. იპოვეთ გვერდზე ყველა img ელემენტი და მათი src
$$('img').map(img => ({ src: img.src, alt: img.alt }))
// შედეგი: ___

// 2. გაზომეთ DOM-ის ზომა
document.querySelectorAll('*').length
// შედეგი: ___

// 3. იპოვეთ ყველა external script
$$('script[src]').map(s => s.src)
// შედეგი: ___

// 4. console.table — გვერდის ლინკები
console.table($$('a').slice(0, 10).map(a => ({text: a.textContent.trim().slice(0, 30), href: a.href})))
// screenshot ჩაამატეთ

// 5. console.time — DOM traversal-ის დრო
console.time('DOM');
document.querySelectorAll('div').length;
console.timeEnd('DOM');
// შედეგი: ___
```

### 2.2 Elements Panel
1. აირჩიეთ header ელემენტი → ჩაწერეთ Computed font-size: ___
2. Force State → :hover → რა იცვლება? ___
3. შეცვალეთ background-color → screenshot

---

## ნაწილი 3: Network Tab და Breakpoints (ლექცია 3-ის მასალა)

### 3.1 Network Analysis
1. გახსენით ვებგვერდი, Network tab, Disable cache, Reload
2. შეავსეთ:

| მეტრიკა | მნიშვნელობა |
|---------|-------------|
| ჯამური requests | |
| ჯამური ზომა (transferred) | |
| ყველაზე დიდი ფაილი | |
| ყველაზე ნელი request | |
| DOM Content Loaded | |
| Load | |

### 3.2 API Call Debugging
Console-ში გაუშვით:
```javascript
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(r => r.json())
  .then(data => console.log(data))
```

Network tab-ში იპოვეთ და ჩაწერეთ:
- Status Code: ___
- Content-Type: ___
- Response Size: ___
- TTFB: ___

### 3.3 Throttling ტესტი
1. Network → Slow 3G → Reload
2. ჩატვირთვის დრო: ___
3. რომელი რესურსი ყველაზე მეტხანს იტვირთება? ___
4. რა გამოცდილებას მიიღებდა მომხმარებელი? ___

---

## ნაწილი 4: React Debugging და Memory (ლექცია 4-ის მასალა)

### 4.1 React კომპონენტის Debugging

```jsx
// ეს კომპონენტი 4 ბაგს შეიცავს — DevTools-ით იპოვეთ

import React, { useState, useEffect } from 'react';

function UserSearch() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.length < 2) return;
    setLoading(true);
    setError(null);

    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users?q=${query}`
        );
        if (!res.ok) throw new Error('ფეჩი ვერ მოხერხდა');
        const data = await res.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        // BUG 1: loading state არ იცვლება error-ის დროს
      }
    };

    fetchUsers();
    // BUG 2: cleanup/abort არ არის
  }, [query]);

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {loading && <p>იტვირთება...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* BUG 3: loading-ის დროს ძველი შედეგებიც ჩანს */}
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} — {user.email}</li>
        ))}
      </ul>
      {/* BUG 4: ეს message loading-ის დროსაც ჩანს */}
      {!loading && users.length === 0 && query.length >= 2 && (
        <p>ვერ მოიძებნა</p>
      )}
    </div>
  );
}
```

**თითოეული ბაგისთვის:**

| # | ტიპი | როგორ იპოვეთ (ინსტრუმენტი) | გამოსწორებული კოდი |
|---|------|---------------------------|-------------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |

### 4.2 Memory Leak Detection
1. გახსენით Performance Monitor (Cmd+Shift+P → "Performance Monitor")
2. 30 წამი აქტიურად იმუშავეთ აპლიკაციაში
3. ჩაწერეთ:
   - JS Heap Size: ___ → ___  (იზრდება?)
   - DOM Nodes: ___ → ___  (იზრდება?)
   - Event Listeners: ___ → ___  (იზრდება?)
4. დასკვნა: არის Memory Leak? ___

---

## ჩასაბარებელი მასალა

1. **ნაწილი 1:** გამოსწორებული კოდი + ბაგების ცხრილი
2. **ნაწილი 2:** Console/Elements შედეგები + screenshots
3. **ნაწილი 3:** Network ანალიზის ცხრილი + API debugging
4. **ნაწილი 4:** React ბაგები + Memory analysis screenshots

## შეფასების კრიტერიუმები

| კრიტერიუმი | ქულა |
|-----------|-------|
| ნაწილი 1: JS ბაგების პოვნა/გამოსწორება | 25 |
| ნაწილი 2: Console/Elements ფლობა | 20 |
| ნაწილი 3: Network/Breakpoints | 25 |
| ნაწილი 4: React debugging + Memory | 30 |
| **სულ** | **100** |
