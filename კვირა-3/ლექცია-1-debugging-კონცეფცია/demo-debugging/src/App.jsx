
import BugTracker from './components/BugTracker'

function App() {
  return (
    <>
      <header className="bug-banner">
        <h1>ეს აპლიკაცია 6 React-ის შეცდომას შეიცავს — იპოვეთ და გამოასწორეთ!</h1>
        <p>გამოიყენეთ React DevTools და Console თითოეული ბაგის დასადებაგებლად</p>
      </header>

      <div className="container">
        <main className="app-panel">
          <BugTracker />
        </main>

        <aside className="bug-panel">
          <h3>შეცდომების სია</h3>
          <div className="bug-list">

            <div className="bug-card">
              <div className="bug-header">
                <span className="bug-number">#1</span>
                <span className="bug-type cleanup">Missing Cleanup</span>
              </div>
              <p className="bug-hint">
                „ბოლო დამატებიდან" მთვლელი წამში <strong>2-ით</strong> იზრდება 1-ის ნაცვლად, ხოლო ყველა დავალების წაშლის შემდეგ interval მაინც აგრძელებს მუშაობას — <strong>memory leak</strong>.
                <code>useEffect</code>-ს cleanup function აკლია (<code>TimerBadge.jsx</code>).
              </p>
            </div>

            <div className="bug-card">
              <div className="bug-header">
                <span className="bug-number">#2</span>
                <span className="bug-type state">State Mutation</span>
              </div>
              <p className="bug-hint">
                დავალების შესრულებული სტატუსის შეცვლა არ იმუშავებს! checkbox-ზე დაწკაპუნებაზე არაფერი ხდება და Console-ში შეცდომაც არ ჩანს.
                <strong> State-ის პირდაპირ მუტაცია ხდება</strong> — React ვერ ამჩნევს ცვლილებას. Array-ს ახალი კოპია უნდა შექმნათ.
              </p>
            </div>

            <div className="bug-card">
              <div className="bug-header">
                <span className="bug-number">#3</span>
                <span className="bug-type effect">useEffect Dependency</span>
              </div>
              <p className="bug-hint">
                ფილტრის ღილაკებზე დაწკაპუნებისას დავალებების სია არ იცვლება — განახლდება მხოლოდ მაშინ, როცა ახალ დავალებას დაამატებთ.
                <code>useEffect</code>-ს <strong>dependency array-ში ცვლადი აკლია</strong>.
              </p>
            </div>

            <div className="bug-card">
              <div className="bug-header">
                <span className="bug-number">#4</span>
                <span className="bug-type closure">Stale Closure</span>
              </div>
              <p className="bug-hint">
                დააჭირეთ „3 წამში წაშლა" ღილაკს, შემდეგ სწრაფად დაამატეთ ახალი დავალება. 3 წამის შემდეგ ახალი დავალება გაქრება!
                <code>setTimeout</code> <strong>ძველ state-ს იყენებს (stale closure)</strong>.
              </p>
            </div>

            <div className="bug-card">
              <div className="bug-header">
                <span className="bug-number">#5</span>
                <span className="bug-type key">Wrong Key Prop</span>
              </div>
              <p className="bug-hint">
                დაამატეთ რამდენიმე დავალება, თითოეულს ჩაწერეთ სხვადასხვა „შენიშვნა", შემდეგ წაშალეთ პირველი — შენიშვნები არასწორ დავალებებზე დარჩება!
                <strong>Array index როგორც <code>key</code></strong> გამოიყენება (<code>TaskList.jsx</code>).
              </p>
            </div>

            <div className="bug-card">
              <div className="bug-header">
                <span className="bug-number">#6</span>
                <span className="bug-type async">Async Race Condition</span>
              </div>
              <p className="bug-hint">
                სწრაფად დაამატეთ რამდენიმე დავალება ზედიზედ. ზოგიერთი „გაქრება"!
                API სიმულაცია (setTimeout) <strong>ძველ state-ს იყენებს async callback-ში</strong> — race condition.
              </p>
            </div>

          </div>
        </aside>
      </div>
    </>
  )
}

export default App
