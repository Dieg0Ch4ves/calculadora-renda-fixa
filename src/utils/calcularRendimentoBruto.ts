export function calcularRendimentoBruto(
  valor: number,
  meses: number,
  percentualCDI: number,
  taxaCDIAnual: number
): number {
  const taxaMensal = Math.pow(1 + taxaCDIAnual, 1 / 12) - 1;
  const rendimento = valor * Math.pow(1 + (percentualCDI / 100) * taxaMensal, meses);
  return rendimento;
}
