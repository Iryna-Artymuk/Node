import express from 'express';

const moviesRouter = express.Router(); // створює роутер

import movieСontrolers from '../../controlers/movie_controlers.js';

import { isValidId } from '../../middlewares/index.js';
import { VadidateMovieData } from '../../middlewares/index.js';

moviesRouter.get('/', movieСontrolers.getAllMovies);

moviesRouter.get('/:id', isValidId, movieСontrolers.getMovieByID);

moviesRouter.post('/', VadidateMovieData, movieСontrolers.addMovie);

// moviesRouter.put('/:id', async (req, res, next) => {
//   // ПЕРЕВІРЯЄМ ТІЛО ЗАПИТУ ЧИ ВІДПОВІДАЄ СХЕМІ ВАЛАДАЦІЇ
//   try {
//     const { id } = req.params;
//     const validateResult = movieAddSchema.validate(req.body);
//     const { error } = validateResult;
//     // ЯКЩО НЕ ВСІ ПАРАМЕТРИ ПЕРЕДАДИ ВИКИДАЄМ ПОМИЛКУ
//     if (error) throw HttpError(400, error.message);
//     //ВІДПРАВЛЯЄМ ЗАПИТ ДО БАЗИ ДАНИХ
//     const result = await moviesService.updateMovieById(id, req.body);
//     // ЯКЩО ВІДПОВІДЬ З БЕКЕНДУ NULL СТВОРЮЄМ І ВИКИДАЄМ ПОМИЛКУ EXPRESS ПЕРХОДИТЬ В ФУНКЦІЮ ОБРОБКИ ПОМИЛОК
//     if (!result) {
//       throw HttpError(
//         404,
//         `обєкт з id:${id} не знайдено перевірте чи правильний id `
//       );
//     }
//     // ЯКЩО ВІДПОВІДЬ З БЕКЕНДУ Є,  ВІДПРАВЛЯЄМ ВІДПОВІДЬ НА ФРОНТЕНД
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// moviesRouter.delete('/:id', async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const result = await moviesService.deleteMovieById(id);
//     // ЯКЩО ВІДПОВІДЬ З БЕКЕНДУ NULL СТВОРЮЄМ І ВИКИДАЄМ ПОМИЛКУ EXPRESS ПЕРХОДИТЬ В ФУНКЦІЮ ОБРОБКИ ПОМИЛОК
//     if (!result) {
//       throw HttpError(
//         404,
//         `обєкт з id:${id} не знайдено перевірте чи правильний id `
//       );
//     }
//     // ЯКЩО ТРЕБА ПОВЕРТУТИ СТАТУС 204 І   res.status(204).json(result) НЕ ПРАЦЮЄ БО STATUS 204 НЕ МАЄ BODY
//     // ТОМУ МОЖНА ПИСАТИ
//     // res.status(204).send()

//     res.json({
//       message: 'Delete success',
//     });
//     console.log('result: ', result);
//   } catch (error) {
//     next(error);
//   }
// });

export default moviesRouter;
// імпортуєм в app.js і викорстовуєм в midlewear  app.use("/api/movies", moviesRouter);
// якщо запит на адресу /api/movie функції обробники взяти з обєкту moviesRouter
// така функція у нас написана в app.js
