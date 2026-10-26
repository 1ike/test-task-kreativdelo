const FORBIDDEN_CHARS_PATTERN = /[^а-яё -]/gi;

export function shuffleArray(items) {
  const shuffledItems = [...items];

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledItems[index], shuffledItems[randomIndex]] = [shuffledItems[randomIndex], shuffledItems[index]];
  }

  return shuffledItems;
}

export function normalizeAnswer(text) {
  return text.trim().toLowerCase();
}

export function removeForbiddenChars(input) {
  const { value, selectionStart } = input;
  const allowedValue = value.replace(FORBIDDEN_CHARS_PATTERN, '');

  if (allowedValue === value) {
    return;
  }

  const caretPosition = value.slice(0, selectionStart).replace(FORBIDDEN_CHARS_PATTERN, '').length;
  input.value = allowedValue;
  input.setSelectionRange(caretPosition, caretPosition);
}
