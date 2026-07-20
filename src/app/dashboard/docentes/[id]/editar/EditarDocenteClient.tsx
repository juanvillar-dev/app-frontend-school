'use client'; // ESTE SÍ ES CLIENTE

import { useEditarDocente } from './useEditarDocente';
import { EditarDocenteForm } from './EditarDocenteForm';

// ESTE COMPONENTE SE ENCARGA DE USAR EL HOOK Y RENDERIZAR EL FORMULARIO
export function EditarDocenteClient() {
  const docenteHook = useEditarDocente();
  return <EditarDocenteForm {...docenteHook} />;
}
