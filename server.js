const dotenv = require('dotenv');

dotenv.config({
  path: './config.env'
});

mongoose = require('mongoose');

const app = require('./app');

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception');
  server.close(() => {
    process.exit(1);
  });
});

mongoose
  .connect(`mongodb://localhost:27017/${process.env.DB}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch(err => {
    console.log(err);
  });

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection');
  server.close(() => {
    process.exit(1);
  });
});
