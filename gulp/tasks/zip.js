//Плагин для создания zip: npm i -D gulp-zip

import del from "del";
import zipPlugin from "gulp-zip";

export const zip = () => {
   //Если есть zip архив, удаляем
   del(`./${app.path.rootFolder}.zip`);

   //Путь к папке с результатам, получая все файлы
   return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})

      //Обработка ошибок
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "ZIP",
            message: "Error: <%= error.message %>"
         })
      ))

      //Создаём архив с именем корневой папки
      .pipe(zipPlugin(`${app.path.rootFolder}.zip`))

      //Вывод архива
      .pipe(app.gulp.dest('./'));
}