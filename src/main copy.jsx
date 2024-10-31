import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Desh from "./Components/Desh.jsx";
import Forms from "./Components/Forms.jsx";
import Login from "./Components/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/deshboard",
        element: <Desh />,
      },
      {
        path: "/forms",
        element: <Forms />,
      },
      {
        path: "/login",
        element: <Login />,}
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
