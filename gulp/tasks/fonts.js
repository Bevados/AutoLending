//Функция для копирования файлов из src в dist
export const copyFonts = () => {
   //Путь к исходным файлам
   return app.gulp.src(app.path.src.fonts)

      //Путь к конечным файлам
      .pipe(app.gulp.dest(app.path.build.fonts));
}