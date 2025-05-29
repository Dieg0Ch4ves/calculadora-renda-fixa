import type { ResultadoRendimento } from "../types/ResultadoRendimento";
import { converterParaMeses } from "./converterParaMeses";

export function calcularRendimentoPoupanca(
  valor: number,
  periodo: number,
  tipoPeriodo: string,
  taxaSelicAnual: number,
  aporteMensal: number = 0
): ResultadoRendimento {
  const meses = converterParaMeses(periodo, tipoPeriodo);

  const selicMensal = Math.pow(1 + taxaSelicAnual, 1 / 12) - 1;
  let taxaPoupancaMensal = 0.005;
  if (taxaSelicAnual <= 0.085) {
    taxaPoupancaMensal = selicMensal * 0.7;
  }

  const grafico = [];
  let acumulado = valor;

  for (let i = 1; i <= meses; i++) {
    acumulado *= 1 + taxaPoupancaMensal;
    acumulado += aporteMensal;
    grafico.push({ periodo: i, valor: Number(acumulado.toFixed(2)) });
  }

  const bruto = acumulado;

  return {
    bruto: Number(bruto.toFixed(2)),
    liquido: Number(bruto.toFixed(2)),
    ir: 0,
    titulo: "Poupança",
    grafico,
  };
}
