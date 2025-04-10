import React from "react";
import { useForm, } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from "react";

const AddCarForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitHandler = async (data) => {
    setLoading(true);

    try {
        const formData = new FormData();
        formData.append("image", data.image[0]); // Select the first file
        formData.append("carName", data.carName);
        formData.append("color", data.color);
        formData.append("model", data.model);
        formData.append("year", data.year);
        formData.append("mileage", data.mileage);
        formData.append("engine", data.engine);
        formData.append("transmission", data.transmission);
        formData.append("seatingCapacity", data.seatingCapacity);
        formData.append("price", data.price);
        formData.append("fuelType", data.fuelType);

        const response = await axios.post("http://localhost:3000/cars", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        if (response.status === 201 || response.status === 200) {
            toast.success(" Car added successfully!");
            reset();
        } else {
            toast.error(` Failed: ${response.data.message}`);
        }
    } catch (error) {
        toast.error(" Error! Please try again.");
        console.error("Error:", error);
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6 transition-all duration-300">
      <div className="bg-white/90 p-8 rounded-xl shadow-lg w-full max-w-3xl border border-orange-500 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-600">Add New Car</h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
          {/* Car Name */}
          <div>
            <label className="block text-gray-700 font-medium">Car Name</label>
            <input
              type="text"
              {...register("carName", { required: "Car name is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
              placeholder="Enter car name"
            />
            {errors.carName && <p className="text-red-500 text-sm">{errors.carName.message}</p>}
          </div>

          {/* Brand & Model */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Color</label>
              <input
                type="text"
                {...register("color", { required: "Color is required" })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                placeholder="Enter Color"
              />
              {errors.color && <p className="text-red-500 text-sm">{errors.color.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Model</label>
              <input
                type="text"
                {...register("model", { required: "Model is required" })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                placeholder="Enter model"
              />
              {errors.model && <p className="text-red-500 text-sm">{errors.model.message}</p>}
            </div>
          </div>

          {/* Year & Image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Year</label>
              <input
                type="number"
                {...register("year", { required: "Year is required" })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                placeholder="Enter year"
              />
              {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Image </label>
              <input
                type="file"
                {...register("image", { required: "Image  is required" })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                placeholder="Enter image URL"
              />
              {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
            </div>
          </div>

          {/* Mileage & Engine */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Mileage</label>
              <input
                type="number"
                {...register("mileage", { required: "Mileage is required" })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                placeholder="Enter mileage"
              />
              {errors.mileage && <p className="text-red-500 text-sm">{errors.mileage.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Engine</label>
              <input
                type="text"
                {...register("engine", { required: "Engine is required" })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                placeholder="Enter engine details"
              />
              {errors.engine && <p className="text-red-500 text-sm">{errors.engine.message}</p>}
            </div>
          </div>

          {/* Transmission & Seating Capacity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Transmission</label>
              <input
                type="text"
                {...register("transmission", { required: "Transmission is required" })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                placeholder="Enter transmission type"
              />
              {errors.transmission && <p className="text-red-500 text-sm">{errors.transmission.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Seating Capacity</label>
              <input
                type="number"
                {...register("seatingCapacity", { required: "Seating capacity is required" })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                placeholder="Enter seating capacity"
              />
              {errors.seatingCapacity && <p className="text-red-500 text-sm">{errors.seatingCapacity.message}</p>}
            </div>
          </div>

          {/* Price & Fuel Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Price ($)</label>
              <input
                type="number"
                {...register("price", { required: "Price is required" })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                placeholder="Enter price"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Fuel Type</label>
              <select
                {...register("fuelType", { required: "Fuel type is required" })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
              >
                <option value="">Select Fuel</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>
              {errors.fuelType && <p className="text-red-500 text-sm">{errors.fuelType.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg text-lg font-semibold transition-all hover:bg-orange-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Add Car"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddCarForm;
