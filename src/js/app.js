//Функция для добавления класса webp или no-webp для html
import * as webpClass from "./modules/webp.js";
webpClass.isWebp();


// Функция анимации
import {animItems, animOnScroll} from "./modules/animation.js";

if (animItems.length > 0) {
   animOnScroll();
   window.addEventListener('scroll', animOnScroll);
}


//Открытие закрытие модального окна
import {openDownload} from "./modules/openCloseDownload.js";
window.addEventListener('click', openDownload);







