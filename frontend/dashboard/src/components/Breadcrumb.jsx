import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index === items.length - 1 ? (
            <span className="text-[#111111] font-medium">{item.label}</span> // Plain text for the last item
          ) : (
            <Link
              to={item.link}
              className="text-[#8e8e8e] hover:text-[#111111]"
            >
              {item.label}
            </Link>
          )}
          {index < items.length - 1 && <span className="mx-2 text-xl">{'>'}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
