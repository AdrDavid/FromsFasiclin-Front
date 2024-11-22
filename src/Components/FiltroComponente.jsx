import React from "react";

export default function FiltroComponente({
  filtrar,
  handleFiltrar,
  limpar,
}) {
  return (
    <>
      <div className="w-[100%] flex flex-wrap  gap-[10px]">
        <select
          onChange={handleFiltrar}
          name="clinica"
          value={filtrar.clinica}
          id=""
          className="shrink rounded-[8px] w-[150px] pl-[10px]  text-[20px] h-[40px] border-[1px] bg-[#ffffff] cursor-pointer "
        >
          <option value="">Clinica</option>
          <option value="Clinica 1">Clinica I</option>
          <option value="Clinica 2">Clinica II</option>
          <option value="Clinica 3">Clinica III</option>
        </select>
        <select
          onChange={handleFiltrar}
          name="tipoPaciente"
          value={filtrar.tipoPaciente}
          id=""
          className="shrink rounded-[8px] w-[150px] pl-[10px]  text-[20px] h-[40px] border-[1px] bg-[#ffffff] cursor-pointer "
        >
          <option value="">Atendimento</option>
          <option value="Pediatria">Pediatria</option>
          <option value="Adulto">Adulto</option>
          <option value="Geriatria">Geriatria</option>
        </select>
        <select
          onChange={handleFiltrar}
          name="periodo"
          value={filtrar.periodo}
          id=""
          className="shrink rounded-[8px] w-[150px] pl-[10px]  text-[20px] h-[40px] border-[1px] bg-[#ffffff] cursor-pointer "
        >
          <option value="">Período</option>
          <option value="Matutino">Matutino</option>
          <option value="Noturno">Noturno</option>
        </select>
        <input
          onChange={handleFiltrar}
          name="nomeAluno"
          value={filtrar.nomeAluno}
          type="text"
          placeholder="Aluno"
          className="shrink rounded-[8px] w-[150px] pl-[10px]  text-[20px] h-[40px] border-[1px] cursor-pointer "
        />
        <input
          onChange={handleFiltrar}
          name="nomePaciente"
          value={filtrar.nomePaciente}
          type="text"
          placeholder="Paciente"
          className="shrink rounded-[8px] w-[150px] pl-[10px]  text-[20px] h-[40px] border-[1px] cursor-pointer "
        />
        <input
          onChange={handleFiltrar}
          name="dataExpedicao"
          value={filtrar.dataExpedicao}
          type="date"
          className="shrink rounded-[8px] w-[150px] pl-[5px]  text-[17px] h-[40px] border-[1px] cursor-pointer "
        />

        <button
          onClick={limpar}
          className="100px rounded-[8px] w-[150px] bg-[#2376d4] text-[#ffffff]   text-[20px] h-[40px] border-[1px] border-[#ffffff]"
        >
          Limpar
        </button>
      </div>
    </>
  );
}
