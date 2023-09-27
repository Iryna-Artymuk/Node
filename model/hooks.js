export const handelSchemsErrorStatus = (error, data, next) => {
  // деструктуризуємо з помики імя і код якщо помилка валідація відправляєм 400 статус якщо помилка унікальності поля це статус 409
  // ці дані потрапляють в функцію бробки помилок і на фронтенд відправляється потрвбний статус і повідомлення
  const { name, code } = error;

  error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  //так краще не писати бо хук handelSchemsErrorStatus є перевикористовуваним для віх mongoose моделей
  // error.message =
  //   name === 'MongoServerError' && code === 11000
  //     ? `user with email  ${email}  already exist `
  //     : error.message;
  next();
};
