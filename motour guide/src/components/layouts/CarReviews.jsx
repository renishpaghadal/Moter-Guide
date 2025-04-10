import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3000/review";

const CarReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fetch all reviews from API
  const fetchReviews = async () => {
    try {
      const response = await axios.get(API_URL);
      setReviews(response.data.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Submit new review
  const onSubmit = async (data) => {
    const newReview = {
      name: String(data.name) || "Anonymous",
      rating: Number(data.rating),
      review: data.reviewText,
      createdAt: new Date().toISOString().split("T")[0],
    };

    try {
      await axios.post(API_URL, newReview);
      toast.success("Review submitted successfully! ✅");
      fetchReviews(); // Refresh reviews after adding a new one
      reset();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review! ❌");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 transition-all duration-300 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl border border-gray-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-600">Car Reviews</h2>

        {/* Review Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-50 p-6 rounded-xl shadow-lg border border-orange-500 space-y-4"
        >
          <h3 className="text-xl font-semibold text-center text-gray-700">Leave a Review</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name (optional)"
              {...register("name")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />

            <select
              {...register("rating", { required: "Rating is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="">Select Rating</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Star{num > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}

          <textarea
            placeholder="Write your review..."
            {...register("reviewText", { required: "Review text is required" })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none h-24"
          />
          {errors.reviewText && <p className="text-red-500 text-sm">{errors.reviewText.message}</p>}

          <button
            type="submit"
            className={`w-full bg-orange-600 text-white py-2 rounded-lg text-lg font-semibold transition-all ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-700"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>

        {/* Loading/Error States */}
        {loading && <p className="text-gray-600 text-center mt-4">Loading reviews...</p>}
        {!loading && reviews.length === 0 && (
          <p className="text-gray-600 text-center mt-4">No reviews available.</p>
        )}

        {/* Reviews List */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-center text-gray-700">Customer Reviews</h3>
          {reviews.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="p-5 border border-orange-500 rounded-lg bg-gray-50 shadow-md transform transition duration-300 hover:scale-105"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold text-orange-600">{review.name || "Anonymous"}</h4>
                    <div className="flex items-center space-x-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-500 text-lg">⭐</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2">{review.review}</p>
                  <p className="text-sm text-gray-500 mt-2">{review.createdAt}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarReviews;
