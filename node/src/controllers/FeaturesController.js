const FeatureModel = require("../models/FeaturesModels");


const addFeature = async (req, res) => {
  try {
    const { name, category, description } = req.body;

    
    const existingFeature = await FeatureModel.findOne({ name });
    if (existingFeature) {
      return res.status(400).json({ message: "Feature already exists" });
    }

    const newFeature = new FeatureModel({ name, category, description });
    await newFeature.save();

    res.status(201).json({
      message: "Feature added successfully",
      data: newFeature,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getAllFeatures = async (req, res) => {
  try {
    const features = await FeatureModel.find();
    res.status(200).json({ message: "Features fetched successfully", data: features });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getFeatureById = async (req, res) => {
  try {
    const { id } = req.params;
    const feature = await FeatureModel.findById(id);

    if (!feature) {
      return res.status(404).json({ message: "Feature not found" });
    }

    res.status(200).json({ message: "Feature fetched successfully", data: feature });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const updateFeature = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description } = req.body;

    const updatedFeature = await FeatureModel.findByIdAndUpdate(
      id,
      { name, category, description },
      { new: true }
    );

    if (!updatedFeature) {
      return res.status(404).json({ message: "Feature not found" });
    }

    res.status(200).json({ message: "Feature updated successfully", data: updatedFeature });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const deleteFeature = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFeature = await FeatureModel.findByIdAndDelete(id);

    if (!deletedFeature) {
      return res.status(404).json({ message: "Feature not found" });
    }

    res.status(200).json({ message: "Feature deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addFeature,
  getAllFeatures,
  getFeatureById,
  updateFeature,
  deleteFeature,
};
