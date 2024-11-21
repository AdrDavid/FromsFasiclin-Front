import React, { useRef, useState, useEffect, Fragment } from "react";

import url from "./url";
import axios from "axios";
import { set } from "date-fns";

export default function ModalNovoUsuario({ setModal, unidade, setUnidade }) {
  const [sucesso, setSucesso] = useState(false);

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

    axios
      .post(`${url}/auth/create`, dados, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setSucesso(true);
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
            placeholder="Usuario: "
            className="w-[100%] h-[32px] pl-1 pr-2 border-[1px] border-[#000000] rounded-[8px] "
          />

          <input
            name="senha"
            type="text"
            placeholder="Senha: "
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
          <p className="text-[green]">
            {sucesso ? "Usuario cadastrado com sucesso" : ""}
          </p>
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
