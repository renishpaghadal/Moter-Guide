import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Calendar,
  Car,
  DollarSign,
  TrendingUp,
  CreditCard,
  RefreshCw,
} from "lucide-react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const SalesReport = () => {
  const [salesData, setSalesData] = useState({
    totalCarsSold: 248,
    totalRevenue: "₹34.72 Crore",
    totalProfit: "₹6.94 Crore",
    avgSellingPrice: "₹14 Lakh",
    highestSale: "2023 Range Rover Autobiography - ₹2.75 Crore",
    lowestSale: "2014 Maruti Alto 800 - ₹1.25 Lakh",
    topSellingBrand: "Hyundai",
    topSellingModel: "Hyundai Creta",
    financePenetration: "68%",
    extendedWarranty: "42%",
    averageLoanAmount: "₹9.8 Lakh",
  });

  const [timePeriod, setTimePeriod] = useState("FY 2023-24");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(salesData);

  const topCities = [
    { name: "Delhi NCR", sales: 58 },
    { name: "Mumbai", sales: 47 },
    { name: "Bangalore", sales: 39 },
    { name: "Hyderabad", sales: 32 },
    { name: "Chennai", sales: 28 },
    { name: "Pune", sales: 24 },
    { name: "Kolkata", sales: 20 },
  ];

  const topBrands = [
    { name: "Maruti Suzuki", sales: 68, marketShare: 27.4 },
    { name: "Hyundai", sales: 53, marketShare: 21.4 },
    { name: "Tata", sales: 42, marketShare: 16.9 },
    { name: "Mahindra", sales: 38, marketShare: 15.3 },
    { name: "Kia", sales: 25, marketShare: 10.1 },
    { name: "Toyota", sales: 22, marketShare: 8.9 },
  ];

  const fuelTypeData = {
    labels: ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"],
    datasets: [
      {
        data: [142, 68, 22, 12, 4],
        backgroundColor: ["#1e88e5", "#43a047", "#fb8c00", "#00acc1", "#8e24aa"],
        borderWidth: 0,
      },
    ],
  };

  const monthlySales = {
    labels: [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
    ],
    datasets: [
      {
        label: "Units Sold",
        data: [18, 22, 20, 19, 21, 23, 25, 27, 26, 24, 22, 21],
        borderColor: "#1e88e5",
        backgroundColor: "rgba(30, 136, 229, 0.1)",
        tension: 0.3,
        pointBackgroundColor: "#1e88e5",
      },
    ],
  };

  const priceSegments = {
    labels: ["<5L", "5-10L", "10-20L", "20-50L", "50L+"],
    datasets: [
      {
        data: [32, 98, 85, 28, 5],
        backgroundColor: [
          "#42a5f5",
          "#66bb6a",
          "#ffca28",
          "#ef5350",
          "#ab47bc",
        ],
        borderWidth: 0,
      },
    ],
  };

  const handleEdit = () => setIsEditing(true);
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleUpdate = () => {
    setSalesData(formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/admin"
          className="text-blue-600 hover:underline flex items-center gap-2"
        >
          <Home size={18} /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-2">
          <Calendar size={20} />
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option>FY 2022-23</option>
            <option>FY 2023-24</option>
            <option>Q1 2024</option>
            <option>Q2 2024</option>
          </select>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-1">
        CarHub Sales Report
      </h1>
      <p className="text-gray-500 mb-6">
        Market Insights for {timePeriod} • India
      </p>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {[
          {
            title: "Total Sales",
            value: `${salesData.totalCarsSold} Units`,
            icon: <Car className="text-blue-600" />,
            change: "↑ 12%",
          },
          {
            title: "Total Revenue",
            value: salesData.totalRevenue,
            icon: <DollarSign className="text-green-600" />,
            change: "↑ 18%",
          },
          {
            title: "Avg. Selling Price",
            value: salesData.avgSellingPrice,
            icon: <TrendingUp className="text-purple-600" />,
            change: "↑ 5%",
          },
          {
            title: "Finance Penetration",
            value: salesData.financePenetration,
            icon: <CreditCard className="text-yellow-600" />,
            change: "↑ 8%",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded shadow-sm border hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-500">{item.title}</span>
              <div className="bg-gray-100 p-2 rounded-full">{item.icon}</div>
            </div>
            <div className="text-xl font-semibold text-gray-800">
              {item.value}
            </div>
            <p className="text-sm text-green-600">{item.change}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <h2 className="text-lg font-medium text-gray-700 mb-2">
            Monthly Sales Trend
          </h2>
          <Line data={monthlySales} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow-sm border">
            <h2 className="text-sm font-medium text-gray-700 mb-2">
              Fuel Type Distribution
            </h2>
            <Pie data={fuelTypeData} />
          </div>
          <div className="bg-white p-4 rounded shadow-sm border">
            <h2 className="text-sm font-medium text-gray-700 mb-2">
              Price Segment Distribution
            </h2>
            <Pie data={priceSegments} />
          </div>
        </div>
      </div>

      {/* Top Brands & Cities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <h2 className="text-lg font-medium text-gray-700 mb-4">
            Top Selling Brands
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2">Brand</th>
                <th>Sales</th>
                <th>Market Share</th>
              </tr>
            </thead>
            <tbody>
              {topBrands.map((brand, i) => (
                <tr key={i} className="border-b text-gray-700">
                  <td className="py-2">{brand.name}</td>
                  <td>{brand.sales}</td>
                  <td>{brand.marketShare}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <h2 className="text-lg font-medium text-gray-700 mb-4">
            Top Cities by Sales
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2">City</th>
                <th>Units Sold</th>
              </tr>
            </thead>
            <tbody>
              {topCities.map((city, i) => (
                <tr key={i} className="border-b text-gray-700">
                  <td className="py-2">{city.name}</td>
                  <td>{city.sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editable Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-700">
            Key Sale Highlights
          </h2>
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="text-blue-600 hover:underline text-sm flex items-center gap-1"
            >
              <RefreshCw size={14} /> Edit
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(salesData).map(([key, val], i) => (
            <div key={i}>
              <label className="text-sm text-gray-600 capitalize block mb-1">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              {isEditing ? (
                <input
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-1 text-sm"
                />
              ) : (
                <p className="text-gray-800">{val}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
