import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";

const ClientCard = ({ client }) => {
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{client.name}</Typography>
        <Typography color="text.secondary">Edad: {client.age}</Typography>
        <Typography color="text.secondary">Correo: {client.email}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Ver Detalles</Button>
      </CardActions>
    </Card>
  );
};

export default ClientCard;
