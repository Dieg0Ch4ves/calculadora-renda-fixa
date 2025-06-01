import { describe, it, expect } from "vitest";
import { calcularRendimentoBruto } from "../calcularRendimentoBruto";

describe("calcularRendimentoBruto", () => {
  it("deve calcular rendimento bruto sem aporte mensal", () => {
    // valorInicial: 1000, meses: 12, percentualCDI: 100, taxaCDIAnual: 0.13 (13%)
    const resultado = calcularRendimentoBruto(1000, 12, 100, 0.13);
    expect(resultado).toBeGreaterThan(1000);
  });

  it("deve calcular rendimento bruto com aporte mensal", () => {
    // valorInicial: 1000, meses: 12, percentualCDI: 100, taxaCDIAnual: 0.13, aporteMensal: 100
    const resultado = calcularRendimentoBruto(1000, 12, 100, 0.13, 100);
    expect(resultado).toBeGreaterThan(1000 + 12 * 100);
  });

  it("deve retornar o valor inicial se meses for 0", () => {
    const resultado = calcularRendimentoBruto(1000, 0, 100, 0.13);
    expect(resultado).toBe(1000);
  });

  it("deve considerar percentualCDI menor que 100%", () => {
    // valorInicial: 1000, meses: 12, percentualCDI: 50, taxaCDIAnual: 0.13
    const resultado = calcularRendimentoBruto(1000, 12, 50, 0.13);
    expect(resultado).toBeGreaterThan(1000);
    expect(resultado).toBeLessThan(
      calcularRendimentoBruto(1000, 12, 100, 0.13)
    );
  });

  it("deve considerar aporteMensal igual a zero", () => {
    const resultado = calcularRendimentoBruto(1000, 12, 100, 0.13, 0);
    expect(resultado).toBeGreaterThan(1000);
  });
});
