// src/pages/Home.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoach } from '../components/CoachInfo'; //

// MUI
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  useTheme // Import useTheme to access theme properties
} from '@mui/material';

function Home() {
  const [id, setId] = useState(''); //
  const navigate = useNavigate(); //
  const { setCoachId, setClients } = useCoach(); //
  const theme = useTheme(); // Access the theme

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
    <Container
      maxWidth={false} // Allow full width
      sx={{
        display: 'flex',
        minHeight: '100vh', // Occupy full viewport height
        alignItems: 'center', // Center content vertically
        justifyContent: 'center', // Center content horizontally
        backgroundColor: theme.palette.background.default, // Use the default background color
        p: 0, // Remove default padding from Container
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Column on small screens, row on medium and up
          width: '100%',
          maxWidth: '1200px', // Max width for the entire section
          minHeight: '80vh', // Ensure it takes significant height
          bgcolor: theme.palette.background.default, // Background for the main box
          borderRadius: 2,
          overflow: 'hidden', // To contain internal elements
          boxShadow: theme.shadows[8], // Add a subtle shadow
        }}
      >
        {/* Left Section - Mimicking "Create your free account" side */}
        <Box
          sx={{
            flex: 1, // Takes available space
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            bgcolor: theme.palette.background.default, // Can be a slightly different dark shade
            color: theme.palette.text.primary,
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: theme.palette.primary.light // Using a lighter color for this section's title
            }}
          >
            CoachSync
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
            Gestiona tus clientes y su progreso de entrenamiento de forma eficiente.
          </Typography>
          {/* You can add an image or more descriptive text here if desired */}
        </Box>

        {/* Right Section - Login Form */}
        <Box
          sx={{
            flex: 1, // Takes available space
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: { xs: 4, md: 6 },
            bgcolor: theme.palette.background.paper, // Use paper color for the form background
            borderLeft: { md: `1px solid ${theme.palette.divider}` }, // A subtle divider
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 600,
              mb: 3,
              color: theme.palette.text.primary
            }}
          >
            Acceder como Coach
          </Typography>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
              width: '100%',
              maxWidth: '350px', // Limit form width
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Ingresa tu ID de Coach"
              variant="outlined"
              value={id}
              onChange={(e) => setId(e.target.value)}
              fullWidth
              sx={{
                // Styles for TextField to make it look like the image's input
                backgroundColor: theme.palette.background.default, // A slightly darker background than the form paper
                borderRadius: theme.shape.borderRadius,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent', // No visible border initially
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main, // Primary color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.secondary.main, // Secondary color when focused
                  },
                  backgroundColor: theme.palette.background.default, // Ensure inner input background is dark
                  color: theme.palette.text.primary, // Input text color
                },
                '& .MuiInputBase-input': {
                  color: theme.palette.text.primary, // Text color inside the input
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.text.secondary, // Label color
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: theme.palette.secondary.main, // Focused label color
                },
              }}
            />
            <Button
              variant="contained"
              color="primary" // Use the primary color from the theme
              onClick={handleLogin}
              disabled={!id.trim()}
              fullWidth
              size="large"
              sx={{
                py: 1.5,
                fontWeight: 600,
                // backgroundColor: theme.palette.primary.main, // Explicitly use primary main for button
                // '&:hover': {
                //   backgroundColor: theme.palette.primary.dark,
                // },
              }}
            >
              Ingresar
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;