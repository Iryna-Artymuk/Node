import Movie from '../../model/movies/movies.js';

import { HttpError } from '../../helpers/index.js';
export default getMovieByID = async (req, res, next) => {
  //   //всі динамічні параметри запиту зберігаються в змінній reg.params
  // console.log('reg.params : ', req.params );
  const { id } = req.params;
  // console.log('id: ', id);
  // пред запитом до бази перевіряєм чи id це валідний id в ьшввдуцфк is validId
  try {
    // Movie.findOne метод запиту до бази який повертає не масив обєктів а один обєкт у якого id в базі співпадає з id який передали з фтонтенду
    // якщо співпадінь немає куігде = null  викидаєм помилку ствтус 400
    const result = await Movie.findOne({ _id: id });

    if (!result) {
      throw HttpError(
        404,
        `обєкт з id:${id} не знайдено перевірте чи правильний id `
      );
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};
