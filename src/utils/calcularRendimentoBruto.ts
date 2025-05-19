/**
 * Calcula o rendimento bruto com base na taxa CDI e percentual do CDI.
 */
export function calcularRendimentoBruto(
  valor: number,
  meses: number,
  percentualCDI: number,
  taxaCDIAnual: number
): number {
  const taxaMensal = Math.pow(1 + taxaCDIAnual, 1 / 12) - 1;
  const taxaMensalAjustada = taxaMensal * (percentualCDI / 100);
  const rendimento = valor * Math.pow(1 + taxaMensalAjustada, meses);
  return rendimento;
}
