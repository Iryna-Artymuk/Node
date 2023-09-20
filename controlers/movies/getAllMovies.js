import Movie from '../../model/movies/movies.js';

const getAllMovies = async (req, res, next) => {
  // Movie.find() це метод запиту до бази даних
  // деструктурихуємо власника id якого ми додали під час авторизації і передаємого його в запит до бази, повернуться тільки ті книги які мають цей id
  const { page = 1, limit = 10, favorite = true } = req.query; // деструктуризуємо параметри пошуку з фронтенду
  // додаємо ці параметри до запиту до БД
  const skip = (page - 1) * limit; // скільки обєктів пропустити з початку
  const { _id: owner } = req.user;
  try {
    // const result = await Movie.find({ owner });
    const result = await Movie.find({ owner }, '-updatedAt -createdAt', {
      skip,
      limit,
    }).populate('owner'); // повязує колекції між собою populate('owner') ,бере рядок populate 'owner' шукає такий ключ в моделі і по ньому повязує з колекцією яка вказана ми вказали "user"

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default getAllMovies;
