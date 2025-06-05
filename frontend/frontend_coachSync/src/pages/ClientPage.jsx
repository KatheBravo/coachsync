import { Box, Container, Typography, Grid } from "@mui/material";
import ClientCard from "../components/ClientCard";
import ClientDetails from "../components/ClientDetails";

const sampleClients = [
  { id: 1, name: "Carlos Pérez", age: 30, email: "carlos@example.com" },
  { id: 2, name: "Ana Gómez", age: 25, email: "ana@example.com" },
  { id: 3, name: "Luis Rodríguez", age: 35, email: "luis@example.com" },
];

const ClientPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Clientes
      </Typography>
      <Grid container spacing={2}>
        {sampleClients.map((client) => (
          <Grid item xs={12} sm={6} md={4} key={client.id}>
            <ClientCard client={client} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ClientPage;
