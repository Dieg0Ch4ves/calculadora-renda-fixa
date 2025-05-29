import type { ResultadoRendimento } from "../types/ResultadoRendimento";
import { calcularImpostoRenda } from "./calcularImpostoRenda";
import { converterParaMeses } from "./converterParaMeses";

export function calcularRendimentoIPCA(
  valor: number,
  periodo: number,
  tipoPeriodo: string,
  ipcaAnual: number,
  taxaPrefixada: number,
  aporteMensal: number = 0
): ResultadoRendimento {
  const meses = converterParaMeses(periodo, tipoPeriodo);

  const taxaRealAnual = ipcaAnual + taxaPrefixada;
  const taxaMensal = Math.pow(1 + taxaRealAnual, 1 / 12) - 1;

  const grafico = [];
  let acumulado = valor;

  for (let i = 1; i <= meses; i++) {
    acumulado *= 1 + taxaMensal;
    acumulado += aporteMensal;
    grafico.push({ periodo: i, valor: Number(acumulado.toFixed(2)) });
  }

  const bruto = acumulado;
  const totalAportado = valor + aporteMensal * meses;
  const lucro = bruto - totalAportado;
  const ir = calcularImpostoRenda(lucro, meses);
  const liquido = bruto - ir;

  return {
    bruto: Number(bruto.toFixed(2)),
    liquido: Number(liquido.toFixed(2)),
    ir: Number(ir.toFixed(2)),
    titulo: "IPCA + Prefixado",
    grafico,
  };
}
