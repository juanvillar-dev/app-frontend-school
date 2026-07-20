"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiGet, apiPut } from "@/routes/apiClient";
import { apiRoutes } from "@/routes/apiRoutes";

export function useEditarDocente() {
	// OBTENEMOS LOS PARÁMETROS DE LA URL (POR EJEMPLO /dashboard/docentes/5/editar → id = "5")
	const params = useParams();

	// VALIDAMOS SI EL PARAMETRO ES UN ARRAY O UN STRING
	// USEPARAMS DEVUELVE string | string[] | undefined → POR ESO HACEMOS ESTA CONVERSIÓN
	const docenteId = Array.isArray(params?.id) ? params.id[0] : params?.id;

	// DEFINIMOS EL ESTADO INICIAL DEL FORMULARIO CON LOS CAMPOS DEL DTO
	const [formData, setFormData] = useState({
		especialidad: "",
		usuario: {
			dni: "",
			nombre: "",
			apellido: "",
			email: "",
			passwordHash: "",
			rol: "DOCENTE", // EL ROL SIEMPRE ES DOCENTE
			genero: "",
		},
	});

	// USEEFFECT SE EJECUTA CUANDO EL COMPONENTE SE MONTA O CAMBIA EL ID
	// AQUÍ HACEMOS EL FETCH PARA CARGAR LOS DATOS DEL DOCENTE DESDE EL BACKEND
	useEffect(() => {
		if (!docenteId) return; // SI NO HAY ID, NO HACEMOS NADA

		// LLAMAMOS A LA API PARA OBTENER LOS DATOS DEL DOCENTE
		apiGet<any>(apiRoutes.docentes.getById(String(docenteId)))
			.then((data) => {
				// ACTUALIZAMOS EL ESTADO DEL FORMULARIO CON LOS DATOS RECIBIDOS
				setFormData({
					especialidad: data.especialidad,
					usuario: {
						dni: data.usuario.dni,
						nombre: data.usuario.nombre,
						apellido: data.usuario.apellido,
						email: data.usuario.email,
						passwordHash: data.usuario.passwordHash,
						rol: data.usuario.rol,
						genero: data.usuario.genero,
					},
				});
			})
			.catch((err) => console.error("ERROR CARGANDO DOCENTE:", err));
	}, [docenteId]);

	// FUNCIÓN PARA ACTUALIZAR CAMPOS DEL OBJETO USUARIO (DNI, NOMBRE, APELLIDO, EMAIL, ETC.)
	const handleChangeUsuario = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			usuario: { ...formData.usuario, [e.target.name]: e.target.value },
		});
	};

	// FUNCIÓN PARA ACTUALIZAR CAMPOS DE NIVEL SUPERIOR (ESPECIALIDAD)
	const handleChangeRoot = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// FUNCIÓN PARA ENVIAR EL FORMULARIO AL BACKEND
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); // EVITA QUE EL FORMULARIO RECARGUE LA PÁGINA
		try {
			// LLAMAMOS A LA API CON MÉTODO PUT PARA ACTUALIZAR EL DOCENTE
			await apiPut(apiRoutes.docentes.update(String(docenteId)), formData);
			alert("DOCENTE ACTUALIZADO CON ÉXITO");
			window.location.href = "/dashboard/docentes"; // REDIRECCIONAMOS A LA LISTA DE DOCENTES
		} catch (err) {
			console.error(err);
			alert("ERROR AL ACTUALIZAR DOCENTE");
		}
	};

	// RETORNAMOS EL ESTADO Y LAS FUNCIONES PARA QUE EL FORMULARIO LAS USE
	return {
		formData,
		handleChangeUsuario,
		handleChangeRoot,
		handleSubmit,
	};
}
