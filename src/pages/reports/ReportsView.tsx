import { Download } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, PieChart, Pie, Cell,
} from 'recharts';

const attendanceTrend = [
  { month: 'Sep', rate: 96 },
  { month: 'Oct', rate: 94 },
  { month: 'Nov', rate: 93 },
  { month: 'Dec', rate: 89 },
  { month: 'Jan', rate: 95 },
  { month: 'Feb', rate: 97 },
  { month: 'Mar', rate: 94 },
  { month: 'Apr', rate: 93 },
];

const gradeDistribution = [
  { grade: 'A (90+)', count: 87 },
  { grade: 'B (80-89)', count: 154 },
  { grade: 'C (70-79)', count: 201 },
  { grade: 'D (50-69)', count: 178 },
  { grade: 'F (<50)', count: 121 },
];

const classPerformance = [
  { class: '7A', avg: 72 },
  { class: '8A', avg: 75 },
  { class: '9A', avg: 78 },
  { class: '10A', avg: 81 },
  { class: '11A', avg: 76 },
  { class: '12A', avg: 84 },
];

const enrollmentData = [
  { name: 'Grade 7', value: 120 },
  { name: 'Grade 8', value: 135 },
  { name: 'Grade 9', value: 148 },
  { name: 'Grade 10', value: 142 },
  { name: 'Grade 11', value: 115 },
  { name: 'Grade 12', value: 81 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ef4444', '#8b5cf6'];

export function ReportsView() {
  return (
    <div className="space-y-6">
      {/* Quick report buttons */}
      <div className="flex flex-wrap gap-3">
        {[
          'Attendance Report / វត្តមាន',
          'Grade Report / ថ្នាក់',
          'Student Performance / លទ្ធផល',
          'Finance Summary / ហិរញ្ញ',
          'Annual Report / ឆ្នាំ',
        ].map(r => (
          <Button key={r} variant="outline" size="sm">
            <Download size={14} />
            {r}
          </Button>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Attendance Trend / និន្នាការវត្តមាន (%)">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis domain={[85, 100]} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} name="Attendance %" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Grade Distribution / ការបែងចែកថ្នាក់">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={gradeDistribution} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="grade" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" name="Students" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Class Average Score / ពិន្ទុមធ្យម">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={classPerformance} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="class" tick={{ fontSize: 12 }} />
              <YAxis domain={[60, 90]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="avg" fill="#10b981" name="Average Score" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Student Enrollment by Grade / ចំនួនសិស្ស">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={enrollmentData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={false}
              >
                {enrollmentData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Summary table */}
      <Card title="School Summary / សង្ខេបសាលា">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 text-left font-medium text-gray-600">Grade / ថ្នាក់</th>
                <th className="py-2 text-right font-medium text-gray-600">Students</th>
                <th className="py-2 text-right font-medium text-gray-600">Avg Attendance</th>
                <th className="py-2 text-right font-medium text-gray-600">Avg Score</th>
                <th className="py-2 text-right font-medium text-gray-600">Pass Rate</th>
              </tr>
            </thead>
            <tbody>
              {[
                { grade: 'Grade 7', students: 120, attendance: '95%', score: 72, pass: '88%' },
                { grade: 'Grade 8', students: 135, attendance: '93%', score: 75, pass: '91%' },
                { grade: 'Grade 9', students: 148, attendance: '94%', score: 78, pass: '89%' },
                { grade: 'Grade 10', students: 142, attendance: '92%', score: 81, pass: '93%' },
                { grade: 'Grade 11', students: 115, attendance: '96%', score: 76, pass: '87%' },
                { grade: 'Grade 12', students: 81, attendance: '97%', score: 84, pass: '95%' },
              ].map(row => (
                <tr key={row.grade} className="border-b border-gray-100 hover:bg-blue-50">
                  <td className="py-2.5 font-medium text-gray-800">{row.grade}</td>
                  <td className="py-2.5 text-right text-gray-700">{row.students}</td>
                  <td className="py-2.5 text-right text-gray-700">{row.attendance}</td>
                  <td className="py-2.5 text-right text-gray-700">{row.score}/100</td>
                  <td className="py-2.5 text-right text-green-700 font-medium">{row.pass}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
