const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'User must have a name']
  },
  email: {
    type: mongoose.Types.email,
    unique: true,
    required: [true, 'User must have a name'],
    lowercase: true
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'User must have a password'],
    minlength: 8
  }
});

module.exports = mongoose.model('User', userSchema);
