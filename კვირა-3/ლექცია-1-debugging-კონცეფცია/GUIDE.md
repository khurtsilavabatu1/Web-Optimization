# Debugging — ეტაპობრივი გაიდი

ამ პრაქტიკაში თქვენ იმუშავებთ „გაფუჭებულ" React Bug Tracker აპლიკაციაზე, რომელშიც 6 React-სპეციფიკური შეცდომაა ჩაშენებული. თქვენი ამოცანაა — იპოვოთ ყოველი შეცდომა, დაასახელოთ მისი ტიპი და გამოასწოროთ. ეს არის debugging-ის სავარჯიშო, სადაც DevTools-ის Console, React DevTools, breakpoint-ები და ლოგიკური აზროვნება თქვენი მთავარი ინსტრუმენტებია.

პროექტი მდებარეობს `demo-debugging/` ფოლდერში. ფაილები:

- **`src/components/BugTracker.jsx`** — მთავარი კომპონენტი: state, ფილტრაცია, დამატება/წაშლა (BUG #2, #3, #4, #6)
- **`src/components/TimerBadge.jsx`** — „ბოლო დამატებიდან" მთვლელი (BUG #1)
- **`src/components/TaskList.jsx`** — დავალებების სიის კომპონენტი (BUG #5)
- **`src/components/TaskCard.jsx`** — დავალების ბარათის კომპონენტი
- **`src/components/TaskForm.jsx`** — დავალების დამატების ფორმა
- **`vite.config.js`** — Vite კონფიგურაცია

> **ნუმერაციის შესახებ:** აპლიკაციის მარჯვენა პანელში (`App.jsx`), `README.md`-ში, `QUICKSTART.md`-ში, `SOLUTIONS.md`-ში და კოდის `// BUG #N` კომენტარებში ნუმერაცია **იგივეა**, რაც ამ გაიდში.

---

## წინაპირობა: პროექტის გაშვება

```bash
cd ~/Desktop/Web-optimization/კვირა-3/ლექცია-1-debugging-კონცეფცია/demo-debugging
npm install
npm run dev
```

გახსენით ბრაუზერში: `http://localhost:5173`

> **რატომ Vite + React?** თანამედროვე ვებ-დეველოპმენტში React ყველაზე პოპულარული ბიბლიოთეკაა. React პროექტში JavaScript-ის ყველა ჩვეულებრივი ბაგი (TypeError, off-by-one, async პრობლემები) ისევ არსებობს — მაგრამ მათ **ემატება** React-სპეციფიკური ბაგებიც, რომლებიც vanilla JS-ში საერთოდ არ გვხვდება:
>
> - **State Mutation (სტეითის მუტაცია)** — React-ში state-ს პირდაპირ ვერ შეცვლი. მაგალითად, `tasks.push(newTask)` არ მუშაობს — React ვერ ხვდება, რომ მასივი შეიცვალა, რადგან reference იგივე დარჩა. სანაცვლოდ ახალი მასივი/ობიექტი უნდა შექმნა: `setTasks([...tasks, newTask])`. ეს vanilla JS-ში პრობლემა არ არის — იქ მასივის პირდაპირ შეცვლა ნორმალურია.
> - **Stale Closure (მოძველებული ჩახურვა)** — JavaScript-ში closure ნიშნავს, რომ ფუნქცია „იმახსოვრებს" გარე ცვლადებს. React-ში ეს პრობლემა ხდება: `setTimeout`-ში ან event handler-ში state-ის ძველი მნიშვნელობა რჩება „გაყინული", თუმცა state უკვე განახლდა. მაგ., ღილაკზე დაჭერისას `count` არის 0, 3 წამში timeout ეშვება და ისევ 0-ს ხედავს, თუმცა მომხმარებელმა ამ დროში count 5-მდე გაზარდა.
> - **Missing Dependencies** — useEffect-ს dependency array-ში ყველა გამოყენებული ცვლადი უნდა ჩაწერო, თორემ effect ძველ მნიშვნელობებზე მუშაობს.
> - **Missing Cleanup** — useEffect-ში setInterval ან event listener რომ გაუშვა, unmount-ზე უნდა გააჩერო, თორემ მეხსიერების leak ხდება.

---

## ეტაპი 1: პროექტის გაშვება და პირველი შეხედვა

### 1.1 გახსენით გვერდი და Console

1. გახსენით `http://localhost:5173`
2. DevTools გახსენით: **Cmd+Option+J** (Mac) ან **Ctrl+Shift+J** (Windows/Linux)
3. გადაერთეთ **Console** tab-ზე

### 1.2 რას ხედავთ?

გვერდი ჩაიტვირთება — Vite dev server მუშაობს, აპლიკაციის UI ჩანს. Console-ში შეცდომები არ ჩანს (React განვითარების რეჟიმში), მაგრამ **ფუნქციონალურობა გატეხილია**. სცადეთ:

1. დავალების დამატება — ემატება, მაგრამ სწრაფად რამდენიმეს დამატებისას ზოგი იკარგება!
2. დავალების checkbox-ზე დაჭერა — სტატუსი არ იცვლება!
3. ფილტრის შეცვლა („აქტიური", „შესრულებული") — სია არ განახლდება!
4. „3 წამში წაშლა" ღილაკზე დაჭერა, შემდეგ სწრაფად ახალი დავალების დამატება — ახალი დავალება ქრება!
5. „ბოლო დამატებიდან" მთვლელი წამში 2-ით იზრდება, 1-ის ნაცვლად!

### 1.3 რატომ არ ჩანს შეცდომები Console-ში?

React-ის bugs ხშირად **ლოგიკურია** — კოდი არ იშლება (არ არის SyntaxError ან TypeError), უბრალოდ არასწორად მუშაობს. React არ "იჩიოდება", როცა state მუტირდება ან dependency აკლია — UI უბრალოდ არ განახლდება.

> **რას ნიშნავს „დაპარსვა" (parsing)?** — როცა ბრაუზერი JavaScript ფაილს იღებს, პირველ რიგში ის კოდს **პარსავს (parse)**: ტექსტს სიტყვა-სიტყვა კითხულობს და ამოწმებს, ენის სინტაქსურ წესებს ხომ არ არღვევს — სწორად არის თუ არა განლაგებული ფრჩხილები, წერტილ-მძიმეები, ოპერატორები და ა.შ. ეს ჯერ კიდევ კოდის **შესრულებამდე** ხდება. თუ პარსინგის ეტაპზე რაიმე წესი დაირღვა, ბრაუზერი SyntaxError-ს ისვრის და ფაილს საერთოდ არ უშვებს — ამიტომ „ვერც კი დაიპარსა" ნიშნავს, რომ ბრაუზერმა ფაილის წაკითხვა-გაანალიზებაც კი ვერ დაასრულა.

> **მნიშვნელოვანი პრინციპი:** Syntax Error არის „კარის მცველი" — ის ბლოკავს ყველაფერს. Runtime და Logic შეცდომებს ვერც კი დაინახავთ, სანამ სინტაქსს არ გაასწორებთ.

### 1.4 შეცდომების სამი ტიპი

სანამ ლოგიკურ ბაგებზე გადავალთ, საჭიროა ვიცოდეთ, **რა ეტაპზე** იჭერს ბრაუზერი შეცდომას — ამაზეა დამოკიდებული, სად უნდა ვეძებოთ.

| ტიპი | როდის ვლინდება | რას ხედავს მომხმარებელი | build გადის? |
|---|---|---|---|
| **Syntax Error** | კოდის **წაკითხვისას** (parse), შესრულებამდე | აპლიკაცია საერთოდ არ იშლება — წითელი ეკრანი | ❌ არა |
| **Runtime Error** | კოდის **შესრულებისას** | აპლიკაცია ჩამოვარდება ან ნაწილობრივ გატყდება | ✅ დიახ |
| **Logic Error** | არასდროს — კოდი ბოლომდე ეშვება | ყველაფერი „მუშაობს", უბრალოდ არასწორად | ✅ დიახ |

ჩვენი 6 ბაგი მთლიანად **მესამე კატეგორიაშია** — ყველაზე მზაკვრულში. მაგრამ პირველი ორიც უნდა ვიცნობდეთ, რომ განვასხვავოთ. მოდი, თითოეული ცოცხლად ვნახოთ.

---

### 1.5 დემონსტრაცია: Syntax Error

> ⚠️ ეს დროებითი ექსპერიმენტია. ბოლოს **Cmd+Z**-ით (ან Ctrl+Z) დააბრუნეთ კოდი უკან, თორემ დანარჩენ სავარჯიშოს ვერ გააკეთებთ.

გახსენით `src/components/TaskForm.jsx` და მე-10 ხაზზე **წაშალეთ დამხურავი ფრჩხილი**:

```javascript
// იყო:
onAddTask(inputValue.trim())

// გახადეთ:
onAddTask(inputValue.trim()
```

შეინახეთ ფაილი (Cmd+S) და გადახედეთ ბრაუზერს.

#### რას ხედავთ

აპლიკაცია **გაქრა** — მთელ ეკრანს წითელი overlay ფარავს, დაახლოებით ასეთი ტექსტით:

```
Transform failed with 1 error:
/src/components/TaskForm.jsx:11:6: ERROR: Expected ")" but found "setInputValue"

9  |      if (inputValue.trim()) {
10 |        onAddTask(inputValue.trim()
11 |        setInputValue('')
   |        ^
12 |      }
```

#### გაანალიზეთ სამი დეტალი

1. **ფაილი და ხაზი პირდაპირ წერია** — `TaskForm.jsx:11:6`. Syntax Error-ის მოძებნა არასდროს გჭირდებათ; ის თავად გეუბნებათ, სად არის
2. **მიმთითებელი (`^`) მე-11 ხაზზეა, შეცდომა კი მე-10-ზე** — ეს ნორმალურია და ძალიან მნიშვნელოვანი გასაგებია: parser-ი მე-10 ხაზს კითხულობს, ფრჩხილს ელოდება, მაგრამ `setInputValue`-ს ხვდება და **სწორედ იქ** ჩერდება, სადაც მოლოდინი გაუცრუვდა. **ამიტომ Syntax Error-ს ყოველთვის მითითებულ ხაზზე *და ერთი ხაზით ზემოთ* ეძებეთ**
3. **ტერმინალშიც იგივე წერია** — Vite dev server-ის ლოგში. თუ overlay შემთხვევით დახურეთ, ინფორმაცია არ იკარგება

#### გადაამოწმეთ build-ითაც

```bash
npm run build
```

```
x Build failed in 116ms
error during build: Transform failed with 1 error
```

**Syntax Error პროდაქშენში ვერ მოხვდება** — build პროცესი უბრალოდ ვერ დასრულდება. ეს არის მისი ერთადერთი კარგი თვისება.

**ახლა დააბრუნეთ ფრჩხილი (Cmd+Z)** და დარწმუნდით, რომ აპლიკაცია ისევ ჩაიტვირთა.

---

### 1.6 დემონსტრაცია: Runtime Error

Runtime Error-ის სინტაქსი **სრულიად სწორია** — კოდი წარმატებით იპარსება და ეშვება. ის მხოლოდ მაშინ სკდება, როცა შესრულება კონკრეტულ ხაზამდე მიაღწევს.

#### ვარიანტი ა — შეცდომა render-ის დროს (მთელი აპლიკაცია ვარდება)

`src/components/TaskCard.jsx`-ში შეცვალეთ:

```jsx
// იყო:
<span className="task-text">{task.text}</span>

// გახადეთ:
<span className="task-text">{task.details.text}</span>
```

შეინახეთ და **დაამატეთ დავალება**.

**რას ხედავთ:** გვერდი **სუფთა თეთრი** გახდა — ბანერიც კი გაქრა. Console-ში:

```
Uncaught TypeError: Cannot read properties of undefined (reading 'text')
    at TaskCard (TaskCard.jsx:19:38)
    at renderWithHooks ...
```

**რატომ თეთრი გვერდი?** React 18-ს რომ render-ის დროს დაუჭერელი შეცდომა შეხვდება, ის განზრახ **მთელ კომპონენტთა ხეს unmount-ავს**. ლოგიკა ასეთია: ნახევრად გატეხილი, არასანდო UI (მაგ., გადახდის ფორმა არასწორი თანხით) უარესია, ვიდრე ცარიელი ეკრანი. ამის თავიდან ასაცილებლად რეალურ პროექტებში **Error Boundary** კომპონენტს იყენებენ, რომელიც შეცდომას იჭერს და მის ნაცვლად fallback UI-ს აჩვენებს.

**ყურადღება მიაქციეთ stack trace-ს:** `at TaskCard (TaskCard.jsx:19:38)` — ფაილზე დაწკაპუნებით პირდაპირ Sources tab-ში, სწორ ხაზზე გადახვალთ. Runtime Error-იც, Syntax Error-ის მსგავსად, **თავად გეუბნებათ სად არის** — და ეს არის მთავარი განსხვავება ლოგიკურ ბაგებთან.

**დააბრუნეთ კოდი (Cmd+Z).**

#### ვარიანტი ბ — შეცდომა event handler-ში (აპლიკაცია ცოცხალი რჩება)

იმავე ფაილში შეცვალეთ „წაშლა" ღილაკის handler:

```jsx
// იყო:
onClick={() => onDelete(task.id)}

// გახადეთ:
onClick={() => removeTask(task.id)}
```

შეინახეთ. **აპლიკაცია ნორმალურად ჩაიტვირთება** — დავალებებს დაამატებთ, checkbox-ებს დააჭერთ, ყველაფერი ჩვეულებრივად გამოიყურება.

ახლა დააჭირეთ **„წაშლა"**-ს:

```
Uncaught ReferenceError: removeTask is not defined
    at onClick (TaskCard.jsx:29:26)
```

დავალება არ წაიშალა, მაგრამ აპლიკაცია არ ჩავარდა — მხოლოდ ის ერთი ღილაკია მკვდარი.

**ეს ყველაზე მნიშვნელოვანი ტიპია სასწავლად**, რადგან ასე იქცევა შეცდომების უმეტესობა რეალურ პროდუქტში: აპლიკაცია მუშაობს, სანამ მომხმარებელი კონკრეტულ ღილაკს არ დააჭერს. თუ არავინ ხსნის Console-ს, ბაგი კვირობით ცოცხლობს.

**დააბრუნეთ კოდი (Cmd+Z).**

---

### 1.7 მთავარი დასკვნა

ორივე runtime ექსპერიმენტზე გაუშვით:

```bash
npm run build
```

**build ორივე შემთხვევაში წარმატებით გავა** ✅

აი, ეს არის საკვანძო აზრი მთელი ამ პრაქტიკისთვის:

```
Syntax Error   →  build ვერ გავიდა       →  პროდაქშენში ვერ მოხვდა
Runtime Error  →  build გავიდა           →  პროდაქშენში მოხვდა, სკდება ხმაურით
Logic Error    →  build გავიდა           →  პროდაქშენში მოხვდა, სკდება ჩუმად
```

რაც უფრო ქვევით ჩამოდიხართ ცხრილში, მით **ნაკლებს გეხმარებათ ინსტრუმენტი და მეტს — თქვენი აზროვნება**. Syntax Error-ს ფაილიც და ხაზიც აწერია. Runtime Error-ს stack trace აქვს. ლოგიკურ ბაგს კი **არაფერი** — არც შეცდომა, არც warning, არც stack trace. მხოლოდ ის, რომ აპლიკაცია არა ისე იქცევა, როგორც უნდა.

დანარჩენი 6 ეტაპი სწორედ ამ მესამე კატეგორიაზეა.

---

## ეტაპი 2: React Bug #1 — Missing useEffect Cleanup (setInterval)

### Bug #1: setInterval არ ჩერდება

#### 2.1 React DevTools-ის დაყენება (ერთხელ)

1. Chrome-ში გახსენით **Chrome Web Store** — მოძებნეთ "React Developer Tools"
2. დააჭირეთ **Add to Chrome** და დაადასტურეთ
3. დაინსტალირების შემდეგ DevTools-ში (F12 ან Cmd+Option+I) ორი ახალი tab გამოჩნდება: **Components** და **Profiler**

> **რა არის Components tab?** ის HTML ელემენტების ნაცვლად React კომპონენტების ხის სტრუქტურას აჩვენებს. კომპონენტზე დაჭერისას მარჯვნივ ჩანს მისი **props** და **state** რეალურ დროში — ყოველი ცვლილებისას განახლდება.

**როგორ ამოვიცნოთ State-ები?** React DevTools-ში `useState` hooks-ს სახელები არ აქვს — მხოლოდ ნომრით ჩანს (`State: []`, `State: "all"` და ა.შ.). რომელი რომელია, კოდში **useState-ების თანმიმდევრობით** ვხვდებით:

```
BugTracker.jsx-ში:                        DevTools-ში:
──────────────────                        ──────────────
const [tasks, ...] = useState([])          →  1. State: []      ← tasks
const [filter, ...] = useState('all')      →  2. State: "all"   ← filter
const [filteredTasks, ...] = useState([])  →  3. State: []      ← filteredTasks
const [addCounter, ...] = useState(0)      →  4. State: 0       ← addCounter

TimerBadge.jsx-ში (ცალკე კომპონენტი):     DevTools-ში:
──────────────────                        ──────────────
const [timeSinceLastAdd, ...] = useState(0) → 1. State: 0       ← timeSinceLastAdd
```

> პირველი `useState` = პირველი State, მეორე = მეორე და ა.შ. **თანმიმდევრობა ყოველთვის იგივეა** — ამიტომაც React hooks-ის წესია, რომ `useState` არასდროს უნდა გამოიძახო `if`-ში ან loop-ში.

#### 2.2 სიმპტომი

1. დაამატეთ დავალება — ქვემოთ გამოჩნდება „ბოლო დამატებიდან: X წამი"
2. **დააკვირდით ციფრს:** ის წამში **2-ით** იზრდება, 1-ის ნაცვლად — თუმცა `setInterval`-ის ინტერვალი 1000ms-ია
3. React DevTools → Components → `TimerBadge` → State #1 (`timeSinceLastAdd`) — იგივე ჩანს state-შიც
4. **რატომ 2?** `main.jsx`-ში აპლიკაცია `<React.StrictMode>`-შია გახვეული. StrictMode development-ში ყოველ effect-ს განზრახ ორჯერ უშვებს: mount → unmount → mount. cleanup რომ იყოს, პირველი interval გაჩერდებოდა; მისი გარეშე **ორივე** interval მუშაობს პარალელურად
5. **მეორე სიმპტომი:** `TimerBadge` მხოლოდ მაშინ ჩანს, როცა `tasks.length > 0`. წაშალეთ ყველა დავალება (badge ქრება, კომპონენტი unmount-დება), მერე ისევ დაამატეთ — ძველი interval-ები მაინც აგრძელებენ ტიკტიკს ფონურად. ეს არის **memory leak**

#### 2.3 კოდში ნახვა

Sources tab → `src/components/TimerBadge.jsx` → `useEffect` setInterval-ით:

> **ყურადღება:** ეს კოდი `BugTracker.jsx`-ში **არ არის** — მთვლელი ცალკე კომპონენტშია გატანილი, სწორედ იმისთვის, რომ unmount-ი (და მასთან ერთად memory leak-იც) რეალურად ხდებოდეს.

```javascript
// BUG #1: Missing useEffect Cleanup
useEffect(() => {
  const interval = setInterval(() => {
    setTimeSinceLastAdd(prev => prev + 1)
  }, 1000)
  // cleanup function აკლია!
}, [])
```

**პრობლემა:** `useEffect`-ის callback უნდა აბრუნებდეს **cleanup function**-ს, რომელიც `clearInterval`-ს გამოიძახებს. ამის გარეშე ყოველი mount-ზე ახალი interval იქმნება, ძველი კი არ ჩერდება.

#### 2.4 გამოსწორება

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    setTimeSinceLastAdd(prev => prev + 1)
  }, 1000)
  return () => clearInterval(interval) // cleanup!
}, [])
```

**გადაამოწმეთ:** გვერდის refresh-ის შემდეგ მთვლელი წამში **1-ით** უნდა იზრდებოდეს, 2-ის ნაცვლად.

> **ხშირი კითხვა: StrictMode ხომ მაინც ორჯერ უშვებს effect-ს — ბაგი არ დარჩება?**
> StrictMode მართლაც ისევ ორჯერ გაუშვებს, მაგრამ ახლა თანმიმდევრობა ასეთია:
>
> ```
> mount       → effect ეშვება      → იქმნება interval A
> StrictMode  → unmount სიმულაცია  → cleanup ეშვება → clearInterval(A) ✅
> remount     → effect ისევ ეშვება → იქმნება interval B
> ```
>
> ცოცხალი რჩება მხოლოდ **B** — ერთი interval, 1 წამში 1 ტიკი. ბაგიან ვერსიაში მე-2 ნაბიჯი უბრალოდ არ არსებობდა, ამიტომ A-ც და B-ც პარალელურად მუშაობდა.
>
> ანუ StrictMode ბაგს **არ ქმნის** — ის უკვე არსებულ, დაუსუფთავებელ effect-ს ხმამაღლა ამხელს. ეს განზრახაა ასე დაპროექტებული React 18-ში.
>
> **ექსპერიმენტი:** დააბრუნეთ ბაგი (წაშალეთ `return () => clearInterval(interval)`) და გაუშვით production build:
> ```bash
> npm run build && npm run preview
> ```
> production-ში StrictMode ორმაგ გაშვებას **არ აკეთებს**, ამიტომ მთვლელი გამოუსწორებელ კოდშიც 1/წმ იქნება — ბაგი თითქოს „გაქრა". სინამდვილეში memory leak ადგილზეა და ყოველ რეალურ unmount-ზე (ყველა დავალების წაშლისას) გროვდება. სწორედ ამიტომ არსებობს StrictMode: development-ში აჩვენოს ის, რაც production-ში ჩუმად იმალება.

#### 2.5 როგორ დავიჭიროთ leak StrictMode-ის გარეშე?

StrictMode-ის გარეშე (ან production build-ში) ბაგს **ხილული სიმპტომი საერთოდ არ აქვს** — mount-ზე ერთი interval იქმნება და მთვლელი ნორმალურად, 1/წმ იზრდება. ბაგი მხოლოდ **რეალურ unmount-ზე** იჩენს თავს, ხოლო React 18-ში ძველი „Can't perform a React state update on unmounted component" გაფრთხილებაც აღარ გამოდის — Console სუფთაა.

ასეთ დროს სამი ხერხი გვრჩება:

**1. console.log interval-ის შიგნით** — ყველაზე სწრაფი:

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    console.log('tick', Date.now()) // ← დროებითი ზონდი
    setTimeSinceLastAdd(prev => prev + 1)
  }, 1000)
}, [])
```

