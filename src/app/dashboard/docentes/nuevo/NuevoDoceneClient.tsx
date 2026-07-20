'use client'; // ESTE ES CLIENTE

import { useNuevoDocente } from './useNuevoDocente';
import { NuevoDocenteForm } from './NuevoDocenteForm';

// ESTE COMPONENTE SE ENCARGA DE USAR EL HOOK Y RENDERIZAR EL FORMULARIO
export function NuevoDocenteClient() {
  // USAMOS EL HOOK PARA OBTENER ESTADO Y FUNCIONES
  const docenteHook = useNuevoDocente();

  // PASAMOS EL ESTADO Y FUNCIONES AL FORMULARIO
  return <NuevoDocenteForm {...docenteHook} />;
}
