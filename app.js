const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const xss = require('xss-clean');
const hpp = require('hpp');

const app = express();

// dotEnv config
dotenv.config({
  path: './config.env'
});

const AppError = require('./utils/appError');
const tourRoute = require('./routes/tour');
const userRoute = require('./routes/user');
const reviewRoute = require('./routes/review');
const globalErrorHandler = require('./controllers/error');

// Secure HTTP headers
app.use(helmet());

// Sanitize user input
app.use(xss());

// Prevent Parameter Pollution
app.use(
  hpp({
    whitelist: [
      'price',
      'duration',
      'ratingQuantity',
      'startDates',
      'maxGroupSize'
    ]
  })
);

// Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit size
app.use(express.json({ limit: process.env.BODY_LIMIT_SIZE }));

// App routes
app.use('/api/v1/users', userRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/reviews', reviewRoute);

// Fallback handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
