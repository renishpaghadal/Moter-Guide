const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    carName: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    image:{
        type: String,

    },

    price: {
        type: Number,
        required: true
    },
    mileage: {
        type: String,
        required: true
    },
    engine: {
        type: String,
        required: true
    },
    transmission: {
        type: String,
        required: true
    },
    fuelType: {
        type: String,  
        enum: ['Petrol', 'Diesel', 'Electric'],
        required: true
    },
    seatingCapacity: {
        type: Number,
        required: true
    },
    color: {
        type: String,
       
    }
});

module.exports = mongoose.model("Car", carSchema);
