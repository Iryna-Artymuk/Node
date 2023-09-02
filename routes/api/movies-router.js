import express from 'express';
import Joi from 'joi'; // бібліотека валідації

import moviesService from '../../model/movies/movies.js'; //обєкт методами якого є функції які роблять запит до бази  даних  у нашому випадку це покищо movies.json

import { HttpError } from '../../helpers/index.js';

const moviesRouter = express.Router(); // створює роутер

// -----------------схема валідації----------------

const movieAddSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': `check again  if you  added   movie name `,
  }),
  director: Joi.string().required().messages({
    'any.required': `check again  if you  added  directot `,
  }),
});
moviesRouter.get('/', async (req, res, next) => {
  // moviesService.getAllMovies робить запит до бази даних якщо запит  успішний в result запишеться відповідь список фільмів
  //res.json(result) відправляє відповідь на фронтенд
  // обгортаємо код в try catch на випадок якщо не буде зєднання з базою даних
  try {
    const result = await moviesService.getAllMovies();

    res.json(result);
  } catch (error) {
    // res.status(500).json({
    //     message:"Server error"
    // })

    // --------ОПТИМІЗАЦІЯ----------
    //    якщо в параметр next передати error то express буде продовжувати виконувати код і шукати функцію обробник помилок
    // функцію обробник помилок  це функція яка має 4 аргументи (з документації express)
    next(error);
  }
});

moviesRouter.get('/:id', async (req, res, next) => {
  //всі динамічні параметри запиту зберігаються в змінній reg.params
  // console.log('reg.params : ', req.params );
  const { id } = req.params;
  // console.log('id: ', id);
  try {
    const result = await moviesService.getMovieById(id);
    // якщо id буде не правильний то moviesService.getMovieById поверне null (так працює база даних )null це не помилка а нам треба щоб коли id не вірний тобто коли база нічого не знайшла треба повертати помилку
    if (!result) {
      // res.status не перриває фннкцію в разі помилки тому треба ставити return щоб код далі не виконувавя коли відповілі з бази немає
      //   return   res.status(404).json({
      //         message:`обєкт з id:${id} не знайдено перевірте чи правильний id `
      //     })

      //--variant2 ---
      // створити помилку самостійно і кикинути її якщо result = null
      // тоді код переривається і потрапляє в блок catch

      //         const error= new Error(`обєкт з id:${id} не знайдено перевірте чи правильний id `);
      // error.status=404;
      // throw error

      //--variant3  ---
      // створити допоміжну функцію helperі і перевикористовувати її
      throw HttpError(
        404,
        `обєкт з id:${id} не знайдено перевірте чи правильний id `
      );
    }

    res.json(result);
  } catch (error) {
    // res.status(500).json({
    //     message:"Server error"
    // })

    // деструктуризація обєкта error і присвоєння значення за замовчуванням якщо нічого не передали а помилка виникла статус буде 500
    //         const { status =500, message="Server error"}=error
    //           res.status( status).json({
    //            message,
    //    })

    //    якщо в параметр next передати error то express буде продовжувати виконувати код і шукати функцію обробник помилок
    // функцію обробник помилок  це функція яка має 4 аргументи (з документації express)
    next(error);
  }
});

moviesRouter.post('/', async (req, res, next) => {
  console.log('req.body: ', req.body);

  // дані які пердаються з фрогтенду придодять в req.body
  try {
    const validateResult = movieAddSchema.validate(req.body);
    const { error } = validateResult;

    if (error) throw HttpError(400, error.message);
    // якщо не буде всіх даних  error === true спрацює HttpError(400, validateResult.messages) і код перерветься спрацює функція обробки помилок
    //  error.message буде message з схеми валідації
    const result = await moviesService.addMovie(req.body);

    if (!result) {
      throw HttpError(
        404,
        `обєкт з id:${id} не знайдено перевірте чи правильний id `
      );
    }
    // перед тим як передавати дані в базу треба перевірити чи обєкт який ми передаєм має всі заповнені поля
    // найчастіше використовується бібліотека joi
    // обовязково треба передат на фронтенд статус запиту якщо щось успішно додано це 201 статус
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

moviesRouter.put('/:id', async (req, res, next) => {
  // ПЕРЕВІРЯЄМ ТІЛО ЗАПИТУ ЧИ ВІДПОВІДАЄ СХЕМІ ВАЛАДАЦІЇ
  try {
    const { id } = req.params;
    const validateResult = movieAddSchema.validate(req.body);
    const { error } = validateResult;
    // ЯКЩО НЕ ВСІ ПАРАМЕТРИ ПЕРЕДАДИ ВИКИДАЄМ ПОМИЛКУ
    if (error) throw HttpError(400, error.message);
    //ВІДПРАВЛЯЄМ ЗАПИТ ДО БАЗИ ДАНИХ
    const result = await moviesService.updateMovieById(id, req.body);
    // ЯКЩО ВІДПОВІДЬ З БЕКЕНДУ NULL СТВОРЮЄМ І ВИКИДАЄМ ПОМИЛКУ EXPRESS ПЕРХОДИТЬ В ФУНКЦІЮ ОБРОБКИ ПОМИЛОК
    if (!result) {
      throw HttpError(
        404,
        `обєкт з id:${id} не знайдено перевірте чи правильний id `
      );
    }
    // ЯКЩО ВІДПОВІДЬ З БЕКЕНДУ Є,  ВІДПРАВЛЯЄМ ВІДПОВІДЬ НА ФРОНТЕНД
    res.json(result);
  } catch (error) {
    next(error);
  }
});

moviesRouter.delete('/:id', async (req, res, next) => {});

export default moviesRouter;
// імпортуєм в app.js і викорстовуєм в midlewear  app.use("/api/movies", moviesRouter);
// якщо запит на адресу /api/movie функції обробники взяти з обєкту moviesRouter
// така функція у нас написана в app.js
