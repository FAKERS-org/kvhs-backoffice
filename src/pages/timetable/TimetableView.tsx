import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

const days = ['Monday\nច័ន្ទ', 'Tuesday\nអង្គារ', 'Wednesday\nពុធ', 'Thursday\nព្រហស្បតិ៍', 'Friday\nសុក្រ'];
const periods = [
  { id: 1, time: '07:00 - 07:45' },
  { id: 2, time: '07:45 - 08:30' },
  { id: 3, time: '08:30 - 09:15' },
  { id: 4, time: '09:15 - 09:30', isBreak: true },
  { id: 5, time: '09:30 - 10:15' },
  { id: 6, time: '10:15 - 11:00' },
  { id: 7, time: '11:00 - 11:45' },
];

const schedule: Record<string, Record<number, { subject: string; teacher: string; class: string; conflict?: boolean }>> = {
  'Monday\nច័ន្ទ': {
    1: { subject: 'Math', teacher: 'Chan Dara', class: '10A' },
    2: { subject: 'English', teacher: 'Srey Nar', class: '9B' },
    3: { subject: 'Khmer', teacher: 'Heng Chant', class: '7A' },
    5: { subject: 'Physics', teacher: 'Chan Dara', class: '11A', conflict: true },
    6: { subject: 'Biology', teacher: 'Men Sreynet', class: '11B' },
    7: { subject: 'Math', teacher: 'Chan Dara', class: '10B', conflict: true },
  },
  'Tuesday\nអង្គារ': {
    1: { subject: 'Chemistry', teacher: 'Men Sreynet', class: '12A' },
    2: { subject: 'Math', teacher: 'Chan Dara', class: '9A' },
    3: { subject: 'English', teacher: 'Srey Nar', class: '10A' },
    5: { subject: 'History', teacher: 'Tep Nar', class: '8B' },
    6: { subject: 'Khmer', teacher: 'Heng Chant', class: '8A' },
  },
  'Wednesday\nពុធ': {
    1: { subject: 'Math', teacher: 'Chan Dara', class: '11A' },
    2: { subject: 'Biology', teacher: 'Men Sreynet', class: '12A' },
    3: { subject: 'PE', teacher: 'Long Van', class: '7B' },
    5: { subject: 'English', teacher: 'Srey Nar', class: '9C' },
    6: { subject: 'History', teacher: 'Tep Nar', class: '9A' },
    7: { subject: 'Khmer', teacher: 'Heng Chant', class: '7B' },
  },
  'Thursday\nព្រហស្បតិ៍': {
    1: { subject: 'English', teacher: 'Srey Nar', class: '9A' },
    2: { subject: 'Math', teacher: 'Chan Dara', class: '10A' },
    3: { subject: 'Chemistry', teacher: 'Men Sreynet', class: '11A' },
    5: { subject: 'Khmer', teacher: 'Heng Chant', class: '8B' },
    6: { subject: 'PE', teacher: 'Long Van', class: '9B' },
    7: { subject: 'Math', teacher: 'Chan Dara', class: '9B' },
  },
  'Friday\nសុក្រ': {
    1: { subject: 'Biology', teacher: 'Men Sreynet', class: '11B' },
    2: { subject: 'English', teacher: 'Srey Nar', class: '10B' },
    3: { subject: 'Khmer', teacher: 'Heng Chant', class: '9A' },
    5: { subject: 'Math', teacher: 'Chan Dara', class: '12A' },
    6: { subject: 'PE', teacher: 'Long Van', class: '10A' },
  },
};

const subjectColors: Record<string, string> = {
  Math: 'bg-blue-100 text-blue-800',
  English: 'bg-green-100 text-green-800',
  Khmer: 'bg-yellow-100 text-yellow-800',
  Physics: 'bg-purple-100 text-purple-800',
  Chemistry: 'bg-pink-100 text-pink-800',
  Biology: 'bg-teal-100 text-teal-800',
  History: 'bg-orange-100 text-orange-800',
  Geography: 'bg-cyan-100 text-cyan-800',
  PE: 'bg-indigo-100 text-indigo-800',
};

export function TimetableView() {
  const [selectedYear, setSelectedYear] = useState('2025-2026');
  const [selectedSemester, setSelectedSemester] = useState('Semester 2');

  const conflicts = Object.values(schedule).flatMap(day =>
    Object.values(day).filter(slot => slot.conflict)
  );

  return (
    <div className="space-y-4">
      {/* Config bar */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Academic Year / ឆ្នាំសិក្សា</label>
          <select
            className="border border-gray-200 rounded px-2 py-1.5 text-sm"
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
          >
            <option>2025-2026</option>
            <option>2024-2025</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Semester / វគ្គ</label>
          <select
            className="border border-gray-200 rounded px-2 py-1.5 text-sm"
            value={selectedSemester}
            onChange={e => setSelectedSemester(e.target.value)}
          >
            <option>Semester 1</option>
            <option>Semester 2</option>
          </select>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm">Export PDF</Button>
          <Button size="sm">Save Changes</Button>
        </div>
      </div>

      {/* Conflict alert */}
      {conflicts.length > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
          <AlertTriangle size={16} />
          <strong>Conflict Detected:</strong> Teacher Chan Dara is assigned to 2 classes during the same period on Monday.
        </div>
      )}

      {/* Timetable */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left font-medium text-gray-500 w-28 bg-gray-50 border-b border-gray-200">Period / វេន</th>
                {days.map(day => (
                  <th key={day} className="px-3 py-2 text-center font-medium text-gray-700 bg-gray-50 border-b border-l border-gray-200">
                    {day.split('\n').map((l, i) => <div key={i} className={i === 1 ? 'text-gray-400 font-normal' : ''}>{l}</div>)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {periods.map(period => (
                <tr key={period.id} className={period.isBreak ? 'bg-gray-50' : 'hover:bg-blue-50'}>
                  <td className="px-3 py-2 border-b border-gray-100 text-gray-500">
                    <div className="font-medium">{period.isBreak ? '🕐 Break' : `P${period.id}`}</div>
                    <div>{period.time}</div>
                  </td>
                  {days.map(day => {
                    if (period.isBreak) {
                      return (
                        <td key={day} className="border-b border-l border-gray-100 px-3 py-2 text-center text-gray-400 italic">
                          — Recess / សម្រាក —
                        </td>
                      );
                    }
                    const slot = schedule[day]?.[period.id];
                    return (
                      <td key={day} className={`border-b border-l border-gray-100 px-2 py-1.5 ${slot?.conflict ? 'bg-red-50' : ''}`}>
                        {slot ? (
                          <div className={`rounded p-1.5 ${subjectColors[slot.subject] || 'bg-gray-100 text-gray-800'} ${slot.conflict ? 'ring-2 ring-red-400' : ''}`}>
                            <div className="font-semibold">{slot.subject}</div>
                            <div className="opacity-75">{slot.teacher}</div>
                            <div className="opacity-60">Class: {slot.class}</div>
                            {slot.conflict && <div className="text-red-600 font-bold">⚠ Conflict</div>}
                          </div>
                        ) : (
                          <div className="text-gray-300 text-center py-1">—</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="flex flex-wrap gap-2 text-xs text-gray-500">
        <span className="font-medium">Legend:</span>
        {Object.entries(subjectColors).map(([subject, color]) => (
          <span key={subject} className={`px-2 py-0.5 rounded ${color}`}>{subject}</span>
        ))}
      </div>
    </div>
  );
}
