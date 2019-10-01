mongoose = require('mongoose');

const app = require('./app');

const DB = 'natours';

mongoose
  .connect(`mongodb://localhost:27017/${DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
