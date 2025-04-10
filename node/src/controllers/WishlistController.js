const WishlistModel = require('../models/WishlistModel');
const CarModel = require('../models/CarModels');

const addWishlist = async (req, res) => {
  try {
    const { carId, userId } = req.body;

    // ✅ Validate input
    if (!carId || !userId) {
      return res.status(400).json({ message: "User ID and Car ID are required" });
    }

    // ✅ Check if car exists
    const carExists = await CarModel.findById(carId);
    if (!carExists) {
      return res.status(404).json({ message: "Car not found" });
    }

    // ✅ Find user's wishlist
    let wishlist = await WishlistModel.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new WishlistModel({ user: userId, cars: [carId] }); // ✅ Initialize correctly
    } else {
      // ✅ Ensure `cars` is always an array
      wishlist.cars = wishlist.cars || [];

      if (wishlist.cars.includes(carId)) {
        return res.status(400).json({ message: "Car already in wishlist" });
      }

      wishlist.cars.push(carId);
    }

    await wishlist.save();
    res.status(200).json({ message: "Car added to wishlist", data: wishlist });

  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("Received userId:", userId); // 🔍 Debugging step

    const wishlist = await WishlistModel.findOne({ user: userId }).populate("cars");
    console.log("Wishlist result:", wishlist); // 🔍 Log the result

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.status(200).json({ message: "Wishlist fetched successfully", data: wishlist });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const removeWishlist = async (req, res) => {
  try {
    const { userId, carId } = req.body;
    const wishlist = await WishlistModel.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.cars = wishlist.cars.filter((car) => car.toString() !== carId); // ✅ Convert ObjectId to string
    await wishlist.save();

    res.status(200).json({ message: "Car removed from wishlist", data: wishlist });
  } catch (error) {
    console.error("Error removing car from wishlist:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const clearWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    await WishlistModel.findOneAndDelete({ user: userId });

    res.status(200).json({ message: "Wishlist cleared" });
  } catch (error) {
    console.error("Error clearing wishlist:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { addWishlist, getWishlist, removeWishlist, clearWishlist };
