import Joi from 'joi'; // бібліотека валідації
import Movie from '../model/movies/movies.js';

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
  // Movie.find() це метод запиту до бази даних 
  try {
    const result = await Movie.find();

    res.json(result);

  } catch (error) {
    next(error);
  }
};
const addMovie = async (req, res, next) => {
  console.log('req.body: ', req.body);

  // дані які пердаються з фрогтенду придодять в req.body ми їх перевіряєм з доп joi
  try {
    // const validateResult = movieAddSchema.validate(req.body);
    // const { error } = validateResult;

    // if (error) throw HttpError(400, error.message);
    // якщо не буде всіх даних  error === true спрацює HttpError(400, validateResult.messages) і код перерветься спрацює функція обробки помилок
    //  error.message буде message з схеми валідації
    const result = await Movie.create (req.body);

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
}

export default {
  getAllMovies,
  addMovie 
};
