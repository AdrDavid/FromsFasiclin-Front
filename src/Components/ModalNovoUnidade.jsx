import React, { useRef, useState, useEffect, Fragment } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import url from "./url";
import axios from "axios";
export default function ModalNovoUnidade({
  setModalNovoUnidade,
}) {
  const [sucesso, setSucesso] = useState(false);
  const modalRef = useRef();
  const queryClient = useQueryClient();
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

  const mutation = useMutation({
    mutationFn: (unidade) => {


      return axios.post(`${url}/unidades`, unidade, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      // return novoUnidade(unidade);
    },
    onSuccess: () => {
      setSucesso(true);
      // refetch();
      queryClient.invalidateQueries(["unidades"]);
      // setTimeout(() => {
      //   setSucesso(false);
      // }, 3000);
    },
  });

  const novoUnidade = (e) => {
    e.preventDefault();
    const dados = {
      // nomeUsuario: "davidiano",
      // senha: "123456",
      // unidadeId: 2
      nomeUnidade: e.target.nome.value,
    }

    mutation.mutate(dados);
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
          onSubmit={novoUnidade}
          // onSubmit={(e) => mutation.mutate(e.target)}
          action=""
          className="flex flex-col gap-[10px]"
        >
          <input
            name="nome"
            type="text"
            placeholder="Nome da unidade"
            className="w-[100%] h-[32px] pl-1 pr-2 border-[1px] border-[#000000] rounded-[8px] "
          />

          <div className="flex justify-end mt-[20px] ">
            <p className="text-[green]">
              {sucesso ? "Usuario cadastrado com sucesso" : ""}
            </p>
            <button className="bg-[#2376d4] text-[#fff] px-2 py-1">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
