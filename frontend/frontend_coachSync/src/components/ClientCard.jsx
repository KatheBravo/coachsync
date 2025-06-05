// src/components/ClientCard.jsx
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function ClientCard({ cliente }) {
  const navigate = useNavigate(); // Initialize useNavigate
  const { name, email, _id } = cliente; // Destructure _id, and use 'name' instead of 'nombre' based on backend response

  const verFicha = () => {
    navigate(`/cliente/${_id}/info`); // Navigate to ClienteInfo page
  };

  const verHistorial = () => {
    // This will navigate to ClientDetails.jsx, which will handle both historial and progreso
    navigate(`/cliente/${_id}/details`);
  };

  const verProgreso = () => {
    // This will also navigate to ClientDetails.jsx
    navigate(`/cliente/${_id}/details`);
  };

  return (
    <Card sx={{ minWidth: 275, mb: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {name} {/* Use 'name' from backend response */}
        </Typography>
        <Typography color="text.secondary">
          {email}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" onClick={verFicha}>
          Ver Ficha
        </Button>
        <Button size="small" variant="outlined" onClick={verHistorial}>
          Historial
        </Button>
        <Button size="small" variant="outlined" onClick={verProgreso}>
          Progreso
        </Button>
      </CardActions>
    </Card>
  );
}

export default ClientCard;