import Movie from '../model/movies/movies.js';

import { HttpError } from '../helpers/index.js';

const getAllMovies = async (req, res, next) => {
  // Movie.find() це метод запиту до бази даних
  try {
    const result = await Movie.find({});

    res.json(result);
  } catch (error) {
    next(error);
  }
};
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

const getMovieByID = async (req, res, next) => {
  //   //всі динамічні параметри запиту зберігаються в змінній reg.params
  // console.log('reg.params : ', req.params );
  const { id } = req.params;
  // console.log('id: ', id);
  try {
    // Movie.findOne метод запиту до бази який повертає не масив обєктів а один обєкт у якого id в базі співпадає з id який передали з фтонтенду
    // якщо співпадінь немає куігде = null  викидаєм помилку ствтус 400
    const result = await Movie.findOne({ _id: id });
    // якщо id буде не правильний то moviesService.getMovieById поверне null (так працює база даних )null це не помилка а нам треба щоб коли id не вірний тобто коли база нічого не знайшла треба повертати помилку
    if (!result) {
      // res.status не перриває фннкцію в разі помилки тому треба ставити return щоб код далі не виконувавя коли відповілі з бази немає
      //return   res.status(404).json({
      //message:`обєкт з id:${id} не знайдено перевірте чи правильний id `})

      //--variant2 ---
      // створити помилку самостійно і кикинути її якщо result = null
      // тоді код переривається і потрапляє в блок catch

      // const error= new Error(`обєкт з id:${id} не знайдено перевірте чи правильний id `);
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
    next(error);
    //    якщо в параметр next передати error то express буде продовжувати виконувати код і шукати функцію обробник помилок
    // функцію обробник помилок  це функція яка має 4 аргументи (з документації express)
  }
};

export default {
  getMovieByID,
  getAllMovies,
  addMovie,
};
