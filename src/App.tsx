import { useState } from "react";
import FormularioRendaFixa from "./components/FormValores";
import Resultado from "./components/Resultado";
import { calcularRendimentoLiquido } from "./utils/calcularRendimentoLiquido";
import { Paper, Stack } from "@mui/material";
import FormDados from "./components/FormDados";

function App() {
  const [resultado, setResultado] = useState<{
    bruto: number;
    liquido: number;
    ir: number;
  } | null>(null);

  const [formValores, setFormValores] = useState<{
    valor: string;
    periodo: string;
    tipoPeriodo: string;
    percentual: string;
  }>({
    valor: "",
    periodo: "",
    tipoPeriodo: "meses",
    percentual: "",
  });

  const [taxaCDI, setTaxaCDI] = useState("0.135");
  const [taxaSelic, setTaxaSelic] = useState("0.135");

  const handleCalculo = ({
    valor,
    meses,
    percentual,
  }: {
    valor: number;
    meses: number;
    percentual: number;
  }) => {
    const resultado = calcularRendimentoLiquido(
      valor,
      meses,
      percentual,
      Number(taxaCDI)
    );
    setResultado(resultado);
  };

  return (
    <Stack width={"100%"} alignItems={"center"} spacing={4}>
      <h1>Calculadora de Renda Fixa</h1>

      <Stack
        component={Paper}
        elevation={5}
        padding={2}
        spacing={2}
        direction={"row"}
      >
        <Stack direction={"column"} spacing={2} width={"100%"}>
          <FormularioRendaFixa
            formValores={formValores}
            setFormValores={setFormValores}
          />
          <FormDados
            taxaCDI={taxaCDI}
            setTaxaCDI={setTaxaCDI}
            taxaSelic={taxaSelic}
            setTaxaSelic={setTaxaSelic}
          />
        </Stack>

        {resultado && <Resultado {...resultado} />}
      </Stack>
    </Stack>
  );
}

export default App;
