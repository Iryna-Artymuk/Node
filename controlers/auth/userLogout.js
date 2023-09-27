import User from '../../model/users/Users.js';

const userLogout = async (req, res, next) => {
  try {
    const { user } = req; // користувача в req записує міделвара authentication якщо токен валідний
    console.log('user: ', user);

    await User.findByIdAndUpdate(user._id, { token: '' });
    res.json({
      message: 'successfully logout',
    });
  } catch (error) {
    next(error);
  }
};

export default userLogout;
