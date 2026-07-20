"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/routes/apiClient";
import { apiRoutes } from "@/routes/apiRoutes";

export function useGrados() {
	const [grados, setGrados] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		apiGet<any[]>(apiRoutes.grados.list)
			.then(setGrados)
			.catch((err) => console.error("Error cargando grados:", err))
			.finally(() => setLoading(false));
	}, []);

	// FILTRO POR NIVEL O AÑO
	const filteredGrados = grados.filter((grado) => {
		return grado.nivel.toLowerCase().includes(searchTerm.toLowerCase()) || String(grado.year).includes(searchTerm);
	});

	const paginatedGrados = filteredGrados.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	return {
		grados: filteredGrados,
		loading,
		page,
		rowsPerPage,
		setPage,
		setRowsPerPage,
		paginatedGrados,
		searchTerm,
		setSearchTerm,
	};
}
