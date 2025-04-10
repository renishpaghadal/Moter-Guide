const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const uploadFileToCloudinary = async (file) => {
    cloudinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.API_KEY,
        api_secret:process.env.API_ID
    })

    const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
    return cloudinaryResponse
}

module.exports = {
    uploadFileToCloudinary
}