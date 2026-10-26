import { createResultsScreen } from './results-screen.js';
import { clearResults, loadResults } from '../utils/results-storage.js';
import { showScreen } from '../utils/screen.js';

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
