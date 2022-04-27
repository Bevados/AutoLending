//Плагин для создания webp: npm i -D gulp-webp
//Плагин для сжатия изображения: npm i -D gulp-imagemin

import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
   //Путь к исходным файлам
   return app.gulp.src(app.path.src.images)

      //Обработка ошибок, если нужны уведомления, расскоментировать
      .pipe(app.plugins.plumber(
         // app.plugins.notify.onError({
         //    title: "IMAGES",
         //    message: "Error: <%= error.message %>"
         // })
      ))

      //Проверка обнолений картинок в конечной папке
      .pipe(app.plugins.newer(app.path.build.images))

      //Создание webp изображений
      .pipe(
         //Проверка, если режим продкашн, то выполняем
         app.plugins.if(
            app.isBuild,
            webp()
         )
      )

      //Выгрузка wepb в конечную папку
      .pipe(
         //Проверка, если режим продкашн, то выполняем
         app.plugins.if(
            app.isBuild,
            app.gulp.dest(app.path.build.images)
         )
      )

      //После выгрузки снова получаем доступ к картинкам
      .pipe(
         //Проверка, если режим продкашн, то выполняем
         app.plugins.if(
            app.isBuild,
            app.gulp.src(app.path.src.images)
         )
      )

      //Получив доступ проверяем обновления
      .pipe(
         //Проверка, если режим продкашн, то выполняем
         app.plugins.if(
            app.isBuild,
            app.plugins.newer(app.path.build.images)
         )
      )

      //Сжатие картинок
      .pipe(
         //Проверка, если режим продкашн, то выполняем
         app.plugins.if(
            app.isBuild,
            imagemin({
               progressive: true,
               svgoPlugins: [{ removeViewBox: false }],
               interlaced: true,
               //Уровень сжатия
               optimizationLevel: 3 //от 0 до 7
            })
         )
      )

      //Путь к конечным файлам
      .pipe(app.gulp.dest(app.path.build.images))

      //Получаем доступ к svg и копируем их в конченую папке
      .pipe(app.gulp.src(app.path.src.svg))
      .pipe(app.gulp.dest(app.path.build.images))

      //Команда для обновления страницы в брузере
      .pipe(app.plugins.browserSync.stream());
};