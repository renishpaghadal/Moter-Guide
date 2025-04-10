import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyCars = ({ wishlist, addToWishlist }) => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCar, setSelectedCar] = useState(null);
  const carsPerPage = 6;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cars");

        if (Array.isArray(response.data.data)) {
          setCars(response.data.data);
        } else {
          console.error("Unexpected API response:", response.data);
          setCars([]);
        }
      } catch (err) {
        console.error("Error fetching cars:", err.message);
        setCars([]);
      }
    };

    fetchCars();
  }, []);

  let filteredCars = cars.filter((car) =>
    car.carName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOption === "priceLowToHigh") {
    filteredCars.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighToLow") {
    filteredCars.sort((a, b) => b.price - a.price);
  } else if (sortOption === "yearNewest") {
    filteredCars.sort((a, b) => b.year - a.year);
  } else if (sortOption === "yearOldest") {
    filteredCars.sort((a, b) => a.year - b.year);
  }

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  return (
    <div className="p-6 min-h-screen bg-gray-100 text-gray-800">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Cars</h2>

      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search for a car..."
          className="w-full sm:w-2/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full sm:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="yearNewest">Year: Newest First</option>
          <option value="yearOldest">Year: Oldest First</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentCars.map((car) => (
          <div key={car._id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition">
            <div className="relative">
              <img src={car.image} alt={car.carName} className="w-full h-52 object-cover" />
              <button
                onClick={() => addToWishlist(car)}
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
              >
                {wishlist.some((item) => item._id === car._id) ? (
                  <FaHeart className="text-red-500 text-xl" />
                ) : (
                  <FaRegHeart className="text-gray-500 text-xl" />
                )}
              </button>
            </div>

            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-900">{car.carName}</h3>
              <p className="text-gray-600">{car.brand} - {car.model} ({car.year})</p>
              <p className="text-lg font-semibold text-orange-600 mt-2">₹{car.price.toLocaleString()}</p>

              {/* Buttons side by side */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setSelectedCar(car)}
                  className="w-1/2 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                >
                  View Details
                </button>
                <Link to="bank" className="w-1/2">
                  <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCars.length > carsPerPage && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-2 rounded ${currentPage === 1 ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600"}`}
          >
            ← Prev
          </button>
          <button
            onClick={() => setCurrentPage((prev) => (indexOfLastCar < filteredCars.length ? prev + 1 : prev))}
            disabled={indexOfLastCar >= filteredCars.length}
            className={`px-4 py-2 mx-2 rounded ${indexOfLastCar >= filteredCars.length ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600"}`}
          >
            Next →
          </button>
        </div>
      )}

      {selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✖
            </button>
            <img src={selectedCar.image} alt={selectedCar.carName} className="w-full h-52 object-cover rounded-lg" />
            <h2 className="text-2xl font-bold mt-4">{selectedCar.carName}</h2>
            <p className="text-gray-600">{selectedCar.brand} - {selectedCar.model} ({selectedCar.year})</p>
            <p className="text-lg font-semibold text-orange-600 mt-2">₹{selectedCar.price.toLocaleString()}</p>
            <p className="text-gray-700 mt-2"><strong>Mileage:</strong> {selectedCar.mileage}</p>
            <p className="text-gray-700"><strong>Engine:</strong> {selectedCar.engine}</p>
            <p className="text-gray-700"><strong>Transmission:</strong> {selectedCar.transmission}</p>
            <p className="text-gray-700"><strong>Fuel Type:</strong> {selectedCar.fuelType}</p>
            <p className="text-gray-700"><strong>Seating Capacity:</strong> {selectedCar.seatingCapacity}</p>
            <p className="text-gray-700"><strong>Color:</strong> {selectedCar.color}</p>

            <button onClick={() => setSelectedCar(null)} className="mt-4 w-full py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCars;
