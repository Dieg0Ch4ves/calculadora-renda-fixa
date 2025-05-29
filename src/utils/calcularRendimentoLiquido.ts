import type { ResultadoRendimento } from "../types/ResultadoRendimento";
import { calcularImpostoRenda } from "./calcularImpostoRenda";
import { calcularRendimentoBruto } from "./calcularRendimentoBruto";
import { converterParaMeses } from "./converterParaMeses";

export function calcularRendimentoLiquido(
  valorInicial: number,
  periodo: number,
  percentualCDI: number,
  taxaCDIAnual: number,
  tipoPeriodo: string,
  aporteMensal: number = 0
): ResultadoRendimento {
  const meses = converterParaMeses(periodo, tipoPeriodo);

  const bruto = calcularRendimentoBruto(
    valorInicial,
    meses,
    percentualCDI,
    taxaCDIAnual,
    aporteMensal
  );

  // Corrigido: total aportado ao longo do tempo
  const totalAportado = valorInicial + aporteMensal * meses;

  // Lucro real (base para imposto de renda)
  const lucro = bruto - totalAportado;

  // IR sobre o lucro
  const imposto = calcularImpostoRenda(lucro, meses);

  const liquido = bruto - imposto;

  // Monta dados do gráfico
  const taxaMensal = Math.pow(1 + taxaCDIAnual, 1 / 12) - 1;
  const taxaMensalAjustada = taxaMensal * (percentualCDI / 100);

  let saldo = valorInicial;
  const grafico = [];

  for (let i = 1; i <= meses; i++) {
    saldo *= 1 + taxaMensalAjustada;
    if (aporteMensal > 0) {
      saldo += aporteMensal;
    }
    grafico.push({ periodo: i, valor: Number(saldo.toFixed(2)) });
  }

  return {
    bruto: Number(bruto.toFixed(2)),
    liquido: Number(liquido.toFixed(2)),
    ir: Number(imposto.toFixed(2)),
    titulo: "CDB",
    grafico,
  };
}
