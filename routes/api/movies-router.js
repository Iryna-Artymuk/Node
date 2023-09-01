import express from "express";
import Joi from "joi";

import moviesService from "../../model/movies/movies.js"; //обєкт методами якого є функції які роблять запит до бази  даних  у нашому випадку це покищо movies.json 


// import {HttpError} from "../../helpers/index.js";

const moviesRouter = express.Router(); // створює роутер 



moviesRouter.get("/", async(req, res, next)=> {
// moviesService.getAllMovies робить запит до бази даних якщо запит  успішний в result запишеться відповідь список фільмів 
//res.json(result) відправляє відповідь на фронтенд 
    // обгортаємо код в try catch на випадок якщо не буде зєднання з базою даних 
    try {
      
        const result = await moviesService.getAllMovies();

        res.json(result);
    }
    catch(error) {
        res.status(500).json({
            message:"Server error"
        })
        // next(error);
    }
})

moviesRouter.get("/:id", async(req, res, next)=> {
//всі динамічні параметри запиту зберігаються в змінній reg.params 
// console.log('reg.params : ', req.params );
const {id} = req.params 
// console.log('id: ', id);
    try {
        const result = await moviesService.getMovieById(id);
        // якщо id буде не правильний то moviesService.getMovieById поверне null (так працює база даних )null це не помилка а нам треба щоб коли id не вірний тобто коли база нічого не знайшла треба повертати помилку 
        if (!result){
           // res.status не перриває фннкцію в разі помилки тому треба ставити return щоб код далі не виконувавя коли відповілі з бази немає
          return   res.status(404).json({
                message:`обєкт з id:${id} не знайдено перевірте чи правильний id `
            })
        }     res.json(result);
    
    }
    catch(error) {
        res.status(500).json({
            message:"Server error"
        })
        // next(error);
    }
   
})

moviesRouter.post("/", async(req, res, next)=> {
   
})

moviesRouter.put("/:id", async(req, res, next) => {
   
})

moviesRouter.delete("/:id", async(req, res, next)=> {
    
})

export default moviesRouter; 
// імпортуєм в app.js і викорстовуєм в midlewear  app.use("/api/movies", moviesRouter);
// якщо запит на адресу /api/movie функції обробники взяти з обєкту moviesRouter