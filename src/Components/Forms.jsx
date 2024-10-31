import React, { useState } from "react";
import Fasipe from "../assets/Images/Fasipe.png";
import Logo from "../assets/Images/Logo.png";
import axios from "axios";
import url from "./url";
export default function Forms() {
  const [erro, setErro] = useState("");

  const cadastrar = (e) => {
    e.preventDefault();
    const dados = {
      RA: e.target.ra.value,
      nomeAluno: e.target.nomeAluno.value,
      sobrenomeAluno: e.target.sobrenomeAluno.value,
      tipoPaciente: e.target.tipoPaciente.value,
      dataExpedicao: e.target.dataExpedicao.value,
      nomePaciente: e.target.nomePaciente.value,
      clinica: e.target.clinica.value,
      periodo: e.target.periodo.value,
    };

    axios
      .post(`${url}/forms/create`, dados)
      .then((response) => {
        
      })
      .catch((error) => {
       
        
          
          setErro(error.response.data.message);
          setTimeout(() => {
            setErro("");
          }, 3000);
       
      });
  };

  return (
    <>
      <div className="p-[20px] md:w-[800px] w-[100%] m-auto">
        <form action="" onSubmit={cadastrar}>
          <div className="h-[100px]  w-[100%] m-auto bg-[#ffffff] pl-[20px] rounded-[8px] flex gap-[20px] items-center ">
            <img src={Logo} alt="" className="h-[70px]" />
            <img src={Fasipe} alt="" className="h-[60px]" />
          </div>
          <br />
          <div className="min-h-[400px] pt-[50px] p-[20px]  w-[100%] m-auto bg-[#ffffff] rounded-[8px]  ">
            <h1 className="text-[32px] font-bold text-center">
              Dados do Aluno
            </h1>
            <br />
            <br />
            <span className="text-[28px] font-bold">Nome</span>
            <input
              type="text"
              name="nomeAluno"
              placeholder="Digite seu Nome..."
              required
              className="rounded-[8px] p-[10px] text-[22px] w-[100%] sm:h-[60px] h-[80px] border-[1px] border-[#000000]"
            />
            <br />
            <br />
            <br />
            <span className="text-[28px] font-bold">Sobrenome</span>
            <input
              type="text"
              name="sobrenomeAluno"
              placeholder="Seu Sobrenome..."
              required
              className="rounded-[8px] p-[10px]  text-[22px] w-[100%] sm:h-[60px] h-[80px] border-[1px] border-[#000000]"
            />
            <br />
            <br />
            <br />
            <span className="text-[28px] font-bold">RA</span>
            <input
              type="text"
              name="ra"
              placeholder="Seu RA..."
              required
              className="rounded-[8px] p-[10px]  text-[22px] w-[100%] sm:h-[60px] h-[80px] border-[1px] border-[#000000]"
            />
            <br />
            <br />
            <br />
          </div>
          <br />
          <div className="min-h-[400px] pt-[50px] p-[20px]   w-[100%] m-auto bg-[#ffffff] rounded-[8px]  ">
            <h1 className="text-[32px] font-bold text-center">
              Dados do Paciente
            </h1>
            <br />
            <br />
            <span className="text-[28px] font-bold">Nome Completo</span>
            <input
              type="text"
              name="nomePaciente"
              required
              placeholder="Digite o nome do Paciente..."
              className="rounded-[8px] p-[10px]  text-[22px] w-[100%] sm:h-[60px] h-[80px] border-[1px] border-[#000000]"
            />
            <br />
            <br />
            <br />
            <span className="text-[28px] font-bold">Clínica</span>
            <select
              name="clinica"
              id=""
              required
              className="rounded-[8px] p-[10px]  text-[22px] w-[100%] sm:h-[60px] h-[80px] border-[1px] border-[#000000]"
            >
              <option value="">Selecione</option>
              <option value="Clinica 1">Clínica 1</option>
              <option value="Clinica 2">Clínica 2</option>
              <option value="Clinica 3">Clínica 3</option>
            </select>
            <br />
            <br />
            <br />
            <span className="text-[28px] font-bold">Tipo Paciente</span>
            <select
              name="tipoPaciente"
              id=""
              required
              className="rounded-[8px] p-[10px]  text-[22px] w-[100%] sm:h-[60px] h-[80px] border-[1px] border-[#000000]"
            >
              <option value="">Selecione</option>
              <option value="Pediatria">Pediatria</option>
              <option value="Adulto">Adulto</option>
              <option value="Geriatria">Geriatria</option>
            </select>
            <br />
            <br />
            <br />
            <span className="text-[28px] font-bold">Período</span>
            <select
              name="periodo"
              id=""
              required
              className="rounded-[8px] p-[10px]  text-[22px] w-[100%] sm:h-[60px] h-[80px] border-[1px] border-[#000000]"
            >
              <option value="">Selecione</option>
              <option value="Matutino">Matutino</option>
              <option value="Noturno">Noturno</option>
            </select>
            <br />
            <br />
            <br />
            <span className="text-[28px] font-bold">Data</span>
            <input
              type="date"
              name="dataExpedicao"
              id=""
              required
              className="rounded-[8px] p-[10px]  text-[22px] w-[100%] sm:h-[60px] h-[80px] border-[1px] border-[#000000]"
            />
            <p className="text-red-500 text-[20px]">{erro}</p>
            <br />
            <br />
            <br />
          </div>
          <br />
          <button className="h-[60px] w-[100%] m-auto bg-[#006cc3] text-[28px] text-[#ffffff] rounded-[8px] ">
            Enviar
          </button>
          <br />
          <br />
          <br />
        </form>
      </div>
    </>
  );
}
