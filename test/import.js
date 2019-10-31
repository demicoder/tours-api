const fs = require('fs');

const connectDb = require('./../utils/db');

const Tour = require('../models/Tour');

connectDb();

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

console.log(process.argv);
