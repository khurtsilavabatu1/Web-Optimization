# DevTools Playground - React Edition

ინტერაქტიული React აპლიკაცია Chrome DevTools-ის Elements და Console პანელების შესასწავლად.

## პროექტის სტრუქტურა

```
demo-elements-console/
├── package.json           # პროექტის კონფიგურაცია
├── vite.config.js         # Vite კონფიგურაცია
├── index.html             # HTML შაბლონი
└── src/
    ├── main.jsx           # აპლიკაციის შესასვლელი წერტილი
    ├── App.jsx            # მთავარი App კომპონენტი
    ├── App.css            # გლობალური სტილები
    └── components/
        ├── Playground.jsx      # ინტერაქტიული playground სექცია
        ├── ExerciseCard.jsx    # სავარჯიშოს ბარათის კომპონენტი
        ├── DemoSection.jsx     # დემო სექცია Console-ისთვის
        └── StyleExplorer.jsx   # CSS ცვლადების explorer
```

## დაინსტალირება და გაშვება

### დამოკიდებულებების დაინსტალირება
```bash
npm install
```

### Development სერვერის გაშვება
```bash
npm run dev
```

აპლიკაცია გაიხსნება `http://localhost:5173`

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## ფუნქციონალი

### 1. ინტერაქტიული Playground
- **მთვლელი (Counter)**: ღილაკზე დაჭერით მთვლელის ზრდა, Events-ის მონიტორინგი
- **ტექსტის ინპუტი**: სიმბოლოების რაოდენობის თვალყურის დევნება
- **დინამიური სია**: ელემენტების დამატება/წაშლა DOM-ში
- **სტატუსის ინდიკატორები**: სხვადასხვა CSS კლასები და სტილები

### 2. CSS ცვლადების Explorer
- 6 CSS ცვლადის ვიზუალური ჩვენება
- Elements panel-ში რეალურ დროში შეცვლა
- Console-დან პროგრამული შეცვლა

### 3. დემო სექციები
- პროდუქტების grid data-атрიბუტებით
- სტუდენტების სია ფილტრაციის პრაქტიკისთვის

### 4. 6 სავარჯიშო
1. React DOM-ის დათვალიერება
2. ფარული ელემენტის მოძებნა
3. Console Methods პრაქტიკა
4. React State Console-დან
5. DOM Manipulation Console-დან
6. Event Monitoring

## Console-ში ხელმისაწვდომი ობიექტები

### window.appState
```javascript
{
  users: [...],      // 3 მომხმარებლის მასივი
  tasks: [...],      // 5 დავალების მასივი
  settings: {...},   // აპლიკაციის პარამეტრები
  stats: {...}       // სტატისტიკა
}
```

### window.helpers
```javascript
{
  greet(name),              // მისალმების ფუნქცია
  calculateTaskStats(),     // დავალებების სტატისტიკა
  getActiveUsers(),         // აქტიური მომხმარებლები
  getUserByEmail(email)     // მომხმარებლის მოძებნა
}
```

## Console პრაქტიკის მაგალითები

```javascript
// Table view
console.table(window.appState.users)
console.table(window.appState.tasks)

// Filtering
window.appState.users.filter(u => u.active)

// Statistics
window.helpers.calculateTaskStats()

// DOM Selection
$$('.exercise-card')
$$('[data-active="true"]')

// DOM Manipulation
$0.style.background = 'red'
$$('.demo-btn').forEach(btn => btn.style.border = '3px solid blue')

// CSS Variables
document.documentElement.style.setProperty('--primary-color', '#e74c3c')

// Event Monitoring
monitorEvents($0, 'click')
unmonitorEvents($0)
```

## ტექნოლოგიები

- **React 18.3** - UI ბიბლიოთეკა
- **Vite 5.4** - სწრაფი build tool
- **CSS Custom Properties** - თემატიზაცია
- **Modern JavaScript (ES6+)** - ფუნქციონალური კომპონენტები, hooks

## სასწავლო მიზნები

ამ პროექტის საშუალებით სტუდენტები ისწავლიან:

1. **Elements Panel**:
   - React კომპონენტების DOM სტრუქტურის გაგება
   - CSS-ის რეალურ დროში რედაქტირება
   - DOM node-ების ინსპექტირება
   - CSS Variables-ის მოძებნა და შეცვლა

2. **Console Panel**:
   - console.log(), console.table(), console.group()
   - DOM სელექტორები: $0, $$(), querySelector()
   - Event monitoring: monitorEvents()
   - React DevTools ინტეგრაცია: $r

3. **React + DevTools**:
   - Virtual DOM vs Real DOM
   - Component State-ის ინსპექტირება
   - Props-ის დათვალიერება
   - Performance profiling

## შენიშვნები

- პროექტი შექმნილია **სასწავლო მიზნებისთვის**
- DevTools-ის პრაქტიკისთვის არ არის საჭირო production-ready კოდი
- ყველა კომპონენტი განზრახ არის დიდი და დეტალური, რომ იყოს რაც მოსათვალიერებელი
- Console-ში გამოტანილია hints და მითითებები სტუდენტებისთვის

## ლიცენზია

MIT - სასწავლო მიზნებისთვის
