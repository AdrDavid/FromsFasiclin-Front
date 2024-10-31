import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Desh from "./Components/Desh.jsx";
import Forms from "./Components/Forms.jsx";
import Login from "./Components/Login.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/deshboard",
        element: (
          <PrivateRoute>
            <Desh />
          </PrivateRoute>
        ),
      },
      {
        path: "/forms",
        element: (
          
            <Forms />
          
        ),
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);