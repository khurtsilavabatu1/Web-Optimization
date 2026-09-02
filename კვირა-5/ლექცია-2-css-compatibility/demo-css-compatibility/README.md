# CSS Compatibility Demo - Vite + React

თანამედროვე CSS ფუნქციების დემო პროექტი Vite + React-ზე დაფუძნებული.

## პროექტის სტრუქტურა

```
demo-css-compatibility/
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── modern.css              # თანამედროვე CSS ფუნქციები
    ├── fallback.css            # Fallback სტილები ძველი ბრაუზერებისთვის
    └── components/
        ├── StyleToggle.jsx     # Modern/Fallback გადამრთველი
        ├── FeatureDemo.jsx     # ფუნქციების შედარების ბარათი
        ├── ContainerQueryDemo.jsx
        ├── ColorMixDemo.jsx
        ├── CssNestingDemo.jsx
        └── SupportDetector.jsx # ბრაუზერის მხარდაჭერის შემოწმება
```

## ფუნქციონალი

### თანამედროვე CSS ფუნქციები
1. **Container Queries** - კონტეინერის ზომაზე დაფუძნებული სტილები
2. **color-mix()** - ფერების დინამიური შერევა
3. **CSS Nesting** - Sass-ის მსგავსი სინტაქსი
4. **@layer** - CSS cascade-ის კონტროლი
5. **:has()** - მშობელი ელემენტის სელექცია
6. **text-wrap: balance** - ტექსტის ბალანსირება

### დემო კომპონენტები
- **StyleToggle** - თანამედროვე და fallback CSS-ს შორის გადართვა
- **ContainerQueryDemo** - Container vs Media Queries შედარება
- **ColorMixDemo** - color-mix() vs წინასწარ გამოთვლილი ფერები
- **CssNestingDemo** - CSS Nesting vs Flat Selectors
- **SupportDetector** - CSS.supports() API გამოყენებით ბრაუზერის შემოწმება

## ინსტალაცია და გაშვება

```bash
# დამოკიდებულებების ინსტალაცია
npm install

# Development სერვერის გაშვება
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

## ტექნოლოგიები

- **Vite** - Build tool და dev server
- **React 18** - UI ფრეიმვორქი
- **Modern CSS** - თანამედროვე CSS ფუნქციები
- **CSS.supports()** - Feature detection API

## შენიშვნები

- პროექტი აჩვენებს თანამედროვე CSS ფუნქციებსა და მათ fallback ალტერნატივებს
- StyleToggle საშუალებას გაძლევთ რეალურ დროში შეადაროთ ორივე მიდგომა
- SupportDetector ამოწმებს თქვენი ბრაუზერის მხარდაჭერას CSS.supports() API-ით
- dark theme დიზაინი professional სტილით
- responsive დიზაინი ყველა ეკრანის ზომისთვის
