import React from 'react';

function QuizSelection({ quizzes, onSelect }) {
  return (
    <div className="QuizSelection">
      <h2>Select a quiz</h2>
      <ul>
        {quizzes.map((quiz, index) => (
          <li key={index} onClick={() => onSelect(quiz)}>
            {quiz.title} ({quiz.difficulty})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizSelection;