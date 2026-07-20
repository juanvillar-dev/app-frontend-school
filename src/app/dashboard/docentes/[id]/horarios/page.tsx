"use client";
import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import { useDocenteHorarios } from "./useDocenteHorarios";
import { HorarioDocenteTablero } from "./HorarioTablero";

export default function Page() {
  const { horarios, cursosUnicos, loading, handleSelectCurso } = useDocenteHorarios();

  if (loading) return <Typography>Cargando horarios...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      {/* Panel superior con datos del docente */}
      <Card sx={{ mb: 3, boxShadow: 4, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
            Horarios del docente
          </Typography>

          <Stack direction="row" spacing={4} alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <SchoolIcon color="action" />
              <Typography>Especialidad: Matemáticas</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <PersonIcon color="action" />
              <Typography>DNI: 72839177</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <EmailIcon color="action" />
              <Typography>Email: juan.castillo1@correo.com</Typography>
            </Stack>
          </Stack>

          {/* Select de cursos únicos */}
          <Box sx={{ mt: 2 }}>
            <TextField select fullWidth label="Cursos y secciones que dicta">
              {cursosUnicos.map((curso) => (
                <MenuItem
                  key={`${curso.materiaId}-${curso.gradoId}-${curso.seccionId}`}
                  value={curso.materiaId}
                  onClick={() => handleSelectCurso(curso)}
                >
                  {curso.materiaNombre} - {curso.seccionNombre} ({curso.gradoInfo})
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </CardContent>
      </Card>

      {/* Tablero de horarios */}
      <HorarioDocenteTablero horarios={horarios} />
    </Box>
  );
}
