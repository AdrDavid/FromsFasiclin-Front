import React from "react";
import { useRef, useState, useEffect, Fragment } from "react";
import { dadosUser } from "./dadosTeste";
import url from "../url";
import axios from "axios";
export default function ModalNovoUnidade({
  setModalNovoUnidade,
  unidade,
  setUnidade,
}) {
  const modalRef = useRef();
  const fecharModal = (e) => {
    e.preventDefault();
    if (
      (modalRef.current && !modalRef.current.contains(e.target)) ||
      e.key === "Escape"
    ) {
      setModalNovoUnidade(false);
    }
  };

  window.addEventListener("keyup", fecharModal);

  console.log(unidade.map((unidade) => unidade.id));
  const novoUsuario = (e) => {
    e.preventDefault();
    const dados = {
      // nomeUsuario: "davidiano",
      // senha: "123456",
      // unidadeId: 2
      nomeUnidade: e.target.nome.value,
    };

    console.log(dados);

    axios
      .post(`${url}/unidades`, dados, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log("cadastrado com sucesso");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      onClick={fecharModal}
      className="w-[100%] h-[100vh] fixed bg-[#000000bd]  z-20 flex justify-center items-center"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-[400px]  bg-[#ffffff] rounded-[8px] p-[40px] "
      >
        <h1>Nova unidade</h1>
        <br />
        <form
          onSubmit={novoUsuario}
          action=""
          className="flex flex-col gap-[10px]"
        >
          <input
            name="nome"
            type="text"
            className="w-[100%] h-[32px] pl-1 pr-2 border-[1px] border-[#000000] rounded-[8px] "
          />

          <div className="flex justify-end mt-[20px] ">
            <button className="bg-[#2376d4] text-[#fff] px-2 py-1">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
