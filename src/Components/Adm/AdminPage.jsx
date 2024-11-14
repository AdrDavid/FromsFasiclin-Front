import React, { useRef, useState, useEffect, Fragment } from "react";
import Fasipe from "../../assets/Images/Fasipe.png";
import Logo from "../../assets/Images/Logo.png";
import axios from "axios";
import { format, min, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout";
import url from "../url";
import { FaRegFilePdf } from "react-icons/fa";
import geraPDF from "../relatorio";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import ModalNovoUsuario from "../Adm/ModalNovoUsuario";
import ModalNovoUnidade from "../Adm/ModalNovoUnidade";
import Tables from "./Tables";
export default function AdminPage() {
  const [user, setUser] = useState();
  const [unidade, setUnidade] = useState();
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(false);
  const [modalNovoUnidade, setModalNovoUnidade] = useState(false);

  const handleEditUser = (userId) => {
    setLectedUserId(userId);
    setModalEditarUsuarios(true);
  };

  useEffect(() => {
    axios.get(`${url}/unidades`).then((response) => {
      console.log(response.data);
      setUnidade(response.data);
      setLoading(false);
    });

    axios
      .get(`${url}/usuarios/all`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.data.map((user) => user.unidade?.nomeUnidade));
        console.log(response.data.map((user) => user.id));
        setUser(response.data);
      });
  }, []);

  //   const fecharModal = () => {
  //     if (event.key === "Escape") {
  //       setModal(false);
  //     }
  //   };
  //   window.addEventListener("keydown", fecharModal);

  let [minPg, setMinPg] = useState(0);
  let [maxPg, setMaxPg] = useState(20);
  const [pacientes, setPacientes] = useState([]);

  const dataAtual = new Date();
  let diaAtual = dataAtual.getDate();
  const mesAtual = dataAtual.getMonth() + 1;
  const anoAtual = dataAtual.getFullYear();

  if (diaAtual < 10) {
    diaAtual = `0${diaAtual}`;
  }
  let dataDeHoje = `${anoAtual}-${mesAtual}-${diaAtual}`;

  const [filtrar, setFiltrar] = useState({
    tipoPaciente: "",
    periodo: "",
    dataExpedicao: dataDeHoje,
    nomePaciente: "",
    nomeAluno: "",
    sobrenomeAluno: "",
    clinica: "",
  });

  const limpar = () => {
    setFiltrar({
      tipoPaciente: "",
      periodo: "",
      dataExpedicao: "",
      nomePaciente: "",
      nomeAluno: "",
      sobrenomeAluno: "",
      clinica: "",
    });
  };

  const handleFiltrar = (event) => {
    const { name, value } = event.target;
    setFiltrar((prevFiltrar) => ({ ...prevFiltrar, [name]: value }));
  };

  useEffect(() => {
    axios
      .get(
        `${url}/forms`,

        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        const dataEntrada = response.data.map((paciente) => ({
          ...paciente,
          dataExpedicao: format(new Date(paciente.dataExpedicao), "yyyy-MM-dd"),
        }));

        setPacientes(dataEntrada);
      });
  }, []);

  const navigate = useNavigate();

  function filtro(pacientes) {
    return pacientes.filter((paciente) => {
      const contemTexto = (texto, busxa) => {
        if (!texto || !busxa) return true;
        return texto.toLowerCase().includes(busxa.toLowerCase());
      };
      const condicoes = [
        filtrar.tipoPaciente === "" ||
          paciente.tipoPaciente === filtrar.tipoPaciente,
        filtrar.periodo === "" || paciente.periodo === filtrar.periodo,
        filtrar.dataExpedicao === "" ||
          paciente.dataExpedicao === filtrar.dataExpedicao,
        filtrar.clinica === "" || paciente.clinica === filtrar.clinica,

        contemTexto(paciente.nomePaciente, filtrar.nomePaciente),
        contemTexto(paciente.nomeAluno, filtrar.nomeAluno),
        contemTexto(paciente.sobrenomeAluno, filtrar.sobrenomeAluno),
      ];

      return condicoes.every((condicao) => condicao);
    });
  }

  let numeroTotal = filtro(pacientes).length;
  const vinte = 20;
  let numeroTotalPaginas = Math.ceil(numeroTotal / vinte);

  if (numeroTotalPaginas === 0) {
    numeroTotalPaginas = 1;
  }

  const [page, setPage] = useState(1);

  const handleNext = () => {
    setMinPg(minPg + vinte);
    setMaxPg(maxPg + vinte);
    setPage(page + 1);
  };

  const handlePrev = () => {
    setMinPg(minPg - vinte);
    setMaxPg(maxPg - vinte);
    setPage(page - 1);
  };

  return (
    <>
      {modalNovoUnidade && (
        <ModalNovoUnidade
          setModalNovoUnidade={setModalNovoUnidade}
          unidade={unidade}
          setUnidade={setUnidade}
        />
      )}

      {modal && (
        <ModalNovoUsuario
          setModal={setModal}
          unidade={unidade}
          setUnidade={setUnidade}
        />
      )}
      {/* <ModalNovo></ModalNovo> */}
      <div className="p-[20px] 2xl:w-[1400px] xl:w-[1200px] md:w-[800px] w-[100%] m-auto">
        <div className="h-[100px]  w-[100%] m-auto bg-[#ffffff] pl-[20px] rounded-[8px] flex gap-[20px] items-center relative ">
          <img src={Logo} alt="" className="h-[70px]" />
          <img src={Fasipe} alt="" className="h-[60px]" />
          <div className=" min-h-[20px]  absolute right-[20px] top-[25px] ">
            {/* <p className="text-[#292929] text-[20px]">Usuario</p> */}
            <Logout />
          </div>
        </div>
        <br />
        {loading ? (
          <div className="flex justify-center items-center min-h-[100px]">
            <p className="text-[#292929] text-[20px]">Carregando...</p>
          </div>
        ) : (
          <Tables
            setModal={setModal}
            unidade={unidade}
            setUnidade={setUnidade}
            user={user}
            setUser={setUser}
            onEditUser={handleEditUser}
            setModalNovoUnidade={setModalNovoUnidade}
          ></Tables>
        )}

        <br />
        <div className="min-h-[400px] pt-[50px] p-[20px]  w-[100%] m-auto bg-[#ffffff] rounded-[8px]">
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
          <br />
          <div className="flex justify-end">
            <button
              onClick={() => {
                console.log(filtro(pacientes));
                geraPDF(filtro(pacientes));
              }}
              className="rounded-[8px] p-[10px]  text-[35px] h-[40px]  "
            >
              <FaRegFilePdf />
            </button>
          </div>
          <div className="content min-h-[100px]">
            <table className="table-auto w-[100%]  ">
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
                          {format(
                            parseISO(paciente.dataExpedicao),
                            "dd-MM-yyyy"
                          )}
                        </td>
                      </tr>
                    </Fragment>
                  ))}
              </tbody>
            </table>
          </div>
          <br />
          <div className="flex justify-between ">
            <button
              disabled={page === 1 ? true : false}
              className="text-[30px] "
              onClick={handlePrev}
            >
              <GrLinkPrevious />
            </button>

            <p>{`${page} de ${numeroTotalPaginas}`}</p>
            <button
              disabled={page === numeroTotalPaginas ? true : false}
              className="text-[30px] "
              onClick={handleNext}
            >
              <GrLinkNext />
            </button>
          </div>
          <br />
        </div>
        <br />
      </div>
    </>
  );
}
