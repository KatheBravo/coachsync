// src/components/ClientCard.jsx
import { Card, CardContent, CardActions, Button, Typography, useTheme } from '@mui/material'; // Importa useTheme
import { useNavigate } from 'react-router-dom';

function ClientCard({ cliente }) {
  const navigate = useNavigate();
  const theme = useTheme(); // Accede al tema
  const { name, email, _id } = cliente; // Asegúrate de usar 'name' si el backend lo devuelve así

  const verFicha = () => {
    navigate(`/cliente/${_id}/info`);
  };

  const verHistorial = () => {
    navigate(`/cliente/${_id}/details`);
  };

  const verProgreso = () => {
    navigate(`/cliente/${_id}/details`);
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        width: '100%', // Asegura que la tarjeta ocupe el ancho disponible
        maxWidth: 400, // Limita el ancho máximo para tarjetas individuales
        mb: 2,
        boxShadow: theme.shadows[4], // Sombra más prominente
        borderRadius: 3, // Bordes más redondeados
        backgroundColor: theme.palette.background.paper, // Usa el color 'paper' del tema
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Centra el contenido de la tarjeta
        py: 2, // Padding vertical
      }}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: theme.palette.text.primary, // Color del texto principal
            fontWeight: 500,
            mb: 0.5,
          }}
        >
          {name}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            color: theme.palette.text.secondary, // Color del texto secundario
            fontSize: '0.9rem',
          }}
        >
          {email}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', gap: 1 }}> {/* Centra los botones y añade espacio */}
        <Button
          size="small"
          variant="contained" // Botones llenos
          onClick={verFicha}
          sx={{
            backgroundColor: theme.palette.primary.main, // Color de fondo del botón
            color: theme.palette.background.paper, // Color del texto del botón para contraste
            borderRadius: 2, // Bordes redondeados para los botones
            '&:hover': {
              backgroundColor: theme.palette.primary.light, // Tono más claro al pasar el ratón
            },
          }}
        >
          Ver Ficha
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={verHistorial}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.paper,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: theme.palette.primary.light,
            },
          }}
        >
          Historial
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={verProgreso}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.paper,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: theme.palette.primary.light,
            },
          }}
        >
          Progreso
        </Button>
      </CardActions>
    </Card>
  );
}

export default ClientCard;