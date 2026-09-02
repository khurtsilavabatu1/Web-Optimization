# შეცდომების გამოსწორებები (Solutions)

ეს ფაილი შეიცავს ყველა 6 შეცდომის დეტალურ გამოსწორებას ინსტრუქტორებისთვის.

---

## Bug #1: Missing useEffect Cleanup

### არასწორი კოდი (TimerBadge.jsx)
```javascript
useEffect(() => {
  const interval = setInterval(() => {
    setTimeSinceLastAdd(prev => prev + 1)
  }, 1000)
  // cleanup აკლია!
}, [])
```

### გამოსწორებული
```javascript
useEffect(() => {
  const interval = setInterval(() => {
    setTimeSinceLastAdd(prev => prev + 1)
  }, 1000)

  // ✅ cleanup function
  return () => clearInterval(interval)
}, [])
```

### ახსნა
setInterval, setTimeout, event listeners, subscriptions და სხვა „side effects" უნდა გასუფთავდეს component-ის unmount-ისას. წინააღმდეგ შემთხვევაში memory leak წარმოიქმნება — timer-ები კომპონენტის სიკვდილის მერეც აგრძელებენ მუშაობას.

**ორი ხილული სიმპტომი:**
1. StrictMode development-ში effect-ს ორჯერ უშვებს (mount → unmount → mount). cleanup-ის გარეშე პირველი interval არ ჩერდება, ამიტომ მთვლელი წამში **2-ით** იზრდება 1-ის ნაცვლად.
2. `TimerBadge` მხოლოდ მაშინ რენდერდება, როცა `tasks.length > 0`. ყველა დავალების წაშლისას ის unmount-დება, მაგრამ interval განაგრძობს ტიკტიკს — ყოველი ასეთი ციკლი კიდევ ორ „ობოლ" interval-ს ტოვებს.

---

## Bug #2: Direct State Mutation

### არასწორი კოდი (BugTracker.jsx)
```javascript
const toggleTask = (id) => {
  const taskIndex = tasks.findIndex(task => task.id === id)
  tasks[taskIndex].completed = !tasks[taskIndex].completed
  setTasks(tasks) // Same reference!
}
```

### გამოსწორებული
```javascript
const toggleTask = (id) => {
  setTasks(tasks.map(task =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task
  ))
}
```

### ახსნა
React state-ის ცვლილებას reference equality-ს საფუძველზე ამოწმებს. თუ array-ს პირდაპირ მუტირებთ, reference იგივე რჩება და React არ ჩათვლის, რომ ცვლილება მოხდა. Spread operator (`...`) ან `map()` ახალ array-ს ქმნის.

---

## Bug #3: Missing useEffect Dependency

### არასწორი კოდი (BugTracker.jsx)
```javascript
useEffect(() => {
  if (filter === 'all') {
    setFilteredTasks(tasks)
  } else if (filter === 'active') {
    setFilteredTasks(tasks.filter(task => !task.completed))
  } else if (filter === 'completed') {
    setFilteredTasks(tasks.filter(task => task.completed))
  }
}, [tasks]) // filter აკლია!
```

### გამოსწორებული
```javascript
useEffect(() => {
  if (filter === 'all') {
    setFilteredTasks(tasks)
  } else if (filter === 'active') {
    setFilteredTasks(tasks.filter(task => !task.completed))
  } else if (filter === 'completed') {
    setFilteredTasks(tasks.filter(task => task.completed))
  }
}, [tasks, filter]) // ✅ ორივე dependency
```

### ახსნა
useEffect dependency array-ში უნდა მიუთითოთ ყველა ის ცვლადი, რომელსაც effect იყენებს. თუ `filter` აკლია, მისი ცვლილებისას effect არ გაეშვება და სია ძველი ფილტრით რჩება.

---

## Bug #4: Stale Closure

### არასწორი კოდი (BugTracker.jsx)
```javascript
const deleteTaskDelayed = (id) => {
  setTimeout(() => {
    // tasks აქ არის ძველი closure მნიშვნელობა
    setTasks(tasks.filter(task => task.id !== id))
  }, 3000)
}
```

### გამოსწორებული
```javascript
const deleteTaskDelayed = (id) => {
  setTimeout(() => {
    // Functional update — prev ყოველთვის აქტუალურია
    setTasks(prev => prev.filter(task => task.id !== id))
  }, 3000)
}
```

