import React from "react";

const typeColors = {
  Scout: "bg-[#009C10]",
  Navigation: "bg-[#1279C7]",
  Delivery: "bg-[#E29922]",
};

const FeatureLabel = ({ label }) => {
  return (
    <button
      className={`px-3 py-1 rounded-xl text-sm font-medium ${
        typeColors[label] || "bg-gray-200"
      } text-white cursor-default`}
      title={label}
    >
      {label}
    </button>
  );
};

export default FeatureLabel;
