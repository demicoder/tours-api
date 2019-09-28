const fs = require('fs');

const express = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`));

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = +[tours.length] + 1;

  const newTour = Object.assign({ id: newId }, req.body);

  const updatedTours = [...tours, newTour];

  fs.writeFile(
    `${__dirname}/data/tours.json`,
    JSON.stringify(updatedTours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
});

app.listen(3000);
