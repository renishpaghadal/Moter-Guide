const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeatureSchema = new mongoose.Schema({
    name: {
         type: String,
         required: true, 
         unique: true 
          },
    category:
     { 
        type: String, 
        required: true
     }, 
    description: {
         type: String
                 }, 
    createdAt: {
         type: Date, 
         default: Date.now 
        }
  });
  
  module.exports = mongoose.model("Feature", FeatureSchema);