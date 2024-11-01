import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function geraPDF() {
  const doc = new jsPDF();
  const title = "Relatório de Pacientes";
  // Calcula a largura do texto
  const textWidth = doc.getTextWidth(title);
  // Calcula a posição X para centralizar
  const x = (doc.internal.pageSize.getWidth() - textWidth) / 2;

  // Adiciona o texto centralizado
  doc.text(title, x, 10);
  doc.autoTable({
    html: "#relatorio",
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
  doc.open("relatorio.pdf");
}

export default geraPDF;
