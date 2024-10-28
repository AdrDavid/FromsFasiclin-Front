import React, { useRef } from "react";
import Fasipe from "../assets/Images/Fasipe.png";
import Logo from "../assets/Images/Logo.png";
import { useReactToPrint } from "react-to-print";
export default function Desh() {
  //   const componentRef = useRef();

  //   const handlePrint = () => {
  //     document.title = "Fasiclin";
  //     const printContent = componentRef.current;
  //     const windowContent = document.body.innerHTML;

  //     // Salva todo o conteúdo da página
  //     document.body.innerHTML = printContent.innerHTML;

  //     // Chama a impressão
  //     window.print();
  //     document.title = originalTitle;
  //     // Restaura o conteúdo original
  //     document.body.innerHTML = windowContent;
  //     window.location.reload();
  //   };

  return (
    <>
      <div className="p-[20px] 2xl:w-[1400px] xl:w-[1200px] md:w-[800px] w-[100%] m-auto">
        <div className="h-[100px]  w-[100%] m-auto bg-[#ffffff] pl-[20px] rounded-[8px] flex gap-[20px] items-center ">
          <img src={Logo} alt="" className="h-[70px]" />
          <img src={Fasipe} alt="" className="h-[60px]" />
        </div>
        <br />
        <div className="min-h-[400px] pt-[50px] p-[20px]  w-[100%] m-auto bg-[#ffffff] rounded-[8px]  ">
          <div className="w-[100%] flex flex-wrap  gap-[10px]">
            <input
              type="text"
              placeholder="Atendimento"
              className=" shrink w-[150px] rounded-[8px] p-[10px]  text-[20px] h-[40px] border-[1px] border-[#000000]"
            />
            <select
              name=""
              id=""
              className="shrink rounded-[8px] w-[150px] p-[10px]  text-[20px] h-[40px] border-[1px] border-[#000000]"
            >
              <option value="">Período</option>
              <option value="">Matutino</option>
              <option value="">Noturno</option>
            </select>
            <input
              type="text"
              placeholder="Aluno"
              className="shrink rounded-[8px] w-[150px] p-[10px]  text-[20px] h-[40px] border-[1px] border-[#000000]"
            />
            <input
              type="text"
              placeholder="Paciente"
              className="shrink rounded-[8px] w-[150px] p-[10px]  text-[20px] h-[40px] border-[1px] border-[#000000]"
            />
            <input
              type="date"
              className="shrink rounded-[8px] w-[150px] p-[10px]  text-[20px] h-[40px] border-[1px] border-[#000000]"
            />
          </div>
          <br />
          <br />

          <div className="content min-h-[100px]" ref={componentRef}>
            <table className="table-auto w-[100%] border-separate border-spacing-0 ">
              <thead>
                <tr className="text-left ">
                  <th className="">Atendimento</th>
                  <th className="">Paciente</th>
                  <th className="">Aluno</th>
                  <th className="">Período</th>
                  <th className="">Data</th>
                </tr>
              </thead>

              <tbody className=" ">
                <tr className="h-2" />
                <tr className="">
                  <td className="border border-[#000] p-1 rounded-l-[8px]">
                    Adulto
                  </td>
                  <td className="border border-[#000] p-1">David</td>
                  <td className="border border-[#000] p-1">Adriano</td>
                  <td className="border border-[#000] p-1">Matutino</td>
                  <td className="border border-[#000] p-1 rounded-r-[8px]">
                    27/11/2024
                  </td>
                </tr>
                <tr className="h-2" />
                <tr>
                  <td className="border border-[#000] p-1 rounded-l-[8px]">
                    Pediatria
                  </td>
                  <td className="border border-[#000] p-1">Adriano</td>
                  <td className="border border-[#000] p-1">David</td>
                  <td className="border border-[#000] p-1">Matutino</td>
                  <td className="border border-[#000] p-1 rounded-r-[8px]">
                    27/11/2024
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button className="rounded-[8px] p-[10px]  text-[20px] h-[40px] border-[1px] border-[#000000] ">
            PDF
          </button>
        </div>
        <br />
      </div>
    </>
  );
}
