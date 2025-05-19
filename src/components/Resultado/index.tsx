import { Typography, Stack, Divider } from "@mui/material";
import type { ResultadoRendimento } from "../../types/ResultadoRendimento";

export default function Resultado({
  titulo,
  bruto,
  liquido,
  ir,
}: ResultadoRendimento) {
  return (
    <Stack spacing={1}>
      <Typography variant="h6" fontWeight={"bold"}>
        {titulo}
      </Typography>
      <Typography color="primary">
        Bruto: <strong>R$ {bruto.toFixed(2)}</strong>{" "}
      </Typography>
      <Typography color="error">
        IR:<strong> R$ {ir.toFixed(2)}</strong>
      </Typography>
      <Typography color="success">
        Liquido: <strong>R$ {liquido.toFixed(2)}</strong>
      </Typography>
      <Divider />
    </Stack>
  );
}
