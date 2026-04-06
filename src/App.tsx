import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { StudentList } from './pages/students/StudentList';
import { TeacherList } from './pages/teachers/TeacherList';
import { TimetableView } from './pages/timetable/TimetableView';
import { AttendanceView } from './pages/attendance/AttendanceView';
import { GradesView } from './pages/grades/GradesView';
import { DocumentsView } from './pages/documents/DocumentsView';
import { AnnouncementsView } from './pages/announcements/AnnouncementsView';
import { FinanceView } from './pages/finance/FinanceView';
import { ReportsView } from './pages/reports/ReportsView';
import { RolesView } from './pages/roles/RolesView';
import { SettingsView } from './pages/settings/SettingsView';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<StudentList />} />
          <Route path="teachers" element={<TeacherList />} />
          <Route path="timetable" element={<TimetableView />} />
          <Route path="attendance" element={<AttendanceView />} />
          <Route path="grades" element={<GradesView />} />
          <Route path="documents" element={<DocumentsView />} />
          <Route path="announcements" element={<AnnouncementsView />} />
          <Route path="finance" element={<FinanceView />} />
          <Route path="reports" element={<ReportsView />} />
          <Route path="roles" element={<RolesView />} />
          <Route path="settings" element={<SettingsView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
