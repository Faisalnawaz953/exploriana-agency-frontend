import React from "react";
import Loader from "react-loader-spinner";
import "../../App.css";
export default function FileLoader() {
  return (
    <div className="loader ">
      <Loader
        type="Circles"
        radius={5}
        color="#217E9A"
        height={40}
        width={40}
      />
    </div>
  );
}
