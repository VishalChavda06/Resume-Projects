import { useState, useEffect } from 'react';

const Question = ({ question, options, correct, onAnswer, isAnswered, selectedAnswer }) => {
  const [clickedOption, setClickedOption] = useState(null);

  // Reset clicked option when question changes
  useEffect(() => {
    setClickedOption(null);
  }, [question]);

  const handleOptionClick = (index) => {
    if (isAnswered) return;
    
    setClickedOption(index);
    onAnswer(index);
  };

  const getOptionClass = (index) => {
    let baseClass = 'option';
    
    if (isAnswered) {
      if (index === correct) {
        return `${baseClass} correct`;
      }
      if (index === selectedAnswer && index !== correct) {
        return `${baseClass} wrong`;
      }
      return `${baseClass} disabled`;
    }
    
    if (clickedOption === index) {
      return `${baseClass} selected`;
    }
    
    return baseClass;
  };

  return (
    <div className="question-container">
      <h2 className="question-text">{question}</h2>
      <div className="options-container">
        {options.map((option, index) => (
          <button
            key={index}
            className={getOptionClass(index)}
            onClick={() => handleOptionClick(index)}
            disabled={isAnswered}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
