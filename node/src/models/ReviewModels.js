const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new mongoose.Schema({
  name:{
        type: String
  },
    review:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        min: 1, max: 5,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review',ReviewSchema);