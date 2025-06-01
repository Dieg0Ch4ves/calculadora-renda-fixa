import { describe, it, expect } from "vitest";
import { calcularRendimentoIPCA } from "../calcularRendimentoIPCA";

describe("calcularRendimentoIPCA", () => {
  it("deve calcular rendimento com IPCA e taxa prefixada sem aporte mensal", () => {
    const resultado = calcularRendimentoIPCA(1000, 12, "meses", 0.06, 0);
    expect(resultado.bruto).toBeGreaterThan(1000);
  });

  it("deve calcular rendimento com IPCA, taxa prefixada e aporte mensal", () => {
    const resultado = calcularRendimentoIPCA(500, 24, "meses", 0.05, 50);
    expect(resultado.bruto).toBeGreaterThan(500 + 24 * 50);
  });

  it("deve retornar o valor inicial se meses for 0", () => {
    const resultado = calcularRendimentoIPCA(1000, 0, "meses", 0.06, 0);
    expect(resultado.bruto).toBe(1000);
  });

  it("deve calcular corretamente para IPCA e taxa prefixada zero", () => {
    const resultado = calcularRendimentoIPCA(1000, 12, "meses", 0, 0);
    expect(resultado.bruto).toBe(1000);
  });
});
