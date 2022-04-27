//Основной модуль
import gulp from "gulp";

//Импорт путей
import { path } from "./gulp/config/path.js";

//Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

//Передаём значения путей и основного модуля в глобальный объект
global.app = {
   //Встроенная переменная process проверяет флаг
   //Проверка, если переменная с флагом --build - режим продакшина
   isBuild: process.argv.includes('--build'),
   //Проверка, если переменная без флага --build - режим разработки
   isDev: !process.argv.includes('--build'),
   path: path,
   gulp: gulp,
   plugins: plugins
}

//Импорт задач
import {copy} from "./gulp/tasks/copy.js";
import {copyFonts} from "./gulp/tasks/fonts.js";
import {reset} from "./gulp/tasks/reset.js";
import {html} from "./gulp/tasks/html.js";
import {server} from "./gulp/tasks/server.js";
import {scss} from "./gulp/tasks/scss.js";
import {js} from "./gulp/tasks/js.js";
import {images} from "./gulp/tasks/images.js";
import {svgSprite} from "./gulp/tasks/svgSprite.js";
import {zip} from "./gulp/tasks/zip.js";

//Наблюдатель за изменениями в файлах
function watcher () {
   gulp.watch(path.watch.files, copy);
   gulp.watch(path.watch.html, html);
   gulp.watch(path.watch.scss, scss);
   gulp.watch(path.watch.js, js);
   gulp.watch(path.watch.images, images);
}

//Экспортирием команду создания svg спрайта, так как она нужна будет скорее всего один раз, поэтому запускаться будет отдельной командой
export {svgSprite};

//Последовательная обработка шрифтов
// const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

//Основные задачи параллельного выполнения
const mainTasks = gulp.series(gulp.parallel(copy, copyFonts, html, scss, js, images));

//Построение сценариев выполнения задач: в режиме разработчика, продакшн, архивирования
//метод series выполняет задачи последовательно
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);

//Экспорт сценариев: команды с задачами в режиме разработчика, продакшн, архивирования
export {dev};
export {build};
export {deployZIP};

//Выполнение сценария по умолчанию
gulp.task('default', dev);