import React from "react";
import { Link } from "react-router-dom";
import { FaCar, FaUsers, FaClipboardList, FaChartBar, FaBell, FaClock } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 shadow rounded-lg flex items-center">
          <FaCar className="text-orange-600 text-3xl mr-4" />
          <div>
            <p className="text-xl font-semibold">150</p>
            <p className="text-gray-500">Total Cars</p>
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg flex items-center">
          <FaUsers className="text-blue-600 text-3xl mr-4" />
          <div>
            <p className="text-xl font-semibold">80</p>
            <p className="text-gray-500">Total Users</p>
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg flex items-center">
          <FaClipboardList className="text-green-600 text-3xl mr-4" />
          <div>
            <p className="text-xl font-semibold">35</p>
            <p className="text-gray-500">Total Bookings</p>
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg flex items-center">
          <FaChartBar className="text-purple-600 text-3xl mr-4" />
          <div>
            <p className="text-xl font-semibold">₹5,00,000</p>
            <p className="text-gray-500">Revenue</p>
          </div>
        </div>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/cars" className="bg-orange-500 text-white p-4 rounded-lg flex items-center justify-between hover:bg-orange-600 transition">
          <FaCar size={24} />
          <span className="font-medium">Manage Cars</span>
        </Link>
        <Link to="/admin/users" className="bg-blue-500 text-white p-4 rounded-lg flex items-center justify-between hover:bg-blue-600 transition">
          <FaUsers size={24} />
          <span className="font-medium">Manage Users</span>
        </Link>
        <Link to="/admin/bookings" className="bg-green-500 text-white p-4 rounded-lg flex items-center justify-between hover:bg-green-600 transition">
          <FaClipboardList size={24} />
          <span className="font-medium">Manage Bookings</span>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          <li className="flex items-center">
            <FaClock className="text-gray-500 mr-3" />
            <span>User <strong>John Doe</strong> added a new car listing - Tesla Model X.</span>
          </li>
          <li className="flex items-center">
            <FaClock className="text-gray-500 mr-3" />
            <span>Admin approved a new booking for <strong>BMW X5</strong>.</span>
          </li>
          <li className="flex items-center">
            <FaClock className="text-gray-500 mr-3" />
            <span>User <strong>Alice Smith</strong> updated her profile details.</span>
          </li>
        </ul>
      </div>

      {/* Pending Approvals */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-yellow-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-yellow-700 mb-3">Pending Car Approvals</h2>
          <p className="text-gray-700">3 new cars waiting for admin approval.</p>
          <Link to="/admin/pending-cars" className="text-yellow-600 font-medium mt-2 inline-block">
            View Details
          </Link>
        </div>
        <div className="bg-red-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-red-700 mb-3">Pending Booking Approvals</h2>
          <p className="text-gray-700">5 new bookings require confirmation.</p>
          <Link to="/admin/pending-bookings" className="text-red-600 font-medium mt-2 inline-block">
            View Details
          </Link>
        </div>
      </div>

      {/* System Overview */}
      <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">System Overview</h2>
        <p className="text-gray-700">All systems are running smoothly. No critical issues detected.</p>
        <p className="text-gray-700 mt-2">Last maintenance: <strong>March 28, 2025</strong></p>
      </div>
    </div>
  );
};

export default AdminDashboard;
