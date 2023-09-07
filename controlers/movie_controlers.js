import Joi from 'joi'; // бібліотека валідації

import moviesService from '../model/movies/movies.js'; //обєкт методами якого є функції які роблять запит до баз/и  даних  у нашому випадку це покищо movies.json

import { HttpError } from '../helpers/index.js';
const movieAddSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': `check again  if you  added   movie name `,
  }),
  director: Joi.string().required().messages({
    'any.required': `check again  if you  added  directot `,
  }),
});

const getAllMovies = async (req, res, next) => {
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
};

export default {
  getAllMovies,
};
