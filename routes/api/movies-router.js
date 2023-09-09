import express from 'express';

const moviesRouter = express.Router(); // створює роутер

import movieСontrolers from '../../controlers/movie_controlers.js';

import { isValidId } from '../../middlewares/index.js';
import {
  vadidateMovieData,
  vadidateFavorite,
} from '../../middlewares/index.js';

moviesRouter.get('/', movieСontrolers.getAllMovies);

moviesRouter.get('/:id', isValidId, movieСontrolers.getMovieByID);

moviesRouter.post('/', vadidateMovieData, movieСontrolers.addMovie);

moviesRouter.put(
  '/:id',
  isValidId,
  vadidateMovieData,
  movieСontrolers.updateMovie
);

moviesRouter.patch(
  '/:id/favorite',
  isValidId,
  vadidateFavorite,
  movieСontrolers.updateMovie
);
moviesRouter.delete('/:id', movieСontrolers.deleteMovie);

export default moviesRouter;
// імпортуєм в app.js і викорстовуєм в midlewear  app.use("/api/movies", moviesRouter);
// якщо запит на адресу /api/movie функції обробники взяти з обєкту moviesRouter
// така функція у нас написана в app.js
