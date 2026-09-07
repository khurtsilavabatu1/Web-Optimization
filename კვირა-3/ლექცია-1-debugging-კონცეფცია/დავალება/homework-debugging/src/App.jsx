import HabitTracker from './components/HabitTracker'

function App() {
  return (
    <>
      <header className="bug-banner">
        <h1>დავალება: ეს აპლიკაცია 6 React-ის შეცდომას შეიცავს — იპოვეთ და გამოასწორეთ!</h1>
        <p>მარჯვნივ მხოლოდ <strong>სიმპტომებია</strong> — მიზეზი და ფაილი თავად უნდა აღმოაჩინოთ (Console, React DevTools, breakpoint-ები)</p>
      </header>

      <div className="container">
        <main className="app-panel">
          <HabitTracker />
        </main>

        <aside className="bug-panel">
          <h3>სიმპტომების სია</h3>
          <div className="bug-list">

            <div className="bug-card">
              <div className="bug-header">
                <span className="bug-number">#1</span>
                <span className="bug-type cleanup">სიმპტომი</span>
              </div>
              <p className="bug-hint">
                „ბოლო დამატებიდან" მთვლელი წამში <strong>2-ით</strong> იზრდება 1-ის ნაცვლად.
                ხოლო როცა ყველა ჩვევას წაშლით (badge ქრება), Console-ში <code>⏱ StreakBadge tick</code> მაინც აგრძელებს ბეჭდვას.
              </p>
            </div>

            <div className="bug-card">
              <div className="bug-header">
                <span className="bug-number">#2</span>
                <span className="bug-type state">სიმპტომი</span>
              </div>
              <p className="bug-hint">
                checkbox-ზე დაწკაპუნებაზე ჩვევა შესრულებულად <strong>არ აღინიშნება</strong> და 🔥 streak არ იზრდება.
                Console-ში შეცდომა არ ჩანს. ახალი ჩვევის დამატების შემდეგ ცვლილება უცებ „გამოჩნდება".
              </p>
            </div>

            <div className="bug-card">
              <div className="bug-header">
                <span className="bug-number">#3</span>
                <span className="bug-type effect">სიმპტომი</span>
              </div>
              <p className="bug-hint">
                ფილტრის ღილაკები („შესასრულებელი" / „შესრულებული") <strong>სიას არ ცვლიან</strong> —
                ღილაკი აქტიურად ინიშნება, მაგრამ სია იგივე რჩება სანამ ახალ ჩვევას არ დაამატებთ.
              </p>
            </div>

            <div className="bug-card">
              <div className="bug-header">
                <span className="bug-number">#4</span>
                <span className="bug-type closure">სიმპტომი</span>
              </div>
              <p className="bug-hint">
                დააჭირეთ „5 წამში წაშლა" ღილაკს და მაშინვე დაამატეთ 1-2 ახალი ჩვევა.
                5 წამის შემდეგ <strong>ახლად დამატებული ჩვევებიც ქრება</strong> — თითქოს დრო უკან დაბრუნდა.
              </p>
            </div>

            <div className="bug-card">
              <div className="bug-header">
                <span className="bug-number">#5</span>
                <span className="bug-type key">სიმპტომი</span>
              </div>
              <p className="bug-hint">
                დაამატეთ 3 ჩვევა, თითოეულს ჩაწერეთ სხვადასხვა „შენიშვნა", შემდეგ წაშალეთ პირველი —
                <strong> შენიშვნები არასწორ ჩვევებთან რჩება</strong> (ერთით ზემოთ ინაცვლებს).
              </p>
            </div>

            <div className="bug-card">
              <div className="bug-header">
                <span className="bug-number">#6</span>
                <span className="bug-type async">სიმპტომი</span>
              </div>
              <p className="bug-hint">
                სწრაფად დაამატეთ 3-4 ჩვევა ზედიზედ (Enter-ს ხშირად დააჭირეთ) —
                <strong>ნაწილი არ ჩნდება სიაში</strong>, თითქოს დაიკარგა.
              </p>
            </div>

          </div>
        </aside>
      </div>
    </>
  )
}

export default App
