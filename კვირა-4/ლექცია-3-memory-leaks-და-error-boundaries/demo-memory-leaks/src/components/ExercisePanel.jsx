import { useState } from 'react';

const exercises = [
  {
    id: 1,
    title: 'Heap Snapshot-ის გადაღება',
    description: 'გახსენი DevTools → Memory → Heap Snapshot და გადაიღე snapshot.',
    steps: [
      'გახსენი Chrome DevTools (Cmd+Option+I)',
      'გადადი Memory ტაბზე',
      'აირჩიე "Heap snapshot"',
      'დააჭირე "Take snapshot" ღილაკს',
      'დააკვირდი Total size და Number of objects-ს',
    ],
    hint: 'Heap snapshot გვიჩვენებს ყველა JS ობიექტს მეხსიერებაში კონკრეტულ მომენტში.',
  },
  {
    id: 2,
    title: 'Interval Leak-ის აღმოჩენა',
    description: 'გაუშვი Interval Leak რამდენჯერმე, გადაიღე snapshot-ები და იპოვე leak.',
    steps: [
      'გადაიღე პირველი Heap Snapshot (baseline)',
      'დააჭირე "დაიწყე ახალი Interval"-ს 5-ჯერ',
      'გადაიღე მეორე Snapshot',
      'დააჭირე "გააჩერე ყველა"-ს',
      'გადაიღე მესამე Snapshot',
      'შეადარე Snapshot-ები — რამდენი მეხსიერება გაათავისუფლა?',
    ],
    hint: 'Comparison view-ში დაინახავ Delta-ს — დადებითი ნიშნავს leak-ს.',
  },
  {
    id: 3,
    title: 'Detached DOM-ის პოვნა',
    description: 'იპოვე Detached DOM nodes Heap Snapshot-ში.',
    steps: [
      'დააჭირე "შექმენი Detached Node"-ს რამდენჯერმე',
      'გადაიღე Heap Snapshot',
      'Summary view-ში მოძებნე "Detached"',
      'გაფართოვდა Detached HTMLDivElement-ები',
      'დააკვირდი Retained Size-ს — ეს არის leak!',
    ],
    hint: 'Detached DOM nodes არის ელემენტები რომლებიც წაიშალა DOM-იდან, მაგრამ კვლავ მეხსიერებაშია.',
  },
  {
    id: 4,
    title: 'Allocation Timeline-ის გამოყენება',
    description: 'გამოიყენე Allocation instrumentation on timeline რეალურ დროში leak-ის დასანახად.',
    steps: [
      'DevTools → Memory → "Allocation instrumentation on timeline"',
      'დაიწყე Recording',
      'გაუშვი "Growing Data Leak"',
      'დააკვირდი როგორ იზრდება ლურჯი ზოლები (allocations)',
      'შეაჩერე leak და შეაჩერე recording',
      'ნაცრისფერი ზოლები ნიშნავს გათავისუფლებულ მეხსიერებას',
    ],
    hint: 'თუ ლურჯი ზოლები რჩება (არ ხდება ნაცრისფერი), ეს leak-ია!',
  },
];

export default function ExercisePanel() {
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [expandedExercise, setExpandedExercise] = useState(null);

  const toggleExercise = (id) => {
    setExpandedExercise(expandedExercise === id ? null : id);
  };

  const toggleComplete = (id) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedExercises(newCompleted);
  };

  const progress = Math.round((completedExercises.size / exercises.length) * 100);

  return (
    <div className="exercise-panel">
      <div className="exercise-header">
        <h3>პრაქტიკული დავალებები</h3>
        <div className="exercise-progress">
          <div className="exercise-progress-bar">
            <div
              className="exercise-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="exercise-progress-text">
            {completedExercises.size} / {exercises.length}
          </span>
        </div>
      </div>

      <div className="exercise-list">
        {exercises.map((exercise) => {
          const isExpanded = expandedExercise === exercise.id;
          const isCompleted = completedExercises.has(exercise.id);

          return (
            <div
              key={exercise.id}
              className={`exercise-card ${isCompleted ? 'completed' : ''}`}
            >
              <div className="exercise-card-header">
                <div className="exercise-title-row">
                  <input
                    type="checkbox"
                    className="exercise-checkbox"
                    checked={isCompleted}
                    onChange={() => toggleComplete(exercise.id)}
                  />
                  <h4 className="exercise-title">
                    {exercise.id}. {exercise.title}
                  </h4>
                  <button
                    className="exercise-toggle"
                    onClick={() => toggleExercise(exercise.id)}
                  >
                    {isExpanded ? '−' : '+'}
                  </button>
                </div>
                <p className="exercise-description">{exercise.description}</p>
              </div>

              {isExpanded && (
                <div className="exercise-content">
                  <div className="exercise-steps">
                    <strong>ნაბიჯები:</strong>
                    <ol>
                      {exercise.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  <div className="exercise-hint">
                    <strong>💡 Hint:</strong> {exercise.hint}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
