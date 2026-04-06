import { useState } from 'react';
import { Plus, Send } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

const announcements = [
  { id: 'A001', title: 'National Exam Schedule Released', titleKh: 'កាលវិភាគប្រឡងជាតិ', body: 'The national exam for Grade 12 will be held on June 10-15, 2026. All students must register before May 30.', target: 'School-wide', date: 'Apr 6, 2026', author: 'Admin', pinned: true },
  { id: 'A002', title: 'Parent-Teacher Meeting - Grade 12', titleKh: 'ប្រជុំ父母-គ្រូ', body: 'A parent-teacher meeting for Grade 12 parents will be held on April 15, 2026 at 2:00 PM in the main hall.', target: 'Grade 12', date: 'Apr 5, 2026', author: 'Admin', pinned: false },
  { id: 'A003', title: 'Khmer New Year Holiday', titleKh: 'ឈប់សម្រាក​បុណ្យខ្មែរ', body: 'School will be closed from April 13-16, 2026 for Khmer New Year. Classes resume on April 17.', target: 'School-wide', date: 'Apr 4, 2026', author: 'Admin', pinned: true },
  { id: 'A004', title: 'Mid-term Exam Results Available', titleKh: 'លទ្ធផលប្រឡងកណ្ដាលឆ្នាំ', body: 'Mid-term exam results for all grades are now available. Students can collect their report cards from their class teachers.', target: 'All Students', date: 'Mar 28, 2026', author: 'Admin', pinned: false },
];

export function AnnouncementsView() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [target, setTarget] = useState('School-wide');

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus size={14} />
          New Announcement / ប្រកាសថ្មី
        </Button>
      </div>

      {/* New announcement form */}
      {showForm && (
        <Card title="Create Announcement / បង្កើតប្រកាស">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Title (English)</label>
              <input
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Announcement title..."
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">ចំណងជើង (ខ្មែរ)</label>
              <input
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ចំណងជើងប្រកាស..."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Content / មាតិកា</label>
              <textarea
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-28 resize-none"
                placeholder="Write announcement content..."
                value={body}
                onChange={e => setBody(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Target / គោលដៅ</label>
                <select
                  className="border border-gray-200 rounded-md px-3 py-2 text-sm"
                  value={target}
                  onChange={e => setTarget(e.target.value)}
                >
                  <option>School-wide</option>
                  <option>Grade 7</option>
                  <option>Grade 8</option>
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                  <option>Grade 11</option>
                  <option>Grade 12</option>
                  <option>Teachers Only</option>
                  <option>Staff Only</option>
                </select>
              </div>
              <div className="flex items-center gap-2 mt-5">
                <input type="checkbox" id="pin" className="rounded" />
                <label htmlFor="pin" className="text-sm text-gray-700">Pin to top</label>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={() => setShowForm(false)}>
                <Send size={14} />
                Publish / ផ្សព្វផ្សាយ
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </div>
        </Card>
      )}

      {/* Announcements list */}
      <div className="space-y-3">
        {announcements.map(a => (
          <div
            key={a.id}
            className={`bg-white rounded-lg border p-5 ${a.pinned ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {a.pinned && <Badge variant="info">📌 Pinned</Badge>}
                  <Badge variant={a.target === 'School-wide' ? 'success' : 'default'}>{a.target}</Badge>
                </div>
                <h3 className="font-semibold text-gray-800 mb-0.5">{a.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{a.titleKh}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{a.body}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-gray-500">{a.date}</p>
                <p className="text-xs text-gray-400">by {a.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
