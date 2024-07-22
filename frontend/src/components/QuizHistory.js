import React from 'react';

const QuizHistory = ({ history }) => {
  return (
    <div>
      <h2>Quiz History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuizHistory;
