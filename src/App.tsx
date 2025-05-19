import { useEffect, useState } from "react";
import { Stack, Paper, Typography } from "@mui/material";

import FormularioRendaFixa from "./components/FormValores";
import FormDados from "./components/FormDados";
import Resultado from "./components/Resultado";

import { calcularRendimentoLiquido } from "./utils/calcularRendimentoLiquido";
import { calcularRendimentoSelic } from "./utils/calcularRendimentoSelic";
import { calcularRendimentoPoupanca } from "./utils/calcularRendimentoPoupanca";
import type { ResultadoRendimento } from "./types/ResultadoRendimento";

function App() {
  const [formValores, setFormValores] = useState({
    valor: "",
    periodo: "",
    tipoPeriodo: "meses",
    percentual: "100",
  });

  const [taxaCDI, setTaxaCDI] = useState("0.135");
  const [taxaSelic, setTaxaSelic] = useState("0.135");

  const [resultadoCDI, setResultadoCDI] = useState<ResultadoRendimento | null>(
    null
  );
  const [resultadoSelic, setResultadoSelic] =
    useState<ResultadoRendimento | null>(null);
  const [resultadoPoupanca, setResultadoPoupanca] =
    useState<ResultadoRendimento | null>(null);

  const handleCalculos = () => {
    const valor = Number(formValores.valor);
    const periodo = Number(formValores.periodo);
    const percentual = Number(formValores.percentual);
    const tipoPeriodo = formValores.tipoPeriodo;

    const cdi = calcularRendimentoLiquido(
      valor,
      periodo,
      percentual,
      Number(taxaCDI),
      tipoPeriodo
    );
    const selic = calcularRendimentoSelic(
      valor,
      periodo,
      tipoPeriodo,
      Number(taxaSelic)
    );
    const poupanca = calcularRendimentoPoupanca(
      valor,
      periodo,
      tipoPeriodo,
      Number(taxaSelic)
    );

    setResultadoCDI(cdi);
    setResultadoSelic(selic);
    setResultadoPoupanca(poupanca);
  };

  useEffect(() => {
    const { valor, periodo, percentual } = formValores;
    if (valor && periodo && percentual && taxaCDI && taxaSelic) {
      handleCalculos();
    }
  }, [formValores, taxaCDI, taxaSelic]);

  return (
    <Stack width={"100%"} alignItems={"center"} spacing={4}>
      <Typography variant="h2">Calculadora de Renda Fixa</Typography>

      <Stack
        direction={"row"}
        spacing={2}
        justifyContent={"space-between"}
        width={"100%"}
      >
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
        </Stack>

        <Stack component={Paper} spacing={2} padding={2}>
          {resultadoCDI && <Resultado {...resultadoCDI} />}
          {resultadoSelic && <Resultado {...resultadoSelic} />}
          {resultadoPoupanca && <Resultado {...resultadoPoupanca} />}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default App;
