const Result = ({ score, totalQuestions, onRetry, onBackToStart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getMessage = () => {
    if (percentage >= 90) return "Excellent! 🎉";
    if (percentage >= 70) return "Great job! 👏";
    if (percentage >= 50) return "Good effort! 👍";
    return "Keep practicing! 💪";
  };

  const getScoreColor = () => {
    if (percentage >= 70) return "#4CAF50";
    if (percentage >= 50) return "#FF9800";
    return "#F44336";
  };

  return (
    <div className="result-container">
      <div className="result-content">
        <h1 className="result-title">Quiz Complete!</h1>
        
        <div className="score-display">
          <div 
            className="score-circle"
            style={{ '--score-color': getScoreColor() }}
          >
            <span className="score-percentage">{percentage}%</span>
          </div>
          <p className="score-text">
            You scored <strong>{score}</strong> out of <strong>{totalQuestions}</strong>
          </p>
          <p className="score-message">{getMessage()}</p>
        </div>

        <div className="result-actions">
          <button className="retry-button" onClick={onRetry}>
            Retry Quiz
          </button>
          <button className="back-button" onClick={onBackToStart}>
            Back to Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
