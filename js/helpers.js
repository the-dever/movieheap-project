import { overlay } from './config.js';
import { sectionResults } from './views/searchResultsView.js';

export const hideOverlay = function () {
  overlay.classList.remove('overlay-active');
};

export const activateOverlay = function () {
  overlay.classList.add('overlay-active');
};

export const scrollToSection = function (section, fixed = true) {
  section.scrollIntoView({ behavior: 'smooth' });
  if (fixed) return;
  else {
    const yOffset = -100;
    const y =
      section.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

export const slideInCards = function (cards) {
  cards.forEach(card => {
    card.style.transform = 'translateX(0)';
  });
};

export const setLinearGradient = function (
  element,
  firstColor,
  secondColor,
  img = ''
) {
  element.style.background = `linear-gradient(to bottom right, ${firstColor}, ${secondColor}), url(${img})`;
};

export const render = function (parentEl, markup) {
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

export const randomize = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: Math.trunc(Math.abs()).toFixed().length,
});

export const randomArrIndex = function (arr) {
  let ran1 = randomize(0, arr.length - 1);
  let ran2 = randomize(0, arr.length - 1);
  let ran3 = randomize(0, arr.length - 1);
  if (ran1 === ran2 || ran2 === ran3) {
    ran1 = 0;
    ran2 = 5;
    ran3 = 10;
  }
  return [ran1, ran2, ran3];
};
