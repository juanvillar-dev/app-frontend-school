"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/routes/apiClient";
import { apiRoutes } from "@/routes/apiRoutes";

export function useDocentes() {
	const [docentes, setDocentes] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);	// MENSAJE DE ESTADO DE CARGA INICIAL

	// ESTADOS DE PAGINACIÓN
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	// ESTADO DE BUSQUEDA
	const [searchTerm, setSearchTerm] = useState("");

	// CARGA DE DOCENTES DESDE LA API
	useEffect(() => {
		apiGet<any[]>(apiRoutes.docentes.list)
			.then(setDocentes)
			.catch((err) => console.error("Error cargando docentes:", err))
			.finally(() => setLoading(false));
	}, []);

	// FILTRAMOS DOCENTES SEGÚN EL searchTerm
	const filteredDocentes = docentes.filter((docente) => {
		const nombreCompleto = `${docente.usuario.nombre} ${docente.usuario.apellido}`.toLowerCase();
		return (
			nombreCompleto.includes(searchTerm.toLowerCase()) ||
			docente.usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			docente.usuario.dni.includes(searchTerm) ||
			(docente.especialidad?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
		);
	});

	// APLICAMOS PAGINACIÓN SOBRE LA LISTA FILTRADA
	const paginatedDocentes = filteredDocentes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	return {
		docentes: filteredDocentes, // DEVOLVEMOS LA LISTA FILTRADA
		loading,
		page,
		rowsPerPage,
		setPage,
		setRowsPerPage,
		paginatedDocentes,
		searchTerm,
		setSearchTerm,
	};
}
