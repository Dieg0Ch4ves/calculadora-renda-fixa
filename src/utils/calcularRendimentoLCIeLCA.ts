import type { ResultadoRendimento } from "../types/ResultadoRendimento";

export function calcularRendimentoLCIeLCA(
  valor: number,
  periodo: number,
  percentualCDI: number,
  taxaCDIAnual: number,
  tipoPeriodo: string,
  titulo: "LCI/LCA"
): ResultadoRendimento {
  let meses = periodo;
  if (tipoPeriodo === "dias") meses = periodo / 30;
  if (tipoPeriodo === "anos") meses = periodo * 12;

  const taxaAnual = taxaCDIAnual * (percentualCDI / 100);
  const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;

  const grafico = [];
  let acumulado = valor;

  for (let i = 1; i <= meses; i++) {
    acumulado *= 1 + taxaMensal;
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
