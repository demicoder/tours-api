const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(`mongodb://localhost:27017/${process.env.DB}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
};

module.exports = connectDB;
