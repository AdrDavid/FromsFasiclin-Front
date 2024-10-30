import pdfMake, { tableLayouts } from "pdfmake/build/pdfmake";

import pdfFonts from "pdfmake/build/vfs_fonts";
function pacientePDf(pacientes) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: "Relatório de Pacientes",
      alignment: "center",
      bold: true,
      margin: [15, 20, 0, 45],
    },
  ];

  const dados = pacientes.map((paciente) => {
    return [
      { text: paciente.tipoPaciente, fontSize: 10 },
      { text: paciente.nomePaciente, fontSize: 10 },
      {
        text: paciente.nomeAluno + " " + paciente.sobrenomeAluno,
        fontSize: 10,
      },
      { text: paciente.periodo, fontSize: 10 },
      {
        text: new Date(paciente.dataExpedicao).toLocaleDateString("pt-BR"),
        fontSize: 10,
      },
    ];
  });

  const details = [
    {
      table: {
        headerRows: 1,
        widths: ["*", "*", "*", "*", "*"],
        body: [
          [
            {
              text: "Atendimento",
              style: "tableHeader",
              fontSize: 10,
              bold: true,
            },
            {
              text: "Paciente",
              style: "tableHeader",
              fontSize: 10,
              bold: true,
            },
            {
              text: "Aluno",
              style: "tableHeader",
              fontSize: 10,
              bold: true,
            },
            {
              text: "Periodo",
              style: "tableHeader",
              fontSize: 10,
              bold: true,
            },
            {
              text: "Data",
              style: "tableHeader",
              fontSize: 10,
              bold: true,
            },
          ],
          ...dados,
        ],
      },
      // layout: "lightHorizontalLines",
      layout: {
        // fillColor: function (rowIndex, node, columnIndex) {
        //   return rowIndex % 2 === 0 ? "#afafaf" : null;
        // },

        fillColor: function (rowIndex, node, columnIndex) {
          if (rowIndex === 0) return "#ffffff";
          return (rowIndex - 1) % 2 === 0 ? "#8afab1" : "#ffffff";
        },
        hLineWidth: function (i, node) {
          return i === 1 ? 2 : 0;
        },
        vLineWidth: function () {
          return 0; // oculta as linhas verticais para manter o layout leve
        },

        // hLineColor: function(i, node){
        //     return i === 1? "#81bd5f" : "#afafaf";
        // }
      },
    },
  ];

  function Rodape(currentPage, pageCount) {
    return [
      {
        text: currentPage + "/" + pageCount,
        alignment: "right",
        bold: true,
        margin: [15, 20, 0, 45],
      },
    ];
  }

  const docDefinition = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],
    header: [reportTitle],
    content: [details],
    footer: Rodape,
  };

  //   pdfMake.createPdf(docDefinition).download();
  pdfMake.createPdf(docDefinition).open();
}

export default pacientePDf;