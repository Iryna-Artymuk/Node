const getCurrentUser = (req, res) => {
  const { user } = req;
  // обєкт юззер є в req бо міддвара authentication перевіряє токен і якщо він дійснй записує user в обєкт req
  res.json({
    name: user.name,
    email: user.email,
  });
};

export default getCurrentUser;
