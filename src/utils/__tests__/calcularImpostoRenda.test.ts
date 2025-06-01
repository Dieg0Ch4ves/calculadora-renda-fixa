import { describe, it, expect } from "vitest";
import { calcularImpostoRenda } from "../calcularImpostoRenda";

describe("calcularImpostoRenda", () => {
  it("deve aplicar 22.5% para até 6 meses", () => {
    expect(calcularImpostoRenda(1000, 6)).toBe(225);
    expect(calcularImpostoRenda(2000, 3)).toBe(450);
  });

  it("deve aplicar 20% para mais de 6 até 12 meses", () => {
    expect(calcularImpostoRenda(1000, 7)).toBe(200);
    expect(calcularImpostoRenda(1000, 12)).toBe(200);
  });

  it("deve aplicar 17.5% para mais de 12 até 24 meses", () => {
    expect(calcularImpostoRenda(1000, 13)).toBe(175);
    expect(calcularImpostoRenda(1000, 24)).toBe(175);
  });

  it("deve aplicar 15% para mais de 24 meses", () => {
    expect(calcularImpostoRenda(1000, 25)).toBe(150);
    expect(calcularImpostoRenda(2000, 36)).toBe(300);
  });
});
