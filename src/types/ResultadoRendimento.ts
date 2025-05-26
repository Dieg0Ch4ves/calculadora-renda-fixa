export interface ResultadoRendimento {
  bruto: number;
  liquido: number;
  ir: number;
  titulo: string;
  grafico?: { periodo: number; valor: number }[];
}
