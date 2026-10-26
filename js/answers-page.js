import { clearResults, loadResults } from './results-storage.js';
import { createResultsScreen, showScreen } from './views.js';

const QUESTIONS_PAGE_URL = '../index.html';

function restartTrainer() {
  clearResults();
  location.assign(QUESTIONS_PAGE_URL);
}

const results = loadResults();

if (results) {
  showScreen(createResultsScreen(results, restartTrainer));
} else {
  location.replace(QUESTIONS_PAGE_URL);
}
