import { scrollToSection } from '../helpers.js';
import { sectionMovieDetails } from './movieView.js';
import {
  searchCardsContainer,
  sectionResults,
  searchResultsHeading,
  paginationContainer,
} from './searchResultsView.js';

const nav = document.querySelector('.nav');
const header = document.querySelector('.container');
const navHeight = nav.getBoundingClientRect().height;
const navigation = document.querySelector('.nav-btn-container');

/* ---------------------------------------- STICKY NAVIGATION ------------------------------ */

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

export const observeNavigation = function () {
  headerObserver.observe(header);
};

/* ---------------------------------------- HANDLING CLICK ON NAVIGATION ------------------------------ */

export const handlerNavigation = function (handler) {
  navigation.addEventListener('click', function (e) {
    const navBtn = e.target.closest('.nav-btn');
    if (!navBtn) return;
    sectionResults.classList.remove('section-hide');
    sectionMovieDetails.classList.add('section-hide');
    searchCardsContainer.innerHTML = '';
    paginationContainer.innerHTML = '';
    searchCardsContainer.classList.add('search-card-container-scroll');
    scrollToSection(sectionResults, false);
    const type = navBtn.dataset.type;
    searchResultsHeading.textContent = type
      .split('_')
      .map(a => a[0].toUpperCase() + a.slice(1))
      .join(' ');
    handler(type);
  });
};
