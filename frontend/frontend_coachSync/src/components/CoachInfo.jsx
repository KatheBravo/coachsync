import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

export default function CoachInfo({ coachId }) {
  return (
    <Paper elevation={3} sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h6">Coach ID: {coachId}</Typography>
      <Typography variant="body1" color="text.secondary" mt={1}>
        Información general del coach mostrada aquí.
      </Typography>
    </Paper>
  );
}