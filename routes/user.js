const express = require('express');

const router = express.Router();

const userController = require('./../controllers/user');
const authController = require('./../controllers/auth');

// Public routes
router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

// Protected routes
router.use(authController.protect);

router.patch('/change-password', authController.changePassword);

router.patch('/update-me', userController.updateMe);
router.delete('/delete-me', userController.deleteMe);
router.get('/me', userController.getMe, userController.getUser);

// Restrict to admin
router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(userController.getUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
