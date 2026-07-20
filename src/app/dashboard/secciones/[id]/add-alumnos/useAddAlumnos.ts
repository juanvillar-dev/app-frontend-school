"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiGet, apiPost } from "@/routes/apiClient";
import { apiRoutes } from "@/routes/apiRoutes";

export function useAddAlumnos() {
	const params = useParams();
	const seccionId = Array.isArray(params?.id) ? params.id[0] : params?.id;

	const [alumnosDisponibles, setAlumnosDisponibles] = useState<any[]>([]);
	const [alumnosSeleccionados, setAlumnosSeleccionados] = useState<any[]>([]);

	useEffect(() => {
		// Cargar todos los alumnos
		apiGet<any[]>(apiRoutes.alumnos.list)
			.then(setAlumnosDisponibles)
			.catch((err) => console.error("Error cargando alumnos:", err));
	}, []);

	const addAlumno = (alumno: any) => {
		if (alumnosSeleccionados.some((a) => a.id === alumno.id)) return;
		setAlumnosSeleccionados([...alumnosSeleccionados, alumno]);
	};

	const removeAlumno = (id: number) => {
		setAlumnosSeleccionados(alumnosSeleccionados.filter((a) => a.id !== id));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const payload = {
				seccionId: Number(seccionId),
				alumnosIds: alumnosSeleccionados.map((a) => a.id),
			};

			await apiPost(apiRoutes.secciones.addAlumnos, payload);
			alert("ALUMNOS ASIGNADOS CON ÉXITO");

			// Redirigir al paso 3 (horarios)
			window.location.href = `/dashboard/secciones/${seccionId}/add-horarios`;
		} catch (err) {
			console.error(err);
			alert("ERROR AL ASIGNAR ALUMNOS");
		}
	};

	return {
		alumnosDisponibles,
		alumnosSeleccionados,
		addAlumno,
		removeAlumno,
		handleSubmit,
	};
}
