'use strict';

//Меню tablet и mobile
const pageHeader = document.querySelector('.page-header');
const headerToggle = document.querySelector('.page-header__toggle');
const mainNavList = document.querySelector('.main-nav-list');
const form = document.querySelector('.form');
const nameInput = document.querySelector('#name');
const telInput = document.querySelector('#tel');


pageHeader.classList.remove('page-header--nojs');

headerToggle.addEventListener('click', function () {
  if (pageHeader.classList.contains('page-header--closed')) {
    pageHeader.classList.remove('page-header--closed');
    pageHeader.classList.add('page-header--opened');
  } else {
    pageHeader.classList.add('page-header--closed');
    pageHeader.classList.remove('page-header--opened');
  }
});

// Закрытие мобильного меню и скролл до якоря
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (const smoothLink of smoothLinks) {
  if (smoothLink) {
    smoothLink.addEventListener('click', (evt) => {
      evt.preventDefault();
      const id = smoothLink.getAttribute('href');

      const placeScroll = document.querySelector(id);

      if (placeScroll) {
        placeScroll.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        pageHeader.classList.remove('page-header--opened');
        pageHeader.classList.add('page-header--closed');
      }
    });
  }
}
