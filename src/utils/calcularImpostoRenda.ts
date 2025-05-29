/**
 * Calcula o imposto de renda com base no tempo de aplicação.
 */
export function calcularImpostoRenda(lucro: number, meses: number): number {
  let aliquota = 0.225;

  if (meses > 6 && meses <= 12) aliquota = 0.2;
  else if (meses > 12 && meses <= 24) aliquota = 0.175;
  else if (meses > 24) aliquota = 0.15;

  const imposto = lucro * aliquota;
  return imposto;
}
