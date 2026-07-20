"use client";

import * as React from "react";
import Link from "next/link";
import {
	Box,
	Button,
	Card,
	Checkbox,
	Chip,
	Divider,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";

interface Seccion {
	id: number;
	nombre: string;
	grado: {
		id: number;
		nivel: string;
		year: number;
		materias: any[];
	};
	tutor: {
		id: number;
		usuario: {
			nombre: string;
			apellido: string;
		};
	};
	year: number;
	activo: boolean;
	numeroAlumnos: number;
}

interface SeccionesTableProps {
	count?: number;
	page?: number;
	rows?: Seccion[];
	rowsPerPage?: number;
	onPageChange?: (event: unknown, newPage: number) => void;
	onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SeccionesTable({
	count = 0,
	rows = [],
	page = 0,
	rowsPerPage = 0,
	onPageChange,
	onRowsPerPageChange,
}: SeccionesTableProps): React.JSX.Element {
	return (
		<Card>
			<Box sx={{ overflowX: "auto" }}>
				<Table sx={{ minWidth: "900px" }}>
					<TableHead>
						<TableRow>
							<TableCell padding="checkbox">
								<Checkbox />
							</TableCell>
							<TableCell>Nivel</TableCell>
							<TableCell>Nombre</TableCell>
							<TableCell>Año escolar</TableCell>
							<TableCell>Tutor</TableCell>
							<TableCell>Estado</TableCell>
							<TableCell>Alumnos</TableCell>
							<TableCell align="right">Acciones</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow hover key={row.id}>
								<TableCell padding="checkbox">
									<Checkbox />
								</TableCell>
								<TableCell>
									<Chip
										label={row.grado.nivel.toUpperCase()}
										color={
											row.grado.nivel === "inicial" ? "primary" : row.grado.nivel === "primaria" ? "success" : "warning"
										}
									/>
								</TableCell>
								<TableCell>
									<Typography variant="subtitle1">{row.nombre}</Typography>
								</TableCell>
								<TableCell>
									<Typography variant="body2">{row.grado.year}</Typography>
								</TableCell>
								<TableCell>
									<Typography variant="body2">
										{row.tutor?.usuario?.nombre} {row.tutor?.usuario?.apellido}
									</Typography>
								</TableCell>
								<TableCell>
									<Chip label={row.activo ? "Activo" : "Inactivo"} color={row.activo ? "success" : "error"} />
								</TableCell>
								<TableCell>
									<Chip label={`${row.numeroAlumnos} alumnos`} color={row.numeroAlumnos > 0 ? "info" : "default"} />
								</TableCell>
								<TableCell align="right">
									<Stack direction="row" spacing={1} justifyContent="flex-end">
										<Button component={Link} href={`/dashboard/secciones/${row.id}`} variant="outlined" size="small">
											👁 Ver
										</Button>
										<Button
											component={Link}
											href={`/dashboard/secciones/${row.id}/editar`}
											variant="contained"
											size="small"
											color="secondary"
										>
											✏️ Editar
										</Button>
									</Stack>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Box>
			<Divider />
			<TablePagination
				component="div"
				count={count}
				page={page}
				rowsPerPage={rowsPerPage}
				onPageChange={onPageChange!}
				onRowsPerPageChange={onRowsPerPageChange}
				rowsPerPageOptions={[5, 10, 15]}
			/>
		</Card>
	);
}
