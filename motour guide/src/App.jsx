import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./components/common/Login";
import Signup from "./components/common/Signup";
import UserNavbar from "./components/layouts/UserNavbar";
import UserSidebar from "./components/layouts/UserSidebar";
import LandingPage from "./components/layouts/LandingPage";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/layouts/UserDashboard";
import AddCarForm from "./components/admin/AddCarForm";
import CarCompare from "./components/layouts/CarCompare";
import CarReviews from "./components/layouts/CarReviews";
import MyCars from "./components/layouts/MyCars";
import Wishlist from "./components/layouts/Wishlist";
import UserProfile from "./components/layouts/UserProfile";
import { useState,useEffect } from "react";
import UserDashboard from "./components/layouts/UserDashboard";
import CarFeatures from "./components/layouts/CarFeatures";
import AboutUs from "./components/common/AboutUs";
import ContactUs from "./components/common/ContactUs";
import ForgotPassword from "./components/common/ForgotPassword";
import Resetpassword from "./components/common/Resetpassword";
import AdminDashboard from "./components/admin/AdminDashboard";
import CarPage from "./components/admin/Carpage";
import UserPage from "./components/admin/UserPage";
import SalesReport from "./components/admin/SalesReport";
import { BankComponent } from "./components/admin/BankComponent.jsx";
const Layout = ({ children }) => {
  const [user, setUser] = useState(null);
 
  useEffect(() => {
    const email = localStorage.getItem("user");
    if (email) {
      setUser(email);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    setUser(null);
     // Refresh UI after logout
  };
  return (
    <div className="flex w-full h-screen overflow-hidden">
      
    
      <div className="flex-1 flex flex-col">
        <UserNavbar user={user} handleLogout={handleLogout} 
    wishlist={[1, 2]} 
     cart={[1]} 
   />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("user"); // Check if user is logged in
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  const [wishlist, setWishlist] = useState([]);
  const role = localStorage.getItem("role");

  const addToWishlist = (car) => {
    setWishlist((prev) => {
      return prev.some((item) => item._id === car._id)
        ? prev.filter((item) => item._id !== car._id) // Remove if already in wishlist
        : [...prev, car]; // Add if not in wishlist
    });
  };

  const location = useLocation();
  const hideNavbarSidebar = ["/login", "/signup"].includes(location.pathname);

  return (
    <>

      <ToastContainer />
      <div className="w-full h-screen overflow-hidden">
        {!hideNavbarSidebar ? (
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/resetpassword/:token" element={<Resetpassword />} />
          {role === "admin" ?(
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/sell-car" element={<AddCarForm />} />
              <Route path="/admin/cars" element={<CarPage />} />
              <Route path="/SalesReport" element={<SalesReport />} />
              <Route path="/admin/users" element={<UserPage />} />
              
              
               </>) : (
                <>
              <Route path="/dashboard" element={<UserDashboard/>} />
             
              <Route path="/compare" element={<CarCompare />} />
              <Route path="/reviews" element={<CarReviews />} />
              <Route path="/new-cars" element={<MyCars wishlist={wishlist} addToWishlist={addToWishlist} />} />
               <Route path="/wishlist" element={<Wishlist wishlist={wishlist} addToWishlist={addToWishlist} />} />
               <Route path="/feature" element={<CarFeatures />} />
               <Route path="/new-cars/bank" element={<BankComponent/>}/>
               <Route path="/sell-car" element={<AddCarForm />} />
                </>
              )}
              
               <Route path="/profile" element={<UserProfile />} />
            </Routes>
          </Layout>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<ProtectedRoute element={<LandingPage />} />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          </Routes>
        )}
        {}
      </div>
    </>
  );
}

export default App;
