const express = require('express');
const router = express.Router();

const Quiz = require('../models/Quiz');

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new quiz
router.post('/', async (req, res) => {
  const quiz = new Quiz({
    title: req.body.title,
    questions: req.body.questions,
    difficulty: req.body.difficulty,
  });

  try {
    const newQuiz = await quiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;