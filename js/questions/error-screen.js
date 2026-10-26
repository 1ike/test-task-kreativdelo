import { createElement } from '../utils/dom.js';
import { createScreen } from '../utils/screen.js';

export function createErrorScreen(message, onRestart) {
  const card = createElement('section', 'card');
  card.append(createElement('p', 'question-text', message));
  return createScreen([card], onRestart);
}
