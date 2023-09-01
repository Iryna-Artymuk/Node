import express from "express";
import Joi from "joi";

import moviesService from "../../model/movies/movies.js"; //обєкт методами якого є функції які роблять запит до бази  даних  у нашому випадку це покищо movies.json 


// import {HttpError} from "../../helpers/index.js";

const moviesRouter = express.Router();



moviesRouter.get("/", async(req, res, next)=> {
// moviesService.getAllMovies робить запит до бази даних якщо запит  успішний в result запишеться відповідь список фільмів 
,//res.json(result) відправляє відповідь на фронтенд 
    
    try {
        const result = await moviesService.getAllMovies();
        res.json(result);
    }
    catch(error) {
        next(error);
    }
})

moviesRouter.get("/:id", async(req, res, next)=> {
   
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