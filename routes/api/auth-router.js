import express from 'express';

// валідація даних
import validateLogInUser from '../../middlewares/validateLogInUser.js';
import validateRegisterUser from '../../middlewares/validateRegisterUser.js';

// запит до бази
import {
  getCurrentUser,
  resendVerifyUserEmail,
  userLogIn,
  userLogout,
  userRegister,
  verifyUserEmail,
} from '../../controlers/auth/index.js';
import authentication from '../../middlewares/authentication.js';
import { validateEmail } from '../../middlewares/index.js';

// створює роутер
const authRouter = express.Router();

authRouter.post('/register', validateRegisterUser, userRegister);
authRouter.post('/login', validateLogInUser, userLogIn);
authRouter.get('/current', authentication, getCurrentUser);
authRouter.post('/logout', authentication, userLogout);
authRouter.get('/verify/:verificationCode', verifyUserEmail);
authRouter.post('/verify', validateEmail, resendVerifyUserEmail); // resent verificatin code

export default authRouter;
