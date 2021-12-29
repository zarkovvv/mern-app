const express = require('express');
const router = express.Router();
const {getPrivateData, createAd} = require('../controllers/private');
const {protect} = require('../middleware/auth');

// router.route('/').get(protect, getPrivateData);
router.route('/ads').get(protect, getPrivateData);
router.route('/ads').post(protect, createAd); // protect creation

module.exports = router;