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

const updateMovie = async (req, res, next) => {
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

const deleteMovie = async (req, res, next) => {
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
export default {
  getMovieByID,
  getAllMovies,
  addMovie,
  updateMovie,
  deleteMovie,
};
