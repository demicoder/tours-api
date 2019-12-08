const express = require('express');

const router = express.Router();

const viewsController = require('./../controllers/views');

router.get('/overview', viewsController.getOverview);

router.get('/tour', viewsController.getTour);

module.exports = router;
