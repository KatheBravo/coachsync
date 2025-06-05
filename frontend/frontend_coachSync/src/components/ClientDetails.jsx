// src/components/ClientDetails.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

function ClientDetails() {
  const { id } = useParams(); // client_id from URL
  const [historial, setHistorial] = useState([]);
  const [progreso, setProgreso] = useState([]);
  const [activeTab, setActiveTab] = useState('historial'); // State to manage active tab (historial or progreso)

  // State for new training session data
  const [newHistorialEntry, setNewHistorialEntry] = useState({
    fecha_sesion: '',
    tipo_entrenamiento: '',
    duracion_minutos: '',
    descripcion: '',
    observaciones: '',
    cliente_id: id,
  });

  // State for new progress data
  const [newProgresoEntry, setNewProgresoEntry] = useState({
    fecha_registro: '',
    peso_kg: '',
    porcentaje_grasa: '',
    medidas_corporales: {
      pecho_cm: '',
      cintura_cm: '',
      cadera_cm: '',
      brazo_cm: '',
      pierna_cm: '',
    },
    notas_progreso: '',
    cliente_id: id,
  });

  useEffect(() => {
    // Fetch Historial de Entrenamientos
    const fetchHistorial = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/v1/historial_cliente/cliente/${id}`);
        if (!res.ok) throw new Error('Error al cargar historial de entrenamientos');
        const data = await res.json();
        setHistorial(data);
      } catch (error) {
        console.error("Error fetching historial:", error);
        alert(error.message);
      }
    };

    // Fetch Progreso del Cliente
    const fetchProgreso = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/v1/progreso_cliente/cliente/${id}`);
        if (!res.ok) throw new Error('Error al cargar progreso del cliente');
        const data = await res.json();
        setProgreso(data);
      } catch (error) {
        console.error("Error fetching progreso:", error);
        alert(error.message);
      }
    };

    if (id) {
      fetchHistorial();
      fetchProgreso();
    }
  }, [id]);

  const handleHistorialChange = (e) => {
    setNewHistorialEntry({ ...newHistorialEntry, [e.target.name]: e.target.value });
  };

  const handleProgresoChange = (e) => {
    if (e.target.name.includes('.')) { // Handle nested measures_corporales
      const [parent, child] = e.target.name.split('.');
      setNewProgresoEntry({
        ...newProgresoEntry,
        [parent]: {
          ...newProgresoEntry[parent],
          [child]: e.target.value,
        },
      });
    } else {
      setNewProgresoEntry({ ...newProgresoEntry, [e.target.name]: e.target.value });
    }
  };


  const handleAddHistorial = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/historial_cliente/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHistorialEntry),
      });

      if (!res.ok) throw new Error('Error al agregar historial de entrenamiento');
      const addedItem = await res.json();
      setHistorial([...historial, addedItem]);
      // Reset form
      setNewHistorialEntry({
        fecha_sesion: '',
        tipo_entrenamiento: '',
        duracion_minutos: '',
        descripcion: '',
        observaciones: '',
        cliente_id: id,
      });
    } catch (error) {
      console.error("Error adding historial:", error);
      alert(error.message);
    }
  };

  const handleAddProgreso = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/progreso_cliente/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProgresoEntry),
      });

      if (!res.ok) throw new Error('Error al agregar progreso del cliente');
      const addedItem = await res.json();
      setProgreso([...progreso, addedItem]);
      // Reset form
      setNewProgresoEntry({
        fecha_registro: '',
        peso_kg: '',
        porcentaje_grasa: '',
        medidas_corporales: {
          pecho_cm: '',
          cintura_cm: '',
          cadera_cm: '',
          brazo_cm: '',
          pierna_cm: '',
        },
        notas_progreso: '',
        cliente_id: id,
      });
    } catch (error) {
      console.error("Error adding progreso:", error);
      alert(error.message);
    }
  };


  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Detalles del Cliente ({id})
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Button onClick={() => setActiveTab('historial')} variant={activeTab === 'historial' ? 'contained' : 'outlined'} sx={{ mr: 1 }}>
            Historial de Entrenamientos
          </Button>
          <Button onClick={() => setActiveTab('progreso')} variant={activeTab === 'progreso' ? 'contained' : 'outlined'}>
            Progreso del Cliente
          </Button>
        </Box>

        {activeTab === 'historial' && (
          <Box>
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              Agregar Sesión de Entrenamiento
            </Typography>
            <Box
              component="form"
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Fecha Sesión (YYYY-MM-DDTHH:MM:SSZ)"
                name="fecha_sesion"
                value={newHistorialEntry.fecha_sesion}
                onChange={handleHistorialChange}
                fullWidth
              />
              <TextField
                label="Tipo de Entrenamiento"
                name="tipo_entrenamiento"
                value={newHistorialEntry.tipo_entrenamiento}
                onChange={handleHistorialChange}
                fullWidth
              />
              <TextField
                label="Duración (minutos)"
                name="duracion_minutos"
                type="number"
                value={newHistorialEntry.duracion_minutos}
                onChange={handleHistorialChange}
                fullWidth
              />
              <TextField
                label="Descripción"
                name="descripcion"
                value={newHistorialEntry.descripcion}
                onChange={handleHistorialChange}
                multiline
                rows={2}
                fullWidth
              />
              <TextField
                label="Observaciones"
                name="observaciones"
                value={newHistorialEntry.observaciones}
                onChange={handleHistorialChange}
                multiline
                rows={2}
                fullWidth
              />
              <Button variant="contained" color="primary" onClick={handleAddHistorial}>
                Agregar Entrenamiento
              </Button>
            </Box>

            <Typography variant="h6" sx={{ mb: 1 }}>
              Historial de Entrenamientos
            </Typography>
            {historial.length === 0 ? (
              <Typography>No hay historial de entrenamientos para este cliente.</Typography>
            ) : (
              <List>
                {historial.map((item) => (
                  <Paper key={item._id} elevation={1} sx={{ mb: 1, p: 2 }}>
                    <ListItem disablePadding>
                      <ListItemText
                        primary={`Fecha: ${new Date(item.fecha_sesion).toLocaleDateString()} - Tipo: ${item.tipo_entrenamiento} (${item.duracion_minutos} min)`}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.primary">
                              Descripción: {item.descripcion}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2" color="text.secondary">
                              Observaciones: {item.observaciones}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  </Paper>
                ))}
              </List>
            )}
          </Box>
        )}

        {activeTab === 'progreso' && (
          <Box>
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              Agregar Registro de Progreso
            </Typography>
            <Box
              component="form"
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Fecha Registro (YYYY-MM-DDTHH:MM:SSZ)"
                name="fecha_registro"
                value={newProgresoEntry.fecha_registro}
                onChange={handleProgresoChange}
                fullWidth
              />
              <TextField
                label="Peso (kg)"
                name="peso_kg"
                type="number"
                value={newProgresoEntry.peso_kg}
                onChange={handleProgresoChange}
                fullWidth
              />
              <TextField
                label="Porcentaje Grasa (%)"
                name="porcentaje_grasa"
                type="number"
                value={newProgresoEntry.porcentaje_grasa}
                onChange={handleProgresoChange}
                fullWidth
              />
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                Medidas Corporales (cm)
              </Typography>
              <TextField
                label="Pecho"
                name="medidas_corporales.pecho_cm"
                type="number"
                value={newProgresoEntry.medidas_corporales.pecho_cm}
                onChange={handleProgresoChange}
                fullWidth
              />
              <TextField
                label="Cintura"
                name="medidas_corporales.cintura_cm"
                type="number"
                value={newProgresoEntry.medidas_corporales.cintura_cm}
                onChange={handleProgresoChange}
                fullWidth
              />
              <TextField
                label="Cadera"
                name="medidas_corporales.cadera_cm"
                type="number"
                value={newProgresoEntry.medidas_corporales.cadera_cm}
                onChange={handleProgresoChange}
                fullWidth
              />
              <TextField
                label="Brazo"
                name="medidas_corporales.brazo_cm"
                type="number"
                value={newProgresoEntry.medidas_corporales.brazo_cm}
                onChange={handleProgresoChange}
                fullWidth
              />
              <TextField
                label="Pierna"
                name="medidas_corporales.pierna_cm"
                type="number"
                value={newProgresoEntry.medidas_corporales.pierna_cm}
                onChange={handleProgresoChange}
                fullWidth
              />
              <TextField
                label="Notas de Progreso"
                name="notas_progreso"
                value={newProgresoEntry.notas_progreso}
                onChange={handleProgresoChange}
                multiline
                rows={2}
                fullWidth
              />
              <Button variant="contained" color="primary" onClick={handleAddProgreso}>
                Agregar Progreso
              </Button>
            </Box>

            <Typography variant="h6" sx={{ mb: 1 }}>
              Progreso del Cliente
            </Typography>
            {progreso.length === 0 ? (
              <Typography>No hay registros de progreso para este cliente.</Typography>
            ) : (
              <List>
                {progreso.map((item) => (
                  <Paper key={item._id} elevation={1} sx={{ mb: 1, p: 2 }}>
                    <ListItem disablePadding>
                      <ListItemText
                        primary={`Fecha: ${new Date(item.fecha_registro).toLocaleDateString()} - Peso: ${item.peso_kg} kg - Grasa: ${item.porcentaje_grasa}%`}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.primary">
                              Medidas (cm): Pecho: {item.medidas_corporales.pecho_cm}, Cintura: {item.medidas_corporales.cintura_cm}, Cadera: {item.medidas_corporales.cadera_cm}, Brazo: {item.medidas_corporales.brazo_cm}, Pierna: {item.medidas_corporales.pierna_cm}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2" color="text.secondary">
                              Notas: {item.notas_progreso}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  </Paper>
                ))}
              </List>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default ClientDetails;