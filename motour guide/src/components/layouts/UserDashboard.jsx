import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Dummy User Data (Replace with API call if needed)
    setUser({
      avatar: "https://via.placeholder.com/100",
      name: "John Doe",
      email: "johndoe@example.com",
      role: "Car Enthusiast",
    });

    // Dummy Wishlist Data
    setWishlist([
      { id: 1, name: "Maruti Swift", price: "₹6.5 Lakh" },
      { id: 2, name: "Hyundai Creta", price: "₹10.5 Lakh" },
      { id: 3, name: "Tata Nexon", price: "₹8.5 Lakh" },
    ]);
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

      {/* User Info */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center space-x-6">
        <img src={user.avatar} alt="User Avatar" className="w-20 h-20 rounded-full border-2 border-gray-500" />
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-400">{user.email}</p>
          <p className="text-gray-300">Role: {user.role}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">Cars Viewed</h2>
          <p className="text-2xl font-bold">24</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">Wishlist Items</h2>
          <p className="text-2xl font-bold">{wishlist.length}</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <p className="text-gray-400">Checked 3 cars today</p>
        </div>
      </div>

      {/* Wishlist Preview */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Wishlist Preview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {wishlist.slice(0, 3).map((car) => (
          <div key={car.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">{car.name}</h3>
            <p className="text-gray-400">{car.price}</p>
          </div>
        ))}
      </div>

      {/* View Wishlist Button */}
      <div className="mt-6">
        <Link to="/wishlist" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          View Full Wishlist
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
