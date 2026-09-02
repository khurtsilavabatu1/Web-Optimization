# TechBlog - Responsive Testing Demo

Vite + React აპლიკაცია რესპონსიული დიზაინის ტესტირებისთვის.

## პროექტის სტრუქტურა

```
demo-responsive-testing/
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    └── components/
        ├── Navbar.jsx          # ნავიგაცია hamburger მენიუთი
        ├── Hero.jsx            # Hero სექცია
        ├── ArticleGrid.jsx     # სტატიების გრიდი
        ├── ArticleCard.jsx     # სტატიის ბარათი
        ├── Sidebar.jsx         # გვერდითი პანელი
        ├── Newsletter.jsx      # Newsletter ფორმა
        ├── Footer.jsx          # Footer
        └── ViewportInfo.jsx    # Viewport ინფორმაცია
```

## ფუნქციონალი

### კომპონენტები

- **Navbar**: რესპონსიული ნავიგაცია hamburger მენიუთი მობილურზე
- **Hero**: Hero სექცია responsive typography-ით (clamp() გამოყენებით)
- **ArticleGrid**: CSS Grid გამოყენებით - 1/2/3 სვეტი breakpoint-ების მიხედვით
- **Sidebar**: კატეგორიები და პოპულარული პოსტები
- **Newsletter**: გამოწერის ფორმა
- **ViewportInfo**: viewport-ის ზომისა და breakpoint-ის ჩვენება

### Responsive Breakpoints

- **Mobile**: < 576px (1 column)
- **Tablet (Small)**: 576px - 767px (2 columns)
- **Tablet**: 768px - 991px (2 columns, desktop nav)
- **Desktop**: 992px - 1199px (3 columns, sidebar)
- **Large Desktop**: ≥ 1200px (3 columns, optimized)

### Mobile-First CSS

- Box-sizing reset
- Responsive typography with clamp()
- Touch-friendly targets (44px minimum)
- CSS Grid with auto-fit columns
- Hamburger menu with useState
- Scroll-to-top button
- Floating viewport info overlay

### Touch Event Handling

- Touch-friendly button sizes (min 44px × 44px)
- Touch device optimizations (@media hover: none)
- Proper touch targets for all interactive elements

## ბრძანებები

```bash
# დამოკიდებულებების დაყენება
npm install

# Dev სერვერის გაშვება
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## ტექნოლოგიები

- **Vite** - build tool
- **React 18** - UI library
- **CSS3** - Mobile-first responsive design
- **Noto Sans Georgian** - ქართული შრიფტი

## ფუნქციონალური მახასიათებლები

✅ სრულად რესპონსიული დიზაინი  
✅ Mobile-first CSS მიდგომა  
✅ Touch-friendly ინტერაქციები  
✅ Hamburger მენიუ მობილურზე  
✅ CSS Grid responsive layout  
✅ Viewport ზომის live ჩვენება  
✅ Scroll-to-top ღილაკი  
✅ Dark პროფესიული თემა  
✅ ქართული ტექსტი UI-ში  
✅ Smooth animations და transitions
