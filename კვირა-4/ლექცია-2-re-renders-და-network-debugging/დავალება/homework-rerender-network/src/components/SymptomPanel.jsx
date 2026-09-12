import { useState } from 'react'

const SYMPTOMS = [
  {
    id: 1,
    number: '#1',
    tool: 'Network tab',
    toolClass: 'tool-network',
    title: 'შეცდომიანი request „წარმატებად" ჩანს',
    steps: [
      'API პანელში დააჭირეთ „არქივის ჩატვირთვა"',
      'ინტერფეისზე ჩნდება მწვანე „წარმატება", თუმცა ჩანაწერების რაოდენობა 0-ია',
      'Network tab (ფილტრი: Fetch/XHR) — ნახეთ, რა სტატუსით დაბრუნდა ეს request',
      'ჩაწერეთ, რა წერია Status-ში და რა ჩანს გვერდზე',
    ],
  },
  {
    id: 2,
    number: '#2',
    tool: 'Network tab',
    toolClass: 'tool-network',
    title: 'request-ები არ ჩერდება — „ცოცხალი ძიება" ქსელს ავსებს',
    steps: [
      'გახსენით Network tab (ფილტრი: Fetch/XHR) და გაასუფთავეთ სია',
      'API პანელში დააჭირეთ „ცოცხალი ძიების ჩართვა" — ველში არაფერი აკრიფოთ',
      'დააკვირდით მრიცხველს „გაგზავნილი request-ები" და Network tab-ს',
      '⚠️ სიმპტომის ნახვის შემდეგ გამორთეთ ცოცხალი ძიება (ან გადატვირთეთ გვერდი)',
    ],
  },
  {
    id: 3,
    number: '#3',
    tool: 'Network tab → Timing',
    toolClass: 'tool-network',
    title: 'დაშბორდი 3-ჯერ ნელა იტვირთება, ვიდრე საჭიროა',
    steps: [
      'Network tab → throttling ჩამოსაშლელში აირჩიეთ „Slow 4G"',
      'დააჭირეთ „დაშბორდი (3 request)"',
      'დააკვირდით waterfall-ს: request-ები ერთმანეთის შემდეგ იწყება თუ ერთდროულად?',
      'ჩაწერეთ ჯამური დრო და თითოეული request-ის დრო',
    ],
  },
  {
    id: 4,
    number: '#4',
    tool: 'Profiler',
    toolClass: 'tool-profiler',
    title: 'React.memo დადებულია, მაგრამ ბარათები მაინც რენდერდება',
    steps: [
      'გადატვირთეთ გვერდი და დააკვირდით TicketCard-ების badge-ებს (renders: 1)',
      'ფილტრის ველში აკრიფეთ 5 ასო — badge-ები იზრდება, თუმცა ტიკეტები არ შეცვლილა',
      'Profiler → Settings → „Record why each component rendered while profiling"',
      'Record → 3 ასო → Stop → დააჭირეთ TicketCard-ს და წაიკითხეთ „Why did this render?"',
    ],
  },
  {
    id: 5,
    number: '#5',
    tool: 'Profiler → Ranked',
    toolClass: 'tool-profiler',
    title: 'აკრეფა ჭიანურდება — ყოველ ასოზე ~20-30 ms იკარგება',
    steps: [
      'აკრიფეთ ფილტრის ველში სწრაფად 6-7 ასო — ასოები დაგვიანებით ჩნდება',
      'Profiler → Record → 3 ასო → Stop → Ranked view',
      'ნახეთ, რომელი კომპონენტი ჭამს დროის ყველაზე დიდ ნაწილს',
      'Console-ში ნახეთ, რამდენჯერ დაილოგა „computeSlaReport გაშვებულია"',
    ],
  },
  {
    id: 6,
    number: '#6',
    tool: 'Components tab',
    toolClass: 'tool-components',
    title: 'ძიება არ მუშაობს, თუმცა searchTerm იცვლება',
    steps: [
      'ფილტრის ველში აკრიფეთ „ნინო" — სია არ იფილტრება, „ნაპოვნია" არ იცვლება',
      'Components → App → hooks → searchTerm — მნიშვნელობა სწორად იცვლება',
      'ახლა შეცვალეთ პრიორიტეტის ფილტრი — ძიება მოულოდნელად „ამუშავდება"',
      'დაასკვნეთ: პრობლემა ფილტრაციის ლოგიკაშია თუ იმაში, როდის ითვლება ის ხელახლა?',
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
          <h3>სიმპტომების სია — 3 ქსელის და 3 რენდერის პრობლემა</h3>
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
