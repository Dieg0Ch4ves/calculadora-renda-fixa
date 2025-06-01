import { describe, it, expect } from "vitest";
import { moneyDeformatter } from "../moneyDeformatter";

describe("moneyDeformatter", () => {
  it("deve remover formatação e retornar número", () => {
    expect(moneyDeformatter("R$ 1.234,56")).toBe(1234.56);
    expect(moneyDeformatter("R$ 0,99")).toBe(0.99);
    expect(moneyDeformatter("R$ 10.000,00")).toBe(10000);
  });

  it("deve retornar 0 para string vazia", () => {
    expect(moneyDeformatter("")).toBe(0);
  });
});
