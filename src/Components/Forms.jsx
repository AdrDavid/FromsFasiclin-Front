import React, { useState, useEffect, Fragment } from "react";
import Fasipe from "../assets/Images/Fasipe.png";
import Logo from "../assets/Images/Logo.png";
import axios from "axios";
import url from "./url";
import { useNavigate, useParams } from "react-router-dom";
import { set } from "date-fns";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Forms() {
    const queryClient = useQueryClient();
    const {nomeUnidade} = useParams()
    const navigate = useNavigate();
    const [unidadeID, setUnidadeID] = useState();

    const sucesso = () => toast.success("Agendado com Sucesso !");
    const [unidade, setUnidade] = useState();
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState("");
    const [valor, setValor] = useState({
        unidade: "",
        periodo: "",
        nomeAluno: "",
        emailAluno:"",
        sobrenomeAluno: "",
        tipoPaciente: "",
        dataExpedicao: "",
        nomePaciente: "",
        clinica: "",
        RA: "",
    });
    useEffect(() => {
        axios
            .get(`${url}/unidades`)
            .then((response) => {
                setUnidade(response.data);
             ///   console.log("Unidades carregadas:", response.data);
               // console.log("Nome da unidade na URL:", nomeUnidade);

                if(nomeUnidade){
                    const unidadeEncontrada = response.data.find(
                        unid => unid.nomeUnidade.toLowerCase() === nomeUnidade.toLowerCase()
                    )
                  //  console.log("ENCONTRADA ",unidadeEncontrada)

                    
                    if(unidadeEncontrada){
                        setUnidadeID(unidadeEncontrada.id)
                        setValor((prev) => ({
                            ...prev,
                            unidade: unidadeEncontrada.id.toString()
                        }));
                    }else {
                        toast.error("Unidade não encontrada");
                        navigate('/forms/florença');
                    }
                }else{
                    toast.warning("Aviso! Você Foi automaticamente direcionado para Fasipe Florença-Sinop");
                        navigate('/forms/florença');
                }

                

            })
            .catch((error) => {
             //   console.log(error);
            });
    }, [nomeUnidade]);

    useEffect(() => {
       // console.log("Valor atual da unidade:", valor.unidade);
    }, [valor.unidade]);

    // const cadastro = (e) => {
    //   const { name, value } = e.target;
    //   setValor((prevState) => ({
    //     ...prevState,
    //     [name]: value,
    //   }));
    // };
    ///// esse
  

    const cadastro = (e) => {
        const { name, value } = e.target;
        if (name === "unidade") {
            setValor((prevState) => ({
                ...prevState,
                unidade: value,
                unidadeId: value.id,
            }));
        } else {
            setValor((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    const limpar = () => {
        setValor({
            unidade: "",
            periodo: "",
            nomeAluno: "",
            emailAluno:"",
            sobrenomeAluno: "",
            tipoPaciente: "",
            dataExpedicao: "",
            nomePaciente: "",
            clinica: "",
            RA: "",
        });
    };

    const mutation = useMutation({
        mutationFn: (paciente) => {
            return axios.post(`${url}/forms/create`, paciente, {
                headers: { Authorization: `${localStorage.getItem("token")}` },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pacientes"] });
            setTimeout(() => {
                setErro(false);
            }, 3000);

            limpar();

            setLoading(false);
            sucesso();
        },
        onError: (error) => {
          //  console.log(error);
            // setErro(error.response.data.message);
            if (error.response.data.codigo === "DUPLICATED_FORMS") {
                setErro(
                    `O Paciente ${valor.nomePaciente}  ja foi agendado para esta data!`
                );
            } else if (error.response.data.codigo === "INVALID_DATE") {
                setErro(`A data precisa ser maior que a data atual!`);
            }
          //  console.log(error);
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        },
    });

    const cadastrar = (e) => {
        setLoading(true);
        e.preventDefault();
        const dados = {
            unidadeId: unidadeID,
            // unidadeId: +e.target.unidade.value,
            emailAluno: e.target.emailAluno.value,
            RA: e.target.RA.value,
            nomeAluno: e.target.nomeAluno.value,
            sobrenomeAluno: e.target.sobrenomeAluno.value,
            tipoPaciente: e.target.tipoPaciente.value,
            dataExpedicao: e.target.dataExpedicao.value,
            nomePaciente: e.target.nomePaciente.value,
            clinica: e.target.clinica.value,
            periodo: e.target.periodo.value,
        };

        mutation.mutate(dados);
    };

    return (
        <>
            <ToastContainer />
            <div className="p-[20px] md:w-[800px] w-[100%] m-auto">
                <form action="" onSubmit={cadastrar}>
                    <div className="min-h-[100px] relative  w-[100%] m-auto bg-[#ffffff] pt-[20px] pb-[20px] pr-[20px] pl-[20px] rounded-[8px] flex flex-wrap justify-between gap-[20px] items-center ">
                        <div className="flex">

                        <img src={Logo} alt="" className="h-[70px]" />
                        <img src={Fasipe} alt="" className="h-[60px]" />
                        </div>
                        <span className="text-[25px] font-bold text-[#0ea13f] uppercase ">{nomeUnidade}</span>
                    </div>
                    <br />
                    <div className="min-h-[400px] pt-[50px] p-[20px]  w-[100%] m-auto bg-[#ffffff] rounded-[8px]  ">
                        <h1 className="text-[32px] font-bold text-center">
                            Dados do Aluno
                        </h1>
                        <br />
                        <br />
                        {/* <span className="text-[28px] font-bold">Unidade</span> */}
                        {/* <select
                            name="unidade"
                            required
                            value={valor.unidade}
                            onChange={cadastro}
                            className="rounded-[8px] p-[10px] hidden  text-[22px] w-[100%] sm:h-[60px] h-[80px] border-[1px] border-[#000000]"
                        >
                            <option value="">Selecione</option>
                            {unidade
                                ?.sort((a, b) => a.nomeUnidade.localeCompare(b.nomeUnidade))
                                .map((unid) => (
                                    <option key={unid.id} value={unid.id}>
                                        {unid.nomeUnidade}
                                    </option>
                                ))}
                        </select> */}
                        {/* <br />
                        <br />
                        <br /> */}
                        <span className="text-[28px] font-bold">Email</span>
                        <input
                            type="text"
                            name="emailAluno"
                            placeholder="Digite seu Email..."
                            required
                            value={valor.emailAluno}
                            onChange={cadastro}
                            className="rounded-[8px] p-[10px] text-[22px] w-[100%] sm:h-[60px] h-[80px] border-[1px] border-[#000000]"
                        />
                        <br />
                        <br />
                        <br />
                        <span className="text-[28px] font-bold">Nome</span>
                        <input
                            type="text"
                            name="nomeAluno"
                            placeholder="Digite seu Nome..."
                            required
                            value={valor.nomeAluno}
                            onChange={cadastro}
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
                            value={valor.sobrenomeAluno}
                            onChange={cadastro}
                            className="rounded-[8px] p-[10px]  text-[22px] w-[100%] sm:h-[60px] h-[80px] border-[1px] border-[#000000]"
                        />
                        <br />
                        <br />
                        <br />
                        <span className="text-[28px] font-bold">RA</span>
                        <input
                            type="text"
                            name="RA"
                            placeholder="Seu RA..."
                            required
                            value={valor.RA}
                            onChange={cadastro}
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
                            value={valor.nomePaciente}
                            onChange={cadastro}
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
                            value={valor.clinica}
                            onChange={cadastro}
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
                            value={valor.tipoPaciente}
                            onChange={cadastro}
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
                            value={valor.periodo}
                            onChange={cadastro}
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
                            value={valor.dataExpedicao}
                            onChange={cadastro}
                            required
                            className="rounded-[8px] p-[10px]  text-[22px] w-[100%] sm:h-[60px] h-[80px] border-[1px] border-[#000000]"
                        />
                        <p className="text-red-500 text-[20px]">{erro}</p>
                        <br />
                        <br />
                        <br />
                    </div>
                    <br />

                    <button className="h-[60px] w-[100%] m-auto bg-[#006cc3] text-[28px] text-[#ffffff] rounded-[8px]  ">
                        {loading ? "Carregando..." : "Cadastrar"}
                    </button>
                    <br />
                    <br />
                    <br />
                </form>
            </div>
        </>
    );
}
