export {openDownload}

const download = document.querySelector('.download');
const closeDownload = document.querySelector('.close-download');
const overlay = document.querySelector('.overlay');

//Проверка нажатия на Esc, зыкрытие
let clickEsc = function (evt) {
   if(evt.keyCode == 27) {
    closingDownload();
  }
};

//Проверка клика на крестик и документ, зыкрытие
let checkClick = function (evt) {
   if (!evt.target.closest('.download')) {
      closingDownload();
   }

   if (evt.target.closest('.close-download')) {
      closingDownload();
   }
};

//Функция закрытия
function closingDownload() {
   download.classList.remove('_open');
   download.classList.add('_close');
   closeDownload.classList.remove('_open');
   closeDownload.classList.add('_close');
   overlay.style = `display: none; z-index: -1;`;
   document.body.style = `overflow: none;`;

   document.removeEventListener('click', checkClick);
   document.removeEventListener('keydown', clickEsc);
};


//Функция открытия
function openDownload(evt) {
   if (evt.target.classList.contains('modal-download') && !evt.target.classList.contains('_open')) {
      let top = window.pageYOffset + (document.documentElement.clientHeight / 2);
      download.style = `top: ${top}px;`;
      download.classList.remove('_close');
      download.classList.add('_open');
      closeDownload.style = `top: ${window.pageYOffset}px;`;
      closeDownload.classList.remove('_close');
      closeDownload.classList.add('_open');
      overlay.style = `display: block; z-index: 15;`;
      document.body.style = `overflow: hidden;`;

      document.addEventListener('click', checkClick);
      document.addEventListener('keydown', clickEsc);
   }
}





























// //Открытие закрытие модального окна
// window.addEventListener('click', openDownload);

// const download = document.querySelector('.download');
// const closeDownload = document.querySelector('.close-download');
// const overlay = document.querySelector('.overlay');

// function openDownload(evt) {
//    if (evt.target.classList.contains('modal-download') && !evt.target.classList.contains('_open')) {
//       let top = window.pageYOffset + (document.documentElement.clientHeight / 2);
//       download.style = `top: ${top}px;`;
//       download.classList.remove('_close');
//       download.classList.add('_open');
//       closeDownload.style = `top: ${window.pageYOffset}px;`;
//       closeDownload.classList.remove('_close');
//       closeDownload.classList.add('_open');
//       overlay.style = `display: block; z-index: 15;`;
//       document.body.style = `overflow: hidden;`;

//       document.addEventListener('click', checkClick);
//       document.addEventListener('keydown', clickEsc);

//    }
// }

// let clickEsc = function (evt) {
//    if(evt.keyCode == 27) {
//     closingDownload();
//   }
// };


// let checkClick = function (evt) {
//    if (!evt.target.closest('.download')) {
//       closingDownload();
//    }

//    if (evt.target.closest('.close-download')) {
//       closingDownload();
//    }
// };


// function closingDownload() {
//    download.classList.remove('_open');
//    download.classList.add('_close');
//    closeDownload.classList.remove('_open');
//    closeDownload.classList.add('_close');
//    overlay.style = `display: none; z-index: -1;`;
//    document.body.style = `overflow: none;`;

//    document.removeEventListener('click', checkClick);
//    document.removeEventListener('keydown', clickEsc);
// };