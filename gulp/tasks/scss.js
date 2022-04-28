//Плагин препроцессор sass: npm i -D sass
//Плагин для запуска препроцессора sass: npm i -D gulp-sass
//Плагин для переименовывания конечного файла: npm i -D gulp-rename
//Плагин для сжатия css файлов: npm i -D gulp-clean-css
//Плагин для вывода webp: npm i -D gulp-webpcss
//Плагин конвертер для webp, именно этой версии: npm i -D webp-converter@2.2.3
//Плагин для добавления префиксов: npm i -D gulp-autoprefixer
//Плагин для группировки медиа-запросов: npm i -D gulp-group-css-media-queries

import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css";
import webpcss from "gulp-webpcss";
import autoprefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";

//Делаем вызов, передавая gulp-sass сам sass
const sass = gulpSass(dartSass);

export const scss = () => {
   //Путь к исходным файлам
   return app.gulp.src(app.path.src.scss, {sourcemaps: app.isDev})

      //Обработка ошибок, если нужны уведомления, расскоментировать
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>"
         })
      ))

      //Ищем картинки с вхождением @img и меняем img/
      .pipe(app.plugins.replace(/@img\//g, 'img/'))

      //Вызываем компилятор
      .pipe(sass({
         //Стиль готового файла сжатый или нет
         outputStyle: 'expanded'
      }))

      //Группировка медиа-запросов
      .pipe(
         //Проверка, если режим продкашн, то выполняем
         app.plugins.if(
            app.isBuild,
            groupCssMediaQueries()
         )
      )

      //Автоматическое добавление адресса к webp
      .pipe(
         //Проверка, если режим продкашн, то выполняем
         app.plugins.if(
            app.isBuild,
            webpcss({
               //Если браузер поддерживает webp будет добавлен класс webp
               webpClass: ".webp",
               //Если браузер не поддерживает webp будет добавлен класс no-webp
               noWebpClass: ".no-webp"
            })
         )
      )

      //Добавляем префиксы
      .pipe(
         //Проверка, если режим продкашн, то выполняем
         app.plugins.if(
            app.isBuild,
            autoprefixer({
               grid: true,
               overrideBrowsersList: ["last 3 versions"],
               cascade: true
            })
         )
      )

      //Раскомментировать, если нужен не сжатый файл стилей
      .pipe(app.gulp.dest(app.path.build.css))

      //Сжатие файла стилей
      .pipe(
         //Проверка, если режим продкашн, то выполняем
         app.plugins.if(
            app.isBuild,
            cleanCss()
         )
      )

      //Переименовываем готовый файл
      .pipe(rename({
         extname: ".min.css"
      }))

      //Путь к конечным файлам
      .pipe(app.gulp.dest(app.path.build.css))

      //Команда для обновления страницы в брузере
      .pipe(app.plugins.browserSync.stream());
}