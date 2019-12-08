const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');

const app = express();

// dotEnv config
dotenv.config({
  path: './config.env'
});

const AppError = require('./utils/appError');
const viewRoutes = require('./routes/views');
const tourRoute = require('./routes/tour');
const userRoute = require('./routes/user');
const reviewRoute = require('./routes/review');
const globalErrorHandler = require('./controllers/error');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Number of limits per interval
const limit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: process.env.REQUESTS_PER_HOUR,
  message: 'Too many requests from this IP address, try again later.'
});

app.use('/api', limit);

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
app.use('/', viewRoutes);
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
