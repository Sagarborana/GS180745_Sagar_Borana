import React from "react";
import { MdInsertChartOutlined, MdOutlineStore } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { IoBarChart } from "react-icons/io5";
import { LuShapes } from "react-icons/lu";

const Sidebar: React.FC = () => {
  return (
    <div className="w-48 bg-white text-black">
      <nav>
        <ul className="list-none py-4">
          <li>
            <NavLink
              to="/store"
              className={({ isActive }) =>
                `block py-4 px-6 hover:bg-[#DFDFDF] flex gap-2 ${
                  isActive ? "bg-[#DFDFDF]" : ""
                }`
              }
            >
              <MdOutlineStore size={24} />
              Store
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sku"
              className={({ isActive }) =>
                `block py-4 px-6 hover:bg-[#DFDFDF] flex gap-2 ${
                  isActive ? "bg-[#DFDFDF]" : ""
                }`
              }
            >
              <LuShapes size={24} />
              SKU
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/planning"
              className={({ isActive }) =>
                `block py-4 px-6 hover:bg-[#DFDFDF] flex gap-2 ${
                  isActive ? "bg-[#DFDFDF]" : ""
                }`
              }
            >
              <IoBarChart size={24} />
              Planning
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/charts"
              className={({ isActive }) =>
                `block py-4 px-6 hover:bg-[#DFDFDF] flex gap-2 ${
                  isActive ? "bg-[#DFDFDF]" : ""
                }`
              }
            >
              <MdInsertChartOutlined size={24} />
              Charts
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
