const connectDB = require('./utils/db');

const app = require('./app');

connectDB(process.env.DB);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on ${process.env.PORT}`);
});

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception');
  process.exit(1);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection');
  process.exit(1);
});
