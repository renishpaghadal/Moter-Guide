const ReviewModel = require('../models/ReviewModels') 


const addReview = async (req,res)=>{
    try {
    
        const { name, review, rating } = req.body; // Extract expected fields

        if (!review || !rating) {
          return res.status(400).json({ error: "Review and rating are required" });
        }
    
        const newReview = new ReviewModel({
          name: name || "Anonymous", // Default to Anonymous if name is missing
          review,
          rating,
          createdAt: new Date(),
        });
    
        await newReview.save();
        res.status(201).json({ message: "Review added successfully", newReview });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "error"
        })
        
    }
        
        
}

const getReview = async (req,res)=>{
    try {
        const review = await ReviewModel.find()
        res.status(200).json({
            message: "success",
            data: review
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "error"
        })
    }
}
const getReviewById = async (req,res)=>{
    try {
        const review = await ReviewModel.findById(req.params.id).populate('user').populate('car')
        res.status(200).json({
            message: "success",
            data: review
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "error"
        })
    }
}
const updateReview = async (req,res)=>{
    try {
        const review = await ReviewModel.findByIdAndUpdate(req.params.id,req.body,{new: true})
        res.status(200).json({
            message: "success",
            data: review
        })
        
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "error"
        })
        
    }
}
const deleteReview = async (req,res)=>{
    try {
        const review = await ReviewModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "success",
            data: review
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "error"
        })
    }
}

module.exports = {addReview,getReview,getReviewById,updateReview,deleteReview}
    