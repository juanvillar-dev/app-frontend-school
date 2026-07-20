"use client";
import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import { AddHorariosForm } from "./AddHorariosForm";
import { HorarioTablero } from "./HorarioTablero";
import { useAddHorarios } from "./useAddHorarios";

export default function Page() {
  const {
    materias,
    docentes,
    horarios,
    formData,
    handleChange,
    addHorario,
    removeHorario,
    handleSubmit,
  } = useAddHorarios();

  // Datos de la sección (ejemplo, puedes traerlos del API)
  const seccion = {
    nombre: "Sección A - Actualizada",
    grado: "Inicial - 5 años",
    year: 2025,
    tutor: "María Flores",
    alumnos: 4,
  };

  const handleSaveAndRedirect = async () => {
    await handleSubmit(); // guarda horarios en backend
    window.location.href = '/dashboard/secciones';
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Panel superior */}
      <Card sx={{ mb: 3, boxShadow: 4, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
            {seccion.nombre}
          </Typography>

          {/* Fila horizontal con datos */}
          <Stack direction="row" spacing={4} alignItems="center" justifyContent="space-between">
            {/* Datos en columnas */}
            <Stack direction="row" spacing={4}>
              <Stack direction="row" spacing={1} alignItems="center">
                <SchoolIcon color="action" />
                <Typography>Grado: {seccion.grado}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <CalendarTodayIcon color="action" />
                <Typography>Año: {seccion.year}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <PersonIcon color="action" />
                <Typography>Tutor: {seccion.tutor}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <GroupIcon color="action" />
                <Typography>Alumnos: {seccion.alumnos}</Typography>
              </Stack>
            </Stack>

            {/* Botones a la derecha */}
            <Stack direction="row" spacing={2}>
              <AddHorariosForm
                materias={materias}
                docentes={docentes}
                formData={formData}
                handleChange={handleChange}
                addHorario={addHorario}
              />
              <Button variant="contained" color="success" onClick={handleSaveAndRedirect} >
                Guardar horarios
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Tablero de horarios */}
      <HorarioTablero horarios={horarios} removeHorario={removeHorario} />
    </Box>
  );
}
