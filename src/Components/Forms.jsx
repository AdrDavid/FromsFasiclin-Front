import React from "react";
import Fasipe from "../assets/Images/Fasipe.png";
import Logo from "../assets/Images/Logo.png";
export default function Forms() {
  return (
    <>
      <div className="p-[20px] md:w-[800px] w-[100%] m-auto">
        <form action="">
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
              placeholder="Digite seu Nome..."
              className="rounded-[8px] p-[10px]  text-[22px] w-[100%] sm:h-[60px] h-[80px] border-[1px] border-[#000000]"
            />
            <br />
            <br />
            <br />
            <span className="text-[28px] font-bold">Sobrenome</span>
            <input
              type="text"
              placeholder="Seu Sobrenome..."
              className="rounded-[8px] p-[10px]  text-[22px] w-[100%] sm:h-[60px] h-[80px] border-[1px] border-[#000000]"
            />
            <br />
            <br />
            <br />
            <span className="text-[28px] font-bold">RA</span>
            <input
              type="Number"
              placeholder="Seu RA..."
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
              placeholder="Digite o nome do Paciente..."
              className="rounded-[8px] p-[10px]  text-[22px] w-[100%] sm:h-[60px] h-[80px] border-[1px] border-[#000000]"
            />
            <br />
            <br />
            <br />
            <span className="text-[28px] font-bold">Clínica</span>
            <select
              name=""
              id=""
              className="rounded-[8px] p-[10px]  text-[22px] w-[100%] sm:h-[60px] h-[80px] border-[1px] border-[#000000]"
            >
              <option value="">Selecione</option>
              <option value="">Clínica 1</option>
              <option value="">Clínica 2</option>
              <option value="">Clínica 3</option>
            </select>
            <br />
            <br />
            <br />
            <span className="text-[28px] font-bold">Tipo Paciente</span>
            <select
              name=""
              id=""
              className="rounded-[8px] p-[10px]  text-[22px] w-[100%] sm:h-[60px] h-[80px] border-[1px] border-[#000000]"
            >
              <option value="">Selecione</option>
              <option value="">Pediatria</option>
              <option value="">Adulto</option>
              <option value="">Geriatria</option>
            </select>
            <br />
            <br />
            <br />
            <span className="text-[28px] font-bold">Período</span>
            <select
              name=""
              id=""
              className="rounded-[8px] p-[10px]  text-[22px] w-[100%] sm:h-[60px] h-[80px] border-[1px] border-[#000000]"
            >
              <option value="">Selecione</option>
              <option value="">Matutino</option>
              <option value="">Noturno</option>
            </select>
            <br />
            <br />
            <br />
            <span className="text-[28px] font-bold">Período</span>
            <input type="date" name="" id="" className="rounded-[8px] p-[10px]  text-[22px] w-[100%] sm:h-[60px] h-[80px] border-[1px] border-[#000000]" />
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
