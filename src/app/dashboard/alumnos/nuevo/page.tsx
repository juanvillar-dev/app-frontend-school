'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
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
  MenuItem,
  Box,
} from '@mui/material';

export default function NuevoAlumnoPage(): React.JSX.Element {
  const [formData, setFormData] = useState({
    fechaNacimiento: '',
    usuario: {
      dni: '',
      nombre: '',
      apellido: '',
      email: '',
      passwordHash: '',
      rol: 'ALUMNO', // 👈 en mayúsculas
      genero: '',
    },
    gradoId: 0,
  });

  const [grados, setGrados] = useState<any[]>([]);

  // 🔹 Cargar grados desde la API
  useEffect(() => {
    fetch('http://localhost:8080/api/grados')
      .then((res) => res.json())
      .then((data) => setGrados(data))
      .catch((err) => console.error('Error cargando grados:', err));
  }, []);

  const handleChangeUsuario = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      usuario: { ...formData.usuario, [e.target.name]: e.target.value },
    });
  };

  const handleChangeRoot = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeGrado = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      gradoId: parseInt(e.target.value, 10),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Objeto enviado:", formData); // 👈 ver en consola
    try {
      const res = await fetch('http://localhost:8080/api/alumnos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert('Alumno registrado con éxito');
        window.location.href = '/dashboard/alumnos';
      } else {
        alert('Error al registrar alumno');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión');
    }
  };

  const handleReset = () => {
    setFormData({
      fechaNacimiento: '',
      usuario: {
        dni: '',
        nombre: '',
        apellido: '',
        email: '',
        passwordHash: '',
        rol: 'ALUMNO',
        genero: '',
      },
      gradoId: 0,
    });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Stack spacing={3}>
        <Typography variant="h4">Registrar nuevo alumno</Typography>
        <form onSubmit={handleSubmit}>
          {/* Datos personales */}
          <Card>
            <CardContent>
              <Typography variant="h6">Datos personales</Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                <TextField label="DNI" name="dni" value={formData.usuario.dni} onChange={handleChangeUsuario} required />
                <TextField label="Nombre" name="nombre" value={formData.usuario.nombre} onChange={handleChangeUsuario} required />
                <TextField label="Apellido" name="apellido" value={formData.usuario.apellido} onChange={handleChangeUsuario} required />
                <TextField
                  label="Fecha de Nacimiento"
                  name="fechaNacimiento"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.fechaNacimiento}
                  onChange={handleChangeRoot}
                  required
                />
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

          {/* Datos académicos */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6">Datos académicos</Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                <TextField
                  select
                  label="Grado"
                  name="gradoId"
                  value={formData.gradoId}
                  onChange={handleChangeGrado}
                  required
                >
                  {grados.map((grado) => (
                    <MenuItem key={grado.id} value={grado.id}>
                      {grado.nivel} ({grado.year})
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </CardContent>
          </Card>

          {/* Datos de usuario */}
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

          {/* Botones */}
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button variant="outlined" color="secondary" onClick={handleReset}>
              Limpiar campos
            </Button>
            <Button variant="outlined" color="error" href="/dashboard/alumnos">
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Guardar alumno
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
