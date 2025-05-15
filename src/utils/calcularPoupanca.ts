/**
 * Simula rendimento da poupança com base em regra atual (70% da SELIC quando <= 8.5% ao ano)
 * Ou 0,5% ao mês se SELIC > 8.5%
 */
export function calcularRendimentoPoupanca(
  valor: number,
  meses: number,
  taxaSelicAnual: number
): number {
  const selicMensal = Math.pow(1 + taxaSelicAnual, 1 / 12) - 1;

  let taxaPoupancaMensal = 0.005; // 0,5%
  if (taxaSelicAnual <= 0.085) {
    taxaPoupancaMensal = selicMensal * 0.7;
  }

  const rendimento = valor * Math.pow(1 + taxaPoupancaMensal, meses);
  return Number(rendimento.toFixed(2));
}
