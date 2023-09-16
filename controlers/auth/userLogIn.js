import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // додає змінні з файлу env до глобального обєкту process.env
const { JWT_SECRET_KEY } = process.env;

import User from '../../model/users/Users.js';

import { HttpError } from '../../helpers/index.js';
const userLogIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // первіряємо чи є користувач в базі
    const user = await User.findOne({ email });
    if (!user) throw HttpError(401, 'User with this emais  not found ');
    console.log('userID: ', user._id);

    // якщо користувач true порівнюємо пароль з бази з тим що надав фротненд

    const comparePassword = await bcrypt.compare(password, user.password);
    console.log(' comparePassword', comparePassword);
    if (!comparePassword) {
      throw HttpError(401, 'email or passwor is incorrect ');
    }

    // якщо пароль вірний з бази берем ID користувача і використовуємо його для створення  payload і токену
    // щоб створити  токен треба викликати метод sing і передати payload i секретний ключ для шифрування підпису
    const payload = { id: user._id };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '23h' });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
export default userLogIn;
