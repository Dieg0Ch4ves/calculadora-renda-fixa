import { describe, it, expect } from "vitest";
import { converterParaMeses } from "../converterParaMeses";

describe("converterParaMeses", () => {
  it("converte anos para meses", () => {
    expect(converterParaMeses(2, "anos")).toBe(24);
  });

  it("converte dias para meses (aproximação)", () => {
    expect(converterParaMeses(60, "dias")).toBe(2);
    expect(converterParaMeses(45, "dias")).toBe(2);
    expect(converterParaMeses(31, "dias")).toBe(2);
    expect(converterParaMeses(29, "dias")).toBe(1);
  });

  it("retorna o próprio período para tipo padrão", () => {
    expect(converterParaMeses(10, "meses")).toBe(10);
    expect(converterParaMeses(5, "")).toBe(5);
  });
});
