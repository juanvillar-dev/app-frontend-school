"use client";

import { useEffect, useState } from "react";
import { apiGet, apiPost } from "@/routes/apiClient";
import { apiRoutes } from "@/routes/apiRoutes";

interface Seccion {
  id: number;
  nombre: string;
  gradoId: number;
  tutorId: number;
  year: number;
}

export function useNuevoSeccion() {
  const [formData, setFormData] = useState({
    nombre: "",
    gradoId: "",
    tutorId: "",
    year: new Date().getFullYear(),
  });

  const [gradosDisponibles, setGradosDisponibles] = useState<any[]>([]);
  const [tutoresDisponibles, setTutoresDisponibles] = useState<any[]>([]);

  useEffect(() => {
    // Cargar grados
    apiGet<any[]>(apiRoutes.grados.list)
      .then(setGradosDisponibles)
      .catch((err) => console.error("Error cargando grados:", err));

    // Cargar tutores
    apiGet<any[]>(apiRoutes.docentes.list)
      .then(setTutoresDisponibles)
      .catch((err) => console.error("Error cargando tutores:", err));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name!]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        nombre: formData.nombre,
        gradoId: Number(formData.gradoId),
        tutorId: Number(formData.tutorId),
        year: Number(formData.year),
      };

      const nuevaSeccion = await apiPost<Seccion>(
        apiRoutes.secciones.create,
        payload
      );

      alert("SECCIÓN CREADA CON ÉXITO");

      // Redirigir al paso 2 (asignar alumnos)
      window.location.href = `/dashboard/secciones/${nuevaSeccion.id}/add-alumnos`;
    } catch (err) {
      console.error(err);
      alert("ERROR AL CREAR SECCIÓN");
    }
  };

  return {
    formData,
    setFormData, // 👈 ahora lo exponemos para usarlo en Autocomplete
    gradosDisponibles,
    tutoresDisponibles,
    handleChange,
    handleSubmit,
  };
}
