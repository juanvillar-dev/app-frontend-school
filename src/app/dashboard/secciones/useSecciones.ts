"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/routes/apiClient";
import { apiRoutes } from "@/routes/apiRoutes";

export function useSecciones() {
	const [secciones, setSecciones] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		apiGet<any[]>(apiRoutes.secciones.list)
			.then((data) => {
				// ORDENAMOS POR nivel y año escolar del grado
				const ordenadas = data.sort((a, b) => {
					if (a.grado.nivel === b.grado.nivel) {
						return a.grado.year - b.grado.year;
					}
					return a.grado.nivel.localeCompare(b.grado.nivel);
				});
				setSecciones(ordenadas);
			})
			.catch((err) => console.error("Error cargando secciones:", err))
			.finally(() => setLoading(false));
	}, []);

	// FILTRO POR nombre de sección, nivel o año
	const filteredSecciones = secciones.filter((seccion) => {
		return (
			seccion.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
			seccion.grado.nivel.toLowerCase().includes(searchTerm.toLowerCase()) ||
			seccion.tutor.usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
			seccion.tutor.usuario.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
			String(seccion.grado.year).includes(searchTerm)
		);
	});

	const paginatedSecciones = filteredSecciones.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	return {
		secciones: filteredSecciones,
		loading,
		page,
		rowsPerPage,
		setPage,
		setRowsPerPage,
		paginatedSecciones,
		searchTerm,
		setSearchTerm,
	};
}
