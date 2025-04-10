import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CarFeatures = () => {
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState({ name: "", category: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Fetch Features from Backend
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/features");
        setFeatures(response.data.data);
      } catch (error) {
        console.error("API error:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setNewFeature({ ...newFeature, [e.target.name]: e.target.value });
  };

  // Handle Form Submit (Add Feature)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newFeature.name || !newFeature.category) {
      toast.error("Feature Name and Category are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/feature", newFeature);
      setFeatures([...features, response.data]); // Update UI
      toast.success("Feature added successfully!");
      setNewFeature({ name: "", category: "", description: "" }); // Reset form
    } catch (error) {
      console.error("Error adding feature:", error);
      toast.error("Failed to add feature!");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-6 text-orange-600">Car Features</h2>

        {/* Add Feature Form */}
        <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add a Feature</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={newFeature.name}
              onChange={handleChange}
              placeholder="Feature Name"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              type="text"
              name="category"
              value={newFeature.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <textarea
              name="description"
              value={newFeature.description}
              onChange={handleChange}
              placeholder="Description (Optional)"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none h-24"
            />
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-orange-700 transition-all shadow-md"
            >
              Add Feature
            </button>
          </form>
        </div>

        {/* Error & Loading States */}
        {loading && <p className="text-gray-600 text-center mt-4">Loading features...</p>}
        {error && <p className="text-red-500 text-center mt-4">Failed to load features.</p>}

        {/* Feature List (Grid Layout) */}
        <div className="mt-8">
          <h3 className="text-3xl font-semibold text-gray-800 text-center">Available Features</h3>
          {features.length === 0 ? (
            <p className="text-gray-600 text-center mt-4">No features available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {features.map((feature) => (
                <div
                  key={feature._id}
                  className="bg-white p-5 rounded-lg shadow-lg border border-orange-500 hover:scale-105 transition-transform duration-300"
                >
                  <h4 className="text-xl font-bold text-orange-600">{feature.name}</h4>
                  <p className="mt-2 text-sm px-3 py-1 bg-orange-100 text-orange-700 rounded-full inline-block">
                    {feature.category}
                  </p>
                  {feature.description && <p className="text-gray-600 mt-3">{feature.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarFeatures;
