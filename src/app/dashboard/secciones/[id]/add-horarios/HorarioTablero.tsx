"use client";

import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

const coloresAreas: Record<string, string> = {
	Matemáticas: "#5c8fdd",
	Comunicación: "#81674d",
	CienciasNaturales: "#329983",
	CienciasSociales: "#7c5ecf",
	Arte: "#fc0",
	Idiomas: "#e78978",
	default: "#757575",
};

function colorPorArea(areaNombre?: string) {
	return areaNombre ? coloresAreas[areaNombre.replace(" ","")] || coloresAreas.default : coloresAreas.default;
}

function generarHoras(inicio: number, fin: number) {
	const horas: string[] = [];
	for (let h = inicio; h <= fin; h++) {
		horas.push(`${h.toString().padStart(2, "0")}:00`);
	}
	return horas;
}

function diferenciaMinutos(inicio: string, fin: string) {
	const [h1, m1] = inicio.split(":").map(Number);
	const [h2, m2] = fin.split(":").map(Number);
	return h2 * 60 + m2 - (h1 * 60 + m1);
}

function offsetMinutos(inicio: string, bloque: string) {
	const [hBloque] = bloque.split(":").map(Number);
	const [hClase, mClase] = inicio.split(":").map(Number);
	return (hClase - hBloque) * 60 + mClase;
}

export function HorarioTablero({ horarios, removeHorario }: any) {
	const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
	const horas = generarHoras(8, 18);

	return (
		<Box sx={{ bgcolor: "white", p: 2, borderRadius: 2, boxShadow: 3 }}>
			<Grid container spacing={1}>
				{/* Cabecera */}
				<Grid size={2}>
					<Box sx={{ bgcolor: "#f5f5f5", p: 1, borderRadius: 1, display: "flex", justifyContent: "center" }}>
						<AccessTimeIcon fontSize="small" />
					</Box>
				</Grid>
				{dias.map((dia) => (
					<Grid size={2} key={dia}>
						<Box sx={{ bgcolor: "#f5f5f5", p: 1, borderRadius: 1 }}>
							<Typography variant="h6" align="center">
								{dia}
							</Typography>
						</Box>
					</Grid>
				))}

				{/* Filas */}
				{horas.map((hora) => (
					<React.Fragment key={hora}>
						{/* Columna de hora */}
						<Grid
							size={2}
							sx={{
								display: "flex",
								alignItems: "flex-start",
								justifyContent: "center",
								minHeight: 60,
								pt: 0.5,
							}}
						>
							<Typography sx={{ fontSize: 12, color: "grey.700", lineHeight: 1 }}>{hora}</Typography>
						</Grid>

						{/* Columnas por día */}
						{dias.map((dia) => {
							const clases = horarios.filter((h: any) => {
								if (h.diaSemana !== dia) return false;
								const [hClase] = h.horaInicio.split(":").map(Number);
								const [hBloque] = hora.split(":").map(Number);
								return hClase === hBloque;
							});

							return (
								<Grid
									size={2}
									key={`${dia}-${hora}`}
									sx={{ position: "relative", minHeight: 60, borderTop: "1px solid #eee" }}
								>
									{clases.map((h: any) => {
										const duracion = diferenciaMinutos(h.horaInicio, h.horaFin);
										const altura = (duracion / 60) * 60;
										const offset = offsetMinutos(h.horaInicio, hora);

										return (
											<Box
												key={h.id} // 👈 usamos el id único como key
												sx={{
													position: "absolute",
													top: (offset / 60) * 60,
													left: 4,
													right: 4,
													height: altura,
													zIndex: 10,
												}}
											>
												<Card
													sx={{
														height: "100%",
														bgcolor: colorPorArea(h.areaNombre || h.materiaNombre),
														color: "white",
														borderRadius: 1,
													}}
												>
													<CardContent sx={{ p: 1 }}>
														<Typography variant="subtitle2" fontWeight="bold">
															{h.materiaNombre}
														</Typography>
														<Typography variant="body2">{h.docenteNombre}</Typography>
														<Typography variant="caption">
															{h.horaInicio} - {h.horaFin}
														</Typography>
														<IconButton
															size="small"
															color="inherit"
															onClick={() => removeHorario(h.id)} // 👈 eliminamos por id
															sx={{ ml: 1 }}
														>
															<DeleteIcon fontSize="small" />
														</IconButton>
													</CardContent>
												</Card>
											</Box>
										);
									})}
								</Grid>
							);
						})}
					</React.Fragment>
				))}
			</Grid>
		</Box>
	);
}
