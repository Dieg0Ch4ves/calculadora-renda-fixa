import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
  styled,
} from "@mui/material";

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
  const OutlinedInputCustom = styled(OutlinedInput)(({ theme }) => ({
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.secondary.main,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.secondary.main,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.secondary.main,
    },
  }));

  console.log("FormDados", formDados);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDados({
      ...formDados,
      [name]: value,
    });
  };

  return (
    <Stack width={"100%"} spacing={2}>
      <Stack width={"100%"} spacing={2} direction={"row"}>
        <FormControl fullWidth>
          <InputLabel htmlFor="taxa-cdi">CDI (a.a):</InputLabel>
          <OutlinedInputCustom
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

        <FormControl fullWidth>
          <InputLabel htmlFor="taxa-selic">SELIC (a.a):</InputLabel>
          <OutlinedInputCustom
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
      </Stack>

      <Stack width={"100%"} spacing={2} direction={"row"}>
        <FormControl fullWidth>
          <InputLabel htmlFor="taxa-selic">IPCA anual (%):</InputLabel>
          <OutlinedInputCustom
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

        <FormControl fullWidth>
          <InputLabel htmlFor="taxa-prefixada">Taxa Prefixada:</InputLabel>
          <OutlinedInputCustom
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
    </Stack>
  );
};

export default FormDados;
