import { IMAGE_URL, overlay } from '../config.js';
import * as helpers from '../helpers.js';
import {
  searchCardsContainer,
  quickViewContainer,
} from './searchResultsView.js';
import { state } from '../model.js';

// prettier-ignore
export const sectionMovieDetails = document.querySelector('.section-movie-view');

/* -------------------------------------------------- SHOW SECTION -------------------------------------------------- */

export const handlerShowDetails = function (handler) {
  searchCardsContainer.addEventListener('click', function (e) {
    e.preventDefault();
    const linkClicked = e.target.closest('.search-card-details');
    if (!linkClicked) return;
    sectionMovieDetails.classList.remove('section-hide');
    quickViewContainer.setAttribute('style', 'transform: translateX(-100%);');
    helpers.scrollToSection(sectionMovieDetails);
    const id = +linkClicked.closest('.search-card').id;
    handler(id);
  });
};

/* -------------------------------------------------- TABBED COMPONENTS -------------------------------------------------- */

export const handlerMovieContent = function (
  handler1,
  handler2,
  handler3,
  handler4
) {
  sectionMovieDetails.addEventListener('click', function (e) {
    /////// TABBED
    const btnClicked = e.target.closest('.movie-other-btn');
    if (btnClicked) {
      sectionMovieDetails
        .querySelectorAll('.movie-other-btn')
        .forEach(tab => tab.classList.remove('tab-active'));
      if (!btnClicked.classList.contains('tab-active'))
        btnClicked.classList.add('tab-active');

      const tabContent = btnClicked.dataset.tab;
      const lineBottom = sectionMovieDetails.querySelector('.movie-other-line');

      // Tabbed Main Functionality
      if (tabContent === 'recommendations') {
        helpers.setLinearGradient(lineBottom, '#81b214', '#206a5d');
        handler1(tabContent);
      }

      if (tabContent === 'similar') {
        helpers.setLinearGradient(lineBottom, '#f9b208', '#f98404');
        handler1(tabContent);
      }
    }

    /////// TABBED MOVIE
    const linkClicked = e.target.closest('.movie-other-card-info');
    if (linkClicked) {
      e.preventDefault();
      const id = +linkClicked.closest('.movie-other-slide').id;
      helpers.scrollToSection(sectionMovieDetails);
      handler2(id);
    }

    /////// Bookmark
    const bookmarkClicked = e.target.closest('.fa-bookmark');
    if (bookmarkClicked) {
      if (bookmarkClicked.classList.contains('far')) {
        bookmarkClicked.classList.remove('far');
        bookmarkClicked.classList.add('fas');
        handler3();
      } else {
        bookmarkClicked.classList.remove('fas');
        bookmarkClicked.classList.add('far');
        handler4();
      }
    }

    /////// Movie Link
    const movieLinkClicked = e.target.closest('.movie-trailer-text');
    if (movieLinkClicked)
      window
        .open(
          `${
            state.movie.videos.results.length > 0
              ? `https://www.youtube.com/watch?v=${state.movie.videos.results[0].key}`
              : `https://www.youtube.com`
          }`,
          '_blank'
        )
        .focus();
  });
};

/* -------------------------------------------------- GENERATE MOVIE MARKUP -------------------------------------------------- */

const generateStarringMarkup = function (data) {
  return data
    .map(d => {
      return `
    <div class="movie-crew-img-container">
      <img src="${
        d.profile_path
          ? `${IMAGE_URL}${d.profile_path}`
          : '../images/unknown-male.jpg'
      }" alt="crew" class="crew-img" />
      <p class="crew-name">${d.name}</p>
      <p class="crew-job">${d.character}</p>
    </div>
    `;
    })
    .slice(0, 8)
    .join('');
};

const generateCrewMarkup = function (data) {
  return data
    .map(d => {
      return `
    <div class="movie-crew-img-container">
      <img src="${
        d.profile_path
          ? `${IMAGE_URL}${d.profile_path}`
          : '../images/unknown-male.jpg'
      }" alt="crew" class="crew-img" />
      <p class="crew-name">${d.name}</p>
      <p class="crew-job">${d.job}</p>
    </div>
    `;
    })
    .slice(0, 8)
    .join('');
};

export const generateRecommendedMarkup = function (data) {
  return data
    .map(d => {
      return `
      <div class="movie-other-slide" id="${d.id}">
        <div class="movie-other-card">
          <div class="movie-other-card-container">
            <img src="${IMAGE_URL}${
        d.poster_path
      }" alt="Moie-poster" class="movie-other-card-photo"/>
            <p class="movie-other-title">${
              d.title.length > 13 ? `${d.title.slice(0, 13)}...` : d.title
            }</p>
            <a href="#" class="movie-other-card-info">
              <i class="fas fa-file-video"></i> More Details
            </a>
          </div>
        </div>
      </div>
  `;
    })
    .join('');
};

export const generateSimilarMarkup = function (data) {
  return data
    .map(d => {
      return `
      <div class="movie-other-slide" id="${d.id}">
        <div class="movie-other-card">
          <div class="movie-other-card-container">
            <img src="${IMAGE_URL}${
        d.poster_path
      }" alt="Moie-poster" class="movie-other-card-photo"/>
            <p class="movie-other-title">${
              d.title.length > 13 ? `${d.title.slice(0, 13)}...` : d.title
            }</p>
            <a href="#" class="movie-other-card-info">
              <i class="fas fa-file-video"></i> More Details
            </a>
          </div>
        </div>
      </div>
  `;
    })
    .join('');
};

export const generateMovieMarkup = function (data) {
  return `
  ${generateReviewsMarkup(data)}
    <div class="movie-img-container">
    <figure class="movie-img-figure">
      <img src="${
        data.poster_path
          ? `${IMAGE_URL}${data.poster_path}`
          : '../images/blank.jpg'
      }" alt="poster" class="movie-img" />
      </figure>
      <div class="movie-img-text-container">
        <p class="movie-img-text">
          <i class="fas fa-theater-masks"></i> ${
            data.genres.length > 0 ? data.genres[0].name : 'Movie'
          }
        </p>
        <p class="movie-img-text"><i class="far fa-calendar"></i> ${data.release_date.slice(
          0,
          4
        )}</p>
        <a href="#" class="movie-review-link">
          <i class="fas fa-align-center"></i> Reviews
        </a>
      </div>
    </div>

    <div class="movie-info-container">
      <div class="movie-title-container">
        <h2 class="movie-title">${data.title}</h2>
        <div class="movie-info-text-container">
          <p class="movie-info-text">${
            data.budget > 0
              ? helpers.formatter.format(data.budget)
              : 'Undisclosed'
          }</p>
          <p class="movie-info-text">${
            data.revenue > 0
              ? helpers.formatter.format(data.revenue)
              : 'Undisclosed'
          }</p>
          <p class="movie-info-text">${data.runtime} mins</p>
        </div>
      </div>

      <div class="movie-rating-container">
        <p class="movie-rating-text">${data.vote_average} / 10 ⭐</p>
        <p class="movie-rating-text">${helpers.formatter
          .format(data.vote_count)
          .replace('$', '')} votes 🎞</p>
        <div class="movie-rating-bar" style="background: linear-gradient(to right, #1a2850 ${
          data.vote_average * 10
        }%, #faf4f4 ${data.vote_average * 10}%)"><span>${
    data.vote_average * 10
  }%</span></div>
        <i class="${data.bookmarked ? 'fas' : 'far'} fa-2x fa-bookmark"></i>
      </div>
      <div class="movie-overview-container">
        <h3 class="movie-overview-heading">Overview</h3>
        <p class="movie-overivew-text">
        ${data.overview}
        </p>
      </div>

      <div class="movie-crew-container">
        <h4 class="movie-crew-heading movie-crew-heading-1">Starring</h4>
        <div class="movie-crew-starring-container">
          ${generateStarringMarkup(data.credits.cast)}
      </div>
        <div class="movie-crew-line"></div>
        <h4 class="movie-crew-heading movie-crew-heading-2">Creators</h4>
        <div class="movie-crew-production-container">
          ${generateCrewMarkup(data.credits.crew)}
        </div>
      </div>

      <div class="movie-other-container">
        <div class="tabbed-components">
          <button
            class="btn recommended-tab movie-other-btn tab-active"
            data-tab="recommendations"
          >
            Recommended Movies <i class="fas fa-long-arrow-alt-down"></i>
          </button>
          <button class="btn movie-other-btn similar-tab" data-tab="similar">
            Similar Movies <i class="fas fa-long-arrow-alt-down"></i>
          </button>
        </div>
        <div class="movie-other-slider">
        ${
          data.recommendations.results.length > 0
            ? generateRecommendedMarkup(data.recommendations.results)
            : '<h4 class="movie-other-heading">No Recommended Movies</h4>'
        }  
        </div>
        <div class="movie-other-line"></div>
      </div>
    </div>

    <div class="movie-trailer-container">
      <div class="movie-trailer">
        <iframe
          src="https://www.youtube.com/embed/${
            data.videos.results.length > 0
              ? `${data.videos.results[0].key}`
              : `wI4hrG04Ct8`
          }"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <a href="${
        data.videos.results.length > 0
          ? `https://www.youtube.com/watch?v=${data.videos.results[0].key}`
          : `https://www.youtube.com`
      }" target="_blank" class="movie-trailer-text"
        ><i class="fab fa-youtube"></i> Watch on youtube</a
      >
    </div>
    `;
};

/* ------------------------------------------------ REVIEWS ------------------------------------------------ */

let maxSlide,
  btnSliderLeft,
  btnSliderRight,
  dotsContainer,
  createDots,
  activateDots,
  nextSlide,
  prevSlide,
  goToSlide;

let curSlide = 0;
let slides = [];

/* -------------------------------------------------- HIDING AND SHOWING REVIEWS ------------------------------------------------ */

export const handlerShowReviews = function () {
  sectionMovieDetails.addEventListener('click', function (e) {
    slides = document.querySelectorAll('.slide');
    dotsContainer = document.querySelector('.dots');
    maxSlide = slides.length - 1;

    if (e.target.closest('.movie-img-text-container')) {
      // to make sure the following code only runs when the dotContainer is brand new, which means no child elements. to avoid adding duplicate slides
      if (dotsContainer.childElementCount === 0) {
        ///// Slides
        goToSlide = function (curSlide) {
          slides.forEach(
            (s, i) =>
              (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
          );
        };

        ///// Creating Dots
        createDots = function () {
          slides.forEach((_, i) =>
            dotsContainer.insertAdjacentHTML(
              'beforeend',
              `<div class="dot" data-slide="${i}"></div>`
            )
          );
        };

        ///// Activating dots
        activateDots = function (slide) {
          document
            .querySelectorAll('.dot')
            .forEach((dot, i) => dot.classList.remove('dot-active'));

          document
            .querySelectorAll(`.dot[data-slide="${slide}"]`)
            .forEach(dot => dot.classList.add('dot-active'));
        };

        ///// Functionalities
        nextSlide = function () {
          if (curSlide === maxSlide) curSlide = 0;
          else curSlide++;
          goToSlide(curSlide);
          activateDots(curSlide);
        };

        prevSlide = function () {
          if (curSlide === 0) curSlide = maxSlide;
          else curSlide--;
          goToSlide(curSlide);
          activateDots(curSlide);
        };

        ///// Initializing functionalities
        createDots();
        activateDots(0);
        goToSlide(curSlide);
      }
    }

    const reivewLinkClicked = e.target.closest('.movie-review-link');
    if (reivewLinkClicked) {
      e.preventDefault();
      const slider = document.querySelector('.slider');
      if (state.movie.reviews.results.length < 1) {
        slider.classList.add('review-error-message');
      }
      helpers.activateOverlay();
      slider.classList.remove('slider-hide');
    }
  });
};

export const handlerHideReviews = function () {
  sectionMovieDetails.addEventListener('click', function (e) {
    const iconClicked = e.target.closest('.review-cancel-icon');
    if (iconClicked || e.target.classList.contains('review-error-message')) {
      const slider = document.querySelector('.slider');
      helpers.hideOverlay();
      slider.classList.add('slider-hide');
    }
  });
};

export const handlerHideOverlayReviews = function () {
  overlay.addEventListener('click', function () {
    const slider = document.querySelector('.slider');
    slider.classList.add('slider-hide');
    helpers.hideOverlay();
  });
};

/* -------------------------------------------------- SLIDER ------------------------------------------------ */

export const handlerMoveSlidesWithKeys = function () {
  document.body.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    }

    if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });
};

export const handlerMoveSlideLeft = function () {
  sectionMovieDetails.addEventListener('click', function (e) {
    btnSliderLeft = e.target.closest('.btn-slider-left');
    if (btnSliderLeft) {
      prevSlide();
    }
  });
};

export const handlerMoveSlideRight = function () {
  sectionMovieDetails.addEventListener('click', function (e) {
    btnSliderRight = e.target.closest('.btn-slider-right');
    if (btnSliderRight) {
      nextSlide();
    }
  });
};

export const handlerMoveSlideDots = function () {
  sectionMovieDetails.addEventListener('click', function (e) {
    if (e.target.classList.contains('dot')) {
      let gotoSlide = e.target.dataset.slide;
      curSlide = gotoSlide;
      nextSlide();
      prevSlide();
      activateDots(curSlide);
    }
  });
};

/* -------------------------------------------------- REVIEWS MARKUP ------------------------------------------------ */

const generateReviewsMarkup = function (data) {
  return `
    <div class="review-container slider slider-hide">
      ${data.reviews.results
        .map(d => {
          return `
          <div class="review-slide slide">
              <div class="review-slide-container">
                <i class="fas fa-times review-cancel-icon"></i>
                <h2 class="slide-rating"><span>&#8220;</span>${
                  d.author_details.rating
                    ? `${d.author_details.rating} / 10`
                    : 'No Rating'
                }</h2>
                <blockquote class="slide-text">
                  ${
                    d.content.length > 300
                      ? `${d.content.slice(
                          0,
                          300
                        )} <a target="_blank" href="https://www.themoviedb.org/movie/${
                          data.id
                        }/reviews" class="review-read-more">...Read more</a>`
                      : d.content
                  }
                </blockquote>
                <div class="slide-details">
                  <img
                    src="${
                      d.author_details.avatar_path
                        ? d.author_details.avatar_path.startsWith('/h')
                          ? d.author_details.avatar_path.slice(1)
                          : `${IMAGE_URL}${d.author_details.avatar_path}`
                        : '../images/unknown-male.jpg'
                    }"
                    alt="avatar"
                    class="slide-author-img"
                  />
                  <div class="slide-author-container">
                    <h6 class="slide-author">${d.author}</h6>
                    <p class="slide-date">${d.created_at.slice(0, 4)}</p>
                  </div>
                </div>
              </div>
            </div>
        `;
        })
        .join('')}
      <div class="dots"></div>
      <button class="btn btn-slider btn-slider-left">
        <i class="fas fa-long-arrow-alt-left"></i>
      </button>
      <button class="btn btn-slider btn-slider-right">
        <i class="fas fa-long-arrow-alt-right"></i>
      </button>
    </div>
  `;
};
