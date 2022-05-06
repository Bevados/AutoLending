//Функция для добавления класса webp или no-webp для html
import * as webpClass from "./modules/webp.js";
webpClass.isWebp();

// Функция анимации
import {animItems, animOnScroll} from "./modules/animation.js";

if (animItems.length > 0) {
   animOnScroll();
   window.addEventListener('scroll', animOnScroll);
}

//Открытие закрытие модального окна Download
import {openDownload} from "./modules/openCloseDownload.js";
window.addEventListener('click', openDownload);



//Открытие закрытие модальных окон формы
   //Проверка нажатия на Esc, зыкрытие
   let clickEsc = function (event, modal) {
      if(event.keyCode == 27) {
         closingModal(modal);
      }
   };

   //Проверка клика на крестик и документ, зыкрытие
   let checkClick = function (event, modal) {
      if (!event.target.closest('.submit-winwod')) {
         closingModal(modal);
      }

      if (event.target.closest('.submit-window-close')) {
         closingModal(modal);
      }
   };

   //Функция закрытия
   function closingModal(modal) {
      modal.classList.remove('_open');
      modal.classList.add('_close');

      overlay.style = `z-index: -1; opacity: 0;`;
      document.body.style = `overflow: none;`;

      document.removeEventListener('click', function () {
         checkClick(event, modal);
      });
      document.removeEventListener('keydown', function() {
         clickEsc(event, modal);
      });
   }

   //Функция открытия
   function openFormModal(modal) {
      let top = window.pageYOffset + (document.documentElement.clientHeight / 2);
      modal.style = `top: ${top}px;`;
      modal.classList.remove('_close');
      modal.classList.add('_open');
      overlay.style = `z-index: 15; opacity: 0.6;`;
      document.body.style = `overflow: hidden;`;
      document.addEventListener('click', function () {
         checkClick(event, modal);
      });
      document.addEventListener('keydown', function() {
         clickEsc(event, modal);
      });
   }
//Модальное окно формы Done конец


const submitDone = document.querySelector('.submit-done');
const submitError = document.querySelector('.submit-error');
const overlay = document.querySelector('.overlay');

//Отправка формы
//Событие, что документ уже загружен
document.addEventListener('DOMContentLoaded', function() {

   const form = document.getElementById('form');
   form.addEventListener('submit', formSend);

   async function formSend(evt) {
      evt.preventDefault();

      let error = formValidate(form);

      let formData = new FormData(form);

      if (error === 0) {
         // form.classList.add('_sending');
         let response = await fetch('https://echo.htmlacademy.ru', {
            method: 'POST',
            body: formData
         });



         if (response.ok) {
            // form.classList.remove('_sending');
            form.reset();
            openFormModal(submitDone);
            console.log(formData)
         } else {
            // form.classList.remove('_sending');
            openFormModal(submitError);
            console.log(formData)
         }
      }
   }

   function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll('._req');

      for (let i = 0; i < formReq.length; i++) {
         const input = formReq[i];
         formRemoveError(input);

         if(input.classList.contains('_name')) {
            if(nameTest(input)) {
               formAddError(input);
               error++;
            }
         } else if (input.classList.contains('_phone')) {
            if(phoneTest(input)) {
               formAddError(input);
               error++;
            }
         } else {
            if (input.value === '') {
               formAddError(input);
               error++;
            }
         }
      }
      return error;
   }

   function formAddError(input) {
      input.parentElement.classList.add('_error');
      input.classList.add('_error');
   }

   function formRemoveError(input) {
      input.parentElement.classList.remove('_error');
      input.classList.remove('_error');
   }

   function nameTest(input) {
      return !/^([a-zA-Z]{1,23})$/.test(input.value);
   }

   function phoneTest(input) {
      return !/^(\s*)?(\+)?([- ()]?\d[- ]?){10,14}(\s*)?$/.test(input.value);
   }
});