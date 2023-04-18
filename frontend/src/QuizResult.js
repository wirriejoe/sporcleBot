import React from 'react';

function QuizResult({ result}) {
    return (
    <div className="QuizResult">
    <h2>Quiz Result</h2>
    <p>Your score: {Math.round(result * 100)}%</p>
    {/* Implement logic for comparing the user's score with other users' scores /}
    {/ <p>You beat X% of users.</p> */}
    </div>
    );
    }
    
    export default QuizResult;
    
    