import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Resultado from "..";

describe("Resultado", () => {
  const resultadoMock = {
    titulo: "CDB",
    bruto: 1500,
    liquido: 1400,
    ir: 100,
    grafico: [
      { periodo: 1, valor: 1000 },
      { periodo: 12, valor: 1500 },
    ],
  };

  it("renderiza os valores corretamente", () => {
    render(<Resultado {...resultadoMock} />);
    expect(screen.getByText(/CDB/i)).toBeInTheDocument();
    expect(screen.getByText(/Bruto:/i)).toBeInTheDocument();
    expect(screen.getByText(/Líquido:/i)).toBeInTheDocument();
    expect(screen.getByText(/IR:/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, node) => node !== null && node.textContent === "R$ 1.500,00"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, node) => node !== null && node.textContent === "R$ 1.400,00"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, node) => node !== null && node.textContent === "- R$ 100,00"
      )
    ).toBeInTheDocument();
  });

  it("renderiza o gráfico se existir", () => {
    render(<Resultado {...resultadoMock} />);
    expect(
      document.querySelector(".recharts-responsive-container")
    ).toBeInTheDocument();
  });
});
