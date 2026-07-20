'use client';
import { useEditarGrado } from './useEditarGrado';
import { EditarGradoForm } from './EditarGradoForm';

export function EditarGradoClient() {
  const gradoHook = useEditarGrado();
  return <EditarGradoForm {...gradoHook} />; // ✅ ESTE USA EL HOOK
}
