/**
 * Calcula o imposto de renda com base no tempo de aplicação.
 */
export function calcularImpostoRenda(
  valorInicial: number,
  valorFinal: number,
  meses: number
): number {
  const lucro = valorFinal - valorInicial;

  let aliquota = 0.225; // Até 6 meses
  if (meses > 6 && meses <= 12) aliquota = 0.2;
  else if (meses > 12 && meses <= 24) aliquota = 0.175;
  else if (meses > 24) aliquota = 0.15;

  return lucro * aliquota;
}