ახლა წაშალეთ **ყველა** დავალება — badge ეკრანიდან ქრება, კომპონენტი unmount-დება, მაგრამ `tick` ლოგები Console-ში აგრძელებს ჩამოსვლას. ეს არის leak-ის პირდაპირი მტკიცებულება. ისევ დაამატეთ დავალება, ისევ წაშალეთ — ლოგები **გაორმაგდება**, რადგან ყოველი mount ახალ interval-ს ტოვებს.

**2. Memory panel** — DevTools → Memory → Heap snapshot: ერთი აიღეთ დასაწყისში, მერე რამდენჯერმე გაიმეორეთ „დამატება → ყველას წაშლა" ციკლი და მეორე snapshot აიღეთ. Comparison რეჟიმში დაინახავთ, რომ `TimerBadge`-ის closure-ები არ თავისუფლდება.

**3. Performance panel** — ჩაწერეთ 30 წამი: Timer-ების რიგში პარალელური, თანაბრად განმეორებადი callback-ები ჩანს იმაზე მეტი, ვიდრე ეკრანზე კომპონენტია.

> **დასკვნა:** StrictMode ამ ბაგს არ ქმნის და არც მალავს — ის უბრალოდ **აჩქარებს მის გამოვლენას**, unmount/remount ციკლს ხელოვნურად რომ ატარებს ჯერ კიდევ development-ში. მისი გარეშე იგივე leak არსებობს, უბრალოდ დაგჭირდებათ ხელით პროვოცირება (unmount) და ზონდი (`console.log` ან Memory snapshot), რომ დაინახოთ.

