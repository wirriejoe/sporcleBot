const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { generateQuiz } = require('./gpt3');
const Quiz = require('./models/Quiz');
const Question = require('./models/Questions');

require('dotenv').config();
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.get('/api/quizzes', async (req, res) => {
  try {
    // Generate 1 quiz using GPT-3
    const generatedQuizzes = [];
    const quiz = await generateQuiz();
    generatedQuizzes.push(quiz);

    // Save quiz to the database
    const newQuiz = new Quiz({
      quizID: Date.now(),
      quizName: 'Geography Quiz',
      quizDifficulty: 'Medium',
    });
    await newQuiz.save();

    console.log(generatedQuizzes);
    // Save questions to the database
    const questions = [];
    for (let i = 1; i <= 10; i++) {
      console.log(generatedQuizzes[0][`question ${i}`]);
      console.log(generatedQuizzes[0][`choices ${i}`]);
      console.log(generatedQuizzes[0][`answer ${i}`]);
      const question = {
        questionID: newQuiz.quizID + '-' + i,
        quizID: newQuiz.quizID,
        question: generatedQuizzes[0][`question ${i}`],
        choices: generatedQuizzes[0][`choices ${i}`],
        correctAnswer: generatedQuizzes[0][`answer ${i}`],
      };
      questions.push(question);
    }

    await Question.insertMany(questions);

    // Retrieve all quizzes and questions from the database
    const quizzes = await Quiz.find();
    const allQuestions = await Question.find();
    res.json({ quizzes, allQuestions });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }    
});

// Start server
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));
