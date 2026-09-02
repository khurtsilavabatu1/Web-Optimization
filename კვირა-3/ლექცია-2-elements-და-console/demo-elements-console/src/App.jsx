import { useState } from 'react'
import Playground from './components/Playground'
import ExerciseCard from './components/ExerciseCard'
import DemoSection from './components/DemoSection'
import StyleExplorer from './components/StyleExplorer'

function App() {
  const [exercises, setExercises] = useState([
    {
      id: 1,
      title: '1. React DOM-ის დათვალიერება',
      description: 'გახსენით Elements panel და იპოვეთ როგორ გარდაიქმნება React კომპონენტები HTML-ად. მაგალითად, იპოვეთ "Playground" კომპონენტის DOM სტრუქტურა და შეცვალეთ რომელიმე ელემენტის background-color CSS-ში.',
      instructions: [
        'გახსენით DevTools (Cmd/Ctrl + Option/Alt + I)',
        'Elements panel-ში იპოვეთ <div class="playground"> ელემენტი',
        'Styles tab-ში შეცვალეთ --playground-bg ფერი',
        'დააკვირდით როგორ იცვლება კომპონენტი რეალურ დროში'
      ],
      verified: false,
      difficulty: 'მარტივი'
    },
    {
      id: 2,
      title: '2. ფარული ელემენტის მოძებნა',
      description: 'გვერდზე დამალულია საიდუმლო შეტყობინება display: none CSS კლასით. იპოვეთ ის Elements panel-ში, წაშალეთ "hidden" კლასი და წაიკითხეთ შეტყობინება.',
      instructions: [
        'Elements panel-ში მოძებნეთ class="secret-message" ელემენტი',
        'დააკვირდით რომ ელემენტი DOM-ში არსებობს, მაგრამ არ ჩანს',
        'წაშალეთ "hidden" კლასი ან გამორთეთ display: none',
        'წაიკითხეთ ფარული შეტყობინება'
      ],
      verified: false,
      difficulty: 'მარტივი'
    },
    {
      id: 3,
      title: '3. Console Methods პრაქტიკა',
      description: 'Console-ში გამოიყენეთ სხვადასხვა console მეთოდები window.appState ობიექტის შესასწავლად: console.log(), console.table(), console.group(), console.dir().',
      instructions: [
        'გახსენით Console panel',
        'ჩაწერეთ: console.table(window.appState.users)',
        'ჩაწერეთ: console.table(window.appState.tasks)',
        'ჩაწერეთ: console.dir(window.appState.settings)',
        'ჩაწერეთ: window.helpers.calculateTaskStats()'
      ],
      verified: false,
      difficulty: 'საშუალო'
    },
    {
      id: 4,
      title: '4. React State Console-დან',
      description: 'React DevTools-ის გამოყენებით ($r) მიიღეთ წვდომა კომპონენტის state-თან. გახსენით React DevTools, აირჩიეთ კომპონენტი და Console-ში ჩაწერეთ $r.state.',
      instructions: [
        'დააინსტალირეთ React DevTools extension (თუ არ გაქვთ)',
        'გახსენით React DevTools tab',
        'აირჩიეთ <Playground> კომპონენტი',
        'Console-ში ჩაწერეთ: $r',
        'დაათვალიერეთ კომპონენტის props და state'
      ],
      verified: false,
      difficulty: 'რთული'
    },
    {
      id: 5,
      title: '5. DOM Manipulation Console-დან',
      description: 'გამოიყენეთ $0, $$(), document.querySelector() React-ის დარენდერებულ DOM-ზე. პრაქტიკა: მონიშნეთ ელემენტი Elements panel-ში და მანიპულირება გაუკეთეთ Console-დან.',
      instructions: [
        'Elements panel-ში მონიშნეთ რომელიმე სათაური (h2 ელემენტი)',
        'Console-ში ჩაწერეთ: $0.textContent = "შეცვლილი სათაური"',
        'ჩაწერეთ: $$(".exercise-card").length',
        'ჩაწერეთ: $$(".exercise-card").forEach(el => el.style.border = "2px solid red")',
        'გადატვირთეთ გვერდი რომ დაბრუნდეს საწყის მდგომარეობაში'
      ],
      verified: false,
      difficulty: 'საშუალო'
    },
    {
      id: 6,
      title: '6. Event Monitoring',
      description: 'გამოიყენეთ monitorEvents() რომ დააკვირდეთ მოვლენებს ინტერაქტიულ ელემენტებზე. მაგალითად, დააკვირდით ღილაკზე click event-ებს.',
      instructions: [
        'Elements panel-ში აირჩიეთ "ინტერაქციის ტესტი" ღილაკი',
        'Console-ში ჩაწერეთ: monitorEvents($0, "click")',
        'დააჭირეთ ღილაკს რამდენჯერმე',
        'დააკვირდით Console-ში event-ის დეტალებს',
        'გათიშეთ მონიტორინგი: unmonitorEvents($0)'
      ],
      verified: false,
      difficulty: 'საშუალო'
    }
  ]);

  const toggleVerify = (id) => {
    setExercises(exercises.map(ex =>
      ex.id === id ? { ...ex, verified: !ex.verified } : ex
    ));
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">DevTools Playground</h1>
          <p className="app-subtitle">React Edition — Elements & Console პანელების პრაქტიკა</p>
        </div>
      </header>

      <main className="app-main">
        {/* Interactive Playground Section */}
        <Playground />

        {/* Style Explorer Section */}
        <StyleExplorer />

        {/* Demo Section for Manipulation */}
        <DemoSection />

        {/* Hidden Secret Message */}
        <div className="secret-message hidden" data-secret="true">
          🎉 გილოცავთ! იპოვეთ ფარული შეტყობინება! Elements panel-ში წაშალეთ "hidden" კლასი ან გამორთეთ display: none რომ ეს წაიკითხოთ.
        </div>

        {/* Exercises Section */}
        <section className="exercises-section">
          <h2 className="section-title">სავარჯიშოები</h2>
          <div className="exercises-grid">
            {exercises.map(exercise => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onVerify={() => toggleVerify(exercise.id)}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>DevTools Playground — Web Optimization კურსი, კვირა 3, ლექცია 2</p>
      </footer>
    </div>
  )
}

export default App
