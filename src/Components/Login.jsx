import React, { useState } from "react";
import Logo from "../assets/Images/Logo.png";
import {  useNavigate } from "react-router-dom";
import url from "./url";
import axios from "axios";

export default function Login() {
  const [usuarioInvalido, setUsuarioInvalido] = useState(false);
  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${url}/auth/login`, {
        nomeUsuario: e.target.usuario.value,
        senha: e.target.senha.value,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);

        navigate("/dashboard");
      })
      .catch((error) => {
        if (error) {
          setUsuarioInvalido(error.response.data.message);
        }
      });
  };

  return (
    <>
      <div className="w-[100%] h-[100vh] flex">
        <div className="w-[500px] min-h-[400px] bg-[#fff] m-auto rounded-[8px]">
          <img src={Logo} alt="" className="w-[100px] m-auto mt-[40px]" />

          <form action="" className="p-[20px]" onSubmit={formSubmit}>
            <span className="mt-[30px]">Usuario</span>
            <input
              name="usuario"
              type="text"
              className="w-[100%] m-auto mt-[5px] mb-[15px] border-[1px] border-[#000] p-[7px] rounded-[8px]"
            />
            <span className="mt-[30px]">Senha</span>
            <input
              type="password"
              name="senha"
              className="w-[100%] m-auto mt-[5px] border-[1px] border-[#000] p-[7px] rounded-[8px]"
            />
            <div className="relative w-[100%] ">
              <button className="absolute right-0 w-[120px] m-auto mt-[15px] border-[1px] bg-[#31A358] text-[#fff] p-[5px] rounded-[8px]">
                Entrar
              </button>
              <p className="text-red-500 text-[20px]">{usuarioInvalido}</p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
