import * as model from './model.js';
import * as helpers from './helpers.js';
import { IMAGE_URL, STAPLE_IMG } from './config.js';
import {
  handlerBookmarkContainerOpen,
  handlerBookmarkContainerClose,
  handlerHideOverlayBookmark,
  handlerRenderMiniBookmarkMovie,
  handlerRenderBookmarkMovie,
  generateBookmarkMarkup,
  generateBookmarkContainerMarkup,
  generateNoBookmarkMarkup,
  bookmarks,
  bookmarkContainer,
} from './views/bookmarkView.js';
import {
  observeNavigation,
  handlerNavigation,
} from './views/navigationView.js';
import {
  handlerSearchBarActive,
  handlerSearchRemove,
  handlerFormSubmit,
  handlerHideOverlaySearch,
} from './views/searchView.js.js';
import {
  handlerHideQuickViewAndQuickToDetails,
  handlerShowQuickView,
  generateResultsMarkup,
  searchCardsContainer,
  searchResultsHeading,
  generateQuickViewMarkup,
  quickViewContainer,
  paginationContainer,
} from './views/searchResultsView.js';
import {
  generatePaginationMarkup,
  handlerPagination,
} from './views/paginationView.js';
import {
  handlerMovieContent,
  handlerShowDetails,
  generateMovieMarkup,
  generateSimilarMarkup,
  generateRecommendedMarkup,
  sectionMovieDetails,
  handlerHideReviews,
  handlerShowReviews,
  handlerMoveSlideDots,
  handlerMoveSlideLeft,
  handlerMoveSlideRight,
  handlerMoveSlidesWithKeys,
  handlerHideOverlayReviews,
} from './views/movieView.js';
import {
  handlerFooterFormShow,
  generateFooterImagesMarkup,
  footerImage1,
  footerImage2,
  footerImage3,
} from './views/footerView.js';
import {
  generateHomeImageMarkup,
  headerImageContainer1,
  headerImageContainer2,
  headerImageContainer3,
  handlerLoadHomeImage,
} from './views/headerView.js';

/* -------------------------------------------------- Bookmark -------------------------------------------------- */

const controlLoadBookmark = function () {
  const data = model.loadFromLocalStorage();

  if (data) model.state.bookmarks.push(...data);
  const markupBookmark = generateBookmarkMarkup(model.state.bookmarks);
  helpers.render(bookmarks, markupBookmark);

  if (model.state.bookmarks.length === 0) {
    const noBookmarkMarkup = generateNoBookmarkMarkup();
    helpers.render(bookmarks, noBookmarkMarkup);
  }
};

const controlAddBookmark = function () {
  model.state.bookmarks.push(model.state.movie);
  model.addToLocalStorage(model.state.bookmarks);
  const markupBookmark = generateBookmarkMarkup(model.state.bookmarks);
  helpers.render(bookmarks, markupBookmark);
};

const controlDeleteBookmark = function () {
  const id = model.state.movie.id;
  const index = model.state.bookmarks.findIndex(b => b.id === id);

  model.state.bookmarks.splice(index, 1);
  model.state.movie.bookmarked = false;
  model.addToLocalStorage(model.state.bookmarks);

  const markupBookmark = generateBookmarkMarkup(model.state.bookmarks);
  helpers.render(bookmarks, markupBookmark);

  if (model.state.bookmarks.length === 0) {
    console.log(model.state.bookmarks, model.state.bookmarks.length);
    const noBookmarkMarkup = generateNoBookmarkMarkup();
    helpers.render(bookmarks, noBookmarkMarkup);
  }
};

const controlDisplayBookmarks = function () {
  const markupBookmarkContainer = generateBookmarkContainerMarkup(
    model.state.bookmarks
  );
  helpers.render(bookmarkContainer, markupBookmarkContainer);
};

/* -------------------------------------------------- TRENDING, PLAYING, UPCOMING -------------------------------------------------- */

const controlContemporaryMovies = async function (type) {
  await model.loadContemporaryMovies();

  // Rendering markup for TYPE View
  const markupResults = generateResultsMarkup(model.state[type]);
  helpers.render(searchCardsContainer, markupResults);

  // Causing the transition for cards
  const searchCards = document.querySelectorAll('.search-card');
  helpers.slideInCards(searchCards);
};

/* -------------------------------------------------- HOME AND FOOTER IMAGE -------------------------------------------------- */

const controlHomeImage = async function () {
  await model.loadHomeAndFooterImage();
  // Loading Home Images
  const markupHomeImage1 = generateHomeImageMarkup(model.state.randomMovie[0]);
  helpers.render(headerImageContainer1, markupHomeImage1);
  const markupHomeImage2 = generateHomeImageMarkup(model.state.randomMovie[1]);
  helpers.render(headerImageContainer2, markupHomeImage2);
  const markupHomeImage3 = generateHomeImageMarkup(model.state.randomMovie[2]);
  helpers.render(headerImageContainer3, markupHomeImage3);

  // Loading Footer Images
  const markupFooterImage1 = generateFooterImagesMarkup(
    model.state.randomImage[0]
  );
  helpers.render(footerImage1, markupFooterImage1);

  const markupFooterImage2 = generateFooterImagesMarkup(
    model.state.randomImage[1]
  );
  helpers.render(footerImage2, markupFooterImage2);

  const markupFooterImage3 = generateFooterImagesMarkup(
    model.state.randomImage[2]
  );
  helpers.render(footerImage3, markupFooterImage3);
};

