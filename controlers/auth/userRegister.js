import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import User from '../../model/users/Users.js';

import { HttpError, sendEmail } from '../../helpers/index.js';
dotenv.config();
const { BASE_URL } = process.env;
console.log(' BASE_URL: ', BASE_URL);

const userRegister = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, ` user with email ${email} already exist`);
    }

    // збервгати паролі в базі в оригінальному вигляді небезпечно
    // для надійності перед відправкою даниї в базу прароль хешують можна використовувати пакет bcryptjs

    // використовуємо await томущо bcrypt повертає проміс

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);
    // console.log('hashPassword : ', hashPassword);

    const verificationCode = nanoid();
    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      verificationCode,
    });

    const verifyEmailLink = {
      to: ' irynaartymuk@gmail.com', // list of receivers
      subject: 'Hello from Node.js ', // Subject line
      text: ' Plese verify your  email', // plain text body
      html: `<h1> Register to my  movies app </h1> <a href="${BASE_URL}/api/auth/users/verify/${verificationCode}">  Plese click to  verify your  email    </a>`, //  унікальна адреса роут на бекенді
    };

    sendEmail(verifyEmailLink);
    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

export default userRegister;
