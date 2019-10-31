const connectDB = require('./utils/db');

const app = require('./app');

connectDB();

app.listen(process.env.PORT || 3000);

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception');
  server.close(() => {
    process.exit(1);
  });
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection');
  server.close(() => {
    process.exit(1);
  });
});
