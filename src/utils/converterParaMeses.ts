export function converterParaMeses(periodo: number, tipo: string): number {
  switch (tipo) {
    case "anos":
      return periodo * 12;
    case "dias":
      return Math.ceil(periodo / 30); // aproximação
    default:
      return periodo;
  }
}
