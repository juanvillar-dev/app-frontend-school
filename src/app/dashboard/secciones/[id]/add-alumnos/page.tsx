import { config } from '@/config';
import { AddAlumnosClient } from './AddAlumnosClient';

export const metadata = {
  title: `Secciones | Asignar alumnos | ${config.site.name}`,
};

export default function Page() {
  return <AddAlumnosClient />;
}
