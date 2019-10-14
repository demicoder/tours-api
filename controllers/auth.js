const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const catchAsync = require('./../utils/catchAsync');

exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  const newUser = await User.create({ name, email, password, confirmPassword });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(201).json({
    status: 'success',
    user: newUser,
    token
  });
});
