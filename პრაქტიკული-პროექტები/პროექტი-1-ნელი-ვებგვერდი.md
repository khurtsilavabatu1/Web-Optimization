# მინი-პროექტი 1: "ნელი ვებგვერდის" ოპტიმიზაცია

**კვირა:** 1-2 (Performance)  
**დრო:** 2-3 საათი  
**სირთულე:** საშუალო

---

## კონტექსტი
სტუდენტებს ეძლევათ წინასწარ მომზადებული React აპლიკაცია, რომელიც შეგნებულად შეიცავს წარმადობის პრობლემებს. მათი ამოცანაა — იპოვონ და გამოასწორონ ეს პრობლემები.

---

## პროექტის სტრუქტურა

შექმენით ახალი React პროექტი და დაამატეთ შემდეგი ფაილები:

### package.json dependencies:
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "lodash": "^4.17.21",
    "moment": "^2.29.4",
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0"
  }
}
```

### src/App.jsx (არაოპტიმიზირებული ვერსია):
```jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import _ from 'lodash'; // ❌ მთლიანი lodash
import moment from 'moment'; // ❌ moment.js (400KB+)
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import About from './pages/About';

// ❌ ყველა გვერდი ერთ bundle-შია
function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: 'flex', gap: '16px', padding: '16px', borderBottom: '1px solid #ccc' }}>
        <Link to="/">მთავარი</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/settings">პარამეტრები</Link>
        <Link to="/about">ჩვენს შესახებ</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### src/pages/Home.jsx:
```jsx
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import moment from 'moment';

// ❌ 10 დიდი, არაოპტიმიზირებული სურათი (Unsplash-იდან)
const images = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=4000',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=4000',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=4000',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=4000',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=4000',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=4000',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=4000',
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=4000',
  'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=4000',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=4000',
];

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // ❌ სიმულირებული მონაცემები — 1000 პროდუქტი
    const data = Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      price: Math.random() * 1000,
      date: new Date(Date.now() - Math.random() * 10000000000),
      category: ['Electronics', 'Clothing', 'Books', 'Food'][i % 4],
    }));
    setProducts(data);
  }, []);

  // ❌ ფილტრაცია ყოველ keystroke-ზე (debounce გარეშე)
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ❌ მძიმე formatting ყოველ render-ზე, მთელ lodash-ით
  const sortedProducts = _.orderBy(filteredProducts, ['price'], ['desc']);

  return (
    <div style={{ padding: '20px' }}>
      <h1>პროდუქტების კატალოგი</h1>

      {/* ❌ სურათები loading="lazy" გარეშე, ზომები არ აქვს */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Image ${i}`} style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
        ))}
      </div>

      <input
        type="text"
        placeholder="ძებნა..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px 16px', fontSize: '16px', width: '100%', marginBottom: '20px' }}
      />

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #333' }}>სახელი</th>
            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #333' }}>ფასი</th>
            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #333' }}>თარიღი</th>
            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #333' }}>კატეგორია</th>
          </tr>
        </thead>
        <tbody>
          {/* ❌ ყველა 1000 row ერთდროულად რენდერდება */}
          {sortedProducts.map(product => (
            <tr key={product.id}>
              <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{product.name}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                {/* ❌ moment.js ფორმატირებისთვის */}
                ${_.round(product.price, 2)}
              </td>
              <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                {/* ❌ moment.js ყოველ row-ზე */}
                {moment(product.date).format('DD MMM YYYY, HH:mm')}
              </td>
              <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
```

### src/pages/Dashboard.jsx:
```jsx
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Dashboard() {
  const pieData = {
    labels: ['Electronics', 'Clothing', 'Books', 'Food'],
    datasets: [{
      data: [30, 25, 20, 25],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    }],
  };

  const barData = {
    labels: ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი'],
    datasets: [{
      label: 'გაყიდვები',
      data: [1200, 1900, 3000, 5000, 2300, 3200],
      backgroundColor: '#36A2EB',
    }],
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ width: '400px' }}>
          <h2>კატეგორიები</h2>
          <Pie data={pieData} />
        </div>
        <div style={{ width: '600px' }}>
          <h2>გაყიდვები</h2>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
```

### src/pages/Settings.jsx და About.jsx:
```jsx
// Settings.jsx
import React from 'react';

function Settings() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>პარამეტრები</h1>
      <p>პარამეტრების გვერდი</p>
    </div>
  );
}

export default Settings;

// About.jsx
import React from 'react';

function About() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>ჩვენს შესახებ</h1>
      <p>ინფორმაციის გვერდი</p>
    </div>
  );
}

export default About;
```

---

## სტუდენტის ამოცანები

### ნაბიჯი 1: აუდიტი (30 წუთი)
1. გაუშვით `npm run build` — ჩაინიშნეთ bundle ზომა
2. გაუშვით Lighthouse აუდიტი — ჩაინიშნეთ Performance ქულა
3. Bundle Analyzer-ით ნახეთ რომელი ბიბლიოთეკა რამდენს იწონის
4. ჩამოწერეთ ყველა პრობლემა რაც იპოვეთ (მინიმუმ 8)

### ნაბიჯი 2: ბიბლიოთეკების ოპტიმიზაცია (30 წუთი)
1. `lodash` → `lodash-es` ან ცალკეული ფუნქციების import
2. `moment` → `date-fns` ან `Intl.DateTimeFormat`
3. chart.js — lazy load (React.lazy)
4. გაზომეთ ახალი bundle ზომა

### ნაბიჯი 3: Code Splitting (20 წუთი)
1. ყველა გვერდი გადაიყვანეთ React.lazy()-ზე
2. დაამატეთ Suspense fallback
3. Network tab-ში დააკვირდით chunks-ის ჩატვირთვას

### ნაბიჯი 4: სურათების ოპტიმიზაცია (20 წუთი)
1. `loading="lazy"` დამატება
2. `width` და `height` ატრიბუტები (CLS-ის თავიდან ასარიდებლად)
3. მცირე `w` parameter (მაგ. `w=600` ნაცვლად `w=4000`)

### ნაბიჯი 5: Rendering ოპტიმიზაცია (20 წუთი)
1. ძებნის debounce — 300ms delay
2. `useMemo` სორტირებისთვის
3. Pagination ან virtualization (პირველი 50 row)

### ნაბიჯი 6: საბოლოო აუდიტი (20 წუთი)
1. ხელახლა Lighthouse — რამდენით გაუმჯობესდა?
2. Bundle ზომის შედარება (before/after)
3. ჩამოწერეთ რა გააკეთეთ და რა ეფექტი ჰქონდა

---

## მოსალოდნელი შედეგები

| მეტრიკა | ოპტიმიზაციამდე | ოპტიმიზაციის შემდეგ |
|---------|---------------|-------------------|
| Bundle Size | ~800KB | ~200KB |
| Lighthouse Score | 40-60 | 85-95 |
| LCP | 4-6s | 1-2s |
| CLS | 0.3+ | < 0.05 |
| Images | 10 × 4MB | 10 × 50KB (lazy) |

---

## ბონუს ამოცანები (მოწინავე სტუდენტებისთვის)
1. დაამატეთ Service Worker ქეშირებისთვის
2. გამოიყენეთ React.memo() ProductCard კომპონენტზე
3. დაამატეთ virtual scrolling (react-window ან @tanstack/virtual)
4. Preload კრიტიკული რესურსების `<link rel="preload">`
