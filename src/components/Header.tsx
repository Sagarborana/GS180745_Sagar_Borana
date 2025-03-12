import React from "react";
import Logo from "../assets/GsynergyLogo.svg"
import { MdOutlineLogout } from "react-icons/md";
import { logout } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = (e: React.FormEvent) => {
      e.preventDefault();

        dispatch(logout());
        navigate("/login");
    };
  return (
    <header className="w-full bg-white text-black p-4 shadow-md h-15 flex justify-between">
      <img src={Logo} className="h-12"/>
      <MdOutlineLogout size={30} className="cursor-pointer" onClick={handleLogout}/>
    </header>
  );
};

export default Header;
