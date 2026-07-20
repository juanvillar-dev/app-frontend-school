"use client";

import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete"; // Ícono de papelera para eliminar materias
import {
	Button,
	Card,
	CardContent,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemText,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";

export function EditarGradoForm({
	formData, // Datos actuales del grado (nivel, año, materias asignadas)
	materiasDisponibles, // Lista de materias que se pueden agregar (traídas del backend)
	handleChangeRoot, // Función para actualizar nivel y año
	addMateria, // Función para agregar una materia seleccionada
	removeMateria, // Función para eliminar una materia de la lista
	handleSubmit, // Función para enviar el formulario al backend
}: any) {
	// Estado local para guardar la materia seleccionada en el <Select>
	const [materiaSeleccionada, setMateriaSeleccionada] = useState("");

	return (
		<Stack spacing={3} sx={{ maxWidth: 800, mx: "auto" }}>
			{/* TÍTULO PRINCIPAL */}
			<Typography variant="h4">Editar grado</Typography>

			{/* FORMULARIO PRINCIPAL */}
			<form onSubmit={handleSubmit}>
				{/* SECCIÓN: DATOS DEL GRADO */}
				<Card>
					<CardContent>
						<Typography variant="h6">Datos del grado</Typography>
						<Divider sx={{ mb: 2 }} />
						<Stack spacing={2}>
							{/* INPUT: NIVEL */}
							<TextField label="Nivel" name="nivel" value={formData.nivel} onChange={handleChangeRoot} required />
							{/* INPUT: AÑO */}
							<TextField
								label="Año"
								name="year"
								type="number"
								value={formData.year}
								onChange={handleChangeRoot}
								required
							/>
						</Stack>
					</CardContent>
				</Card>

				{/* SECCIÓN: MATERIAS ASIGNADAS */}
				<Card sx={{ mt: 3 }}>
					<CardContent>
						<Typography variant="h6">Materias asignadas</Typography>
						<Divider sx={{ mb: 2 }} />

						{/* LISTA DE MATERIAS YA ASIGNADAS */}
						<List>
							{formData.materias.map((materia: any) => (
								<ListItem
									key={materia.id}
									secondaryAction={
										// BOTÓN DE ELIMINAR MATERIA
										<IconButton edge="end" onClick={() => removeMateria(materia.id)}>
											<DeleteIcon />
										</IconButton>
									}
								>
									{/* MOSTRAMOS NOMBRE Y ÁREA DE LA MATERIA */}
									<ListItemText primary={materia.nombre} secondary={`Área: ${materia.area.nombre}`} />
								</ListItem>
							))}
						</List>

						{/* SELECT PARA AGREGAR NUEVA MATERIA */}
						<Stack direction="row" spacing={2} sx={{ mt: 2 }}>
							<Select
								value={materiaSeleccionada}
								onChange={(e) => setMateriaSeleccionada(e.target.value)}
								displayEmpty
								sx={{ minWidth: 250 }}
							>
								<MenuItem value="">
									<em>Seleccionar materia</em>
								</MenuItem>
								{materiasDisponibles.map((m: any) => (
									<MenuItem key={m.id} value={m.id}>
										{m.nombre} ({m.area.nombre})
									</MenuItem>
								))}
							</Select>
							{/* BOTÓN PARA AGREGAR LA MATERIA SELECCIONADA */}
							<Button
								variant="outlined"
								color="primary"
								onClick={() => {
									if (materiaSeleccionada) {
										addMateria(Number(materiaSeleccionada));
										setMateriaSeleccionada(""); // RESETEAMOS EL SELECT
									}
								}}
							>
								➕ Agregar
							</Button>
						</Stack>
					</CardContent>
				</Card>

				{/* BOTONES DE ACCIÓN */}
				<Stack direction="row" spacing={2} sx={{ mt: 3 }}>
					<Button variant="outlined" color="error" href="/dashboard/grados">
						Cancelar
					</Button>
					<Button type="submit" variant="contained" color="primary">
						Guardar cambios
					</Button>
				</Stack>
			</form>
		</Stack>
	);
}
