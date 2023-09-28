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

const emailRegExpr = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, ' forgot to type  is  name'], // поле є обовязковим
    },
    email: {
      unique: true,
      type: String,
      match: emailRegExpr,
      required: [true, ' forgot to type  is  name  emai(('], // поле є обовязковим другий параметр кастомний меседж
    },
    password: {
      type: String,
      required: [true, ' where is   password'], // поле є обовязковим другий параметр кастомний меседж
      minlength: 6,
    },
    token: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

//---ПОМИЛКА --  якщо mongoose повертає помилку він не присвою помилці статус тому всі помилки мають статус 500 і не будуть зрозумілі на фронтенді
//---РІШЕННЯ---  створити mongoose hook який буде розрізняти помилки і передавати вірний статус і повідомлення
// це функція яка буде викликана перед тим як помилка перейде в блок catch ій присвоїться статус і спрацює функція обробки помилок з app.js

userSchema.post('save', handelSchemsErrorStatus);

// створюєм екземпляр класу йому треба передати назву колекції в однині з якою буде працювати цей екземпляр і створену схему
// експортуєм його для використання в контролерах

const User = model('user', userSchema);

export default User;
