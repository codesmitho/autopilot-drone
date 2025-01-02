import React, { useState } from "react";

const ButtonAdd = ({ label }) => {

  return (
    <button
      className="flex items-center gap-2 bg-[#111111] text-white px-3 py-[6px] rounded-lg font-medium 
      border border-[#111111] hover:bg-[#2e2e2e] hover:border-[#2e2e2e] transition-all"
      title={label}
    >
      <img
        src="/image/add.svg"
        alt={`${label} icon`}
        className="w-4 h-4"
      />

      <span>{label}</span>
    </button>
  );
};

export default ButtonAdd;
