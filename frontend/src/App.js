import './App.css';
import QuizComponent from './QuizComponent';
import QuizSelection from './QuizSelection';
import QuizResult from './QuizResult';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    // Fetch quizzes from the API
    const fetchQuizzes = async () => {
      const response = await axios.get('/api/quizzes');
      setQuizzes(response.data);
    };
    fetchQuizzes();
  }, []);

  // Handle quiz selection
  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
  };

  // Handle quiz completion
  const handleQuizComplete = (result) => {
    setQuizResult(result);
    setSelectedQuiz(null);
  };

  return (
    <div className="App">
      {selectedQuiz ? (
        <QuizComponent quiz={selectedQuiz} onComplete={handleQuizComplete} />
      ) : (
        <QuizSelection quizzes={quizzes} onSelect={handleQuizSelect} />
      )}
      {quizResult && <QuizResult result={quizResult} />}
    </div>
  );
}

export default App;