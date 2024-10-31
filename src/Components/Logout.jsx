import React from "react";
import { useNavigate } from "react-router-dom";

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
      className="text-[#6e6e6e] text-[16px] absolute right-[0px]"
    >
      Logout
    </button>
  );
}
