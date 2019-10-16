const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 404);
};

const handleDuplicateError = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/);
  const message = `Duplicate field value: ${value}. Use another value`;
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Invalid token! Login again', 401);

const handleJWTExpireError = () =>
  new AppError('Your login has expired! Login again', 401);

const handleValidationError = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')} `;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    console.error('ERROR', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.ENV === 'production') {
    let error = { ...err };

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateError(error);
    if (error.name === 'ValidatorError') error = handleValidationError(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpireError();

    sendErrorProd(error, res);
  }
};
