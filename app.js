const express = require('express');

const dotenv = require('dotenv');

const morgan = require('morgan');

const app = express();

dotenv.config({
  path: './config.env'
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

const AppError = require('./utils/appError');
const tourRoutes = require('./routes/tour');
const userRoutes = require('./routes/user');
const globalErrorHandler = require('./controllers/error');

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tours', tourRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
