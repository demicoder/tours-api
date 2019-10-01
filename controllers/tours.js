const fs = require('fs');

const Tour = require('./../models/Tour');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`));

exports.getTours = (req, res) => {
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
  Tour.findById(tourId)
    .then(doc => {
      res.status(200).json({
        status: 'success',
        tour: doc
      });
    })
    .catch(err => console.log(err));
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

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(422).json({
      status: 'error',
      message: 'Failed to create a tour'
    });
  }
};
