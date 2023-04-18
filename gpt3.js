const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateQuiz() {
  const prompt = `Generate a 10-question multiple-choice geography quiz with 4 answer choices per question. Each question should have only one correct answer. Return in JSON format of questions, choices, and correct answers.`;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: prompt}]
  });

  const contentStr = response.data.choices[0].message.content;
  const regex = /"question": "([^"]+)",\n\s+"choices": \[\n\s+"([^"]+)",\n\s+"([^"]+)",\n\s+"([^"]+)",\n\s+"([^"]+)"\n\s+\],\n\s+"answer": "([^"]+)"/g;
  const quiz = { questions: [] };
  let match;

  while ((match = regex.exec(contentStr)) !== null) {
    const question = match[1];
    const choiceA = match[2];
    const choiceB = match[3];
    const choiceC = match[4];
    const choiceD = match[5];
    const correctAnswer = match[6];

    quiz.questions.push({
      question: question,
      choices: {
        A: choiceA,
        B: choiceB,
        C: choiceC,
        D: choiceD,
      },
      answer: correctAnswer,
    });
  }

  console.log(quiz)
  return quiz;
}

module.exports = {
  generateQuiz,
};