import { useState } from 'react';

const EXERCISES = [
  {
    id: 1,
    number: '#1',
    type: 'Line Breakpoint',
    typeClass: 'line-breakpoint',
    title: 'ხაზზე Breakpoint-ის დაყენება',
    description: 'ისწავლეთ როგორ დავაყენოთ ხაზზე breakpoint და როგორ დავაკვირდეთ ცვლადების მნიშვნელობებს.',
    steps: [
      'გახსენით DevTools → Sources ტაბი',
      'იპოვეთ ProductCard.jsx ფაილი და handleAddToCart ფუნქცია',
      'დააჭირეთ ხაზის ნომერს console.log-ის გვერდით — breakpoint დაიყენება (ლურჯი მარკერი)',
      'დაამატეთ ნებისმიერი პროდუქტი კალათაში — კოდი შეჩერდება breakpoint-ზე',
      'Scope პანელში ნახეთ product და quantity ცვლადების მნიშვნელობები',
      'დააჭირეთ Step Over (F10) — შემდეგ ხაზზე გადავიდეთ',
      'დააჭირეთ Resume (F8) — გაგრძელდება შესრულება',
    ],
    hint: 'Breakpoint-ი აჩერებს კოდის შესრულებას იმ ხაზზე, სანამ ის შესრულდება. ეს საშუალებას გვაძლევს დავინახოთ რა მდგომარეობაშია პროგრამა იმ კონკრეტულ მომენტში.'
  },
  {
    id: 2,
    number: '#2',
    type: 'Conditional Breakpoint',
    typeClass: 'conditional',
    title: 'პირობითი Breakpoint — რაოდენობა > 5',
    description: 'ვისწავლოთ როგორ დავაყენოთ breakpoint რომელიც მხოლოდ გარკვეულ პირობაში გააქტიურდება.',
    steps: [
      'იპოვეთ CartItem.jsx ფაილში handleIncrease ფუნქცია',
      'მარჯვენა კლიკით დააჭირეთ ხაზის ნომერს → "Add conditional breakpoint"',
      'პირობად ჩაწერეთ: item.quantity > 5',
      'კალათაში დაამატეთ პროდუქტი და რაოდენობა გაზარდეთ 6-მდე',
      'Breakpoint გააქტიურდება მხოლოდ მაშინ, როცა რაოდენობა 5-ზე მეტი გახდება',
      'Watch პანელში დაამატეთ item.quantity და დააკვირდეთ როგორ იცვლება',
    ],
    hint: 'Conditional Breakpoint-ი სასარგებლოა როცა გვინდა შევაჩეროთ კოდი მხოლოდ კონკრეტულ პირობაში, მაგ: დიდი მასივის კონკრეტულ ელემენტზე.'
  },
  {
    id: 3,
    number: '#3',
    type: 'Debug Bug',
    typeClass: 'debug-bug',
    title: 'იპოვეთ ფასდაკლების ბაგი',
    description: 'ფასდაკლების კოდი არასწორად მუშაობს. გამოიყენეთ breakpoint-ები და იპოვეთ შეცდომა.',
    steps: [
      'შეიყვანეთ ფასდაკლების კოდი: SAVE20 (უნდა მოგცეთ 20% ფასდაკლება)',
      'დააკვირდეთ ჯამს — ფასდაკლება ძალიან დიდია ან უარყოფითი რიცხვიც კია',
      'გახსენით calculations.js → applyDiscount ფუნქცია',
      'დააყენეთ breakpoint იმ ხაზზე სადაც discount გამოითვლება',
      'Step Into (F11) გამოიყენეთ და დააკვირდეთ discountPercent და discount მნიშვნელობებს',
      'იპოვეთ შეცდომა: პროცენტი როგორც მთელი რიცხვი გამოიყენება (20) ნაცვლად 0.20-ისა',
      'გამოასწორეთ: შეცვალეთ "subtotal - discountPercent" → "subtotal * (discountPercent / 100)"',
    ],
    hint: 'Step Into საშუალებას გაძლევთ შეხვიდეთ ფუნქციის შიგნით და დაინახოთ თითოეული ხაზის შესრულება.'
  },
  {
    id: 4,
    number: '#4',
    type: 'DOM Breakpoint',
    typeClass: 'dom-breakpoint',
    title: 'DOM-ის ცვლილებაზე Breakpoint',
    description: 'ისწავლეთ როგორ დავაყენოთ breakpoint DOM ელემენტის ცვლილებაზე.',
    steps: [
      'გახსენით DevTools → Elements ტაბი',
      'იპოვეთ div#cart-items ელემენტი (კალათის ელემენტების კონტეინერი)',
      'მარჯვენა კლიკით → Break on → Subtree modifications',
      'დაამატეთ ან წაშალეთ პროდუქტი კალათიდან',
      'Debugger გააქტიურდება იმ კოდზე, რომელიც ცვლის DOM-ს',
      'Call Stack-ში ნახეთ რომელმა ფუნქციამ გამოიწვია ეს ცვლილება',
    ],
    hint: 'DOM Breakpoint-ები სასარგებლოა როცა გვინდა ვიცოდეთ რომელი კოდი ცვლის HTML-ს, განსაკუთრებით დიდ აპლიკაციებში.'
  },
  {
    id: 5,
    number: '#5',
    type: 'Async Debugging',
    typeClass: 'async-debug',
    title: 'Async ბაგის გამოსწორება',
    description: 'შეკვეთის დამუშავება წარუმატებლად სრულდება. იპოვეთ async/await ბაგი.',
    steps: [
      'დაამატეთ რამდენიმე პროდუქტი და დააჭირეთ "შეკვეთის გაფორმება"',
      'დააკვირდეთ: alert მაშინვე ჩნდება, მაგრამ console.log აჩვენებს რომ async ოპერაცია ჯერ გრძელდება',
      'გახსენით Checkout.jsx → handleCheckout ფუნქცია',
      'დააყენეთ breakpoint processCheckout გამოძახებაზე',
      'დააკვირდეთ: ფუნქცია Promise-ს აბრუნებს, მაგრამ კოდი არ ელოდება მის დასრულებას',
      'იპოვეთ პრობლემა: await ბრძანება აკლია processCheckout-ის წინ',
      'გამოასწორეთ: შეცვალეთ handleCheckout async ფუნქციად და დაამატეთ await',
      'დააყენეთ breakpoint alert-ის ხაზზეც და დარწმუნდით რომ ახლა async ოპერაცია ჯერ სრულდება',
    ],
    hint: 'Async debugging-ისთვის გაითვალისწინეთ Call Stack-ი და დააკვირდეთ Promise-ების მდგომარეობებს Scope პანელში.'
  }
];

