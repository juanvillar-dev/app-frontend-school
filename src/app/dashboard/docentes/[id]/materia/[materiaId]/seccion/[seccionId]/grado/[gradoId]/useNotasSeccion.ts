"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiGet, apiPost } from "@/routes/apiClient";
import { apiRoutes } from "@/routes/apiRoutes";

export function useNotasSeccion() {
	const params = useParams();
	const seccionId = Array.isArray(params?.seccionId) ? params.seccionId[0] : params?.seccionId;
	const materiaId = Array.isArray(params?.materiaId) ? params.materiaId[0] : params?.materiaId;
	const docenteId = Array.isArray(params?.docenteId) ? params.docenteId[0] : params?.id;

	const [seccion, setSeccion] = useState<any>(null);
	const [materiaNombre, setMateriaNombre] = useState<string>("");
	const [docenteNombre, setDocenteNombre] = useState<string>("");
	const [notas, setNotas] = useState<Record<number, number[]>>({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			// Obtener sección
			const data = await apiGet<any>(apiRoutes.secciones.getById(String(seccionId)));
			setSeccion(data);

			// Buscar materia en el grado
			const materia = data.grado.materias.find((m: any) => m.id === Number(materiaId));
			if (materia) setMateriaNombre(materia.nombre);

			// Inicializar notas vacías
			const inicial: Record<number, number[]> = {};
			data.alumnos.forEach((a: any) => {
				inicial[a.id] = [];
			});
			setNotas(inicial);

			// Obtener docente
			const docente = await apiGet<any>(apiRoutes.docentes.getById(String(docenteId)));
			setDocenteNombre(`${docente.usuario.nombre} ${docente.usuario.apellido}`);
		}

		fetchData().finally(() => setLoading(false));
	}, [seccionId, materiaId, docenteId]);

	const handleNotaChange = (idAlumno: number, index: number, value: number) => {
		setNotas((prev) => {
			const copia = { ...prev };
			const arr = copia[idAlumno] ? [...copia[idAlumno]] : [];
			arr[index] = value;
			copia[idAlumno] = arr;
			return copia;
		});
	};

	const handleGuardar = async () => {
		const payload = {
			materiaId: Number(materiaId),
			gradoId: seccion.grado.id,
			alumnos: Object.entries(notas).map(([idAlumno, notasArr]) => ({
				idAlumno: Number(idAlumno),
				notas: notasArr.filter((n) => n !== undefined && n !== null),
			})),
		};
		await apiPost(`${apiRoutes.secciones.list}/${seccionId}/notas`, payload);
		alert("Notas registradas con éxito");
	};

	return { seccion, docenteNombre, materiaNombre, notas, loading, handleNotaChange, handleGuardar };
}
