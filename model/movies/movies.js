// щоб mongoose міг отримати дані з бази даних йому потрібна модель і схема
// схема це опис обєкту в базі
//модель це клас у якого є методи для роботи з базою

// ------------create schema ------------
import { Schema, model } from 'mongoose';
import { handelSchemsErrorStatus } from '../hooks.js';
// monggose  Schema це аналог схеми валідації joi відрізняється тим що іі не можна обійти так як вона є частиною моделі
// в схемі детально описується як повинен виглядати обєкт в базі даних
// створити обєкт де перелічити всі вимоги до поля
// -------mongoose  vadidation schema ---------last check before sendind to DB
const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true, // поле є обовязковим
    },
    director: {
      type: String,
      required: [true, ' where is director?????'], // поле є обовязковим другий параметр кастомний меседж
    },
    favourite: {
      type: Boolean,
      default: false, // якщо з фротенду значення не передатуть то воно по дефолту буде false
    },
    genre: {
      type: String,
      enum: ['comedy', ' history', 'documentary'], // значення має відповідати одному з значкнь з масиву
      required: true, // поле є обовязковим
    },
    releaseYear: {
      type: String,
      match: /^(19|20)\d{2}$/, // значення має відповідати регуряреому виразу  years 1900-2099
      required: true, // поле є обовязковим
    },
  },
  { versionKey: false, timestamps: true }
);

// якщо валідація по mongoose schema не пройдена mongoose викидає помилку  спрацьовує catch з контролера і викликає функцію обробки помилок
//---ПОМИЛКА -- mongoose не присвою помилці статус тому всі помилки мають статус 500 і не будуть зрозумілі на фронтенді
//---РІШЕННЯ---  викликати спеціальний mongoose hook
// це функція яка буде викликана перед тим як помилка перейде в блок catch ій присвоїться статус і спрацює функція обробки помилок з app.js

movieSchema.post('save', handelSchemsErrorStatus);

// створюєм екземпляр класу йому треба передати назву колекції в однині з якою буде працювати цей екземпляр і створену схему
// експортуєм його для використання в контролерах

const Movie = model('movie', movieSchema);

export default Movie;
