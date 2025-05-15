/**
 * Simula rendimento bruto com base na taxa SELIC anual.
 * Sem desconto de IR porque depende do tipo de título.
 */
export function calcularRendimentoSelic(
  valor: number,
  meses: number,
  taxaSelicAnual: number
): number {
  const taxaMensal = Math.pow(1 + taxaSelicAnual, 1 / 12) - 1;
  const rendimento = valor * Math.pow(1 + taxaMensal, meses);
  return Number(rendimento.toFixed(2));
}
