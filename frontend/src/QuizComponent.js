import React, { useState } from 'react';

function QuizComponent({ quiz, onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleAnswerClick = (choice) => {
    const isCorrect = choice === quiz.questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }
    if (currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(correctAnswers / quiz.questions.length);
    }
  };

  return (
    <div className="QuizComponent">
      <h2>{quiz.title}</h2>
      <p>{quiz.questions[currentQuestionIndex].question}</p>
      {quiz.questions[currentQuestionIndex].choices.map((choice, index) => (
        <button key={index} onClick={() => handleAnswerClick(choice)}>
          {choice}
        </button>
      ))}
    </div>
  );
}

export default QuizComponent;
