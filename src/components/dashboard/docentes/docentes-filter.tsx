"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";

// ESTE COMPONENTE RECIBE EL VALOR DE BUSQUEDA (searchTerm) Y LA FUNCIÓN PARA ACTUALIZARLO (setSearchTerm)
export function DocentesFilters({
	searchTerm,
	setSearchTerm,
}: {
	searchTerm: string;
	setSearchTerm: (val: string) => void;
}): React.JSX.Element {
	return (
		<Card sx={{ p: 2 }}>
			<OutlinedInput
				value={searchTerm} // VALOR ACTUAL DEL INPUT
				onChange={(e) => setSearchTerm(e.target.value)} // ACTUALIZA EL ESTADO AL ESCRIBIR
				fullWidth
				placeholder="Buscar docente por nombre, email, DNI o especialidad"
				startAdornment={
					<InputAdornment position="start">
						<MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
					</InputAdornment>
				}
				sx={{ maxWidth: "500px" }}
			/>
		</Card>
	);
}
