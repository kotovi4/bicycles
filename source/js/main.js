'use strict';
//Меню tablet и mobile
const body = document.querySelector('.page-body');
const pageHeader = document.querySelector('.page-header');
const headerToggle = document.querySelector('.page-header__toggle');
const mainNavList = document.querySelector('.main-nav-list');
const form = document.querySelector('.form');
const nameInput = document.getElementById('name');
const telInput = document.getElementById('tel');
const formButton = form.querySelector('.form__button')
const modal = document.querySelector('.modal');

pageHeader.classList.remove('page-header--nojs');
pageHeader.classList.add('page-header--closed');

headerToggle.addEventListener('click', function () {
  if (pageHeader.classList.contains('page-header--closed')) {
    pageHeader.classList.remove('page-header--closed');
    pageHeader.classList.add('page-header--opened');
    body.classList.add('page-body--lock');
  } else {
    pageHeader.classList.add('page-header--closed');
    pageHeader.classList.remove('page-header--opened');
    body.classList.remove('page-body--lock');
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

      body.classList.remove('page-body--lock');

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
};

//Валидация поля телефона
var addValuePhoneField = function (element) {
  //ставит +7 при фокусе на поле
  if (element) {
    element.addEventListener('focus', function () {
      if (element.value.length < 3) {
        element.value = '+7 (';
      }
    });
  }

  //убирает +7
  if (element) {
    element.addEventListener('blur', function () {
      if (element.value === '+7 (' || element.value.length <= 3) {
        element.value = '';
      }
    });
  }
};

window.IMask(telInput, {
  mask: '+{7} (000) 000-00-00'
});

addValuePhoneField(telInput);

//Валидация полей формы
if (nameInput && telInput) {
  nameInput.addEventListener('input', function () {
    if (nameInput.validity.patternMismatch) {
      nameInput.setCustomValidity('Вводите только буквы');
    } else {
      nameInput.setCustomValidity('');
    }
  });

  telInput.addEventListener('input', function () {
    if (telInput.validity.patternMismatch) {
      telInput.setCustomValidity('Введите телефон в формате +7 ХХХ ХХХ ХХ ХХ');
    } else {
      telInput.setCustomValidity('');
    }
  });

  formButton.addEventListener('click', function () {
    localStorage.setItem(nameInput.name, nameInput.value);
    localStorage.setItem(telInput.name, telInput.value);
  });
}
