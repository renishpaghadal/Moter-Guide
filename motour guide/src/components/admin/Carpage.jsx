import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaTimes } from "react-icons/fa";

const CarPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editCar, setEditCar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/cars");
      if (Array.isArray(response.data.data)) {
        setCars(response.data.data);
      } else {
        setCars([]);
        setError("Invalid response format");
      }
    } catch (err) {
      setError("Failed to fetch cars");
      setCars([]);
    }
    setLoading(false);
  };

  const deleteCar = async (carId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this car?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/car/${carId}`);
      setCars((prevCars) => prevCars.filter((car) => car._id !== carId));
    } catch (err) {
      alert("Failed to delete car");
    }
  };

  const openEditModal = (car) => {
    setEditCar(car);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setEditCar(null);
    setShowModal(false);
  };

  const handleEditChange = (e) => {
    setEditCar({ ...editCar, [e.target.name]: e.target.value });
  };

  const updateCar = async () => {
    try {
      await axios.put(`http://localhost:3000/car/${editCar._id}`, editCar);
      fetchCars();
      closeEditModal();
    } catch (err) {
      alert("Failed to update car");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Cars</h1>

      {loading && <p className="text-gray-500">Loading cars...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Car Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition"
            >
              <img src={car.image} alt={car.model} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{car.model}</h2>
                <p className="text-gray-600 mt-1">Price: ₹{car.price}</p>

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => deleteCar(car._id)}
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => openEditModal(car)}
                    className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && <p className="text-center text-gray-500 mt-6">No cars found</p>
        )}
      </div>

      {/* Edit Modal */}
      {showModal && editCar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Edit Car</h2>
              <button onClick={closeEditModal} className="text-gray-500 hover:text-red-500">
                <FaTimes size={20} />
              </button>
            </div>

            <label className="block mb-2 text-gray-700">Car Name</label>
            <input
              type="text"
              name="model"
              value={editCar.model}
              onChange={handleEditChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2 text-gray-700">Price</label>
            <input
              type="text"
              name="price"
              value={editCar.price}
              onChange={handleEditChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2 text-gray-700">Image URL</label>
            <input
              type="text"
              name="image"
              value={editCar.image}
              onChange={handleEditChange}
              className="w-full p-2 border rounded mb-3"
            />

            <button
              onClick={updateCar}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full"
            >
              Update Car
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarPage;
