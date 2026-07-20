"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiGet, apiPut } from "@/routes/apiClient"; // 👈 usamos PUT para editar
import { apiRoutes } from "@/routes/apiRoutes";

export function useEditarSeccion() {
	const params = useParams();
	const seccionId = Array.isArray(params?.id) ? params.id[0] : params?.id;

	const [formData, setFormData] = useState({
		nombre: "",
		gradoId: "", // bloqueado
		tutorId: "",
		year: new Date().getFullYear(),
	});

	const [tutoresDisponibles, setTutoresDisponibles] = useState<any[]>([]);

	useEffect(() => {
		// Cargar datos de la sección
		apiGet<any>(`${apiRoutes.secciones.list}/${seccionId}`)
			.then((seccion) => {
				setFormData({
					nombre: seccion.nombre,
					gradoId: seccion.grado.id, // bloqueado
					tutorId: seccion.tutor.id,
					year: seccion.year,
				});
			})
			.catch((err) => console.error("Error cargando sección:", err));

		// Cargar tutores
		apiGet<any[]>(apiRoutes.docentes.list)
			.then(setTutoresDisponibles)
			.catch((err) => console.error("Error cargando tutores:", err));
	}, []);

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const payload = {
				nombre: formData.nombre,
				gradoId: Number(formData.gradoId), // 👈 incluir aunque no se edite
				tutorId: Number(formData.tutorId),
				year: Number(formData.year),
			};

			await apiPut(apiRoutes.secciones.update(String(seccionId)), payload);

			alert("SECCIÓN EDITADA CON ÉXITO");

			// Redirigir directo al paso 3 (editar horarios)
			window.location.href = `/dashboard/secciones/${seccionId}/edit-horarios`;
		} catch (err) {
			console.error(err);
			alert("ERROR AL EDITAR SECCIÓN");
		}
	};

	return { formData, setFormData, tutoresDisponibles, handleChange, handleSubmit };
}
