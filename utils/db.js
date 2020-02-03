const mongoose = require('mongoose');

const connectDB = async db => {
  await mongoose.connect(`mongodb://localhost:27017/${db}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
};

module.exports = connectDB;
