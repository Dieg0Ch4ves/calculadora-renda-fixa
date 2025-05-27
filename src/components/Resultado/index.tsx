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
    <Stack minWidth={800}>
      <Typography variant="h6" padding={0} margin={0} fontWeight="bold">
        {titulo}
      </Typography>

      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <Stack minWidth={200}>
          <Typography color="primary">
            Bruto: <strong>{moneyFormatter(String(bruto.toFixed(2)))}</strong>
          </Typography>
          <Typography color="error">
            IR: <strong>- {moneyFormatter(String(ir.toFixed(2)))}</strong>
          </Typography>
          <Typography color="success.main">
            Líquido:{" "}
            <strong>{moneyFormatter(String(liquido.toFixed(2)))}</strong>
          </Typography>
        </Stack>

        {grafico && (
          <ResponsiveContainer
            height={150}
            style={{ padding: "20px" }}
            width="100%"
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
