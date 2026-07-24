/*
    ==========================================
    ✅ კარგი მაგალითი — ოპტიმიზირებული JavaScript
    ==========================================

    გადაწყვეტები ამ ფაილში:
    1. ✅ არ არის მძიმე გამოთვლა main thread-ზე (no long tasks)
    2. ✅ Debounce — ძებნა 300ms დაყოვნებით
    3. ✅ Pagination — მხოლოდ 50 row ჩანს ერთდროულად
    4. ✅ Intl.DateTimeFormat — native API, ბიბლიოთეკა არ სჭირდება (0KB!)
    5. ✅ lodash/moment არ გამოიყენება — native JS ყველაფერს აკეთებს
    6. ✅ innerHTML batch update — ერთი ოპერაციით
    7. ✅ ბანერისთვის ადგილი დაჯავშნულია (CLS fix)
*/

// ==========================================
// ✅ NATIVE DATE FORMATTER (moment.js-ის ნაცვლად)
// ==========================================
// Intl.DateTimeFormat — ბრაუზერის ჩაშენებული API
// 0KB დამატებითი ზომა! (moment.js = 300KB)
const dateFormatter = new Intl.DateTimeFormat("ka-GE", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

// ==========================================
// მონაცემების გენერაცია
// ==========================================
const categories = [
  "ელექტრონიკა",
  "ტანსაცმელი",
  "წიგნები",
  "საკვები",
  "სპორტი",
  "სათამაშოები",
];

const products = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `პროდუქტი #${i + 1}`,
  price: Math.round(Math.random() * 50000) / 100,
  date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
  category: categories[i % categories.length],
}));

// ==========================================
// ✅ PAGINATION — მხოლოდ 50 row ერთდროულად
// ==========================================
const PAGE_SIZE = 50;
let currentPage = 1;
let currentData = products;

function renderProducts(data, page) {
  const tbody = document.getElementById("product-body");
  const visibleData = data.slice(0, page * PAGE_SIZE);

  // ✅ innerHTML ერთი assignment — ბევრად სწრაფია ვიდრე ცალ-ცალკე appendChild
  tbody.innerHTML = visibleData
    .map(
      (product) => `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${dateFormatter.format(product.date)}</td>
            <td>${product.category}</td>
        </tr>
    `,
    )
    .join("");

  document.getElementById("product-count").textContent =
    `ნაჩვენებია ${visibleData.length} / ${data.length} პროდუქტი`;

  // „მეტის ჩვენება" ღილაკის ხილვადობა
  const loadMoreBtn = document.getElementById("load-more");
  if (visibleData.length >= data.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "inline-block";
  }
}

// პირველადი რენდერი — მხოლოდ 50 row!
renderProducts(products, 1);

// ==========================================
// ✅ DEBOUNCE — 300ms დაყოვნება
// ==========================================
// keystroke-ის შემდეგ 300ms ელოდება შემდეგს.
// თუ მომხმარებელი კიდევ ბეჭდავს, timer გადაიწყება.
// ეს main thread-ს ათავისუფლებს — არა long task!
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const handleSearch = debounce(function (term) {
  term = term.toLowerCase();

  // ✅ ეფექტური ფილტრაცია — მხოლოდ name და category
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term),
  );

  // ✅ Native sort — lodash არ სჭირდება
  filtered.sort((a, b) => b.price - a.price);

  currentData = filtered;
  currentPage = 1;
  renderProducts(filtered, 1);
}, 300);

document.getElementById("search").addEventListener("input", function (e) {
  handleSearch(e.target.value);
});

// ==========================================
// ✅ LOAD MORE (pagination)
// ==========================================
document.getElementById("load-more").addEventListener("click", function () {
  currentPage++;
  renderProducts(currentData, currentPage);
});

// ==========================================
// ✅ BANNER WITH RESERVED SPACE (CLS FIX!)
// ==========================================
// ადგილი დაჯავშნულია min-height-ით HTML-ში
// როცა ბანერი ჩაისმება, არაფერი არ ინაცვლებს!
setTimeout(() => {
  const banner = document.getElementById("banner-container");
  banner.innerHTML = `
        <div class="promo-banner">
            <strong>სპეციალური შეთავაზება!</strong>
            ყველა პროდუქტზე 50% ფასდაკლება — მხოლოდ დღეს!
            <br><small>✅ ადგილი დაჯავშნული იყო — Layout Shift არ მოხდა!</small>
        </div>
    `;
}, 2000);

// ==========================================
// ✅ EFFICIENT STATS — ერთი iteration
// ==========================================
setTimeout(() => {
  // ✅ ერთ loop-ში ყველაფერს ვითვლით
  let total = 0,
    min = Infinity,
    max = -Infinity,
    sum = 0;
  const categorySet = new Set();

  for (const p of products) {
    total++;
    sum += p.price;
    if (p.price < min) min = p.price;
    if (p.price > max) max = p.price;
    categorySet.add(p.category);
  }

  const avg = sum / total;

  document.getElementById("stats-content").innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="number">${total}</div>
                <div class="label">სულ პროდუქტი</div>
            </div>
            <div class="stat-card">
                <div class="number">$${avg.toFixed(2)}</div>
                <div class="label">საშუალო ფასი</div>
            </div>
            <div class="stat-card">
                <div class="number">$${max.toFixed(2)}</div>
                <div class="label">მაქსიმალური</div>
            </div>
            <div class="stat-card">
                <div class="number">$${min.toFixed(2)}</div>
                <div class="label">მინიმალური</div>
            </div>
            <div class="stat-card">
                <div class="number">${categorySet.size}</div>
                <div class="label">კატეგორია</div>
            </div>
        </div>
    `;
}, 100);

// ==========================================
// Console-ში Performance ინფორმაცია
// ==========================================
window.addEventListener("load", () => {
  setTimeout(() => {
    const perf = performance.getEntriesByType("navigation")[0];
    console.group("📊 კარგი მაგალითის Performance მეტრიკები");
    console.log(`TTFB: ${Math.round(perf.responseStart)}ms`);
    console.log(
      `DOM Content Loaded: ${Math.round(perf.domContentLoadedEventEnd)}ms`,
    );
    console.log(`Load Event: ${Math.round(perf.loadEventEnd)}ms`);
    console.log(
      `Total Resources: ${performance.getEntriesByType("resource").length}`,
    );

    const resources = performance.getEntriesByType("resource");
    const totalSize = resources.reduce(
      (sum, r) => sum + (r.transferSize || 0),
      0,
    );
    console.log(`Total Transfer Size: ${Math.round(totalSize / 1024)}KB`);
    console.groupEnd();

    // CLS monitoring
    if (window.PerformanceObserver) {
      let clsScore = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsScore += entry.value;
            console.log(
              `Layout Shift: ${entry.value.toFixed(4)}, Total CLS: ${clsScore.toFixed(4)}`,
            );
          }
        }
      });
      observer.observe({ type: "layout-shift", buffered: true });
    }

    // LCP monitoring
    if (window.PerformanceObserver) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log(
          `✅ LCP: ${Math.round(lastEntry.startTime)}ms — Element:`,
          lastEntry.element,
        );
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    }
  }, 1000);
});
