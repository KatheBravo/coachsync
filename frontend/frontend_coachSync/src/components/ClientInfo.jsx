// src/components/ClienteInfo.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material'; // Importa componentes de Material-UI

function ClienteInfo() {
  const { id } = useParams(); // Este 'id' es cliente_id
  const [ficha, setFicha] = useState(null); // Renombrado de 'cliente' a 'ficha' para mayor claridad
  const [editMode, setEditMode] = useState(false);
  // Inicializa el estado del formulario con todos los campos de la respuesta de la API
  const [form, setForm] = useState({
    _id: '', // Este será el ficha_id si existe
    cliente_id: id, // Asegura que cliente_id siempre esté presente
    edad: '',
    peso_actual_kg: '',
    altura_cm: '',
    condiciones_medicas: '',
    restricciones: '',
    preferencias_entrenamiento: '',
    objetivo: '',
    // fecha_registro no se incluye para edición/creación, solo para visualización si es necesario
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFicha = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/v1/ficha_cliente/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFicha(data);
          // Establece el formulario con los datos obtenidos. Asegura que los campos numéricos sean números.
          setForm({
            ...data,
            edad: data.edad || '', // Asegura que sea string para TextField, aunque sea numérico en la API
            peso_actual_kg: data.peso_actual_kg || '',
            altura_cm: data.altura_cm || '',
            // Retiene cliente_id de la URL si no está en los datos, útil para la creación de una nueva ficha
            cliente_id: data.cliente_id || id,
            // Asegura que _id de la ficha obtenida se use para futuras actualizaciones
            _id: data._id || ''
          });
        } else if (res.status === 404) {
          // Si no existe una ficha, configura el formulario solo con el cliente_id para su creación
          setFicha(null); // No existe una ficha
          setForm(prevForm => ({ ...prevForm, cliente_id: id }));
          console.log(`No se encontró ficha para el ID de cliente: ${id}. Listo para crear.`);
        } else {
          throw new Error(`Error al obtener ficha: ${res.statusText}`);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error obteniendo ficha:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFicha();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      // Convierte a número si el tipo es 'number', de lo contrario, usa el valor tal cual
      [name]: type === 'number' ? parseFloat(value) || '' : value
    }));
  };

  const handleSave = async () => {
    setError(null);
    try {
      // El endpoint es /api/v1/ficha_cliente/ para POST
      // Esto manejará tanto la creación (si _id no está presente en el formulario) como la actualización (si _id está presente)
      const res = await fetch(`http://127.0.0.1:8000/api/v1/ficha_cliente/`, {
        method: 'POST', // Asumiendo que POST maneja la lógica de "upsert" basada en la presencia de _id
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form), // Envía todo el objeto del formulario
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || `Error al guardar ficha: ${res.statusText}`);
      }

      const savedFicha = await res.json();
      setFicha(savedFicha); // Actualiza la ficha mostrada con la guardada
      setForm(savedFicha); // Actualiza el estado del formulario con los datos guardados (incluyendo el nuevo _id si se creó)
      setEditMode(false); // Sale del modo de edición
      alert('¡Ficha guardada exitosamente!');
    } catch (err) {
      setError(err.message);
      console.error("Error guardando ficha:", err);
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return <p>Cargando ficha del cliente...</p>;
  if (error) return <p>Error al cargar la ficha: {error}</p>;

  // Verifica si existe una ficha para decidir entre 'Crear' y 'Editar'
  const isExistingFicha = ficha && ficha._id;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Ficha del Cliente {id}
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
          {/* Cliente ID se muestra pero no es editable */}
          <TextField
            label="ID Cliente"
            value={form.cliente_id}
            fullWidth
            disabled
            InputLabelProps={{ shrink: true }} // Para que el label no se superponga con el valor
          />
          <TextField
            label="Edad"
            name="edad"
            type="number"
            value={form.edad}
            onChange={handleChange}
            fullWidth
            disabled={!editMode}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Peso Actual (kg)"
            name="peso_actual_kg"
            type="number"
            value={form.peso_actual_kg}
            onChange={handleChange}
            fullWidth
            disabled={!editMode}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Altura (cm)"
            name="altura_cm"
            type="number"
            value={form.altura_cm}
            onChange={handleChange}
            fullWidth
            disabled={!editMode}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Condiciones Médicas"
            name="condiciones_medicas"
            value={form.condiciones_medicas}
            onChange={handleChange}
            fullWidth
            disabled={!editMode}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Restricciones"
            name="restricciones"
            value={form.restricciones}
            onChange={handleChange}
            fullWidth
            disabled={!editMode}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Preferencias de Entrenamiento"
            name="preferencias_entrenamiento"
            value={form.preferencias_entrenamiento}
            onChange={handleChange}
            fullWidth
            disabled={!editMode}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Objetivo"
            name="objetivo"
            value={form.objetivo}
            onChange={handleChange}
            fullWidth
            disabled={!editMode}
            InputLabelProps={{ shrink: true }}
          />

          <Box sx={{ mt: 2 }}>
            {editMode ? (
              <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
                Guardar Ficha
              </Button>
            ) : (
              <Button variant="contained" color="secondary" onClick={() => setEditMode(true)} fullWidth>
                {isExistingFicha ? 'Editar Ficha' : 'Crear Ficha'}
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default ClienteInfo;