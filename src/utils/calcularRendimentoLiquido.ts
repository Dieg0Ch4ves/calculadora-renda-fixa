import type { ResultadoRendimento } from "../types/ResultadoRendimento";
import { calcularImpostoRenda } from "./calcularImpostoRenda";
import { calcularRendimentoBruto } from "./calcularRendimentoBruto";
import { converterParaMeses } from "./converterParaMeses";

export function calcularRendimentoLiquido(
  valor: number,
  periodo: number,
  percentualCDI: number,
  taxaCDIAnual: number,
  tipoPeriodo: string
): ResultadoRendimento {
  const meses = converterParaMeses(periodo, tipoPeriodo);

  const bruto = calcularRendimentoBruto(
    valor,
    meses,
    percentualCDI,
    taxaCDIAnual
  );
  const imposto = calcularImpostoRenda(valor, bruto, meses);
  const liquido = bruto - imposto;

  const grafico = Array.from({ length: meses }, (_, i) => {
    const rendimentoParcial =
      valor *
      Math.pow(
        1 + (Math.pow(1 + taxaCDIAnual, 1 / 12) - 1) * (percentualCDI / 100),
        i + 1
      );
    return {
      periodo: i + 1,
      valor: Number(rendimentoParcial.toFixed(2)),
    };
  });

  return {
    bruto: Number(bruto.toFixed(2)),
    liquido: Number(liquido.toFixed(2)),
    ir: Number(imposto.toFixed(2)),
    titulo: "CDI",
    grafico,
  };
}
