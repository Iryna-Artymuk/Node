import Movie from '../../model/movies/movies.js';

import { HttpError } from '../../helpers/index.js';

export default updateMovie = async (req, res, next) => {
  //  В  vadidateMovieData MIDDELWARE ПЕРЕВІРЯЄМ ТІЛО ЗАПИТУ ЧИ ВІДПОВІДАЄ СХЕМІ ВАЛАДАЦІЇ
  //  В  isValidId MIDDELWARE ПЕРЕВІРЯЄМ XB ID ЦЕ ID

  const { id } = req.params;
  try {
    //ВІДПРАВЛЯЄМ ЗАПИТ ДО БАЗИ ДАНИХ
    const result = await Movie.findOneAndUpdate(
      { _id: id }, // id
      { ...req.body }, // те що треба обновити
      {
        new: true,
        runValidators: true,
      }
    );
    // { new: true } база повертає оновлений обєккт
    //   runValidators: true, включає mongoose валідацію за замовчуванням для методу findByIdAndUpdate вона відсутня

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
};
