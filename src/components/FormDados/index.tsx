import { FormControl, InputLabel, OutlinedInput, Stack } from "@mui/material";

interface FormDadosProps {
  taxaCDI: string;
  setTaxaCDI: (valor: string) => void;
  taxaSelic: string;
  setTaxaSelic: (valor: string) => void;
}

const FormDados = ({
  taxaCDI,
  setTaxaCDI,
  taxaSelic,
  setTaxaSelic,
}: FormDadosProps) => {
  return (
    <Stack spacing={2} direction={"row"}>
      <FormControl>
        <InputLabel htmlFor="taxa-cdi">CDI (a.a):</InputLabel>
        <OutlinedInput
          id="taxa-cdi"
          value={taxaCDI}
          onChange={(e) => setTaxaCDI(e.target.value)}
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
          value={taxaSelic}
          onChange={(e) => setTaxaSelic(e.target.value)}
          placeholder="Ex: 100"
          endAdornment="%"
          label="SELIC (a.a):"
          inputProps={{ min: 0 }}
        />
      </FormControl>
    </Stack>
  );
};

export default FormDados;
