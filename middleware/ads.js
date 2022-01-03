const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const Ad = require("../models/Ad");

exports.protectOwnership  = async (req, res, next) => {
  const user = req.user;
  const {aid} = req.body;

  try {

    const ad = await Ad.findOne({aid}).populate('postedBy');

    if (!ad) {
      return next(new ErrorResponse("Invalid ad!", 404));
    }

    if (!ad.postedBy._id.equals(user._id)){
      return next(new ErrorResponse("Not owner!", 404));
    }

    req.ad = ad;
    next();

  } catch (e) {
    return next(new ErrorResponse("Not authorized to access this route!", 401));
  }
}