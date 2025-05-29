import type { ResultadoRendimento } from "../types/ResultadoRendimento";
import { converterParaMeses } from "./converterParaMeses";

export function calcularRendimentoLCIeLCA(
  valor: number,
  periodo: number,
  percentualCDI: number,
  taxaCDIAnual: number,
  tipoPeriodo: string,
  titulo: "LCI/LCA",
  aporteMensal: number = 0
): ResultadoRendimento {
  const meses = converterParaMeses(periodo, tipoPeriodo);

  const taxaAnual = taxaCDIAnual * (percentualCDI / 100);
  const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;

  const grafico = [];
  let acumulado = valor;

  for (let i = 1; i <= meses; i++) {
    acumulado *= 1 + taxaMensal;
    acumulado += aporteMensal;
    grafico.push({ periodo: i, valor: Number(acumulado.toFixed(2)) });
  }

  const bruto = acumulado;

  return {
    bruto: Number(bruto.toFixed(2)),
    liquido: Number(bruto.toFixed(2)),
    ir: 0,
    titulo,
    grafico,
  };
}
