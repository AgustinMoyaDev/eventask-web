import {
  CalendarIcon,
  ClockIcon,
  ContactsIcon,
  HomeIcon,
  PlusIcon,
  UserSettingIcon,
} from '@/components/icons/Icons'

export const SIDEBAR_MENU_ITEMS = [
  { to: '/home', label: 'Home', icon: HomeIcon },
  { to: '/task/new', label: 'New Task', icon: PlusIcon },
  { to: '/calendar', label: 'Calendar', icon: CalendarIcon },
  { to: '/see-all?type=events', label: 'Events', icon: ClockIcon },
  { to: '/see-all?type=contacts', label: 'Contacts', icon: ContactsIcon },
  { to: '/profile', label: 'Profile', icon: UserSettingIcon },
] as const