function ExerciseCard({ exercise }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="exercise-card">
      <div className="exercise-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="exercise-title-row">
          <span className="exercise-number">{exercise.number}</span>
          <span className={`exercise-type ${exercise.typeClass}`}>{exercise.type}</span>
          <button className="expand-btn" aria-expanded={isExpanded}>
            {isExpanded ? '▼' : '▶'}
          </button>
        </div>
        <h4 className="exercise-title">{exercise.title}</h4>
      </div>

      {isExpanded && (
        <div className="exercise-content">
          <p className="exercise-description">{exercise.description}</p>

          <div className="exercise-steps">
            <h5>ნაბიჯები:</h5>
            <ol>
              {exercise.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="exercise-hint">
            <strong>💡 მინიშნება:</strong> {exercise.hint}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExercisePanel() {
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);

  return (
    <section className="exercise-section">
      <div className="exercise-section-inner">
        <div className="exercise-panel-header" onClick={() => setIsPanelExpanded(!isPanelExpanded)}>
          <h3>🐛 Debugging სავარჯიშოები — Breakpoints პრაქტიკა</h3>
          <button className="panel-expand-btn" aria-expanded={isPanelExpanded}>
            {isPanelExpanded ? 'დამალვა ▲' : 'გაშლა ▼'}
          </button>
        </div>

        {isPanelExpanded && (
          <div className="exercise-list">
            {EXERCISES.map(exercise => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
