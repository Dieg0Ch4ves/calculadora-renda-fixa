import { Typography, Stack, Divider } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import type { ResultadoRendimento } from "../../types/ResultadoRendimento";
import { moneyFormatter } from "../../utils/moneyFormatter";

export default function Resultado({
  titulo,
  bruto,
  liquido,
  ir,
  grafico,
}: ResultadoRendimento) {
  return (
    <Stack width={"100%"}>
      <Typography variant="h6" padding={0} margin={0} fontWeight="bold">
        {titulo}
      </Typography>

      <Stack
        direction={{ lg: "row", sm: "column" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack minWidth={150}>
          <Typography variant="caption" color="primary">
            Bruto: <strong>{moneyFormatter(String(bruto.toFixed(2)))}</strong>
          </Typography>
          <Typography variant="caption" color="error">
            IR: <strong>- {moneyFormatter(String(ir.toFixed(2)))}</strong>
          </Typography>
          <Typography variant="caption" color="success.main">
            Líquido:{" "}
            <strong>{moneyFormatter(String(liquido.toFixed(2)))}</strong>
          </Typography>
        </Stack>

        {grafico && (
          <ResponsiveContainer
            height={120}
            minWidth={300}
            style={{ padding: "10px" }}
            width="100%"
            data-testid="grafico-rendimento"
          >
            <LineChart data={grafico}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="periodo"
                label={{
                  value: "Período",
                  position: "insideBottomRight",
                  offset: -5,
                }}
              />
              <YAxis
                domain={["dataMin - 10", "dataMax + 10"]}
                tickFormatter={(value) => `${moneyFormatter(value.toFixed(2))}`}
              />
              <Tooltip
                formatter={(value: number) =>
                  `${moneyFormatter(value.toFixed(2))}`
                }
              />
              <Line
                type="monotone"
                dataKey="valor"
                stroke="#1976d2"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Stack>
      <Divider />
    </Stack>
  );
}
