import { useState } from "react";

import Froms from "./Components/Forms";
import Desh from "./Components/Dash";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Login from "./Components/Login";

function App() {
  return <Outlet />;
}

export default App;
