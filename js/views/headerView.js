import { IMAGE_URL } from '../config.js';
import { sectionMovieDetails } from './movieView.js';
import * as helpers from '../helpers.js';
import { sectionResults } from './searchResultsView.js';

const headerImageContainer = document.querySelectorAll('.header-img-container');
export const headerImageContainer1 = document.querySelector(
  '.header-img-container-1'
);
export const headerImageContainer2 = document.querySelector(
  '.header-img-container-2'
);
export const headerImageContainer3 = document.querySelector(
  '.header-img-container-3'
);

export const handlerLoadHomeImage = function (handler) {
  headerImageContainer.forEach(hic => {
    hic.addEventListener('click', function (e) {
      const btnClicked = e.target.closest('.btn-header-img');
      if (!btnClicked) return;
      const id = +btnClicked.id;
      handler(id);
      sectionMovieDetails.classList.remove('section-hide');
      sectionResults.classList.add('section-hide');
      helpers.scrollToSection(sectionMovieDetails);
    });
  });
};

export const generateHomeImageMarkup = function (data) {
  return `
        <div class="header-img-info-container">
          <h4 class="header-img-info-title">${
            !data.title
              ? data.original_title
                ? data.original_title.slice(0, 30) + '...'
                : data.name.slice(0, 30) + '...'
                ? data.name
                : data.original_name.slice(0, 30) + '...'
              : data.title.length > 30
              ? data.title.slice(0, 30) + '...'
              : data.title
          }</h4>
        </div>
        <figure class="header-img-figure">
          <img
            src="${IMAGE_URL}${data.poster_path}"
            alt="posters"
            class="header-img"
          />
        </figure>
        <button class="btn btn-header-img" id="${data.id}">
          More info <i class="fas fa-caret-down"></i>
        </button>  
    `;
};
