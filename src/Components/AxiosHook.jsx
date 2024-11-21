import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import url from "./url";

const useApiQuery = (key, url, options = {}) => {
  const {
    transformResponse = (data) => data,
    headers = {},
    enabled = true,
    refetchInterval,
  } = options;

  return useQuery({
    queryKey: [key],

    queryFn: async () => {
      const response = await axios.get(url, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          ...headers,
        },
      });
      return transformResponse(response.data);
    },

    enabled,
    refetchInterval,
  });
};

export const useUnidades = () => {
  return useApiQuery("unidades", `${url}/unidades`, {
    refetchInterval: 0.2,
  });
};

export const useUsuarios = () => {
  return useApiQuery("usuarios", `${url}/usuarios/all`, {
    refetchInterval: 0.2,
  });
};

export const usePacientes = (userLevel = "DASH") => {
  const apiUrl = userLevel === "DASH" ? `${url}/forms` : `${url}/forms/all` 
  return useApiQuery("pacientes", apiUrl, {
    transformResponse: (data) =>
      data
        ? data.map((paciente) => ({
            ...paciente,
            dataExpedicao: format(
              new Date(paciente.dataExpedicao),
              "yyy-MM-dd"
            ),
          }))
        : [], refetchInterval: 1800000,
  });
};

export const useAuthValidation = () => {
  return useQuery({
    queryKey: ["authValidation"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${url}/auth/validate`, {
        headers: {
          Authorization: `${token} `,
        },
      });

      return response.data.cargo;
    },
  });
};
