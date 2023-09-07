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

export default {
  getAllMovies,
};
