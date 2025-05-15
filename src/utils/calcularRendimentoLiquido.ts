import { calcularImpostoRenda } from "./calcularImpostoRenda";
import { calcularRendimentoBruto } from "./calcularRendimentoBruto";

export function calcularRendimentoLiquido(
  valor: number,
  meses: number,
  percentualCDI: number,
  taxaCDIAnual: number
): {
  bruto: number;
  ir: number;
  liquido: number;
} {
  const bruto = calcularRendimentoBruto(valor, meses, percentualCDI, taxaCDIAnual);
  const ir = calcularImpostoRenda(valor, bruto, meses);
  const liquido = bruto - ir;

  return {
    bruto: Number(bruto.toFixed(2)),
    ir: Number(ir.toFixed(2)),
    liquido: Number(liquido.toFixed(2)),
  };
}
