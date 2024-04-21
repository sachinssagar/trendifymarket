import React, { useState, useEffect } from "react";
import { SyncLoader } from "react-spinners";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/profile`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <SyncLoader color="#36d7b7" margin={10} size={20} />
      </div>
    );
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.fullName}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
