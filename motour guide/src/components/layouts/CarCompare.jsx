import React, { useEffect, useState } from "react";
import axios from "axios";

const CarCompare = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const dummyCars = [
    {
      carName: "Tesla Model S",
      brand: "Tesla",
      model: "Model S",
      year: 2023,
      price: "$79,999",
      fuelType: "Electric",
      mileage: "405 miles",
      engine: "Dual Motor AWD",
      transmission: "Automatic",
      seatingCapacity: 5,
      color: "white",
      image: "https://images.unsplash.com/photo-1453491945771-a1e904948959?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVzbGElMjBtb2RlbCUyMHN8ZW58MHx8MHx8fDA%3D",
    },
    {
      carName: "BMW M3",
      brand: "BMW",
      model: "M3",
      year: 2023,
      price: "$72,000",
      fuelType: "Petrol",
      mileage: "26 mpg",
      engine: "3.0L Twin-Turbo Inline-6",
      transmission: "Automatic",
      seatingCapacity: 5,
      color: "Blue",
      image: "https://images.pexels.com/photos/30318382/pexels-photo-30318382/free-photo-of-bmw-car-on-kadikoy-street-in-istanbul-turkey.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/cars"); // Your API URL
        setCars(response.data);
      } catch (error) {
        console.error("API error:", error);
        setError(true);
        setCars(dummyCars); // Load dummy data on error
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 text-gray-800 p-6">
      <h2 className="text-3xl font-bold mb-6 text-orange-600">Car Comparison</h2>

      {/* Loading State */}
      {loading && <p className="text-gray-600">Loading cars...</p>}

      {/* Error Message */}
      {error && <p className="text-red-600">API failed. Showing default car comparison.</p>}

      {!loading && (
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {cars.map((car, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
              <h3 className="text-2xl font-semibold text-center mb-4 text-orange-600">{car.carName}</h3>
              <img src={car.image} alt={car.carName} className="w-full h-48 object-cover rounded-md mb-4" />
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(car).map(([key, value]) =>
                    key !== "image" ? (
                      <tr key={key} className="border-b border-gray-300">
                        <td className="font-medium py-2 capitalize">{key.replace(/([A-Z])/g, " $1")}:</td>
                        <td className="text-right">{value}</td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarCompare;
