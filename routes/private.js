const express = require('express');
const router = express.Router();
const {getAds, createAd, updateAd, deleteAd} = require('../controllers/private');
const {protect} = require('../middleware/auth');
const {protectOwnership} = require('../middleware/ads');

// router.route('/').get(protect, getAds);
router.route('/ads').get(protect, getAds);
router.route('/ads').post(protect, createAd);
router.route('/ads/updateAd').post(protect, protectOwnership, updateAd);
router.route('/ads/deleteAd').post(protect, protectOwnership, deleteAd);

module.exports = router;