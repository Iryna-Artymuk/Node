import app from './app.js';
import mongoose from 'mongoose'; // імпортуєм монгус для підключення до бази даних
// const DB_HOST =
//   'mongodb+srv://Ira_Art:6PfXcX0yndb6EXh4@cluster0.mftd0fj.mongodb.net/my_movies?retryWrites=true&w=majority';

// треба пердати строку підключення до бази  іі взяти треба в базі даних вкладка connect dreivers

// ОБОВЯЗКОВО ТРЕБА ВКАЗАТИ НАЗВУ БАЗИ ДО ЯКОЇ ТРЕБА ПІДКЛЮЧИТИСЬ  В ЦЬОМУ ВИПАДКУ ЦЕ my_movies

//mongoose.connect(DB_HOST) повертає проміс тому щоб не запускати сервер коли підключення до бази не успішне викорисовуємо then  catch
const { DB_HOST, PORT = 3000 } = process.env;
// під час деплою на сервері де буде деплоїтись проект бекенду треба в process.env (глобальний обєкт )сервера додати шлях підключення до бази
// в Environment Variables треба додати ключ  DB_HOST і значення строка підключення
mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(4000, () =>
      console.log('Server running sucsesfully connect to DB')
    )
  )
  .catch(error => {
    console.log('can not connect to data bace ');
    process.exit(1); // глобальний обєкт який закриває всі запущені процеси
  });

console.log(process.env); // глобальний обєкт node.js
