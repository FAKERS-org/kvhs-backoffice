import { useState } from 'react';
import { Search, Plus, Upload, ChevronDown, Eye, Pencil } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

const students = [
  { id: 'S001', nameKh: 'ចាន់ ដារ៉ា', nameEn: 'Chan Dara', grade: 'Grade 10', class: '10A', gender: 'M', dob: '2009-03-15', guardian: 'ចាន់ ប៊ុននី', status: 'Active' },
  { id: 'S002', nameKh: 'ស្រី ណារ', nameEn: 'Srey Nar', grade: 'Grade 10', class: '10A', gender: 'F', dob: '2009-07-22', guardian: 'ស្រី ផល', status: 'Active' },
  { id: 'S003', nameKh: 'ហេង វ៉ា', nameEn: 'Heng Va', grade: 'Grade 9', class: '9B', gender: 'M', dob: '2010-01-10', guardian: 'ហេង ចន្ទ', status: 'Active' },
  { id: 'S004', nameKh: 'ម៉ែន ស្រីណា', nameEn: 'Men Sreyna', grade: 'Grade 11', class: '11C', gender: 'F', dob: '2008-09-05', guardian: 'ម៉ែន ស្រីណីត', status: 'Active' },
  { id: 'S005', nameKh: 'វង្ស ពិសិដ្ឋ', nameEn: 'Vong Piseth', grade: 'Grade 12', class: '12A', gender: 'M', dob: '2007-12-30', guardian: 'វង្ស ស្រីណី', status: 'Inactive' },
  { id: 'S006', nameKh: 'ឡុង ស្រីពេជ្រ', nameEn: 'Long Sreypeach', grade: 'Grade 7', class: '7B', gender: 'F', dob: '2012-05-18', guardian: 'ឡុង វ៉ាន', status: 'Active' },
  { id: 'S007', nameKh: 'ទេព ចន្ទបូ', nameEn: 'Tep Chanbo', grade: 'Grade 8', class: '8A', gender: 'M', dob: '2011-08-03', guardian: 'ទេព ណារ', status: 'Active' },
  { id: 'S008', nameKh: 'ណូ ស្រីណេត', nameEn: 'No Sreyneth', grade: 'Grade 9', class: '9A', gender: 'F', dob: '2010-04-25', guardian: 'ណូ ផ្លែ', status: 'Active' },
];

const grades = ['All Grades', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
const classes = ['All Classes', '7A', '7B', '8A', '8B', '9A', '9B', '9C', '10A', '10B', '11A', '11B', '11C', '12A', '12B'];

export function StudentList() {
  const [search, setSearch] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All Grades');
  const [editingRow, setEditingRow] = useState<string | null>(null);

  const filtered = students.filter(s => {
    const matchesSearch = s.nameKh.includes(search) || s.nameEn.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search);
    const matchesGrade = selectedGrade === 'All Grades' || s.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by name, ID... / ស្វែងរក"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="relative">
          <select
            className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-md focus:outline-none bg-white"
            value={selectedGrade}
            onChange={e => setSelectedGrade(e.target.value)}
          >
            {grades.map(g => <option key={g}>{g}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        <div className="relative">
          <select className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-md focus:outline-none bg-white">
            {classes.map(c => <option key={c}>{c}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        <div className="flex gap-2 ml-auto">
          <Button variant="outline" size="sm">
            <Upload size={14} />
            Import Excel
          </Button>
          <Button size="sm">
            <Plus size={14} />
            Add Student / បន្ថែមសិស្ស
          </Button>
        </div>
      </div>

      {/* Summary */}
      <p className="text-sm text-gray-500">{filtered.length} students found / សិស្សសរុប</p>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left font-medium text-gray-600 w-10">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">ID</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Name (ខ្មែរ / EN)</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Grade / ថ្នាក់</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Class / ថ្នាក់រៀន</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Gender / ភេទ</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Date of Birth</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Guardian / អាណាព្យាបាល</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(student => (
              <tr key={student.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                <td className="px-4 py-2.5">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="px-4 py-2.5 font-mono text-gray-500 text-xs">{student.id}</td>
                <td className="px-4 py-2.5">
                  {editingRow === student.id ? (
                    <div className="flex gap-1">
                      <input defaultValue={student.nameKh} className="border rounded px-1 py-0.5 text-xs w-24" />
                      <input defaultValue={student.nameEn} className="border rounded px-1 py-0.5 text-xs w-24" />
                    </div>
                  ) : (
                    <div>
                      <div className="font-medium text-gray-800">{student.nameKh}</div>
                      <div className="text-xs text-gray-500">{student.nameEn}</div>
                    </div>
                  )}
                </td>
                <td className="px-4 py-2.5 text-gray-700">{student.grade}</td>
                <td className="px-4 py-2.5">
                  <Badge variant="info">{student.class}</Badge>
                </td>
                <td className="px-4 py-2.5 text-gray-600">{student.gender === 'M' ? '👦 M' : '👧 F'}</td>
                <td className="px-4 py-2.5 text-gray-600 text-xs">{student.dob}</td>
                <td className="px-4 py-2.5 text-gray-600 text-xs">{student.guardian}</td>
                <td className="px-4 py-2.5">
                  <Badge variant={student.status === 'Active' ? 'success' : 'default'}>{student.status}</Badge>
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex gap-1">
                    <button className="p-1 text-gray-400 hover:text-blue-600 rounded" title="View">
                      <Eye size={14} />
                    </button>
                    <button
                      className="p-1 text-gray-400 hover:text-blue-600 rounded"
                      title="Edit"
                      onClick={() => setEditingRow(editingRow === student.id ? null : student.id)}
                    >
                      <Pencil size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bulk actions */}
      <div className="flex items-center gap-3 text-sm text-gray-500">
        <span>Bulk Actions / សកម្មភាពច្រើន:</span>
        <Button variant="outline" size="sm">Export Selected</Button>
        <Button variant="outline" size="sm">Change Class</Button>
        <Button variant="danger" size="sm">Deactivate</Button>
      </div>
    </div>
  );
}
