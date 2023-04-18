const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuizSchema = new Schema({
  quizID: { type: String, required: true, unique: true },
  quizName: { type: String, required: true },
  quizDifficulty: { type: String, required: true }
});

module.exports = Quiz = mongoose.model('Quiz', QuizSchema);
