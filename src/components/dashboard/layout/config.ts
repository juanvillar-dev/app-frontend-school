import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';


//AQUI ESTA EL MENU
export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.inicio, icon: 'chart-pie' },
  { key: 'alumnos', title: 'Alumnos', href: paths.dashboard.alumnos, icon: 'student' },
  { key: 'docentes', title: 'Docentes', href: paths.dashboard.docentes, icon: 'chalkboard-teacher' },
  { key: 'materias', title: 'Materias', href: paths.dashboard.materias, icon: 'book' },
  { key: 'grados', title: 'Grados', href: paths.dashboard.grados, icon: 'graduation-cap' },
  { key: 'secciones', title: 'Secciones', href: paths.dashboard.secciones, icon: 'users' },
  { key: 'notas', title: 'Notas', href: paths.dashboard.notas, icon: 'clipboard-list' },

  // { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
  // { key: 'integrations', title: 'Integrations', href: paths.dashboard.integrations, icon: 'plugs-connected' },
  // { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  // { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
