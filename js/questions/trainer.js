import { normalizeAnswer, shuffleArray } from './utils.js';

export class Trainer {
  constructor(questions) {
    this.sourceQuestions = questions;
    this.restart();
  }

  restart() {
    this.questions = shuffleArray(this.sourceQuestions);
    this.answers = this.questions.map(() => '');
    this.currentIndex = 0;
    this.isFinished = false;
  }

  get currentQuestion() {
    return this.questions[this.currentIndex];
  }

  get currentAnswer() {
    return this.answers[this.currentIndex];
  }

  isPageUnlocked(index) {
    return index === 0 || this.answers[index - 1] !== '';
  }

  getPages() {
    return this.questions.map((question, index) => ({
      isCurrent: index === this.currentIndex,
      isAnswered: this.answers[index] !== '',
      isUnlocked: this.isPageUnlocked(index),
    }));
  }

  goToPage(index) {
    if (this.isPageUnlocked(index)) {
      this.currentIndex = index;
    }
  }

  submitAnswer(text) {
    const answer = text.trim();

    if (!answer) {
      return;
    }

    this.answers[this.currentIndex] = answer;

    if (this.currentIndex === this.questions.length - 1) {
      this.isFinished = true;
    } else {
      this.currentIndex += 1;
    }
  }

  getResults() {
    return this.questions.map((question, index) => ({
      question,
      answer: this.answers[index],
      isCorrect: normalizeAnswer(this.answers[index]) === normalizeAnswer(question.answer),
    }));
  }
}