#### 2.6 რატომ ვასწორებთ ამას პირველად?

ორი მიზეზით. პირველი — ეს ყველაზე „ხმაურიანი" ბაგია: მთვლელი მუდმივად თვალში გცემთ და ხელს გიშლით დანარჩენ სიმპტომებზე ფოკუსირებაში. მეორე — ის ერთადერთია, რომელიც `BugTracker.jsx`-ის გარეთაა; მისი გამოსწორების შემდეგ დანარჩენ ბაგებს ერთ ფაილში ეძებთ.

> **მითი, რომელიც ხშირად გესმით:** „timer-ის re-render ფარავს state mutation-ის ბაგს". ამ პროექტში ეს **არ ხდება** — `timeSinceLastAdd` არის `TimerBadge`-ის *ლოკალური* state, ამიტომ მისი განახლება მხოლოდ `TimerBadge`-ს არენდერებს და `BugTracker`-ს ხელს არ ახლებს. React ყოველთვის მხოლოდ იმ კომპონენტიდან ქვევით რენდერავს, სადაც state შეიცვალა — არა მთელ აპლიკაციას. ეს თავისთავად კარგი გასახსენებელია: **სად ცხოვრობს state, იქიდან იწყება re-render**.

> **useEffect Cleanup წესი:** `setInterval`, `addEventListener`, WebSocket subscription — ნებისმიერი „მუდმივი" პროცესი useEffect-ში cleanup function-ით უნდა გაჩერდეს: `return () => { ... }`. თორემ memory leak და „Can't perform a React state update on unmounted component" გაფრთხილება.

