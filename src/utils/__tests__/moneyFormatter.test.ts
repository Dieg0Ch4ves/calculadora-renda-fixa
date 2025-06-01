import { describe, it, expect } from "vitest";
import { moneyFormatter } from "../moneyFormatter";

describe("moneyFormatter", () => {
  it("deve formatar número para moeda brasileira", () => {
    expect(moneyFormatter("123456")).toBe("R$ 1.234,56");
    expect(moneyFormatter("99")).toBe("R$ 0,99");
    expect(moneyFormatter("1000000")).toBe("R$ 10.000,00");
  });

  it("deve retornar R$ 0,00 para string vazia", () => {
    expect(moneyFormatter("")).toBe("R$ 0,00");
  });
});
