import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../common/Loader";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

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
        const userData = response.data.user;
        setFullName(userData.fullName);
        setEmail(userData.email);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Error fetching user profile");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/auth/profile`,
        { fullName, email, password },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success("Profile updated successfully");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card" style={{ background: "#82A0AA" }}>
            <div className="card-body text-white">
              <h2 className="card-title">User Profile</h2>
              {!editMode ? (
                <div>
                  <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <p className="form-control">{fullName}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <p className="form-control">{email}</p>
                  </div>
                  <button className="btn btn-primary" onClick={handleEditClick}>
                    Edit Profile
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
