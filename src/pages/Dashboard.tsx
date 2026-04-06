import { Users, UserCheck, ClipboardCheck, AlertTriangle, BookOpen, TrendingUp } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const attendanceData = [
  { grade: 'G7', present: 145, absent: 12 },
  { grade: 'G8', present: 132, absent: 18 },
  { grade: 'G9', present: 158, absent: 8 },
  { grade: 'G10', present: 121, absent: 22 },
  { grade: 'G11', present: 98, absent: 15 },
  { grade: 'G12', present: 87, absent: 9 },
];

const absentTeachers = [
  { name: ' លោក ចាន់ ដារ៉ា', subject: 'គណិតវិទ្យា', class: '10A, 10B' },
  { name: 'លោកស្រី ស្រី ណារ', subject: 'ភាសាអង់គ្លេស', class: '9C' },
  { name: 'លោក វង្ស ស្រីណី', subject: 'រូបវិទ្យា', class: '11A' },
];

const pendingApprovals = [
  { type: 'Document', item: 'Student ID - ចាន់ ពេជ្រ', time: '5 mins ago' },
  { type: 'Grade', item: 'Mid-term Grade Entry - Class 9B', time: '1 hour ago' },
  { type: 'Request', item: 'Leave Request - លោក ហេង វ៉ាន', time: '2 hours ago' },
  { type: 'Document', item: 'Certificate Upload - ស្រី ស្រីណា', time: '3 hours ago' },
];

const announcements = [
  { title: 'National Exam Schedule Released', date: 'Apr 6', target: 'School-wide' },
  { title: 'Parent Meeting - Grade 12', date: 'Apr 5', target: 'Grade 12' },
  { title: 'Holiday Notice - Khmer New Year', date: 'Apr 4', target: 'School-wide' },
];

const alerts = [
  { type: 'warning', message: 'Class 10A: Attendance below 75% this week' },
  { type: 'danger', message: 'Class 8C: Missing grade entries for Math' },
  { type: 'warning', message: '3 teachers have not submitted monthly reports' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${
                alert.type === 'danger' ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-yellow-50 text-yellow-800 border border-yellow-200'
              }`}
            >
              <AlertTriangle size={16} />
              {alert.message}
            </div>
          ))}
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="Total Students / សិស្សសរុប" value="741" subtitle="6 grades, 18 classes" icon={Users} color="blue" trend="↑ 12 new this year" />
        <StatCard title="Present Today / ថ្ងៃនេះ" value="696" subtitle="94.1% attendance rate" icon={ClipboardCheck} color="green" />
        <StatCard title="Teachers / គ្រូ" value="48" subtitle="3 absent today" icon={UserCheck} color="purple" />
        <StatCard title="Pending Approvals" value="4" subtitle="Requires action" icon={BookOpen} color="yellow" trend="↑ 2 new" />
      </div>

      {/* Charts + Lists */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Attendance chart */}
        <div className="lg:col-span-2">
          <Card title="Today's Attendance by Grade / វត្តមានថ្ងៃនេះ">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={attendanceData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="grade" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="present" fill="#3b82f6" name="Present" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" fill="#fca5a5" name="Absent" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Absent teachers */}
        <Card title="Absent Teachers Today / គ្រូអវត្តមាន">
          <div className="space-y-3">
            {absentTeachers.map((t, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
                <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {t.name.charAt(5)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.subject} · {t.class}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pending approvals */}
        <Card title="Pending Approvals / ការយល់ព្រម">
          <div className="space-y-2">
            {pendingApprovals.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <Badge variant={item.type === 'Grade' ? 'warning' : item.type === 'Request' ? 'danger' : 'info'}>
                    {item.type}
                  </Badge>
                  <span className="text-sm text-gray-700">{item.item}</span>
                </div>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Announcements */}
        <Card title="Recent Announcements / សេចក្ដីប្រកាស">
          <div className="space-y-2">
            {announcements.map((a, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">{a.title}</p>
                  <p className="text-xs text-gray-500">{a.date} · {a.target}</p>
                </div>
                <Badge variant="info">{a.target === 'School-wide' ? 'All' : a.target}</Badge>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <TrendingUp size={12} />
              <span>Academic Year 2025-2026 · Semester 2</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
