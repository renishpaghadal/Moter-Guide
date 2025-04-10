const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const WishlistSchema = new mongoose.Schema
({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    cars:[{
        type: Schema.Types.ObjectId,
        ref: 'Car'
    }]
  });

module.exports = mongoose.model('Wishlist',WishlistSchema);