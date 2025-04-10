const routes = require('express').Router()
const carController = require('../controllers/CarsController')

routes.get('/cars',carController.getAllCars)
routes.post('/car',carController.addCar)
routes.post('/cars',carController.CarWithFile)
routes.get('/car/:id',carController.getCarById)
routes.delete('/car/:id',carController.deleteCar)
routes.put('/car/:id',carController.updateCar)



module.exports = routes
