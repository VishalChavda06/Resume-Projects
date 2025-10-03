const Welcome = ({ onStart }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">Quiz App with Timer</h1>
        <div className="welcome-rules">
          <h2>Rules:</h2>
          <ul>
            <li>You have <strong>1 minute (60 seconds)</strong> total for all {10} questions</li>
            <li>Each question has a <strong>20-second limit</strong> - if you don't answer, the quiz ends immediately</li>
            <li>Use your time wisely - you must answer within 20 seconds or the game exits</li>
            <li>Click on the correct answer to proceed to the next question immediately</li>
            <li>If total time runs out, the quiz will end automatically</li>
            <li>Your score will be calculated at the end</li>
            <li>Good luck!</li>
          </ul>
        </div>
        <button className="start-button" onClick={onStart}>
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Welcome;
