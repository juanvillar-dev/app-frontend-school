import { config } from '@/config';
import { NuevoDocenteClient } from './NuevoDoceneClient';

// METADATA SOLO SE EXPORTA DESDE SERVER COMPONENTS
export const metadata = {
  title: `Docentes | Nuevo | ${config.site.name}`,
};

// ESTE COMPONENTE ES SERVER POR DEFECTO
// SOLO RENDERIZA EL CLIENT COMPONENT
export default function Page() {
  return <NuevoDocenteClient />;
}
