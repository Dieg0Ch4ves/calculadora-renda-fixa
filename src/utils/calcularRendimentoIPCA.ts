import type { ResultadoRendimento } from "../types/ResultadoRendimento";

export function calcularRendimentoIPCA(
  valor: number,
  periodo: number,
  tipoPeriodo: string,
  ipcaAnual: number,
  taxaPrefixada: number
): ResultadoRendimento {
  let meses = periodo;
  if (tipoPeriodo === "dias") meses = periodo / 30;
  if (tipoPeriodo === "anos") meses = periodo * 12;

  const taxaRealAnual = ipcaAnual + taxaPrefixada;
  const taxaMensal = Math.pow(1 + taxaRealAnual, 1 / 12) - 1;

  const bruto = valor * Math.pow(1 + taxaMensal, meses);

  // Cálculo do IR baseado no tempo
  let aliquotaIR = 0.225;
  if (meses > 6 && meses <= 12) aliquotaIR = 0.2;
  else if (meses > 12 && meses <= 24) aliquotaIR = 0.175;
  else if (meses > 24) aliquotaIR = 0.15;

  const rendimento = bruto - valor;
  const ir = rendimento * aliquotaIR;
  const liquido = bruto - ir;

  return {
    bruto: Number(bruto.toFixed(2)),
    liquido: Number(liquido.toFixed(2)),
    ir: Number(ir.toFixed(2)),
    titulo: "IPCA + Prefixado",
  };
}
