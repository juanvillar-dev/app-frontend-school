'use client';
import {
  Stack,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Divider,
  Select,
  MenuItem,
  Autocomplete,
} from '@mui/material';

export function NuevoSeccionForm({
  formData,
  gradosDisponibles,
  tutoresDisponibles,
  handleChange,
  handleSubmit,
  setFormData, // 👈 necesitamos también setFormData para actualizar tutorId
}: any) {
  return (
    <Stack spacing={3} sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4">Crear nueva sección</Typography>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent>
            <Typography variant="h6">Datos de la sección</Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              {/* INPUT: NOMBRE */}
              <TextField
                label="Nombre de la sección"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />

              {/* SELECT: GRADO */}
              <Select
                name="gradoId"
                value={formData.gradoId}
                onChange={handleChange}
                displayEmpty
                required
              >
                <MenuItem value="">
                  <em>Seleccionar grado</em>
                </MenuItem>
                {gradosDisponibles.map((g: any) => (
                  <MenuItem key={g.id} value={g.id}>
                    {g.nivel} - {g.year}
                  </MenuItem>
                ))}
              </Select>

              {/* AUTOCOMPLETE: TUTOR */}
              <Autocomplete
                options={tutoresDisponibles}
                getOptionLabel={(t: any) =>
                  `${t.usuario.nombre} ${t.usuario.apellido} (${t.especialidad})`
                }
                value={
                  tutoresDisponibles.find(
                    (t: any) => t.id === Number(formData.tutorId)
                  ) || null
                }
                onChange={(event, newValue) => {
                  setFormData({
                    ...formData,
                    tutorId: newValue ? newValue.id : '',
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Seleccionar tutor" required />
                )}
              />

              {/* INPUT: AÑO */}
              <TextField
                label="Año escolar"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </Stack>
          </CardContent>
        </Card>

        {/* BOTONES DE ACCIÓN */}
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button variant="outlined" color="error" href="/dashboard/secciones">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Crear sección
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
