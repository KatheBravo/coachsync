import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Box textAlign="center">
        <Typography variant="h3" gutterBottom>
          Bienvenido a tu plataforma Fitness
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Gestiona clientes, registra progresos y controla el historial de entrenamientos desde un solo lugar.
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/clientes")}
          >
            Ver clientes
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
