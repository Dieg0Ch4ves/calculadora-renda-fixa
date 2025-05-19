import {
  FormControl,
  Stack,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";

interface FormularioProps {
  formValores: {
    valor: string;
    periodo: string;
    tipoPeriodo: string;
    percentual: string;
  };
  setFormValores: (valores: {
    valor: string;
    periodo: string;
    tipoPeriodo: string;
    percentual: string;
  }) => void;
}

const FormularioRendaFixa = ({
  formValores,
  setFormValores,
}: FormularioProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValores({
      ...formValores,
      [name]: value,
    });
  };

  const handleTipoPeriodoChange = (e: SelectChangeEvent) => {
    setFormValores({
      ...formValores,
      tipoPeriodo: e.target.value as string,
    });
  };

  return (
    <Stack spacing={2} component={"form"}>
      <FormControl>
        <TextField
          label="Valor Investido (R$):"
          type="number"
          name="valor"
          value={formValores.valor}
          onChange={handleInputChange}
          slotProps={{ input: { startAdornment: "R$" } }}
        />
      </FormControl>

      <FormControl>
        <TextField
          label="Prazo"
          type="number"
          name="periodo"
          value={formValores.periodo}
          onChange={handleInputChange}
          placeholder="Ex: 12"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Select
                  value={formValores.tipoPeriodo}
                  onChange={handleTipoPeriodoChange}
                  variant="standard"
                  disableUnderline
                  sx={{ minWidth: 60 }}
                  inputProps={{ "aria-label": "Tipo de período" }}
                >
                  <MenuItem value="dias">dias</MenuItem>
                  <MenuItem value="meses">meses</MenuItem>
                  <MenuItem value="anos">anos</MenuItem>
                </Select>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>

      <FormControl>
        <TextField
          label="Percentual do CDI (%):"
          name="percentual"
          type="number"
          value={formValores.percentual}
          onChange={handleInputChange}
          placeholder="Ex: 100"
          slotProps={{ input: { endAdornment: "%" } }}
        />
      </FormControl>
    </Stack>
  );
};

export default FormularioRendaFixa;
