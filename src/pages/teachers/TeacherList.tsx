import { useState } from 'react';
import { Search, Plus, Upload, Pencil } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

const teachers = [
  { id: 'T001', nameKh: 'ចាន់ ដារ៉ា', nameEn: 'Chan Dara', subjects: ['Mathematics', 'Physics'], classes: ['10A', '10B', '11A'], status: 'Active', joined: '2018' },
  { id: 'T002', nameKh: 'ស្រី ណារ', nameEn: 'Srey Nar', subjects: ['English'], classes: ['9A', '9B', '9C', '10A'], status: 'Active', joined: '2020' },
  { id: 'T003', nameKh: 'ហេង ចន្ទ', nameEn: 'Heng Chant', subjects: ['Khmer Literature'], classes: ['7A', '7B', '8A'], status: 'Active', joined: '2015' },
  { id: 'T004', nameKh: 'ម៉ែន ស្រីណីត', nameEn: 'Men Sreynet', subjects: ['Chemistry', 'Biology'], classes: ['11A', '11B', '12A'], status: 'Active', joined: '2019' },
  { id: 'T005', nameKh: 'ទេព ណារ', nameEn: 'Tep Nar', subjects: ['History', 'Geography'], classes: ['8B', '9A', '9B'], status: 'Absent', joined: '2017' },
  { id: 'T006', nameKh: 'ឡុង វ៉ាន', nameEn: 'Long Van', subjects: ['Physical Education'], classes: ['All classes'], status: 'Active', joined: '2021' },
];

export function TeacherList() {
  const [search, setSearch] = useState('');
  const [editingRow, setEditingRow] = useState<string | null>(null);

  const filtered = teachers.filter(t =>
    t.nameKh.includes(search) || t.nameEn.toLowerCase().includes(search.toLowerCase()) || t.subjects.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search teachers / ស្វែងរកគ្រូ"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 ml-auto">
          <Button variant="outline" size="sm"><Upload size={14} />Import</Button>
          <Button size="sm"><Plus size={14} />Add Teacher / បន្ថែមគ្រូ</Button>
        </div>
      </div>

      <p className="text-sm text-gray-500">{filtered.length} teachers / គ្រូសរុប</p>

      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left font-medium text-gray-600">ID</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Name / ឈ្មោះ</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Subjects / មុខវិជ្ជា</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Classes / ថ្នាក់</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Joined</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(teacher => (
              <tr key={teacher.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                <td className="px-4 py-2.5 font-mono text-gray-500 text-xs">{teacher.id}</td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                      {teacher.nameEn.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{teacher.nameKh}</div>
                      <div className="text-xs text-gray-500">{teacher.nameEn}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  {editingRow === teacher.id ? (
                    <input defaultValue={teacher.subjects.join(', ')} className="border rounded px-1 py-0.5 text-xs w-40" />
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects.map(s => (
                        <Badge key={s} variant="info">{s}</Badge>
                      ))}
                    </div>
                  )}
                </td>
                <td className="px-4 py-2.5">
                  {editingRow === teacher.id ? (
                    <input defaultValue={teacher.classes.join(', ')} className="border rounded px-1 py-0.5 text-xs w-32" />
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {teacher.classes.slice(0, 3).map(c => (
                        <Badge key={c} variant="default">{c}</Badge>
                      ))}
                      {teacher.classes.length > 3 && <Badge variant="default">+{teacher.classes.length - 3}</Badge>}
                    </div>
                  )}
                </td>
                <td className="px-4 py-2.5 text-gray-600">{teacher.joined}</td>
                <td className="px-4 py-2.5">
                  <Badge variant={teacher.status === 'Active' ? 'success' : 'warning'}>{teacher.status}</Badge>
                </td>
                <td className="px-4 py-2.5">
                  <button
                    className="p-1 text-gray-400 hover:text-blue-600 rounded"
                    onClick={() => setEditingRow(editingRow === teacher.id ? null : teacher.id)}
                  >
                    <Pencil size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
