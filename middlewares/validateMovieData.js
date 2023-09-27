import { HttpError } from '../helpers/index.js';
import Joi from 'joi'; // бібліотека валідації
//  ----Joi schema to check data from frontend
// it is must match mongoose schema
const JoiMovieAddSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': ` frontend validation error check again  if you  added   movie name `,
  }),
  director: Joi.string().required().messages({
    'any.required': `frontend validation error check again  if you  added  director`,
  }),
  favorite: Joi.boolean(),
  genre: Joi.string()
    .valid('comedy', 'history', 'documentary')
    .required()
    .messages({
      'any.only': ` frontend validation error should be a one  of  'comedy', ' history', 'documentary') `,
    }),

  releaseYear: Joi.string()
    .regex(/^(19|20)\d{2}$/)
    .required()
    .messages({
      'string.pattern.base': `frontend validation error  year must be  between 1900-2099`,
      'any.required':
        'Year should not be empty! check again  if you  added  year',
    }),

});
const VadidateMovieData = (req, res, next) => {
  const validateResult = JoiMovieAddSchema.validate(req.body);
  // console.log('validateResult: ', validateResult);
  const { error } = validateResult;

  if (error) throw HttpError(400, error.message);
  // якщо не буде всіх даних  error === true спрацює HttpError(400, validateResult.messages) і код перерветься спрацює функція обробки помилок
  //  error.message буде message з схеми валідації
  next();
};

export default VadidateMovieData;
