"use client";
import React from "react";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

export function AddHorariosForm({ materias, docentes, formData, handleChange, addHorario }: any) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Agregar horario
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Agregar horario</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {/* Materia */}
            <Autocomplete
              options={materias}
              getOptionLabel={(m: any) => m.nombre}
              value={materias.find((m: any) => m.id === Number(formData.materiaId)) || null} // 👈 controlado
              onChange={(event, newValue) => {
                handleChange({ target: { name: "materiaId", value: newValue ? newValue.id : "" } });
              }}
              renderInput={(params) => <TextField {...params} label="Seleccionar materia" />}
            />

            {/* Docente */}
            <Autocomplete
              options={docentes}
              getOptionLabel={(d: any) => `${d.usuario.nombre} ${d.usuario.apellido}`}
              value={docentes.find((d: any) => d.id === Number(formData.docenteId)) || null} // 👈 controlado
              onChange={(event, newValue) => {
                handleChange({ target: { name: "docenteId", value: newValue ? newValue.id : "" } });
              }}
              renderInput={(params) => <TextField {...params} label="Seleccionar docente" />}
            />

            {/* Día de la semana */}
            <TextField
              select
              name="diaSemana"
              value={formData.diaSemana}
              onChange={handleChange}
              label="Día de la semana"
              required
            >
              {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((dia) => (
                <MenuItem key={dia} value={dia}>
                  {dia}
                </MenuItem>
              ))}
            </TextField>

            {/* Hora inicio */}
            <TextField
              name="horaInicio"
              type="time"
              value={formData.horaInicio}
              onChange={handleChange}
              required
            />

            {/* Hora fin */}
            <TextField
              name="horaFin"
              type="time"
              value={formData.horaFin}
              onChange={handleChange}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="error">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              addHorario();
              // 👇 opcional: cerrar el diálogo automáticamente
              setOpen(false);
            }}
            variant="outlined"
          >
            Añadir horario
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
