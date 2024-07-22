import React, { useState } from 'react';
import axios from 'axios';

const QuizForm = ({ setQuiz }) => {
  const [notes, setNotes] = useState('');
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState('easy');
  const [loading, setLoading] = useState(false);

  const handleGenerateQuiz = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://notes-to-mcq.vercel.app/generate-quiz', {
        notes,
        numQuestions,
        difficulty
      });
      setQuiz(response.data.quiz);
    } catch (error) {
      console.error('Error generating quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-6 p-6 bg-[#d8d5dd] rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-700">Generate Your Quiz</h2>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Paste topic or notes from which you want to give a quiz(Eg:Java Oops Concepts)..."
        className="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="6"
      />
      <div className="flex items-center mb-4">
        <label className="mr-2 text-lg font-semibold">Number of Questions:</label>
        <select
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
      <div className="flex items-center mb-4">
        <label className="mr-2 text-lg font-semibold">Difficulty:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button
        onClick={handleGenerateQuiz}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform hover:scale-105 duration-300"
      >
        Generate Quiz
      </button>
      {loading && (
        <div className="mt-4 text-center text-blue-500 animate-pulse">
          This uses Gemini, it may take 10-15 seconds to load. Please wait...
        </div>
      )}
    </div>
  );
};

export default QuizForm;
