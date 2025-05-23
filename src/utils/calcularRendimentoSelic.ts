import type { ResultadoRendimento } from "../types/ResultadoRendimento";
import { calcularImpostoRenda } from "./calcularImpostoRenda";

export function calcularRendimentoSelic(
  valor: number,
  periodo: number,
  tipoPeriodo: string,
  taxaSelicAnual: number
): ResultadoRendimento {
  let meses = periodo;
  if (tipoPeriodo === "dias") meses = periodo / 30;
  if (tipoPeriodo === "anos") meses = periodo * 12;

  const taxaMensal = Math.pow(1 + taxaSelicAnual, 1 / 12) - 1;
  const bruto = valor * Math.pow(1 + taxaMensal, meses);

  const ir = calcularImpostoRenda(valor, bruto, meses);
  const liquido = bruto - ir;

  return {
    bruto: Number(bruto.toFixed(2)),
    liquido: Number(liquido.toFixed(2)),
    ir: Number(ir.toFixed(2)),
    titulo: "SELIC",
  };
}
