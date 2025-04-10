import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/login", data);

      if (res.status === 200) {
        // Ensure correct fields
        const userData = res.data.data;;

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", res.data.token); 
        localStorage.setItem("id",userData._id)// Store user token
        localStorage.setItem("role", userData.role); 
        toast.success("Login successful!", { autoClose: 2000 });

        setTimeout(() => {
          navigate("/"); // Navigate instead of hard reload
        }, 1500);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-300">
        <h2 className="text-3xl font-semibold text-center mb-6 text-orange-600">Login</h2>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <span className="text-red-500 text-sm">{errors.email?.message}</span>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <span className="text-red-500 text-sm">{errors.password?.message}</span>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link to="/forgotpassword" className="text-orange-600 text-sm hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white p-3 rounded-lg hover:bg-orange-700 transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Signup Redirect */}
          <p className="mt-4 text-center text-gray-600">
            Don't have an account? <Link to="/signup" className="text-orange-600 font-semibold">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
