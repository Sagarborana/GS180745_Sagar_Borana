import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-48 bg-white text-black p-4">
      <nav>
        <ul className="space-y-4 list-none">
          <li><NavLink to="/" className="block p-2 hover:bg-gray-700">Store</NavLink></li>
          <li><NavLink to="/store" className="block p-2 hover:bg-gray-700">Store</NavLink></li>
          <li><NavLink to="/services" className="block p-2 hover:bg-gray-700">Services</NavLink></li>
          <li><NavLink to="/contact" className="block p-2 hover:bg-gray-700">Contact</NavLink></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
