import {
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import { moneyDeformatter } from "../../utils/moneyDeformatter";

interface FormularioProps {
  formValores: {
    valor: string;
    aporteMensal: string;
    periodo: string;
    tipoPeriodo: string;
    percentualCdi: string;
    percentualLciLca: string;
  };
  setFormValores: (valores: {
    valor: string;
    aporteMensal: string;
    periodo: string;
    tipoPeriodo: string;
    percentualCdi: string;
    percentualLciLca: string;
  }) => void;
}

const FormValores = ({ formValores, setFormValores }: FormularioProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "valor") {
      const formattedValue = moneyDeformatter(value);
      setFormValores({
        ...formValores,
        [name]: formattedValue.toString(),
      });
      return;
    }

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
        <NumericFormat
          customInput={TextField}
          label="Valor Investido (R$)"
          value={formValores.valor}
          onValueChange={(values) => {
            const { value } = values;
            setFormValores({ ...formValores, valor: value });
          }}
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          inputMode="numeric"
        />
      </FormControl>

      <FormControl>
        <NumericFormat
          customInput={TextField}
          label="Aportes Mensais (R$)"
          value={formValores.aporteMensal}
          onValueChange={(values) => {
            const { value } = values;
            setFormValores({ ...formValores, aporteMensal: value });
          }}
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          inputMode="numeric"
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

export default FormValores;
