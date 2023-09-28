import HttpError from '../../helpers/httpError.js';
import User from '../../model/users/Users.js';

const verifyUserEmail = async (req, res, next) => {
  try {
    // беремо  код верифікації  з рядка запиту і

    const { verificationCode } = req.params;
    // превіряєм чи є в базі користувач з таким кодом

    const user = await User.findOne({ verificationCode });
    console.log(' user: ', user);

    if (!user) {
      throw HttpError(404, ` user not found can't verify unexist user`);
    }
    // якщо користувач є оновюємо поле verify
    await User.findOneAndUpdate(user._id, {
      verify: true,
      verificationCode: '',
    });
    res.status(200).json({
      messege: 'email verified',
    });
  } catch (error) {
    next(error);
  }
};

export default verifyUserEmail;
