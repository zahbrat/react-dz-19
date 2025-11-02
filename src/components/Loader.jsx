import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loader = () => (
  <div className="flex justify-center items-center py-5">
    <RotatingLines
      strokeColor="#3f51b5"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
  </div>
);

export default Loader;
