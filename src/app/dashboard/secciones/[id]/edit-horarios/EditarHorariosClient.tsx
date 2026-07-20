"use client";
import { Button, Stack } from "@mui/material";
import { useEditHorarios } from "./useEditarHorarios";
import { AddHorariosForm } from "../add-horarios/AddHorariosForm";
import { HorarioTablero } from "../add-horarios/HorarioTablero";

export function EditHorariosClient() {
  const horariosHook = useEditHorarios();

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2}>
        <AddHorariosForm {...horariosHook} />
        <Button variant="contained" color="success" onClick={horariosHook.handleSubmit}>
          Guardar horarios
        </Button>
      </Stack>

      <HorarioTablero horarios={horariosHook.horarios} removeHorario={horariosHook.removeHorario} />
    </Stack>
  );
}
