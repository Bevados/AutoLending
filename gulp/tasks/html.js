//Плагин для сборки html файлов в один @@include('путь' {}): npm i -D gulp-file-include
//Плагин автоматически создаёт путь к webp изображению: npm i -D gulp-webp-html-nosvg
//Плагин от кеширования у заказчика, добавляет к файлам дату и время: npm i -D gulp-version-number


import fileinclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";

export const html = () => {
   //Путь к исходным файлам
   return app.gulp.src(app.path.src.html)

      //Обработка ошибок, если нужны уведомления, расскоментировать
      .pipe(app.plugins.plumber(
         // app.plugins.notify.onError({
         //    title: "HTML",
         //    message: "Error: <%= error.message %>"
         // })
      ))

      //Сборщик html файлов
      .pipe(fileinclude())

      //Ищем картинки с вхождением @img и меняем img/
      .pipe(app.plugins.replace(/@img\//g, 'img/'))

      //Автоматическое создание пути для webp
      .pipe(
         //Проверка, если режим продкашн, то выполняем
         app.plugins.if(
            app.isBuild,
            webpHtmlNosvg()
         )
      )
      //Добавление дату и время от кеширования
      .pipe(
         //Проверка, если режим продкашн, то выполняем
         app.plugins.if(
            app.isBuild,
            versionNumber({
               'value': '%DT%',
               'append': {
                  'key': '_v',
                  'cover': 0,
                  'to': [
                     'css',
                     'js'
                  ]
               },
               'output': {
                  'file': 'gulp/version.json'
               }
            })
         )
      )

      //Путь к конечным файлам
      .pipe(app.gulp.dest(app.path.build.html))

      //Команда для обновления страницы в брузере
      .pipe(app.plugins.browserSync.stream());
}