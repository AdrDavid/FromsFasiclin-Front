import { useState } from "react";

import Froms from "./Components/Forms";
import Desh from "./Components/Dash";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Login from "./Components/Login";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}

export default App;
