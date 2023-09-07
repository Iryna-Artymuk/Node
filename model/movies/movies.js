// щоб mongoose міг отримати дані з бази даних йому потрібна модель і схема
// схема це опис обєкту в базі
//модель це клас у якого є методи для роботи з базою

import { Schema, model } from 'mongoose';
// ------------create schema ------------
const movieSchema = new Schema({
  title: String,
  director: String,
});

// створюєм екземпляр класу йому треба передати назву колекції в однині з якою буде працювати цей екземпляр і створену схему
// експортуєм його для використання в контролерах

const Movie = model('movie', movieSchema);

export default Movie;
