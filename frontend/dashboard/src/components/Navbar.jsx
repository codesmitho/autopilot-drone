import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ defaultIcon, hoverIcon, label, activePath }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const isActive = location.pathname.startsWith(activePath);

  return (
    <li
      className={` flex flex-col items-center justify-center cursor-pointer px-8 py-3 ${
        isHovered ? "bg-[#f3f4f6] rounded-xl" : "bg-none rounded-none"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={label}
    >
      <div
        className={`p-2 flex justify-center items-center w-10 h-10 ${
          isActive ? "bg-[#111111] rounded-lg" : "bg-none"
        }`}
      >
        <img
          src={isActive ? hoverIcon : defaultIcon}
          alt={label}
          className="w-5 h-5"
        />
      </div>

      <div className="text-center mt-1">{label}</div>
    </li>
  );
};

export default function navbar() {
  return (
    <div className="flex h-screen">
      <nav className="text-[#111111] text-xs text-center w-full flex flex-col items-center py-8">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <Link to="/">
              <img
                src="/image/Logo_nobg.svg"
                className="w-7 h-auto"
                title="Home"
              />
            </Link>
          </div>

          <ul>
            <Link to="/cases">
              <NavItem
                defaultIcon="/image/case.svg"
                hoverIcon="/image/case_hover.svg"
                label="Cases"
                activePath="/cases"
              />
            </Link>
            <Link to="/drones">
              <NavItem
                defaultIcon="/image/drones.svg"
                hoverIcon="/image/drones_hover.svg"
                label="Drones"
                activePath="/drones"
              />
            </Link>
          </ul>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto">
          <div
            className="bg-[#111111] rounded-lg px-2 pt-2 flex items-center cursor-pointer"
            title="Account"
          >
            <img src="/image/user_pic.png" className="w-5 h-auto" />
          </div>
        </div>
      </nav>
    </div>
  );
}
