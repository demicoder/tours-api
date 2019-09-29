const express = require('express');

const app = express();

app.use(express.json());

const tourRoutes = require('./routes/tours');

app.use(tourRoutes);

app.listen(3000);
