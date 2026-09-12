import { useState } from 'react'

const SYMPTOMS = [
  {
    id: 1,
    number: '#1',
    tool: 'Production build + Source Maps',
    toolClass: 'tool-sourcemap',
    title: 'შეკვეთის გახსნაზე გვერდი თეთრდება',
    steps: [
      'გაუშვით production build: npm run build && npm run preview',
      'დააჭირეთ „გახსნა" შეკვეთაზე ORD-1004',
      'გვერდი თეთრდება — Console-ში იპოვეთ შეცდომა და მისი stack trace',
      'ჩაწერეთ, რომელი ფაილი და ხაზი ჩანს stack trace-ში sourcemap: false-ის დროს',
      'შემდეგ ჩართეთ source maps და შეადარეთ იგივე stack trace',
    ],
  },
  {
    id: 2,
    number: '#2',
    tool: 'Production build + Source Maps',
    toolClass: 'tool-sourcemap',
    title: 'სხვა შეკვეთაზე — სხვა ავარია, გასაგები ტექსტით, გაუგებარი მისამართით',
    steps: [
      'იმავე production build-ზე დააჭირეთ „გახსნა" შეკვეთაზე ORD-1005',
      'Console-ში შეცდომის ტექსტი გასაგებია, stack trace კი — არა',
      'ჩაწერეთ, რა ინფორმაციას იძლევა stack trace source maps-ის გარეშე',
      'ჩართეთ source maps და იპოვეთ ზუსტი კომპონენტი და ხაზი',
    ],
  },
  {
    id: 3,
    number: '#3',
    tool: 'Console (dev vs prod)',
    toolClass: 'tool-build',
    title: 'გამაფრთხილებელი, რომელიც production-ში „ქრება"',
    steps: [
      'გაუშვით npm run dev და გახსენით Console — გვერდის ჩატვირთვისთანავე ჩანს ყვითელი გამაფრთხილებელი',
      'ჩაწერეთ მისი სრული ტექსტი და რომელ კომპონენტს ეხება',
      'გაუშვით npm run preview (production) და იგივე ნახეთ Console-ში',
      'ჩაწერეთ, რატომ აღარ ჩანს იგივე შეტყობინება',
    ],
  },
  {
    id: 4,
    number: '#4',
    tool: 'Production build + Source Maps',
    toolClass: 'tool-sourcemap',
    title: 'კუპონის კოდის აკრეფაზე აპლიკაცია ვარდება',
    steps: [
      'კუპონის ველში აკრიფეთ 4 ან მეტი სიმბოლო (მაგ. DESK20)',
      'აპლიკაცია ვარდება — dev რეჟიმში შეცდომის ტექსტი სრულად წერია',
      'production build-ზე იგივე გააკეთეთ — Console-ში „Minified React error #NNN" და ბმული',
      'ჩაწერეთ ნომერი, გადადით ბმულზე (error decoder) და შეადარეთ dev-ის ტექსტს',
      'source maps-ით იპოვეთ ზუსტი ფაილი და ხაზი, სადაც პრობლემაა',
    ],
  },
  {
    id: 5,
    number: '#5',
    tool: 'Console (dev vs prod)',
    toolClass: 'tool-build',
    title: 'გვერდის ჩატვირთვისთანავე Console-ში წითელი გამაფრთხილებელია',
    steps: [
      'npm run dev → Console — გვერდის გახსნისთანავე ჩანს შეტყობინება „Cannot update a component..."',
      'ჩაწერეთ, რომელი ორი კომპონენტი ასახელა React-მა',
      'production build-ზე ეს შეტყობინება არ ჩანს — მაგრამ პრობლემა გაქრა?',
      'იპოვეთ, რომელ კომპონენტში ხდება state-ის განახლება render-ის ფაზაში',
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
          <h3>სიმპტომების სია — 5 ბაგი, რომლებიც production build-ში უნდა იპოვოთ</h3>
          <button className="panel-expand-btn">{isOpen ? 'დახურვა' : 'გახსნა'}</button>
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
                      მთავარი წესი: ჯერ production build-ზე ნახეთ, რას ხედავს რეალური
                      მომხმარებელი, და მხოლოდ შემდეგ გამოიყენეთ source maps მიზეზის მოსაძებნად.
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
