const movies = require('../../DB_movies');
const express = require('express');
const moviesRouter = express.Router();
// router це обєкт який зберігає групу маршрутів

moviesRouter.app.get('/api/movies', (req, resp) => {
  resp.json(movies);
  console.log('movies: ', movies);
});
moviesRouter.app.get('/api/movies/:id', (req, resp) => {
  resp.json(movies[0]);
});

moviesRouter.app.post('/api/movies', (req, resp) => {
  resp.json(movies[0]);
});
moviesRouter.app.put('/api/movies/:id', (req, resp) => {
  resp.json(movies[0]);
});
moviesRouter.app.delete('/api/movies/:id', (req, resp) => {
  resp.json(movies[0]);
});

// module.exports {moviesRouter};
