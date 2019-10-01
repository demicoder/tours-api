const fs = require('fs');

mongoose = require('mongoose');

const Tour = require('../models/Tour');

const DB = 'natours';

mongoose
  .connect(`mongodb://localhost:27017/${DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {})
  .catch(err => console.log(err));
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

const deleteMany = async () => {
  try {
    await Tour.deleteMany({});
  } catch {
    err => console.log(err);
  }
};

const createMany = async data => {
  try {
    return Tour.create(data);
  } catch (err) {
    console.log(err);
  }
};

deleteMany()
  .then(() => {
    createMany(tours).then(res => {
      console.log(res);
      console.log('Data imported succesfully');
    });
  })
  .catch(err => console.log(err));
