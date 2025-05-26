import type { ResultadoRendimento } from "../types/ResultadoRendimento";

export function calcularRendimentoPoupanca(
  valor: number,
  periodo: number,
  tipoPeriodo: string,
  taxaSelicAnual: number
): ResultadoRendimento {
  let meses = periodo;
  if (tipoPeriodo === "dias") meses = periodo / 30;
  if (tipoPeriodo === "anos") meses = periodo * 12;

  const selicMensal = Math.pow(1 + taxaSelicAnual, 1 / 12) - 1;
  let taxaPoupancaMensal = 0.005;
  if (taxaSelicAnual <= 0.085) {
    taxaPoupancaMensal = selicMensal * 0.7;
  }

  const grafico = [];
  let acumulado = valor;

  for (let i = 1; i <= meses; i++) {
    acumulado *= 1 + taxaPoupancaMensal;
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
