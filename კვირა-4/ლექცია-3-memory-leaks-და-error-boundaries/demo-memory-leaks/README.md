# Memory Leaks & Error Boundaries Demo

React + Vite დემონსტრაციული პროექტი მეხსიერების გაჟონვისა და Error Boundaries-ის შესასწავლად.

## 🚀 დაწყება

```bash
# დამოკიდებულებების დაინსტალირება
npm install

# Development სერვერის გაშვება
npm run dev

# Production build
npm run build

# Build-ის preview
npm run preview
```

## 📁 სტრუქტურა

```
demo-memory-leaks/
├── src/
│   ├── components/
│   │   ├── IntervalLeak.jsx          # setInterval leak demo
│   │   ├── EventListenerLeak.jsx     # Event listener leak demo
│   │   ├── DetachedDomLeak.jsx       # Detached DOM nodes leak demo
│   │   ├── GrowingDataLeak.jsx       # Growing data leak demo
│   │   ├── ErrorBoundary.jsx         # Error Boundary component
│   │   ├── CrashButton.jsx           # Crashable & Safe components
│   │   └── ExercisePanel.jsx         # Practice exercises panel
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## 🔍 Memory Leak დემო სცენარები

### 1. setInterval Leak
- ყოველ დაჭერაზე იწყება ახალი interval `clearInterval`-ის გარეშე
- სიმულირებული მეხსიერების გაზრდა
- Console logs აჩვენებს active intervals-ს

### 2. Event Listener Leak
- Window resize listener-ები ემატება cleanup-ის გარეშე
- ბრაუზერის ზომის შეცვლისას ყველა listener გააქტიურდება
- DevTools Performance Monitor აჩვენებს JS Event Listeners-ის ზრდას

### 3. Detached DOM Nodes
- DOM node-ები იქმნება მაგრამ არ ემატება DOM tree-ს
- JavaScript-ში ინახება ლინკები, რაც leak-ს ქმნის
- DevTools Memory Heap Snapshot-ში ჩანს როგორც "Detached"

### 4. Growing Data Leak
- მასივი უსასრულოდ იზრდება cleanup-ის გარეშე
- ყოველ წამში ემატება 1000 ელემენტი
- DevTools Allocation Timeline აჩვენებს მეხსიერების ზრდას

## 🛡️ Error Boundaries

- **CrashableComponent**: შეიძლება "ჩავარდეს" render-ის დროს
- **SafeComponent**: გააგრძელებს მუშაობას მეზობლის crash-ის შემდეგაც
- **ErrorBoundary**: იჭერს render errors და აჩვენებს fallback UI

## 📚 პრაქტიკული დავალებები

პროექტი შეიცავს 4 ინტერაქტიულ დავალებას DevTools-ის გამოყენებით:

1. **Heap Snapshot-ის გადაღება** - Memory profiling-ის საფუძვლები
2. **Interval Leak-ის აღმოჩენა** - Snapshot Comparison
3. **Detached DOM-ის პოვნა** - Heap Snapshot ანალიზი
4. **Allocation Timeline** - Real-time memory tracking

## 🔧 DevTools ინსტრუქციები

### Performance Monitor
```
Cmd + Shift + P → "Show Performance Monitor"
```
დააკვირდით:
- JS Heap Size (იზრდება leaks-თან)
- JS Event Listeners (იზრდება listener leaks-თან)

### Memory Profiler
```
DevTools → Memory Tab
```
ხელმისაწვდომი ოფციები:
- **Heap Snapshot**: მეხსიერების სურათი კონკრეტულ მომენტში
- **Allocation Timeline**: real-time allocations tracking
- **Allocation Sampling**: lightweight profiling

## 🎨 UI თემა

- Dark professional theme
- Simulated memory usage gauges
- Real-time leak counters
- Interactive exercise tracking

## 📝 შენიშვნები

- ყველა leak intentional არის - სასწავლო მიზნებისთვის
- Console logs-ში ვრცლად ჩანს leak-ების შექმნა/გასუფთავება
- "Reset All Leaks" ღილაკი ასუფთავებს ყველა leak-ს
- StrictMode enabled - development-ში ზოგიერთი component ორჯერ render-დება

## 🐛 ცნობილი პრობლემები

DevTools-ში დაბალი npm package vulnerabilities არ არის კრიტიკული - სასწავლო პროექტია და production-ში არ გამოიყენება.

## 📖 დამატებითი რესურსები

- [React DevTools Profiler](https://react.dev/learn/react-developer-tools)
- [Chrome DevTools Memory Profiling](https://developer.chrome.com/docs/devtools/memory-problems/)
- [Error Boundaries Documentation](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
