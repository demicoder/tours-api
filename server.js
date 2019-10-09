mongoose = require('mongoose');

const app = require('./app');

const DB = 'natours';

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception');
  server.close(() => {
    process.exit(1);
  });
});

mongoose
  .connect(`mongodb://localhost:27017/${DB}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(3000);
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
