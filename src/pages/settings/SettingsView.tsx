import { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export function SettingsView() {
  const [language, setLanguage] = useState<'en' | 'kh'>('en');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* School Info */}
      <Card title="School Information / ព័ត៌មានសាលា">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">School Name (English)</label>
            <input
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="Kravanh Hun Sen High School"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">ឈ្មោះសាលា (ខ្មែរ)</label>
            <input
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="វិទ្យាល័យ ក្រវ៉ាញ់ ហ៊ុន សែន"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Address / អាស័យដ្ឋាន</label>
            <input
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="Kravanh District, Pursat Province, Cambodia"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Phone / ទូរស័ព្ទ</label>
            <input
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="+855 52 xxx xxx"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="info@kvhs.edu.kh"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Principal / នាយក</label>
            <input
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="H.E. ..."
            />
          </div>
        </div>
      </Card>

      {/* Academic Year */}
      <Card title="Academic Year / ឆ្នាំសិក្សា">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Current Academic Year</label>
            <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm">
              <option>2025-2026</option>
              <option>2024-2025</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Current Semester / វគ្គ</label>
            <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm">
              <option>Semester 1</option>
              <option selected>Semester 2</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Semester 1 Start</label>
            <input type="date" defaultValue="2025-09-01" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Semester 1 End</label>
            <input type="date" defaultValue="2025-12-31" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Semester 2 Start</label>
            <input type="date" defaultValue="2026-01-05" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Semester 2 End</label>
            <input type="date" defaultValue="2026-06-30" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
          </div>
        </div>
      </Card>

      {/* Language */}
      <Card title="Language Settings / ការកំណត់ភាសា">
        <div className="space-y-3">
          <p className="text-sm text-gray-600">Select the default interface language:</p>
          <div className="flex gap-4">
            <label className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 cursor-pointer ${language === 'en' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
              <input type="radio" name="lang" checked={language === 'en'} onChange={() => setLanguage('en')} className="text-blue-600" />
              <div>
                <div className="font-medium text-gray-800">English</div>
                <div className="text-xs text-gray-500">Interface in English</div>
              </div>
              <span className="text-2xl">🇬🇧</span>
            </label>
            <label className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 cursor-pointer ${language === 'kh' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
              <input type="radio" name="lang" checked={language === 'kh'} onChange={() => setLanguage('kh')} className="text-blue-600" />
              <div>
                <div className="font-medium text-gray-800">ភាសាខ្មែរ</div>
                <div className="text-xs text-gray-500">Khmer language</div>
              </div>
              <span className="text-2xl">🇰🇭</span>
            </label>
          </div>
        </div>
      </Card>

      {/* Backup */}
      <Card title="Data Backup & Export / ការបម្រុងទុក">
        <div className="space-y-3">
          <p className="text-sm text-gray-600">Export all school data for backup or migration.</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm">Export All Students (Excel)</Button>
            <Button variant="outline" size="sm">Export All Teachers (Excel)</Button>
            <Button variant="outline" size="sm">Export Grades (Excel)</Button>
            <Button variant="outline" size="sm">Full Database Backup</Button>
          </div>
          <div className="text-xs text-gray-400 mt-2">Last backup: Apr 5, 2026 at 11:00 PM</div>
        </div>
      </Card>

      {/* Save */}
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save size={14} />
          {saved ? 'Saved! ✓' : 'Save Settings / រក្សាទុក'}
        </Button>
      </div>
    </div>
  );
}
