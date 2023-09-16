// ця фннкція буде перевіряти токет який фронтенд буде прикріплювати в запиті на приватні маршрути якщо токен валідний буде наланий доступації  до контролерів якщо ні повернеться помилка аворизації

// вставляєм цю міделвару в той маршрут який ми хочем зробити приватними

import jwt from 'jsonwebtoken'; // npm pkg який створював токен
import { HttpError } from '../helpers/index.js';
import dotenv from 'dotenv';
import User from '../model/users/Users.js';

dotenv.config();
const { JWT_SECRET_KEY } = process.env; // секретний ключ який підписував токен

const authentication = async (req, res, next) => {
  try {
    // токен який будем перевіряти приходить з фронтенду в заголовках вся інфо про запит знаходитьсч в req.headers

    //приходить рядок в якому перше слово bearer друге токен щоб розділити використовуємо деструктуризацію рядка

    const { authorization =""} = req.headers;

    const [bearer, token] = authorization?.split(' ');
    //   console.log('token: ', token);
    if (!bearer === 'Bearer') return next(HttpError(401));

    // перевіряєм чи токен валідний
    try {
      const payload = jwt.verify(token, JWT_SECRET_KEY); //якщо токен валідний в відповідь прийде {}payload який ми передавали в токені можем деструктуризувати ці дані, ми в login в токені шифрували id
      console.log(' payload : ', payload);

      const { id } = payload;

      // перевіряєм чи є в базі користувач з таким id
      const existUser = await User.findById(id);
      if (!existUser) {
        return next(HttpError(401), 'User not found ');
      }
      // якщо користувач є пердаєм управління дал
      next();
    } catch (error) {
      next(HttpError(401));
    }
  } catch (error) {
    next(error);
  }
};

export default authentication;
