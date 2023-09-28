import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';

import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

import User from '../../model/users/Users.js';

import { HttpError, sendEmail } from '../../helpers/index.js';
dotenv.config();
const { BASE_URL } = process.env;
console.log(' BASE_URL: ', BASE_URL);

const userRegister = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log('user : ', user);
    if (user) {
      throw HttpError(409, ` user with email ${email} already exist`);
    }

    // збервгати паролі в базі в оригінальному вигляді небезпечно
    // для надійності перед відправкою даниї в базу прароль хешують можна використовувати пакет bcryptjs

    // використовуємо await томущо bcrypt повертає проміс

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);
    // console.log('hashPassword : ', hashPassword);



    // ------------verification email ----------------
    const verificationCode = nanoid();
    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      verificationCode,
    });
    // ------------create email from template----------------

    const emailTemplatePath = path.resolve(
      'templates',
      'verifycationEmail.html'
    );
    const source = fs.readFileSync(emailTemplatePath, 'utf-8').toString();
    //Compile the template data into a function
    const template = handlebars.compile(source);
    const replacements = {
      username: newUser.name,
      verificationLink: `${BASE_URL}/api/auth/users/verify/${verificationCode}`,
    };
       // add context to dynamic variables
    const htmlToSend = template(replacements);

    const dataToSend = {
      to: ' irynaartymuk@gmail.com', // list of receivers
      subject: 'verify your email ', // Subject line
      text: ' Plese verify your email', // plain text body
      html: htmlToSend,
    };
    sendEmail(dataToSend);

    // send response to frontend 
    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

export default userRegister;
