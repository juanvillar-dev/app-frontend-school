"use client";

import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	FormControlLabel,
	Radio,
	RadioGroup,
	Stack,
	TextField,
	Typography,
} from "@mui/material";

// ESTE COMPONENTE SOLO SE ENCARGA DE MOSTRAR EL FORMULARIO EN PANTALLA
// RECIBE COMO PROPS EL ESTADO (formData) Y LAS FUNCIONES (handleChangeUsuario, handleChangeRoot, handleSubmit)
// TODA LA LÓGICA ESTÁ EN EL HOOK useEditarDocente.ts

export function EditarDocenteForm({ formData, handleChangeUsuario, handleChangeRoot, handleSubmit }: any) {
	return (
		// BOX ES UN CONTENEDOR DE MATERIAL UI PARA DAR ESTILO (ANCHO MÁXIMO Y CENTRADO)
		<Box sx={{ maxWidth: 800, mx: "auto" }}>
			<Stack spacing={3}>
				{/* TITULO PRINCIPAL DEL FORMULARIO */}
				<Typography variant="h4">Editar docente</Typography>

				{/* FORMULARIO HTML QUE EJECUTA handleSubmit CUANDO SE PRESIONA GUARDAR */}
				<form onSubmit={handleSubmit}>
					{/* SECCIÓN DE DATOS PERSONALES */}
					<Card>
						<CardContent>
							<Typography variant="h6">Datos personales</Typography>
							<Divider sx={{ mb: 2 }} />
							<Stack spacing={2}>
								{/* CAMPO DNI */}
								<TextField
									label="DNI"
									name="dni"
									value={formData.usuario.dni}
									onChange={handleChangeUsuario}
									required
								/>

								{/* CAMPO NOMBRE */}
								<TextField
									label="Nombre"
									name="nombre"
									value={formData.usuario.nombre}
									onChange={handleChangeUsuario}
									required
								/>

								{/* CAMPO APELLIDO */}
								<TextField
									label="Apellido"
									name="apellido"
									value={formData.usuario.apellido}
									onChange={handleChangeUsuario}
									required
								/>

								{/* RADIO BUTTONS PARA SELECCIONAR EL GÉNERO */}
								<RadioGroup row name="genero" value={formData.usuario.genero} onChange={handleChangeUsuario}>
									<FormControlLabel value="M" control={<Radio />} label="Masculino" />
									<FormControlLabel value="F" control={<Radio />} label="Femenino" />
								</RadioGroup>
							</Stack>
						</CardContent>
					</Card>

					{/* SECCIÓN DE DATOS ACADÉMICOS */}
					<Card sx={{ mt: 3 }}>
						<CardContent>
							<Typography variant="h6">Datos académicos</Typography>
							<Divider sx={{ mb: 2 }} />
							<Stack spacing={2}>
								{/* CAMPO ESPECIALIDAD DEL DOCENTE */}
								<TextField
									label="Especialidad"
									name="especialidad"
									value={formData.especialidad}
									onChange={handleChangeRoot}
									required
								/>
							</Stack>
						</CardContent>
					</Card>

					{/* SECCIÓN DE DATOS DE USUARIO */}
					<Card sx={{ mt: 3 }}>
						<CardContent>
							<Typography variant="h6">Datos de usuario</Typography>
							<Divider sx={{ mb: 2 }} />
							<Stack spacing={2}>
								{/* CORREO ELECTRÓNICO */}
								<TextField
									label="Correo Electrónico"
									name="email"
									value={formData.usuario.email}
									onChange={handleChangeUsuario}
									required
								/>

								{/* CONTRASEÑA */}
								<TextField
									label="Contraseña"
									name="passwordHash"
									type="password"
									value={formData.usuario.passwordHash}
									onChange={handleChangeUsuario}
									required
								/>

								{/* ROL (DESHABILITADO PORQUE SIEMPRE ES DOCENTE) */}
								<TextField label="Rol" name="rol" value={formData.usuario.rol} disabled />
							</Stack>
						</CardContent>
					</Card>

					{/* BOTONES DE ACCIÓN */}
					<Stack direction="row" spacing={2} sx={{ mt: 3 }}>
						{/* BOTÓN CANCELAR → REDIRIGE A LA LISTA DE DOCENTES */}
						<Button variant="outlined" color="error" href="/dashboard/docentes">
							Cancelar
						</Button>

						{/* BOTÓN GUARDAR → EJECUTA handleSubmit */}
						<Button type="submit" variant="contained" color="primary">
							Guardar cambios
						</Button>
					</Stack>
				</form>
			</Stack>
		</Box>
	);
}
