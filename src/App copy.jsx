import { useState } from "react";
import "./App.css";
import Froms from "./Components/Forms";
import Desh from "./Components/Desh";
import Login from "./Components/Login";
import RotaProtegida from "./Hooks/Protect";
import { AuthProvider } from "./Hooks/AuthContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Froms /> */}
      {/* <Outlet /> */}

      <AuthProvider>
        <RotaProtegida>
          <Outlet />
        </RotaProtegida>
      </AuthProvider>
    </>
  );
}

export default App;
