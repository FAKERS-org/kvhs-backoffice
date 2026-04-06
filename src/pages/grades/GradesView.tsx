import { useState } from 'react';
import { Download, Plus } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

const subjects = ['Mathematics', 'English', 'Khmer', 'Physics', 'Chemistry', 'Biology', 'History'];

const students = [
  { id: 'S001', nameKh: 'ចាន់ ដារ៉ា', nameEn: 'Chan Dara' },
  { id: 'S002', nameKh: 'ស្រី ណារ', nameEn: 'Srey Nar' },
  { id: 'S009', nameKh: 'ហ៊ួ ដារ', nameEn: 'Hou Dar' },
  { id: 'S010', nameKh: 'ជ័យ ណារ', nameEn: 'Chay Nar' },
  { id: 'S011', nameKh: 'ឈឺ ម៉ាលី', nameEn: 'Chu Mali' },
];

const mockGrades: Record<string, Record<string, { midterm: number; final: number }>> = {
  S001: { Mathematics: { midterm: 85, final: 90 }, English: { midterm: 78, final: 82 }, Physics: { midterm: 92, final: 88 } },
  S002: { Mathematics: { midterm: 72, final: 75 }, English: { midterm: 88, final: 91 }, Physics: { midterm: 68, final: 72 } },
  S009: { Mathematics: { midterm: 60, final: 65 }, English: { midterm: 70, final: 68 }, Physics: { midterm: 55, final: 60 } },
  S010: { Mathematics: { midterm: 90, final: 93 }, English: { midterm: 85, final: 87 }, Physics: { midterm: 88, final: 91 } },
  S011: { Mathematics: { midterm: 45, final: 50 }, English: { midterm: 60, final: 62 }, Physics: { midterm: 42, final: 48 } },
};

function getGrade(score: number): { letter: string; variant: 'success' | 'warning' | 'danger' | 'info' } {
  if (score >= 90) return { letter: 'A', variant: 'success' };
  if (score >= 80) return { letter: 'B', variant: 'info' };
  if (score >= 70) return { letter: 'C', variant: 'default' as 'info' };
  if (score >= 50) return { letter: 'D', variant: 'warning' };
  return { letter: 'F', variant: 'danger' };
}

const exams = [
  { name: 'Mid-term Exam', date: 'Feb 15, 2026', status: 'Completed' },
  { name: 'Final Exam', date: 'Apr 20, 2026', status: 'Upcoming' },
  { name: 'Mock Exam', date: 'May 1, 2026', status: 'Upcoming' },
];

export function GradesView() {
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="space-y-6">
      {/* Exam schedule */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {exams.map(exam => (
          <Card key={exam.name}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">{exam.name}</p>
                <p className="text-sm text-gray-500">{exam.date}</p>
              </div>
              <Badge variant={exam.status === 'Completed' ? 'success' : 'info'}>{exam.status}</Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Grade entry */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-gray-800">Grade Entry / ការប្រឡង - Class 10A</h3>
            <select
              className="border border-gray-200 rounded px-2 py-1 text-sm"
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
            >
              {subjects.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditMode(!editMode)}>
              {editMode ? 'View Mode' : 'Edit Mode'}
            </Button>
            <Button variant="outline" size="sm">
              <Plus size={14} />
              Add Exam
            </Button>
            <Button size="sm">
              <Download size={14} />
              Export PDF / PDF
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left font-medium text-gray-600">#</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Student / សិស្ស</th>
                <th className="px-4 py-3 text-center font-medium text-gray-600">Mid-term / កណ្ដាលឆ្នាំ</th>
                <th className="px-4 py-3 text-center font-medium text-gray-600">Final / ចុងឆ្នាំ</th>
                <th className="px-4 py-3 text-center font-medium text-gray-600">Average / មធ្យម</th>
                <th className="px-4 py-3 text-center font-medium text-gray-600">Grade</th>
                <th className="px-4 py-3 text-center font-medium text-gray-600">Result</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => {
                const grades = mockGrades[student.id]?.[selectedSubject];
                const midterm = grades?.midterm ?? 0;
                const final = grades?.final ?? 0;
                const avg = grades ? Math.round((midterm + final) / 2) : 0;
                const grade = getGrade(avg);
                return (
                  <tr key={student.id} className="border-b border-gray-100 hover:bg-blue-50">
                    <td className="px-4 py-2.5 text-gray-400">{idx + 1}</td>
                    <td className="px-4 py-2.5">
                      <div className="font-medium text-gray-800">{student.nameKh}</div>
                      <div className="text-xs text-gray-500">{student.nameEn}</div>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      {editMode ? (
                        <input
                          type="number"
                          defaultValue={midterm}
                          className="border rounded px-2 py-0.5 text-sm w-16 text-center"
                          min={0} max={100}
                        />
                      ) : (
                        <span className={`font-medium ${midterm < 50 ? 'text-red-600' : 'text-gray-800'}`}>{grades ? midterm : '—'}</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      {editMode ? (
                        <input
                          type="number"
                          defaultValue={final}
                          className="border rounded px-2 py-0.5 text-sm w-16 text-center"
                          min={0} max={100}
                        />
                      ) : (
                        <span className={`font-medium ${final < 50 ? 'text-red-600' : 'text-gray-800'}`}>{grades ? final : '—'}</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-center font-bold text-gray-800">{grades ? avg : '—'}</td>
                    <td className="px-4 py-2.5 text-center">
                      {grades && <Badge variant={grade.variant}>{grade.letter}</Badge>}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      {grades && (
                        <Badge variant={avg >= 50 ? 'success' : 'danger'}>
                          {avg >= 50 ? 'Pass / ជាប់' : 'Fail / ធ្លាក់'}
                        </Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {editMode && (
          <div className="px-5 py-3 border-t border-gray-200 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditMode(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setEditMode(false)}>Save Grades / រក្សាទុក</Button>
          </div>
        )}
      </div>
    </div>
  );
}
