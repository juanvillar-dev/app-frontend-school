import { config } from '@/config';
import { EditarGradoClient } from './EditarGradoClient';

export const metadata = {
  title: `Grados | Editar | ${config.site.name}`,
};

// ESTE COMPONENTE ES SERVER POR DEFECTO
// SOLO RENDERIZA EL CLIENT COMPONENT
export default function Page() {
  return <EditarGradoClient />; // ✅ EXPORTA UN COMPONENTE VÁLIDO
}
