const Ad = require('../models/Ad');
const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');

exports.getPrivateData = async (req, res, next) => {
    try {
        const ads = await Ad.find().populate('postedBy');

        res.status(200).json({
            success: true,
            data: ads
        })
    } catch (e) {
        next(e)
    }
}

exports.createAd = async (req, res, next) => {
    const user = req.user;
    const aid = crypto.randomUUID();
    const creationDate = Date.now();
    const {title, description, images, tags} = req.body;
    const {make, model, kilometers, color, year, price} = req.body.car;
    const {displacement, engineType, power} = req.body.car.engine;

    const ad = {
        aid: aid,
        title: title,
        description: description,
        postedBy: user._id,
        createdAt: creationDate,
        lastUpdated: creationDate,
        car: {
            make: make,
            model: model,
            kilometers: kilometers,
            color: color,
            year: year,
            price: price,
            engine: {
                engineType: engineType,
                displacement: displacement,
                power: power
            }
        }
    }

    if (images) {
        ad.images = images;
    }
    if (tags) {
        ad.tags = tags
    }

    try {
        const newAd = await Ad.create(ad);

        res.status(201).json({
            success: true,
            data: newAd
        })
    } catch (e) {
        next(e);
    }
}