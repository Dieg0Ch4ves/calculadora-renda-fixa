export function calcularImpostoRenda(
  valorInicial: number,
  valorFinal: number,
  meses: number
): number {
  const lucro = valorFinal - valorInicial;

  let aliquota = 0.15;
  if (meses <= 6) aliquota = 0.225;
  else if (meses <= 12) aliquota = 0.20;
  else if (meses <= 24) aliquota = 0.175;

  return lucro * aliquota;
}
