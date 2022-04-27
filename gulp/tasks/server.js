//Функция запуска локального сервера

export const server = (done) => {
   app.plugins.browserSync.init({
      server: {
         //Базовая папка с результатом проекта с отслеживанием html
         baseDir: `${app.path.build.html}`
      },
      //Убираем сообщения в браузере
      notify: false,
      //Порт для сервера
      port: 3000
   });
};