import * as helpers from '../helpers.js';
import { IMAGE_URL, overlay } from '../config.js';
import { sectionMovieDetails } from './movieView.js';

export const bookmarks = document.querySelector('.bookmarks');
const bookmarkContainerWrapper = document.querySelector(
  '.full-bookmark-container-wrapper'
);
export const bookmarkContainer = document.querySelector(
  '.full-bookmark-container'
);
const bookmarkCancelButton = document.querySelector('.cross-bookmark');

const hideBookmarksEverything = function () {
  helpers.hideOverlay();
  bookmarkContainerWrapper.classList.remove('full-bookmark-show');
  bookmarkCancelButton.classList.add('icon-hide');
};

/* ---------------------------------------- VIEWING BOOKMARK CONTAINER ------------------------------ */

export const handlerBookmarkContainerOpen = function (handler) {
  bookmarks.addEventListener('click', function (e) {
    if (e.target.closest('.bookmark-more')) {
      helpers.scrollToSection(document.body);
      bookmarkContainerWrapper.classList.add('full-bookmark-show');
      helpers.activateOverlay();
      bookmarkCancelButton.classList.remove('icon-hide');
      handler();
    }
  });
};

/* ---------------------------------------- HIDING BOOKMARK CONTAINER ------------------------------ */

export const handlerBookmarkContainerClose = function () {
  bookmarkCancelButton.addEventListener('click', function () {
    hideBookmarksEverything();
  });
};

export const handlerHideOverlayBookmark = function () {
  overlay.addEventListener('click', function () {
    hideBookmarksEverything();
  });
};

/* ---------------------------------------- RENDERING BOOKMARK MOVIE ------------------------------ */

export const handlerRenderMiniBookmarkMovie = function (handler) {
  bookmarks.addEventListener('click', function (e) {
    if (e.target.closest('.no-bookmark')) return;
    const bookmarkClicked = e.target.closest('.bookmark');
    if (!bookmarkClicked.classList.contains('bookmark-more')) {
      const id = +bookmarkClicked.id;
      handler(id);
      sectionMovieDetails.classList.remove('section-hide');
      helpers.scrollToSection(sectionMovieDetails);
    }
  });
};

export const handlerRenderBookmarkMovie = function (handler) {
  bookmarkContainer.addEventListener('click', function (e) {
    const bookmarkClicked = e.target.closest('.full-bookmark');
    const id = +bookmarkClicked.id;
    handler(id);
    hideBookmarksEverything();
    sectionMovieDetails.classList.remove('section-hide');
    helpers.scrollToSection(sectionMovieDetails);
  });
};

/* ---------------------------------------- GENERATING BOOKMARKS MARKUP ------------------------------ */

export const generateBookmarkMarkup = function (data) {
  return `${data
    .map((d, i) => {
      if (i > 4) return;
      return ` 
    <div class="bookmark" id="${d.id}">
      <img
        src="${IMAGE_URL}${d.poster_path}"
        alt="poster"
        class="nav-bookmark-img"
      />
      <h3 class="nav-bookmark-title">${
        d.title.length > 8 ? `${d.title.slice(0, 8)}...` : d.title
      }</h3>
      <span class="nav-bookmark-rating">${d.vote_average}/10 ⭐</span>
    </div>
    `;
    })
    .join('')}${
    data.length > 5
      ? `<div class="bookmark bookmark-more"><i class="fas fa-tv"></i> View more...</div>`
      : ''
  }`;
};

export const generateBookmarkContainerMarkup = function (data) {
  return data
    .map(d => {
      return `
      <div class="full-bookmark" id="${d.id}">
        <img
          src="${IMAGE_URL}${d.poster_path}"
          alt="poster"
          class="full-bookmark-img"
        />
        <h3 class="full-bookmark-title">${
          d.title.length > 15 ? `${d.title.slice(0, 15)}...` : d.title
        }</h3>
        <span class="full-bookmark-rating">${d.vote_average}/10 ⭐</span>
      </div>
    `;
    })
    .join('');
};

export const generateNoBookmarkMarkup = function () {
  return `
  <div class="no-bookmark">
    <h6>
      No favourites yet. Find a good movie and add it to your
      favourites ;)
    </h6>
  </div>
  `;
};
