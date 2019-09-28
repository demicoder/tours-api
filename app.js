const fs = require('fs');

const express = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`));

app.get('/api/v1/tours', (req, res) => {
  if (!tours) {
    return res.status(404).json({
      status: 'error',
      messsage: 'tours not found'
    });
  }

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

app.get(`/api/v1/tours/:id`, (req, res) => {
  const tourId = +req.params.id;
  const tour = tours.find(t => t.id === tourId);

  if (!tour) {
    return res.status(404).json({
      status: 'error',
      messsage: 'tour not found'
    });
  }

  res.status(200).json({
    status: 'success',
    tour
  });
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const tourId = req.params.id;
  res.status(200).json({
    status: 'success',
    data: {
      tour: `ID ${tourId} has been updated`
    }
  });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  const tourId = req.params.id;
  res.status(204).json({
      status: 'success'
  });
});

app.listen(3000);
