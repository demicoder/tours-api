const { promisify } = require('util');

const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  const newUser = await User.create({ name, email, password, confirmPassword });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError('E-mail and Password required for login', 400));

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Invalid E-mail or Password', 401));

  const token = signToken(user._id);

  res.status(200).json({
    token
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // Check for token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token)
    return next(
      new AppError('Unauthorized access. Provide a valid token', 401)
    );

  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshUser = await User.findById(decoded.id);

  // Check if user still exists
  if (!freshUser) return next(new AppError('User no longer exists', 401));

  // Check if user has changed password

  if (freshUser.changedPasswordAfter(decoded.iat))
    return next(
      new AppError(
        'You recently changed your password, login with the new password',
        401
      )
    );

  // Grant Access 🔓
  req.user = freshUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You don't have permission to do that", 403));
    }
    next();
  };
};
