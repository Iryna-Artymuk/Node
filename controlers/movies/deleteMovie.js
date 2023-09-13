import Movie from '../../model/movies/movies.js';

import { HttpError } from '../../helpers/index.js';

export default deleteMovie = async (req, res, next) => {
  // ЩОБ ВИДАЛИТИ ОБЄКТ З БАЗИ ТРЕБА  В  MONGOOSE MODEL ВИКЛИКАТИ findByIdAndDelete(id);
  const { id } = req.params;
  try {
    const result = await Movie.findByIdAndDelete(id);
    // ЯКЩО ВІДПОВІДЬ З БЕКЕНДУ NULL СТВОРЮЄМ І ВИКИДАЄМ ПОМИЛКУ EXPRESS ПЕРХОДИТЬ В ФУНКЦІЮ ОБРОБКИ ПОМИЛОК
    if (!result) {
      throw HttpError(
        404,
        `обєкт з id:${id} не знайдено перевірте чи правильний id `
      );
    }
    // ЯКЩО ТРЕБА ПОВЕРТУТИ СТАТУС 204 І   res.status(204).json(result) НЕ ПРАЦЮЄ БО STATUS 204 НЕ МАЄ BODY
    // ТОМУ МОЖНА ПИСАТИ
    // res.status(204).send()

    res.json({
      message: 'Delete success',
    });
    console.log('result: ', result);
  } catch (error) {
    next(error);
  }
};
