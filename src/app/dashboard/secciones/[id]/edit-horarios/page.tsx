"use client";

import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useEditHorarios } from "./useEditarHorarios";
import { AddHorariosForm } from "../add-horarios/AddHorariosForm";
import { HorarioTablero } from "../add-horarios/HorarioTablero";


export default function Page() {
	const {
		materias,
		docentes, // 👈 aquí se cargan los docentes desde el hook
		horarios,
		formData,
		handleChange,
		addHorario,
		removeHorario,
		handleSubmit,
		seccion,
	} = useEditHorarios();

	if (!seccion) return <Typography>Cargando sección...</Typography>;

	return (
		<Box sx={{ p: 3 }}>
			{/* Panel superior */}
			<Card sx={{ mb: 3, boxShadow: 4, borderRadius: 2 }}>
				<CardContent>
					<Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
						{seccion.nombre}
					</Typography>

					<Stack direction="row" spacing={4} alignItems="center" justifyContent="space-between">
						<Stack direction="row" spacing={4}>
							<Stack direction="row" spacing={1} alignItems="center">
								<SchoolIcon color="action" />
								<Typography>
									Grado: {seccion.grado.nivel} - {seccion.grado.year}
								</Typography>
							</Stack>
							<Stack direction="row" spacing={1} alignItems="center">
								<CalendarTodayIcon color="action" />
								<Typography>Año: {seccion.year}</Typography>
							</Stack>
							<Stack direction="row" spacing={1} alignItems="center">
								<PersonIcon color="action" />
								<Typography>
									Tutor: {seccion.tutor.nombre} {seccion.tutor.apellido}
								</Typography>
							</Stack>
							<Stack direction="row" spacing={1} alignItems="center">
								<GroupIcon color="action" />
								<Typography>Alumnos: {seccion.alumnos.length}</Typography>
							</Stack>
						</Stack>

						<Stack direction="row" spacing={2}>
							{/* 👇 aquí se pasan los docentes al form */}
							<AddHorariosForm
								materias={materias}
								docentes={docentes}
								formData={formData}
								handleChange={handleChange}
								addHorario={addHorario}
							/>
							<Button variant="contained" color="success" onClick={handleSubmit}>
								Guardar horarios
							</Button>
						</Stack>
					</Stack>
				</CardContent>
			</Card>

			{/* Tablero */}
			<HorarioTablero horarios={horarios} removeHorario={removeHorario} />
		</Box>
	);
}
