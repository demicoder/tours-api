const express = require('express');

const viewsController = require('../controllers/views');

const authController = require('../controllers/auth');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewsController.getOverview);

router.route('/login').get(viewsController.getLogin);

router.get('/tour/:slug', viewsController.getTour);

module.exports = router;
