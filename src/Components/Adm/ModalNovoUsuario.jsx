import React from "react";
import { useRef, useState, useEffect, Fragment } from "react";
import { dadosUser } from "./dadosTeste";
import url from "../url";
import axios from "axios";
export default function ModalNovoUsuario({ setModal, unidade, setUnidade }) {
  const modalRef = useRef();
  const fecharModal = (e) => {
    e.preventDefault();
    if (
      (modalRef.current && !modalRef.current.contains(e.target)) ||
      e.key === "Escape"
    ) {
      setModal(false);
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
      nomeUsuario: e.target.nome.value,
      senha: e.target.senha.value,
      unidadeId: +e.target.unidade.value,
    };

    console.log(dados);

    axios
      .post(`${url}/auth/create`, dados, {
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
        <h1>Novo usuario</h1>
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

          <input
            name="senha"
            type="text"
            className="w-[100%] h-[32px] pl-1 pr-2 border-[1px] border-[#000000] rounded-[8px] "
          />

          <select
            name="unidade"
            className="w-[100%] h-[35px] pl-1 pr-2 border-[1px] border-[#000000] rounded-[8px] "
          >
            <option value="">Unidade</option>
            {unidade.map((unid) => (
              <Fragment key={unid.id}>
                <option value={unid.id}>{unid.nomeUnidade}</option>
              </Fragment>
            ))}
          </select>

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
