import bcrypt from 'bcryptjs';

import User from '../../model/users/Users.js';

import { HttpError } from '../../helpers/index.js';
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
    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

export default userRegister;
