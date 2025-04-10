const route = require('express').Router();
const Washcontroller = require('../controllers/WishlistController');
 
route.get('/washlists/:userId',Washcontroller.getWishlist);
route.post('/washlist',Washcontroller.addWishlist);
route.delete('/clear',Washcontroller.clearWishlist);
route.delete('/washlist/:carId',Washcontroller.removeWishlist);

module.exports = route;