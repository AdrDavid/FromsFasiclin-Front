import { ca } from "date-fns/locale";
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    // setToken(localStorage.getItem("token"));
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const validateToken = async () => {
    try {
      const response = await axios.get(`${url}/auth/validate`, {
        headers: {
          Authorization: token,
        },
      });
      return response.status === 200;
    } catch (error) {
      logout();
      return false;
    }
  };

  useEffect(() => {
    if (token) {
      validateToken().then((isValid) => {
        if (!isValid) {
          logout();
        }
      });
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout, validateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
