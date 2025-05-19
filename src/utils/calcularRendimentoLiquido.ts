import type { ResultadoRendimento } from "../types/ResultadoRendimento";
import { calcularImpostoRenda } from "./calcularImpostoRenda";
import { calcularRendimentoBruto } from "./calcularRendimentoBruto";

export function calcularRendimentoLiquido(
  valor: number,
  periodo: number,
  percentualCDI: number,
  taxaCDIAnual: number,
  tipoPeriodo: string
): ResultadoRendimento {
  let meses = periodo;
  if (tipoPeriodo === "dias") meses = periodo / 30;
  if (tipoPeriodo === "anos") meses = periodo * 12;

  const bruto = calcularRendimentoBruto(
    valor,
    meses,
    percentualCDI,
    taxaCDIAnual
  );
  const imposto = calcularImpostoRenda(valor, bruto, meses);
  const liquido = bruto - imposto;

  return {
    bruto: Number(bruto.toFixed(2)),
    liquido: Number(liquido.toFixed(2)),
    ir: Number(imposto.toFixed(2)),
    titulo: "CDI",
  };
}
