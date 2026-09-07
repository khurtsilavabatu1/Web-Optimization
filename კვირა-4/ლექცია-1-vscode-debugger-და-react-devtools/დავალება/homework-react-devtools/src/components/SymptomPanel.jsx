import { useState } from 'react'

const SYMPTOMS = [
  {
    id: 1,
    number: '#1',
    tool: 'Components tab',
    toolClass: 'tool-components',
    title: 'ერთი და იგივე ტრეკი პლეილისტში ორ მწკრივად ჩნდება',
    steps: [
      'დაამატეთ „Midnight Drive" პლეილისტში',
      'დააჭირეთ იმავე ტრეკს ხელახლა — უნდა გამოჩნდეს „x2", მაგრამ ჩნდება მეორე მწკრივი',
      'Components tab → PlaylistPanel → props → playlist — ნახეთ, რამდენი ობიექტია მასივში და რა id-ებით',
    ],
  },
  {
    id: 2,
    number: '#2',
    tool: 'State-ის ცოცხალი რედაქტირება',
    toolClass: 'tool-state-edit',
    title: 'ძიება მხოლოდ დიდი ასოებით მუშაობს',
    steps: [
      'ძიების ველში აკრიფეთ „Midnight" — ტრეკი იძებნება',
      'აკრიფეთ „midnight" (პატარა ასოთი) — „ტრეკი ვერ მოიძებნა"',
      'დაადასტურეთ Components tab-იდან: App → hooks → State → searchTerm-ის მნიშვნელობა შეცვალეთ ხელით',
    ],
  },
  {
    id: 3,
    number: '#3',
    tool: 'Components tab + Console',
    toolClass: 'tool-components',
    title: 'გახსნილი „დეტალები" სხვა ბარათზე გადახტება',
    steps: [
      'დააჭირეთ „დეტალები" მესამე ბარათზე („Paper Boats")',
      'პირველ ბარათზე („Midnight Drive") დააჭირეთ 🚫 — ის სიიდან ქრება',
      'დეტალები ახლა სულ სხვა ტრეკზეა გახსნილი, „Paper Boats"-ზე კი დახურულია',
      'Console-ში ნახეთ, რომელი TrackCard-ის unmount დაილოგა — წაშლილი თუ სხვა?',
    ],
  },
  {
    id: 4,
    number: '#4',
    tool: 'VS Code Debugger',
    toolClass: 'tool-vscode',
    title: 'ტრეკის ხანგრძლივობა არასწორად ჩანს',
    steps: [
      '„Midnight Drive" — 225 წამი — უნდა იყოს 3:45, ბარათზე კი 4:45 ჩანს',
      '„First Frost" — 129 წამი — უნდა იყოს 2:09, ჩანს 2:9',
      'ზოგიერთი ტრეკი შემთხვევით სწორია (მაგ. „Paper Boats" — 3:18) — ესეც მინიშნებაა',
      'ხანგრძლივობა წამებში ნახეთ ბარათის „დეტალები" ღილაკით',
    ],
  },
  {
    id: 5,
    number: '#5',
    tool: 'VS Code Debugger',
    toolClass: 'tool-vscode',
    title: 'ჯამური დრო არ იზრდება ტრეკის გამეორებაზე',
    steps: [
      '⚠️ ეს სიმპტომი მხოლოდ ბაგი #1-ის გასწორების შემდეგ ჩანს',
      'დაამატეთ ერთი ტრეკი 3-ჯერ — მწკრივზე ჩნდება „x3"',
      '„სულ: 3 ტრეკი" სწორია, ჯამური დრო კი ისეთივე რჩება, როგორც ერთ ტრეკზე',
    ],
  },
  {
    id: 6,
    number: '#6',
    tool: 'Profiler',
    toolClass: 'tool-profiler',
    title: 'აკრეფა ჭიანურდება — UI ყოვნდება ყოველ ასოზე',
    steps: [
      'ძიების ველში სწრაფად აკრიფეთ 5-6 ასო — ასოები დაგვიანებით ჩნდება',
      'Profiler → Record → აკრიფეთ 3 ასო → Stop',
      'Ranked view-ში ნახეთ, რომელი კომპონენტი ჭამს ყველაზე მეტ დროს',
      'ამ პუნქტში ბაგის გასწორება არ ითხოვება — საჭიროა დიაგნოზი და გაზომვა',
    ],
  },
]

export default function SymptomPanel() {
  const [isOpen, setIsOpen] = useState(true)
  const [openCard, setOpenCard] = useState(null)

  return (
    <section className="symptom-section">
      <div className="symptom-section-inner">
        <div className="symptom-panel-header" onClick={() => setIsOpen(!isOpen)}>
          <h3>სიმპტომების სია — 5 ბაგი + 1 წარმადობის პრობლემა</h3>
          <button className="panel-expand-btn">
            {isOpen ? 'დახურვა' : 'გახსნა'}
          </button>
        </div>

        {isOpen && (
          <div className="symptom-list">
            {SYMPTOMS.map(symptom => (
              <div className="symptom-card" key={symptom.id}>
                <div
                  className="symptom-card-header"
                  onClick={() => setOpenCard(openCard === symptom.id ? null : symptom.id)}
                >
                  <div className="symptom-title-row">
                    <span className="symptom-number">{symptom.number}</span>
                    <span className={`symptom-tool ${symptom.toolClass}`}>{symptom.tool}</span>
                    <button className="expand-btn">{openCard === symptom.id ? '▲' : '▼'}</button>
                  </div>
                  <div className="symptom-title">{symptom.title}</div>
                </div>

                {openCard === symptom.id && (
                  <div className="symptom-content">
                    <p className="symptom-description">როგორ გავიმეოროთ:</p>
                    <ol className="symptom-steps">
                      {symptom.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                    <p className="symptom-hint">
                      მიზეზი, ფაილი და ხაზი დავალების ნაწილია — იპოვეთ მითითებული ინსტრუმენტით,
                      არა კოდის თვალით კითხვით.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
