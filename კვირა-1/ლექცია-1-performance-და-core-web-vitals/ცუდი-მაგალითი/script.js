/*
    ==========================================
    ❌ ცუდი მაგალითი — JavaScript Performance პრობლემებით
    ==========================================

    პრობლემები ამ ფაილში:
    1. ❌ Long Tasks — მძიმე სინქრონული გამოთვლები main thread-ზე
    2. ❌ No debounce — ძებნა ყოველ keystroke-ზე
    3. ❌ ყველა row ერთდროულად რენდერდება (1000 row!)
    4. ❌ moment.js ყოველ row-ზე (ნელი ფორმატირება)
    5. ❌ lodash მთლიანად ჩატვირთული
    6. ❌ Dynamic content injection (CLS)
    7. ❌ Synchronous heavy computation
*/

// ==========================================
// ❌ LONG TASK #1: მძიმე გამოთვლა გვერდის ჩატვირთვისას
// ==========================================
// ეს ფუნქცია MAIN THREAD-ს ბლოკავს 200-500ms-ით!
// ამ დროს გვერდი „გაყინულია" — ვერ დასქროლავ, ვერ დააკლიკებ
function heavyComputation() {
  console.time("❌ Heavy Computation (Long Task)");
  let result = 0;
  // 10 მილიონი iteration — მძიმე loop
  for (let i = 0; i < 10000000; i++) {
    result += Math.sqrt(i) * Math.sin(i) * Math.cos(i);
  }
  console.timeEnd("❌ Heavy Computation (Long Task)");
  return result;
}

// გვერდის ჩატვირთვისთანავე ვუშვებთ მძიმე გამოთვლას
heavyComputation();

// ==========================================
// მონაცემების გენერაცია (1000 პროდუქტი)
// ==========================================
const categories = [
  "ელექტრონიკა",
  "ტანსაცმელი",
  "წიგნები",
  "საკვები",
  "სპორტი",
  "სათამაშოები",
];

// ❌ lodash-ის მთლიანი ბიბლიოთეკა გამოყენებულია (70KB) — range ფუნქციისთვის
const products = _.range(1, 1001).map((i) => ({
  id: i,
  name: `პროდუქტი #${i}`,
  price: _.round(Math.random() * 500, 2),
  date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
  category: categories[i % categories.length],
  description: `აღწერა პროდუქტისთვის #${i}. `.repeat(5),
}));

