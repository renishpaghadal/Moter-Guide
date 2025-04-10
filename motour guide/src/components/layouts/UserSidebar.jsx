import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaCar, FaHeart, FaSignOutAlt, FaHome } from "react-icons/fa";

const UserSidebar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Use navigate instead of window.location.href

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse user data
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login"); // Navigate instead of hard reload
  };

  return (
    <div className="w-64 h-screen bg-gray-900 p-5 flex flex-col text-gray-300 shadow-lg border-r border-gray-700">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-5">
        <div className="bg-gray-700 p-3 rounded-full shadow-lg">
          <FaUser className="text-blue-400 text-3xl" />
        </div>
        <div className="text-center mt-3">
          <h3 className="text-lg font-semibold text-white">
            {user?.fullName || "Guest User"}
          </h3>
          <p className="text-sm text-gray-400">{user?.email || "guest@example.com"}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-3">
        <Link to="/dashboard" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition duration-300">
          <FaHome className="text-xl text-blue-400" />
          <span>Dashboard</span>
        </Link>
        <Link to="/my-cars" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition duration-300">
          <FaCar className="text-xl text-blue-400" />
          <span>My Cars</span>
        </Link>
        <Link to="/wishlist" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition duration-300">
          <FaHeart className="text-xl text-blue-400" />
          <span>Wishlist</span>
        </Link>
      </nav>

      {/* Logout Section */}
      <div className="mt-auto flex justify-center">
        <button onClick={handleLogout} className="flex items-center space-x-2 bg-red-600 px-4 py-2 text-white rounded-lg hover:bg-red-700 transition duration-300">
          <FaSignOutAlt className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
