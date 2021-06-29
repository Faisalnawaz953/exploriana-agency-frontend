import React from "react";
import Loader from "react-loader-spinner";
import "../../App.css";
export default function PageLoading() {
  return (
    <div className="spinner">
      <Loader
        type="BallTriangle"
        radius={5}
        color="#217E9A"
        height={170}
        width={170}
      />
    </div>
  );
}
