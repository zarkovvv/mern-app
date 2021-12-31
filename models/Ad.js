const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({
  aid: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  images: {
    type: [String],
    default: 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
  },
  tags: {
    type: [String]
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: true
  },
  lastUpdated: {
    type: Date,
    default: new Date(),
    required: true
  },
  car: {
    brand: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    km: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    engine: {
      engineType: {
        type: String,
        required: true
      },
      power: {
        type: Number,
        required: true
      }
    }
  }
});

const Ad = mongoose.model('Ad', AdSchema);

module.exports = Ad;