const APIfeatures = require('../utils/apiFeatures');
const Tour = require('../models/Tour');
const catchAsync = require('../utils/catchAsync');
const factory = require('./factoryHandler');

exports.aliasTopCheapest = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'ratingAverage,-price,';
  next();
};

exports.getTours = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limit()
    .paginate();

  const tours = await features.query;

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
});

exports.getTour = factory.getOne(Tour, { path: 'reviews' });

exports.updateTour = factory.updateOne(Tour);

exports.deleteTour = factory.deleteOne(Tour);

exports.createTour = factory.createOne(Tour);
