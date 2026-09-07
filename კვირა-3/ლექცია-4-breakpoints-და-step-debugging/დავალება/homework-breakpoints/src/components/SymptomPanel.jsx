import { useState } from 'react';

const SYMPTOMS = [
  {
    id: 1,
    number: '#1',
    type: 'ქვეჯამი',
    typeClass: 'line-breakpoint',
    title: 'ერთი კერძი ანგარიშში არ ჯამდება',
    steps: [
      'დაამატეთ მხოლოდ ერთი კერძი — ქვეჯამი 0.00 ₾ რჩება',
      'დაამატეთ მეორე კერძიც — ქვეჯამში მხოლოდ მეორე ჩანს',
      'ანგარიშის სიაში კერძი ჩანს, მაგრამ ჯამში არა',
    ],
  },
  {
    id: 2,
    number: '#2',
    type: 'რაოდენობა',
    typeClass: 'debug-bug',
    title: '„+" ღილაკი რაოდენობას 1-დან 11-ზე ხტუნავს',
    steps: [
      'მენიუში ნებისმიერ კერძზე დააჭირეთ „+"',
      'რაოდენობა 2-ის ნაცვლად 11 ხდება, შემდეგ 111',
      '„−" ღილაკი კი სწორად მუშაობს — რაოდენობა მცირდება',
    ],
  },
  {
    id: 3,
    number: '#3',
    type: 'წაშლა',
    typeClass: 'conditional',
    title: 'ანგარიშიდან კერძის წაშლა არ მუშაობს',
    steps: [
      'დაამატეთ 2-3 კერძი ანგარიშში',
      'დააჭირეთ „×" ღილაკს — არაფერი იცვლება',
      'Console-ში შეცდომა არ ჩანს',
    ],
  },
  {
    id: 4,
    number: '#4',
    type: 'დახურვა',
    typeClass: 'async-debug',
    title: 'ცარიელ ანგარიშზე დახურვის ღილაკი „ჩაკიდულია"',
    steps: [
      'ცარიელი ანგარიშით დააჭირეთ „ანგარიშის დახურვა"',
      'ღილაკი „დამუშავება..." რეჟიმში რჩება და აღარ მუშაობს',
      'Console-ში წითელი შეცდომა ჩნდება',
    ],
  },
  {
    id: 5,
    number: '#5',
    type: 'მომსახურება',
    typeClass: 'dom-breakpoint',
    title: 'მომსახურების საფასური თეთრებს კარგავს',
    steps: [
      'დაამატეთ კერძები ისე, რომ ქვეჯამი მაგ. 45.00 ₾ იყოს',
      'აირჩიეთ მომსახურება 15% — უნდა იყოს 6.75 ₾, მაგრამ ჩანს 6.00 ₾',
      'შეამოწმეთ სხვა პროცენტებზეც — თეთრები ყოველთვის იკარგება',
    ],
  },
];

export default function SymptomPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [openCard, setOpenCard] = useState(null);

  return (
    <section className="exercise-section">
      <div className="exercise-section-inner">
        <div className="exercise-panel-header" onClick={() => setIsOpen(!isOpen)}>
          <h3>სიმპტომების სია — 5 ბაგი უნდა იპოვოთ</h3>
          <button className="panel-expand-btn">
            {isOpen ? 'დახურვა' : 'გახსნა'}
          </button>
        </div>

        {isOpen && (
          <div className="exercise-list">
            {SYMPTOMS.map(symptom => (
              <div className="exercise-card" key={symptom.id}>
                <div
                  className="exercise-header"
                  onClick={() => setOpenCard(openCard === symptom.id ? null : symptom.id)}
                >
                  <div className="exercise-title-row">
                    <span className="exercise-number">{symptom.number}</span>
                    <span className={`exercise-type ${symptom.typeClass}`}>{symptom.type}</span>
                    <button className="expand-btn">{openCard === symptom.id ? '▲' : '▼'}</button>
                  </div>
                  <div className="exercise-title">{symptom.title}</div>
                </div>

                {openCard === symptom.id && (
                  <div className="exercise-content">
                    <p className="exercise-description">როგორ გავიმეოროთ:</p>
                    <ol className="exercise-steps">
                      {symptom.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                    <p className="exercise-hint">
                      მიზეზი და ფაილი დავალების ნაწილია — იპოვეთ breakpoint-ებით, არა კოდის თვალით კითხვით.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
