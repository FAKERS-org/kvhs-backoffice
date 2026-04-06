import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, UserCheck, Calendar, ClipboardCheck,
  GraduationCap, FolderOpen, Megaphone, DollarSign, BarChart2,
  Shield, Settings, School,
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard', labelKh: 'ផ្ទាំងគ្រប់គ្រង' },
  { path: '/students', icon: Users, label: 'Students', labelKh: 'សិស្ស' },
  { path: '/teachers', icon: UserCheck, label: 'Teachers & Staff', labelKh: 'គ្រូ & បុគ្គលិក' },
  { path: '/timetable', icon: Calendar, label: 'Timetable', labelKh: 'កាលវិភាគ' },
  { path: '/attendance', icon: ClipboardCheck, label: 'Attendance', labelKh: 'វត្តមាន' },
  { path: '/grades', icon: GraduationCap, label: 'Grades & Exams', labelKh: 'ថ្នាក់ & ប្រឡង' },
  { path: '/documents', icon: FolderOpen, label: 'Documents', labelKh: 'ឯកសារ' },
  { path: '/announcements', icon: Megaphone, label: 'Announcements', labelKh: 'សេចក្ដីប្រកាស' },
  { path: '/finance', icon: DollarSign, label: 'Finance', labelKh: 'ហិរញ្ញវត្ថុ' },
  { path: '/reports', icon: BarChart2, label: 'Reports', labelKh: 'របាយការណ៍' },
  { path: '/roles', icon: Shield, label: 'Roles & Permissions', labelKh: 'តួនាទី' },
  { path: '/settings', icon: Settings, label: 'Settings', labelKh: 'ការកំណត់' },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-screen sticky top-0 overflow-y-auto">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
            <School size={20} />
          </div>
          <div>
            <p className="text-sm font-bold leading-tight">KVHS Backoffice</p>
            <p className="text-[10px] text-gray-400">ក្រវ៉ាញ់ហ៊ុនសែន</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3">
        {navItems.map(({ path, icon: Icon, label, labelKh }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md mb-0.5 text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <Icon size={16} />
            <div className="leading-tight">
              <div>{label}</div>
              <div className="text-[10px] opacity-70">{labelKh}</div>
            </div>
          </NavLink>
        ))}
      </nav>

      <div className="px-5 py-3 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">A</div>
          <div>
            <p className="text-xs font-medium">Admin User</p>
            <p className="text-[10px] text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
