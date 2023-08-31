const movies = require('../../DB_movies');
const express = require('express');
const moviesRouter = express.Router();
// router це обєкт який зберігає групу маршрутів

moviesRouter.get('/', (req, resp) => {
  resp.json(movies);
  console.log('movies: ', movies);
});
moviesRouter.get('/:id', (req, resp) => {
  resp.json(movies[0]);
});

moviesRouter.post('/', (req, resp) => {
  resp.json(movies[0]);
});
moviesRouter.put('/:id', (req, resp) => {
  resp.json(movies[0]);
});
moviesRouter.delete('/:id', (req, resp) => {
  resp.json(movies[0]);
});

module.exports = moviesRouter;
