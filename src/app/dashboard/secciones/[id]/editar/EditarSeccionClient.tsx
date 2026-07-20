"use client";

import { EditarSeccionForm } from "./EditarSeccionForm";
import { useEditarSeccion } from "./useEditarSeccion";

export function EditarSeccionClient() {
	const seccionHook = useEditarSeccion();
	return <EditarSeccionForm {...seccionHook} />;
}
