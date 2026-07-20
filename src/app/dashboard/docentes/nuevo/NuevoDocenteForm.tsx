'use client';
import {
  Stack,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from '@mui/material';

// ESTE COMPONENTE SOLO RENDERIZA EL FORMULARIO
// RECIBE EL ESTADO Y LAS FUNCIONES DESDE EL HOOK useNuevoDocente

export function NuevoDocenteForm({ formData, handleChangeUsuario, handleChangeRoot, handleReset, handleSubmit }: any) {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Stack spacing={3}>
        {/* TITULO PRINCIPAL */}
        <Typography variant="h4">Registrar nuevo docente</Typography>

        {/* FORMULARIO HTML */}
        <form onSubmit={handleSubmit}>
          
          {/* SECCIÓN DE DATOS PERSONALES */}
          <Card>
            <CardContent>
              <Typography variant="h6">Datos personales</Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                <TextField label="DNI" name="dni" value={formData.usuario.dni} onChange={handleChangeUsuario} required />
                <TextField label="Nombre" name="nombre" value={formData.usuario.nombre} onChange={handleChangeUsuario} required />
                <TextField label="Apellido" name="apellido" value={formData.usuario.apellido} onChange={handleChangeUsuario} required />
                <RadioGroup
                  row
                  name="genero"
                  value={formData.usuario.genero}
                  onChange={handleChangeUsuario}
                >
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
                <TextField label="Correo Electrónico" name="email" value={formData.usuario.email} onChange={handleChangeUsuario} required />
                <TextField label="Contraseña" name="passwordHash" type="password" value={formData.usuario.passwordHash} onChange={handleChangeUsuario} required />
                <TextField label="Rol" name="rol" value={formData.usuario.rol} disabled />
              </Stack>
            </CardContent>
          </Card>

          {/* BOTONES DE ACCIÓN */}
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button variant="outlined" color="secondary" onClick={handleReset}>
              Limpiar campos
            </Button>
            <Button variant="outlined" color="error" href="/dashboard/docentes">
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Guardar docente
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
