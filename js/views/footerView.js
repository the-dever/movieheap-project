import * as helpers from '../helpers.js';
import { IMAGE_URL } from '../config.js';

const footerContents = document.querySelectorAll('.footer > *');
export const footerImage1 = document.querySelector('.footer-img-1');
export const footerImage2 = document.querySelector('.footer-img-2');
export const footerImage3 = document.querySelector('.footer-img-3');
const BtnFooterContainer = document.querySelector('.footer-btn-container');
const btnContact = document.querySelector('.btn-footer');
const footerForm = document.querySelector('.footer-form-container');
const footerLink = document.querySelector('.footer-link:last-of-type');

/* -------------------------------------------------- FOOTER IMAGES MARKUP -------------------------------------------------- */

export const generateFooterImagesMarkup = function (data) {
  return `
        <img
          src="${IMAGE_URL}${data}"
          alt="poster"
          class="footer-img-child"
        />
    `;
};

/* -------------------------------------------------- SHOWING FOOTER FORM * -------------------------------------------------- */

export const handlerFooterFormShow = function () {
  btnContact.addEventListener('click', function (e) {
    footerForm
      .querySelectorAll('.footer-input')
      .forEach(input => (input.value = ''));
    footerForm.querySelector('.footer-message').value = '';

    footerContents.forEach(content => {
      // if (content === footerForm) content.classList.toggle('footer-form-shown');
      if (content === footerForm) return;
      if (content === BtnFooterContainer) return;
      content.classList.toggle('footer-hidden');
    });

    footerForm.classList.toggle('footer-form-shown');

    if (e.target.textContent.includes('Contact'))
      btnContact.innerHTML =
        'Submit <i class="fas fa-arrow-right footer-icon"></i>';
    else
      btnContact.innerHTML =
        'Contact us <i class="fas fa-phone-alt footer-icon"></i>';
  });
};
