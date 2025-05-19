// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // ou 'dark'
    primary: {
      main: "#1976d2", // sua cor personalizada
      contrastText: "#fff", // texto sobre a cor primária
    },
    secondary: {
      main: "#9c27b0",
      contrastText: "#fff",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
    background: {
      default: "#F7F7F2",
      paper: "#F7F7F2",
    },
    text: {
      primary: "#121113",
      secondary: "#666",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default theme;
