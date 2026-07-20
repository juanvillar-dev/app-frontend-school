import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';
import { GraduationCapIcon } from '@phosphor-icons/react/dist/ssr/GraduationCap';
import { ChalkboardTeacherIcon } from '@phosphor-icons/react/dist/ssr/ChalkboardTeacher';
import { ClipboardTextIcon } from '@phosphor-icons/react/dist/ssr/ClipboardText';
import { BookBookmarkIcon } from '@phosphor-icons/react/dist/ssr/BookBookmark';
import { StudentIcon } from '@phosphor-icons/react/dist/ssr/Student';


export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'plugs-connected': PlugsConnectedIcon,
  'x-square': XSquare,
  user: UserIcon,
  users: UsersIcon,
  'book': BookBookmarkIcon,
  'student': StudentIcon,
  'graduation-cap': GraduationCapIcon,
  'chalkboard-teacher': ChalkboardTeacherIcon,
  'clipboard-list': ClipboardTextIcon,
} as Record<string, Icon>;
