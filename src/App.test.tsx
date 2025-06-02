import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import App from "./App";

// Mock das dependências externas
vi.mock("axios", () => ({
  default: {
    get: vi.fn().mockResolvedValue({
      data: [
        { nome: "Selic", valor: 13.65 },
        { nome: "CDI", valor: 13.65 },
        { nome: "IPCA", valor: 4.5 },
      ],
    }),
  },
}));

describe("App - cenários adicionais", () => {
  it("não exibe resultados se faltar campos obrigatórios", async () => {
    render(<App />);
    await userEvent.type(screen.getByLabelText(/Valor Investido/i), "1000");
    // Não preenche outros campos obrigatórios
    await waitFor(() => {
      expect(screen.queryByText(/Bruto:/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Líquido:/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/IR:/i)).not.toBeInTheDocument();
    });
  });

  it("exibe valores padrão das taxas ao carregar", () => {
    render(<App />);
    expect(screen.getByLabelText(/CDI \(a\.a\)/i)).toHaveValue(13.65);
    expect(screen.getByLabelText(/SELIC \(a\.a\)/i)).toHaveValue(13.65);
    expect(screen.getByLabelText(/IPCA anual/i)).toHaveValue(13.65);
    expect(screen.getByLabelText(/Taxa Prefixada/i)).toHaveValue(6);
  });

  it("mantém o texto explicativo ao limpar todos os campos", async () => {
    render(<App />);
    // Preenche e depois limpa
    const valorInput = screen.getByLabelText(/Valor Investido/i);
    await userEvent.type(valorInput, "1000");
    await userEvent.clear(valorInput);
    expect(
      screen.getByText(/Renda fixa é um tipo de investimento/i)
    ).toBeInTheDocument();
  });

  it("faz chamada à API de taxas ao montar", async () => {
    const axios = (await import("axios")).default;
    render(<App />);
    expect(axios.get).toHaveBeenCalledWith(
      "https://brasilapi.com.br/api/taxas/v1"
    );
  });

  it("exibe mensagem de erro no console se a API falhar", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const axios = (await import("axios")).default;
    vi.mocked(axios.get).mockRejectedValueOnce(new Error("Erro de rede"));
    render(<App />);
    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(
        "Erro ao buscar taxas:",
        expect.any(Error)
      );
    });
    spy.mockRestore();
  });
});