/* -------------------------------------------------- SEARCH RESULTS -------------------------------------------------- */

const controlSearchResults = async function (query) {
  try {
    // Loading Search Results
    const movieResults = await model.loadSearchResults(query);

    // Rendering markup for Results View
    const markupResults = generateResultsMarkup(model.getResultsPerPage());
    helpers.render(searchCardsContainer, markupResults);

    // Causing the transition for search cards
    const searchCards = document.querySelectorAll('.search-card');
    helpers.slideInCards(searchCards);

    // Rendering Pagination
    const markupPagination = generatePaginationMarkup(model.state);
    helpers.render(paginationContainer, markupPagination);
  } catch (err) {
    // Rendering Error
    searchResultsHeading.textContent = 'No Results';
    helpers.render(
      searchCardsContainer,
      `<p class="search-results-error" style="transform: translate(0)">We didn't find anything for your query. Try again :)</p>`
    );
    paginationContainer.innerHTML = '';
  }
};

/* -------------------------------------------------- RENDER MOVIE AND QUICK -------------------------------------------------- */

const controlQuickView = async function (id) {
  try {
    const movieData = await model.loadMovie(id);

    // Rendering markup for Quick View
    const markupQuickView = generateQuickViewMarkup(model.state.movie);
    helpers.render(quickViewContainer, markupQuickView);
  } catch (err) {
    console.error(err, '💩');
  }
};

const controlMovie = async function (id) {
  try {
    const movieData = await model.loadMovie(id);

    model.state.bookmarks.forEach((b, i) => {
      if (b.id === model.state.movie.id) model.state.movie.bookmarked = true;
    });

    // Rendering Movie
    const markupMovie = generateMovieMarkup(model.state.movie);
    helpers.render(sectionMovieDetails, markupMovie);
  } catch (err) {
    console.error(err, '💩');
  }
};

/* -------------------------------------------------- PAGINATION -------------------------------------------------- */

const controlPagination = function (goTo) {
  // Rerendering markup for Results View
  const markupResults = generateResultsMarkup(model.getResultsPerPage(goTo));
  helpers.render(searchCardsContainer, markupResults);

  // Recausing the transition for search cards
  const searchCards = document.querySelectorAll('.search-card');
  helpers.slideInCards(searchCards);

  // Rerendering Pagination
  const markupPagination = generatePaginationMarkup(model.state);
  helpers.render(paginationContainer, markupPagination);
};

/* -------------------------------------------------- TABBED COMPONENT -------------------------------------------------- */

const controlTabbed = function (dataset) {
  const otherMoviesArr = model.state.movie[`${dataset}`].results;
  const markupTabbed =
    dataset === 'recommendations'
      ? otherMoviesArr.length > 0
        ? generateRecommendedMarkup(otherMoviesArr)
        : '<h4 class="movie-other-heading">No Recommended Movies</h4>'
      : otherMoviesArr.length > 0
      ? generateSimilarMarkup(otherMoviesArr)
      : '<h4 class="movie-other-heading">No Similar Movies</h4>';

  const backImg =
    otherMoviesArr.length > 0
      ? `${IMAGE_URL}${
          otherMoviesArr[helpers.randomize(0, otherMoviesArr.length - 1)]
            .poster_path
        }`
      : `${STAPLE_IMG}`;
  const recSimMovieContainer = document.querySelector('.movie-other-slider');

  const tabContentContainer = sectionMovieDetails.querySelector(
    '.movie-other-slider'
  );
  helpers.render(tabContentContainer, markupTabbed);

  helpers.setLinearGradient(
    recSimMovieContainer,
    'rgb(52, 79, 161, 0.8) 45%',
    'rgb(26, 40, 80, 0.8) 90%',
    backImg
  );
};

/* -------------------------------------------------- Initializing Handlers and functions -------------------------------------------------- */

const init = function () {
  // Home Image
  controlHomeImage();
  handlerLoadHomeImage(controlMovie);
  // Navigation
  observeNavigation();
  handlerNavigation(controlContemporaryMovies);
  // Bookmarks
  controlLoadBookmark();
  handlerBookmarkContainerOpen(controlDisplayBookmarks);
  handlerBookmarkContainerClose();
  handlerHideOverlayBookmark();
  handlerRenderMiniBookmarkMovie(controlMovie);
  handlerRenderBookmarkMovie(controlMovie);
  // Search
  handlerSearchBarActive();
  handlerSearchRemove();
  handlerHideOverlaySearch();
  handlerFormSubmit(controlSearchResults);
  // Pagination
  handlerPagination(controlPagination);
  // Quick View
  handlerShowQuickView(controlQuickView);
  handlerHideQuickViewAndQuickToDetails(controlMovie);
  // Detail View
  handlerShowDetails(controlMovie);
  // Tabbed
  handlerMovieContent(
    controlTabbed,
    controlMovie,
    controlAddBookmark,
    controlDeleteBookmark
  );
  // Reviews
  handlerHideReviews();
  handlerShowReviews();
  handlerMoveSlideDots();
  handlerMoveSlideLeft();
  handlerMoveSlideRight();
  handlerMoveSlidesWithKeys();
  handlerHideOverlayReviews();
  // Footer
  handlerFooterFormShow();
};
init();
