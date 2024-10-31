import { useState } from "react";
import "./App.css";
import Froms from "./Components/Forms";
import Desh from "./Components/Desh";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Login from "./Components/Login"; // Certifique-se de que o caminho está correto

function App() {
  return (
    <Outlet />
  );
}

export default App;
