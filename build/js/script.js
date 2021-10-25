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

// Валидация формы
if (nameInput) {
  nameInput.addEventListener('invalid', () => {
    if (nameInput.validity.valueMissing) {
      nameInput.setCustomValidity('Обязательное поле');
    } else {
      nameInput.setCustomValidity('');
    }
  });
}

if (telInput) {
  telInput.addEventListener('invalid', () => {
    if (telInput.validity.valueMissing || telInput.validity.patternMismatch) {
      telInput.setCustomValidity('Неверный номер телефона');
    } else {
      telInput.setCustomValidity('');
    }
  });
}

let isStorageSupport = true;
let storageName = '';
let storageTel = '';

try {
  storageName = localStorage.getItem('name');
  storageTel = localStorage.getItem('tel');
} catch (err) {
  isStorageSupport = false;
}

if (storageName && nameInput) {
  nameInput.value = storageName;
}

if (storageTel && telInput) {
  telInput.value = storageTel;
}

// Событие отправки формы
if (form) {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (isStorageSupport) {
      localStorage.setItem('name', nameInput.value);
      localStorage.setItem('tel', telInput.value);
    }

    nameInput.value = '';
    telInput.value = '';
  });
}
