// src/pages/ClientePage.jsx
import { useCoach } from '../components/CoachInfo';
import ClientCard from '../components/ClientCard';
import { useEffect, useState, useCallback } from 'react'; // Importa useCallback

// MUI Components
import {
  Container,
  Typography,
  Box,
  useTheme,
  Fab, // Floating Action Button
  Dialog, // Modal dialog
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress, // Para el estado de carga
  Grid // Importa Grid para el layout en filas
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Icono de añadir

function ClientePage() {
  const { coachId, clients, setClients } = useCoach(); // Obtenemos coachId y setClients
  const theme = useTheme();

  const [openDialog, setOpenDialog] = useState(false); // Estado para controlar la visibilidad del modal
  const [newClientForm, setNewClientForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreatingClient, setIsCreatingClient] = useState(false); // Estado para el loading del botón de crear

  // Función para obtener los clientes del coach
  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!coachId) {
        throw new Error("Coach ID no disponible. Por favor, inicia sesión.");
      }
      const res = await fetch(`http://127.0.0.1:8000/api/v1/users/coach/${coachId}/clients`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Error al cargar clientes');
      }
      const data = await res.json();
      setClients(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching clients:", err);
    } finally {
      setLoading(false);
    }
  }, [coachId, setClients]); // Dependencias: coachId y setClients

  useEffect(() => {
    fetchClients(); // Llama a la función al montar el componente o cuando cambie coachId
  }, [fetchClients]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Limpiar el formulario al cerrar
    setNewClientForm({ name: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    setNewClientForm({ ...newClientForm, [e.target.name]: e.target.value });
  };

  const handleCreateClient = async () => {
    setIsCreatingClient(true);
    setError(null);
    try {
      const clientData = {
        name: newClientForm.name,
        email: newClientForm.email,
        role: "client", // Role siempre es "client" para nuevos clientes
        coach_id: coachId, // El coach_id del coach que lo registra
        password: newClientForm.password,
      };

      const res = await fetch(`http://127.0.0.1:8000/api/v1/users/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Error al crear cliente');
      }

      // Cliente creado exitosamente
      alert('Cliente creado exitosamente!');
      handleCloseDialog(); // Cerrar el modal
      fetchClients(); // Refrescar la lista de clientes

    } catch (err) {
      setError(err.message);
      console.error("Error creating client:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsCreatingClient(false);
    }
  };

  return (
    <Container
      maxWidth="lg" // Usa un ancho más grande para acomodar las filas
      sx={{
        py: 4,
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative', // Para posicionar el Fab
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          color: theme.palette.text.primary,
          mb: 4,
          fontWeight: 600,
        }}
      >
        Lista de Clientes
      </Typography>

      {loading ? (
        <CircularProgress sx={{ color: theme.palette.primary.main }} />
      ) : error ? (
        <Typography variant="h6" color="error" sx={{ mt: 4 }}>
          {error}
        </Typography>
      ) : clients.length === 0 ? (
        <Typography
          variant="h6"
          sx={{ color: theme.palette.text.secondary, mt: 4 }}
        >
          No hay clientes registrados. ¡Crea uno nuevo!
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center"> {/* Usa Grid container */}
          {clients.map((cliente) => (
            <Grid item key={cliente._id} xs={12} sm={6} md={4} lg={3}> {/* Grid item para cada tarjeta */}
              <ClientCard cliente={cliente} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Botón flotante para crear nuevo cliente */}
      <Fab
        color="secondary" // Usa el color secundario del tema
        aria-label="add"
        sx={{
          position: 'fixed', // Fijo en la pantalla
          bottom: 24, // 24px desde abajo
          right: 24, // 24px desde la derecha
          zIndex: 1000, // Asegura que esté por encima de otros elementos
          backgroundColor: theme.palette.secondary.main, // Color de fondo del Fab
          '&:hover': {
            backgroundColor: theme.palette.secondary.light, // Tono más claro al pasar el ratón
          },
        }}
        onClick={handleOpenDialog}
      >
        <AddIcon />
      </Fab>

      {/* Diálogo/Modal para crear nuevo cliente */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.text.primary }}>
          Crear Nuevo Cliente
        </DialogTitle>
        <DialogContent sx={{ bgcolor: theme.palette.background.paper, pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nombre Completo"
            type="text"
            fullWidth
            variant="outlined"
            value={newClientForm.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
            InputProps={{ style: { color: theme.palette.text.primary } }}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={newClientForm.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
            InputProps={{ style: { color: theme.palette.text.primary } }}
          />
          <TextField
            margin="dense"
            name="password"
            label="Contraseña"
            type="password"
            fullWidth
            variant="outlined"
            value={newClientForm.password}
            onChange={handleChange}
            InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
            InputProps={{ style: { color: theme.palette.text.primary } }}
          />
        </DialogContent>
        <DialogActions sx={{ bgcolor: theme.palette.background.paper, pr: 2, pb: 2 }}>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={handleCreateClient}
            color="primary"
            variant="contained"
            disabled={isCreatingClient} // Deshabilita el botón mientras se crea el cliente
          >
            {isCreatingClient ? <CircularProgress size={24} /> : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ClientePage;