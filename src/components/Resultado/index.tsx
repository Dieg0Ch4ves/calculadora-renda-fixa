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
    <Stack minWidth={600} spacing={2}>
      <Typography variant="h6" fontWeight="bold">
        {titulo}
      </Typography>

      <Stack spacing={2} justifyContent={"space-between"} direction={"row"}>
        <Typography color="primary">
          Bruto: <strong>{moneyFormatter(String(bruto.toFixed(2)))}</strong>
        </Typography>
        <Typography color="error">
          IR: <strong>{moneyFormatter(String(ir.toFixed(2)))}</strong>
        </Typography>
        <Typography color="success.main">
          Líquido: <strong>{moneyFormatter(String(liquido.toFixed(2)))}</strong>
        </Typography>
      </Stack>

      {grafico && (
        <ResponsiveContainer width="100%" height={200}>
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
            <YAxis tickFormatter={(value) => `R$ ${value.toFixed(0)}`} />
            <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
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

      <Divider />
    </Stack>
  );
}
