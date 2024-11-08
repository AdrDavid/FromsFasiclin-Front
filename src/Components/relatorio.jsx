import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { format, min, parseISO } from "date-fns";
import Desh from "./Dash";
// import { format } from "date-fns";
// function getTabela() {
//   const tabela = filtro(pacientes).map((pacientes) => [
//     pacientes.clinica,
//     pacientes.tipoPaciente,
//     pacientes.nomePaciente,
//     `${pacientes.nomeAluno} ${pacientes.sobrenomeAluno}`,
//     pacientes.periodo,
//     pacientes.dataExpedicao,

//     format(parseISO(pacientes.dataExpedicao), "dd/MM/yyyy"),
//   ]);

//   return tabela;
// }

function geraPDF(dados) {
  const doc = new jsPDF();
  const title = "Relatório de Pacientes";
  // Calcula a largura do texto
  const textWidth = doc.getTextWidth(title);
  // Calcula a posição X para centralizar
  const x = (doc.internal.pageSize.getWidth() - textWidth) / 2;
  // Adiciona o texto centralizado

  doc.text(title, x, 10);
  doc.autoTable({
    head: [
      ["Clinica", "Tipo", "Paciente", "Aluno", "Periodo", "Data Expedicao"],
    ],
    body: dados,
    headStyles: {
      fillColor: [9, 128, 56],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    theme: "striped",
    styles: {
      fontSize: 10,
    },
  });
  doc.save("relatorio.pdf");
}

export default geraPDF;
