//Функция для копирования файлов из src в dist
export const copy = () => {
   //Путь к исходным файлам
   return app.gulp.src(app.path.src.files)

      //Путь к конечным файлам
      .pipe(app.gulp.dest(app.path.build.files))
}