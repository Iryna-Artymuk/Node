const express = require("express");
// -------------- щоб створити веб сервер його треба імпортувати з npm пакету і викликати як функцію -----------
const app = express(); // app - веб-сервер
// -----список зпитів які буде обробляти веб сервер та давати відповідь 

 const movies = require("./DB_movies")
//  const movies = null;

//  console.log('movies: ', movies);
// першим аргументм примає шлях куди 
// другим callback функцію яка надсилає відповідь на frontend 
// app.set("json spaces", 10)
app.get("/movies",(req,resp)=>{

    // resp.send(movies )

    // краще використовувати  метод resp.json()
    // він привильно відсилає на фротнтетд null 

    resp.json(movies)
  
  

})




















//  --------------------- порт на якому буде запущений веб сервер --------------------
app.listen(4000, ()=> console.log("Server running on port 4000"));