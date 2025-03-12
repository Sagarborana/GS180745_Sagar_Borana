import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex bg-[#DBDBDB] h-[calc(100vh-60px)]">
      <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

