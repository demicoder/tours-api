const catchAsync = require('./../utils/catchAsync');
const AppError = require('./error');

exports.getUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not ready'
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not ready'
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not ready'
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not ready'
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not ready'
  });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        'This route is not for password change. Use /api/v1/forgot-password instead',
        401
      )
    );
  }

  res.status(200).json({
    status: 'success',
    message: 'user details updated'
  });
});
