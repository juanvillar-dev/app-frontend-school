"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiGet, apiPost } from "@/routes/apiClient";
import { apiRoutes } from "@/routes/apiRoutes";

export function useAddHorarios() {
	const params = useParams();
	const seccionId = Array.isArray(params?.id) ? params.id[0] : params?.id;

	const [materias, setMaterias] = useState<any[]>([]);
	const [docentes, setDocentes] = useState<any[]>([]);
	const [horarios, setHorarios] = useState<any[]>([]);
	const [formData, setFormData] = useState({
		materiaId: "",
		docenteId: "",
		diaSemana: "",
		horaInicio: "",
		horaFin: "",
	});

	// contador de ids únicos
	const [nextId, setNextId] = useState(1);

	useEffect(() => {
		apiGet<any>(`${apiRoutes.secciones.list}/${seccionId}`).then((seccion) => {
			setMaterias(seccion.grado.materias);
		});
		apiGet<any[]>(apiRoutes.docentes.list).then(setDocentes);
	}, []);

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const addHorario = () => {
		const materia = materias.find((m) => m.id === Number(formData.materiaId));
		const docente = docentes.find((d) => d.id === Number(formData.docenteId));

		const nuevoHorario = {
			id: nextId, // 👈 id incremental
			...formData,
			materiaNombre: materia?.nombre,
			docenteNombre: docente ? `${docente.usuario.nombre} ${docente.usuario.apellido}` : "",
			areaNombre: materia?.area,
		};

		setHorarios([...horarios, nuevoHorario]);
		setNextId(nextId + 1); // 👈 incrementamos para el siguiente

		setFormData({ materiaId: "", docenteId: "", diaSemana: "", horaInicio: "", horaFin: "" });
	};

	const removeHorario = (id: number) => {
		setHorarios(horarios.filter((h) => h.id !== id));
	};

	const handleSubmit = async () => {
		const payload = {
			seccionId: Number(seccionId),
			horarios: horarios.map((h) => ({
				materiaId: Number(h.materiaId),
				docenteId: Number(h.docenteId),
				diaSemana: h.diaSemana,
				horaInicio: h.horaInicio,
				horaFin: h.horaFin,
			})),
		};
		await apiPost(apiRoutes.secciones.addHorarios, payload);
		alert("HORARIOS ASIGNADOS CON ÉXITO");
	};

	return { materias, docentes, horarios, formData, handleChange, addHorario, removeHorario, handleSubmit };
}
