import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import url from "./url";
import Logo from "../assets/Images/Logo.png";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        await axios.get(`${url}/auth/validate`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="w-[100%] h-[100vh] bg-[#e2e2e2]">
        <div className="w-[100%] h-[100vh] flex justify-center flex-col items-center">
          <img src={Logo} alt="" className="animate-pulse  w-[300px] " />
          <br />
          <br />
          <p className="text-[#31a358] text-[20px] tracking-[7px] text-center mt-[30px]">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
