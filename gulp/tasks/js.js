//webpack: npm i -D webpack
//Модуль для импорта js файлов в один js файл: npm i -D webpack-stream

import webpack from "webpack-stream";

export const js = () => {
   //Путь к исходным файлам
   return app.gulp.src(app.path.src.js, {sourcemaps: app.isDev})

      //Обработка ошибок, если нужны уведомления, расскоментировать
      .pipe(app.plugins.plumber(
         // app.plugins.notify.onError({
         //    title: "JS",
         //    message: "Error: <%= error.message %>"
         // })
      ))

      //Импорт js файлов в один js файл
      .pipe(webpack({
         //Режим разработчика взависимости от команды
         mode: app.isBuild ? 'production' : 'development',
         //Файл результат
         output: {
            filename: 'app.min.js',
         }
      }))

      //Путь к конечным файлам
      .pipe(app.gulp.dest(app.path.build.js))

      //Команда для обновления страницы в брузере
      .pipe(app.plugins.browserSync.stream());
};