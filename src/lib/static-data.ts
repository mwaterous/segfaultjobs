import {
  Calendar as CalendarIcon,
  ChartPie as ChartPieIcon,
  Files as FilesIcon,
  Folder as FolderIcon,
  House as HouseIcon,
  Users as UsersIcon,
} from 'lucide-react' 


export const navigation = [
  { name: 'Home', href: '/', icon: HouseIcon, current: true },
  { name: 'New Listing', href: '/jobs/new', icon: FolderIcon, current: false },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: FilesIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]
export const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]
export const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]
