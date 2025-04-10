const routes = require('express').Router()
const userController = require('../controllers/UserController')
const verifyToken = require('../Middleware/Authmiddlerware')

routes.get('/users',userController.getAllusers)
routes.post('/user',userController.AddUsers)
routes.delete('/user/:id',userController.Deleteusers)
routes.get('/users/:id',userController.Findusers)
routes.post('/login',userController.loginUsers)
routes.post('/forgotpassword',userController.forgotpassword)
routes.post('/resetpassword',userController.resetpassword)



module.exports= routes