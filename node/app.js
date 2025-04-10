const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv").config();
const roleRoutes = require('./src/routes/RoleRoutes')
const usersRoutes = require('./src/routes/UserRoutes')
const carRoutes = require('./src/routes/CarRoutes')
const washlistRoutes = require('./src/routes/WashlistRoutes')
const FeatureRoutes = require('./src/routes/FeaturesRotes')
const ReviewRoutes = require('./src/routes/ReviewRoutes')
const paymentRoutes = require('./src/routes/PaymentRoutes')
const app = express()
app.use(express.json())
app.use(cors())
app.use(roleRoutes)
app.use(usersRoutes)
app.use(carRoutes)
app.use(washlistRoutes)
app.use(FeatureRoutes)
app.use(ReviewRoutes)
app.use(paymentRoutes)


mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(()=>{
    console.log("database connected....")
})


const PORT = 3000

app.listen(PORT,()=>{
    console.log('server is start as ', PORT)
})