import React from "react";
import { SyncLoader } from "react-spinners";

const Loader = ({ color = "#36d7b7", margin = 10, size = 20 }) => {
  return (
    <div className="loader-container">
      <SyncLoader color={color} margin={margin} size={size} />
    </div>
  );
};

export default Loader;
