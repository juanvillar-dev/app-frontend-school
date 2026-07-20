'use client';
import * as React from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DownloadIcon, PlusIcon, UploadIcon } from "@phosphor-icons/react/dist/ssr";

import { DocentesFilters } from "@/components/dashboard/docentes/docentes-filter";
import { DocentesTable } from "@/components/dashboard/docentes/docentes-table";
import { useDocentes } from './useDocentes';





export function DocentesClient(): React.JSX.Element {
  const docentesState = useDocentes();
  return <DocentesLayout {...docentesState} />;
}




function DocentesLayout({
	docentes,
	loading,
	page,
	rowsPerPage,
	setPage,
	setRowsPerPage,
	paginatedDocentes,
	searchTerm,       	//	FILTRO DE BUSQUEDA
	setSearchTerm,    	//	FILTRO DE BUSQUEDA
}: any) {
	return (
		<Stack spacing={3}>
			<Stack direction="row" spacing={3}>
                {/* Título y botones de acción */}
				<Stack spacing={1} sx={{ flex: "1 1 auto" }}>
					<Typography variant="h4">Docentes</Typography>
					<Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
						<Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
							Importar
						</Button>
						<Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
							Exportar
						</Button>
					</Stack>
				</Stack>

                {/* Botón para añadir un nuevo docente */}
				<div>
					<Button
						component={Link}
						href="/dashboard/docentes/nuevo"
						startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
						variant="contained"
					>
						Añadir
					</Button>
				</div>
			</Stack>

			{/* FILTRO DE DOCENTES CON FUNCIONALIDAD */}
			<DocentesFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

			
            {/* Render de la tabla de docentes*/}
            {loading ? (
				<Typography>Cargando docentes...</Typography>
			) : (
				<DocentesTable
					count={docentes.length}
					page={page}
					rows={paginatedDocentes}
					rowsPerPage={rowsPerPage}
					onPageChange={(event, newPage) => setPage(newPage)}
					onRowsPerPageChange={(event) => {
						setRowsPerPage(parseInt(event.target.value, 10));
						setPage(0);
					}}
				/>
			)}
		</Stack>
	);
}
