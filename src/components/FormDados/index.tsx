import { FormControl, InputLabel, OutlinedInput, Stack } from "@mui/material";

interface FormDadosProps {
  formDados: {
    taxaCDI: string;
    taxaSelic: string;
    ipca: string;
    prefixada: string;
  };
  setFormDados: (valores: {
    taxaCDI: string;
    taxaSelic: string;
    ipca: string;
    prefixada: string;
  }) => void;
}

const FormDados = ({ formDados, setFormDados }: FormDadosProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDados({
      ...formDados,
      [name]: value,
    });
  };

  return (
    <Stack spacing={2} direction={"row"}>
      <FormControl>
        <InputLabel htmlFor="taxa-cdi">CDI (a.a):</InputLabel>
        <OutlinedInput
          id="taxa-cdi"
          type="number"
          name="taxaCDI"
          value={formDados.taxaCDI}
          onChange={handleInputChange}
          placeholder="Ex: 100"
          endAdornment="%"
          label="CDI (a.a):"
          inputProps={{ min: 0 }}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="taxa-selic">SELIC (a.a):</InputLabel>
        <OutlinedInput
          id="taxa-selic"
          name="taxaSelic"
          type="number"
          value={formDados.taxaSelic}
          onChange={handleInputChange}
          placeholder="Ex: 100"
          endAdornment="%"
          label="SELIC (a.a):"
          inputProps={{ min: 0 }}
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="taxa-selic">IPCA anual (%):</InputLabel>
        <OutlinedInput
          id="taxa-ipca"
          type="number"
          name="ipca"
          value={formDados.ipca}
          onChange={handleInputChange}
          placeholder="Ex: 100"
          endAdornment="%"
          label="IPCA anual (%)"
          inputProps={{ min: 0 }}
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="taxa-prefixada">Taxa Prefixada:</InputLabel>
        <OutlinedInput
          id="taxa-prefixada"
          name="prefixada"
          type="number"
          value={formDados.prefixada}
          onChange={handleInputChange}
          placeholder="Ex: 100"
          endAdornment="%"
          label="Taxa Prefixada (%)"
          inputProps={{ min: 0 }}
        />
      </FormControl>
    </Stack>
  );
};

export default FormDados;
