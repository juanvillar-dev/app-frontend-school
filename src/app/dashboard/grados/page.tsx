import { config } from '@/config';
import { GradosClient } from './GradosClient';

export const metadata = {
  title: `Grados | ${config.site.name}`,
};

export default function Page() {
  return <GradosClient />;
}
