import { config } from '@/config';
import { SeccionesClient } from './SeccionesClient';

export const metadata = {
  title: `Secciones | ${config.site.name}`,
};

export default function Page() {
  return <SeccionesClient />;
}
