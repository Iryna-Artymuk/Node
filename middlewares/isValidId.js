import { isValidObjectId } from 'mongoose';

// перед тим як робити запит до DB треба перевірити чи id що приходить з фронотенду це ID чи ні  для цього в mongoose є функція якій треба предати id вона поверне true або false якщо true викликаєм  next() виконуються всі наступні функції якщо false викидаємо помилку

// Викликаєм цю middlewar в усіх routs де є id
import { HttpError } from '../helpers/index.js';

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(HttpError(404, ` this is ${id} does not looks like  id`));
  }
  next();
};

export default isValidId;
