import React, { useState } from 'react';
import QuizForm from './components/QuizForm';
import QuizDisplay from './components/QuizDisplay';
import PseudoNavbar from './components/PseudoNavbar';

const App = () => {
  const [quiz, setQuiz] = useState([]);

  return (
    <div className="">
      <PseudoNavbar />
      <div className='p-20 pt-0 '>
      <QuizForm setQuiz={setQuiz} />
      <QuizDisplay quiz={quiz} />
      </div>
    </div>
  );
};

export default App;
