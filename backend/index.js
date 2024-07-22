const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;

const formatQuizResponse = (response) => {
  const text = response.candidates[0].content.parts[0].text;
  const quiz = [];
  const lines = text.split('\n');
  
  let currentQuestion = null;

  lines.forEach((line) => {
    // Detect start of a new question
    if (line.startsWith('**Question')) {
      if (currentQuestion) {
        quiz.push(currentQuestion);
      }
      currentQuestion = {
        question: line.replace('**Question:', '').replace(':', ':').trim(),
        options: [],
        answer: ''
      };
    } 
    // Detect answer key line
    else if (line.startsWith('**Answer:')) {
      if (currentQuestion) {
        currentQuestion.answer = line.replace('**Answer:', '').trim();
      }
    } 
    // Collect options
    else if (line.trim() && !line.startsWith('**Question:') && !line.startsWith('**Answer:')) {
      if (currentQuestion) {
        currentQuestion.options.push(line.trim());
      }
    }
  });

  // Push the last question to the quiz
  if (currentQuestion) {
    quiz.push(currentQuestion);
  }

  return quiz;
};

app.post('/generate-quiz', async (req, res) => {
  const { notes, numQuestions, difficulty } = req.body;

  const prompt = `Generate a multiple-choice quiz with ${numQuestions} ${difficulty} questions from the following notes: ${notes}. Format each question with multiple-choice answers and include an answer key. Use the format:\n\n Question [number]: [Question text]\nA: [Option A]\nB: [Option B]\nC: [Option C]\n **Answer:** [Correct Answer]\n\n`;

  try {
    const fetch = await import('node-fetch').then(mod => mod.default);

    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      }),
    });

    const data = await response.json();
    console.log(data); // Log the entire response

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts) {
      return res.status(500).json({ error: 'Invalid response from API' });
    }

    const quiz = formatQuizResponse(data);

    res.json({ quiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
