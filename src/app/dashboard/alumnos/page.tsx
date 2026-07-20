import { config } from '@/config';
import { AlumnosClient } from './AlumnosClient';

export const metadata = {
  title: `Alumnos | Dashboard | ${config.site.name}`,
};

export default function Page() {
  return <AlumnosClient />;
}
