// src/ResultsScreen.js

function ResultsScreen({ score, totalQuestions, onRestart }) {
  return (
    <div className="results-screen">
      <h2>Quiz Finished!</h2>
      <p>You scored {score} out of {totalQuestions}.</p>
          <button onClick={onRestart} className="restart-btn">
        Restart Quiz
      </button>
    </div>
  );
}

export default ResultsScreen;