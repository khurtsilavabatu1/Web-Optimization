# მინი-პროექტი 3: Cross-Browser Compatible Landing Page

**კვირა:** 5 (Cross-browser)  
**დრო:** 2-3 საათი  
**სირთულე:** საშუალო

---

## კონტექსტი
სტუდენტებმა უნდა შექმნან Landing Page, რომელიც კარგად მუშაობს სხვადასხვა ბრაუზერსა და მოწყობილობაზე. გვერდი უნდა იყენებდეს თანამედროვე CSS-ს, მაგრამ ჰქონდეს fallbacks ძველი ბრაუზერებისთვის.

---

## მოთხოვნები

### ვიზუალური სტრუქტურა:
```
┌─────────────────────────────────────────┐
│              Header (sticky)             │
│  Logo          Nav: Home About Contact   │
├─────────────────────────────────────────┤
│              Hero Section                │
│     backdrop-filter: blur               │
│     Heading + CTA Button                │
├─────────────────────────────────────────┤
│           Features (3 cards)             │
│  ┌──────┐  ┌──────┐  ┌──────┐          │
│  │Card 1│  │Card 2│  │Card 3│          │
│  └──────┘  └──────┘  └──────┘          │
├─────────────────────────────────────────┤
│          Testimonials (slider)           │
├─────────────────────────────────────────┤
│          Contact Form                    │
├─────────────────────────────────────────┤
│              Footer                      │
└─────────────────────────────────────────┘
```

### კოდი (საწყისი ვერსია — თავსებადობის პრობლემებით):

```html
<!DOCTYPE html>
<html lang="ka">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TechLanding - თანამედროვე გადაწყვეტილებები</title>
  <style>
    /* ---- CSS Reset (არ არის — სტუდენტმა უნდა დაამატოს) ---- */

    :root {
      --primary: #007bff;
      --primary-dark: #0056b3;
      --text: #333;
      --text-light: #666;
      --bg: #f8f9fa;
      --white: #ffffff;
      --radius: 12px;
    }

    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      color: var(--text);
      line-height: 1.6;
    }

    /* Header — position: sticky */
    .header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);       /* ❌ Safari-ს -webkit- prefix სჭირდება */
      border-bottom: 1px solid rgba(0,0,0,0.1);
    }

    .header-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .nav {
      display: flex;
      gap: 24px;           /* ❌ ძველ Safari-ში flexbox gap არ მუშაობს */
    }

    .nav a {
      text-decoration: none;
      color: var(--text);
      font-weight: 500;
      transition: color 0.2s;
    }

    .nav a:hover {
      color: var(--primary);
    }

    /* Hero Section */
    .hero {
      height: 100vh;           /* ❌ iOS Safari-ში address bar-ის პრობლემა */
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
    }

    .hero h1 {
      font-size: clamp(2rem, 5vw, 4rem);   /* ❌ ძველ ბრაუზერებში clamp() */
      margin-bottom: 20px;
    }

    .hero p {
      font-size: clamp(1rem, 2vw, 1.5rem);
      margin-bottom: 30px;
      max-width: 600px;
    }

    .cta-button {
      display: inline-block;
      padding: 16px 40px;
      background: white;
      color: #667eea;
      text-decoration: none;
      border-radius: var(--radius);
      font-weight: 700;
      font-size: 1.1rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    /* Features */
    .features {
      padding: 80px 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .features h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 50px;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);  /* ❌ მობილურზე არ არის responsive */
      gap: 30px;
    }

    .feature-card {
      background: var(--white);
      padding: 40px 30px;
      border-radius: var(--radius);
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      text-align: center;
      transition: transform 0.3s;
    }

    .feature-card:hover {
      transform: translateY(-5px);   /* ❌ touch მოწყობილობებზე hover არ მუშაობს */
    }

    .feature-icon {
      font-size: 3rem;
      margin-bottom: 20px;
    }

    /* Testimonials */
    .testimonials {
      background: var(--bg);
      padding: 80px 24px;
    }

    .testimonials h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 50px;
    }

    .testimonial-container {
      display: flex;
      gap: 30px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .testimonial-card {
      min-width: 350px;
      scroll-snap-align: start;
      background: white;
      padding: 30px;
      border-radius: var(--radius);
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }

    /* Scrollbar styling */
    .testimonial-container::-webkit-scrollbar {
      height: 8px;
    }
    .testimonial-container::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }
    .testimonial-container::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 4px;
    }
    /* ❌ Firefox scrollbar styling არ არის */

    /* Contact Form */
    .contact {
      padding: 80px 24px;
      max-width: 600px;
      margin: 0 auto;
    }

    .contact h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 40px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      font-family: inherit;      /* ❌ ზოგ ბრაუზერში form elements სხვა font-ს იყენებს */
      transition: border-color 0.2s;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--primary);
    }

    .submit-button {
      width: 100%;
      padding: 14px;
      background: var(--primary);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .submit-button:hover {
      background: var(--primary-dark);
    }

    /* Footer */
    .footer {
      background: #1a1a2e;
      color: #e0e0e0;
      padding: 40px 24px;
      text-align: center;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 30px;           /* ❌ ძველ ბრაუზერებში gap */
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .footer-links a {
      color: #e0e0e0;
      text-decoration: none;
    }

    /* ❌ არ არის @media queries მობილურისთვის */
    /* ❌ არ არის print styles */
  </style>
</head>
<body>

  <header class="header">
    <div class="header-inner">
      <div class="logo" style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">TechLanding</div>
      <nav class="nav">
        <a href="#features">ფუნქციები</a>
        <a href="#testimonials">შეფასებები</a>
        <a href="#contact">კონტაქტი</a>
      </nav>
    </div>
  </header>

  <section class="hero">
    <div>
      <h1>თანამედროვე ვებ გადაწყვეტილებები</h1>
      <p>ჩვენ ვქმნით სწრაფ, უსაფრთხო და სკალირებად ვებ აპლიკაციებს თქვენი ბიზნესისთვის</p>
      <a href="#contact" class="cta-button">დაიწყეთ ახლავე</a>
    </div>
  </section>

  <section class="features" id="features">
    <h2>რატომ ჩვენ?</h2>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3>სიჩქარე</h3>
        <p>ოპტიმიზირებული წარმადობა და სწრაფი ჩატვირთვა ყველა მოწყობილობაზე</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔒</div>
        <h3>უსაფრთხოება</h3>
        <p>მონაცემთა დაცვის უახლესი სტანდარტები და SSL ენკრიფცია</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📱</div>
        <h3>რესპონსივი</h3>
        <p>იდეალური გამოჩენა ყველა ეკრანის ზომაზე</p>
      </div>
    </div>
  </section>

  <section class="testimonials" id="testimonials">
    <h2>რას ამბობენ ჩვენი კლიენტები</h2>
    <div class="testimonial-container">
      <div class="testimonial-card">
        <p>"შესანიშნავი გუნდია, ჩვენი პროექტი დროულად და ხარისხიანად შესრულდა."</p>
        <strong>— გიორგი მ.</strong>
      </div>
      <div class="testimonial-card">
        <p>"ძალიან კმაყოფილი ვარ შედეგით. ვებგვერდი სწრაფია და კარგად გამოიყურება."</p>
        <strong>— მარიამ ს.</strong>
      </div>
      <div class="testimonial-card">
        <p>"პროფესიონალური მიდგომა და მუდმივი მხარდაჭერა. რეკომენდაციას ვუწევ ყველას."</p>
        <strong>— დავით კ.</strong>
      </div>
      <div class="testimonial-card">
        <p>"ჩვენი E-commerce პლატფორმა 40%-ით უფრო სწრაფი გახდა მათი ოპტიმიზაციის შემდეგ."</p>
        <strong>— ნინო ლ.</strong>
      </div>
    </div>
  </section>

  <section class="contact" id="contact">
    <h2>დაგვიკავშირდით</h2>
    <form>
      <div class="form-group">
        <label for="name">სახელი</label>
        <input type="text" id="name" placeholder="თქვენი სახელი" required>
      </div>
      <div class="form-group">
        <label for="email">ელფოსტა</label>
        <input type="email" id="email" placeholder="example@email.com" required>
      </div>
      <div class="form-group">
        <label for="message">შეტყობინება</label>
        <textarea id="message" rows="5" placeholder="თქვენი შეტყობინება..."></textarea>
      </div>
      <button type="submit" class="submit-button">გაგზავნა</button>
    </form>
  </section>

  <footer class="footer">
    <div class="footer-links">
      <a href="#">კონფიდენციალურობა</a>
      <a href="#">წესები და პირობები</a>
      <a href="#">ბლოგი</a>
      <a href="#">კარიერა</a>
    </div>
    <p>&copy; 2024 TechLanding. ყველა უფლება დაცულია.</p>
  </footer>

</body>
</html>
```

