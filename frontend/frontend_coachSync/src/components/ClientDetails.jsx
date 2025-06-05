import { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
};

const ClientDetails = ({ client }) => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={tab} onChange={handleTabChange} centered>
        <Tab label="Ficha" />
        <Tab label="Historial" />
        <Tab label="Progreso" />
      </Tabs>

      <TabPanel value={tab} index={0}>
        <Typography variant="h6">Datos Personales</Typography>
        <Typography>Nombre: {client.name}</Typography>
        <Typography>Edad: {client.age}</Typography>
        <Typography>Correo: {client.email}</Typography>
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <Typography variant="h6">Historial</Typography>
        <Typography>Aquí se mostrarán citas o sesiones anteriores.</Typography>
      </TabPanel>

      <TabPanel value={tab} index={2}>
        <Typography variant="h6">Progreso</Typography>
        <Typography>Aquí se mostrarán gráficos o indicadores.</Typography>
      </TabPanel>
    </Box>
  );
};

export default ClientDetails;
