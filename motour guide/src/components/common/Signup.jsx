import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/user", data);

      if (res.status === 201) {
        toast.success("Signup successful! Redirecting to login...", { autoClose: 2000 });
        setTimeout(() => navigate("/login"), 2500);
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  const FormValidation = {
    FirstName: {
      required: { value: true, message: "First Name is required" },
    },
    LastName: {
      required: { value: true, message: "Last Name is required" },
    },
    email: {
      required: { value: true, message: "Email is required" },
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email",
      },
    },
    password: {
      required: { value: true, message: "Password is required" },
      minLength: { value: 6, message: "Password must be at least 6 characters long" },
    },
    confirmPassword: {
      required: { value: true, message: "Confirm password is required" },
      validate: (value) => value === watch("password") || "Passwords do not match",
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-300">
        <h2 className="text-3xl font-semibold text-center mb-6 text-orange-600">Sign Up</h2>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {/* First Name Field */}
          <div className="mb-4">
<label class            Name="block text-gray-700 font-medium">First Name</label>
            <input
              type="text"
              {...register("FirstName", FormValidation.FirstName)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <span className="text-red-500 text-sm">{errors.FirstName?.message}</span>
          </div>

          {/* Last Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Last Name</label>
            <input
              type="text"
              {...register("LastName", FormValidation.LastName)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <span className="text-red-500 text-sm">{errors.LastName?.message}</span>
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              {...register("email", FormValidation.email)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <span className="text-red-500 text-sm">{errors.email?.message}</span>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              {...register("password", FormValidation.password)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <span className="text-red-500 text-sm">{errors.password?.message}</span>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", FormValidation.confirmPassword)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <span className="text-red-500 text-sm">{errors.confirmPassword?.message}</span>
          </div>

          {/* Signup Button */}
          <button type="submit" className="w-full bg-orange-600 text-white p-3 rounded-lg hover:bg-orange-700 transition duration-300">
            Sign Up
          </button>

          {/* Login Redirect */}
          <p className="mt-4 text-center text-gray-600">
            Already have an account? <Link to="/login" className="text-orange-600 font-semibold">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
