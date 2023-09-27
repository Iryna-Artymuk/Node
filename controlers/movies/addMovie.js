import path from 'path';
import fs from 'fs/promises';
import Movie from '../../model/movies/movies.js';

import { HttpError } from '../../helpers/index.js';

// щоб перемістити постер з папки temp to public використовують пакет fs.rename йому треба передати старий шлях до файлу включаючи імя і новий  якщо шляхи різні fs перйменує файл і перемістить . старий шлях берем з req.files   цей обєкт створила мідлвара multer при розборі form data. новий шлях створюємо самі вирішуючи де зберігати файли

const addMovie = async (req, res, next) => {
  try {
    const { user } = req;
    // console.log('user: ', user);
    const { _id: ownerId } = user;
    const { path: oldPath, filename } = req.file; // file створила мідлвара multer
    const postersPath = path.resolve('public', 'images', 'posters');
    const newPath = path.join(postersPath, filename);
    await fs.rename(oldPath, newPath);
    const poster = path.join('posters', filename); // шлях до файлу який ми будем зберігати в БД він повинен бути відносно серверу
    const result = await Movie.create({ ...req.body, owner: ownerId, poster });
    console.log('result: ', result);

    if (!result) {
      throw HttpError(
        404,
        `обєкт з id:${id} не знайдено перевірте чи правильний id `
      );
    }
    // перед тим як передавати дані в базу треба перевірити чи обєкт який ми передаєм має всі заповнені поля
    // найчастіше використовується бібліотека joi
    // пернесла валідацію joi в middleware
    // обовязково треба передат на фронтенд статус запиту якщо щось успішно додано це 201 статус
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
export default addMovie;
