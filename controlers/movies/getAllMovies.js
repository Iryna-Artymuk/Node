import Movie from '../../model/movies/movies.js';

const getAllMovies = async (req, res, next) => {
  // Movie.find() це метод запиту до бази даних
  // деструктурихуємо власника id якого ми додали під час авторизації і передаємого його в запит до бази, повернуться тільки ті книги які мають цей id
  const { _id: owner } = req.user;
  try {
    // const result = await Movie.find({ owner });
    const result = await Movie.find(
      { owner },
      '-updatedAt -createdAt'
    ).populate('owner');

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default getAllMovies;
