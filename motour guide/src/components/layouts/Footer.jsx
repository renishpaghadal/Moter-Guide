import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8">
      <div className="max-w-screen-xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold text-orange-600">CarHub</h3>
          <p className="mt-2 text-gray-600">
            Your one-stop destination to find, compare, and buy your dream car with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><Link to="/new-cars" className="hover:text-orange-600">New Cars</Link></li>
            <li><Link to="/used-cars" className="hover:text-orange-600">Used Cars</Link></li>
            <li><Link to="/sell-car" className="hover:text-orange-600">Sell Your Car</Link></li>
            <li><Link to="/reviews" className="hover:text-orange-600">Car Reviews</Link></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Contact Us</h3>
          <p className="mt-2 text-gray-600">Email: support@carhub.com</p>
          <p className="text-gray-600">Phone: +123 456 7890</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-orange-600">Facebook</a>
            <a href="#" className="hover:text-orange-600">Twitter</a>
            <a href="#" className="hover:text-orange-600">Instagram</a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 border-t border-gray-300 text-center py-4">
        <p className="text-gray-600">© 2025 CarHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
