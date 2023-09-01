import express from "express";
import Joi from "joi";

import moviesService from "../../model/movies/movies.js"; //обєкт методами якого є функції які роблять запит до бази  даних  у нашому випадку це покищо movies.json 


// import {HttpError} from "../../helpers/index.js";

const moviesRouter = express.Router();



moviesRouter.get("/", async(req, res, next)=> {
     
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
