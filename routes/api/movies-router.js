import express from 'express';

const moviesRouter = express.Router(); // створює роутер
import movieСontrolers from '../../controlers/movie_controlers.js';

moviesRouter.get('/', movieСontrolers.getAllMovies);

// moviesRouter.get('/:id', async (req, res, next) => {
//   //всі динамічні параметри запиту зберігаються в змінній reg.params
//   // console.log('reg.params : ', req.params );
//   const { id } = req.params;
//   // console.log('id: ', id);
//   try {
//     const result = await moviesService.getMovieById(id);
//     // якщо id буде не правильний то moviesService.getMovieById поверне null (так працює база даних )null це не помилка а нам треба щоб коли id не вірний тобто коли база нічого не знайшла треба повертати помилку
//     if (!result) {
//       // res.status не перриває фннкцію в разі помилки тому треба ставити return щоб код далі не виконувавя коли відповілі з бази немає
//       //   return   res.status(404).json({
//       //         message:`обєкт з id:${id} не знайдено перевірте чи правильний id `
//       //     })

//       //--variant2 ---
//       // створити помилку самостійно і кикинути її якщо result = null
//       // тоді код переривається і потрапляє в блок catch

//       //         const error= new Error(`обєкт з id:${id} не знайдено перевірте чи правильний id `);
//       // error.status=404;
//       // throw error

//       //--variant3  ---
//       // створити допоміжну функцію helperі і перевикористовувати її
//       throw HttpError(
//         404,
//         `обєкт з id:${id} не знайдено перевірте чи правильний id `
//       );
//     }

//     res.json(result);
//   } catch (error) {
//     // res.status(500).json({
//     //     message:"Server error"
//     // })

//     // деструктуризація обєкта error і присвоєння значення за замовчуванням якщо нічого не передали а помилка виникла статус буде 500
//     //         const { status =500, message="Server error"}=error
//     //           res.status( status).json({
//     //            message,
//     //    })

//     //    якщо в параметр next передати error то express буде продовжувати виконувати код і шукати функцію обробник помилок
//     // функцію обробник помилок  це функція яка має 4 аргументи (з документації express)
//     next(error);
//   }
// });

moviesRouter.post('/', movieСontrolers.addMovie);

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
