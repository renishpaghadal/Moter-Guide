const carModel = require("../models/CarModels");
const multer = require("multer")
const cloudinaryUtil = require("../utiles/cloudinary");
const storage = multer.diskStorage({
    destination:"./uploads",
    filename: function(req,file,cb) {
        cb(null,file.originalname);
    }
})

const upload = multer({
    storage:storage,  
}).single('image');

const CarWithFile = async (req,res) => {
    upload(req,res, async (err) => {
        if(err){
            res.status(500).json({
                message:err.message
            })
        }
        else {
            const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
            console.log(cloudinaryResponse);
            console.log(req.body)

            req.body.image = cloudinaryResponse.secure_url
            const savedCar = await carModel.create(req.body)
            res.status(201).json({
                message:"Product Added Successfully...",
                data:savedCar
            })
        }
    })
}


const addCar = async (req, res) => {

    try {
        const car = await carModel.create(req.body)
        res.status(201).json({
            message: "car added successfully",
            data: car
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "error"
        })
        
    }
}

const getAllCars = async (req, res) => {

try {
    const cars = await carModel.find()
    res.json({
        message: "cars fetched successfully",
        data: cars
    });
    
} catch (error) {
    console.log(error)
    res.status(500).json({
        message: "error"
    })
    
}
    
}

const getCarById = async (req, res) => {

    try {
        const car = await carModel.findById(req.params.id)
        res.json({
            message: "car fetched successfully",
            data: car
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "error"
        })
        
    }
}
const updateCar = async (req, res) => {

        try {
            const car = await carModel.findByIdAndUpdate(req.params,res.body, {new:true})
            res.json({
                message: "car updated successfully",
                data: car
            });
} catch (error) {
    console.log(error)
    res.status(500).json({
        message: "error"
    })
    
}
}
const deleteCar = async (req, res) => {

    try {
        const car = await carModel.findByIdAndDelete(req.params.id)
        res.json({
            message: "car deleted successfully",
            data: car
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "error"
        })
        
    }
}

module.exports = {getAllCars, addCar, getCarById, deleteCar,CarWithFile,updateCar}