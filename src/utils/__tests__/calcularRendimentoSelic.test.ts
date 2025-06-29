import { describe, it, expect } from "vitest";
import { calcularRendimentoSelic } from "../calcularRendimentoSelic";

describe("calcularRendimentoSelic", () => {
  it("deve calcular rendimento SELIC sem aporte mensal", () => {
    const resultado = calcularRendimentoSelic(1000, 12, "meses", 0.13, 0);
    expect(resultado.bruto).toBeGreaterThan(1000);
    expect(resultado.liquido).toBeLessThan(resultado.bruto);
    expect(resultado.ir).toBeGreaterThan(0);
  });

  it("deve calcular rendimento SELIC com aporte mensal", () => {
    const resultado = calcularRendimentoSelic(500, 24, "meses", 0.13, 100);
    expect(resultado.bruto).toBeGreaterThan(500 + 24 * 100);
    expect(resultado.liquido).toBeLessThan(resultado.bruto);
    expect(resultado.ir).toBeGreaterThan(0);
  });

  it("deve retornar o valor inicial se meses for 0", () => {
    const resultado = calcularRendimentoSelic(1000, 0, "meses", 0.13, 0);
    expect(resultado.bruto).toBe(1000);
    expect(resultado.liquido).toBe(1000);
    expect(resultado.ir).toBe(0);
  });

  it("deve calcular corretamente para taxaSelic zero", () => {
    const resultado = calcularRendimentoSelic(1000, 12, "meses", 0, 0);
    expect(resultado.bruto).toBe(1000);
    expect(resultado.liquido).toBe(1000);
    expect(resultado.ir).toBe(0);
  });
});
