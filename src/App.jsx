import { useState } from "react";
import "./App.css";
import Froms from "./Components/Forms";
// import Desh from "./Components/Desh";
import RotaProtegida from "./Hooks/Protect";
import { AuthProvider } from "./Hooks/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login"; // Certifique-se de que o caminho está correto

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/desh"
            element={
              <RotaProtegida>
                <Outlet />
              </RotaProtegida>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
