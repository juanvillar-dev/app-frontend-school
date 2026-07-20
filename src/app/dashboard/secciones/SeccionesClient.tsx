"use client";

import Link from "next/link";
import { Button, Stack, Typography } from "@mui/material";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";

import { useSecciones } from "./useSecciones";
import { SeccionesTable } from "@/components/dashboard/secciones/seccion-table";
import { SeccionesFilters } from "@/components/dashboard/secciones/seccion-filter";

export function SeccionesClient(): React.JSX.Element {
	const seccionesState = useSecciones();

	return (
		<Stack spacing={3}>
			{/* HEADER */}
			<Stack direction="row" spacing={3}>
				<Stack spacing={1} sx={{ flex: "1 1 auto" }}>
					<Typography variant="h4">Secciones</Typography>
				</Stack>
				<div>
					<Button
						component={Link}
						href="/dashboard/secciones/nuevo"
						startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
						variant="contained"
					>
						Añadir
					</Button>
				</div>
			</Stack>

			{/* FILTRO */}
			<SeccionesFilters searchTerm={seccionesState.searchTerm} setSearchTerm={seccionesState.setSearchTerm} />

			{/* TABLA */}
			{seccionesState.loading ? (
				<Typography>Cargando secciones...</Typography>
			) : (
				<SeccionesTable
					count={seccionesState.secciones.length}
					page={seccionesState.page}
					rows={seccionesState.paginatedSecciones}
					rowsPerPage={seccionesState.rowsPerPage}
					onPageChange={(event, newPage) => seccionesState.setPage(newPage)}
					onRowsPerPageChange={(event) => {
						seccionesState.setRowsPerPage(parseInt(event.target.value, 10));
						seccionesState.setPage(0);
					}}
				/>
			)}
		</Stack>
	);
}
