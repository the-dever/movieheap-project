import * as helpers from '../helpers.js';
import { overlay } from '../config.js';
import {
  sectionResults,
  searchResultsHeading,
  searchCardsContainer,
} from './searchResultsView.js';
import { sectionMovieDetails } from './movieView.js';

const searchForm = document.querySelector('.search');
const input = document.querySelector('.search-field');
const sticky = document.querySelector('.sticky');
const btnSearch = document.querySelector('.btn-search');

const clearInput = function () {
  input.classList.remove('search-field-active');
  btnSearch.classList.remove('btn-search-active');
  input.value = '';
  input.blur();
};

/* ---------------------------------------- SLIDING DOWN THE SEARCH BAR ------------------------------ */

export const handlerSearchBarActive = function () {
  searchForm.addEventListener('click', function () {
    helpers.activateOverlay();
    input.classList.add('search-field-active');
    // if (document.documentElement.clientWidth < 642)
    // btnSearch.classList.add('btn-search-active');
    input.focus();
  });
};

/* ---------------------------------------- SUBMITTING THE FORM ------------------------------ */

export const handlerFormSubmit = function (handler) {
  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const query = input.value;
    clearInput();

    sectionMovieDetails.classList.add('section-hide');
    sectionResults.classList.remove('section-hide');
    searchCardsContainer.classList.remove('search-card-container-scroll');
    searchResultsHeading.textContent = 'Search Results';
    helpers.hideOverlay();
    helpers.scrollToSection(sectionResults);
    handler(query);
  });
};

/* ---------------------------------------- HIDING OVERLAY ------------------------------ */

export const handlerSearchRemove = function () {
  searchForm.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    helpers.hideOverlay();
    clearInput();
  });
};

export const handlerHideOverlaySearch = function () {
  overlay.addEventListener('click', function () {
    clearInput();
  });
};
