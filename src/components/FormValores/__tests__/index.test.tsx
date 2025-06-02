import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import FormValores from "../index";

describe("FormValores", () => {
  const mockSetFormValores = vi.fn();
  const formValores = {
    valor: "1000",
    aporteMensal: "100",
    periodo: "12",
    tipoPeriodo: "meses",
    percentualCdi: "100",
    percentualLciLca: "100",
  };

  beforeEach(() => {
    mockSetFormValores.mockClear();
  });

  it("renderiza todos os campos corretamente", () => {
    render(
      <FormValores
        formValores={formValores}
        setFormValores={mockSetFormValores}
      />
    );
    expect(screen.getByLabelText(/Valor Investido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Aportes Mensais/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Prazo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Percentual do CDI/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Percentual da LCI\/LCA/i)
    ).toBeInTheDocument();
  });

  it("chama setFormValores ao alterar o campo Valor Investido", () => {
    render(
      <FormValores
        formValores={formValores}
        setFormValores={mockSetFormValores}
      />
    );
    const valorInput = screen.getByLabelText(/Valor Investido/i);
    fireEvent.change(valorInput, { target: { value: "2000", name: "valor" } });
    // O NumericFormat chama setFormValores via onValueChange, então pode ser chamado mais de uma vez
    expect(mockSetFormValores).toHaveBeenCalled();
  });

  it("chama setFormValores ao alterar o campo Prazo", () => {
    render(
      <FormValores
        formValores={formValores}
        setFormValores={mockSetFormValores}
      />
    );
    const prazoInput = screen.getByLabelText(/Prazo/i);
    fireEvent.change(prazoInput, { target: { value: "24", name: "periodo" } });
    expect(mockSetFormValores).toHaveBeenCalledWith({
      ...formValores,
      periodo: "24",
    });
  });

  it("chama setFormValores ao alterar o tipo de período", async () => {
    render(
      <FormValores
        formValores={formValores}
        setFormValores={mockSetFormValores}
      />
    );
    const select = screen.getByLabelText("Tipo de período");
    await userEvent.click(select); // abre o menu
    const option = await screen.findByText("anos");
    await userEvent.click(option);
    expect(mockSetFormValores).toHaveBeenCalledWith({
      ...formValores,
      tipoPeriodo: "anos",
    });
  });
});
