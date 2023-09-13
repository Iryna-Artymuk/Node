import Movie from '../../model/movies/movies.js';

import { HttpError } from '../../helpers/index.js';

const addMovie = async (req, res, next) => {
  try {
    const result = await Movie.create(req.body);

    if (!result) {
      throw HttpError(
        404,
        `обєкт з id:${id} не знайдено перевірте чи правильний id `
      );
    }
    // перед тим як передавати дані в базу треба перевірити чи обєкт який ми передаєм має всі заповнені поля
    // найчастіше використовується бібліотека joi
    // пернесла валідацію joi в middleware
    // обовязково треба передат на фронтенд статус запиту якщо щось успішно додано це 201 статус
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
export default addMovie ;
