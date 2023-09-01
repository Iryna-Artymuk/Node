import express from "express";
import logger from "morgan"; 
import cors from "cors";  

import moviesRouter from "./routes/api/movies-router.js";


const app = express(); // створює роутер 

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
 // --middlware--
app.use(logger(formatsLogger))  // виводить в консоль інфо про запит 
app.use(cors())  // дозволяє крос доменні запит
app.use(express.json())

// при запиті на адресу "/api/movies" фонкції обробники взяти з цьго обєкту moviesRouter
app.use("/api/movies", moviesRouter);

 // middleware яка оброблює відповідь з помилкою замість розмітки налсилає обєкт з повідомлення 
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})






export default app

