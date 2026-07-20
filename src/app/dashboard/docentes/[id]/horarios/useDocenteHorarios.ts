"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiGet } from "@/routes/apiClient";
import { apiRoutes } from "@/routes/apiRoutes";

export function useDocenteHorarios() {
	const params = useParams();
	const docenteId = Array.isArray(params?.id) ? params.id[0] : params?.id;
	const router = useRouter();

	const [horarios, setHorarios] = useState<any[]>([]);
	const [cursosUnicos, setCursosUnicos] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		apiGet<any[]>(apiRoutes.docentes.horarios(String(docenteId)))
			.then((data) => {
				// Transformar horarios para el tablero
				const horariosTransformados = data.map((h: any) => {
					const horaInicio = h.horaInicio.includes(" ") ? h.horaInicio.split(" ")[1].slice(0, 5) : h.horaInicio;
					const horaFin = h.horaFin.includes(" ") ? h.horaFin.split(" ")[1].slice(0, 5) : h.horaFin;

					return {
						id: h.id,
						materiaId: h.materia.id,
						docenteId,
						diaSemana: h.diaSemana,
						horaInicio,
						horaFin,
						materiaNombre: h.materia.nombre,
						docenteNombre: "Docente actual", // opcional
						areaNombre: h.materia.area || h.materia.nombre,
						seccionNombre: h.seccion.nombre,
						gradoInfo: `${h.seccion.grado.nivel} - ${h.seccion.grado.year}`,
						gradoId: h.seccion.grado.id, // 👈 aquí está el gradoId correcto
						seccionId: h.seccion.id,
					};
				});
				setHorarios(horariosTransformados);

				// Filtrar cursos únicos para el select
				const uniqueMap = new Map();
				horariosTransformados.forEach((h) => {
					const key = `${h.materiaId}-${h.gradoId}-${h.seccionId}`;
					if (!uniqueMap.has(key)) {
						uniqueMap.set(key, {
							materiaId: h.materiaId,
							materiaNombre: h.materiaNombre,
							gradoId: h.gradoId,
							seccionId: h.seccionId,
							seccionNombre: h.seccionNombre,
							gradoInfo: h.gradoInfo,
						});
					}
				});
				setCursosUnicos(Array.from(uniqueMap.values()));
			})
			.finally(() => setLoading(false));
	}, [docenteId]);

	const handleSelectCurso = (curso: any) => {
		router.push(
			`/dashboard/docentes/${docenteId}/materia/${curso.materiaId}/seccion/${curso.seccionId}/grado/${curso.gradoId}`
		);
	};

	return { horarios, cursosUnicos, loading, handleSelectCurso };
}
