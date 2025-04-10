import React from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const templateParams = {
      Name: data.name,
      Email: data.email,
      message: data.message,
    };

    emailjs
      .send(
        "service_mv8jasp", // Replace with your EmailJS service ID
        "template_4dazmmt", // Replace with your EmailJS template ID
         templateParams,
        "L3gN60xVIPuHEXjtC"  // Replace with your EmailJS public key
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
          toast.success("Message sent successfully!");
          reset(); // Reset form after submission
        },
        (error) => {
          console.error("Email send error:", error);
          toast.error("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-4">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-gray-700 font-medium">Message</label>
            <textarea
              {...register("message", { required: "Message is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              rows="4"
              placeholder="Enter your message"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Information */}
        <div className="mt-6 text-center text-gray-700">
          <p>Email: support@carhub.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 CarHub Street, NY, USA</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
