export function createElement(tagName, className, textContent) {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (textContent !== undefined) {
    element.textContent = textContent;
  }

  return element;
}

export function createImage(src, alt, className) {
  const image = createElement('img', className);
  image.src = src;
  image.alt = alt;
  image.draggable = false;
  return image;
}
