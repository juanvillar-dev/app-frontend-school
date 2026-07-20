import { config } from '@/config';
import { DocentesClient } from './DocentesClient';

export const metadata = {
  title: `Docentes | Dashboard | ${config.site.name}`,
};

export default function Page() {
  return <DocentesClient />;
}
