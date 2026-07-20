"use client";
import React from "react";
import { Typography, Box, Card, CardContent } from "@mui/material";
import { useDocenteHorarios } from "./useDocenteHorarios";
import { HorarioDocenteTablero } from "./HorarioTablero";

export default function DocenteHorarioClient() {
  const { horarios, loading } = useDocenteHorarios();

  if (loading) return <Typography>Cargando horarios...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ mb: 3, boxShadow: 4, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
            Horarios del docente
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Secciones en las que dicta clases
          </Typography>
        </CardContent>
      </Card>

      {/* 👇 El tablero se muestra siempre */}
      <HorarioDocenteTablero horarios={horarios} />
    </Box>
  );
}
