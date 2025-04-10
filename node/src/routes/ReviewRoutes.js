const ReviewController = require('../controllers/ReviewController')
const route = require('express').Router()

route.post('/review', ReviewController.addReview)
route.get('/review',ReviewController.getReview)
route.get('/review/:id',ReviewController.getReviewById)
route.put('/review/:id',ReviewController.updateReview)
route.delete('/review/:id',ReviewController.deleteReview)

module.exports = route