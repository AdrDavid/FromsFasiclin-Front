import React, { useRef, useState, useEffect, Fragment } from "react";
import Fasipe from "../assets/Images/Fasipe.png";
import Logo from "../assets/Images/Logo.png";
import axios from "axios";
import { format, min, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import url from "./url";
import { FaRegFilePdf } from "react-icons/fa";
import geraPDF from "./relatorio";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";

import FiltroComponente from "./FiltroComponente";
import TabelaFiltrada from "./TabelaFiltrada";
import filtro from "./Filtro";

import ModalNovoUsuario from "./ModalNovoUsuario";
import ModalNovoUnidade from "./ModalNovoUnidade";
import Tables from "./Tables";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Desh() {
  let [minPg, setMinPg] = useState(0);
  let [maxPg, setMaxPg] = useState(20);

  const [userLevel, setUserLevel] = useState(
    localStorage.getItem("userLevel") || "DASH"
  );

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

  //////////////////////////////////////////
  const [modal, setModal] = useState(false);
  const [modalNovoUnidade, setModalNovoUnidade] = useState(false);

  const [user, setUser] = useState();
  const [unidade, setUnidade] = useState();

  const handleEditUser = (userId) => {
    setLectedUserId(userId);
    setModalEditarUsuarios(true);
  };

  useEffect(() => {
    axios.get(`${url}/unidades`).then((response) => {
      setUnidade(response.data);
      // setLoading(false);
    });

    axios
      .get(`${url}/usuarios/all`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, []);

  /////////////////////////////////////////

  //////////////////////////////////////////
  console.log(localStorage.getItem("userLevel"));
  const { data: pacientes = [] } = useQuery({
    queryKey: ["pacientes"],
    queryFn: async () => {
      
      
      const response = await axios.get(
        `${url}/forms`,

        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      return response.data
        ? response.data.map((paciente) => ({
            ...paciente,
            dataExpedicao: format(
              new Date(paciente.dataExpedicao),
              "yyyy-MM-dd"
            ),
          }))
        : [];
    },
  });

  //////////////////////////////////

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${url}/forms`,

  //       {
  //         headers: {
  //           Authorization: `${localStorage.getItem("token")}`,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       const dataEntrada = response.data.map((paciente) => ({
  //         ...paciente,
  //         dataExpedicao: format(new Date(paciente.dataExpedicao), "yyyy-MM-dd"),
  //       }));

  //       setPacientes(dataEntrada);
  //     });
  // }, []);

  // const navigate = useNavigate();

  let numeroTotal = filtro(pacientes, filtrar).length;
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

      <div className="p-[20px] 2xl:w-[1400px] xl:w-[1200px] md:w-[800px] w-[100%] m-auto">
        <div className="h-[100px]  w-[100%] m-auto bg-[#ffffff] pl-[20px] rounded-[8px] flex gap-[20px] items-center relative ">
          <img src={Logo} alt="" className="h-[70px]" />
          <img src={Fasipe} alt="" className="h-[60px]" />
          <div className=" min-h-[20px]  absolute right-[20px] top-[25px] ">
            {/* <p className="text-[#292929] text-[20px]">Usuario</p> */}
            <Logout />
          </div>
        </div>

        {userLevel === "ADMIN" ? (
          <>
            <br />
            <Tables
              setModal={setModal}
              unidade={unidade}
              setUnidade={setUnidade}
              user={user}
              setUser={setUser}
              onEditUser={handleEditUser}
              setModalNovoUnidade={setModalNovoUnidade}
            ></Tables>
          </>
        ) : null}

        <br />
        <div className="min-h-[400px] pt-[50px] p-[20px]  w-[100%] m-auto bg-[#ffffff] rounded-[8px]">
          <FiltroComponente
            filtrar={filtrar}
            setFiltrar={setFiltrar}
            handleFiltrar={handleFiltrar}
            limpar={limpar}
          />

          <br />
          <div className="flex justify-end">
            <button
              onClick={() => {
                geraPDF(filtro(pacientes, filtrar));
              }}
              className="rounded-[8px] p-[10px]  text-[35px] h-[40px]  "
            >
              <FaRegFilePdf />
            </button>
          </div>

          <TabelaFiltrada
            filtro={() => filtro(pacientes, filtrar)}
            pacientes={pacientes}
            minPg={minPg}
            maxPg={maxPg}
          />

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
