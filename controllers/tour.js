const fs = require('fs');

const path = require('path');

const tours = JSON.parse(fs.readFileSync( path.join(__dirname,  '../data', 'tours.json')));

exports.getTours = (req, res) => {
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
};

exports.getTour = (req, res) => {
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
};

exports.updateTour = (req, res) => {
  const tourId = req.params.id;
  res.status(200).json({
    status: 'success',
    data: {
      tour: `ID ${tourId} has been updated`
    }
  });
};

exports.deleteTour = (req, res) => {
  const tourId = req.params.id;
  res.status(204).json({
    status: 'success'
  });
};

exports.createTour = (req, res) => {
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
};
