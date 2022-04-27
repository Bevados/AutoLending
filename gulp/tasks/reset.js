//Установка плагина удаления конечной папки: npm i -D del

//Функция удаления конечной папки
import del from "del";
export const reset = () => {
   return del(app.path.clean);
}