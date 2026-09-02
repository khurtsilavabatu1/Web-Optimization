# Quick Start Guide

## 1. დაყენება (Installation)

```bash
cd demo-debugging
npm install
```

ეს დააყენებს:
- React 18.3.1
- React DOM 18.3.1  
- Vite 5.4.0
- @vitejs/plugin-react 4.3.1

**დრო:** ~1-2 წუთი (დამოკიდებულია ინტერნეტის სიჩქარეზე)

---

## 2. გაშვება (Start Development Server)

```bash
npm run dev
```

ტერმინალში გამოჩნდება:
```
  VITE v5.4.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

Browser-ში გახსენით: **http://localhost:5173**

---

## 3. React DevTools დაყენება

### Chrome
https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi

### Firefox  
https://addons.mozilla.org/en-US/firefox/addon/react-devtools/

### Edge
https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil

---

## 4. Debugging-ის დაწყება

1. ✅ **გახსენით Console** (F12 → Console tab)
2. ✅ **გახსენით React DevTools** (F12 → Components tab)
3. ✅ **წაიკითხეთ Bug Banner** — "6 შეცდომას შეიცავს"
4. ✅ **მარჯვენა panel** — Bug hints-ის სია

---

## 5. ტესტირების Checklist

### Bug #1: Missing useEffect Cleanup
- [ ] დაამატეთ დავალება
- [ ] დააკვირდით „ბოლო დამატებიდან: X წამი" მთვლელს
- [ ] ✅ **წამში 2-ით იზრდება, 1-ის ნაცვლად!** (StrictMode + cleanup-ის არარსებობა)
- [ ] წაშალეთ ყველა დავალება და ისევ დაამატეთ — interval-ები გროვდება

### Bug #2: Direct State Mutation
- [ ] დაამატეთ დავალება
- [ ] დააჭირეთ checkbox-ს
- [ ] ✅ **არაფერი მოხდება!** (UI არ განახლდება)

### Bug #3: Missing useEffect Dependency
- [ ] დაამატეთ რამდენიმე დავალება
- [ ] დააჭირეთ „აქტიური" ფილტრს
- [ ] ✅ **სია არ შეიცვლება!**

### Bug #4: Stale Closure
- [ ] დაამატეთ დავალება
- [ ] დააჭირეთ „3 წამში წაშლა"
- [ ] სწრაფად დაამატეთ 2-3 ახალი დავალება
- [ ] დაელოდეთ 3 წამს
- [ ] ✅ **ახლად დამატებული დავალებები გაქრება!**

### Bug #5: Wrong Key Prop
- [ ] დაამატეთ 4 დავალება
- [ ] თითოეულს ჩაუწერეთ სხვადასხვა ტექსტი „შენიშვნა..." ველში
- [ ] წაშალეთ პირველი დავალება
- [ ] ✅ **შენიშვნები არასწორ დავალებებზე დარჩება!**

### Bug #6: Async Race Condition
- [ ] სწრაფად დაამატეთ 5 დავალება (ერთი მეორეს მიყოლებით)
- [ ] ✅ **ზოგიერთი დავალება „გაქრა"!**

---

## 6. გამოსწორება

თითოეული bug-ის გამოსასწორებლად:

1. **იპოვეთ პრობლემა** (Console + React DevTools)
2. **გახსენით შესაბამისი ფაილი** (hints panel-ი გეუბნებათ სად)
3. **გამოასწორეთ კოდი**
4. **Vite ავტომატურად reload იქნება** (Hot Module Replacement)
5. **ხელახლა ტესტირება** ამ bug-ის დასადასტურებლად

---

## 7. პასუხების შემოწმება

როცა ყველა bug-ს გამოასწორებთ, შეადარეთ თქვენი კოდი:

```bash
cat SOLUTIONS.md
```

ან გახსენით `SOLUTIONS.md` ფაილი editor-ში.

---

## დახმარება

### Vite არ ეშვება
```bash
# Node version შემოწმება (უნდა იყოს 14+)
node --version

# Cache გასუფთავება
rm -rf node_modules package-lock.json
npm install
```

### Port 5173 დაკავებულია
```bash
# სხვა port-ზე გაშვება
npm run dev -- --port 3000
```

### React DevTools არ ჩანს
- დარწმუნდით რომ extension დაყენებულია
- Browser-ის refresh (Ctrl/Cmd + Shift + R)
- Console → წითელი error მესიჯები არ უნდა იყოს

### Bugs არ ჩანს
ეს ნორმალურია! Bugs "ბუნებრივად" გამოჩნდება როცა:
- Checkbox-ზე დააწკაპუნებთ (#2)
- ფილტრებს გამოიყენებთ (#3)
- სხვადასხვა ფუნქციონალობას შეამოწმებთ

---

## კოდის სტრუქტურა

```
src/
├── main.jsx              ← React-ის შესასვლელი
├── App.jsx               ← Root component (bug banner + layout)
├── App.css               ← ყველა სტილი
└── components/
    ├── BugTracker.jsx    ← მთავარი state და ლოგიკა (Bug #2, #3, #4, #6)
    ├── TaskForm.jsx      ← Input form
    ├── TaskList.jsx      ← Map over tasks (Bug #5)
    ├── TaskCard.jsx      ← ცალკეული task item
    └── TimerBadge.jsx    ← „ბოლო დამატებიდან" მთვლელი (Bug #1)
```

**მთავარი:** `BugTracker.jsx`, `TaskList.jsx` და `TimerBadge.jsx` — აქ არის ყველა 6 შეცდომა!

---

## წარმატებები!

გისურვებთ წარმატებას debugging-ში! 🐛🔍

თუ 6-დან 6 bug-ს იპოვით და გამოასწორებთ, მაშინ თქვენ:
- ✅ გესმით React-ის immutability
- ✅ იცით როგორ მუშაობს useEffect
- ✅ ესმით JavaScript closures
- ✅ იცით რატომ არის key prop მნიშვნელოვანი
- ✅ გესმით useEffect cleanup
- ✅ შეგიძლიათ async race conditions-ის გამოსწორება

---

**Tip:** დაიწყეთ Bug #1-დან და თანმიმდევრულად წადით. ზოგიერთი bug-ი უფრო ადვილი, ზოგიც უფრო რთულია!
