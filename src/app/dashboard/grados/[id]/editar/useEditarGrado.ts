"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiGet, apiPut } from "@/routes/apiClient";
import { apiRoutes } from "@/routes/apiRoutes";

export function useEditarGrado() {
	// OBTENEMOS EL ID DEL GRADO DESDE LA URL
	// Ejemplo: /dashboard/grados/1/editar → params.id = "1"
	const params = useParams();
	const gradoId = Array.isArray(params?.id) ? params.id[0] : params?.id;


    
	// ESTADO PRINCIPAL DEL FORMULARIO
	// Guardamos nivel, año y la lista de materias (objetos completos para mostrar en la UI)
	const [formData, setFormData] = useState({
		nivel: "",
		year: 0,
		materias: [] as any[],
	});



	// LISTA DE TODAS LAS MATERIAS DISPONIBLES (para el selector de agregar)
	const [materiasDisponibles, setMateriasDisponibles] = useState<any[]>([]);



	// EFECTO: CARGA INICIAL DEL GRADO Y DE TODAS LAS MATERIAS DISPONIBLES
	useEffect(() => {
		if (!gradoId) return;

		// CARGAMOS EL GRADO POR ID
		apiGet<any>(apiRoutes.grados.getById(String(gradoId)))
			.then((data) => {
				setFormData({
					nivel: data.nivel,
					year: data.year,
					materias: data.materias, // objetos completos (id, nombre, área)
				});
			})
			.catch((err) => console.error("Error cargando grado:", err));

		// CARGAMOS TODAS LAS MATERIAS DISPONIBLES
		apiGet<any[]>(apiRoutes.materias.list)
			.then(setMateriasDisponibles)
			.catch((err) => console.error("Error cargando materias:", err));
	}, [gradoId]);



	// FUNCIÓN PARA CAMBIAR CAMPOS BÁSICOS DEL GRADO (nivel, year)
	const handleChangeRoot = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};




	// FUNCIÓN PARA AGREGAR UNA MATERIA DESDE EL SELECT
	const addMateria = (materiaId: number) => {
		const materia = materiasDisponibles.find((m) => m.id === materiaId);
		if (!materia) return;
		// EVITAMOS DUPLICADOS
		if (formData.materias.some((m) => m.id === materia.id)) return;
		setFormData({ ...formData, materias: [...formData.materias, materia] });
	};




	// FUNCIÓN PARA ELIMINAR UNA MATERIA DE LA LISTA
	const removeMateria = (id: number) => {
		setFormData({
			...formData,
			materias: formData.materias.filter((m: any) => m.id !== id),
		});
	};




	// FUNCIÓN PARA ENVIAR EL FORMULARIO AL BACKEND
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			// ADAPTAMOS EL OBJETO AL DTO QUE ESPERA EL BACKEND
			const payload = {
				id: Number(gradoId), // ID del grado
				nivel: formData.nivel, // nivel (inicial, primaria, secundaria)
				year: Number(formData.year), // año
				materiasIds: formData.materias.map((m: any) => m.id), // SOLO IDS de materias
			};

			await apiPut(apiRoutes.grados.update(String(gradoId)), payload);
			alert("GRADO ACTUALIZADO CON ÉXITO");
			window.location.href = "/dashboard/grados";
		} catch (err) {
			console.error(err);
			alert("ERROR AL ACTUALIZAR GRADO");
		}
	};

	// RETORNAMOS TODO LO NECESARIO PARA EL FORMULARIO
	return {
		formData,
		materiasDisponibles,
		handleChangeRoot,
		addMateria,
		removeMateria,
		handleSubmit,
	};
}
