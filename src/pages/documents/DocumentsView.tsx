import { Upload, Download, FolderOpen, FileText, File, Search } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

const documents = [
  { id: 'D001', name: 'Student ID - ចាន់ ដារ៉ា.pdf', category: 'Student', size: '245 KB', uploadedBy: 'Chan Dara', date: '2026-04-01', status: 'Approved' },
  { id: 'D002', name: 'Birth Certificate - ស្រី ណារ.pdf', category: 'Student', size: '1.2 MB', uploadedBy: 'Srey Nar', date: '2026-03-28', status: 'Pending' },
  { id: 'D003', name: 'School Policy 2025-2026.docx', category: 'Internal', size: '890 KB', uploadedBy: 'Admin', date: '2026-01-15', status: 'Approved' },
  { id: 'D004', name: 'Annual Report 2024.pdf', category: 'Report', size: '3.4 MB', uploadedBy: 'Admin', date: '2025-12-30', status: 'Approved' },
  { id: 'D005', name: 'Grade 12 Exam Guidelines.pdf', category: 'Internal', size: '560 KB', uploadedBy: 'Admin', date: '2026-03-10', status: 'Approved' },
  { id: 'D006', name: 'Student Transcript - ហេង វ៉ា.pdf', category: 'Student', size: '320 KB', uploadedBy: 'Admin', date: '2026-04-02', status: 'Pending' },
  { id: 'D007', name: 'Staff Meeting Minutes - Apr 2026.docx', category: 'Internal', size: '120 KB', uploadedBy: 'Admin', date: '2026-04-05', status: 'Approved' },
];

const categories = ['All', 'Student', 'Internal', 'Report'];

const categoryColors: Record<string, 'info' | 'default' | 'warning'> = {
  Student: 'info',
  Internal: 'default',
  Report: 'warning',
};

function FileIcon({ name }: { name: string }) {
  if (name.endsWith('.pdf')) return <FileText size={18} className="text-red-500" />;
  if (name.endsWith('.docx') || name.endsWith('.doc')) return <File size={18} className="text-blue-500" />;
  return <File size={18} className="text-gray-500" />;
}

export function DocumentsView() {
  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search documents / ស្វែងរក"
          />
        </div>
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              className={`px-3 py-1.5 text-sm rounded-md border ${cat === 'All' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="ml-auto">
          <Button size="sm">
            <Upload size={14} />
            Upload Document / ផ្ទុក
          </Button>
        </div>
      </div>

      {/* Folder shortcuts */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { name: 'Student Documents', nameKh: 'ឯកសារសិស្ស', count: 156, color: 'bg-blue-50 border-blue-200' },
          { name: 'Internal Documents', nameKh: 'ឯកសារផ្ទៃក្នុង', count: 43, color: 'bg-yellow-50 border-yellow-200' },
          { name: 'Reports', nameKh: 'របាយការណ៍', count: 18, color: 'bg-green-50 border-green-200' },
          { name: 'Archives', nameKh: 'ឯកសារចាស់', count: 89, color: 'bg-gray-50 border-gray-200' },
        ].map(folder => (
          <button key={folder.name} className={`flex items-center gap-3 p-4 rounded-lg border ${folder.color} hover:shadow-sm transition-shadow text-left`}>
            <FolderOpen size={24} className="text-yellow-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-800">{folder.name}</p>
              <p className="text-xs text-gray-500">{folder.nameKh}</p>
              <p className="text-xs text-gray-400">{folder.count} files</p>
            </div>
          </button>
        ))}
      </div>

      {/* Document list */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Recent Documents / ឯកសារថ្មី</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left font-medium text-gray-600">Name / ឈ្មោះ</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Category</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Size</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Uploaded By</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map(doc => (
              <tr key={doc.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <FileIcon name={doc.name} />
                    <span className="text-gray-800">{doc.name}</span>
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <Badge variant={categoryColors[doc.category] || 'default'}>{doc.category}</Badge>
                </td>
                <td className="px-4 py-2.5 text-gray-500">{doc.size}</td>
                <td className="px-4 py-2.5 text-gray-600">{doc.uploadedBy}</td>
                <td className="px-4 py-2.5 text-gray-500 text-xs">{doc.date}</td>
                <td className="px-4 py-2.5">
                  <Badge variant={doc.status === 'Approved' ? 'success' : 'warning'}>{doc.status}</Badge>
                </td>
                <td className="px-4 py-2.5">
                  <button className="p-1 text-gray-400 hover:text-blue-600 rounded" title="Download">
                    <Download size={14} />
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
