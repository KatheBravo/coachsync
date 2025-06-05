// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Material-UI Theme imports
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Para establecer un baseline de estilos CSS

// Define tu tema personalizado
const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Establece el modo oscuro
    primary: {
      main: '#de90c9', // Un color vibrante para elementos primarios
    },
    secondary: {
      main: '#f8c1ed', // Otro color claro para énfasis o acciones secundarias
    },
    background: {
      default: '#3e304b', // El color más oscuro para el fondo general de la aplicación
      paper: '#604669', // Un color ligeramente más claro para las tarjetas y superficies
    },
    text: {
      primary: '#f8c1ed', // Color de texto principal
      secondary: '#de90c9', // Color de texto secundario
    },
    // Puedes añadir más tonos si lo deseas, por ejemplo:
    // info: { main: '#946691' },
    // success: { main: '#946691' },
    // warning: { main: '#946691' },
    // error: { main: '#946691' },
  },
  typography: {
    fontFamily: [
      'Poppins', // La fuente principal
      'sans-serif',
    ].join(','),
    h5: {
      fontWeight: 600, // Hace el título 'Bienvenido Coach' más llamativo
    },
    button: {
      textTransform: 'none', // Para botones con texto no en mayúsculas por defecto
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#946691', // Color del borde del TextField en estado normal
            },
            '&:hover fieldset': {
              borderColor: '#de90c9', // Color del borde al pasar el ratón
            },
            '&.Mui-focused fieldset': {
              borderColor: '#f8c1ed', // Color del borde cuando está enfocado
            },
          },
          '& .MuiInputLabel-root': {
            color: '#f8c1ed', // Color del label
          },
          '& .MuiInputBase-input': {
            color: '#f8c1ed', // Color del texto de entrada
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Bordes ligeramente redondeados para botones
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#604669', // Asegura que el Paper use el color de fondo definido para Paper
          borderRadius: 12, // Bordes más redondeados para las tarjetas
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          // Ajustes si el Container necesita un fondo específico que no sea el default de background
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Normaliza los estilos CSS y aplica el color de fondo del tema */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);