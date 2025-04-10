import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const submitHandler = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/forgotpassword", data);

      if (res.status === 200) {
        toast.success("Reset link sent to your email!");
        setEmailSent(true); // Show success message
      } else {
        toast.error("Failed to send reset link. Try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-300">
        <h2 className="text-2xl font-semibold text-center mb-4 text-orange-600">Forgot Password</h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your email to receive a password reset link.
        </p>

        {emailSent ? (
          <div className="text-center text-green-600 font-semibold">
            ✅ Reset link has been sent! Check your email.
          </div>
        ) : (
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your email"
              />
              <span className="text-red-500 text-sm">{errors.email?.message}</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white p-3 rounded-lg hover:bg-orange-700 transition duration-300"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            {/* Back to Login */}
            <p className="mt-4 text-center text-gray-600">
              Remember your password? <Link to="/login" className="text-orange-600 font-semibold">Login</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
