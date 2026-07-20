"use client";

import React from "react";
import BookIcon from "@mui/icons-material/Book";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import {
	Box,
	Button,
	Card,
	CardContent,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";

import { useNotasSeccion } from "./useNotasSeccion";

export default function Page() {
	const { seccion, docenteNombre, materiaNombre, notas, loading, handleNotaChange, handleGuardar } = useNotasSeccion();

	if (loading) return <Typography>Cargando sección...</Typography>;
	if (!seccion) return <Typography>No se encontró la sección</Typography>;

	return (
		<Box sx={{ p: 3 }}>
			{/* Panel superior con íconos */}
			<Card sx={{ mb: 3, boxShadow: 4, borderRadius: 2 }}>
				<CardContent>
					<Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
						<SchoolIcon sx={{ mr: 1, verticalAlign: "middle" }} />
						{seccion.nombre} - {seccion.grado.nivel} ({seccion.grado.year})
					</Typography>

					<Stack direction="row" spacing={4} alignItems="center" flexWrap="wrap">
						<Stack direction="row" spacing={1} alignItems="center">
							<PersonIcon color="action" />
							<Typography variant="body2">
								Tutor: {seccion.tutor.nombre} {seccion.tutor.apellido}
							</Typography>
						</Stack>
						<Stack direction="row" spacing={1} alignItems="center">
							<PersonIcon color="primary" />
							<Typography variant="body2">Docente: {docenteNombre}</Typography>
						</Stack>
						<Stack direction="row" spacing={1} alignItems="center">
							<BookIcon color="secondary" />
							<Typography variant="body2">Materia: {materiaNombre}</Typography>
						</Stack>
						<Stack direction="row" spacing={1} alignItems="center">
							<GroupIcon color="success" />
							<Typography variant="body2">Alumnos: {seccion.alumnos.length}</Typography>
						</Stack>
					</Stack>
				</CardContent>
			</Card>

			{/* Tabla estilo Excel */}
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Alumno</TableCell>
						<TableCell>Promedio</TableCell>
						{[...Array(10)].map((_, i) => (
							<TableCell key={i}>N{i + 1}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{seccion.alumnos.map((alumno: any) => {
						const notasAlumno = notas[alumno.id] || [];
						const promedioNum =
							notasAlumno.length > 0 ? notasAlumno.reduce((a, b) => a + (b || 0), 0) / notasAlumno.length : null;

						const promedioColor =
							promedioNum === null ? "inherit" : promedioNum >= 14 ? "green" : promedioNum >= 11 ? "orange" : "red";

						return (
							<TableRow key={alumno.id}>
								<TableCell>
									{alumno.nombre} {alumno.apellido}
								</TableCell>
								<TableCell sx={{ color: promedioColor, fontWeight: "bold" }}>
									{promedioNum !== null ? promedioNum.toFixed(2) : "-"}
								</TableCell>
								{[...Array(10)].map((_, i) => (
									<TableCell key={i}>
										<TextField
											type="number"
											size="small"
											inputProps={{ min: 0, max: 20 }}
											value={notasAlumno[i] || ""}
											onChange={(e) => handleNotaChange(alumno.id, i, Number(e.target.value))}
										/>
									</TableCell>
								))}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>

			<Box sx={{ mt: 2 }}>
				<Button variant="contained" color="success" onClick={handleGuardar}>
					Guardar notas
				</Button>
			</Box>
		</Box>
	);
}
