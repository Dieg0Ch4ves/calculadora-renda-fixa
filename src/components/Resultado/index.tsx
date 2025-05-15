interface ResultadoProps {
  bruto: number;
  liquido: number;
  ir: number;
}

const Resultado = ({ bruto, liquido, ir }: ResultadoProps) => {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Resultado:</h2>
      <p>Valor Bruto: R$ {bruto.toFixed(2)}</p>
      <p>Imposto de Renda: R$ {ir.toFixed(2)}</p>
      <p>Valor Líquido: R$ {liquido.toFixed(2)}</p>
    </div>
  );
};

export default Resultado;
