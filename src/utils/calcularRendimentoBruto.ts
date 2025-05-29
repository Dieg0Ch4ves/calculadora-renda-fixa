export function calcularRendimentoBruto(
  valorInicial: number,
  meses: number,
  percentualCDI: number,
  taxaCDIAnual: number,
  aporteMensal: number = 0
): number {
  const taxaMensal = Math.pow(1 + taxaCDIAnual, 1 / 12) - 1;
  const taxaMensalAjustada = taxaMensal * (percentualCDI / 100);

  let total = valorInicial;

  for (let i = 1; i <= meses; i++) {
    total *= 1 + taxaMensalAjustada;
    if (aporteMensal > 0) {
      total += aporteMensal;
    }
  }

  return total;
}
