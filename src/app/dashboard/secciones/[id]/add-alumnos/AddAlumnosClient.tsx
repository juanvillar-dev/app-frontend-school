'use client';
import { useAddAlumnos } from './useAddAlumnos';
import { AddAlumnosForm } from './AddAlumnosForm';

export function AddAlumnosClient() {
  const alumnosHook = useAddAlumnos();
  return <AddAlumnosForm {...alumnosHook} />;
}