---

## სტუდენტის ამოცანები

### ნაბიჯი 1: პრობლემების იდენტიფიცირება (30 წუთი)
გახსენით გვერდი Chrome-ში და DevTools Device Mode-ში:
1. შეამოწმეთ iPhone SE (375px) — რა არ მუშაობს?
2. შეამოწმეთ iPad (768px) — რა უნდა შეიცვალოს?
3. caniuse.com-ზე შეამოწმეთ: `backdrop-filter`, `clamp()`, `gap` in flexbox
4. ჩამოწერეთ ყველა თავსებადობის პრობლემა

### ნაბიჯი 2: CSS Reset-ის დამატება (15 წუთი)
დაამატეთ Modern CSS Reset სტილების დასაწყისში.

### ნაბიჯი 3: Vendor Prefixes (20 წუთი)
1. `backdrop-filter` → `-webkit-backdrop-filter`
2. `user-select` → `-webkit-user-select`, `-moz-user-select`
3. ან დააინსტალირეთ და გამოიყენეთ Autoprefixer

### ნაბიჯი 4: Responsive Design (40 წუთი)
დაამატეთ @media queries:
```css
/* Tablet */
@media (max-width: 768px) {
  .features-grid { grid-template-columns: repeat(2, 1fr); }
  .hero h1 { font-size: 2rem; }
}

/* Mobile */
@media (max-width: 480px) {
  .features-grid { grid-template-columns: 1fr; }
  .nav { display: none; /* hamburger menu */ }
  .testimonial-card { min-width: 280px; }
}
```

### ნაბიჯი 5: Fallbacks (30 წუთი)
1. `100vh` → `100dvh` (iOS Safari fix)
2. `clamp()` → fallback font-size
3. flexbox `gap` → margin/padding fallback
4. Firefox scrollbar styling
5. `@supports` queries

### ნაბიჯი 6: ტესტირება (20 წუთი)
1. DevTools Device Mode — 3 მოწყობილობა
2. Touch target-ები >= 44px
3. `@media (hover: hover)` — hover effects მხოლოდ mouse-ისთვის
4. `@media (pointer: coarse)` — touch-ისთვის დიდი ღილაკები

---

## შეფასების კრიტერიუმები

| კრიტერიუმი | ქულა |
|-----------|-------|
| CSS Reset გამოყენებული | 10 |
| Vendor prefixes სწორად | 15 |
| Responsive (mobile, tablet, desktop) | 25 |
| @supports fallbacks | 15 |
| Touch-friendly targets | 10 |
| Firefox + Safari თავსებადობა | 15 |
| კოდის სისუფთავე | 10 |
| **სულ** | **100** |
