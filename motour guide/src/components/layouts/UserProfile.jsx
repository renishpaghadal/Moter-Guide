import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("id");
      console.log(userId)

      try {
        try {
         
        
          const res = await axios.get(`http://localhost:3000/users?id=${userId}`);
          const user = res.data.data;
        
          setUserData({
            FirstName: user.FirstName,
            LastName: user.LastName,
            email: user.email,
            role: user.role,
            profilePic: user.profilePic || "/default-avatar.png",
          });
        } catch (err) {
          console.error("Failed to fetch user data", err);
        }
        
        const res = await axios.get(`http://localhost:3000/users/${userId}`);
        const user = res.data.data;
        console.log(user)
      
        setUserData({
          FirstName: user.FirstName,
          LastName: user.LastName,
          email: user.email,
          role: user.role,
          profilePic: user.profilePic || "/default-avatar.png",
        });
     

        setFormData({
          FirstName: res.data.data.FirstName,
          LastName: res.data.data.LastName,
          email: res.data.data.email,
        });
      } catch (error) {
        toast.error("Failed to load user data");
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => setEditing(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `http://localhost:3000/users/${userId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        }
      );

      setUserData((prev) => ({ ...prev, ...res.data }));
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreview(URL.createObjectURL(file)); // Show preview
  };

  const uploadProfilePic = async () => {
    if (!profilePic) return toast.error("Please select an image!");

    const formData = new FormData();
    formData.append("profilePic", profilePic);

    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(`http://localhost:3000/users/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      setUserData((prev) => ({ ...prev, profilePic: res.data.profilePic }));
      toast.success("Profile picture updated!");
      setPreview(null);
    } catch (error) {
      toast.error("Failed to upload profile picture.");
    }
  };

  if (!userData) return <p className="text-center mt-10">Loading user data...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          {/* Profile Picture */}
          <img
            src="public/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"
            alt="Profile"
            className="w-24 h-24 rounded-full border border-gray-300 object-cover"
          />
          {editing && (
            <div className="mt-3">
              <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2" />
              <button onClick={uploadProfilePic} className="bg-blue-600 text-white px-3 py-1 rounded">
                Upload
              </button>
            </div>
          )}

          <h2 className="text-2xl font-bold text-orange-600 mt-3">
            {editing ? "Edit Profile" : `${userData.FirstName} ${userData.LastName}`}
          </h2>
        </div>

        <div className="space-y-4">
          {editing ? (
            <>
              <div>
                <label className="block text-gray-600 font-semibold">First Name:</label>
                <input
                  type="text"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-semibold">Last Name:</label>
                <input
                  type="text"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-semibold">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-gray-600 font-semibold">Email:</label>
                <p className="text-gray-700">{userData.email}</p>
              </div>
              <div>
                <label className="block text-gray-600 font-semibold">Role:</label>
                <p className="text-gray-700">{userData.role}</p>
              </div>
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          {editing ? (
            <>
              <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={() => setEditing(false)} className="bg-gray-600 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </>
          ) : (
            <button onClick={handleEdit} className="bg-orange-600 text-white px-4 py-2 rounded">
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
