const fs = require('fs');
const path = require('path');

const Tour = require('./../models/Tour');
const Review = require('./../models/Review');
const User = require('./../models/User');
const connectDb = require('./../utils/db');

const read = file => {
  const fileContents = JSON.parse(
    fs.readFileSync(path.join(__dirname, `${file}.json`))
  );
  return fileContents;
};

connectDb('vakate');

const deleteData = async () => {
  try {
    await Tour.deleteMany({});
    await Review.deleteMany({});
    await User.deleteMany({});
    console.log('Test data deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const importData = async () => {
  const tours = read('tours');
  try {
    await Tour.create(tours);
    console.log('Test data nicely imported');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') importData();
if (process.argv[2] === '--delete') deleteData();
