import React, { useState, useEffect } from 'react';
import classNames from 'classnames'; // Optional: For conditional class management

const QuizDisplay = ({ quiz }) => {
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(quiz.length).fill(null));
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Reset state when quiz data changes
    if (quiz.length > 0) {
      setSelectedAnswers(new Array(quiz.length).fill(null));
      setScore(0);
    }
  }, [quiz]);

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    if (selectedAnswers[questionIndex] === null) {
      const correctOptionIndex = quiz[questionIndex]?.options.findIndex(option => option.startsWith(quiz[questionIndex]?.answer.replace('** ', '')));
      const newSelectedAnswers = [...selectedAnswers];
      newSelectedAnswers[questionIndex] = optionIndex;
      setSelectedAnswers(newSelectedAnswers);

      // Update score based on correct option
      calculateScore(newSelectedAnswers);
    }
  };

  const calculateScore = (answers) => {
    const newScore = answers.reduce((acc, option, index) => {
      const correctOptionIndex = quiz[index]?.options.findIndex(option => option.startsWith(quiz[index]?.answer.replace('** ', '')));
      return acc + (option === correctOptionIndex ? 1 : 0);
    }, 0);
    setScore(newScore);
  };

  const cleanText = (text) => {
    return text.replace(/\*\*/g, '').trim();
  };

  return (
    <div className="mt-6 p-6 bg-[#d8d5dd] rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-center text-pink-700">Generated Quiz</h2>
      <p className="mb-4 text-xl text-center text-gray-700">Total Score: {score} / {quiz.length}</p>
      {quiz.length === 0 ? (
        <p className="text-center text-red-800">No quiz available. Please check the input or try again later.</p>
      ) : (
        quiz.map((item, index) => {
          const correctOptionIndex = item.options.findIndex(option => option.startsWith(item.answer.replace('** ', '')));

          return (
            <div
              key={index}
              className="mb-6 p-4 border rounded-lg shadow-md bg-white transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
            >
              <div className="font-bold text-xl mb-2 text-gray-800">
                {cleanText(item.question)}
              </div>
              {item.options.length > 0 ? (
                <ul className="list-none pl-0 mb-2">
                  {item.options.map((option, i) => (
                    <li key={i} className="mb-1">
                      <label className={classNames(
                        'flex items-center p-2 rounded-lg transition-colors duration-300',
                        { 'bg-green-200 border-green-400': selectedAnswers[index] === i && i === correctOptionIndex },
                        { 'bg-red-200 border-red-400': selectedAnswers[index] === i && i !== correctOptionIndex },
                        { 'bg-gray-200 hover:bg-gray-300': selectedAnswers[index] !== i }
                      )}>
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={selectedAnswers[index] === i}
                          onChange={() => handleAnswerSelect(index, i)}
                          disabled={selectedAnswers[index] !== null}
                        />
                        {cleanText(option)}
                      </label>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No options available for this question.</p>
              )}
              {selectedAnswers[index] !== null && (
                <p className={`mt-2 text-lg font-semibold ${selectedAnswers[index] === correctOptionIndex ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedAnswers[index] === correctOptionIndex ? 'Correct Answer' : 'Incorrect Answer'}
                </p>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default QuizDisplay;
