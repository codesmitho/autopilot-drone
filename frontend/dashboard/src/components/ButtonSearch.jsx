import React from "react";

const ButtonSearch = ({ onSearchChange, width, placeHolder }) => {
  return (
    <div className="relative" title="Search" style={{ width }}>
      <span className="absolute left-3 top-2.5">
        <img src="/image/search.svg" alt="Search icon" className="w-4 h-4" />
      </span>
      <input
        type="text"
        placeholder={placeHolder}
        className="pl-10 pr-4 py-[6px] w-full border border-[#b6b6b6] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#979797]"
        onChange={onSearchChange}
      />
    </div>
  );
};

export default ButtonSearch;
