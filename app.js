import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';
import moviesRouter from './routes/api/movies-router.js';
import authRouter from './routes/api/auth-router.js';
import sendEmail from './helpers/sendEmail.js';

const app = express(); // створює роутер

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
// --middlware--
app.use(logger(formatsLogger)); // виводить в консоль інфо про запит
app.use(cors()); // дозволяє крос доменні запит
app.use(express.json()); // перевіряє всі запити якщо в hedears вказано application/json і в body запиту є дані воно пертворює дані в json формат і пердає в зміцнну req
app.use(express.urlencoded({ extended: false })); //може читати форми
app.use(express.static(path.resolve('public', 'images'))); // з шляху до файлу треба прибрати 'public', 'images'
// при запиті на адресу "/api/movies" фонкції обробники взяти з цьго обєкту moviesRouter
app.use('/api/movies', moviesRouter);
app.use('/api/auth/users', authRouter);

// middleware яка оброблює відповідь з помилкою замість розмітки налсилає обєкт з повідомлення
app.use((req, res) => {
  res.status(404).json({ message: ' route Not found' });
});

app.use((err, req, res, next) => {
  console.log('err: ', err);

  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

// const testData = {
//   to: ' irynaartymuk@gmail.com', // list of receivers
//   subject: 'Hello from Node.js ', // Subject line
//   text: ' Test email', // plain text body
//   html: '<b>Hello world?</b>  <h1> Test email from GoIT Node.js </h1> <p> Nodemailer - це єдиний модуль з нульовими залежностями для Node.js, призначений для надсилання електронних листів. Його основні функції включають (але не обмежуються ними) незалежність від платформи безпека, зокрема, доставка електронної пошти з TLS/STARTTLS та DKIM автентифікацією електронної пошти Підтримка Unicode HTML-контент та вкладені зображенн різні транспортні методи, крім підтримки SMTP. </p>', // html body
// };

// sendEmail(testData);
export default app;
