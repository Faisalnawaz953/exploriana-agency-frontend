import React from "react";
import Loader from "react-loader-spinner";
import "../../App.css";
export default function ApiLoader() {
  return (
    <div className="loader ">
      <Loader type="Puff" radius={5} color="#217E9A" height={70} width={70} />
    </div>
  );
}
