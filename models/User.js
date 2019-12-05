const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User must have a name']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'User must have an E-mail'],
      lowercase: true,
      validate: [validator.isEmail, 'Provide an E-mail'],
      trim: true
    },
    photo: String,
    password: {
      type: String,
      required: [true, 'User must have a password'],
      minlength: process.env.USER_PASSWORD_LENGTH,
      select: false
    },
    confirmPassword: {
      type: String,
      required: [true, 'Confirm your password'],
      validate: {
        validator: function(el) {
          return el === this.password;
        },
        message: 'Passwords do not match'
      }
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'guide', 'lead-guide'],
      default: 'user'
    },
    active: {
      type: Boolean,
      default: true,
      select: false
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpiry: Date
  },
  {
    timestamps: true
  }
);

// Don't save confirmPassword field to DB
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;

  next();
});

// Changed passwordChangedAt property if !new and password is modifed
userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now();
  next();
});

// Compare passwords
userSchema.methods.correctPassword = async function(
  enteredPassword,
  userPassword
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

// Find only active docs
userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });

  next();
});

userSchema.methods.changedPasswordAfter = function(JWTtimestamp) {
  if (this.passwordChangedAt) {
    // Convert from passwordChangedAt from date to timestamp
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTtimestamp < changedTimestamp;
  }
  return false;
};

// Generate password reset Token
userSchema.methods.generatePasswordToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetTokenExpiry =
    Date.now() + +process.env.PASSWORD_TOKEN_EXPIRY * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
