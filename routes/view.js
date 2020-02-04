const express = require('express');

const router = express.Router();

const viewsController = require('../controllers/views');

router.get('/', viewsController.getOverview);

router.route('/login').get(viewsController.getLogin);

router.get('/tour/:slug', viewsController.getTour);

module.exports = router;
