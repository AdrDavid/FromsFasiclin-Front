import React from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
export default function Logout() {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("token");

    localStorage.clear();

    navigate("/login");

    navigate(0);
  };

  return (
    <button
      onClick={Logout}
      className="text-[#6e6e6e] text-[40px]  mt-[5px]  "
    >
      <FiLogOut />
    </button>
  );
}
