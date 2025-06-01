import { describe, it, expect } from "vitest";
import { calcularRendimentoLiquido } from "../calcularRendimentoLiquido";

describe("calcularRendimentoLiquido", () => {
  it("deve calcular rendimento líquido sem aporte mensal", () => {
    const resultado = calcularRendimentoLiquido(
      1000,
      12,
      100,
      0.13,
      "meses",
      0
    );
    expect(resultado.liquido).toBeLessThan(resultado.bruto); // IR deve ser descontado
    expect(resultado.bruto).toBeGreaterThan(1000);
    expect(resultado.ir).toBeGreaterThan(0);
  });

  it("deve calcular rendimento líquido com aporte mensal", () => {
    const resultado = calcularRendimentoLiquido(
      500,
      24,
      100,
      0.12,
      "meses",
      100
    );
    expect(resultado.liquido).toBeLessThan(resultado.bruto);
    expect(resultado.bruto).toBeGreaterThan(500 + 24 * 100);
    expect(resultado.ir).toBeGreaterThan(0);
  });

  it("deve retornar o valor inicial se meses for 0", () => {
    const resultado = calcularRendimentoLiquido(1000, 0, 100, 0.13, "meses", 0);
    expect(resultado.bruto).toBe(1000);
    expect(resultado.liquido).toBe(1000);
    expect(resultado.ir).toBe(0);
  });

  it("deve calcular corretamente para percentualCDI zero", () => {
    const resultado = calcularRendimentoLiquido(1000, 12, 0, 0.13, "meses", 0);
    expect(resultado.bruto).toBe(1000);
    expect(resultado.liquido).toBe(1000);
    expect(resultado.ir).toBe(0);
  });

  it("deve calcular corretamente para taxaCDI zero", () => {
    const resultado = calcularRendimentoLiquido(1000, 12, 100, 0, "meses", 0);
    expect(resultado.bruto).toBe(1000);
    expect(resultado.liquido).toBe(1000);
    expect(resultado.ir).toBe(0);
  });
});
