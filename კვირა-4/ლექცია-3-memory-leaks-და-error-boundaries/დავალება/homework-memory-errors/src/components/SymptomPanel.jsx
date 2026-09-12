import { useState } from 'react'

const SYMPTOMS = [
  {
    id: 1,
    number: '#1',
    tool: 'Performance Monitor',
    toolClass: 'tool-perfmon',
    title: 'Event Listeners-ის რაოდენობა მუდმივად იზრდება',
    steps: [
      'გახსენით Performance Monitor (Cmd+Shift+P → „Performance Monitor") და ჩაწერეთ საწყისი რიცხვები',
      'ჩართეთ „ფანჯრის ზომა" ვიჯეტი',
      'შეცვალეთ ბრაუზერის ფანჯრის ზომა 5-6-ჯერ',
      'დააკვირდით „Event Listeners" მრიცხველს და ვიჯეტის „დაფიქსირებული მოვლენა" ციფრს',
      'გამორთეთ ვიჯეტი — Event Listeners-ის რიცხვი დაბრუნდა საწყისზე?',
    ],
  },
  {
    id: 2,
    number: '#2',
    tool: 'Console + Performance Monitor',
    toolClass: 'tool-console',
    title: 'ტაიმერი მუშაობს ვიჯეტის გამორთვის შემდეგაც',
    steps: [
      'ჩართეთ „სერვერის მონიტორი" — Console-ში ყოველ წამს ჩნდება „⏱ tick"',
      'გამორთეთ ვიჯეტი და დააკვირდით Console-ს — ლოგები ჩერდება?',
      'ჩართეთ/გამორთეთ ვიჯეტი 5-ჯერ, შემდეგ ჩართეთ და დააკვირდით „tick" მრიცხველს',
      'ჩაწერეთ, რამდენად სწრაფად იზრდება tick (1 წამში რამდენით)',
    ],
  },
  {
    id: 3,
    number: '#3',
    tool: 'Console',
    toolClass: 'tool-console',
    title: 'პანელი სხვა სერვერის მონაცემებს აჩვენებს',
    steps: [
      'ჩართეთ „სერვერის მონიტორი"',
      'აირჩიეთ srv-1 (ნელი, 2000 ms) და მაშინვე გადართეთ srv-2-ზე (სწრაფი, 400 ms)',
      'დაელოდეთ 3 წამი და შეადარეთ: „არჩეულია" და „ნაჩვენები მონაცემები" ერთი და იგივეა?',
      'Console-ში ნახეთ „📡 მეტრიკის მოთხოვნა" და „📥 მიღებული მონაცემები" ლოგების თანმიმდევრობა',
    ],
  },
  {
    id: 4,
    number: '#4',
    tool: 'Performance Monitor → JS Heap',
    toolClass: 'tool-memory',
    title: 'JS Heap Size უწყვეტად იზრდება',
    steps: [
      'Performance Monitor-ში ჩაწერეთ JS Heap Size',
      'ჩართეთ „ლაივ ლოგი" და დაელოდეთ 30 წამი',
      'ჩაწერეთ JS Heap Size ყოველ 10 წამში და დააკვირდით „ბუფერი: N" ციფრს',
      'გამორთეთ ვიჯეტი, დააჭირეთ Memory tab-ში „Collect garbage" (🗑) — მეხსიერება დაბრუნდა?',
    ],
  },
  {
    id: 5,
    number: '#5',
    tool: 'Heap Snapshot (Detached DOM)',
    toolClass: 'tool-memory',
    title: 'DOM Nodes-ის რაოდენობა იზრდება, თუმცა ეკრანზე ერთი და იგივე გრაფიკია',
    steps: [
      'Performance Monitor-ში ჩაწერეთ DOM Nodes',
      'ჩართეთ „ტრაფიკის გრაფიკი" და დაელოდეთ 20 წამი — ეკრანზე ყოველთვის 40 ზოლია',
      'დააკვირდით DOM Nodes-ს: რამდენით იზრდება 10 წამში?',
      'Memory tab → Take Heap Snapshot → ფილტრში აკრიფეთ „Detached" — რას ხედავთ?',
    ],
  },
  {
    id: 6,
    number: '#6',
    tool: 'Error Boundary',
    toolClass: 'tool-boundary',
    title: 'render-ის შეცდომაზე მთელი გვერდი თეთრდება',
    steps: [
      'ინციდენტების პანელში დააჭირეთ „💥 render-ის შეცდომა"',
      'ეკრანი თეთრდება — მთელი კონსოლი ქრება, თუმცა ErrorBoundary პროექტში არსებობს',
      'Console-ში ნახეთ, დაილოგა თუ არა „🚨 ErrorBoundary" — და მაინც რატომ თეთრდება ეკრანი?',
      'გადატვირთეთ გვერდი და სცადეთ დანარჩენი ორი ღილაკი — ისინი სხვანაირად იქცევიან',
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
          <h3>სიმპტომების სია — 5 memory leak + 1 Error Boundary</h3>
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
