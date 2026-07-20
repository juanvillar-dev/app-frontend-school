"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import {
	Autocomplete,
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	IconButton,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";

// Función para calcular edad y formatear con dos dígitos
function calcularEdad(fechaNacimiento: string): string {
	const nacimiento = new Date(fechaNacimiento);
	const hoy = new Date();
	let edad = hoy.getFullYear() - nacimiento.getFullYear();
	const m = hoy.getMonth() - nacimiento.getMonth();
	if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
		edad--;
	}
	return edad.toString().padStart(2, "0"); // siempre dos dígitos
}

export function AddAlumnosForm({
	alumnosDisponibles,
	alumnosSeleccionados,
	addAlumno,
	removeAlumno,
	handleSubmit,
}: any) {
	return (
		<Stack spacing={3} sx={{ maxWidth: 900, mx: "auto" }}>
			<Typography variant="h4">Asignar alumnos a la sección</Typography>

			<form onSubmit={handleSubmit}>
				{/* AUTOCOMPLETE PARA BUSCAR ALUMNOS */}
				<Card>
					<CardContent>
						<Typography variant="h6">Buscar y añadir alumnos</Typography>
						<Divider sx={{ mb: 2 }} />

						<Autocomplete
							options={alumnosDisponibles}
							getOptionLabel={(a: any) =>
								a.usuario
									? `(${a.usuario.dni}) - ${calcularEdad(a.fechaNacimiento)} años - ${a.usuario.nombre} ${a.usuario.apellido}`
									: "Alumno sin datos"
							}
							onChange={(event, newValue) => {
								if (newValue) addAlumno(newValue);
							}}
							renderInput={(params) => <TextField {...params} label="Seleccionar alumno" />}
							renderOption={(props, option: any) => (
								<li
									{...props}
									style={{
										minHeight: "48px", // 👈 aumenta la altura de cada opción
										display: "flex",
										alignItems: "center",
										color: "rgba(0,0,0,0.7)", // 👈 baja la intensidad del negro
									}}
								>
									<Box
										sx={{
											display: "inline-flex",
											alignItems: "center",
											justifyContent: "center",
											width: 28,
											height: 28,
											borderRadius: "50%",
											bgcolor: option.usuario?.genero === "M" ? "#1976d2" : "#e91e63",
											color: "white",
											mr: 1,
										}}
									>
										{option.usuario?.genero === "M" ? <MaleIcon fontSize="small" /> : <FemaleIcon fontSize="small" />}
									</Box>
									{`(${option.usuario?.dni}) - ${calcularEdad(option.fechaNacimiento)} años - ${option.usuario?.nombre} ${option.usuario?.apellido}`}
								</li>
							)}
						/>
					</CardContent>
				</Card>

				{/* TABLA DE ALUMNOS SELECCIONADOS */}
				<Card sx={{ mt: 3 }}>
					<CardContent>
						<Typography variant="h6">Alumnos seleccionados</Typography>
						<Divider sx={{ mb: 2 }} />

						<Table>
							<TableHead>
								<TableRow>
									<TableCell>DNI</TableCell>
									<TableCell>Nombre completo</TableCell>
									<TableCell>Edad</TableCell>
									<TableCell>Fecha de registro</TableCell>
									<TableCell align="right">Acciones</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{alumnosSeleccionados.map((alumno: any) => (
									<TableRow key={alumno.id}>
										<TableCell>{alumno.usuario?.dni}</TableCell>

										<TableCell>
											<Box
												sx={{
													display: "inline-flex",
													alignItems: "center",
													justifyContent: "center",
													width: 28,
													height: 28,
													borderRadius: "50%",
													bgcolor: alumno.usuario?.genero === "M" ? "#1976d2" : "#e91e63", // azul y rosa suaves
													color: "white",
													mr: 1,
												}}
											>
												{alumno.usuario?.genero === "M" ? (
													<MaleIcon fontSize="small" />
												) : (
													<FemaleIcon fontSize="small" />
												)}
											</Box>
											{alumno.usuario?.nombre} {alumno.usuario?.apellido}
										</TableCell>
										<TableCell>{calcularEdad(alumno.fechaNacimiento)} años</TableCell>
										<TableCell>{new Date(alumno.createdAt).toLocaleDateString()}</TableCell>
										<TableCell align="right">
											<IconButton onClick={() => removeAlumno(alumno.id)}>
												<DeleteIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				{/* BOTONES DE ACCIÓN */}
				<Stack direction="row" spacing={2} sx={{ mt: 3 }}>
					<Button variant="outlined" color="error" href="/dashboard/secciones">
						Cancelar
					</Button>
					<Button type="submit" variant="contained" color="primary">
						Asignar alumnos
					</Button>
				</Stack>
			</form>
		</Stack>
	);
}
