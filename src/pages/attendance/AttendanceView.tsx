import { useState } from 'react';
import { ChevronDown, Check, Save } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

const classes = ['7A', '7B', '8A', '8B', '9A', '9B', '9C', '10A', '10B', '11A', '11B', '12A'];

const studentsByClass: Record<string, Array<{ id: string; nameKh: string; nameEn: string }>> = {
  '10A': [
    { id: 'S001', nameKh: 'ចាន់ ដារ៉ា', nameEn: 'Chan Dara' },
    { id: 'S002', nameKh: 'ស្រី ណារ', nameEn: 'Srey Nar' },
    { id: 'S009', nameKh: 'ហ៊ួ ដារ', nameEn: 'Hou Dar' },
    { id: 'S010', nameKh: 'ជ័យ ណារ', nameEn: 'Chay Nar' },
    { id: 'S011', nameKh: 'ឈឺ ម៉ាលី', nameEn: 'Chu Mali' },
    { id: 'S012', nameKh: 'ផ្ការ ស្រីណា', nameEn: 'Pkar Sreyna' },
    { id: 'S013', nameKh: 'ព្រំ ណូ', nameEn: 'Prom No' },
    { id: 'S014', nameKh: 'ថុល ស្រីណេត', nameEn: 'Thol Sreyneth' },
  ],
};

type AttendanceStatus = 'Present' | 'Absent' | 'Late' | '';

export function AttendanceView() {
  const [selectedClass, setSelectedClass] = useState('10A');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({});
  const [saved, setSaved] = useState(false);

  const students = studentsByClass[selectedClass] || studentsByClass['10A'];

  const setAll = (status: AttendanceStatus) => {
    const all: Record<string, AttendanceStatus> = {};
    students.forEach(s => { all[s.id] = status; });
    setAttendance(all);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const countBy = (status: AttendanceStatus) => students.filter(s => attendance[s.id] === status).length;

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Date / ថ្ងៃ</label>
          <input
            type="date"
            className="border border-gray-200 rounded px-2 py-1.5 text-sm"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Class / ថ្នាក់</label>
          <div className="relative">
            <select
              className="appearance-none pl-3 pr-8 py-1.5 text-sm border border-gray-200 rounded focus:outline-none bg-white"
              value={selectedClass}
              onChange={e => { setSelectedClass(e.target.value); setAttendance({}); }}
            >
              {classes.map(c => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-gray-500">Bulk Mark / សម្គាល់ច្រើន:</span>
          <Button variant="outline" size="sm" onClick={() => setAll('Present')}>
            <Check size={14} className="text-green-600" /> All Present
          </Button>
          <Button variant="outline" size="sm" onClick={() => setAll('Absent')}>All Absent</Button>
          <Button size="sm" onClick={handleSave}>
            <Save size={14} />
            {saved ? 'Saved! ✓' : 'Save Attendance'}
          </Button>
        </div>
      </div>

      {/* Summary bar */}
      <div className="flex gap-4 text-sm">
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
          <span className="text-green-700 font-medium">Present: {countBy('Present')}</span>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          <span className="text-red-700 font-medium">Absent: {countBy('Absent')}</span>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
          <span className="text-yellow-700 font-medium">Late: {countBy('Late')}</span>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
          <span className="text-gray-700 font-medium">Not marked: {students.filter(s => !attendance[s.id]).length}</span>
        </div>
      </div>

      {/* Attendance table - spreadsheet style */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left font-medium text-gray-600 w-10">#</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">ID</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Name / ឈ្មោះ</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600 w-28">
                <span className="text-green-700">Present</span> / វត្តមាន
              </th>
              <th className="px-4 py-3 text-center font-medium text-gray-600 w-28">
                <span className="text-red-700">Absent</span> / អវត្តមាន
              </th>
              <th className="px-4 py-3 text-center font-medium text-gray-600 w-28">
                <span className="text-yellow-700">Late</span> / យឺត
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Note / កំណត់ចំណាំ</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => {
              const status = attendance[student.id] || '';
              return (
                <tr
                  key={student.id}
                  className={`border-b border-gray-100 ${
                    status === 'Present' ? 'bg-green-50' :
                    status === 'Absent' ? 'bg-red-50' :
                    status === 'Late' ? 'bg-yellow-50' : ''
                  }`}
                >
                  <td className="px-4 py-2.5 text-gray-400">{idx + 1}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-gray-500">{student.id}</td>
                  <td className="px-4 py-2.5">
                    <div className="font-medium text-gray-800">{student.nameKh}</div>
                    <div className="text-xs text-gray-500">{student.nameEn}</div>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <input
                      type="radio"
                      name={student.id}
                      className="w-5 h-5 accent-green-600 cursor-pointer"
                      checked={status === 'Present'}
                      onChange={() => setAttendance(a => ({ ...a, [student.id]: 'Present' }))}
                    />
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <input
                      type="radio"
                      name={student.id}
                      className="w-5 h-5 accent-red-600 cursor-pointer"
                      checked={status === 'Absent'}
                      onChange={() => setAttendance(a => ({ ...a, [student.id]: 'Absent' }))}
                    />
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <input
                      type="radio"
                      name={student.id}
                      className="w-5 h-5 accent-yellow-500 cursor-pointer"
                      checked={status === 'Late'}
                      onChange={() => setAttendance(a => ({ ...a, [student.id]: 'Late' }))}
                    />
                  </td>
                  <td className="px-4 py-2.5">
                    {status && (
                      <Badge variant={status === 'Present' ? 'success' : status === 'Absent' ? 'danger' : 'warning'}>
                        {status}
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-2.5">
                    <input
                      type="text"
                      placeholder="Note..."
                      className="border border-gray-200 rounded px-2 py-0.5 text-xs w-32 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
