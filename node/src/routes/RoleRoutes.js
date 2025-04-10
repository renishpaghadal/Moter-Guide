const routes = require('express').Router()
const roleController = require("../controllers/RoleController")
routes.get('/role',roleController.getAllusers)
routes.post('/roles',roleController.AddUsers)
routes.delete('roles/:id',roleController.Deleteusers)
routes.get('/roles/:id',roleController.Findusers)

module.exports= routes