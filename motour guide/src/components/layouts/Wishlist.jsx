import React from "react";
import { Link } from "react-router-dom";

const WishlistPage = ({ wishlist, addToWishlist }) => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-900">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-orange-600">Wishlist</h2>
        <Link
          to="/"
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition duration-300"
        >
          Back to Cars
        </Link>
      </div>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No cars in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {wishlist.map((car) => (
            <div
              key={car._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg border border-gray-200 transition duration-300"
            >
              <img
                src={car.image}
                alt={car.carName}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-bold text-gray-800 mt-2">{car.carName}</h3>
              <p className="text-gray-600">
                {car.brand} - {car.model} ({car.year})
              </p>
              <p className="font-bold text-orange-600 mt-1">${car.price}</p>
              <button
                onClick={() => addToWishlist(car)}
                className="mt-3 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
