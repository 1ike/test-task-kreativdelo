import { createElement } from './dom.js';
import { createIcon } from './icons.js';

export function createScreen(content, onRestart) {
  const screen = createElement('main', 'screen');
  const restartButton = createElement('button', 'restart-button');

  restartButton.type = 'button';
  restartButton.setAttribute('aria-label', 'Начать заново');
  restartButton.append(createIcon('cross'));
  restartButton.addEventListener('click', onRestart);

  screen.append(...content, restartButton);
  return screen;
}

export function showScreen(screen) {
  document.body.replaceChildren(screen);
  screen.querySelector('[autofocus]')?.focus();
}