---

## ეტაპი 3: React Bug #2 — Direct State Mutation

### Bug #2: checkbox-ის ცვლილება არ მუშაობს

#### 3.1 სიმპტომი

1. დაამატეთ დავალება — მაგ., „დალაგება"
2. დააჭირეთ checkbox-ს — **არაფერი არ ხდება!** დავალება არ გაიხაზება
3. Console-ში შეცდომა არ არის

> ეს ყველაზე მზაკვრული ტიპის ბაგია: არც შეცდომა, არც warning — უბრალოდ „არაფერი ხდება".

#### 3.2 React DevTools-ით ანალიზი

1. React DevTools → Components → `BugTracker`
2. State #1 (`tasks`) — გაშალეთ მასივი და დააჭირეთ checkbox-ს
3. **DevTools-ში ცვლილება არ ჩანს** — React-მა re-render არ გააკეთა, ამიტომ არც ეკრანი და არც პანელი განახლდა
4. ჩაწერეთ Console-ში `$r.` ... — ან უბრალოდ დაამატეთ კიდევ ერთი დავალება: ახლა re-render მოხდება და **უცებ დაინახავთ, რომ checkbox მართლაც მონიშნულია**. ეს არის მთავარი მინიშნება: მონაცემი შეიცვალა, უბრალოდ React-მა ვერ გაიგო

