import { useEffect, useState } from "react";
import { Stack, Paper, Typography } from "@mui/material";

import FormularioRendaFixa from "./components/FormValores";
import FormDados from "./components/FormDados";
import Resultado from "./components/Resultado";

import { calcularRendimentoLiquido } from "./utils/calcularRendimentoLiquido";
import { calcularRendimentoSelic } from "./utils/calcularRendimentoSelic";
import { calcularRendimentoPoupanca } from "./utils/calcularRendimentoPoupanca";
import type { ResultadoRendimento } from "./types/ResultadoRendimento";
import { calcularRendimentoLCIeLCA } from "./utils/calcularRendimentoLCIeLCA";
import { calcularRendimentoIPCA } from "./utils/calcularRendimentoIPCA";
import axios from "axios";

function App() {
  // STATES

  const [formValores, setFormValores] = useState({
    valor: "",
    periodo: "",
    tipoPeriodo: "meses",
    percentualCdi: "100",
    percentualLciLca: "85",
  });

  const [formDados, setFormDados] = useState<{
    taxaCDI: string;
    taxaSelic: string;
    ipca: string;
    prefixada: string;
  }>({
    taxaCDI: "13.65",
    taxaSelic: "13.65",
    ipca: "4.5  ",
    prefixada: "6",
  });

  const [resultadoCDI, setResultadoCDI] = useState<ResultadoRendimento | null>(
    null
  );
  const [resultadoSelic, setResultadoSelic] =
    useState<ResultadoRendimento | null>(null);
  const [resultadoPoupanca, setResultadoPoupanca] =
    useState<ResultadoRendimento | null>(null);
  const [resultadoLCIeLCA, setResultadoLCIeLCA] =
    useState<ResultadoRendimento | null>(null);
  const [resultadoIPCA, setResultadoIPCA] =
    useState<ResultadoRendimento | null>(null);

  // HANDLERS

  const buscarTaxas = async () => {
    try {
      const response = await axios.get("https://brasilapi.com.br/api/taxas/v1");
      const data = response.data;

      const selicRes = data.find(
        (taxa: { nome: string }) => taxa.nome === "Selic"
      );
      const cdiRes = data.find((taxa: { nome: string }) => taxa.nome === "CDI");
      const ipcaRes = data.find(
        (taxa: { nome: string }) => taxa.nome === "IPCA"
      );

      setFormDados((prev) => ({
        ...prev,
        taxaSelic: selicRes?.valor.toFixed(2) ?? prev.taxaSelic,
        taxaCDI: cdiRes?.valor.toFixed(2) ?? prev.taxaCDI,
        ipca: ipcaRes?.valor.toFixed(2) ?? prev.ipca,
      }));
    } catch (error) {
      console.error("Erro ao buscar taxas:", error);
    }
  };

  const handleCalculos = () => {
    const valor = Number(formValores.valor);
    const periodo = Number(formValores.periodo);
    const percentualCdi = Number(formValores.percentualCdi);
    const percentualLciLca = Number(formValores.percentualLciLca);
    const tipoPeriodo = formValores.tipoPeriodo;

    const cdi = calcularRendimentoLiquido(
      valor,
      periodo,
      percentualCdi,
      Number(formDados.taxaCDI) / 100,
      tipoPeriodo
    );

    const selic = calcularRendimentoSelic(
      valor,
      periodo,
      tipoPeriodo,
      Number(formDados.taxaSelic) / 100
    );

    const poupanca = calcularRendimentoPoupanca(
      valor,
      periodo,
      tipoPeriodo,
      Number(formDados.taxaSelic) / 100
    );

    const lciLca = calcularRendimentoLCIeLCA(
      valor,
      periodo,
      percentualLciLca,
      Number(formDados.taxaCDI) / 100,
      tipoPeriodo,
      "LCI/LCA"
    );

    const ipcaCalc = calcularRendimentoIPCA(
      valor,
      periodo,
      tipoPeriodo,
      Number(formDados.ipca) / 100,
      Number(formDados.prefixada) / 100
    );

    setResultadoCDI(cdi);
    setResultadoSelic(selic);
    setResultadoPoupanca(poupanca);
    setResultadoLCIeLCA(lciLca);
    setResultadoIPCA(ipcaCalc);
  };

  useEffect(() => {
    const { valor, periodo, percentualCdi, percentualLciLca } = formValores;
    const { taxaCDI, taxaSelic, ipca, prefixada } = formDados;

    if (
      valor &&
      periodo &&
      percentualCdi &&
      percentualLciLca &&
      taxaCDI &&
      taxaSelic &&
      ipca &&
      prefixada
    ) {
      handleCalculos();
    }
  }, [formValores, formDados]);

  useEffect(() => {
    buscarTaxas();
  }, []);

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
            <FormDados formDados={formDados} setFormDados={setFormDados} />
          </Stack>
        </Stack>

        <Stack component={Paper} spacing={2} padding={2}>
          {resultadoCDI && <Resultado {...resultadoCDI} />}
          {resultadoLCIeLCA && <Resultado {...resultadoLCIeLCA} />}
          {resultadoSelic && <Resultado {...resultadoSelic} />}
          {resultadoPoupanca && <Resultado {...resultadoPoupanca} />}
          {resultadoIPCA && <Resultado {...resultadoIPCA} />}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default App;
