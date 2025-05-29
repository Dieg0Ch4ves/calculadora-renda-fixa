import { Fade, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import FormDados from "./components/FormDados";
import FormularioRendaFixa from "./components/FormValores";
import Resultado from "./components/Resultado";

import axios from "axios";
import type { ResultadoRendimento } from "./types/ResultadoRendimento";
import { calcularRendimentoIPCA } from "./utils/calcularRendimentoIPCA";
import { calcularRendimentoLCIeLCA } from "./utils/calcularRendimentoLCIeLCA";
import { calcularRendimentoLiquido } from "./utils/calcularRendimentoLiquido";
import { calcularRendimentoPoupanca } from "./utils/calcularRendimentoPoupanca";
import { calcularRendimentoSelic } from "./utils/calcularRendimentoSelic";

function App() {
  // STATES

  const [formValores, setFormValores] = useState({
    valor: "",
    aporteMensal: "",
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

  const temResultado =
    resultadoCDI &&
    resultadoSelic &&
    resultadoPoupanca &&
    resultadoLCIeLCA &&
    resultadoIPCA;

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
    const aporteMensal = Number(formValores.aporteMensal);
    const periodo = Number(formValores.periodo);
    const percentualCdi = Number(formValores.percentualCdi);
    const percentualLciLca = Number(formValores.percentualLciLca);
    const tipoPeriodo = formValores.tipoPeriodo;

    const cdi = calcularRendimentoLiquido(
      valor,
      periodo,
      percentualCdi,
      Number(formDados.taxaCDI) / 100,
      tipoPeriodo,
      aporteMensal
    );

    const selic = calcularRendimentoSelic(
      valor,
      periodo,
      tipoPeriodo,
      Number(formDados.taxaSelic) / 100,
      aporteMensal
    );

    const poupanca = calcularRendimentoPoupanca(
      valor,
      periodo,
      tipoPeriodo,
      Number(formDados.taxaSelic) / 100,
      aporteMensal
    );

    const lciLca = calcularRendimentoLCIeLCA(
      valor,
      periodo,
      percentualLciLca,
      Number(formDados.taxaCDI) / 100,
      tipoPeriodo,
      "LCI/LCA",
      aporteMensal
    );

    const ipcaCalc = calcularRendimentoIPCA(
      valor,
      periodo,
      tipoPeriodo,
      Number(formDados.ipca) / 100,
      Number(formDados.prefixada) / 100,
      aporteMensal
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
    <Fade in={true} timeout={500}>
      <Stack padding={2} width={"100%"} alignItems={"center"} spacing={1}>
        <Typography fontFamily={"fantasy"} variant="h2">
          Calculadora de Renda Fixa
        </Typography>

        <Stack
          gap={2}
          direction={{ xl: "row", md: "column" }}
          padding={temResultado ? 0 : 6}
          width={"100%"}
        >
          <Stack
            width={"100%"}
            component={Paper}
            elevation={5}
            padding={2}
            spacing={2}
          >
            <Stack direction={"column"} spacing={2} width={"100%"}>
              <FormularioRendaFixa
                formValores={formValores}
                setFormValores={setFormValores}
              />
              <FormDados formDados={formDados} setFormDados={setFormDados} />
            </Stack>
          </Stack>

          <Stack
            width={"100%"}
            elevation={5}
            component={Paper}
            spacing={1}
            padding={2}
          >
            {temResultado ? (
              <Fade in={true} timeout={500}>
                <Stack>
                  <Stack spacing={2} direction={{ xl: "row", md: "column" }}>
                    {resultadoCDI && <Resultado {...resultadoCDI} />}
                    {resultadoLCIeLCA && <Resultado {...resultadoLCIeLCA} />}
                  </Stack>

                  <Stack direction={{ lg: "row", md: "column" }} spacing={2}>
                    {resultadoSelic && <Resultado {...resultadoSelic} />}
                    {resultadoPoupanca && <Resultado {...resultadoPoupanca} />}
                  </Stack>
                  {resultadoIPCA && <Resultado {...resultadoIPCA} />}
                </Stack>
              </Fade>
            ) : (
              <Stack
                direction={"column"}
                height={"100%"}
                padding={4}
                alignItems="center"
                justifyContent="center"
                spacing={4}
              >
                <Stack
                  flex={1}
                  alignItems="center"
                  justifyContent="center"
                  minWidth={200}
                  maxWidth={350}
                >
                  <img
                    src="https://ytecnologia.com/wp-content/uploads/2022/08/probelmas-com-fluxo-de-caixa.png"
                    alt="renda_fixa"
                    style={{
                      width: "100%",
                      maxWidth: 600,
                      borderRadius: 16,
                      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                      objectFit: "cover",
                    }}
                  />
                </Stack>
                <Stack flex={2} justifyContent="center" minWidth={250}>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{ fontSize: { xs: 16, md: 18 } }}
                  >
                    Renda fixa é um tipo de investimento em que as regras de
                    rendimento são conhecidas no momento da aplicação. É ideal
                    para quem busca segurança, previsibilidade e estabilidade
                    nos ganhos, sendo uma ótima opção para perfis conservadores
                    ou para quem está começando a investir. Exemplos comuns são
                    CDBs, LCIs, LCAs, Tesouro Direto e a poupança.
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Fade>
  );
}

export default App;
