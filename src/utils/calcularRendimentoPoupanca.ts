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

  const bruto = valor * Math.pow(1 + taxaPoupancaMensal, meses);

  return {
    bruto: Number(bruto.toFixed(2)),
    liquido: Number(bruto.toFixed(2)), // Igual ao bruto
    ir: 0, // Isento
    titulo: "Poupança",
  };
}
