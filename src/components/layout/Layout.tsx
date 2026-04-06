import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Outlet, useLocation } from 'react-router-dom';

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Dashboard', subtitle: 'ផ្ទាំងគ្រប់គ្រង - Command Center' },
  '/students': { title: 'Student Management', subtitle: 'គ្រប់គ្រងសិស្ស' },
  '/teachers': { title: 'Teachers & Staff', subtitle: 'គ្រូ និង បុគ្គលិក' },
  '/timetable': { title: 'Class & Timetable', subtitle: 'កាលវិភាគ' },
  '/attendance': { title: 'Attendance System', subtitle: 'ប្រព័ន្ធវត្តមាន' },
  '/grades': { title: 'Grades & Exams', subtitle: 'ថ្នាក់ និង ប្រឡង' },
  '/documents': { title: 'Documents & Files', subtitle: 'ឯកសារ' },
  '/announcements': { title: 'Announcements', subtitle: 'សេចក្ដីប្រកាស' },
  '/finance': { title: 'Finance', subtitle: 'ហិរញ្ញវត្ថុ' },
  '/reports': { title: 'Reports & Analytics', subtitle: 'របាយការណ៍ & ការវិភាគ' },
  '/roles': { title: 'Roles & Permissions', subtitle: 'តួនាទី & សិទ្ធិ' },
  '/settings': { title: 'System Settings', subtitle: 'ការកំណត់ប្រព័ន្ធ' },
};

export function Layout() {
  const location = useLocation();
  const basePath = '/' + location.pathname.split('/')[1];
  const page = pageTitles[basePath] || pageTitles['/'];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={page.title} subtitle={page.subtitle} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
