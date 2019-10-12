const express = require('express');

const app = express();

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
