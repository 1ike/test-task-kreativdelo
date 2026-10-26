import { createElement, createImage } from '../utils/dom.js';
import { createIcon } from '../utils/icons.js';
import { createScreen } from '../utils/screen.js';

const VOWEL_SPLIT_PATTERN = /([аеёиоуыэюя])/i;
const RESULTS_HEADERS = ['#', 'Картинка', 'Правильный ответ', 'Твой ответ', 'Результат'];

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
