import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../common/Loader";
import { toast } from "react-toastify";

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
        toast.error("Error fetching user profile");
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">User Profile</h2>
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <p className="form-control">{user.fullName}</p>
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <p className="form-control">{user.email}</p>
              </div>
              <Link to="/edit-profile" className="btn btn-primary">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
