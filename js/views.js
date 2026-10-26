import { createIcon } from './icons.js';

const FORBIDDEN_CHARS_PATTERN = /[^а-яё -]/gi;
const VOWEL_SPLIT_PATTERN = /([аеёиоуыэюя])/i;
const RESULTS_HEADERS = ['#', 'Картинка', 'Правильный ответ', 'Твой ответ', 'Результат'];

function createElement(tagName, className, textContent) {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (textContent !== undefined) {
    element.textContent = textContent;
  }

  return element;
}

function createImage(src, alt, className) {
  const image = createElement('img', className);
  image.src = src;
  image.alt = alt;
  image.draggable = false;
  return image;
}

function createScreen(content, onRestart) {
  const screen = createElement('main', 'screen');
  const restartButton = createElement('button', 'restart-button');

  restartButton.type = 'button';
  restartButton.setAttribute('aria-label', 'Начать заново');
  restartButton.append(createIcon('cross'));
  restartButton.addEventListener('click', onRestart);

  screen.append(...content, restartButton);
  return screen;
}

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

function removeForbiddenChars(input) {
  const { value, selectionStart } = input;
  const allowedValue = value.replace(FORBIDDEN_CHARS_PATTERN, '');

  if (allowedValue === value) {
    return;
  }

  const caretPosition = value.slice(0, selectionStart).replace(FORBIDDEN_CHARS_PATTERN, '').length;
  input.value = allowedValue;
  input.setSelectionRange(caretPosition, caretPosition);
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

function createCellWithVowels(tagName, text) {
  const cell = document.createElement(tagName);

  // split с группой захвата возвращает гласные на нечётных позициях
  text.split(VOWEL_SPLIT_PATTERN).forEach((part, index) => {
    cell.append(index % 2 ? createElement('span', 'vowel', part) : part);
  });

  return cell;
}

function createResultRow({ question, answer, isCorrect }, index) {
  const row = document.createElement('tr');
  const imageCell = document.createElement('td');
  const resultCell = document.createElement('td');

  imageCell.append(createImage(question.image, question.answer, 'results-table__image'));
  resultCell.append(isCorrect ? createIcon('check', 'Верно') : createIcon('cross', 'Неверно'));

  row.append(
    createElement('td', '', String(index + 1)),
    imageCell,
    createCellWithVowels('td', question.answer),
    createCellWithVowels('td', answer),
    resultCell,
  );
  return row;
}

export function createResultsScreen(results, onRestart) {
  const card = createElement('section', 'card card--results');
  const table = createElement('table', 'results-table');
  const headerRow = document.createElement('tr');
  const tableHead = document.createElement('thead');
  const tableBody = document.createElement('tbody');

  headerRow.append(...RESULTS_HEADERS.map((header) => createCellWithVowels('th', header)));
  tableHead.append(headerRow);
  tableBody.append(...results.map(createResultRow));
  table.append(tableHead, tableBody);
  card.append(table);

  return createScreen([card], onRestart);
}

export function showScreen(screen) {
  document.body.replaceChildren(screen);
  screen.querySelector('[autofocus]')?.focus();
}

export function createErrorScreen(message, onRestart) {
  const card = createElement('section', 'card');
  card.append(createElement('p', 'question-text', message));
  return createScreen([card], onRestart);
}
