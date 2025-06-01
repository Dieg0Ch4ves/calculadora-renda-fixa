import { describe, it, expect } from "vitest";
import { calcularRendimentoLCIeLCA } from "../calcularRendimentoLCIeLCA";

describe("calcularRendimentoLCIeLCA", () => {
  it("deve calcular rendimento sem aporte mensal", () => {
    const resultado = calcularRendimentoLCIeLCA(
      1000,
      12,
      0.9,
      0.13,
      "meses",
      "LCI/LCA",
      0
    );
    expect(resultado.bruto).toBeGreaterThan(1000);
  });

  it("deve calcular rendimento com aporte mensal", () => {
    const resultado = calcularRendimentoLCIeLCA(
      500,
      24,
      1,
      0.12,
      "meses",
      "LCI/LCA",
      100
    );
    expect(resultado.bruto).toBeGreaterThan(500 + 24 * 100);
  });

  it("deve retornar o valor inicial se meses for 0", () => {
    const resultado = calcularRendimentoLCIeLCA(
      1000,
      0,
      1,
      0.13,
      "meses",
      "LCI/LCA",
      0
    );
    expect(resultado.bruto).toBe(1000);
  });

  it("deve calcular corretamente para percentualCDI zero", () => {
    const resultado = calcularRendimentoLCIeLCA(
      1000,
      12,
      0,
      0.13,
      "meses",
      "LCI/LCA",
      0
    );
    expect(resultado.bruto).toBe(1000);
  });

  it("deve calcular corretamente para taxaCDI zero", () => {
    const resultado = calcularRendimentoLCIeLCA(
      1000,
      12,
      1,
      0,
      "meses",
      "LCI/LCA",
      0
    );
    expect(resultado.bruto).toBe(1000);
  });
});
