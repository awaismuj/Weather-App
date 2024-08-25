import React from "react";
import { ImSpinner8 } from "react-icons/im";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600">
      <ImSpinner8 className="text-5xl animate-spin text-white" />
    </div>
  );
};

export default Loader;
