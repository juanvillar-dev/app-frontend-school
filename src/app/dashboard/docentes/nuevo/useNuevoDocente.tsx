"use client";

import { useState } from "react";
import { apiPost } from "@/routes/apiClient";
import { apiRoutes } from "@/routes/apiRoutes";

export function useNuevoDocente() {
	// ESTADO PRINCIPAL DEL FORMULARIO
	// GUARDA LOS DATOS QUE SE VAN A ENVIAR AL BACKEND
	const [formData, setFormData] = useState({
		especialidad: "", // CAMPO DE ESPECIALIDAD DEL DOCENTE
		usuario: {
			dni: "", // DOCUMENTO DE IDENTIDAD
			nombre: "", // NOMBRE DEL DOCENTE
			apellido: "", // APELLIDO DEL DOCENTE
			email: "", // CORREO ELECTRÓNICO
			passwordHash: "", // CONTRASEÑA
			rol: "DOCENTE", // ROL FIJO EN MAYÚSCULAS
			genero: "", // GÉNERO (M/F)
		},
	});

	// FUNCIÓN PARA ACTUALIZAR CAMPOS DENTRO DE "USUARIO"
	const handleChangeUsuario = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			usuario: { ...formData.usuario, [e.target.name]: e.target.value },
		});
	};

	// FUNCIÓN PARA ACTUALIZAR CAMPOS DE NIVEL SUPERIOR (EJEMPLO: ESPECIALIDAD)
	const handleChangeRoot = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// FUNCIÓN PARA REINICIAR EL FORMULARIO A VALORES VACÍOS
	const handleReset = () => {
		setFormData({
			especialidad: "",
			usuario: {
				dni: "",
				nombre: "",
				apellido: "",
				email: "",
				passwordHash: "",
				rol: "DOCENTE",
				genero: "",
			},
		});
	};

	// FUNCIÓN PARA ENVIAR EL FORMULARIO AL BACKEND
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); // EVITA QUE EL FORMULARIO RECARGUE LA PÁGINA
		console.log("OBJETO ENVIADO:", formData); // MUESTRA EN CONSOLA LO QUE SE ENVÍA
		try {
			await apiPost(apiRoutes.docentes.create, formData); // ENVÍA LOS DATOS AL BACKEND
			alert("DOCENTE REGISTRADO CON ÉXITO");
			window.location.href = "/dashboard/docentes"; // REDIRECCIONA A LA LISTA DE DOCENTES
		} catch (err) {
			console.error(err);
			alert("ERROR AL REGISTRAR DOCENTE");
		}
	};

	// RETORNAMOS EL ESTADO Y LAS FUNCIONES PARA QUE EL FORMULARIO LAS USE
	return {
		formData,
		handleChangeUsuario,
		handleChangeRoot,
		handleReset,
		handleSubmit,
	};
}
