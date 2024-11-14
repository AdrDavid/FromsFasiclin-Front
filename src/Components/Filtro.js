function filtro(pacientes, filtrar) {
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

export default filtro;
