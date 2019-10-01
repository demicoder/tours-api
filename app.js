const express = require('express');

const app = express();

app.use(express.json());

const tourRoutes = require('./routes/tours');
const userRoutes = require('./routes/users');

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tours', tourRoutes);

module.exports = app;
