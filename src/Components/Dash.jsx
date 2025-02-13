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

import {
    useQuery,
    useMutation,
    useQueryClient,
    useQueries,
} from "@tanstack/react-query";

export default function Desh() {
    const [userLevel, setUserLevel] = useState(
        localStorage.getItem("userLevel") || "DASH"
    );

    const [pageSizeTables, setPageSizeTables] = useState({
        tablePacientesMax: 20,
        tablePacientesMin: 0,
        tableUsersMax: 10,
        tableUsersMin: 0,
        tableUnidadesMax: 10,
        tableUnidadesMin: 0,
    });

    const [dadosUsuario, setDadosUsuario] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        const verificarLevel = async () => {
            try {
                const response = await axios.get(`${url}/auth/validate`, {
                    headers: {
                        Authorization: `${token} `,
                    },
                });
                // localStorage.setItem("userLevel", response.data);
                setUserLevel(response.data.cargo);
                setDadosUsuario(response.data);
                console.log("CARGO DO USUARIO: ", response.data.cargo);
            } catch (error) {
                console.log(error);
            }
        };

        verificarLevel();
    }, []);

    console.log("USUARIO: ", dadosUsuario.unidadeId);

    const [unidade, setUnidade] = useState([]);

    const getUnidades = async () => {
        const response = await axios.get(`${url}/unidades`);
        setUnidade(response.data);
    };

    useEffect(() => {
        getUnidades();
    }, []);

    console.log(unidade);


    // console.log(userLevel);

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

    // Requisicao unidade paciente e usuario
    //////////////////////////////////////////
    const [modal, setModal] = useState(false);
    const [modalNovoUnidade, setModalNovoUnidade] = useState(false);

    const { data: unidades = [], refetch: refetchUnidades } = useQuery({
        queryKey: ["unidades"],
        queryFn: async () => {
            const response = await axios.get(`${url}/unidades`);

            return response.data;
        },
    });

    const { data: users = [], refetch: refetchUsers } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await axios.get(`${url}/usuarios/all`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            });
            return response.data;
        },
    });

    const { data: pacientes = [], refetch: refetchPacientes } = useQuery({
        queryKey: ["pacientes"],
        queryFn: async () => {
            const response = await axios.get(
                userLevel === "DASH" ? `${url}/forms` : `${url}/forms/all`,

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

        refetchInterval: 300000,
        refetchIntervalInBackground: true,
    });

    /////////////////////////////////////////////

    return (
        <>
            {modalNovoUnidade && (
                <ModalNovoUnidade
                    setModalNovoUnidade={setModalNovoUnidade}
                    unidades={unidades}
                />
            )}

            {modal && <ModalNovoUsuario setModal={setModal} unidades={unidades} />}

            <div className="p-[20px] 2xl:w-[1400px] xl:w-[1200px] md:w-[800px] w-[100%] m-auto">
                <div className="h-[100px]  w-[100%] m-auto bg-[#ffffff] pl-[20px] rounded-[8px] flex gap-[20px] items-center relative ">
                    <img src={Logo} alt="" className="h-[70px]" />
                    <img src={Fasipe} alt="" className="h-[60px]" />
                    <div className="flex gap-[20px] absolute right-[20px]  items-center justify-center">
                        
                    <div className="text-[#0ea13f] font-bold uppercase">
                        {unidade.map((unidade) => {
                            if (unidade.id === dadosUsuario.unidadeId) {

                                return <span>{unidade.nomeUnidade}</span>;
                            }
                        })}
                    </div>
                    <div className=" ">
                        <Logout />
                    </div>
                    </div>
                </div>

                {userLevel === "ADMIN" ? (
                    <>
                        <br />
                        <Tables
                            setModal={setModal}
                            unidades={unidades}
                            users={users}
                            setModalNovoUnidade={setModalNovoUnidade}
                            pageSizeTables={pageSizeTables}
                            setPageSizeTables={setPageSizeTables}
                            filtro={() => filtro(pacientes, filtrar)}
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
                        pageSizeTables={pageSizeTables}
                        setPageSizeTables={setPageSizeTables}
                    />

                    <br />
                </div>
                <br />
            </div>
        </>
    );
}
