import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import FormDados from "../index";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("FormDados", () => {
  const mockSetFormDados = vi.fn();
  const formDados = {
    taxaCDI: "13.65",
    taxaSelic: "13.75",
    ipca: "4.5",
    prefixada: "10.2",
  };

  beforeEach(() => {
    mockSetFormDados.mockClear();
  });

  it("renderiza todos os campos corretamente", () => {
    render(<FormDados formDados={formDados} setFormDados={mockSetFormDados} />);
    expect(screen.getByLabelText(/CDI \(a\.a\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/SELIC \(a\.a\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/IPCA anual/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Taxa Prefixada/i)).toBeInTheDocument();
  });

  it("chama setFormDados ao alterar um campo", () => {
    render(<FormDados formDados={formDados} setFormDados={mockSetFormDados} />);
    const input = screen.getByLabelText(/CDI \(a\.a\)/i);
    fireEvent.change(input, { target: { value: "14", name: "taxaCDI" } });
    expect(mockSetFormDados).toHaveBeenCalledWith({
      ...formDados,
      taxaCDI: "14",
    });
  });
});
