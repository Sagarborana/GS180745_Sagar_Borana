import React from "react";
import Logo from "../assets/GsynergyLogo.svg"

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white text-black p-4 shadow-md h-15">
      <img src={Logo} className="h-12"/>
    </header>
  );
};

export default Header;
