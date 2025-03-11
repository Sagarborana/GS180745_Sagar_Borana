import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-48 bg-white text-black">
      <nav>
        <ul className="space-y-4 list-none py-4">
          <li><NavLink to="/store" className="block py-2 px-6 hover:bg-gray-700 hover:text-white">Store</NavLink></li>
          <li><NavLink to="/sku" className="block p-2 px-6 hover:bg-gray-700 hover:text-white">SKU</NavLink></li>
          <li><NavLink to="/planning" className="block p-2 px-6 hover:bg-gray-700 hover:text-white">Planning</NavLink></li>
          <li><NavLink to="/charts" className="block p-2 px-6 hover:bg-gray-700 hover:text-white">Charts</NavLink></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
