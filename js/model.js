import { API_URL, API_KEY, IMAGE_URL, APPEND_TO_URL } from './config.js';
import * as helpers from './helpers.js';

/* ------------------------------------------------------ DATA ---------------------------------------------------- */

export const state = {
  bookmarks: [],
  trending: [],
  now_playing: [],
  upcoming: [],
  search: {
    query: '',
    id: '',
    page: 1,
    results: [],
    resultsPerPage: 6,
  },
  movie: '',
  randomMovie: [],
  randomImage: [],
};

/* ------------------------------------------------------ ASYNC ---------------------------------------------------- */

export const loadHomeAndFooterImage = async function () {
  const response = await fetch(
    `${API_URL}trending/movie/day?api_key=${API_KEY}`
  );
  const data = await response.json();
  const [r1, r2, r3] = helpers.randomArrIndex(data.results);
  state.randomMovie = [data.results[r1], data.results[r2], data.results[r3]];

  // Load FooterImage
  const [f1, f2, f3] = [data.results[0], data.results[1], data.results[2]];
  state.randomImage = [f1.poster_path, f2.poster_path, f3.poster_path];
};

export const loadSearchResults = async function (query) {
  try {
    state.query = query;
    const response = await fetch(
      `${API_URL}search/movie?api_key=${API_KEY}&query=${query}`
    );
    const data = await response.json();
    const { results } = data;
    state.search.results = [...results];
    if (state.search.results.length === 0) throw new Error();
  } catch (err) {
    console.error('💩', err.message);
    throw err;
  }
};

export const loadMovie = async function (id) {
  try {
    const response = await fetch(
      `${API_URL}movie/${id}?api_key=${API_KEY}${APPEND_TO_URL}`
    );
    const data = await response.json();
    state.movie = data;
  } catch (err) {
    console.error('💩', err.message);
  }
};

export const loadContemporaryMovies = async function () {
  const [responseTrend, responsePlay, responseUp] = await Promise.all([
    fetch(`${API_URL}trending/movie/week?api_key=${API_KEY}`),
    fetch(`${API_URL}movie/now_playing?api_key=${API_KEY}`),
    fetch(`
    ${API_URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`),
  ]);
  const dataTrend = await responseTrend.json();
  const dataPlay = await responsePlay.json();
  const dataUp = await responseUp.json();
  state.trending = dataTrend.results;
  state.now_playing = dataPlay.results;
  state.upcoming = dataUp.results;
};

/* ------------------------------------------------------ NON ASYNC ---------------------------------------------------- */

export const getResultsPerPage = function (page = 1) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const addToLocalStorage = function (data) {
  localStorage.setItem('Bookmarks', JSON.stringify(data));
};

export const loadFromLocalStorage = function () {
  const storedData = JSON.parse(localStorage.getItem('Bookmarks'));
  if (!storedData) return;
  else return storedData;
};
