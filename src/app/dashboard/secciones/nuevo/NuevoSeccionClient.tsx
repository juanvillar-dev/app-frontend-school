'use client';
import { useNuevoSeccion } from './useNuevoSeccion';
import { NuevoSeccionForm } from './NuevoSeccionForm';

export function NuevoSeccionClient() {
  const seccionHook = useNuevoSeccion();
  return <NuevoSeccionForm {...seccionHook} />;
}
