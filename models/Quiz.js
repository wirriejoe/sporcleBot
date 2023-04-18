const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [{
    question: { type: String, required: true },
    choices: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
  }],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;