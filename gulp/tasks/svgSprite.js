//Плагин для создания svg спрайта: npm i -D gulp-svg-sprite

import svgSpritePlugin from "gulp-svg-sprite";

export const svgSprite = () => {
   //Путь к исходным файлам
   return app.gulp.src(app.path.src.svgicons)

      //Обработка ошибок, если нужны уведомления, расскоментировать
      .pipe(app.plugins.plumber(
         // app.plugins.notify.onError({
         //    title: "SVG",
         //    message: "Error: <%= error.message %>"
         // })
      ))

      .pipe(svgSpritePlugin({
         mode: {
            stack: {
               sprite: `../icons/icons.svg`,

               //Создавать страцницу с перечнем иконок true/false
               example: true
            }
         }
      }))

      //Путь к конечным файлам
      .pipe(app.gulp.dest(app.path.build.images));
};