# Support Inbox — Re-renders და Network დავალების პროექტი

**კვირა 4, ლექცია 2 — Re-renders და Network Debugging**

ეს არის დავალების პროექტი Vite + React-ზე: სუპორტის ტიკეტების ინბოქსი, SLA ანგარიში და API პანელი.
აპლიკაცია შეიცავს **6 განზრახ ჩადებულ პრობლემას** — 3 ქსელის და 3 რენდერის/memoization-ის —
და თითოეული ისე შერჩეულია, რომ **ლექციის კონკრეტული ინსტრუმენტით** მოიძებნოს:

| ინსტრუმენტი | რას პოულობს |
|---|---|
| **Network tab** (Fetch/XHR) | სტატუს კოდები, request-ების რაოდენობა, არასწორად დამუშავებული შეცდომა |
| Network tab → **Timing / Waterfall** | თანმიმდევრული (waterfall) vs პარალელური request-ები, TTFB |
| React DevTools → **Profiler** (Ranked, „Why did this render?") | ძვირი კომპონენტი და რენდერის ნამდვილი მიზეზი |
| React DevTools → **Components** | props/state/hooks-ის რეალური მნიშვნელობები |
| **render badge-ები** | ზედმეტი რენდერების სწრაფი გაზომვა |

> კოდში `// BUG #N` კომენტარები **არ არის** — პრობლემები თავად უნდა იპოვოთ.

## 🚀 გაშვება

```bash
npm install
npm run dev
```

ბრაუზერში: `http://localhost:5173`

## 🌐 Endpoint-ები

პროექტი ლოკალურ endpoint-ებს იყენებს (`public/` ფოლდერიდან) — **ინტერნეტი არ სჭირდება**:

| URL | სტატუსი | აღწერა |
|---|---|---|
| `/tickets.json` | 200 | 8 ტიკეტი |
| `/agents.json` | 200 | 4 აგენტი |
| `/sla-targets.json` | 200 | SLA სამიზნეები |
| `/tickets-archive.json` | **404** | ფაილი განზრახ არ არსებობს |

ინტერნეტს მხოლოდ ორი არასავალდებულო ღილაკი საჭიროებს:
„დისტანციური request" (`jsonplaceholder.typicode.com` — TTFB და Headers სავარჯიშოსთვის) და
„CORS ტესტი" (`example.com` — CORS შეცდომის სანახავად).

> **Timing-ის სავარჯიშოსთვის** ლოკალური request-ები ძალიან სწრაფია. გამოიყენეთ
> Network tab → throttling → **Slow 4G**, რომ waterfall ცხადად დაინახოთ.

## 🧩 რას აკეთებს აპლიკაცია

- **ფილტრი** — ძიება ტიკეტის თემით/კლიენტით + პრიორიტეტის ფილტრი
- **ტიკეტები** — ბარათები აგენტის მიბმით, დეტალებით და დახურვით
- **SLA ანგარიში** — დარღვეული/რისკის ზონაში, საშუალო პირველი პასუხი (მძიმე გამოთვლა)
- **API პანელი** — request-ები სხვადასხვა სტატუსით, დაშბორდის ჩატვირთვა, ცოცხალი ძიება, CORS ტესტი

## 🐛 პრობლემები

გვერდის ბოლოს **სიმპტომების პანელია** — 6 ბარათი, თითოეულზე მითითებულია
სავალდებულო ინსტრუმენტი და გამეორების ნაბიჯები. მიზეზი, ფაილი და ხაზი დავალების ნაწილია.

⚠️ **#2 სიმპტომი („ცოცხალი ძიება") ქსელს ავსებს** — ნახვის შემდეგ აუცილებლად გამორთეთ
ან გადატვირთეთ გვერდი.

დეტალური ინსტრუქცია და ჩასაბარებელი მასალები: `../README.md`

## 📁 სტრუქტურა

```
public/
  tickets.json                 → /tickets.json (200)
  agents.json                  → /agents.json (200)
  sla-targets.json             → /sla-targets.json (200)
src/
  main.jsx                     → entry point (StrictMode გამორთულია)
  App.jsx                      → state, ფილტრაცია და handler-ები
  App.css
  data.js                      → 12 ტიკეტი, აგენტები, პრიორიტეტები
  utils/
    api.js                     → loadJson, loadDashboard
    sla.js                     → computeSlaReport (მძიმე), filterTickets, formatMinutes
  components/
    FilterBar.jsx              → ძიება + პრიორიტეტი
    TicketList.jsx             → ბარათების grid
    TicketCard.jsx             → ცალკეული ტიკეტი (React.memo-ში გახვეული)
    SlaPanel.jsx               → SLA ანგარიში (ძვირი კომპონენტი)
    ApiPanel.jsx               → Network debugging პანელი
    SymptomPanel.jsx           → სიმპტომების სია (ეს ფაილი არ არის ბაგიანი)
```

## 🔬 რენდერების თვლა

ყოველ კომპონენტს აქვს ყვითელი badge `renders: N` (`useRef`-ით დათვლილი).
`main.jsx`-ში **StrictMode განზრახ გამორთულია**, რომ dev რეჟიმში ორმაგი რენდერი არ
დაამახინჯოს რიცხვები — ანგარიშში ჩაწერილი მაჩვენებლები ასე ზუსტად შეესაბამება ინტერაქციების რაოდენობას.

## 🛠 ტექნოლოგიები

- **React 18.3** — useState, useEffect, useRef, useMemo, React.memo
- **Vite 5.4** — dev server და build
- **CSS** — ჩვეულებრივი CSS, ფრეიმვორკების გარეშე

---

სასწავლო მიზნებისთვის — „ვებგვერდის ოპტიმიზაცია" კურსი
