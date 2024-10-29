import { useState } from "react";
import "./App.css";
import Froms from "./Components/Forms";
import Desh from "./Components/Desh";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Froms /> */}
      <Outlet />
    </>
  );
}

export default App;
