import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-48 bg-white text-black">
      <nav>
        <ul className="list-none py-4">
          <li><NavLink to="/store" className={({ isActive }) =>
                  `block py-4 px-6 hover:bg-gray-700 hover:text-white ${
                    isActive ? "bg-gray-700 text-white" : ""
                  }`
                }>Store</NavLink></li>
          <li><NavLink to="/sku" className={({ isActive }) =>
                  `block py-4 px-6 hover:bg-gray-700 hover:text-white ${
                    isActive ? "bg-gray-700 text-white" : ""
                  }`
                }>SKU</NavLink></li>
          <li><NavLink to="/planning" className={({ isActive }) =>
                  `block py-4 px-6 hover:bg-gray-700 hover:text-white ${
                    isActive ? "bg-gray-700 text-white" : ""
                  }`
                }>Planning</NavLink></li>
          <li><NavLink to="/charts" className={({ isActive }) =>
                  `block py-4 px-6 hover:bg-gray-700 hover:text-white ${
                    isActive ? "bg-gray-700 text-white" : ""
                  }`
                }>Charts</NavLink></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
