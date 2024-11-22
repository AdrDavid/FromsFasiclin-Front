import React, { useRef, useState, useEffect, Fragment } from "react";
import Paginacao from "./Paginacao";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Tables({
  setModal,
  unidades,
  users,
  setModalNovoUnidade,
  pageSizeTables,
  setPageSizeTables,
  filtro,
}) {
  const abrirModal = (e) => {
    e.preventDefault();
    setModal(true);
  };

  const abrirModalNovoUnidade = (e) => {
    e.preventDefault();
    setModalNovoUnidade(true);
  };

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
              {users
                ?.slice(
                  pageSizeTables.tableUsersMin,
                  pageSizeTables.tableUsersMax
                )
                .map((usuario) => (
                  <tr
                    key={usuario.id}
                    className={`${
                      users.indexOf(usuario) % 2 === 0 ? "bg-[#8afab1]" : ""
                    }`}
                  >
                    <td className="pl-1">{usuario.nomeUsuario}</td>
                    <td className="pl-1">{usuario.cargo}</td>
                    <td className="pl-1">{usuario.unidade?.nomeUnidade}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="absolute bottom-[50px] right-[0px] w-[100%] p-[20px] ">
            <Paginacao
              filtro={filtro}
              pageSizeTables={pageSizeTables}
              setPageSizeTables={setPageSizeTables}
              users={users}
              tableType={"Users"}
              pagesize={10}
              data={users}
            />
          </div>
          <br />
          <br />
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
              {unidades
                ?.sort((a, b) => a.nomeUnidade.localeCompare(b.nomeUnidade))
                .slice(
                  pageSizeTables.tableUnidadesMin,
                  pageSizeTables.tableUnidadesMax
                )
                .map((unid) => (
                  <tr
                    key={unid.id}
                    className={`${
                      unidades.indexOf(unid) % 2 === 0 ? "bg-[#8afab1]" : ""
                    }`}
                  >
                    <td className="pl-1">{unid.nomeUnidade}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="absolute bottom-[50px] right-[0px] w-[100%] p-[20px] ">
            <Paginacao
              filtro={filtro}
              pageSizeTables={pageSizeTables}
              setPageSizeTables={setPageSizeTables}
              unidades={unidades}
              tableType={"Unidades"}
              pagesize={10}
              data={unidades}
            />
          </div>
          <br />
          <br />
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
