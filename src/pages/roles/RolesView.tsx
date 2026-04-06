import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

const roles = ['Admin', 'Teacher', 'Staff'];

const permissions = [
  { module: 'Dashboard / ផ្ទាំងគ្រប់គ្រង', admin: true, teacher: true, staff: true },
  { module: 'Student Management / គ្រប់គ្រងសិស្ស', admin: true, teacher: false, staff: false },
  { module: 'Student: View Only', admin: true, teacher: true, staff: true },
  { module: 'Teacher Management / គ្រប់គ្រងគ្រូ', admin: true, teacher: false, staff: false },
  { module: 'Timetable: View', admin: true, teacher: true, staff: true },
  { module: 'Timetable: Edit', admin: true, teacher: false, staff: false },
  { module: 'Attendance: Mark', admin: true, teacher: true, staff: false },
  { module: 'Attendance: View', admin: true, teacher: true, staff: true },
  { module: 'Grades: Enter', admin: true, teacher: true, staff: false },
  { module: 'Grades: View', admin: true, teacher: true, staff: false },
  { module: 'Documents: Upload', admin: true, teacher: true, staff: true },
  { module: 'Documents: Approve', admin: true, teacher: false, staff: false },
  { module: 'Announcements: Post', admin: true, teacher: false, staff: false },
  { module: 'Finance: View', admin: true, teacher: false, staff: false },
  { module: 'Finance: Edit', admin: true, teacher: false, staff: false },
  { module: 'Reports: View', admin: true, teacher: true, staff: false },
  { module: 'User Management', admin: true, teacher: false, staff: false },
  { module: 'System Settings', admin: true, teacher: false, staff: false },
];

const users = [
  { id: 'U001', name: 'Admin User', nameKh: 'អ្នកគ្រប់គ្រង', role: 'Admin', email: 'admin@kvhs.edu.kh', status: 'Active' },
  { id: 'U002', name: 'Chan Dara', nameKh: 'ចាន់ ដារ៉ា', role: 'Teacher', email: 'cdara@kvhs.edu.kh', status: 'Active' },
  { id: 'U003', name: 'Srey Nar', nameKh: 'ស្រី ណារ', role: 'Teacher', email: 'snar@kvhs.edu.kh', status: 'Active' },
  { id: 'U004', name: 'Long Van', nameKh: 'ឡុង វ៉ាន', role: 'Staff', email: 'lvan@kvhs.edu.kh', status: 'Active' },
];

export function RolesView() {
  const [matrix, setMatrix] = useState(
    permissions.reduce((acc, p) => {
      acc[p.module] = { Admin: p.admin, Teacher: p.teacher, Staff: p.staff };
      return acc;
    }, {} as Record<string, Record<string, boolean>>)
  );

  const toggle = (module: string, role: string) => {
    if (role === 'Admin') return; // Admin always has access
    setMatrix(m => ({
      ...m,
      [module]: { ...m[module], [role]: !m[module][role] },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Users table */}
      <Card title="System Users / អ្នកប្រើប្រាស់">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 text-left font-medium text-gray-600">Name / ឈ្មោះ</th>
                <th className="py-2 text-left font-medium text-gray-600">Email</th>
                <th className="py-2 text-left font-medium text-gray-600">Role / តួនាទី</th>
                <th className="py-2 text-left font-medium text-gray-600">Status</th>
                <th className="py-2 text-left font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b border-gray-100 hover:bg-blue-50">
                  <td className="py-2.5">
                    <div className="font-medium text-gray-800">{u.nameKh}</div>
                    <div className="text-xs text-gray-500">{u.name}</div>
                  </td>
                  <td className="py-2.5 text-gray-600 font-mono text-xs">{u.email}</td>
                  <td className="py-2.5">
                    <Badge variant={u.role === 'Admin' ? 'danger' : u.role === 'Teacher' ? 'info' : 'default'}>
                      {u.role}
                    </Badge>
                  </td>
                  <td className="py-2.5">
                    <Badge variant="success">{u.status}</Badge>
                  </td>
                  <td className="py-2.5">
                    <Button variant="outline" size="sm">Edit Role</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Permission matrix */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">Permission Matrix / បញ្ជីសិទ្ធ</h3>
          <Button size="sm">Save Changes / រក្សាទុក</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left font-medium text-gray-600">Module / ប្រព័ន្ធ</th>
                {roles.map(role => (
                  <th key={role} className="px-4 py-3 text-center font-medium text-gray-600 w-28">
                    <div>{role}</div>
                    <div className="text-xs font-normal text-gray-400">
                      {role === 'Admin' ? 'អ្នកគ្រប់គ្រង' : role === 'Teacher' ? 'គ្រូ' : 'បុគ្គលិក'}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(matrix).map(([module, perms]) => (
                <tr key={module} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-2.5 text-gray-700">{module}</td>
                  {roles.map(role => (
                    <td key={role} className="px-4 py-2.5 text-center">
                      <button
                        onClick={() => toggle(module, role)}
                        className={`w-7 h-7 rounded flex items-center justify-center mx-auto transition-colors ${
                          perms[role]
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-red-50 text-red-400 hover:bg-red-100'
                        } ${role === 'Admin' ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
                        disabled={role === 'Admin'}
                        title={role === 'Admin' ? 'Admin always has full access' : undefined}
                      >
                        {perms[role] ? <Check size={14} /> : <X size={14} />}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
