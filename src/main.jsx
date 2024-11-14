import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Dash from "./Components/Dash.jsx";
import Forms from "./Components/Forms.jsx";
import Login from "./Components/Login.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import AdminPage from "./Components/Adm/AdminPage.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dash />
          </PrivateRoute>
        ),
      },
      {
        path: "/forms",
        element: <Forms />,
      },
      {
        path: "/adminpage",

        element: (
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
