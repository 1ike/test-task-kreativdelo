import { Trainer } from './trainer.js';
import { clearResults, saveResults } from './results-storage.js';
import { createErrorScreen, createQuestionScreen, showScreen } from './views.js';

const DATA_URL = 'data/trainer.json';
const ANSWERS_PAGE_URL = 'pages/answers.html';

async function loadTrainerData() {
  const response = await fetch(DATA_URL);

  if (!response.ok) {
    throw new Error(`Не удалось загрузить ${DATA_URL}: ${response.status}`);
  }

  const { taskText, questions } = await response.json();

  // абсолютные адреса картинок нужны, чтобы таблица ответов из pages/ их нашла
  return {
    taskText,
    questions: questions.map((question) => ({ ...question, image: new URL(question.image, location.href).href })),
  };
}

function startTrainer({ taskText, questions }) {
  const trainer = new Trainer(questions);

  const renderTrainer = () => {
    if (trainer.isFinished) {
      saveResults(trainer.getResults());
      location.assign(ANSWERS_PAGE_URL);
      return;
    }

    showScreen(createQuestionScreen({
      question: trainer.currentQuestion,
      taskText,
      answer: trainer.currentAnswer,
      pages: trainer.getPages(),
      onPageSelect: selectPage,
      onAnswerSubmit: submitAnswer,
      onRestart: restartTrainer,
    }));
  };

  const restartTrainer = () => {
    trainer.restart();
    renderTrainer();
  };

  const selectPage = (index) => {
    trainer.goToPage(index);
    renderTrainer();
  };

  const submitAnswer = (text) => {
    trainer.submitAnswer(text);
    renderTrainer();
  };

  renderTrainer();
}

document.querySelector('.launch-hint').remove();
clearResults();

loadTrainerData()
  .then(startTrainer)
  .catch((error) => {
    console.error(error);
    showScreen(createErrorScreen('Не удалось загрузить тренажёр. Попробуй обновить страницу.', () => location.reload()));
  });
