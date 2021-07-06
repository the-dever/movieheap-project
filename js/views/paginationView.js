import { sectionResults } from './searchResultsView.js';
import * as helpers from '../helpers.js';

export const generatePaginationMarkup = function (data) {
  const numPages = Math.ceil(
    data.search.results.length / data.search.resultsPerPage
  );
  let curPage = data.search.page;

  // first page and other pages
  if (curPage === 1 && numPages > 1) {
    return ` 
      <div class="space-prev">&nbsp;</div>
      <div class="page-container">
        <div class="page-text"><span>${curPage}</span></div>
      </div>
      <button class="btn btn-pagination btn-pagination-right" data-goto="${
        curPage + 1
      }">
        page ${curPage + 1} <i class="fas fa-long-arrow-alt-right"></i>
      </button>
    `;
  }

  // other page
  if (curPage < numPages) {
    return `
      <button class="btn btn-pagination btn-pagination-left" data-goto="${
        curPage - 1
      }">
        <i class="fas fa-long-arrow-alt-left"></i> page ${curPage - 1}
      </button>
      <div class="page-container">
        <div class="page-text"><span>${curPage}</span></div>
      </div>
      <button class="btn btn-pagination btn-pagination-right" data-goto="${
        curPage + 1
      }">
        page ${curPage + 1} <i class="fas fa-long-arrow-alt-right"></i>
      </button>
      
    `;
  }

  // last page
  if (curPage === numPages && numPages > 1) {
    return `
      <button class="btn btn-pagination btn-pagination-left" data-goto="${
        curPage - 1
      }">
        <i class="fas fa-long-arrow-alt-left"></i> page ${curPage - 1}
      </button>
      <div class="page-container">
        <div class="page-text"><span>${curPage}</span></div>
      </div>
      <div class="space-next">&nbsp;</div>
    `;
  }
  // first page and no other pages
  else return '';
};
export const handlerPagination = function (handler) {
  sectionResults.addEventListener('click', function (e) {
    const btnClicked = e.target.closest('.btn-pagination');
    if (!btnClicked) return;
    const goTo = +btnClicked.dataset.goto;
    handler(goTo);
    helpers.scrollToSection(sectionResults);
  });
};
