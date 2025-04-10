import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";

const UserNavbar = ({ wishlist = [], cart = [], user, handleLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userRole = localStorage.getItem("role"); // Extract role from user object

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center border-b border-gray-300">
      {/* Logo */}
      <div>
        <Link to="/" className="text-orange-600 text-2xl font-bold tracking-wide">
          CarHub
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8 font-medium">
        {user ? (
          userRole === "admin" ? (
            // Admin Navbar
            <>
              <Link to="/admin" className="text-gray-700 hover:text-orange-600 transition duration-300">
                Admin Dashboard
              </Link>
              <Link to="/sell-car" className="text-gray-700 hover:text-orange-600 transition duration-300">
                Add Car
              </Link>
              <Link to="/SalesReport" className="text-gray-700 hover:text-orange-600 transition duration-300">
              SalesReport
              </Link>
            </>
          ) : (
            // User Navbar
            <>
              <Link to="/new-cars" className="text-gray-700 hover:text-orange-600 transition duration-300">
                New Cars
              </Link>
              <Link to="/sell-car" className="text-gray-700 hover:text-orange-600 transition duration-300">
                Add Car
              </Link>
              <Link to="/feature" className="text-gray-700 hover:text-orange-600 transition duration-300">
                Featured
              </Link>
              <Link to="/reviews" className="text-gray-700 hover:text-orange-600 transition duration-300">
                Reviews
              </Link>
              <Link to="/compare" className="text-gray-700 hover:text-orange-600 transition duration-300">
                Compare
              </Link>

              {/* Wishlist Icon */}
              <Link to="/wishlist" className="relative text-black hover:text-red-400 transition">
                <FaHeart size={24} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </>
          )
        ) : (
          // If user is NOT logged in, show these links
          <>
            <Link to="/" className="text-gray-700 hover:text-orange-600 transition duration-300">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-600 transition duration-300">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-600 transition duration-300">
              Contact Us
            </Link>
          </>
        )}
      </div>

      {/* Right Side (User Profile or Auth Buttons) */}
      <div className="space-x-4 flex items-center relative">
        {user ? (
          // User Profile Dropdown
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="flex items-center space-x-2 text-orange-600 font-medium hover:text-orange-700 transition focus:outline-none">
              <FaUserCircle size={24} />
              <span>{user.email}</span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md p-2 border border-gray-200">
                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded-md transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // Login & Signup Buttons (When Not Logged In)
          <>
            <Link to="/login" className="text-orange-600 border border-orange-600 px-4 py-2 rounded-md hover:bg-orange-600 hover:text-white transition duration-300">
              Login
            </Link>
            <Link to="/signup" className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition duration-300">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;
