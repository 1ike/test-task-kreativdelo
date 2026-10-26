const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

const ICON_SHAPES = {
  check: {
    viewBox: '0 0 70 65.5',
    path: 'M29.21 64.42L0.52 25.2C0.22 24.8 0.27 24.24 0.63 23.89L13.68 11.3C14.11 10.88 14.82 10.94 15.18 11.43L28.71 29.92C29.1 30.46 29.91 30.46 30.31 29.93L52.39 0.8C52.73 0.36 53.36 0.27 53.8 0.61L69.21 12.39C69.65 12.73 69.73 13.36 69.4 13.79L30.81 64.43C30.41 64.97 29.6 64.96 29.21 64.42Z',
  },
  cross: {
    viewBox: '0 0 68.5 69',
    path: 'M17.86 35.68L0.67 53.79C0.3 54.19 0.31 54.81 0.69 55.19L13.77 68.27C14.17 68.67 14.82 68.66 15.21 68.26L32.8 49.73C33.19 49.33 33.83 49.32 34.23 49.71L53.29 68.31C53.68 68.69 54.31 68.69 54.7 68.3L67.79 55.21C68.18 54.82 68.18 54.18 67.79 53.79L49.7 35.7C49.31 35.31 49.31 34.68 49.69 34.29L67.82 15.7C68.2 15.31 68.2 14.69 67.83 14.3L54.71 0.73C54.32 0.33 53.68 0.32 53.28 0.72L34.21 19.79C33.82 20.18 33.18 20.18 32.79 19.79L15.18 2.18C14.8 1.8 14.19 1.79 13.79 2.16L0.73 14.32C0.33 14.7 0.3 15.33 0.68 15.73L17.86 34.31C18.22 34.7 18.22 35.3 17.86 35.68Z',
  },
};

export function createIcon(name, label) {
  const { viewBox, path } = ICON_SHAPES[name];
  const icon = document.createElementNS(SVG_NAMESPACE, 'svg');
  const iconPath = document.createElementNS(SVG_NAMESPACE, 'path');

  icon.setAttribute('class', `icon icon--${name}`);
  icon.setAttribute('viewBox', viewBox);

  if (label) {
    icon.setAttribute('role', 'img');
    icon.setAttribute('aria-label', label);
  } else {
    icon.setAttribute('aria-hidden', 'true');
  }

  iconPath.setAttribute('d', path);
  icon.append(iconPath);
  return icon;
}
