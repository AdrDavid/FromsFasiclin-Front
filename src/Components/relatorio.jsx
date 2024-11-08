import { jsPDF } from "jspdf";
import "jspdf-autotable";
function geraPDF(dados) {
  console.log("AQUIIIIIIIII");
  console.log(dados.length);
  console.log(dados);

  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
  });
  const title = "Relatório de Pacientes";
  // Calcula a largura do texto
  const textWidth = doc.getTextWidth(title);
  // Calcula a posição X para centralizar
  const x = (doc.internal.pageSize.getWidth() - textWidth) / 2;
  // Adiciona o texto centralizado

  let rows = [];
  for (let i = 0; i < dados.length; i++) {
    console.log(dados[i].clinica);
    const linha = [];
    linha.push(dados[i].clinica);
    linha.push(dados[i].tipoPaciente);
    linha.push(dados[i].nomePaciente);
    linha.push(dados[i].nomeAluno + " " + dados[i].sobrenomeAluno);
    linha.push(dados[i].periodo);
    linha.push(dados[i].dataExpedicao);
    // return linha;
    console.log("dados teste");
    console.log(linha);

    rows.push(linha);
  }

  doc.text(title, x, 10);
  doc.autoTable({
    head: [
      ["Clinica", "Tipo", "Paciente", "Aluno", "Periodo", "Data Expedicao"],
    ],
    body: rows,

    headStyles: {
      fillColor: [9, 128, 56],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },

    theme: "striped",
    styles: {
      fontSize: 10,
      autoSize: true,
    },
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 20 },
      2: { cellWidth: 50 },
      3: { cellWidth: 50 },
      4: { cellWidth: 20 },
      5: { cellWidth: 25 },
    },
  });
  doc.save("relatorio.pdf");
}

export default geraPDF;
