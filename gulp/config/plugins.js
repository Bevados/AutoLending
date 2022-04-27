//Плагин поиска и замены: npm i -D gulp-replace
import replace from "gulp-replace";

//Плагин для обработки ошибок: npm i -D gulp-plumber
import plumber from "gulp-plumber";

//Плагин вывода сообщений об ошибках: npm i -D gulp-notify
import notify from "gulp-notify";

//Плагин локального сервера: npm i -D browser-sync
import browserSync from "browser-sync";

//Плагин проверки обновлений файлов в папке с результатом: npm i -D gulp-newer
import newer from "gulp-newer";

//Плагин условного ветвления, для сбоки в dev или build: npm i -D gulp-if
import ifPlugin from "gulp-if";

export const plugins = {
   replace: replace,
   plumber: plumber,
   notify: notify,
   browserSync: browserSync,
   newer: newer,
   if: ifPlugin
}