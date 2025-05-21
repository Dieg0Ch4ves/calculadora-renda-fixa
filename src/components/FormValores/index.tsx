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
    percentualCdi: string;
    percentualLciLca: string;
  };
  setFormValores: (valores: {
    valor: string;
    periodo: string;
    tipoPeriodo: string;
    percentualCdi: string;
    percentualLciLca: string;
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
          name="percentualCdi"
          type="number"
          value={formValores.percentualCdi}
          onChange={handleInputChange}
          placeholder="Ex: 100"
          slotProps={{ input: { endAdornment: "%" } }}
        />
      </FormControl>

      <FormControl>
        <TextField
          label="Percentual da LCI/LCA (%):"
          name="percentualLciLca"
          type="number"
          value={formValores.percentualLciLca}
          onChange={handleInputChange}
          placeholder="Ex: 100"
          slotProps={{ input: { endAdornment: "%" } }}
        />
      </FormControl>
    </Stack>
  );
};

export default FormularioRendaFixa;
