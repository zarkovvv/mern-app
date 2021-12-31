const express = require('express');
const router = express.Router();
const {getAds, createAd} = require('../controllers/private');
const {protect} = require('../middleware/auth');

// router.route('/').get(protect, getAds);
router.route('/ads').get(protect, getAds);
router.route('/ads').post(protect, createAd); // protect creation

module.exports = router;