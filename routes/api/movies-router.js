import express from 'express';

const moviesRouter = express.Router(); // створює роутер

import { getAllMovies,getMovieByID,  addMovie,deleteMovie, updateMovie} from '../../controlers/movies/index.js';

import { isValidId } from '../../middlewares/index.js';
import {
  vadidateMovieData,
  vadidateFavorite,
} from '../../middlewares/index.js';

moviesRouter.get('/', getAllMovies);

moviesRouter.get('/:id', isValidId, getMovieByID);

moviesRouter.post('/', vadidateMovieData, addMovie);

moviesRouter.put(
  '/:id',
  isValidId,
  vadidateMovieData,
 updateMovie
);

moviesRouter.patch(
  '/:id/favorite',
  isValidId,
  vadidateFavorite,
updateMovie
);
moviesRouter.delete('/:id',deleteMovie);

export default moviesRouter;
// імпортуєм в app.js і викорстовуєм в midlewear  app.use("/api/movies", moviesRouter);
// якщо запит на адресу /api/movie функції обробники взяти з обєкту moviesRouter
// така функція у нас написана в app.js
