import React, { useRef, useState, useEffect, Fragment } from "react";
import { format, min, parseISO } from "date-fns";
export default function TabelaFiltrada({ filtro, pacientes, minPg, maxPg }) {
  return (
    <>
      <div className="content min-h-[100px]">
        <table className="table-auto w-[100%]  " id="relatorio">
          <thead>
            <tr className="text-left text-[18px] text-[#555555] border-b-[2px] border-[#555555] ">
              <th className="">Clínica</th>
              <th className="">Atendimento</th>
              <th className="">Paciente</th>
              <th className="">Aluno</th>
              <th className="">Período</th>
              <th className="">Data</th>
            </tr>
          </thead>

          <tbody className=" ">
            {filtro(pacientes)
              .slice(minPg, maxPg)
              .map((paciente) => (
                <Fragment key={paciente.id}>
                  <tr
                    className={`${
                      filtro(pacientes).indexOf(paciente) % 2 === 0
                        ? "bg-[#8afab1]"
                        : ""
                    }`}
                  >
                    <td className="p-1 w-[100px] ">{paciente.clinica}</td>
                    <td className=" w-[130px] ">{paciente.tipoPaciente}</td>
                    <td className="">{paciente.nomePaciente}</td>
                    <td className="">
                      {paciente.nomeAluno} {paciente.sobrenomeAluno}
                    </td>
                    <td className="w-[100px] ">{paciente.periodo}</td>
                    <td className=" p-1 w-[120px] ">
                      {format(parseISO(paciente.dataExpedicao), "dd-MM-yyyy")}
                    </td>
                  </tr>
                </Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
