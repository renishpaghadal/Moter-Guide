import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

const categories = [
  { name: "Sedan", image: "http://www.car-revs-daily.com/wp-content/uploads/2015/10/16_Civic_Sedan_149.jpg" },
  { name: "SUV", image: "https://tse1.mm.bing.net/th?id=OIP.1FBX7-ocw19fh24VY5QosAHaE8&pid=Api&P=0&h=180" },
  { name: "Hatchback", image: "https://tse4.mm.bing.net/th?id=OIP.norHyejWroSA4LF4sD0RJAHaE8&pid=Api&P=0&h=180" },
  { name: "Luxury", image: "https://tse4.mm.bing.net/th?id=OIP.ngDh6-ZapV1uBa6LNy9fDwHaE8&pid=Api&P=0&h=180" },
];

const LandingPage = () => {
  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen w-full flex flex-col overflow-hidden">
      
      {/* Offer Section */}
      <div className="w-full text-orange-600 py-4">
        <h2 className="text-2xl font-bold text-center mb-2">Exclusive Offers</h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          className="w-full max-w-screen-lg mx-auto"
        >
          {[
            { image: "http://www.car-revs-daily.com/wp-content/uploads/2015/10/16_Civic_Sedan_149.jpg", text: "Exclusive deals on luxury cars!" },
            { image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600", text: "Limited-time sports car discounts!" },
            { image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600", text: "Save big on powerful SUVs!" },
            { image: "https://images.pexels.com/photos/627678/pexels-photo-627678.jpeg?auto=compress&cs=tinysrgb&w=600", text: "Compact and affordable deals just for you!" },
            { image: "https://images.pexels.com/photos/119435/pexels-photo-119435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", text: "Best prices on premium cars—shop now!" },
          ].map((offer, index) => (
            <SwiperSlide key={index} className="flex flex-col items-center text-center">
              <img src={offer.image} alt="Offer" className="rounded-lg shadow-lg w-[80%] mx-auto" />
              <p className="mt-2 text-base font-semibold">{offer.text}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Hero Section */}
      <div
        className="relative h-[60vh] w-full bg-cover bg-center flex flex-col items-center justify-center text-center p-4">

        <h1 className="text-4xl font-bold mb-2 text-orange-600">Find Your Perfect Car</h1>
        <p className="text-base text-gray-700">Discover, compare, and purchase your dream vehicle effortlessly.</p>
        <div className="flex bg-white text-gray-700 p-2 mt-3 rounded-lg shadow-lg">
          <input type="text" placeholder="Search for a car..." className="px-3 py-2 w-72 focus:outline-none" />
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2">Search</button>
        </div>
      </div>

      {/* Car Categories */}
      <div className="py-6 px-4 text-center w-full max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Explore by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((category, index) => (
            <div key={index} className="bg-white p-3 rounded-lg shadow-md border hover:shadow-lg transition">
              <img src={category.image} alt={category.name} className="w-full h-28 object-cover rounded-md mb-2" />
              <p className="font-semibold text-lg text-orange-600">{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Cars */}
      <div className="py-6 px-4 w-full max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Featured Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((car) => (
            <div key={car} className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition">
              <img src="/public/car2.webp" alt="Car" className="w-full rounded-md mb-2" />
              <h3 className="text-lg font-semibold">Dzire {car}</h3>
              <p className="text-gray-600">₹20,000</p>
              <button className="bg-orange-600 px-3 py-2 mt-2 w-full rounded-lg text-white hover:bg-orange-700">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-6 px-4 text-center bg-white w-full max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Wide Selection of Cars", "Trusted by Thousands", "Easy Financing Options"].map((benefit, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-lg shadow-md hover:shadow-lg transition">
              <p className="text-lg font-semibold">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="py-6 px-4 text-center w-full max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {["Amazing service!", "The best car-buying experience ever!"].map((review, index) => (
            <div key={index} className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition border">
              <p className="italic text-gray-700">"{review}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call To Action */}
      <div className="py-6 text-center w-full">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Find Your Next Car Today!</h2>
        <Link to="/signup" className="bg-orange-600 px-5 py-2 rounded-lg text-white hover:bg-orange-700 transition">
          Get Started
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
