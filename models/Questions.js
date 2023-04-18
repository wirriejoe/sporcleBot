const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new Schema({
  questionID: { type: String, required: true },
  quizID: { type: Number, required: true },
  question: { type: String, required: true },
  choices: { type: Map, of: String, required: true },
  correctAnswer: { type: String, required: true }
});

module.exports = Question = mongoose.model('Question', QuestionSchema);