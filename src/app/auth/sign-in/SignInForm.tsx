"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Typography, Box } from "@mui/material";
import { apiGet } from "@/routes/apiClient";
import { apiRoutes } from "@/routes/apiRoutes";
import { useUser } from "@/contexts/user-context";

export function SignInForm() {
  const router = useRouter();
  const { login } = useUser(); // 👈 ahora usamos el contexto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const usuarios = await apiGet<any[]>(apiRoutes.asuarios.list);
      const usuario = usuarios.find(
        (u) => u.email === email && u.passwordHash === password
      );

      if (!usuario) {
        setError("Credenciales inválidas");
        return;
      }

      // Guardar en contexto y localStorage
      login(usuario);

      // Redirección según rol
      if (usuario.rol.toLowerCase() === "admin") {
        router.push("/dashboard/alumnos");
      } else if (usuario.rol.toLowerCase() === "docente") {
        router.push(`/dashboard/docentes/${usuario.id}/horarios`);
      } else {
        setError("Rol no reconocido");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
        ¡Hola! 👋
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Pon tus datos para ingresar a la plataforma
      </Typography>

      <TextField
        label="Correo"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Contraseña"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Entrar
      </Button>
    </Box>
  );
}
