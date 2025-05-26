export function moneyFormatter(valor: string): string {
  const valorNumerico = valor.replace(/\D/g, ""); // remove tudo que não for número
  const numero = Number(valorNumerico) / 100;

  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
