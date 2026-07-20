"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiGet, apiPost, apiPut } from "@/routes/apiClient";
import { apiRoutes } from "@/routes/apiRoutes";

export function useEditHorarios() {
	const params = useParams();
	const seccionId = Array.isArray(params?.id) ? params.id[0] : params?.id;

	const [materias, setMaterias] = useState<any[]>([]);
	const [docentes, setDocentes] = useState<any[]>([]);
	const [horarios, setHorarios] = useState<any[]>([]);
	const [seccion, setSeccion] = useState<any>(null);

	const [formData, setFormData] = useState({
		materiaId: "",
		docenteId: "",
		diaSemana: "",
		horaInicio: "",
		horaFin: "",
	});

	const [nextId, setNextId] = useState(1000);

	useEffect(() => {
		// Cargar sección completa
		apiGet<any>(apiRoutes.secciones.getById(String(seccionId))).then((sec) => {
			setSeccion(sec);
			setMaterias(sec.grado.materias);

			// Cargar lista de docentes desde el backend
			apiGet<any[]>(apiRoutes.docentes.list).then((lista) => {
				setDocentes(lista); // lista con {id, nombre, apellido, email}
			});

			// Transformar horarios existentes al formato del tablero
			const horariosExistentes = sec.horarios.map((h: any) => ({
				id: h.id,
				materiaId: h.materia.id,
				docenteId: h.docente.id,
				diaSemana: h.diaSemana,
				horaInicio: h.horaInicio, // ya viene como "HH:mm"
				horaFin: h.horaFin,
				materiaNombre: h.materia.nombre,
				docenteNombre: `${h.docente.nombre} ${h.docente.apellido}`,
				areaNombre: h.materia.area,
			}));
      console.log("Horarios", horariosExistentes)
			setHorarios(horariosExistentes);
		});
	}, []);

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const addHorario = () => {
		const materia = materias.find((m) => m.id === Number(formData.materiaId));
		const docente = docentes.find((d) => d.id === Number(formData.docenteId));

		const nuevoHorario = {
			id: nextId,
			...formData,
			materiaNombre: materia?.nombre,
			docenteNombre: docente ? `${docente.usuario.nombre} ${docente.usuario.apellido}` : "", // 👈 aquí
			areaNombre: materia?.area,
		};

		setHorarios([...horarios, nuevoHorario]);
		setNextId(nextId + 1);
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
		alert("HORARIOS ACTUALIZADOS CON ÉXITO");
		window.location.href = "/dashboard/secciones";
	};

	return {
		materias,
		docentes,
		horarios,
		formData,
		handleChange,
		addHorario,
		removeHorario,
		handleSubmit,
		seccion,
	};
}
