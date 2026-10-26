const RESULTS_STORAGE_KEY = 'trainer-results';

export function saveResults(results) {
  sessionStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(results));
}

export function loadResults() {
  return JSON.parse(sessionStorage.getItem(RESULTS_STORAGE_KEY));
}

export function clearResults() {
  sessionStorage.removeItem(RESULTS_STORAGE_KEY);
}
