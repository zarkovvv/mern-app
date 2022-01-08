const Ad = require('../models/Ad');
const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const AWS = require('aws-sdk');


exports.getAds = async (req, res, next) => {
    try {
        const ads = await Ad.find().populate('postedBy', '-_id -__v');

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
    const {brand, model, km, color, year, price} = req.body.car;
    const {engineType, power} = req.body.car.engine;

    const ad = {
        aid: aid,
        title: title,
        description: description,
        postedBy: user._id,
        createdAt: creationDate,
        lastUpdated: creationDate,
        car: {
            brand: brand,
            model: model,
            km: km,
            color: color,
            year: year,
            price: price,
            engine: {
                engineType: engineType,
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

exports.updateAd = async (req, res, next) => {

    const aid = req.ad.aid;
    const _id = req.ad._id;
    const updateDate = Date.now();

    const {title, description, images} = req.body;
    const {brand, model, km, color, year, price} = req.body.car;
    const {engineType, power} = req.body.car.engine;

    const ad = {
        aid: aid,
        title: title,
        description: description,
        postedBy: req.ad.postedBy,
        createdAt: req.ad.createdAt,
        lastUpdated: updateDate,
        images: req.ad.images,
        car: {
            brand: brand,
            model: model,
            km: km,
            color: color,
            year: year,
            price: price,
            engine: {
                engineType: engineType,
                power: power
            }
        }
    }

    if (images) {
        ad.images = images.map(key => `https://cartoon-models.s3.eu-west-2.amazonaws.com/${key}`);
    }

    try {
        const updatedAd = await Ad.findByIdAndUpdate(_id, ad, {new: true});

        res.status(201).json({
            success: true,
            data: updatedAd
        })
    } catch (e) {
        next(e);
    }
}

exports.deleteAd = async (req, res, next) => {

    const _id = req.ad._id;

    try {
        const deletedAd = await Ad.findByIdAndDelete(_id);

        res.status(201).json({
            success: true,
            data: deletedAd
        })
    } catch (e) {
        next(e);
    }
}

exports.upload = async (req, res, next) => {

    const images = req.files;
    let imageKeys = [];

    let s3 = new AWS.S3();

    const params = [];
    Object.values(images).forEach(image => {
        const id = crypto.randomUUID();
        params.push({
            Bucket: 'cartoon-models',
            Key: `${id}.jpeg`,
            Body: image.data,
            ContentType: 'image/jpeg',
            ACL: "public-read",
            ContentDisposition: 'inline; filename=filename.jpg'
        })
    })

    try {
        const responses = await Promise.all(
          params.map(param => s3.upload(param).promise().then(response => imageKeys.push(response.Key)))
        )
        res.status(200).json({
            success: true,
            data: imageKeys
        });
        next();
    } catch (e) {
        next(e);
    }
}