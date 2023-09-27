import express from 'express';

const moviesRouter = express.Router(); // створює роутер

import {
  getAllMovies,
  getMovieByID,
  addMovie,
  deleteMovie,
  updateMovie,
} from '../../controlers/movies/index.js';

import { authentication, isValidId, upload } from '../../middlewares/index.js';
import {
  vadidateMovieData,
  vadidateFavorite,
} from '../../middlewares/index.js';

moviesRouter.get('/', authentication, getAllMovies);

moviesRouter.get(
  '/:id',
  authentication,
  authentication,
  isValidId,
  getMovieByID
);

moviesRouter.post(
  '/',
  authentication,

  upload.single('poster'), // from wich fild from form data take file 
  vadidateMovieData,
  addMovie
);

moviesRouter.put(
  '/:id',
  authentication,
  isValidId,
  vadidateMovieData,
  updateMovie
);

moviesRouter.patch(
  '/:id/favorite',
  authentication,
  isValidId,
  vadidateFavorite,
  updateMovie
);
moviesRouter.delete('/:id', authentication, deleteMovie);

export default moviesRouter;
// імпортуєм в app.js і викорстовуєм в midlewear  app.use("/api/movies", moviesRouter);
// якщо запит на адресу /api/movie функції обробники взяти з обєкту moviesRouter
// така функція у нас написана в app.js
