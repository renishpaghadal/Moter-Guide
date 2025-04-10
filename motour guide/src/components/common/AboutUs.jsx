import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-4xl font-bold text-center text-orange-600 mb-6">About Us</h1>
      <p className="text-lg text-center max-w-3xl mx-auto mb-8">
        Welcome to <span className="font-semibold">CarHub</span>, your go-to platform for exploring, comparing, and buying the best cars in the market. We are dedicated to providing an exceptional car-buying experience with detailed insights, reviews, and expert recommendations.
      </p>
      
      <div className="grid md:grid-cols-2 gap-10">
        {/* Our Mission */}
        <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-orange-500">
          <h2 className="text-2xl font-semibold text-orange-600 mb-3">Our Mission</h2>
          <p className="text-gray-700">
            At CarHub, our mission is to simplify the car buying and selling process through transparency, technology, and customer-centric services. We strive to empower our users with accurate information and a seamless experience.
          </p>
        </div>
        
        {/* Why Choose Us */}
        <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-orange-500">
          <h2 className="text-2xl font-semibold text-orange-600 mb-3">Why Choose Us?</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Vast selection of new and used cars.</li>
            <li>Comprehensive comparison and review system.</li>
            <li>Seamless and secure car selling options.</li>
            <li>Dedicated customer support and expert guidance.</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-orange-600">Get in Touch</h2>
        <p className="text-gray-700 mt-3">
          Have questions or need assistance? Reach out to us at <span className="font-semibold text-orange-500">support@carhub.com</span> or visit our <a href="/contactus" className="text-blue-600 hover:underline">Contact Us</a> page.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
