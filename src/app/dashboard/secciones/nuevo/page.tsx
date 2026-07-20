import { config } from '@/config';
import { NuevoSeccionClient } from './NuevoSeccionClient';

export const metadata = {
  title: `Secciones | Nuevo | ${config.site.name}`,
};

export default function Page() {
  return <NuevoSeccionClient />;
}
