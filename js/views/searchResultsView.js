import * as helpers from '../helpers.js';
import { IMAGE_URL } from '../config.js';
import { sectionMovieDetails } from './movieView.js';

export const sectionResults = document.querySelector('.section-search-results');
// prettier-ignore
export const searchCardsContainer = document.querySelector('.search-card-container');
// prettier-ignore
export const searchResultsContainer = document.querySelector('.search-results-container');
// prettier-ignore
export const searchResultsHeading = document.querySelector('.search-results-heading');
// prettier-ignore
export const searchResultsErrorMessage = document.querySelector('.search-results-error')
export const quickViewContainer = document.querySelector(
  '.quick-view-container'
);
export const paginationContainer = document.querySelector(
  '.pagination-container'
);
const quickTitle = document.querySelector('.quick-heading');
const quickImg = document.querySelector('.quick-img');

/* -------------------------------------------------- SHOWING QUICK VIEW AND MORE DETAILS -------------------------------------------------- */

export const handlerShowQuickView = function (handler) {
  searchCardsContainer.addEventListener('click', function (e) {
    e.preventDefault();
    const linkClicked = e.target.closest('.search-card-quick');
    if (!linkClicked) return;

    const halfViewPort =
      window.pageYOffset + document.documentElement.clientHeight / 2;
    quickViewContainer.setAttribute(
      'style',
      `transform: translate(0, ${halfViewPort}px);`
    );

    const id = +linkClicked.closest('.search-card').id;
    handler(id);
  });
};

/* -------------------------------------------------- HIDING QUICK VIEW -------------------------------------------------- */

export const handlerHideQuickViewAndQuickToDetails = function (handler) {
  quickViewContainer.addEventListener('click', function (e) {
    const iconClicked = e.target.closest('.cross-icon');
    const quickTitle = e.target.closest('.quick-heading');
    const quickImg = e.target.closest('.quick-img');
    if (!iconClicked && !quickTitle && !quickImg) return;
    quickViewContainer.setAttribute('style', 'transform: translateX(-100%);');
    if (quickTitle || quickImg) {
      const id = +e.target.id;
      sectionMovieDetails.classList.remove('section-hide');
      helpers.scrollToSection(sectionMovieDetails);
      handler(id);
    }
  });
};

/* -------------------------------------------------- GENERATING MARKUP -------------------------------------------------- */

export const generateResultsMarkup = function (data) {
  return data
    .map(d => {
      return `
    <div class="search-card" id="${d.id}">
      <div class="card-container">
        <figure>
          <img src="${
            d.poster_path
              ? `${IMAGE_URL}${d.poster_path}`
              : '../images/blank.jpg'
          }" alt="Moie-poster" class="search-card-photo"/>
        </figure>
        <h4 class="search-card-movie-title">${
          d.title.length > 13 ? `${d.title.slice(0, 13)}...` : d.title
        }</h4>
        <a href="#" class="search-card-info search-card-quick">
          <i class="fas fa-info-circle"></i> Quick view
        </a>
        <a href="#" class="search-card-info search-card-details">
          <i class="fas fa-file-video"></i> More Details
        </a>
      </div>
    </div>
    `;
    })
    .join('');
};

export const generateQuickViewMarkup = function (data) {
  return `
        <i class="fas fa-times cross-icon"></i>
        <img src="${IMAGE_URL}${
    data.poster_path
  }"  alt="poster" class="quick-img" id="${data.id}"/>
        <div class="quick-view-wraper-container">
          <div class="quick-title-container">
            <h3 class="quick-heading" id="${data.id}">${
    data.title.length > 25 ? `${data.title.slice(0, 25)}...` : data.title
  }</h3>
            <span class="quick-hashtag">#${(data.title.length > 20
              ? `${data.title.slice(0, 20)}...`
              : data.title
            ).replaceAll(' ', '')}</span>
          </div>
          <div class="quick-synopsis quick-synopsis-1">
            ${
              data.overview.length > 200
                ? `${data.overview.slice(0, 200)}...`
                : data.overview
            }
          </div>
          <div class="quick-synopsis quick-synopsis-2">
            ${data.tagline ? data.tagline : `${data.overview.slice(0, 25)}...`}
          </div>
          <div class="quick-info-container">
            <p class="quick-release">📅 ${data.release_date.slice(0, 4)}</p>
            <p class="genre">🎞 ${(data.vote_count / 100).toFixed(1)}k votes</p>
            <p class="length">⏱ ${data.runtime} mins</p>
          </div>
        </div>
        <div class="quick-rating"><span>${
          data.vote_average
        } / 10 ⭐</span></div>
  `;
};