// ==========================================
// ❌ LONG TASK #2: ყველა 1000 row-ის ერთდროულად რენდერი
// ==========================================
function renderAllProducts(data) {
  console.time("❌ Render 1000 rows (Long Task)");
  const tbody = document.getElementById("product-body");

  // ❌ ყოველი row-ისთვის ცალ-ცალკე DOM manipulation
  // ეს ძალიან ნელია! innerHTML ერთჯერადი assignment ბევრად სწრაფია
  tbody.innerHTML = "";

  data.forEach((product) => {
    const tr = document.createElement("tr");

    // ❌ moment.js — 300KB ბიბლიოთეკა, ყოველ row-ზე ახალი moment object
    const formattedDate = moment(product.date).format("DD MMMM YYYY, HH:mm:ss");

    // ❌ lodash — მთლიანი ბიბლიოთეკა ერთი round()-ისთვის
    const formattedPrice = _.padStart(
      String(_.round(product.price, 2)),
      8,
      " ",
    );

    tr.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>$${formattedPrice}</td>
            <td>${formattedDate}</td>
            <td>${product.category}</td>
        `;

    tbody.appendChild(tr);
  });

  document.getElementById("product-count").textContent =
    `ნაჩვენებია ${data.length} პროდუქტი`;

  console.timeEnd("❌ Render 1000 rows (Long Task)");
}

// პირველადი რენდერი — ყველა 1000 row
renderAllProducts(products);

// ==========================================
// ❌ LONG TASK #3: ძებნა DEBOUNCE-ის გარეშე
// ==========================================
// ყოველ keystroke-ზე:
// 1. ფილტრავს 1000 პროდუქტს
// 2. სორტავს შედეგს
// 3. ხელახლა რენდერავს ყველა row-ს
// ეს main thread-ს ბლოკავს 100-300ms ყოველ ღილაკზე!
document.getElementById("search").addEventListener("input", function (e) {
  const term = e.target.value.toLowerCase();

  console.time("❌ Search without debounce");

  // ❌ ფილტრაცია — 1000 ელემენტზე
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term),
  );

  // ❌ lodash orderBy — მთელი ბიბლიოთეკა ერთი ფუნქციისთვის
  const sorted = _.orderBy(filtered, ["price"], ["desc"]);

  // ❌ მძიმე გამოთვლა ყოველ keystroke-ზე
  heavyComputation();

  // ❌ DOM-ის სრული ხელახალი რენდერი
  renderAllProducts(sorted);

  console.timeEnd("❌ Search without debounce");
});

// ==========================================
// ❌ პრობლემა: DYNAMIC CONTENT INJECTION (CLS!)
// ==========================================
// 2 წამის შემდეგ ჩაისმება ბანერი ადგილის დაჯავშნის გარეშე
// ყველაფერი ქვემოთ გადაინაცვლებს = layout shift!
setTimeout(() => {
  const banner = document.getElementById("banner-container");
  banner.innerHTML = `
        <div class="promo-banner">
            <strong>სპეციალური შეთავაზება!</strong>
            ყველა პროდუქტზე 50% ფასდაკლება — მხოლოდ დღეს!
            <br><small>ეს ბანერი გამოიწვია Layout Shift (CLS პრობლემა)</small>
        </div>
    `;
  console.warn(
    "❌ CLS: ბანერი ჩაისვა ადგილის დაჯავშნის გარეშე — layout shift!",
  );
}, 2000);

// ==========================================
// ❌ LONG TASK #4: კიდევ ერთი მძიმე გამოთვლა
// ==========================================
// სტატისტიკის გამოთვლა არაეფექტურად
setTimeout(() => {
  console.time("❌ Stats computation (Long Task)");

  // ❌ ყოველი სტატისტიკისთვის ცალკე iteration მთელ მასივზე
  const totalProducts = products.length;
  const avgPrice = _.meanBy(products, "price");
  const maxPrice = _.maxBy(products, "price").price;
  const minPrice = _.minBy(products, "price").price;
  const categoryCount = _.uniqBy(products, "category").length;

  // ❌ კიდევ ერთი მძიმე გამოთვლა main thread-ზე
  heavyComputation();

  const statsContent = document.getElementById("stats-content");
  statsContent.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="number">${totalProducts}</div>
                <div class="label">სულ პროდუქტი</div>
            </div>
            <div class="stat-card">
                <div class="number">$${_.round(avgPrice, 2)}</div>
                <div class="label">საშუალო ფასი</div>
            </div>
            <div class="stat-card">
                <div class="number">$${_.round(maxPrice, 2)}</div>
                <div class="label">მაქსიმალური</div>
            </div>
            <div class="stat-card">
                <div class="number">$${_.round(minPrice, 2)}</div>
                <div class="label">მინიმალური</div>
            </div>
            <div class="stat-card">
                <div class="number">${categoryCount}</div>
                <div class="label">კატეგორია</div>
            </div>
        </div>
    `;

  console.timeEnd("❌ Stats computation (Long Task)");
}, 500);

// ==========================================
// Console-ში Performance ინფორმაცია
// ==========================================
window.addEventListener("load", () => {
  setTimeout(() => {
    const perf = performance.getEntriesByType("navigation")[0];
    console.group("📊 ცუდი მაგალითის Performance მეტრიკები");
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

    // Long Tasks (if available)
    if (window.PerformanceObserver) {
      console.log("---");
      console.log("Long Tasks ჩაწერა დაწყებულია — იხილეთ Performance tab");
    }

    console.groupEnd();

    // CLS monitoring
    if (window.PerformanceObserver) {
      let clsScore = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsScore += entry.value;
            console.warn(
              `❌ Layout Shift detected! Score: ${entry.value.toFixed(4)}, Total CLS: ${clsScore.toFixed(4)}`,
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
          `LCP: ${Math.round(lastEntry.startTime)}ms — Element:`,
          lastEntry.element,
        );
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    }
  }, 1000);
});
