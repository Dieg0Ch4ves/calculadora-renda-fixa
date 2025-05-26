export function moneyDeformatter(valorFormatado: string): number {
  const apenasNumeros = valorFormatado.replace(/\D/g, "");
  return Number(apenasNumeros) / 100;
}