### ახსნა
Closure იფიქსირებს ცვლადების მნიშვნელობებს იმ მომენტისთვის, როცა ფუნქცია შეიქმნა. 3 წამის განმავლობაში `tasks` შეიძლება შეიცვალოს, მაგრამ setTimeout-ის callback ძველ მნიშვნელობას დაინახავს — ამიტომ ამ დროში დამატებული დავალებები იკარგება. Functional update (`prev =>`) ყოველთვის უახლეს state-ს იღებს.

---

## Bug #5: Wrong Key Prop

### არასწორი კოდი (TaskList.jsx)
```javascript
{tasks.map((task, index) => (
  <TaskCard
    key={index} // ❌ array index
    task={task}
    // ...
  />
))}
```

### გამოსწორებული
```javascript
{tasks.map((task) => (
  <TaskCard
    key={task.id} // ✅ უნიკალური ID
    task={task}
    // ...
  />
))}
```

### ახსნა
Array index როგორც key: item-ის წაშლისას ინდექსები გადანომრდება და React ფიქრობს, რომ `key=0` ისევ იგივე ელემენტია, უბრალოდ ახალი props-ით — ამიტომ ძველი DOM კვანძს ინარჩუნებს.

**როგორ ჩანს:** `TaskCard`-ში არის **uncontrolled** input („შენიშვნა..."), რომლის მნიშვნელობაც DOM-ში ცხოვრობს და არა state-ში. ჩაწერეთ თითოეულ დავალებაზე სხვადასხვა შენიშვნა, წაშალეთ პირველი — შენიშვნები ადგილზე დარჩება და არასწორ დავალებებს მიება.

> **გაითვალისწინეთ:** checkbox ამ დემოში controlled-ია (`checked={task.completed}`), ამიტომ ის ამ ბაგზე *არ* ირევა. სიმპტომი მხოლოდ uncontrolled input-ზე ჩანს — სწორედ ამიტომაა ის კომპონენტში დამატებული.

---

## Bug #6: Async Race Condition

### არასწორი კოდი (BugTracker.jsx)
```javascript
const addTask = (text) => {
  const newTask = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: Date.now()
  }

  setTimeout(() => {
    // tasks აქ არის stale closure
    setTasks([...tasks, newTask])
  }, 100)
}
```

### გამოსწორებული (ვარიანტი 1 — Functional Update)
```javascript
const addTask = (text) => {
  const newTask = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: Date.now()
  }

  setTimeout(() => {
    // ✅ prev ყოველთვის უახლესი state
    setTasks(prev => [...prev, newTask])
  }, 100)
}
```

### გამოსწორებული (ვარიანტი 2 — useRef)
```javascript
const tasksRef = useRef(tasks)
useEffect(() => {
  tasksRef.current = tasks
}, [tasks])

const addTask = (text) => {
  const newTask = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: Date.now()
  }

  setTimeout(() => {
    setTasks([...tasksRef.current, newTask])
  }, 100)
}
```

### ახსნა
როცა სწრაფად დაამატებთ რამდენიმე დავალებას, თითოეული setTimeout closure-ში იფიქსირებს იმ მომენტის `tasks` state-ს. Callback-ები ერთმანეთის ცვლილებებს ვერ „ხედავენ" და ზოგი update იკარგება. Functional update ან useRef წყვეტს პრობლემას.

---

## დამატებითი რჩევები Debugging-ისთვის

### React DevTools-ის გამოყენება
1. გახსენით Components tab
2. მონიშნეთ component და ნახეთ მისი state/props
3. ჩართეთ "Highlight updates when components render"
4. Profiler tab-ით გაზომეთ render performance

### Console Warning-ები
React-ის warning მესიჯები ძალიან ინფორმატიულია:
- Missing dependency in useEffect → #3
- Each child should have unique key → #5
- Can't perform state update on unmounted component → #1

### Breakpoints
1. Sources tab → კოდი იპოვეთ
2. Line number-ზე click → breakpoint
3. Step through და state-ის ცვლილებები თვალყური ადევნეთ
4. Watch panel-ში expressions დაამატეთ

### React Strict Mode
StrictMode (უკვე ჩართულია project-ში) ორჯერ render-ავს components development mode-ში side effects-ის გამოსავლენად. თუ ორჯერ console.log გამოჩნდა, ეს ნორმალურია!

---

## სასწავლო რესურსები

- [React Docs: State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)
- [React Docs: useEffect](https://react.dev/reference/react/useEffect)
- [React Docs: Referential Equality](https://react.dev/learn/updating-objects-in-state)
- [Closures in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
