"use client";

import { Autocomplete, Button, Card, CardContent, Divider, Stack, TextField, Typography } from "@mui/material";

export function EditarSeccionForm({ formData, tutoresDisponibles, handleChange, handleSubmit, setFormData }: any) {
	return (
		<Stack spacing={3} sx={{ maxWidth: 800, mx: "auto" }}>
			<Typography variant="h4">Editar sección</Typography>

			<form onSubmit={handleSubmit}>
				<Card>
					<CardContent>
						<Typography variant="h6">Datos de la sección</Typography>
						<Divider sx={{ mb: 2 }} />
						<Stack spacing={2}>
							{/* INPUT: NOMBRE */}
							<TextField
								label="Nombre de la sección"
								name="nombre"
								value={formData.nombre}
								onChange={handleChange}
								required
							/>

							{/* GRADO BLOQUEADO */}
							<TextField
								label="Grado"
								name="gradoId"
								value={formData.gradoId}
								disabled // 👈 bloqueado
							/>

							{/* AUTOCOMPLETE: TUTOR */}
							<Autocomplete
								options={tutoresDisponibles}
								getOptionLabel={(t: any) => `${t.usuario.nombre} ${t.usuario.apellido} (${t.especialidad})`}
								value={tutoresDisponibles.find((t: any) => t.id === Number(formData.tutorId)) || null}
								onChange={(event, newValue) => {
									setFormData({
										...formData,
										tutorId: newValue ? newValue.id : "",
									});
								}}
								renderInput={(params) => <TextField {...params} label="Seleccionar tutor" required />}
							/>

							{/* INPUT: AÑO */}
							<TextField
								label="Año escolar"
								name="year"
								type="number"
								value={formData.year}
								onChange={handleChange}
								required
							/>
						</Stack>
					</CardContent>
				</Card>

				{/* BOTONES DE ACCIÓN */}
				<Stack direction="row" spacing={2} sx={{ mt: 3 }}>
					<Button variant="outlined" color="error" href="/dashboard/secciones">
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
