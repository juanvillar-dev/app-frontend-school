import { config } from '@/config';
import { EditarDocenteClient } from './EditarDocenteClient';

// METADATA SOLO SE PUEDE EXPORTAR DESDE SERVER COMPONENTS
export const metadata = {
  title: `Docentes | Editar | ${config.site.name}`,
};

// ESTE COMPONENTE ES SERVER POR DEFECTO, NO LLEVA 'use client'
export default function Page() {
  // SOLO RENDERIZA EL CLIENT COMPONENT
  return <EditarDocenteClient />;
}
