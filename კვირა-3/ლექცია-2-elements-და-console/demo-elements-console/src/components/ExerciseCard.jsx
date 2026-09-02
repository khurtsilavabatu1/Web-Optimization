function ExerciseCard({ exercise, onVerify }) {
  const difficultyColors = {
    'მარტივი': 'success',
    'საშუალო': 'warning',
    'რთული': 'danger'
  };

  return (
    <div
      className={`exercise-card ${exercise.verified ? 'verified' : ''}`}
      data-exercise-id={exercise.id}
      data-difficulty={exercise.difficulty}
    >
      <div className="exercise-header">
        <h3 className="exercise-title">{exercise.title}</h3>
        <span className={`difficulty-badge ${difficultyColors[exercise.difficulty]}`}>
          {exercise.difficulty}
        </span>
      </div>

      <p className="exercise-description">{exercise.description}</p>

      <div className="exercise-instructions">
        <h4 className="instructions-title">ნაბიჯები:</h4>
        <ol className="instructions-list">
          {exercise.instructions.map((instruction, index) => (
            <li key={index} className="instruction-item">
              {instruction}
            </li>
          ))}
        </ol>
      </div>

      <div className="exercise-footer">
        <button
          className={`verify-btn ${exercise.verified ? 'verified' : ''}`}
          onClick={onVerify}
        >
          {exercise.verified ? '✓ შესრულებული' : 'მონიშვნა შესრულებულად'}
        </button>
        {exercise.verified && (
          <span className="verified-indicator">✓</span>
        )}
      </div>
    </div>
  );
}

export default ExerciseCard;
