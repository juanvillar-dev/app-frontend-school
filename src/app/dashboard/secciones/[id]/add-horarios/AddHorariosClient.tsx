"use client";

import { Button, Stack } from "@mui/material";

import { AddHorariosForm } from "./AddHorariosForm";
import { HorarioTablero } from "./HorarioTablero";
import { useAddHorarios } from "./useAddHorarios";

export function AddHorariosClient() {
	const horariosHook = useAddHorarios();

	return (
		<Stack spacing={3}>
			{/* Botones arriba */}
			<Stack direction="row" spacing={2}>
				<AddHorariosForm {...horariosHook} />
				<Button variant="contained" color="primary" onClick={horariosHook.handleSubmit}>
					Guardar horarios
				</Button>
			</Stack>

			{/* Tablero */}
			<HorarioTablero horarios={horariosHook.horarios} removeHorario={horariosHook.removeHorario} />
		</Stack>
	);
}
