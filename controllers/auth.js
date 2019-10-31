const { promisify } = require('util');
const crypto = require('crypto');

const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  const newUser = await User.create({ name, email, password, confirmPassword });

  const token = signToken(newUser._id);

  newUser.password = undefined;

  res.status(201).json({
    status: 'success',
    token,
    user: newUser
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Check if E-mail and Password Provided
  if (!email || !password) {
    return next(new AppError('E-mail and Password required for login', 400));
  }

  // 2. Check if User exists
  const user = await User.findOne({ email }).select('+password');

  // 3. Check if user has correct password
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Invalid E-mail or Password', 401));
  }

  // Sign Token
  const token = signToken(user._id);

  user.password = undefined;

  res.status(200).json({
    token,
    user
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

  if (!token) {
    return next(
      new AppError('Unauthorized access. Provide a valid token', 401)
    );
  }

  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Find user from decoded token
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

// User updates passwords while logged in
exports.changePassword = catchAsync(async (req, res, next) => {
  // Get user from collectiom
  const user = await User.findById(req.user._id).select('+password');

  // Check if password is correct
  if (!(await user.correctPassword(req.body.password, user.password))) {
    return next(new AppError('Invalid Password', 400));
  }

  // Update if password is correct
  user.password = req.body.newPassword;
  user.confirmPassword = req.body.confirmNewPassword;

  await user.save();

  // Log user in and send JWT
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
    message: 'Your password has been changed'
  });
});

exports.restrictTo = (...roles) => {
  // Check if user in request is in roles provided for route
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You don't have permission to do that", 403));
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Find user
  const user = await User.findOne({ email: req.body.email });

  // Check if user has been found
  if (!user) {
    return next(new AppError('No user found with that E-mail', 404));
  }

  // Generate Random token

  const resetToken = user.generatePasswordToken();
  await user.save({ validateBeforeSave: false });

  // Send token to user's E-mail

  const subject = 'Account Password recovery';

  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/reset-password/${resetToken}`;

  const message = `Someone (hopefully you) requested for a password change. Follow the link to reset your password. 
  Review your account activity if you were not responsible for this action. \n
  ${resetURL}
  `;

  // await sendEmail({ subject, to: user.email, message });
  console.log(resetToken);
  res.status(200).json({
    status: 'success',
    message: 'Reset token sent to user E-mail'
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. Get user from token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  // 2. If token hasn't expired, and user exists, set new password

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) {
    return next(new AppError('Invalid or Expired token', 400));
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpiry = undefined;
  await user.save();

  // 3. Update passwordChangeAt property

  // 4. Send JWT
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token
  });
});
