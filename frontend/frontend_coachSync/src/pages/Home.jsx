// src/pages/Home.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoach } from '../components/CoachInfo'; //

// MUI
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material';

function Home() {
  const [id, setId] = useState(''); //
  const navigate = useNavigate(); //
  const { setCoachId, setClients } = useCoach(); //

  const handleLogin = async () => {
    try {
      // Adjusted the API endpoint based on the provided backend endpoints for fetching clients by coach_id.
      // The original code used '/api/v1/users/coach/${id}/clients' which matches the provided endpoint structure.
      const res = await fetch(`http://127.0.0.1:8000/api/v1/users/coach/${id}/clients`); //
      if (!res.ok) throw new Error('Coach no encontrado'); //
      const data = await res.json(); //
      setCoachId(id); //
      setClients(data); //
      navigate('/clientes'); //
    } catch (err) {
      alert(err.message); //
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 10 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Bienvenido Coach
        </Typography>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 2
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Ingresa tu ID"
            variant="outlined"
            value={id}
            onChange={(e) => setId(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            disabled={!id.trim()}
          >
            Ingresar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Home;