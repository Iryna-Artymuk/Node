import Movie from '../../model/movies/movies.js';
export default getAllMovies = async (req, res, next) => {
  // Movie.find() це метод запиту до бази даних
  try {
    const result = await Movie.find({});

    res.json(result);
  } catch (error) {
    next(error);
  }
};
