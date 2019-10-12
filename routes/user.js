const express = require('express');

const router = express.Router();

const userController = require('./../controllers/user');
const authController = require('./../controllers/auth');

router.post('/signup', authController.signUp);

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
