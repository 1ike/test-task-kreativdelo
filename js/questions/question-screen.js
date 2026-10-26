import { createElement, createImage } from '../utils/dom.js';
import { createIcon } from '../utils/icons.js';
import { createScreen } from '../utils/screen.js';
import { removeForbiddenChars } from './utils.js';

function createPageNav(pages, onPageSelect) {
  const pageNav = createElement('nav', 'page-nav');
  pageNav.setAttribute('aria-label', 'Страницы задания');

  pages.forEach((page, index) => {
    const pageButton = createElement('button', 'page-nav__button', String(index + 1));

    pageButton.type = 'button';
    pageButton.disabled = !page.isUnlocked;
    pageButton.classList.toggle('page-nav__button--answered', page.isAnswered);
    pageButton.classList.toggle('page-nav__button--current', page.isCurrent);

    if (page.isCurrent) {
      pageButton.setAttribute('aria-current', 'page');
    }

    pageButton.addEventListener('click', () => onPageSelect(index));
    pageNav.append(pageButton);
  });

  return pageNav;
}

function createAnswerForm(answer, onAnswerSubmit) {
  const form = createElement('form', 'answer-form');
  const input = createElement('input', 'answer-form__input outlined-box');
  const submitButton = createElement('button', 'answer-form__submit outlined-box');
  const updateSubmitButton = () => {
    submitButton.disabled = !input.value.trim();
  };

  input.type = 'text';
  input.value = answer;
  input.autofocus = true;
  input.autocomplete = 'off';
  input.spellcheck = false;
  input.setAttribute('aria-label', 'Твой ответ');

  submitButton.type = 'submit';
  submitButton.setAttribute('aria-label', 'Ответить');
  submitButton.append(createIcon('check'));

  input.addEventListener('input', () => {
    removeForbiddenChars(input);
    updateSubmitButton();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    onAnswerSubmit(input.value);
  });

  updateSubmitButton();
  form.append(input, submitButton);
  return form;
}

export function createQuestionScreen({ question, taskText, answer, pages, onPageSelect, onAnswerSubmit, onRestart }) {
  const card = createElement('section', 'card card--question');
  const questionBody = createElement('div', 'question-body');

  questionBody.append(
    createElement('p', 'question-text', `${taskText}: ${question.answer}`),
    createAnswerForm(answer, onAnswerSubmit),
  );
  card.append(createImage(question.image, question.answer, 'question-image'), questionBody);

  return createScreen([createPageNav(pages, onPageSelect), card], onRestart);
}