#### 3.3 კოდში ნახვა

Sources tab → `src/components/BugTracker.jsx` → `toggleTask` ფუნქცია:

```javascript
const toggleTask = (id) => {
  // BUG #2: Direct State Mutation
  const taskIndex = tasks.findIndex(task => task.id === id)
  tasks[taskIndex].completed = !tasks[taskIndex].completed
  setTasks(tasks) // Same reference, React won't re-render!
}
```

**პრობლემა:** `tasks` მასივის ელემენტი პირდაპირ იცვლება. `setTasks(tasks)` იმავე reference-ს აყენებს, React კი shallow comparison-ით ხვდება, რომ reference არ შეცვლილა და არ რენდერავს.

#### 3.4 გამოსწორება

იპოვეთ `// BUG #2` კომენტარი და შეცვალეთ:

```javascript
const toggleTask = (id) => {
  setTasks(tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  ))
}
```

#### 3.5 ჩაინიშნეთ

> **React State Mutation — #1 წესი:**
> **არასოდეს** მუტირება გაუკეთოთ state-ს (arrays, objects). ყოველთვის შექმენით **ახალი** reference:
> - `tasks[0].completed = true` ❌ — პირდაპირი მუტაცია
> - `tasks.map(...)` ან `[...tasks]` ✅ — ახალი მასივი
>
> **რატომ?** React state-ის განახლებას shallow comparison-ით ამოწმებს. თუ reference იგივეა (`tasks === tasks`), React არ რენდერავს.
>
> **პრევენცია:** ჩვენს დემო პროექტში ESLint არ არის — სპეციალურად, რომ ბაგები თავად იპოვოთ. რეალურ პროექტში კი აუცილებლად დააყენეთ:
>
> ```bash
> npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks
> ```
>
> შემდეგ პროექტის root-ში შექმენით `eslint.config.js`:
>
> ```javascript
> import reactPlugin from 'eslint-plugin-react'
> import reactHooksPlugin from 'eslint-plugin-react-hooks'
>
> export default [
>   {
>     plugins: {
>       react: reactPlugin,
>       'react-hooks': reactHooksPlugin,
>     },
>     rules: {
>       'react/no-direct-mutation-state': 'error',
>       'react-hooks/rules-of-hooks': 'error',
>       'react-hooks/exhaustive-deps': 'warn',
>     },
>   },
> ]
> ```
>
> ამის შემდეგ `npx eslint src/` გაუშვებს შემოწმებას. `no-direct-mutation-state` state mutation-ზე გაფრთხილებს, `exhaustive-deps` კი useEffect-ის გამოტოვებულ dependency-ებზე (Bug #3).

---

## ეტაპი 4: React Bug #3 — Missing useEffect Dependency

### Bug #3: ფილტრაცია არ მუშაობს

#### 4.1 სიმპტომი

Bug #2-ის გამოსწორების შემდეგ checkbox მუშაობს. ახლა სცადეთ:

1. დაამატეთ 3 დავალება
2. 1 შეასრულეთ (checkbox)
3. დააჭირეთ „შესრულებული" ფილტრს — სწორად აჩვენებს 1 შესრულებულს
4. დააჭირეთ „აქტიური" — ცარიელია! (უნდა აჩვენოს 2 აქტიურს)
5. დაამატეთ ახალი დავალება — ახლა ფილტრი განახლდა და ყველა ჩანს

**ფილტრი მუშაობს მხოლოდ `tasks`-ის ცვლილებისას, მაგრამ არა `filter`-ის ცვლილებისას!**

#### 4.2 React DevTools-ით ანალიზი

1. React DevTools → Components → `BugTracker`
2. State-ში ნახავთ: `filter: "active"`, `filteredTasks: []`
3. `filter` შეცვალეთ „active"-ზე — `filteredTasks` არ განახლდა!

#### 4.3 კოდში პრობლემის პოვნა

Sources tab → `src/components/BugTracker.jsx` → `useEffect` ფილტრაციისთვის:

```javascript
// BUG #3: Missing useEffect Dependency
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

**პრობლემა:** dependency array-ში `filter` არ არის. React `useEffect`-ს ხელახლა უშვებს **მხოლოდ** `tasks` ცვლილებისას. `filter` state-ის ცვლილება React-ს არ აუწყებს, რომ effect ხელახლა გაშვას.

#### 4.4 გამოსწორება

```javascript
// სწორი ვერსია — ორივე dependency
useEffect(() => {
  if (filter === 'all') {
    setFilteredTasks(tasks)
  } else if (filter === 'active') {
    setFilteredTasks(tasks.filter(task => !task.completed))
  } else if (filter === 'completed') {
    setFilteredTasks(tasks.filter(task => task.completed))
  }
}, [tasks, filter]) // ახლა filter-ის ცვლილებაც იწვევს განახლებას
```

#### 4.5 ჩაინიშნეთ

> **useEffect Dependencies წესი:**
> Effect-ში გამოყენებული **ყველა** state და props dependency array-ში უნდა იყოს. თუ არ იქნება:
> - Effect stale (ძველ) მნიშვნელობებს დაინახავს
> - UI არ განახლდება მნიშვნელობების ცვლილებისას
>
> **პრევენცია:** ESLint plugin `eslint-plugin-react-hooks` წესი `exhaustive-deps` ავტომატურად გაფრთხილებას გიგზავნით — „React Hook useEffect has a missing dependency: 'filter'".

---

## ეტაპი 5: React Bug #4 — Stale Closure

### Bug #4: „3 წამში წაშლა" ახლად დამატებულ დავალებებს ანადგურებს

#### 5.1 სიმპტომი

1. დაამატეთ 3 დავალება: „საყიდლები", „დალაგება", „სავარჯიშო"
2. „საყიდლები"-ზე დააჭირეთ **„3 წამში წაშლა"**
3. 3 წამის განმავლობაში სწრაფად დაამატეთ ახალი დავალება — „წაკითხვა"
4. 3 წამი გავა — „საყიდლები" წაიშალა (ეს სწორია), მაგრამ **„წაკითხვაც" გაქრა**!

**რატომ?** timeout-ის callback-მა ძველი, 3-ელემენტიანი მასივი გაფილტრა და შედეგი state-ად დააყენა — „წაკითხვა" ამ ძველ მასივში საერთოდ არ იყო, ამიტომ ის უბრალოდ „გადაეწერა".

#### 5.2 React DevTools-ით ანალიზი

1. React DevTools → Components → `BugTracker`
2. State #1 (`tasks`) — დააკვირდით, რომ 3-წამიანი timeout-ის შემდეგ tasks მასივი ძველ მდგომარეობას უბრუნდება

#### 5.3 კოდში პრობლემის პოვნა

Sources tab → `src/components/BugTracker.jsx` → `deleteTaskDelayed` ფუნქცია:

```javascript
const deleteTaskDelayed = (id) => {
  setTimeout(() => {
    // BUG #4: Stale Closure
    // tasks აქ არის closure-ში დაფიქსირებული ძველი მნიშვნელობა
    setTasks(tasks.filter(task => task.id !== id))
  }, 3000)
}
```

**პრობლემა:** `setTimeout`-ის callback 3 წამში ეშვება, მაგრამ `tasks` ცვლადი closure-ში **„გაყინულია"** — ის იმ მომენტის მნიშვნელობას ინახავს, როცა `deleteTaskDelayed` გამოიძახეს. 3 წამის განმავლობაში დამატებული ახალი დავალებები `tasks`-ში არ არის — `setTasks(tasks.filter(...))` ძველ მასივს აყენებს და ახალი დავალებები იკარგება.

#### 5.4 გამოსწორება

```javascript
const deleteTaskDelayed = (id) => {
  setTimeout(() => {
    // Functional update — prev ყოველთვის აქტუალური მნიშვნელობაა
    setTasks(prev => prev.filter(task => task.id !== id))
  }, 3000)
}
```

#### 5.5 ჩაინიშნეთ

> **Stale Closure წესი:**
> `setTimeout`, `setInterval`, Promise-ების `.then()` — ნებისმიერ async callback-ში state-ის ძველი მნიშვნელობა closure-ში რჩება.
> გამოსავალი: **functional update** — `setState(prev => ...)`. `prev` ყოველთვის ყველაზე აქტუალური state-ის მნიშვნელობაა.

---

## ეტაპი 6: React Bug #5 — Wrong Key Prop

### Bug #5: წაშლისას არასწორი ელემენტი ანიმირდება

#### 6.1 სიმპტომი

ყოველ დავალების ბარათს აქვს პატარა ველი „შენიშვნა..." — ეს არის **uncontrolled input**: მისი ტექსტი მხოლოდ DOM-ში ცხოვრობს, React-ის state-ში არა.

1. დაამატეთ 4 დავალება: „ა", „ბ", „გ", „დ"
2. თითოეულის შენიშვნის ველში ჩაწერეთ შესაბამისად `1`, `2`, `3`, `4`
3. წაშალეთ **პირველი** დავალება („ა")
4. **დააკვირდით:** დარჩა „ბ", „გ", „დ" — მაგრამ შენიშვნები ისევ `1`, `2`, `3`-ია! ანუ „ბ"-ს ახლა „ა"-ს შენიშვნა აქვს

> **რატომ სწორედ uncontrolled input?** checkbox ამ ბარათზე **controlled**-ია (`checked={task.completed}`) — მისი მნიშვნელობა ყოველ render-ზე props-იდან მოდის, ამიტომ ის ამ ბაგზე არ ირევა. `key`-ს ბაგი მხოლოდ იქ ჩანს, სადაც მდგომარეობა React-ის გარეთ ინახება: uncontrolled input, ლოკალური `useState` ბავშვ კომპონენტში, scroll position, CSS ანიმაციის ფაზა. სწორედ ამიტომაა ეს ბაგი ასეთი მზაკვრული — ხშირად კოდის მიმოხილვისას „უწყინრად" გამოიყურება.

#### 6.2 კოდში პრობლემის პოვნა

Sources tab → `src/components/TaskList.jsx`:

```javascript
{/* BUG #5: Wrong Key Prop - array index-ს ვიყენებთ key-დ */}
{tasks.map((task, index) => (
  <TaskCard
    key={index} // უნდა იყოს task.id!
    task={task}
    ...
  />
))}
```

**პრობლემა:** `key={index}` იყენებს მასივის ინდექსს. წაშლისას ინდექსები გადანომრდება — ელემენტი #1 ხდება #0, #2 ხდება #1. React ფიქრობს, რომ key=0 ელემენტი იგივეა (მაგრამ სხვა მონაცემებით), და ძველ DOM state-ს (checkbox) ინახავს.

#### 6.3 გამოსწორება

```javascript
{tasks.map((task) => (
  <TaskCard
    key={task.id} // stable, unique ID
    task={task}
    ...
  />
))}
```

#### 6.4 ჩაინიშნეთ

> **List Key წესი:**
> `key={index}` არის anti-pattern — გამოიყენეთ **stable და unique ID** (`key={item.id}`).
> index-ით React არასწორ ელემენტებს განაახლებს, რაც იწვევს:
> - არასწორი checkbox/input state წაშლის/დამატების შემდეგ
> - ანიმაციების შეცდომები
> - Performance პრობლემები (ზედმეტი re-render)

---

## ეტაპი 7: React Bug #6 — Async Race Condition

### Bug #6: სწრაფად დამატებისას დავალებები იკარგება

#### 7.1 სიმპტომი

1. სწრაფად (1 წამში) დაამატეთ 3 დავალება ზედიზედ
2. **მხოლოდ ბოლო დავალება რჩება!** — წინა 2 გაქრა

#### 7.2 კოდში პრობლემის პოვნა

Sources tab → `src/components/BugTracker.jsx` → `addTask` ფუნქცია:

```javascript
const addTask = (text) => {
  const newTask = { id: Date.now(), text, completed: false, createdAt: Date.now() }

  // BUG #6: Async Race Condition
  setTimeout(() => {
    setTasks([...tasks, newTask]) // tasks არის stale!
  }, 100)
}
```

**პრობლემა:** `setTimeout` 100ms დაგვიანებით ეშვება. სწრაფად 3 დავალების დამატებისას, სამივე `setTimeout` ერთსა და იმავე ძველ `tasks` მასივს ხედავს (ცარიელს). სამივე `setTasks([...tasks, newTask])` ცარიელ მასივზე ამატებს — ბოლო ამარჯვებს.

ეს Bug #4-ის (Stale Closure) მსგავსი პრობლემაა, მაგრამ `addTask`-ში.

#### 7.3 გამოსწორება

```javascript
const addTask = (text) => {
  const newTask = { id: Date.now(), text, completed: false, createdAt: Date.now() }

  setTimeout(() => {
    setTasks(prev => [...prev, newTask]) // functional update!
  }, 100)
}
```

#### 7.4 ჩაინიშნეთ

> **Async State Update წესი:**
> ნებისმიერ async კოდში (`setTimeout`, `fetch().then()`, `async/await`) state-ის განახლებისას **ყოველთვის** გამოიყენეთ functional update:
> - `setTasks([...tasks, newTask])` ❌ — stale closure
> - `setTasks(prev => [...prev, newTask])` ✅ — ყოველთვის აქტუალური

---

## ეტაპი 8: Debugging მეთოდოლოგია — შეჯამება

### 8.1 Scientific Method პრაქტიკაში

ამ სავარჯიშოში ჩვენ ინტუიტიურად სამეცნიერო მეთოდი გამოვიყენეთ:

- **დააკვირდი** — Console-ში შეცდომა წავიკითხეთ, აპლიკაცია ხელით ვტესტეთ
- **ჰიპოთეზა** — „ალბათ ფრჩხილი აკლია", „ალბათ ცვლადი undefined-ია"
- **შეამოწმე** — `console.log`-ით, breakpoint-ით, ან Sources tab-ით
- **გამოასწორე** — კოდი შევცვალეთ
- **გადაამოწმე** — Refresh → შეცდომა აღარ ჩანს? სწორად მუშაობს?

### 8.2 როდის რა გამოვიყენოთ?

- **Console** — Syntax და Runtime შეცდომების პირველი ნახვა
- **Sources + Breakpoints** — ცვლადების მნიშვნელობების ინსპექტირება
- **`console.log()`** — ლოგიკური შეცდომების დროს მნიშვნელობების თვალყურის დევნა
- **Step-through (F10/F11)** — კოდის ხაზ-ხაზ შესრულება, ლოგიკის გაგება
- **Rubber Duck** — ახსენით პრობლემა ხმამაღლა — ხშირად ამანვე გადაჭრის
- **Binary Search** — დიდ ფაილში — კოდის ნახევარი გამორთეთ, იმუშავა? მეორე ნახევარში ეძებეთ

### 8.3 პრევენცია > აღმოჩენა > გამოსწორება

ყველაზე კარგი debugging არის ის, რომელიც არ გჭირდებათ:

- **ESLint** — სინტაქსის შეცდომები, `==` ნაცვლად `===`, გამოუყენებელი ცვლადები
- **TypeScript** — ტიპის შეცდომები, undefined-ის მიწვდომა, არაფუნქციის გამოძახება
- **Prettier** — ფორმატირება — აადვილებს კოდის წაკითხვას
- **Unit Tests** — ლოგიკური შეცდომები, off-by-one, edge cases
- **Code Review** — ადამიანის თვალი იჭერს იმას, რაც ინსტრუმენტმა ვერ იპოვა

---

## შეჯამება: 6 React Bug-ის ცხრილი

1. **Bug #1 — Missing useEffect Cleanup** (`TimerBadge.jsx`)
   - **სიმპტომი:** მთვლელი წამში 2-ით იზრდება; badge-ის unmount-ის შემდეგაც interval მუშაობს — memory leak
   - **მიზეზი:** `useEffect`-ში cleanup function (`return () => clearInterval(...)`) აკლია
   - **გამოსწორება:** `return () => clearInterval(interval)` cleanup დამატება

2. **Bug #2 — Direct State Mutation** (`BugTracker.jsx` → `toggleTask`)
   - **სიმპტომი:** checkbox დაჭერა არ ცვლის დავალების სტატუსს; შეცდომა Console-ში არ ჩანს
   - **მიზეზი:** `tasks[i].completed = ...` პირდაპირი მუტაცია, `setTasks(tasks)` იგივე reference
   - **გამოსწორება:** `tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task)`

3. **Bug #3 — Missing useEffect Dependency** (`BugTracker.jsx`)
   - **სიმპტომი:** ფილტრის ღილაკზე დაჭერა სიას არ ცვლის — მხოლოდ ახალი დავალების დამატებაზე განახლდება
   - **მიზეზი:** `useEffect` dependency array-ში `filter` state არ არის
   - **გამოსწორება:** `useEffect(..., [tasks, filter])` — ორივე dependency

4. **Bug #4 — Stale Closure** (`BugTracker.jsx` → `deleteTaskDelayed`)
   - **სიმპტომი:** „3 წამში წაშლა"-ს დაჭერის შემდეგ დამატებული დავალებები ქრება
   - **მიზეზი:** `setTimeout`-ში `tasks` არის stale (ძველი მნიშვნელობა closure-დან)
   - **გამოსწორება:** `setTasks(prevTasks => prevTasks.filter(...))` — functional update

5. **Bug #5 — Wrong Key in List** (`TaskList.jsx`)
   - **სიმპტომი:** წაშლისას „შენიშვნა" ველების ტექსტი არასწორ დავალებებზე რჩება
   - **მიზეზი:** `key={index}` ნაცვლად `key={task.id}` — ინდექსები გადანომრდება
   - **გამოსწორება:** `key={task.id}` — unique და stable ID

6. **Bug #6 — Async Race Condition** (`BugTracker.jsx` → `addTask`)
   - **სიმპტომი:** სწრაფად რამდენიმე დავალების დამატება — ზოგი იკარგება
   - **მიზეზი:** `setTimeout`-ში `setTasks([...tasks, newTask])` — stale `tasks` closure
   - **გამოსწორება:** `setTasks(prev => [...prev, newTask])` — functional update

### მთავარი წესები

1. **State Mutation — #1 ბაგი React-ში** — არასოდეს მუტირება `state`-ს. ყოველთვის ახალი reference (array: `.map()`, `[...arr]`; object: `{...obj}`). React DevTools-ით ნახეთ state ცვლილებები.

2. **useEffect Dependencies — #2 ბაგი React-ში** — effect-ში გამოყენებული ყველა state/props dependency array-ში უნდა იყოს. ESLint `exhaustive-deps` წესი დაგეხმარებათ.

3. **Stale Closures — #3 ბაგი Async კოდში** — `setTimeout`, `setInterval`, Promise-ებში state-ის ძველი მნიშვნელობა closure-ში რჩება. გამოსავალი: functional update — `setState(prev => ...)`

4. **List Keys — #4 ბაგი React-ში** — `key={index}` არის anti-pattern. გამოიყენეთ stable და unique ID (`key={item.id}`). სხვაგვარად React არასწორ ელემენტებს განაახლებს.

5. **Effect Cleanup** — `setInterval`, event listeners, subscriptions useEffect-ში cleanup function-ით უნდა გასუფთავდეს. თორემ memory leak და "Can't perform a React state update on unmounted component" გაფრთხილება.

6. **React DevTools — debugging-ის საფუძველი** — Components tab state-ის, props-ის, hooks-ის ინსპექტირებისთვის. Profiler tab performance-ისთვის. Console-ის `$r` — არჩეული კომპონენტი.

7. **პრევენცია** — ESLint + `eslint-plugin-react-hooks`, TypeScript, React StrictMode (ორმაგი render-ით bugs-ს ამჟღავნებს), Unit Tests (Vitest, Jest).

---

## შემდეგი ნაბიჯი: დამოუკიდებელი დავალება

გაიდის დასრულების შემდეგ გაიარეთ დავალება იმავე ტიპის ბაგებზე, ოღონდ **ახალ პროექტზე და მინიშნებების გარეშე**:

- **დავალების ინსტრუქცია:** [`დავალება/README.md`](დავალება/README.md)
- **პროექტი:** [`დავალება/homework-debugging/`](დავალება/homework-debugging/) — Habit Tracker, 6 ბაგი, `// BUG #N` კომენტარების გარეშე
- **ანგარიშის შაბლონი:** [`დავალება/ანგარიშის-შაბლონი.md`](დავალება/ანგარიშის-შაბლონი.md)
- **დამატებითი წყაროები:** [`გარე-რესურსები.md`](გარე-რესურსები.md)
