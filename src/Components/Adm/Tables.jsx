import React, { useRef, useState, useEffect, Fragment } from "react";
import { dadosUser } from "./dadosTeste";
import { dadosUnidades } from "./dadosTeste";
import ModalNovoUsuario from "./ModalNovoUsuario";
import url from "../url";
import axios from "axios";
export default function Tables({
  setModal,
  unidade,
  setUnidade,
  user,
  setUser,
  setModalEditarUsuarios,
  onEditUser,
  setModalNovoUnidade,
}) {
  const abrirModal = (e) => {
    e.preventDefault();
    setModal(true);
  };

  const abrirModalNovoUnidade = (e) => {
    e.preventDefault();
    setModalNovoUnidade(true);
  };
  // console.log("TESTANDO");
  // console.log(unidade);
  // console.log(unidade?.nome);

  return (
    <>
      <div className="w-[100%] justify-between flex flex-wrap gap-[10px] bg-[#1b706900] min-h-[100px]  ">
        <div className="w-[64%] min-h[100px] bg-[#ffffff] rounded-[8px] p-[20px] relative ">
          <table className="table-auto w-[100%] mb-[50px]">
            <thead className="text-left text-[18px] text-[#555555] border-b-[2px] border-[#555555] ">
              <tr className="">
                <th>Usuario</th>
                <th>Cargo</th>
                <th>Unidade</th>
              </tr>
            </thead>

            <tbody>
              {user?.map((usuario) => (
                <tr
                  key={usuario.id}
                  className={`${
                    user.indexOf(usuario) % 2 === 0 ? "bg-[#8afab1]" : ""
                  }`}
                >
                  <td className="pl-1">{usuario.nomeUsuario}</td>
                  <td className="pl-1">{usuario.cargo}</td>
                  <td className="pl-1">{usuario.unidade?.nomeUnidade}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            onClick={abrirModal}
            className=" min-h-[20px]   flex justify-end absolute bottom-[20px] right-[20px] "
          >
            <button className=" right-0  rounded-[8px] pl-[12px] pr-[12px] pt-[2px] pb-[5px] bg-[#2376d4] text-[#ffffff] text-[20px] border-[1px] border-[#ffffff]">
              Novo
            </button>
          </div>
        </div>
        <div className="w-[34%] min-h[100px] bg-[#ffffff] rounded-[8px] p-[20px] relative">
          <table className="table-auto w-[100%] mb-[50px] ">
            <thead className="text-left text-[18px] text-[#555555] border-b-[2px] border-[#555555] ">
              <tr className="">
                <th className="">Unidade</th>
              </tr>
            </thead>
            <tbody className="">
              {unidade?.map((unid) => (
                <tr
                  key={unid.id}
                  className={`${
                    unidade.indexOf(unid) % 2 === 0 ? "bg-[#8afab1]" : ""
                  }`}
                >
                  <td className="pl-1">{unid.nomeUnidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className=" min-h-[20px]   flex justify-end absolute bottom-[20px] right-[20px] ">
            <button
              onClick={abrirModalNovoUnidade}
              className=" right-0  rounded-[8px] pl-[12px] pr-[12px] pt-[2px] pb-[5px] bg-[#2376d4] text-[#ffffff] text-[20px] border-[1px] border-[#ffffff]"
            >
              Novo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
