# React Debugging Exercise — Task Manager

ეს პროექტი შეიცავს 6 განზრახ შექმნილ React-ის შეცდომას სტუდენტების debugging უნარების გასავითარებლად.

## დაყენება და გაშვება

```bash
npm install
npm run dev
```

აპლიკაცია გაიხსნება `http://localhost:5173`

## პროექტის სტრუქტურა

```
demo-debugging/
├── package.json          # Dependencies და scripts
├── vite.config.js        # Vite კონფიგურაცია
├── index.html            # HTML entry point
└── src/
    ├── main.jsx          # React entry point
    ├── App.jsx           # მთავარი კომპონენტი
    ├── App.css           # სტილები
    └── components/
        ├── BugTracker.jsx    # მთავარი ლოგიკა და state (Bug #2, #3, #4, #6)
        ├── TaskForm.jsx      # ფორმა დავალების დამატებისთვის
        ├── TaskList.jsx      # დავალებების სია (Bug #5)
        ├── TaskCard.jsx      # ცალკეული დავალების card
        └── TimerBadge.jsx    # „ბოლო დამატებიდან" მთვლელი (Bug #1)
```

## 6 შეცდომა რომელიც უნდა იპოვოთ

### Bug #1: Missing useEffect Cleanup
**ადგილი:** `TimerBadge.jsx` → useEffect setInterval-ით  
**პრობლემა:** setInterval-ს cleanup არა აქვს, memory leak წარმოიქმნება  
**როგორ ვნახოთ:** მთვლელი წამში 2-ით იზრდება (StrictMode ორჯერ უშვებს effect-ს); ყველა დავალების წაშლის შემდეგაც interval აგრძელებს მუშაობას  
**გამოსწორება:** cleanup function დააბრუნეთ: `return () => clearInterval(interval)`

### Bug #2: Direct State Mutation
**ადგილი:** `BugTracker.jsx` → `toggleTask` ფუნქცია  
**პრობლემა:** Array და object პირდაპირ მუტირდება, React ვერ ამჩნევს ცვლილებას  
**როგორ ვნახოთ:** Checkbox-ზე დაწკაპუნება არაფერს აკეთებს  
**გამოსწორება:** `map()` / spread operator გამოიყენეთ ახალი array/object შესაქმნელად

### Bug #3: Missing useEffect Dependency
**ადგილი:** `BugTracker.jsx` → useEffect ფილტრაციისთვის  
**პრობლემა:** `filter` არ არის dependency array-ში  
**როგორ ვნახოთ:** ფილტრის ღილაკებზე დაწკაპუნება არ ცვლის სიას  
**გამოსწორება:** `filter` დაამატეთ dependency array-ში

### Bug #4: Stale Closure
**ადგილი:** `BugTracker.jsx` → `deleteTaskDelayed` ფუნქცია  
**პრობლემა:** setTimeout closure-ში ძველ state-ს იყენებს  
**როგორ ვნახოთ:** დააჭირეთ „3 წამში წაშლა", შემდეგ სწრაფად დაამატეთ ახალი დავალება — ახალი გაქრება  
**გამოსწორება:** Functional update გამოიყენეთ: `setTasks(prev => ...)`

### Bug #5: Wrong Key Prop
**ადგილი:** `TaskList.jsx` → map()-ში key prop  
**პრობლემა:** Array index გამოიყენება key-დ `task.id`-ს ნაცვლად  
**როგორ ვნახოთ:** თითოეულ დავალებას ჩაუწერეთ სხვადასხვა „შენიშვნა" (uncontrolled input), წაშალეთ პირველი — შენიშვნები არასწორ დავალებებზე დარჩება  
**გამოსწორება:** `key={index}` → `key={task.id}`

### Bug #6: Async Race Condition
**ადგილი:** `BugTracker.jsx` → `addTask` ფუნქცია  
**პრობლემა:** setTimeout async callback-ში stale state-ს იყენებს  
**როგორ ვნახოთ:** სწრაფად დაამატეთ 3-4 დავალება ზედიზედ — ზოგი „გაქრება"  
**გამოსწორება:** Functional update: `setTasks(prev => [...prev, newTask])`

## Debugging ინსტრუმენტები

1. **React DevTools** — state-ის ცვლილებების დასათვალიერებლად
2. **Console** — Error მესიჯები და warning-ები
3. **React DevTools Profiler** — re-render-ების ანალიზი
4. **Breakpoints** — კოდის ნაბიჯ-ნაბიჯ შესასწავლად

## რჩევები

- პირველ რიგში გახსენით Console და React DevTools
- თითოეული ფუნქციონალობა ცალ-ცალკე ტესტირება გაუკეთეთ
- React-ის warning მესიჯებს ყურადღებით წაიკითხეთ
- Breakpoint-ები დაადგით და state-ის ცვლილებები თვალყური ადევნეთ

## სწავლის მიზნები

ამ სავარჯიშოს შემდეგ სტუდენტმა უნდა იცოდეს:

- ✅ რატომ არ უნდა მოხდეს state-ის პირდაპირ მუტაცია React-ში
- ✅ როგორ მუშაობს useEffect dependency array
- ✅ რა არის closure და როგორ იწვევს stale state-ს
- ✅ რატომ არის მნიშვნელოვანი სწორი key prop
- ✅ რატომ არის საჭირო useEffect cleanup function-ები
- ✅ როგორ გამოვიყენოთ functional updates race condition-ების თავიდან ასაცილებლად
