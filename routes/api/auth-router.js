import express from 'express';

// валідація даних
import validateLogInUser from '../../middlewares/validateLogInUser.js';
import validateRegisterUser from '../../middlewares/validateRegisterUser.js';

// запит до бази
import { userRegister } from '../../controlers/auth/index.js';

// створює роутер
const authRouter = express.Router();

authRouter.post('/register', validateRegisterUser, userRegister);
authRouter.get('/login', validateLogInUser, userRegister);

export default authRouter;
